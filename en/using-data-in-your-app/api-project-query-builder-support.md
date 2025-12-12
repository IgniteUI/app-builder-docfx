---
title: Query Builder Support for API Projects
_description: App Builder's Query Builder enables developers to create dynamic data queries using a visual interface, leveraging Query Variables for efficient server-side filtering.
_keywords: App Builder, Query Builder, Query Variable, Data Filtering, Server-side Filtering, API Requests, Infragistics
---

# Query Builder Support for API Projects

## Overview

This guide outlines how to implement Query Builder Models and Utilities in your API Project to enable user-defined queries.  The implementation involves creating a controller, defining Query Builder models, and adding utilities for executing and generating SQL statements from these queries.  The resulting customization will allow users to construct complex queries with subqueries support, filtering, logical operators, and field selection, executed efficiently against a data source.

## Implementation Options

There are two approaches to implement Query Builder support in your API project:

| Approach | Best For | Effort Level |
|----------|----------|--------------|
| **NuGet Package** (`Infragistics.QueryBuilder. Executor`) | Quick integration, standard use cases | Low |
| **Manual Implementation** | Full customization, complex requirements | Medium-High |

## Option 1: Using the Infragistics.QueryBuilder. Executor NuGet Package (Recommended)

The `Infragistics.QueryBuilder. Executor` package provides ready-to-use classes, conditions, and methods that you can plug directly into your existing API project with minimal configuration.

