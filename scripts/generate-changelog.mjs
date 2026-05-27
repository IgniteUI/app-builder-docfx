#!/usr/bin/env node
/**
 * Changelog generator script.
 * Downloads changelog data from the App Builder API and generates markdown files.
 *
 * Usage:
 *   npm run changelog
 *   npm run changelog -- --host https://api.example.com
 *
 * API response format:
 * {
 *   "success": true,
 *   "data": {
 *     "changelog": "# May 2026 Release\r\n## Features\r\n- ...\r\n\r\n---\r\n\r\n# April 2026 Release\r\n..."
 *   }
 * }
 *
 * The markdown string uses # for release headers and ## for subsections.
 * These are shifted down one level (# → ##, ## → ###) for the output file.
 * Individual releases are separated by "---" horizontal rules.
 */

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

// --- CLI / env / default resolution ---

const { values: args } = parseArgs({
    options: {
        host: { type: 'string', short: 'h' },
    },
    strict: false,
});

// Resolution order: CLI arg → env var → default
const HOST = args.host || process.env.CHANGELOG_API_HOST;

const __dirname = import.meta.dirname;

// --- Date formatting ---

const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

function ordinalSuffix(day) {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return `${day}st`;
    if (j === 2 && k !== 12) return `${day}nd`;
    if (j === 3 && k !== 13) return `${day}rd`;
    return `${day}th`;
}

/** "27th of May, 2026" */
function formatDateEn(date) {
    return `${ordinalSuffix(date.getDate())} of ${MONTHS_EN[date.getMonth()]}, ${date.getFullYear()}`;
}

