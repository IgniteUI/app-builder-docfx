---
title: Query Builder
_description: App Builder's Query Builder enables developers to create dynamic data queries using a visual interface, leveraging Query Variables for efficient server-side filtering.
_keywords: App Builder, Query Builder, Query Variable, Data Filtering, Server-side Filtering, API Requests, Infragistics
---

# Query Builder in App Builder Step-by-Step Guide

## Query Builder Variable and Component Overview

The Query Builder component in App Builder operates through two key concepts:

- **Query Variable** and **Query Builder Component** in the toolbox.

The **Query Variable**, currently available only as part of [Preview Environment](https://preview.appbuilder.dev/), is a specialized variable that interacts with data sources, designed to efficiently handle large datasets by dynamically filtering data through API requests. These requests utilize **server-side filtering**, driven by advanced expressions as parameters, ensuring optimal performance when handling extensive data.

This variable integrates with the **Query Builder component**, allowing for dynamic data management and UI-driven filtering.

The Query Variable concept covers the two primary ways the Query Builder component is used:

- The **Query Builder component** integrated into App Builder as a **Query Variable editor**.
- The **Query Builder component** as a UI element that end-users can interact with directly from the App Builder Canvas when dropped from the Toolbox.

## Step-by-Step Introduction

## Step 1. Define a User story and implement it

Let's achieve the following use case, retrieve all Products from the **products** table that belong to a selected category and have been ordered in quantities within a specified range in the **orderDetails** table.

Sql Example:

```
SELECT * 
FROM products 
WHERE categoryId = "Beverages" 
AND productId IN (
  SELECT productId
  FROM orderDetails
  WHERE quantity >= 5
  AND quantity <= 10
)
```

1. **Main Query (Products table)**:

   - Selects all columns (`*`) from the **products** table.
   - Filters products where **categoryId = "Beverages"** (only products from the Beverages category).

2. **Subquery (OrderDetails table)**:

   - Retrieves **productId's** from **orderDetails** where the **quantity** ordered is between **5 and 10** (inclusive).
   - These **productId's** are then used in the **IN** clause of the main query to filter products.

   **Final Output:**

The result will be a list of **beverage products** that have been ordered in quantities between **5 to 10 units**.

## Step 2. Create a Query Variable

Let's start by creating a Query Variable. This Variable will be used for handling large datasets by dynamically filtering data through API requests.

1. Create a new variable.
2. Choose to **initialize it from a data API request**.
3. Select the newly added **Query Builder endpoint**. [App Builder's Testing OpenAPI now supports server-side filtering](https://data-northwind.appbuilder.dev/swagger/index.html).
4. Search for "query" endpoints and pick **ExecuteQuery.products**. This will serve as the **base table** for our complex query example.

   <details>

   <summary>🖼️ View Query Builder endpoint selection</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/1.png" />
   <p style="text-align:center;">Endpoint selection</p>

   </details>
   <br />

   **Result:**

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/2.png" />

## Step 3. Configure the Query Variable

First, open the **Edit Query** panel.

Build the complex query that will work with **two tables**:

- **products** – The main table from which data is retrieved.
- **orderDetails** – Used in the subquery to filter products based on quantity between a range.

💡 **Note:** Instead of hardcoding values, we will **bind each condition to variables** that will be dynamically updated by the user through App Components.

**Filter products by selected category**:

- Start building the **WHERE clause** to set query conditions.
- Create a **numeric variable** with a default value of **1**, which will be used by a **Select component**.

<details>
<summary>🖼️ View category filter configuration</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/3.png" />
<p style="text-align:center;">View category filter configuration</p>

</details>
<br/>

**Set up a condition** to retrieve product IDs for orders with quantities in a specified range:

- Create two **numeric variables** (quantityGreaterThan, quantityLessThan) with default values of **10** and **15**.
- These will be controlled by an **Input component**.

<details>
<summary>🖼️ View minimum quantity configuration</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/4.png" />
<p style="text-align:center;">View minimum quantity configuration</p>


</details>

<br/>

<details>
<summary>🖼️ View maximum quantity configuration</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/5.png" />
<p style="text-align:center;">View maximum quantity configuration</p>

</details>
<br />

💡 **Note:** Hardcoded values can also be used, but for this demo, we will use **variables** for **dynamic filtering**.

## Step 4. Apply and Save the Query

1. Click **Save** to store the **Complex Query Variable** configuration.
2. Test the query execution using the **SEND button**.

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/6.png" />
   <p style="text-align:center;">View query execution test</p>

   <br />

   **At this point, we have four variables:**

   - **ComplexQuery** → The Query Variable handling **server-side filtering**.
   - **selectedCategory** → Holds the **category ID**.
   - **quantityGreaterThan** → Defines the **minimum quantity**.
   - **quantityLessThan** → Defines the **maximum quantity**.

## Step 5. Add Interactive Components

These variables will be **bound to components** in our sample app:

- **Select component** for category selection.
- **Two Input components** for specifying quantity range.

Add a **Select component** and two **Input components**, binding them to the variables created in Step 3.

<details>
<summary>🖼️ View component addition</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/7.png" />
<p style="text-align:center;">View component addition</p>

</details>
<br />

Bind them:

**Select component**:
Focus the **Select component**, and click on the **Select item**. Apply a **data repeater** to it using the **Category table** from the Northwind data source.
<details>
  <summary>🖼️ View data repeater setup</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/8.png" />
<p style="text-align:center;">View data repeater setup</p>

</details>
<br />

Bind the Content and Value of the Select item element to Category -> Name and CategoryID.

<details>
  <summary>🖼️ View select item binding</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/9.png" />
<p style="text-align:center;">View select item binding</p>

</details>
<br />

Focus the Select component and bind it to the selectedCategory variable:

<details>
<summary>🖼️ View select component binding</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/10.png" />
<p style="text-align:center;">View select component binding</p>

</details>
<br />

**Input component** for Quantity greater than:

<details>
<summary>🖼️ View minimum quantity input binding</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/11.png" />
<p style="text-align:center;">View minimum quantity input binding</p>

</details>
<br />

**Input Component** for Quantity less than:

<details>
<summary>🖼️ View maximum quantity input binding</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/12.png" />
<p style="text-align:center;">View maximum quantity input binding</p>

</details>
<br />

1. Ensure the **two-way binding** for their **Value** properties is enabled.
2. Add a **Grid component** and bind it to the **Query Variable** created in Step 2.

<details>
<summary>🖼️ View grid component binding</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/13.png" />
<p style="text-align:center;">View grid component binding</p>

</details>
<br />

**Result:**

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/14.png" />
<p style="text-align:center;">View interactive components result</p>

## Step 6. Display Products Ordered in Specific Quantities

So far, our query returns **all products** that belong to the **Dairy Products** category and have been ordered in quantities **between 5 and 7**.

<details>
<summary>🖼️ View initial query results</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/15.png" />
<p style="text-align:center;">View initial query results</p>

</details>
<br />

However, the **actual order quantities are not visible**, since our query only retrieves data from the **products** table. To **validate the results**, we need to modify the UI to display the corresponding **order quantities**.

## Step 7. Show Order Quantities per Product Using Grid Row Selection

1. Add a **Grid Row Selection Changed** interaction and bind a **variable** to it.

   <details>
     <summary>🖼️ View grid row selection interaction</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/16.png" />
   <p style="text-align:center;">View grid row selection interaction</p>

   </details>
   <br />

2. Ensure the variable is of type **ProductDTO**

   <details>
     <summary>🖼️ View variable type configuration</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/17.png" />
   <p style="text-align:center;">View variable type configuration</p>

   </details>
   <br />

3. Add a **Dialog** and a **Grid** inside it to display the relevant data.

   <details>
     <summary>🖼️ View dialog and grid setup</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/18.png" />
   <p style="text-align:center;">View dialog and grid setup</p>

   </details>
   <br />

4. Configure another **Query Variable** that retrieves **order details** for products within a specific category.

   **Example Query:**

   ```
   SELECT * 
   FROM orderDetails 
   WHERE productId IN (
       SELECT productId 
       FROM products 
       WHERE categoryId = 1
   )
   AND Quantity BETWEEN 5 AND 15;

   ```

   <br />

   **Result:**

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/19.png" />
   <p style="text-align:center;">View order details query result</p>

5. Bind the **Grid component** to the **OrdersComplexQuery Variable**

   <details>
     <summary>🖼️ View grid binding to order details</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/20.png" />
   <p style="text-align:center;">View grid binding to order details</p>

   </details>
   <br />

## Step 8. Preview the App

- Click **Preview**.
- Dynamically adjust the query results using the Input components.
- Example use case:
  - Search for **Confections** category.
  - Set **Quantity between 4 and 8**.
<br />

<details>
  <summary>🖼️ View app preview with Confections example</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/21.png" />
<p style="text-align:center;">View app preview with Confections example</p>

</details>

## Step 9. Modify Queries in Real-Time Using the Query Builder

This step demonstrates **how the query can be modified in real-time**. Instead of filtering orders **within a quantity range**, we will change it to **greater than or equal to a specific quantity**.

1. Drag and drop a **Query Builder component** from the **Toolbox**.

<details>
  <summary>🖼️ View Query Builder component addition</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/22.png" />
<p style="text-align:center;">View Query Builder component addition</p>

</details>
<br />

1. Bind it to the **Complex Query Variable** created earlier.

2. Now, the **Query Component** is bound to the **Query Variable**, dynamically handling data requests.

<details>
  <summary>🖼️ View Query Builder binding result</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/23.png" />
<p style="text-align:center;">View Query Builder binding result</p>

</details>
<br />

**Before Editing the Query** - The query returns all **Confections** with quantities between **5 and 11**.

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/24.png" />
<p style="text-align:center;">View query results before editing</p>

<br />

**After Editing the Query**: - Modify the **WHERE clause** to return orders with **Quantity ≥ 10** by removing the second condition.

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/25.png" />
<p style="text-align:center;">View query results after editing</p>

## FAQs

1. Why doesn’t the Query Builder use OData?
OData lacks support for subqueries, while the Query Builder **primarily builds a conditions tree**, some expressions may be mapped to OData-compatible filters. However, full support is not guaranteed due to OData’s limitations.

Query Builder provides more flexibility by allowing direct control over the **filtering logic**, enabling better support for complex scenarios like subqueries, which OData does not natively support.

## Known Issues and Limitations

- **No Code Generation** - you will get "Component not supported" message upon trying to code-generate application with Query Variable or Query Builder
- **Query Component in Preview** - you have full control on the conditions, but you lose the bindings, you get the current values (5 and 10). You have to re-add the component and start over if you want to bring back the initial state of the variable.
- We are not allowing you **to set specific fields when making the request**, you will always get all the fields, because we don't have a mechanic to let other components know about this, which will lead to inconsistencies.
- **Query Builder Return Fields are disabled** - Disabling the query builder return fields change is necessary because, while selecting a subset of fields works data-wise, App Builder does not support dynamic structures. Consequently, when instantiating a Grid, it assumes that all columns are available
- If problems or inconsistencies appear, **refresh the page (F5)**.

### Cross-Cutting Feature Support

- **Repeater Support:** Not available.
- **Copy & Paste:**
  - Within the same view: **Supported**.
  - Across different views: Should it bring the linked Query Variable?
- **Bindable Properties:** Only the **"Query" property** supports variable binding.

### Server-Side Case Sensitivity

- If you implement your own data server, consider not configuring **case-sensitive field names**.

## Additional Resources

<div class="divider--half"></div>

- [Query Builder Support for API Projects](api-project-query-builder-support.md)
- [App Builder Components](../indigo-design-app-builder-components.md)
- [App Builder Interface Overview](../interface-overview.md)
- [Form Builder](form-builder.md)
- [Grid Remote Paging](grid-remote-paging.md)
- [Crud Operations](crud-operations.md)
- [Remote Data Operations](remote-data-operations.md)
- [Flex Layouts](../flex-layouts/flex-layouts.md)
- [Running Desktop App](../running-desktop-app.md)
