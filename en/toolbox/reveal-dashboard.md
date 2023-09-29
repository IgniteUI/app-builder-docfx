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
- Reveal dashboard Code generation is available **only for Angular.**
- Only one base URL binding is supported per view. If two or more Reveal dashboards are added to the App Builder View, they should be using the same base URL.
- Using Custom Theme with font that contains spaces doesn't affect text inside visualizations.
- App Preview:
  - Reveal View resizing problems when Display scale is different than 100%, noticeable with the vertical/horizontal scrollbar. **Workaround:** set Padding of the wrapping (parent) Reveal Dashboard. [Example](https://appbuilder.indigo.design/app/wrwn5yv0tcjg/preview) with padding of the step container where the reveal dashboard is places.
  - Editing dashboards in App Builder Preview might lead to unexpected errors from the server *Unexpected error - Quill is not defined*
- Upon code export:
  - There might be sizing problems when you interact with the dashboard elements and expand/collapse them. The Reveal placeholder is sizing itself properly when the whole browser window is resized, although thats not the case for the internal elements sizing changes. 