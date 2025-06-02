---
title: Create and Manage Workspaces in App Builder  
_description: Learn how to quickly create and manage workspaces using App Builder. 
_keywords: App Builder, Infragistics, Workspaces, Remote Paging, Multiple Actions, Low-code Platform, Ignite UI
---

# Managing Workspaces in App Builder

## Overview

Workspaces in App Builder are collaborative environments that act like shared folders for your applications and their related resources. Each workspace enables invited users to access, edit, and manage apps and workspace-level assets without duplication.

With native workspace support, App Builder no longer relies on Indigo.Design Cloud for workspace functionality, making it fully self-contained. This change benefits both SaaS and On-Premises users, especially those who want to manage apps without using the full Indigo.Design platform.

## Key Features

### Workspace Collaboration
- Invite team members via email.
- Add members based on shared workspace suggestions.
- Accept invites with email/account validation.
- Remove members or allow them to leave voluntarily.
- View and manage invited (but not yet joined) members.
- Pin/unpin workspaces per user preference.

### Workspace Entities
Resources automatically shared across all apps in a workspace:
- Viewports
- Themes
- Data Sources
- Assets (e.g., images)

### App Copy Across Workspaces
Copy an app to another workspace with automatic handling of:
- Shared assets, themes, viewports, variables and datasources.
- No GitHub repo links are preserved after copying.

## How to Use

### Create and Manage Workspaces
1. Access the **Workspace menu** from the App Builder dashboard.
2. Use the existing UI to **create a workspace**, invite users, or update settings.
3. Use the **workspace pinning** option to personalize your menu.

### Invite and Manage Members
- **Invite users via email** directly from App Builder.
- Accepting invites includes account validation for security.
- Track invite status and resend invitations if needed.
- Remove members with immediate effect.

### Copying Applications to Another Workspace
1. Use the **"Copy to Workspace"** option from an app's context menu.
2. Select the target workspace(s).
3. Confirm the copy action. App Builder will:
   - Copy all necessary linked resources.
   - Match existing ones where possible.
   - Display success notifications upon completion.

> [!NOTE]
> GitHub repo links are not preserved. You’ll need to reconnect repositories manually.

## What to Expect

- **No loss of functionality** during or after migration.
- **No visual UI changes**.
- **Localized email notifications** are sent when apps are created or deleted.

## Limitations

- You can't add the same app to multiple workspaces as a live link (no app-sync).
- GitHub repo linkage is not maintained after copying.
- Cannot selectively choose which workspace-level artifacts to copy—App Builder copies all.

## Best Practices

| Task                              | Recommendation |
|-----------------------------------|----------------|
| Adding Users                      | Use suggested users from shared workspaces for quick invites. |
| Managing Resources                | Let App Builder auto-detect and match existing resources when copying apps. |
| Renaming Workspaces               | Reflect changes across all users for clarity. |
| Leaving Workspaces                | Use the **Leave Workspace** option in the workspace menu. |
| Tracking Invites                  | Monitor and re-send unaccepted invites from the workspace settings. |



## Frequently Asked Questions

### Can I see my App Builder workspaces in Indigo.Design?
No. Native workspace support is now fully decoupled from Indigo.Design. Workspaces created in App Builder are not visible or synced with Indigo.

### What happens to my apps and members after migration?
There is **no service interruption** or data loss. All existing workspaces, apps, memberships, and share URLs are preserved.

### Do I need to manually re-link resources when copying an app?
No. App Builder will auto-match resources when possible. Only unmatched resources are duplicated.

## Additional Resources
<div class="divider--half"></div>

* [App Builder Interface Overview](interface-overview.md)
* [Single Page and Navigation](single-page-apps-and-navigation.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Generating an App](generate-app/generate-app-overview.md)
