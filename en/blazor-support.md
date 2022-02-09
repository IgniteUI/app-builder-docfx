---
title: App Builder - Blazor Code Generation
_description: App Builder enables users to choose the desired platform for code and app generation.
_keywords: App Builder, Web App Builder, Blazor, Blazor Code generation, Blazor Appp Generation, Blazor UI App Builder, App Builder Blazor Support
---
# Blazor Code Generation with App Builder

With .NET 6 we are officially supporting a preview version of App Builder with Blazor as a code generation option. This beta version comes live following the overwhelming feature requests around Blazor support.

This means that you can now create any Blazor UI with simple drag & drop and get all of the production ready Razor, C# and CSS code in a single click for the following components now:

- Grid with data binding
- Badge
- Icon
- Checkbox, Switch
- Avatar
- InputGroup
- Containers - Absolute, Row, Column
- Hyperlink, Image, text and title
- List
- Button, Link Button
- Card
- NavBar
- Radio Group

<img class="responsive-img" src="./images/blazor-introduction.png" />
<p style="text-align:center;">Blazor Code Generation from AppBuilder</p>

> [!NOTE]
><b>Trying to generate code for components not available yet will put a placeholder informing that such a component is not yet supported. This makes it possible for you not to refrain from developing more complex UI in the designer.

### In this article:
* <a href="#introduction">Introduction of the feature</a>
* <a href="#blazor-code-generation">Blazor Code generation</a>
* <a href="#uploading-an-application-to-github">Uploading an application to GitHub</a>

## Introduction
As mentioned, beta version of Blazor Code generation feature supports a handful of components and many are yet to come. Don't miss out on the grid code generation - while most grid geatures are not yet supported, data binding is and this gives you the ability to run a Blazor application with a native grid component from Ignite UI for Blazor! Enabling more features in the grid in the AppBuilder designer is still fine - at one moment code generation from the design will bring more than just data binding.

## Blazor Code Generation
After finalizing the design of your application and before previewing its code, pay attention to the Platform picker dropdown, located in the navigation bar just next to the `Publish to Github` and `Preview` action buttons. Choose the `Blazor BETA` option to generate code for Blazor, or `Angular` if this is the preferred framework for your app. The picker rememers your choice and next time you go to AppBuilder you will have your desired framework preselected for you.

## Uploading an application to GitHub
In addition to see your application in Preview mode or download it locally on the machine, there is the option for generating the full app code repository. In order to do that, simply go to the Generate app button and then connect your GitHub account to the App Builder.
