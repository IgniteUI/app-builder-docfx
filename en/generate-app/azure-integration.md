---
title: Microsoft Account Types Supported for publishing apps to Azure DevOps with App Builder
_description: Understand which Microsoft account types are supported when connecting Azure DevOps to App Builder, and how domain verification affects authentication and access.
_keywords: App Builder, Azure DevOps, Microsoft Accounts, Work Accounts, Personal Microsoft Accounts, Domain Verification, Azure AD, Authentication, Infragistics
---

# Set Up Microsoft Partner Network (MPN) and Account Types for Azure DevOps Integration

## Overview

This guide helps you understand how different Microsoft account types impact authentication when integrating Azure DevOps with App Builder. Knowing whether your users are using work or personal Microsoft accounts is critical to ensuring successful and secure integration.

## Supported Microsoft Account Types

Azure DevOps supports organizational accounts (Work/School), while **Personal Microsoft accounts** have limited support due to Microsoft’s identity model.

### Work and School Accounts

- Examples: user@company.com, user@tenant.onmicrosoft.com
- Authentication: Works out-of-the-box
- No additional configuration required (if Azure DevOps is correctly set up)
- Can authorize access without administrator consent (depending on tenant policies)

### Personal Microsoft Accounts

These are user-created accounts (e.g., @outlook.com, @hotmail.com) and are not supported directly for Azure DevOps integration in App Builder.

- Authentication will fail
- Common error: AADSTS500202: Personal Microsoft account not supported
- Workaround: Convert personal accounts to organizational accounts or add them as guests in the organization’s Azure tenant

## Domain Verification & Account Classification

Azure treats accounts differently based on domain verification status:

| **Account Email**             | **Domain Status**     | **Account Type** | **Behavior**                            |
| ----------------------------- | --------------------- | ---------------- | --------------------------------------- |
| `user@company.com`            | Verified              | Work             | Works out-of-box                        |
| `user@tenant.onmicrosoft.com` | Built-in Azure domain | Work             | Works out-of-box                        |
| `user@outlook.com`            | N/A                   | Personal         | Will not work directly                  |
| `user@mydomain.com`           | Unverified            | Personal         | Will not work unless domain is verified |

To verify a domain in Azure AD:

1. Go to **Microsoft Entra ID** > **Custom domain names**
2. Add your domain and follow DNS verification steps (e.g., TXT record)


## Best Practices for External Organizations

To ensure successful integration with App Builder:

1. **Use work/school accounts** associated with an Azure AD tenant
2. **Verify your custom domains** in Azure AD
3. Configure **Azure DevOps to use your Azure AD directory**
4. Ensure an **Azure DevOps service principal** is created
5. For users with personal accounts:
   * Add them as **guests** to your Azure tenant, or
   * Create **organizational work accounts**, or
   * Set up a **self-service onboarding flow** (for advanced scenarios)
