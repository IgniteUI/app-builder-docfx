---
title: App Builder Versioning Mechanism
_description: Learn how to save, browse, and restore application and view versions in App Builder using manual checkpoints and automatic snapshots.
_keywords: App Builder, versioning, version history, autosave, restore, checkpoints, low-code
---

# App Builder Versioning Mechanism

## Overview

App Builder includes now a strong versioning mechanism. You can safely capture and restore previous states without data loss or inconsistencies, regardless of whether changes were made manually.

This mechanism helps you:

- Save named checkpoints during complex design sessions.
- Recover from unintended changes.
- Preserve restore points before high-impact operations.

> [!NOTE]
> Undo/redo is session-scoped. If you close the browser tab, undo history is lost. Version History provides persistent restore points across sessions.

## Prerequisites

Before you start:

- Open an application in App Builder.
- Ensure you have edit permissions for the app workspace.
- Save at least one change to enable version entries relevant to your current session.

## What You Can Do

The versioning feature includes two main capabilities:

- **State Versioning System**: Automatic and manual snapshotting of app and view states.
- **Version Browsing and Management**: List, filter, rename, duplicate, restore, open, and delete saved versions.

Snapshots capture the App Builder model state, including:

- App structure
- Views
- Data sources
- Theme

App Builder stores snapshots efficiently by using a Diff/Delta strategy.

## Access Version History

You can open **Version History** from the app menu in the application name dropdown (**Show Version History**).

The panel opens on the left side and displays a timeline of versions.

## Save a Manual Version

Use manual versions to create intentional restore points before risky changes.

1. Open the split save button or app/view context menu.
2. Select **Save Version**.
3. (Optional) Enter a custom label.
: Default format is **Manual save - [timestamp]**.
4. Select **Save**.

At the end:

- App Builder creates a version with an automatically assigned unique ID.
- A success toast appears (for example, **Version saved**).

## Automatic Snapshots

We auto-save only upon restoring a manually saved version.

## Browse and Manage Versions

The Version History panel supports timeline browsing and version management.

### Filtering and grouping

Use filters to narrow results:

- All Versions
- My Versions
- Named Versions

Timeline groups can include:

- Earlier Today
- Earlier This Week
- Last Month

Newest versions are shown first by default.

### Actions per version

Per-row actions can include:

- Restore
- Rename
- Duplicate
- Delete

## Restore Workflow

1. Open **Version History**.
2. Select the target version.
3. Choose **Restore**.
4. Confirm restore.

Expected result:

- A success toast confirms restoration.
- If you restore a manually saved version, App Builder creates an automatic snapshot before restore.

## Application Menu and Save UX Updates

The application name now opens a dropdown with:

- Rename
- Duplicate
- Copy to Workspace
- Show Version History

Related behavior updates:

- Rename is accessed from the dropdown and from click-to-rename.
- Duplicate does not force navigation away from the current app.
- Success toasts confirm actions, including duplicate and save version.

## Retention and Cleanup

Version retention follows these rules:

- Versions are retained for at least 90 days. After that, we delete only the auto-saved versions
- Manual and auto-saved versions are not automatically deleted, they can be deleted manually by the user.

## Limitations and Notes

- Version history does not replace source control branching strategies.
- Undo/redo and Version History are different recovery systems.
- Exact trigger availability may vary by tenant configuration and release rollout.

## Expected Outcomes

After using versioning, you can:

- Create reliable restore points before risky edits.
- Recover quickly from unintended changes that should be reverted.
- Track app and view evolution with clear metadata and timeline filters.

## Additional Resources

<div class="divider--half"></div>

- [Managing Workspaces in App Builder](managing-workspaces.md)
- [AI-Powered View and Content Generation](ai/getting-started.md)
- [Share, Preview and Edit Applications](share-preview-edit-app.md)
- [Generate App Overview](generate-app/generate-app-overview.md)
- [Change Log (Release Notes)](change-log.md)