[![NuGet](https://img.shields.io/nuget/v/Infragistics.QueryBuilder.Executor.svg)](https://www.nuget.org/packages/Infragistics.QueryBuilder.Executor/)

### Prerequisites

- .NET 8 or .NET 9
- Microsoft.EntityFrameworkCore
- AutoMapper
- An existing ASP.NET Core API project

### Step 1: Install the Package

```bash
dotnet add package Infragistics.QueryBuilder.Executor
```

### Step 2: Configure Services

In your `Program.cs` or `Startup.cs`, register the QueryBuilder service with your DbContext and result DTO:

```csharp
// Program.cs
builder.Services.AddQueryBuilder<MyDbContext, MyResultDto>();

// Required for SwaggerUI compatibility
builder.Services.AddControllers().AddNewtonsoftJson(o => 
    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
```

### Step 3: Expose the Query Endpoint

Configure the endpoint routing to expose the query builder functionality:

```csharp
app.UseEndpoints(endpoints => 
{ 
    endpoints.UseQueryBuilder<MyDbContext, MyResultDto>("/api/query"); 
});
```

### Step 4: Send Queries

Your API is now ready to accept query payloads. Here's an example request:

```json
{
    "Entity": "Users",
    "ReturnFields": ["Id", "Name", "Email"],
    "Operator": "And",
    "FilteringOperands": [
        {
            "FieldName": "IsActive",
            "Condition": { "Name": "equals" },
            "SearchVal": true
        },
        {
            "FieldName": "CreatedDate",
            "Condition": { "Name": "after" },
            "SearchVal": "2024-01-01"
        }
    ]
}
```

### Step 5: SQL Generation (Optional)

For diagnostics or analysis, you can generate SQL from the query model:

```csharp
var sql = SqlGenerator.GenerateSql(query);
Console.WriteLine(sql);
// Output: SELECT Id, Name, Email FROM Users WHERE IsActive = 1 AND CreatedDate > '2024-01-01'
```

## Option 2: Manual Implementation

For projects requiring full customization or complex entity mappings, you can implement the Query Builder manually.  The implementation is demonstrated in the [NorthwindAPI REST API](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder) project.

### Prerequisites

- A . NET Core or .NET API project
- Familiarity with LINQ, Entity Framework, or another ORM for data querying
- Basic knowledge of C# and ASP.NET Core controllers

### Step 1: Create the QueryBuilderController

The QueryBuilderController serves as the entry point for handling query requests.  It receives a Query object from the client, processes it using the QueryExecutor, and returns the results.  

Create a file named `QueryBuilderController.cs` in your Controllers directory:

```csharp
[ApiController]
[Route("[controller]")]
public class QueryBuilderController : ControllerBase
{
    private readonly DataContext dataContext;
    private readonly IMapper mapper;
    private readonly ILogger<QueryBuilderController> logger;

    public QueryBuilderController(DataContext dataContext, IMapper mapper, ILogger<QueryBuilderController> logger)
    {
        this.dataContext = dataContext;
        this.mapper = mapper;
        this.logger = logger;
    }

    [HttpPost("ExecuteQuery")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public ActionResult<QueryBuilderResult> ExecuteQuery(Query query)
    {
        var sanitizedEntity = query.Entity.Replace("\r", string.Empty).Replace("\n", string.Empty);
        logger.LogInformation("Executing query for entity: {Entity}", sanitizedEntity);
        var t = query.Entity.ToLower(CultureInfo.InvariantCulture);
        return Ok(new Dictionary<string, object[]?>
        {
            {
                t,
                t switch
                {
                    "addresses" => dataContext.Addresses.Run<AddressDb, AddressDto>(query, mapper),
                    "categories" => dataContext.Categories.Run<CategoryDb, CategoryDto>(query, mapper),
                    "products" => dataContext.Products.Run<ProductDb, ProductDto>(query, mapper),
                    "regions" => dataContext.Regions. Run<RegionDb, RegionDto>(query, mapper),
                    "territories" => dataContext.Territories. Run<TerritoryDb, TerritoryDto>(query, mapper),
                    "employees" => dataContext.Employees. Run<EmployeeDb, EmployeeDto>(query, mapper),
                    "customers" => dataContext.Customers.Run<CustomerDb, CustomerDto>(query, mapper),
                    "orders" => dataContext.Orders.Run<OrderDb, OrderDto>(query, mapper),
                    "orderdetails" => dataContext.OrderDetails.Run<OrderDetailDb, OrderDetailDto>(query, mapper),
                    "shippers" => dataContext.Shippers.Run<ShipperDb, ShipperDto>(query, mapper),
                    "suppliers" => dataContext.Suppliers.Run<SupplierDb, SupplierDto>(query, mapper),
                    _ => throw new InvalidOperationException($"Unknown entity {t}"),
                }
            },
        });
    }
}
```

For a complete example, see [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs).

### Step 2: Define Query Builder Models

The Query Builder relies on a set of models to represent the query structure. Place these in a `QueryBuilder` directory or namespace.  

#### FilterType Enum

Defines logical operators for combining filters:

```csharp
public enum FilterType
{
    And = 0,
    Or = 1,
}
```

#### Query Class

Represents the overall query structure:

```csharp
public class Query
{
    public string Entity { get; set; }
    public string[] ReturnFields { get; set; }
    public FilterType Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

| Property | Description |
|----------|-------------|
| `Entity` | The target entity/table being queried (e.g., "Products") |
| `ReturnFields` | Fields to include in the result (e.g., `["Name", "Price"]` or `["*"]` for all) |
| `Operator` | Logical operator (`And` or `Or`) for combining filters |
| `FilteringOperands` | Array of QueryFilter objects defining conditions |

#### QueryFilter Class

Represents an individual filtering condition:

```csharp
public class QueryFilter
{
    // Basic condition
    public string?  FieldName { get; set; }
    public bool? IgnoreCase { get; set; }
    public QueryFilterCondition? Condition { get; set; }
    public object? SearchVal { get; set; }
    public Query? SearchTree { get; set; }
    // And/Or
    public FilterType?  Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

#### QueryFilterCondition Class

Defines available filtering conditions:

```csharp
public class QueryFilterCondition
{
    public string Name { get; set; }
    public bool IsUnary { get; set; }
    public string IconName { get; set; }
}
```

For reference, see [NorthwindAPI QueryBuilder Models](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder).

### Step 3: Implement QueryExecutor

The QueryExecutor class processes Query objects and translates them into LINQ expressions for execution against IQueryable data sources.

```csharp
private static Expression BuildConditionExpression<TEntity>(
    DataContext db, 
    IQueryable<TEntity> source, 
    QueryFilter filter, 
    ParameterExpression parameter)
{
    if (filter. FieldName is not null && filter.Condition is not null)
    {
        var property = source.ElementType.GetProperty(
            filter.FieldName, 
            BindingFlags. IgnoreCase | BindingFlags.Public | BindingFlags. Instance)
            ?? throw new InvalidOperationException($"Property '{filter.FieldName}' not found");
        
        var field = Expression.Property(parameter, property);
        var targetType = property.PropertyType;
        var searchValue = GetSearchValue(filter.SearchVal, targetType);
        
        Expression condition = filter.Condition.Name switch
        {
            "null"                  => Expression.Equal(field, Expression.Constant(null)),
            "notNull"               => Expression.NotEqual(field, Expression.Constant(null)),
            "empty"                 => Expression.Equal(field, Expression.Constant(string.Empty)),
            "notEmpty"              => Expression.NotEqual(field, Expression.Constant(string.Empty)),
            "equals"                => Expression.Equal(field, searchValue),
            "doesNotEqual"          => Expression.NotEqual(field, searchValue),
            "inQuery"               => BuildInExpression(db, filter.SearchTree, field),
            "notInQuery"            => Expression.Not(BuildInExpression(db, filter.SearchTree, field)),
            "contains"              => CallContains(field, searchValue),
            "doesNotContain"        => Expression.Not(CallContains(field, searchValue)),
            "startsWith"            => CallStartsWith(field, searchValue),
            "endsWith"              => CallEndsWith(field, searchValue),
            "greaterThan"           => Expression.GreaterThan(field, searchValue),
            "lessThan"              => Expression.LessThan(field, searchValue),
            "greaterThanOrEqualTo"  => Expression.GreaterThanOrEqual(field, searchValue),
            "lessThanOrEqualTo"     => Expression.LessThanOrEqual(field, searchValue),
            "before"                => Expression.LessThan(field, searchValue),
            "after"                 => Expression.GreaterThan(field, searchValue),
            "today"                 => BuildTodayExpression(field),
            "yesterday"             => BuildYesterdayExpression(field),
            "thisMonth"             => BuildThisMonthExpression(field),
            "lastMonth"             => BuildLastMonthExpression(field),
            "nextMonth"             => BuildNextMonthExpression(field),
            "thisYear"              => BuildThisYearExpression(field),
            "lastYear"              => BuildLastYearExpression(field),
            "nextYear"              => BuildNextYearExpression(field),
            "true"                  => Expression.Equal(field, Expression.Constant(true)),
            "false"                 => Expression.Equal(field, Expression.Constant(false)),
            _                       => throw new NotImplementedException($"Condition not implemented: {filter.Condition. Name}"),
        };

        return condition;
    }
    else
    {
        // Handle nested filter groups
        var subexpressions = filter.FilteringOperands? 
            .Select(f => BuildConditionExpression(db, source, f, parameter))
            .ToArray();
        
        if (subexpressions == null || ! subexpressions.Any())
            return Expression. Constant(true);

        return filter.Operator == FilterType.And
            ? subexpressions. Aggregate(Expression.AndAlso)
            : subexpressions.Aggregate(Expression.OrElse);
    }
}
```

## Supported Filter Conditions

Both implementation options support the following filter conditions, which align with the Angular Query Builder component (`IgxQueryBuilderComponent`):

### String Conditions

| Condition | Description |
|-----------|-------------|
| `contains` | Field contains the search value |
| `doesNotContain` | Field does not contain the search value |
| `startsWith` | Field starts with the search value |
| `endsWith` | Field ends with the search value |
| `equals` | Field equals the search value |
| `doesNotEqual` | Field does not equal the search value |
| `empty` | Field is empty |
| `notEmpty` | Field is not empty |
| `null` | Field is null |
| `notNull` | Field is not null |

### Numeric Conditions

| Condition | Description |
|-----------|-------------|
| `equals` | Field equals the search value |
| `doesNotEqual` | Field does not equal the search value |
| `greaterThan` | Field is greater than the search value |
| `lessThan` | Field is less than the search value |
| `greaterThanOrEqualTo` | Field is greater than or equal to the search value |
| `lessThanOrEqualTo` | Field is less than or equal to the search value |
| `empty` | Field is empty/zero |
| `notEmpty` | Field is not empty/zero |
| `null` | Field is null |
| `notNull` | Field is not null |

### Date/Time Conditions

| Condition | Description |
|-----------|-------------|
| `equals` | Field equals the search value |
| `doesNotEqual` | Field does not equal the search value |
| `before` | Field is before the search value |
| `after` | Field is after the search value |
| `today` | Field matches today's date |
| `yesterday` | Field matches yesterday's date |
| `thisMonth` | Field is within the current month |
| `lastMonth` | Field is within the previous month |
| `nextMonth` | Field is within the next month |
| `thisYear` | Field is within the current year |
| `lastYear` | Field is within the previous year |
| `nextYear` | Field is within the next year |
| `null` | Field is null |
| `notNull` | Field is not null |

### Boolean Conditions

| Condition | Description |
|-----------|-------------|
| `true` | Field is true |
| `false` | Field is false |
| `null` | Field is null |
| `notNull` | Field is not null |

### Subquery Conditions

| Condition | Description |
|-----------|-------------|
| `inQuery` | Field value exists in the subquery results |
| `notInQuery` | Field value does not exist in the subquery results |


## Angular Frontend Integration

The Query Builder API is designed to work seamlessly with the **Ignite UI for Angular Query Builder component** (`IgxQueryBuilderComponent`). The component generates query structures that match the expected API payload format.

### Key Angular Components

From the `IgniteUI/igniteui-angular` repository:

```typescript
import {
    FilteringExpressionsTree,
    FilteringLogic,
    IgxQueryBuilderComponent,
    IExpressionTree,
    IgxNumberFilteringOperand,
    IgxStringFilteringOperand,
    IgxBooleanFilteringOperand,
    IgxDateFilteringOperand,
    IgxTimeFilteringOperand,
    IgxDateTimeFilteringOperand
} from 'igniteui-angular';
```

### Example: Creating a Query Expression Tree

```typescript
// Define entities and fields
const entities = [
    {
        name: 'Products',
        fields: [
            { field: 'productId', dataType: 'number' },
            { field: 'productName', dataType: 'string' },
            { field: 'unitPrice', dataType: 'number' },
            { field: 'discontinued', dataType: 'boolean' },
            { field: 'categoryId', dataType: 'number' }
        ]
    },
    {
        name: 'OrderDetails',
        fields: [
            { field: 'productId', dataType: 'number' },
            { field: 'quantity', dataType: 'number' },
            { field: 'discount', dataType: 'number' }
        ]
    }
];

// Build a complex query with subquery
const innerTree = new FilteringExpressionsTree(
    FilteringLogic. And, 
    undefined, 
    'OrderDetails', 
    ['productId']
);

innerTree.filteringOperands. push({
    fieldName: 'quantity',
    condition: IgxNumberFilteringOperand. instance().condition('greaterThanOrEqualTo'),
    conditionName: 'greaterThanOrEqualTo',
    searchVal: 10
});

const mainTree = new FilteringExpressionsTree(
    FilteringLogic.And, 
    undefined, 
    'Products', 
    ['*']
);

mainTree.filteringOperands.push({
    fieldName: 'productId',
    condition: IgxStringFilteringOperand.instance().condition('inQuery'),
    conditionName:  'inQuery',
    searchTree: innerTree
});

mainTree.filteringOperands.push({
    fieldName: 'discontinued',
    condition: IgxBooleanFilteringOperand.instance().condition('false'),
    conditionName: 'false'
});
```

### Using the Query Builder Component

```html
<igx-query-builder 
    #queryBuilder
    [entities]="entities"
    [expressionTree]="expressionTree"
    (expressionTreeChange)="onQueryChange($event)">
    <igx-query-builder-header [title]="'Product Query Builder'">
    </igx-query-builder-header>
</igx-query-builder>
```

## Example:  Complex Query with Subquery

### Query Payload

```json
{
    "filteringOperands": [
        {
            "fieldName": "categoryId",
            "condition": {
                "name": "equals",
                "isUnary": false,
                "iconName": "filter_equal"
            },
            "conditionName": "equals",
            "searchVal": 1,
            "searchTree": null,
            "ignoreCase": true
        },
        {
            "fieldName": "productId",
            "condition": {
                "name": "inQuery",
                "isUnary": false,
                "isNestedQuery": true,
                "iconName": "in"
            },
            "conditionName": "inQuery",
            "searchVal": null,
            "searchTree": {
                "filteringOperands": [
                    {
                        "fieldName": "quantity",
                        "condition": {
                            "name": "greaterThanOrEqualTo",
                            "isUnary": false,
                            "iconName": "filter_greater_than_or_equal"
                        },
                        "conditionName": "greaterThanOrEqualTo",
                        "searchVal": 10,
                        "searchTree": null,
                        "ignoreCase": true
                    },
                    {
                        "fieldName": "quantity",
                        "condition": {
                            "name": "lessThanOrEqualTo",
                            "isUnary": false,
                            "iconName": "filter_less_than_or_equal"
                        },
                        "conditionName": "lessThanOrEqualTo",
                        "searchVal": 15,
                        "searchTree": null,
                        "ignoreCase": true
                    }
                ],
                "operator": 0,
                "entity": "orderDetails",
                "returnFields": [
                    "productId"
                ]
            },
            "ignoreCase": true
        }
    ],
    "operator": 0,
    "entity": "products",
    "returnFields": [
        "productId",
        "productName",
        "supplierId",
        "categoryId",
        "quantityPerUnit",
        "unitPrice",
        "unitsInStock",
        "unitsOnOrder",
        "reorderLevel",
        "discontinued"
    ]
}
```

### Generated SQL Output

```sql
SELECT * 
FROM products 
WHERE categoryId = {{selectedCategory}} 
AND productId IN ( 
    SELECT productId 
    FROM orderDetails 
    WHERE quantity >= {{quantityGreaterThan}} 
    AND quantity <= {{quantityLessThan}} 
)
```

### API Endpoint

```
POST https://data-northwind.appbuilder.dev/QueryBuilder/ExecuteQuery
Content-Type: application/json
```

## Localization Support

The Angular Query Builder component includes built-in localization support for filter condition labels.  The `igniteui-angular` repository provides resource strings in multiple languages including:

- English (EN) - Default
- French (FR)
- German (DE)
- Spanish (ES)
- Italian (IT)
- Portuguese (PT)
- Polish (PL)
- Swedish (SV)
- And more...

Example resource strings:  

```typescript
export const QueryBuilderResourceStringsEN: IQueryBuilderResourceStrings = {
    igx_query_builder_filter_contains: 'Contains',
    igx_query_builder_filter_doesNotContain: 'Does Not Contain',
    igx_query_builder_filter_startsWith: 'Starts With',
    igx_query_builder_filter_endsWith: 'Ends With',
    igx_query_builder_filter_equals:  'Equals',
    igx_query_builder_filter_doesNotEqual: 'Does Not Equal',
    igx_query_builder_filter_greaterThan: 'Greater Than',
    igx_query_builder_filter_lessThan: 'Less Than',
    // ... more strings
};
```

## Additional References

- [Infragistics. QueryBuilder. Executor NuGet Package](https://www.nuget.org/packages/Infragistics.QueryBuilder.Executor/)
- [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs)
- [NorthwindAPI QueryBuilder Models](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)
- [Ignite UI for Angular Query Builder Component](https://github.com/IgniteUI/igniteui-angular/tree/master/projects/igniteui-angular/query-builder)
- [Query Builder Usage Step-by-Step Guide](query-builder-step-by-step-guide.md)
