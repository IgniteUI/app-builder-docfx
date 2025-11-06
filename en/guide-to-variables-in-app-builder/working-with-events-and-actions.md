---
title: "Working with Events and Actions"
description: "Learn how to effectively utilize events and actions in Infragistics' App Builder for creating dynamic, interactive user interfaces. This guide covers the integration of event handlers with variable management for enhanced application responsiveness."
keywords: "App Builder, Infragistics, Event Handlers, UI Interactivity, Variable Management, User Interface Design, Low-Code Development, Click Events, Data Context, Selection Events"
---


# Working with Events and Actions in App Builder

In App Builder, a key aspect of creating interactive and responsive applications is the effective use of events and actions. This functionality is crucial for integrating components with variable management and user interactions.

## Understanding Component Event Handlers

App Builder exposes various component event handlers, which are instrumental in the context of variable management. Key events include:

- **Selection Changed Event**: Utilized in the Combo component.
- **Row Selection Changed Event**: Employed in the Grid component.
- **Click Event**: Available for all components, this event is used in the context of setting a variable upon a click action.

> [!NOTE]
> For this topic examples we will be using the [Northwind WebAPI](https://data-northwind.indigo.design/swagger/index.html).

## Dynamic Variable Type Adjustment

The Grid and Combo components in App Builder allow for the setting of selection modes. Intriguingly, the variable type dynamically changes based on the selection mode chosen. For instance, a Combo component bound to an array of customers in a Single selection mode will pass a Customer Object through the event context for the selected item.

<img src="../images/state-and-context/15-selection-mode-examples.gif" srcset="../images/state-and-context/15-selection-mode-examples.gif 2x" />
<p style="text-align:center;">Working with events</p>

## OnClick Event Handlers and Data Context

Every component in App Builder is equipped with an OnClick event handler, which can be utilized in the context of a variable. In scenarios involving repeated data, you can access the Data Context for a specific item through the On Click -> Set variable action. This feature enables the modification of a variable value based on user interaction, as demonstrated in the tree component example.

<img src="../images/state-and-context/16-onClick-example.png" srcset="../images/state-and-context/16-onClick-example.png 2x" />
<p style="text-align:center;">On click example</p>

## Handling Combo Component with `valueKey`

A notable aspect of the Combo component is its behavior with the `valueKey` attribute set. The Combo component passes a primitive value during the Selection changed event. For example, if `CustomerID` is set as the `valueKey`, a number is passed; if `CustomerName` is set, a string is passed.

<img src="../images/state-and-context/17-valueKey-example.png" srcset="../images/state-and-context/17-valueKey-example.png 2x" />
<p style="text-align:center;">Combo Value key note</p>

## Takeaways

- **Event-Driven Interactivity**: App Builder's event handlers like Selection Changed and Click events enable dynamic interactions within applications.
- **Variable Management Integration**: These events are seamlessly integrated with variable management, allowing for responsive data-driven applications.
- **Dynamic Variable Types**: The ability to dynamically change variable types based on component selection modes enhances the flexibility of data handling.
- **OnClick Data Context Access**: The OnClick event handler provides access to data context, crucial for manipulating variables based on user interactions.
- **Combo Component Flexibility**: The `valueKey` feature in Combo components demonstrates the flexibility of App Builder in handling different data types.
- **Enhanced User Experience**: These features collectively contribute to a more interactive and user-friendly application, aligning with the goals of low-code development platforms.

## Additional Resources

<div class="divider--half"></div>

- [Variables management](variables-management.md)
- [Navigation with Route parameters](route-parameters-navigation.md)
- [Component properties binding](component-properties-binding.md)
- [URL Parameters binding](url-parameters-binding.md)
- [Master-detail concept](../master-detail/master-detail.md)
- [Step-by-step App Creation examples](../master-detail/step-by-step-examples.md)
- [App Builder Components](../indigo-design-app-builder-components.md)