/** "2026 年 5 月 27 日" */
function formatDateJa(date) {
    return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

// --- Configuration ---

const CONFIGS = [
    {
        language: 'en',
        templatePath: path.join(__dirname, '..', 'en', 'change-log.template'),
        outputPath: path.join(__dirname, '..', 'en', 'change-log.md'),
        formatDate: formatDateEn,
        sectionsToRemove: [
            'Maintenance updates',
            'MAINTENANCE UPDATES & BUG FIXES',
        ],
    },
    {
        language: 'ja',
        templatePath: path.join(__dirname, '..', 'jp', 'change-log.template'),
        outputPath: path.join(__dirname, '..', 'jp', 'change-log.md'),
        formatDate: formatDateJa,
        sectionsToRemove: [
            'メンテナンス更新',
            'メンテナンスの更新',
            'メンテナンスの更新とバグ修正',
        ],
    },
];

// --- API fetch ---

/**
 * Fetches the raw changelog markdown string from the API.
 * @param {string} language - 'en' or 'ja'
 * @returns {Promise<string>}
 */
function fetchChangelog(language) {
    return new Promise((resolve, reject) => {
        const url = `${HOST}/api/changelog/${language}`;
        // Allow self-signed certificates when running against localhost
        const agent = new https.Agent({ rejectUnauthorized: false });

        https.get(url, { agent }, (res) => {
            let raw = '';

            res.on('data', (chunk) => { raw += chunk; });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} fetching changelog for "${language}"`));
                    return;
                }
                try {
                    const body = JSON.parse(raw);
                    if (!body.success || !body.data || typeof body.data.changelog !== 'string') {
                        reject(new Error(`Unexpected API response shape for "${language}"`));
                        return;
                    }
                    resolve(body.data.changelog);
                } catch (err) {
                    reject(new Error(`Invalid JSON for "${language}": ${err.message}`));
                }
            });
        }).on('error', (err) => {
            reject(new Error(`Request failed for "${language}": ${err.message}`));
        });
    });
}

// --- Markdown transformation ---

/**
 * Shifts heading levels down by one, removes specified sections and
 * [LEARN MORE] links, then joins release blocks without "---" separators.
 *   # Release Title  →  ## Release Title
 *   ## Section       →  ### Section
 *
 * @param {string} markdown - raw markdown from the API
 * @param {string[]} sectionsToRemove - ### section titles to strip (heading + content)
 * @returns {string}
 */
function transformChangelog(markdown, sectionsToRemove = []) {
    // Normalize line endings to \n
    const normalized = markdown.replace(/\r\n/g, '\n').trim();

    // Split into individual release blocks separated by "---"
    const releases = normalized.split(/\n\n---\n\n/);

    const transformed = releases.map((block) => {
        // Shift heading levels
        const lines = block
            .split('\n')
            .map((line) => {
                if (line.startsWith('## ')) return `### ${line.slice(3)}`;
                if (line.startsWith('# '))  return `## ${line.slice(2)}`;
                return line;
            });

        // Remove unwanted sections and [LEARN MORE] links
        const result = [];
        let inRemovedSection = false;

        for (const line of lines) {
            // Detect start of a ### section
            if (line.startsWith('### ')) {
                const sectionTitle = line.slice(4).trim();
                inRemovedSection = sectionsToRemove.includes(sectionTitle);
            }

            if (inRemovedSection) continue;

            // Remove [LEARN MORE](...) lines
            if (/^\[LEARN MORE\]/i.test(line.trim())) continue;

            result.push(line);
        }

        return result.join('\n').trim();
    });

    // MD024: drop release blocks whose title (## heading) was already seen
    const seenTitles = new Set();
    const deduplicated = transformed.filter((block) => {
        const match = block.match(/^## (.+)/m);
        const title = match ? match[1].trim() : null;
        if (title === null || !seenTitles.has(title)) {
            if (title) seenTitles.add(title);
            return true;
        }
        return false;
    });

    return deduplicated.join('\n\n');
}

/**
 * Fixes markdown linting issues in API-sourced content:
 * - MD007: strips a single leading space from top-level list items (` - ` → `- `)
 * - MD009: removes trailing whitespace from every line
 * - MD022: ensures blank lines above and below every heading
 * - MD032: ensures blank lines above and below every list block
 *
 * @param {string} markdown
 * @returns {string}
 */
function fixMarkdown(markdown) {
    const isHeading = (l) => l !== null && /^#{2,} /.test(l);
    const isList    = (l) => l !== null && /^ {0,4}-( |$)/.test(l);

    // Pass 1 – per-line fixes (MD009, MD007)
    const lines = markdown.split('\n').map((line) => {
        line = line.trimEnd();                        // MD009: trailing spaces
        if (/^ - /.test(line)) line = line.slice(1); // MD007: single leading space
        // MD007: convert 4-space-per-level nesting to 2-space-per-level
        const indentMatch = line.match(/^( +)(- )/);
        if (indentMatch) {
            const spaces = indentMatch[1].length;
            if (spaces % 4 === 0) {
                line = ' '.repeat(spaces / 2) + line.trimStart();
            }
        }
        return line;
    });

    // Pass 2 – inject blank lines around headings (MD022) and list blocks (MD032)
    const spaced = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const prev = spaced.length > 0 ? spaced[spaced.length - 1] : null;
        const next = i + 1 < lines.length ? lines[i + 1] : null;

        const needsBlankBefore = isHeading(line) || (isList(line) && !isList(prev));
        const needsBlankAfter  = isHeading(line) || (isList(line) && !isList(next));

        if (needsBlankBefore && prev !== null && prev !== '') spaced.push('');
        spaced.push(line);
        if (needsBlankAfter && next !== null && next !== '') spaced.push('');
    }

    // Pass 3 – collapse consecutive blank lines into one
    const result = [];
    for (const line of spaced) {
        if (line === '' && result.length > 0 && result[result.length - 1] === '') continue;
        result.push(line);
    }

    return result.join('\n');
}

// --- Main ---

/**
 * Sanitizes values before writing to plain-text logs to prevent log injection.
 * Removes CR/LF and other ASCII control characters.
 * @param {unknown} value
 * @returns {string}
 */
function sanitizeForLog(value) {
    return String(value).replace(/[\r\n]+/g, ' ').replace(/[\x00-\x1F\x7F]/g, '');
}

/**
 * Generates the changelog markdown file for a single language configuration.
 * @param {typeof CONFIGS[number]} config
 */
async function generateChangelog(config) {
    console.log(`[${config.language}] Fetching changelog...`);

    const rawMarkdown = await fetchChangelog(config.language);
    const template = fs.readFileSync(config.templatePath, 'utf8');

    const changelogMarkdown = fixMarkdown(transformChangelog(rawMarkdown, config.sectionsToRemove));
    const latestDate = config.formatDate(new Date());

    const output = template
        .replace('{LATEST_DATE}', latestDate)
        .replace('{CHANGELOGS}', changelogMarkdown);

    fs.writeFileSync(config.outputPath, output, 'utf8');
    console.log(`[${config.language}] Written: ${config.outputPath}`);
}

for (const config of CONFIGS) {
    try {
        await generateChangelog(config);
    } catch (err) {
        const safeMessage = sanitizeForLog(err instanceof Error ? err.message : err);
        console.error(`[${config.language}] Error: ${safeMessage}`);
        process.exit(1);
    }
}

console.log('Changelog generation complete.');
