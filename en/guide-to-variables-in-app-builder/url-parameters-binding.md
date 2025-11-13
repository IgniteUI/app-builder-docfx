---
title: "Mastering URL Parameter Binding in App Builder"
description: "Discover how App Builder from Infragistics revolutionizes data-driven applications with URL parameter binding for efficient data requests and repeaters, enhancing user experience in low-code development."
keywords: "App Builder, Infragistics, URL Parameter Binding, Data Requests, Data Repeaters, Low-Code Development, Dynamic Data Integration, User Experience, Data-Driven Applications"
---

# URL Parameters Binding in App Builder

App Builder allows for sophisticated data manipulation and display techniques, including the use of URL parameters for data requests and repeaters. This functionality is crucial for creating dynamic, data-driven applications.

## Data Requests

When working with data endpoints that require path or query parameters, App Builder's URL parameter binding feature becomes invaluable. This feature enables the application to make data requests based on parameters provided in the URL. For instance, consider a Grid component bound to Customer Orders. By using a “CustomerID” path parameter, the Grid dynamically fetches and displays data relevant to the specified customer.

> [!NOTE]
> For this topic examples we will be using the [Northwind WebAPI](https://data-northwind.indigo.design/swagger/index.html).

<img src="../images/state-and-context/13-path-param-customer-orders.gif" srcset="../images/state-and-context/13-path-param-customer-orders.gif 2x" />
<p style="text-align:center;">Data requests</p>

## Data Repeaters

Data repeaters take this concept further. For example, a Tree node component can be repeated through an Orders collection, which is fetched based on the selected Customer ID. Unlike simple data binding, this involves binding the component to a Data Repeat context, allowing for the dynamic creation of UI elements based on the data fetched from the URL parameters.

<img src="../images/state-and-context/14-path-param-customer-orders-tree.gif" srcset="../images/state-and-context/14-path-param-customer-orders-tree.gif 2x" />
<p style="text-align:center;">Data repeaters</p>

## Takeaways

URL parameters binding in the App Builder opens up a myriad of possibilities for creating dynamic, data-driven applications. By leveraging this feature, you can build applications that respond intelligently to user navigation and input, enhancing the overall user experience and the applicability of your applications in real-world scenarios.

- **Dynamic Data Fetching**: URL parameter binding in App Builder enables dynamic data fetching, allowing components like Grids and Trees to display data based on URL parameters.
- **Enhanced User Experience**: This feature enhances user interaction with the application by providing context-specific data, improving the overall user experience.
- **Data Display**: The ability to use data repeaters in conjunction with URL parameters offers a versatile approach to displaying data, especially in scenarios requiring nested or hierarchical data structures.
- **Seamless Integration**: The integration of URL parameters with data requests and repeaters in App Builder is seamless, making it easier for developers to create complex, data-driven applications.
- **Consistency with Previous Concepts**: This feature builds upon the previously discussed concepts of component properties binding and variable management, showcasing the comprehensive and cohesive nature of App Builder's capabilities.

## Additional Resources

<div class="divider--half"></div>

- [Variables management](variables-management.md)
- [Navigation with Route parameters](route-parameters-navigation.md)
- [Component properties binding](component-properties-binding.md)
- [Working with Events and Actions](working-with-events-and-actions.md)
- [Master-detail concept](../master-detail/master-detail.md)
- [Step-by-step App Creation examples](../master-detail/step-by-step-examples.md)
- [App Builder Components](../indigo-design-app-builder-components.md)
