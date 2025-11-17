---
title: "Master-Detail Apps in App Builder"
description: "Dive into creating master-detail style applications using Infragistics' App Builder. This guide explores the integration of variables, events, and data binding techniques to build sophisticated web applications."
keywords: "App Builder, Infragistics, Master-Detail Pattern, Web Application Development, Variable Management, Event Handling, Data Binding, Low-Code Platform, UI Design"
---

# Master-Detail Style Apps with Variables & Events

Initially, this feature was planned to follow the basics of the Master-detail design interface. But it evolved into something much more. We are all familiar with the essence of the Master-detail pattern, it is a way to present a list of records and enable the user to manage them with ease. It usually comprises two views - One is the master list of records and the other is used to display extended data about a single record.

<img src="../images/state-and-context/1.png" width="100%" srcset="../images/state-and-context/1.png 2x" />
<p style="text-align:center;">Master-detail example</p>

## Key Elements of the Master-Detail Pattern in App Builder

The new feature covers these key elements established by the Master-detail pattern:  

- **Primary Pane**: This area displays a list of items or triggers that initiate the loading of other app components.
- **Details Pane**: It shows detailed information about the item selected in the Primary pane, utilizing various interactive components.
- **Interactions**: These define how the master list and detail views interact, including context, drill-downs, and pop-ups.

<img src="../images/state-and-context/2.png" srcset="../images/state-and-context/2.png 2x" />
<p style="text-align:center;">Master-detail AB Preview</p>

## Implementing Master-Detail Scenarios

To create master-detail scenarios in App Builder, we integrate several features:

## Variables Management Topic

Unlock the full potential of your app by diving into [Variables Management](../guide-to-variables-in-app-builder/variables-management.md). Learn how to effectively manage and utilize both global and local variables for enhanced data flow and interactivity.

## Component Properties Binding

Enhance your app's data binding and user experience by exploring [Component Properties Binding](../guide-to-variables-in-app-builder/component-properties-binding.md). Discover how to bind component properties to your data for dynamic and interactive UIs.

## URL Parameters Binding

Delve into [URL Parameters Binding](../guide-to-variables-in-app-builder/url-parameters-binding.md) to learn how to perform data fetching. Learn how to use URL parameters for efficient data requests and repeaters in your applications.

## Working with Events and Actions

Get hands-on with interactive UI design by checking out [Working with Events and Actions](../guide-to-variables-in-app-builder/working-with-events-and-actions.md). Understand how to harness events and actions in App Builder for creating engaging and dynamic user interfaces.

## Known Issues and Limitations

- **URL/Query Params**: Currently, non-swagger URL/Query Params are not supported for data loading.
- **Grid Templating**: Variables in Grid templating are not yet supported but are planned for the next release.
- **Data Binding Limitations**: Binding to repeated data of a single object and an array of primitives is not supported.
- **Combo Component Specifics**: Multi-selection mode with `valueKey` requires handling an array of primitives, which is not yet supported.
- **Required Parameters**: Leaving a required parameter empty is allowed, but it may lead to compilation errors.

## Takeaways

- **Master-detail UI Design**: Master-detail patterns in App Builder allow for the creation of dynamic and user-friendly interfaces.
- **Advanced Data Handling**: Integration of variables, events, and data binding enables sophisticated data management.
- **Interactive Components**: Utilizing different components enhances the interactivity and functionality of the application.
- **Awareness of Limitations**: Understanding current limitations helps in planning and developing applications more effectively.

## Additional Resources

- [Variables Management](../guide-to-variables-in-app-builder/variables-management.md)
- [Navigation with Route parameters](../guide-to-variables-in-app-builder/route-parameters-navigation.md)

- [Component Properties Binding](../guide-to-variables-in-app-builder/component-properties-binding.md)
- [URL Parameters Binding](../guide-to-variables-in-app-builder/url-parameters-binding.md)
- [Working with Events and Actions](../guide-to-variables-in-app-builder/working-with-events-and-actions.md)
- [Step-by-Step App Creation Examples](step-by-step-examples.md)
- [App Builder Components](../indigo-design-app-builder-components.md)
- [Flex Layouts](../flex-layouts/flex-layouts.md)
- [Running Desktop App](../running-desktop-app.md)
