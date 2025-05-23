---
title: Publish Apps to Azure DevOps from App Builder + Microsoft Account Type Requirements
_description: Learn how to publish applications to Azure DevOps directly from App Builder and understand how different Microsoft account types impact authentication and access.
_keywords: App Builder, Azure DevOps, Microsoft Accounts, Work Accounts, Personal Accounts, Authentication, Publish, CI/CD, Pull Requests, Domain Verification, Infragistics
---

# Publishing Apps to Azure DevOps from App Builder

The **Azure DevOps integration** in App Builder allows you to publish generated source code (Angular, React, Blazor, or Web Components) directly to your DevOps repositories. This streamlines handoff to development teams and fits naturally into your existing CI/CD workflows.

Before you begin, it's important to understand how **Microsoft account types** affect authentication and what steps are required to enable access — [see the section below](#how-microsoft-account-types-impact-authentication) for details.

## 🔌 Connect to Your Existing Azure DevOps Project

1. In App Builder, click the **Publish** button.
2. Select **Azure DevOps** as the target platform.
3. Authenticate with your Microsoft account.
4. After successful login and MFA (if enabled), your Azure DevOps **organizations**, **projects**, and **repositories** will be listed for selection.

> Your credentials are securely verified. App Builder only requests permissions required for publishing.


## ➕ Create a Repo for the App from App Builder

If no repository exists yet:

1. Choose your **organization** and **project**.
2. Click **Create Repository**.
3. Define the repository name and visibility (private/public – visibility depends on project settings).
4. The repo is created and initialized for publishing.

## ⏫ Publish/Push the Code to the Repo

1. Click **Publish** to generate and push your app’s source code.
2. The initial publish populates the default branch (`main`) with your generated files.
3. A status indicator confirms successful publishing.

## 🤖 Automatic CI Build

Azure DevOps supports build pipelines that can be triggered on push:

1. Ensure a pipeline is created and linked to the repo.
2. App Builder triggers the build automatically when code is pushed.
3. Monitor build status from within Azure DevOps.

> If no pipeline is configured, you will need to create one manually and grant it access to the repository.

## ⤴ Pull Requests for Follow-up Changes

For subsequent publishes:

1. App Builder creates a **feature branch** with a unique name.
2. A **Pull Request (PR)** is automatically generated.
3. The build pipeline runs on the PR to validate the changes.
4. You can review code diffs before merging.

> This workflow mimics GitHub pull requests and ensures code quality and team collaboration.

## ⚙ Deploy as Live App (Coming Soon)

Soon, you’ll be able to deploy your app to **Azure Web Apps** directly from App Builder.

- Will support both **standard** and **static web apps**
- Simplifies deployment for customer demos and staging environments

# How Microsoft Account Types Impact Authentication

When connecting Azure DevOps to App Builder, authentication is handled via Microsoft Entra ID (formerly Azure Active Directory). Account type directly impacts the success of this connection.

## Supported Microsoft Account Types

### Work or School Accounts (Azure AD)

- Examples: `user@company.com`, `user@tenant.onmicrosoft.com`
- Fully supported
- Require no additional setup in most cases
- Can grant necessary access based on organizational policy

### Personal Microsoft Accounts

- Examples: `user@outlook.com`, `user@hotmail.com`
- Not supported directly due to Azure DevOps access policies
- Will result in an authentication error (e.g., `AADSTS500202`)
- **Workaround**:
  - Add the user as a **guest** to your Azure AD tenant, or
  - Convert the personal account into a **work account**

## Domain Verification & Account Classification

The domain associated with your email address determines how Microsoft classifies the account.

| **Email Address**             | **Domain Status**     | **Account Type** | **Authentication Support**             |
|------------------------------|-----------------------|------------------|----------------------------------------|
| `user@company.com`           | Verified              | Work             | ✅ Works out-of-box                     |
| `user@tenant.onmicrosoft.com`| Built-in Azure domain | Work             | ✅ Works out-of-box                     |
| `user@outlook.com`           | N/A                   | Personal         | ❌ Not supported                        |
| `user@mydomain.com`          | Unverified            | Personal         | ❌ Not supported unless domain verified |

### How to Verify a Domain

1. Go to **Microsoft Entra ID** > **Custom domain names**
2. Add your domain
3. Follow DNS steps to add a **TXT record** to your domain registrar


## Best Practices for Organizations

To ensure smooth integration and avoid authentication issues:

- ✅ Use **work or school accounts** associated with Azure AD
- ✅ **Verify your domains** in Microsoft Entra ID
- ✅ Configure **Azure DevOps** to use your Azure AD directory
- ✅ Ensure a **service principal** is registered for DevOps access
- ⚠ For personal accounts:
  - Invite them as **guests** in your tenant
  - Or provision a **work account** for development activities
