#!/usr/bin/env node
/**
 * Changelog generator script.
 * Downloads changelog data from the App Builder API and generates markdown files.
 *
 * Usage:
 *   npm run changelog
 *   npm run changelog -- --host https://api.example.com
 *   npm run changelog -- --since 2026-03-01        # include entries from March 1 2026 onwards
 *   npm run changelog -- --host https://api.example.com --since 2026-03-01
 *
 * API response format:
 * {
 *   "success": true,
 *   "data": [
 *     { "changelog": "# May 2026 Release\r\n## Features\r\n- ...", "date": "2026-05-25T00:00:00" },
 *     { "changelog": "# April 2026 Release\r\n...",               "date": "2026-04-15T00:00:00" }
 *   ]
 * }
 */

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

// --- CLI / env / default resolution ---

const { values: args } = parseArgs({
    options: {
        host:  { type: 'string', short: 'h' },
        since: { type: 'string', short: 's' },
    },
    strict: false,
});

// Resolution order: CLI arg → env var → default
const HOST  = args.host  || process.env.CHANGELOG_API_HOST || 'https://my.apbuilder.dev';
// SINCE: "YYYY-MM-DD" — only releases on or after this date are fetched (sent as ?fromDate to the API).
const SINCE = args.since || process.env.CHANGELOG_SINCE || '2026-03-01';

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
 * Fetches changelog items from the API.
 * @param {string} language - 'en' or 'ja'
 * @returns {Promise<Array<{ changelog: string, date: string }>>}
 */
function fetchChangelog(language) {
    return new Promise((resolve, reject) => {
        const url = `${HOST}/api/changelog/${language}?fromDate=${SINCE}`;
        // Allow self-signed certificates when running against localhost
        const agent = new https.Agent({ rejectUnauthorized: false });

        https.get(url, { agent }, (res) => {
            const chunks = [];

            res.on('data', (chunk) => { chunks.push(chunk); });

            res.on('end', () => {
                const raw = Buffer.concat(chunks).toString('utf8');
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} fetching changelog for "${language}"`));
                    return;
                }
                try {
                    const body = JSON.parse(raw);
                    if (!body.success || !Array.isArray(body.data)) {
                        reject(new Error(`Unexpected API response shape for "${language}"`));
                        return;
                    }
                    resolve(body.data);
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
 * Transforms a single release's markdown:
 * - Shifts heading levels (# → ##, ## → ###)
 * - Removes specified sections and [LEARN MORE] links
 *
 * @param {string} markdown
 * @param {string[]} sectionsToRemove
 * @returns {string}
 */
function transformRelease(markdown, sectionsToRemove = []) {
    const lines = markdown
        .replace(/\r\n/g, '\n')
        .trim()
        .split('\n')
        .map((line) => {
            if (line.startsWith('## ')) return `### ${line.slice(3)}`;
            if (line.startsWith('# '))  return `## ${line.slice(2)}`;
            return line;
        });

    const result = [];
    let inRemovedSection = false;

    for (const line of lines) {
        if (line.startsWith('### ')) {
            inRemovedSection = sectionsToRemove.includes(line.slice(4).trim());
        }
        if (inRemovedSection) continue;
        if (/^\[LEARN MORE\]/i.test(line.trim())) continue;
        result.push(line);
    }

    return result.join('\n').trim();
}

/**
 * Fixes markdown linting issues in API-sourced content:
 * - MD007: strips a single leading space / normalizes 4-space nesting to 2-space
 * - MD009: removes trailing whitespace
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
        line = line.trimEnd();
        if (/^ - /.test(line)) line = line.slice(1);
        const indentMatch = line.match(/^( +)(- )/);
        if (indentMatch && indentMatch[1].length % 4 === 0) {
            line = ' '.repeat(indentMatch[1].length / 2) + line.trimStart();
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
 * Generates the changelog markdown file for a single language configuration.
 * @param {typeof CONFIGS[number]} config
 */
async function generateChangelog(config) {
    console.log(`[${config.language}] Fetching changelog...`);

    const items = await fetchChangelog(config.language);

    if (items.length === 0) {
        throw new Error(`No changelog items found for "${config.language}"`);
    }

    // Use the most recent changelog entry's date for {LATEST_DATE}
    const latestDate = config.formatDate(new Date(items[0].date));

    const changelogMarkdown = fixMarkdown(
        items
            .map((item) => transformRelease(item.changelog, config.sectionsToRemove))
            .join('\n\n')
    );

    const template = fs.readFileSync(config.templatePath, 'utf8');
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
        console.error(`[${config.language}] Error: ${err.message}`);
        process.exit(1);
    }
}

console.log('Changelog generation complete.');

