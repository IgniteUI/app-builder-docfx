---
title: App Builder On-premises whitelisting external references
_description: Learn how to whitelist all external resources for your On-premise instance
_keywords: App builder, On-premises, whitelisting
---

# Whitelisting External Resources for On-Premise App Builder

## Introduction 
This document outlines the necessary external URLs that need to be whitelisted for the proper functioning of the App Builder within an on-premise environment. Whitelisting these URLs ensures seamless access to resources like component libraries, documentation, video tutorials, and more, enhancing both development and user experience.

## Implementation Tips:
By integrating this whitelist, developers can ensure that all necessary external resources for the Infragistics App Builder are accessible from your on-premise setup:

1. Ensure that these URLs provided below are added to your network's whitelist or proxy settings to prevent blocking.
2. Regularly update this list if new resources or URLs are added by us or if any changes occur.
3. Consider using wildcard entries for domains where multiple sub-pages might be necessary (e.g., *.infragistics.com for all Infragistics resources). Examples:
- Add `*.infragistics.com` for all Infragistics resources.
- Add `*.appbuilder.dev` for App Builder specific resources.
- For services like YouTube, which might have multiple paths, consider `*.youtube.com` if you want to allow access to the entire YouTube site.
- Discord channels might require a specific entry since it's not a [typical web URL.](https://discord.com/channels/836634487483269200/836635360594755665)

## Whitelisting Categories
Below you can find a detailed list of all external URLs part of the App Builder Platgorm. To ensure clarity and usability, the URLs have been organized into categories based on their purpose:

#### App Builder Resources
- [Landing page.](https://www.infragistics.com/products/appbuilder)
- [Pricing page.](https://www.appbuilder.dev/pricing)
- App Builder desktop applicaiton for [Windows](https://www.infragistics.com/products/appbuilder/download), [Mac](https://www.infragistics.com/products/appbuilder/download/mac) and [Linux](https://www.infragistics.com/products/appbuilder/download/linux).
- Platform URLs for [Preview](https://preview.appbuilder.dev/) and [Production](https://my.appbuilder.dev/) environments. 
- User Accounts for [Subscriptions](https://account.appbuilder.dev/subscriptions) and [Individual Profiles](https://account.appbuilder.dev/private-profile). 

#### Documentation & Help
- [Getting started page.](https://www.infragistics.com/products/appbuilder/help/getting-started)
- [Change Log.](https://www.infragistics.com/products/appbuilder/help/change-log)
- [Navigation Tips.](https://www.infragistics.com/products/appbuilder/help/single-page-apps-and-navigation)
- [Layout tips.](https://www.infragistics.com/products/appbuilder/help/flex-layouts/flex-layouts)
#### Product Pages
- [Reveal BI help pages.](https://help.revealbi.io/web/getting-started-angular/)
#### Legal & Privacy
- [Infragistics Privacy Policy.](https://www.infragistics.com/legal/privacy)
- [Infragistics Terms of Use.](https://www.infragistics.com/legal/terms-of-use)
- [App Builder AI Privacy Policy.](https://www.appbuilder.dev/ai-privacy-policy)

#### Community & Support
- [Discord](https://discord.com/channels/836634487483269200/836635360594755665)
- [YouTube videos including webinars and getting started content.](https://www.youtube.com/@AppBuilder_Dev)
#### Component Libraries
- [Ignite UI for Angular.](https://www.infragistics.com/products/ignite-ui-angular/angular)
- [Ignite UI for Blazor.](https://www.infragistics.com/products/ignite-ui-blazor/blazor)
- [Ignite UI for Web Component.](https://www.infragistics.com/products/ignite-ui-web-components/web-components)
- [Ignite UI for React.](https://www.infragistics.com/products/ignite-ui-react/react)


By following the recommendations in this topic, users will have easier access to necessary resources, reducing friction in their workflow while maintaining network security.

## Additional App Builder Resources
<div class="divider--half"></div>

* [On-Prem Authentication with OpenID Connect](auth-with-openid-connect-o-auth.md)
* [App Builder Deployment Configuration Flags](configuration-flags.md)