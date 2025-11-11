---
title: "Efficient Component Binding in App Builder: Leveraging Variables for Dynamic UIs"
description: "Explore how App Builder from Infragistics simplifies component properties binding using local and global variables for dynamic and responsive UI development in low-code environments."
keywords: "App Builder, Infragistics, Component Binding, Variables Management, Dynamic UI, Low-Code Development, Data Binding, Global Variables, Local Variables"
---

# Component Properties Binding in App Builder

Binding to component properties in App Builder involves connecting the properties of a component's configuration to various data sources. This process is facilitated by a plug icon, which is visible in each bindable component property. Let's delve into an example to understand this better.

## Simplified Binding with Variables

Previously, binding a Title and Subtitle to a Card component required iterating through a data array. This iteration made a data context available for binding specific data fields. However, with the introduction of variables, binding has become more versatile. Now, you can create a variable of any type and directly bind it to a Card component, eliminating the need for a data repeater.

> [!NOTE]
> For this topic examples we will be using the [Northwind WebAPI](https://data-northwind.indigo.design/swagger/index.html).

### Data Repeating Through an Array Variable

Consider a scenario where you have a collection of movies and wish to display details about the highest-grossing box office movies based on a selection. Here's how you can achieve this:

1. **Bind the Movies Collection**: Connect the movies collection to a component (like a Combo box) that supports multiple selections. Add an event handler and set a variable action as previously discussed.

<img src="../images/state-and-context/4.png" srcset="../images/state-and-context/4.png 2x" />
<p style="text-align:center;">Array type variable</p>

1. **Create an Array Variable**: Set up an empty Array variable named "Box Office Revenue". The Data Type is automatically determined based on the data source of the Combo component.

   <img src="../images/state-and-context/10.png" srcset="../images/state-and-context/10.png 2x" />
   <p style="text-align:center;">New Variable dialog</p>

2. **Bind to a Card Component**: Link the "selectedMovies" variable to a card component. Bind the Title and Subtitle properties to the appropriate data fields from the Data Context.

   <img src="../images/state-and-context/11.png" srcset="../images/state-and-context/11.png 2x" />
   <p style="text-align:center;">Data context binding</p>

The result is a dynamically updated card component based on your selection:

<img src="../images/state-and-context/12.gif" srcset="../images/state-and-context/12.gif 2x" />
<p style="text-align:center;">Result</p>

## Cross-View Communication with Global Variables

Understanding the scope of variables is crucial, Sso here is what we've learned:

- **Global Variables**: Facilitate data transfer between different views. A global variable created in one view is accessible in all other views.
- **Local Variables**: Handle data exchange within the components of the same view.

## Takeaways

What's the essence of App Builder components binding?

- **Enhanced Flexibility**: Variables in App Builder allow for more flexible and efficient data binding, reducing the need for data repeaters.
- **Simplified Data Contexts**: Direct binding of variables to components simplifies the creation of dynamic UI elements.
- **Scope Awareness**: Understanding the distinction between global and local variables is key for effective data management across different views.
- **Practical Application**: The process of binding a movies collection to a card component illustrates the practicality and ease of using variables for data binding.

## Additional Resources

<div class="divider--half"></div>

- [Variables management](variables-management.md)
- [URL parameters binding](url-parameters-binding.md)
- [Navigation with Route parameters](route-parameters-navigation.md)
- [Working with Events and Actions](working-with-events-and-actions.md)
- [Master-detail concept](../master-detail/master-detail.md)
- [Step-by-step App Creation examples](../master-detail/step-by-step-examples.md)
- [App Builder Components](../indigo-design-app-builder-components.md)
