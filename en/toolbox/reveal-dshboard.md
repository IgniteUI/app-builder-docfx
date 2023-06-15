---
title: Reveal Dashboard
_description: App Builder enables users to use Reveal Dashboards for visualizing data and data analytics 
_keywords: App builder, Infragistics, Reveal BI
---

# Reveal Dashboard
You can now add a Reveal Dashboard directly from the App Builder Toolbox and specify your URL to the Reveal Server SDK hosting your data. Consider the App Builder as a Client application that gets a baseURL which is the endpoint of your server that the App Builder will send/receive the requests and responses from.

When the Reveal Dashboard is loaded you can specify a Dashboard name out of the four available options - Marketing, Sales, Campaigns, and Manufacturing. We do host our own server for testing purposes only. Upon export, you will get a reference to our Trial server (base URL) exposing only the Marketing dashboard for demo purposes.

> [!NOTE]
> [Check out this live application showcasing the power of Reveal](https://appbuilder.indigo.design/app/hddwklxctko2/preview/077d9549-f7cb-4a91-984a-e0559dd92015).

> [!NOTE]
> [Read more about Reveal as a business inteligence solution](https://help.revealbi.io/web/overview/).

## Known issues and limitations
- Using Custom Theme with font that contain spaces doesn't affect text inside visualizations.
- Reveal View resizing problems when Display scale is different than 100%
- Editing dashboards in App Builer Preview might lead to unexpected errors from the server. **Workaround:** set Padding of the wrapping (parent) Reveal Dashboard. [Example](https://appbuilder.indigo.design/app/hddwklxctko2/preview/077d9549-f7cb-4a91-984a-e0559dd92015) with padding of the step container where the reveal dashboard is places.