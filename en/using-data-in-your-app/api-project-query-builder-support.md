---
title: Query Builder Support for API Projects
_description: App Builder's Query Builder enables developers to create dynamic data queries using a visual interface, leveraging Query Variables for efficient server-side filtering.
_keywords: App Builder, Query Builder, Query Variable, Data Filtering, Server-side Filtering, API Requests, Infragistics
---

# Query Builder Support for API Projects

## Overview
This guide outlines how to implement a Query Builder Models and Utilities in your API  Project, to enable user-defined queries. The implementation involves creating a controller, defining Query Builder models, and adding utilities for executing and generating SQL statements from these queries. The resulting customization will allow users to construct complex queries with subqueries support, filtering, logical operators, and field selection, executed efficiently against a data source.

The implementation is already part of the [NorthwindAPI REST API](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder) project. Here are the examples for [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs) and [NorthwindAPI QueryBuilder Models](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder).

The [Query Builder Usage Step-by-Step-Guide](query-builder-step-by-step-guide.md) topic explains in details how to use the Query Builder Variable and Component as part of [App Builder](https://preview.appbuilder.dev/) preview environment.

## Prerequisites

- A .NET Core or .NET API project.
- Familiarity with LINQ, Entity Framework, or another ORM for data querying.
- Basic knowledge of C# and ASP.NET Core controllers.

## Step 1: Create the QueryBuilderController

The QueryBuilderController serves as the entry point for handling query requests. It receives a Query object from the client, processes it using the QueryExecutor or SqlGenerator, and returns the results.

### Implementation

Create a file named QueryBuilderController.cs in your Controllers directory:

```
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
                    "regions" => dataContext.Regions.Run<RegionDb, RegionDto>(query, mapper),
                    "territories" => dataContext.Territories.Run<TerritoryDb, TerritoryDto>(query, mapper),
                    "employees" => dataContext.Employees.Run<EmployeeDb, EmployeeDto>(query, mapper)
                    "customers" => dataContext.Customers.Run<CustomerDb, CustomerDto>(query, mapper),
                    "orders" => dataContext.Orders.Run<OrderDb, OrderDto>(query, mapper),
                    "orderdetails" => dataContext.OrderDetails.Run<OrderDetailDb, OrderDetailDto>(query, mapper),
                    "shippers" => dataContext.Shippers.Run<ShipperDb, ShipperDto>(query, mapper),
                    "suppliers" => dataContext.Suppliers.Run<SupplierDb, SupplierDto>(query, mapper),
                    _ => throw new InvalidOperationException($"Unknown entity ${t}"),
                }
            },
        });
    }
```

*   Purpose: Accepts a Query object via POST request and delegates execution to the QueryExecutor.
*   Dependency Injection: Injects QueryExecutor for processing queries (configure this in your DI container).
    
For a complete example, see [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs).


## Step 2: Define Query Builder Models

The Query Builder relies on a set of models to represent the query structure. Place these in a QueryBuilder directory or namespace (e.g., YourNamespace.QueryBuilder).

### FilterType Enum

Defines logical operators for combining filters.

```
public enum FilterType
{
    And = 0,
    Or = 1,
}
```

*   And: Combines filters with a logical AND.
*   Or: Combines filters with a logical OR.
    

### Query Class

Represents the overall query structure.

```
public class Query
{
    public string Entity { get; set; }
    public string[] ReturnFields { get; set; }
    public FilterType Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

*   Entity: The target entity/table being queried (e.g., "Products").
*   ReturnFields: Fields to include in the result (e.g., ["Name", "Price"] or ["*"] for all).
*   Operator: Logical operator (And or Or) for combining filters.
*   FilteringOperands: Array of QueryFilter objects defining conditions.

### QueryFilter Class

Represents an individual filtering condition.

```
public class QueryFilter
{
    // Basic condition
    public string? FieldName { get; set; }
    public bool? IgnoreCase { get; set; }
    public QueryFilterCondition? Condition { get; set; }
    public object? SearchVal { get; set; }
    public Query? SearchTree { get; set; }
    // And/Or
    public FilterType? Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

*   FieldName: The field to filter (e.g., "Price").
*   IgnoreCase: Whether the filter is case-insensitive.
*   Condition: The comparison type (e.g., "Equals", "GreaterThan").
*   SearchVal: Value to compare against (e.g., 100).
*   SearchTree: Nested query for subqueries.
*   Operator: Logical operator for compound conditions.
*   FilteringOperands: Array for nested or compound filters.
    
### QueryFilterCondition Class

Defines available filtering conditions.

```
public class QueryFilterCondition
{
    public string Name { get; set; }
    public bool IsUnary { get; set; }
    public string IconName { get; set; }
}
```

*   Name: Condition identifier (e.g., "Equals", "Contains").
*   IsUnary: True for single-operand conditions (e.g., "IsNull").
*   IconName: UI icon identifier (optional).

For reference, see [NorthwindAPI QueryBuilder Models](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder).

## Step 3: Implement QueryExecutor

The QueryExecutor class processes Query objects and translates them into LINQ expressions for execution against IQueryable data sources.

### Implementation

Create a file named QueryExecutor.cs:

```
...
private static Expression BuildConditionExpression<TEntity>(DataContext db, IQueryable<TEntity> source, QueryFilter filter, ParameterExpression parameter)
    {
        if (filter.FieldName is not null && filter.Condition is not null)
        {
            var property = source.ElementType.GetProperty(filter.FieldName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance)
                                 ?? throw new InvalidOperationException($"Property '{filter.FieldName}' not found on type '{source.ElementType}'");
            var field = Expression.Property(parameter, property);
            var targetType = property.PropertyType;
            var searchValue = GetSearchValue(filter.SearchVal, targetType);
            var emptyValue = GetEmptyValue(targetType);
            var today = DateTime.Now.Date;
            Expression condition = filter.Condition.Name switch
            {
                "null"                  => targetType.IsNullableType() ? Expression.Equal(field, Expression.Constant(targetType.GetDefaultValue())) : Expression.Constant(false),
                "notNull"               => targetType.IsNullableType() ? Expression.NotEqual(field, Expression.Constant(targetType.GetDefaultValue())) : Expression.Constant(true),
                "empty"                 => Expression.Or(Expression.Equal(field, emptyValue), targetType.IsNullableType() ? Expression.Equal(field, Expression.Constant(targetType.GetDefaultValue())) : Expression.Constant(false)),
                "notEmpty"              => Expression.And(Expression.NotEqual(field, emptyValue), targetType.IsNullableType() ? Expression.NotEqual(field, Expression.Constant(targetType.GetDefaultValue())) : Expression.Constant(true)),
                "equals"                => Expression.Equal(field, searchValue),
                "doesNotEqual"          => Expression.NotEqual(field, searchValue),
                "inQuery"               => BuildInExpression(db, filter.SearchTree, field),
                "notInQuery"            => Expression.Not(BuildInExpression(db, filter.SearchTree, field)),
                "contains"              => CallContains(field, searchValue),
                "doesNotContain"        => Expression.Not(CallContains(field, searchValue)),
                "startsWith"            => CallStartsWith(field, searchValue),
                "endsWith"              => CallEndsWith(field, searchValue),
                "greaterThan"           => Expression.GreaterThan(field, searchValue),
                "lessThan"              => Expression.LessThan(field, searchValue),
                "greaterThanOrEqualTo"  => Expression.GreaterThanOrEqual(field, searchValue),
                "lessThanOrEqualTo"     => Expression.LessThanOrEqual(field, searchValue),
                "before"                => Expression.LessThan(CallCompare(field, searchValue), Expression.Constant(0)),
                "after"                 => Expression.GreaterThan(CallCompare(field, searchValue), Expression.Constant(0)),
                "today"                 => CallStartsWith(field, today.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)),
                "yesterday"             => CallStartsWith(field, today.AddDays(-1).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)),
                "thisMonth"             => CallStartsWith(field, today.ToString("yyyy-MM", CultureInfo.InvariantCulture)),
                "lastMonth"             => CallStartsWith(field, today.AddMonths(-1).ToString("yyyy-MM", CultureInfo.InvariantCulture)),
                "nextMonth"             => CallStartsWith(field, today.AddMonths(1).ToString("yyyy-MM", CultureInfo.InvariantCulture)),
                "thisYear"              => CallStartsWith(field, today.ToString("yyyy", CultureInfo.InvariantCulture)),
                "lastYear"              => CallStartsWith(field, today.AddYears(-1).ToString("yyyy", CultureInfo.InvariantCulture)),
                "nextYear"              => CallStartsWith(field, today.AddYears(1).ToString("yyyy", CultureInfo.InvariantCulture)),
                "at"                    => Expression.Equal(field, searchValue),
                "not_at"                => Expression.NotEqual(field, searchValue),
                "at_before"             => Expression.LessThan(CallCompare(field, searchValue), Expression.Constant(0)),
                "at_after"              => Expression.GreaterThan(CallCompare(field, searchValue), Expression.Constant(0)),
                "all"                   => Expression.Constant(true),
                "true"                  => Expression.Equal(field, Expression.Constant(true)),
                "false"                 => Expression.Equal(field, Expression.Constant(false)),
                _                       => throw new NotImplementedException("Not implemented"),
            };

            if (filter.IgnoreCase == true && field.Type == typeof(string))
            {
                // TODO: Implement case-insensitive comparison
            }

            return condition;
        }
        else
        {
            var subexpressions = filter.FilteringOperands?.Select(f => BuildConditionExpression(db, source, f, parameter)).ToArray();
            if (subexpressions == null || !subexpressions.Any())
            {
                return Expression.Constant(true);
            }

            return filter.Operator == FilterType.And
                ? subexpressions.Aggregate(Expression.AndAlso)
                : subexpressions.Aggregate(Expression.OrElse);
        }
    }
...
```

*   SELECT Clause: Builds field selection or defaults to *.
*   WHERE Clause: Combines filter conditions with AND/OR operators.
*   Notes: Implement BuildCondition to support your specific conditions (e.g., "Equals" → =, "Contains" → LIKE).

## Example Usage Result

Sample Complex Query

```
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

**SQL Output**

```
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

POST Request with filteringExpressionTree in the Request Body

```
https://data-northwind.appbuilder.dev/QueryBuilder/ExecuteQuery
```

## Additional References

- [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs)
- [NorthwindAPI QueryBuilder Models](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)

## Additional Resources

<div class="divider--half"></div>

* [Query Builder Usage Step-by-Step-Guide](query-builder-step-by-step-guide.md)
* [App Builder Components](../indigo-design-app-builder-components.md)
* [App Builder Interface Overview](../interface-overview.md)
* [Form Builder](form-builder.md)
* [Grid Remote Paging](grid-remote-paging.md)
* [Crud Operations](crud-operations.md)
* [Remote Data Operations](remote-data-operations.md)
* [Flex Layouts](../flex-layouts/flex-layouts.md)
* [Running Desktop App](../running-desktop-app.md)
