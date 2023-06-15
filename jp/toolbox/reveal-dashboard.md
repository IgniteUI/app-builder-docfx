---
title: Reveal Dashboard
_description: App Builder enables users to use Reveal Dashboards for visualizing data and data analytics 
_keywords: App builder, Infragistics, Reveal BI
---

# Reveal Dashboard
You can now add a Reveal Dashboard directly from the App Builder Toolbox and specify your URL to the Reveal Server SDK hosting your data. Consider the App Builder as a Client application that gets a baseURL which is the endpoint of your server that the App Builder will send/receive the requests and responses from.

When the Reveal Dashboard is loaded you can specify a Dashboard name out of the four available options - Marketing, Sales, Campaigns, and Manufacturing. We do host our own server for testing purposes only. Upon export, you will get a reference to our Trial server (base URL) exposing only the Marketing dashboard for demo purposes.

> [!NOTE]
> [Read more](https://help.revealbi.io/web/overview/) about Reveal as a business intelligence solution.

<iframe id="frame" style="aspect-ratio: 4/3; width: 100%;" src="https://appbuilder.indigo.design/app/wrwn5yv0tcjg/preview"/>

## Known issues and limitations
- Using Custom Theme with font that contains spaces doesn't affect text inside visualizations.
- Reveal View resizing problems when Display scale is different than 100%. **Workaround:** set Padding of the wrapping (parent) Reveal Dashboard. [Example](https://appbuilder.indigo.design/app/wrwn5yv0tcjg/preview) with padding of the step container where the reveal dashboard is places.
- Editing dashboards in App Builder Preview might lead to unexpected errors from the server.