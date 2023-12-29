# Guide to Variables in App Builder

## URL Parameters Binding in App Builder

Binding URL parameters to data requests and components is a crucial feature in the App Builder, enabling applications to interact dynamically with web services and to personalize user experiences based on URL data. This section explores how URL parameters can be effectively utilized in your applications.

### Understanding URL Parameters Binding

URL parameters binding allows your application to fetch and display data based on parameters passed in the URL. This is particularly useful for creating applications that respond to user input or external links.

### How to Bind URL Parameters

- **Setting Up Data Requests**: When configuring data endpoints in your application, you can specify that certain data requests depend on URL parameters. This setup allows for dynamic data fetching based on user navigation or actions.
- **Binding to Data Repeaters**: URL parameters can also be used in conjunction with data repeaters, enabling the display of lists or collections based on the parameters passed.

### Practical Use Cases

#### Data Requests Based on URL Parameters

- **Example Scenario**: Consider an application displaying customer orders. By binding the data request to a URL parameter like `CustomerID`, the application can dynamically fetch and display orders specific to a customer.
- **Implementation**: This involves setting up the data endpoint to expect a path or query parameter and configuring the data request in the App Builder to use this parameter.

#### Data Repeaters and URL Parameters

- **Repeating UI Components**: URL parameters can be used to control the data displayed in repeating UI components, like a tree view or a grid.
- **Dynamic Data Display**: For instance, a tree node component can repeat through an Orders collection fetched based on a selected Customer ID from the URL parameter, dynamically updating the displayed data.

### Example: URL Parameters in a Customer Orders Application

In an application designed to display customer orders, URL parameters play a pivotal role:

- **Grid Bound to Customer Orders**: A grid component can be bound to a data request fetching customer orders, where the `CustomerID` is provided through the URL.
- **Dynamic Updates**: As the URL parameter changes (e.g., different customer IDs), the grid updates to show the relevant orders, providing a seamless and dynamic user experience.

![Data Requests with URL Parameters](../images/state-and-context/13-path-param-customer-orders.gif)
*Example of Data Requests Using URL Parameters in App Builder*

### Conclusion

URL parameters binding in the App Builder opens up a myriad of possibilities for creating dynamic, data-driven applications. By leveraging this feature, you can build applications that respond intelligently to user navigation and input, enhancing the overall user experience and the applicability of your applications in real-world scenarios.
