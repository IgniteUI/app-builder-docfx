---
title: App Builder - Web Components Code Generation
_description: App Builder enables users to choose the desired platform for code and app generation
_keywords: App Builder, Web App Builder, Web Components, Web Components code generation
---
# Web Components Code Generation with App Builder

The family of supported frameworks of the App Builder has grown even more. The newest member - [Web Components](https://www.infragistics.com/products/ignite-ui-web-components). Now you can both download or upload to GitHub your Web Components application.

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/ab-wc-code-generation.gif" />
<p style="width: 100%; text-align:center;">Web Components Code Generation from AppBuilder</p>

> [!NOTE]
><b>Trying to generate code for components not available yet will put a placeholder informing that such a component is not yet supported. This makes it possible for you not to refrain from developing more complex UI in the designer.

### In this article:
* <a href="#introduction">Introduction of the feature</a>
* <a href="#blazor-code-generation">Blazor Code generation</a>
* <a href="#uploading-an-application-to-github">Uploading an application to GitHub</a>
* <a href="#known-issues-and-limitations">Known issues and limitations</a>

## Introduction
As mentioned, beta version of Blazor Code generation feature supports a handful of components and many are yet to come. Don't miss out on the grid code generation - while most grid features are not yet supported, data binding is and this gives you the ability to run a Blazor application with a native grid component from Ignite UI for Blazor! Enabling more features in the grid in the AppBuilder designer is still fine - at one moment code generation from the design will bring more than just data binding.

## Blazor Code Generation
After finalizing the design of your application and before previewing its code, pay attention to the Platform picker dropdown, located in the navigation bar just next to the `Publish to Github` and `Preview` action buttons. Choose the `Blazor BETA` option to generate code for Blazor, or `Angular` if this is the preferred framework for your app. The picker remembers your choice and next time you go to AppBuilder you will have your desired framework preselected for you.

## Uploading an application to GitHub
In addition to see your application in Preview mode or download it locally on the machine, there is the option for generating the full app code repository. In order to do that, simply go to the Generate app button and then connect your GitHub account to the App Builder.

## Known issues and limitations
Generating Blazor application has the following limitations:
- Bootstrap is turned off in the generated application.

Generated components have the following limitations:

- Card:
    - reversed actions are not reflected in generated code.
    - divider in "Actions-column" type is not reflected in generated code.
- Navigation Drawer
    - does not support pin threshold.
- Avatar:
    - the "Initials" type does not limit the content to the first two chars.
- Icon
    - does not use `IgbIcon` in generated code. All components, which use icons, are also not generated with `IgbIcon`.
- Date Picker:
    - does not support Dialog mode.
    - does not support displaying multiple months.
    - does not support action buttons.
- Icon Button
    - does not generate `IgbIconButton`, but `IgbButton` with icon instead.
- Input Group - when type is set to "Date":
    - does not support input format.
    - does not fully support display formats.
    - does not support help text.
    - does not support custom prefix and suffix.
    - does not support min and max values.
    - does not support value loop.
- Radio Group
    - does not support required.
- Grid:
    - advanced filtering is not reflected in generated code.
    - toolbar is not reflected in generated code.
    - does not support column selection.
    - does not support exporting.
    - does not support paging.
    - does not support row actions.
    - does not support quick filtering.

For a list of all supported components see [Generate App](generate-app/generate-app-overview.md#supported-components)

## Additional Resources

<div class="divider--half"></div>

* [Generate App](./generate-app/generate-app-overview.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Indigo.Design Getting Started](https://www.infragistics.com/products/indigo-design/help/getting-started)
* [Indigo.Design Components](https://www.infragistics.com/products/indigo-design/help/components/components-overview)