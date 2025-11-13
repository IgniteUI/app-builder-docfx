---
title: API プロジェクト向けのクエリ ビルダーのサポート
_description: App Builder のクエリ ビルダーを使用すると、開発者はビジュアル インターフェイスを使用して動的なデータ クエリを作成し、クエリ変数を活用して効率的なサーバー側フィルタリングが可能になります。
_keywords: App Builder, Query Builder, クエリ変数, データ フィルタリング, サーバー側フィルタリング, API リクエスト, インフラジスティックス
_language: ja
---

# API プロジェクト向けのクエリ ビルダーのサポート

## 概要

このガイドでは、ユーザー定義のクエリを有効にするために、API プロジェクトにクエリ ビルダー モデルとユーティリティを実装する方法について説明します。実装には、コントローラーの作成、クエリ ビルダー モデルの定義、およびこれらのクエリから SQL ステートメントを実行および生成するためのユーティリティの追加が含まれます。結果として得られるカスタマイズにより、ユーザーはサブクエリのサポート、フィルタリング、論理演算子、フィールド選択を使用して複雑なクエリを構築し、データ ソースに対して効率的に実行できるようになります。

この実装はすでに [NorthwindAPI REST API](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder) プロジェクトの一部になっています。これらは NorthwindAPI QueryBuilderController と NorthwindAPI QueryBuilder モデルの例です: [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs) と [NorthwindAPI QueryBuilder モデル](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)。

[クエリ ビルダーの使用方法のステップ バイ ステップ ガイド](query-builder-step-by-step-guide.md)のトピックでは、クエリ ビルダー変数とコンポーネントを [App Builder プレビュー版環境](https://preview.appbuilder.dev/)の一部として使用する方法について詳しく説明します。

## 前提条件

- .NET Core または .NET API プロジェクト。
- LINQ、Entity Framework、またはその他の ORM を使用したデータ クエリの基礎知識。
- C# および ASP.NET Core コントローラーの基本的な理解。

## 手順 1: QueryBuilderController の作成

QueryBuilderController は、クエリ リクエストを処理するためのエントリ ポイントとして機能します。クライアントから Query オブジェクトを受け取り、QueryExecutor または SqlGenerator を使用して処理し、結果を返します。

### 実装

Controllers ディレクトリに QueryBuilderController.cs という名前のファイルを作成します。

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
                    "employees" => dataContext.Employees.Run<EmployeeDb, EmployeeDto>(query, mapper),
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
```

- 目的: POST リクエストで Query オブジェクトを受け取り、QueryExecutor に処理を委ねます。
- 依存性の注入: QueryExecutor を注入してクエリの処理を実行します (DI コンテナーで設定)。

完全な例については、[NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs) を参照してください。


## 手順 2: クエリ ビルダー モデルの定義

クエリ ビルダーは、クエリ構造を表すためのモデル郡に依存します。これらを QueryBuilder ディレクトリまたは名前空間 (例: YourNamespace.QueryBuilder) に配置します。

### FilterType 列挙型

フィルターを組み合わせるための論理演算子を定義します。

```
public enum FilterType
{
    And = 0,
    Or = 1,
}
```

- And: フィルターを論理 AND で結合します。
- Or: フィルターを論理 OR で結合します。


### Query クラス

クエリ全体の構造を表します。

```
public class Query
{
    public string Entity { get; set; }
    public string[] ReturnFields { get; set; }
    public FilterType Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

- Entity: クエリの対象となるエンティティ/テーブル (例: "Products")。
- ReturnFields: 結果に含めるフィールド (例: ["Name", "Price"]、またはすべてを表す ["*"])。
- Operator: フィルターを組み合わせるための論理演算子 (And または Or)。
- FilteringOperands: 条件を定義する QueryFilter オブジェクトの配列。

### QueryFilter クラス

個別のフィルタリング条件を表します。

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

- FieldName: フィルタリングするフィールド (例: "Price")。
- IgnoreCase: フィルターが大文字と小文字を区別するかどうか。
- Condition: 比較タイプ (例: "Equals"、"GreaterThan")。
- SearchVal: 比較する値 (例: 100)。
- SearchTree: サブクエリのネストされたクエリ。
- Operator: 複合条件の論理演算子。
- FilteringOperands: ネストされたフィルターまたは複合フィルターの配列。

### QueryFilterCondition クラス

使用可能なフィルタリング条件を定義します。

```
public class QueryFilterCondition
{
    public string Name { get; set; }
    public bool IsUnary { get; set; }
    public string IconName { get; set; }
}
```

- Name: 条件識別子 (例: "Equals"、"Contains")。
- IsUnary: 単一オペランド条件の場合は True です (例: "IsNull")。
- IconName: UI アイコン識別子 (オプション)。

詳細な実装は、[NorthwindAPI QueryBuilder モデル](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)を参照してください。

## 手順 3: QueryExecutor の実装

QueryExecutor クラスは、Query オブジェクトを処理し、 LINQ 式に変換して IQueryable データ ソースに対して実行します。

### 実装

QueryExecutor.cs という名前の新しいファイルを作成します。

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

- SELECT 句: フィールド選択を構築するか、デフォルトで * に設定します。
- WHERE 句: フィルター条件を AND/OR 演算子で組み合わせます。
- 注: 特定の条件をサポートするには、BuildCondition を実装します (例: "Equals" → =, "Contains" → LIKE)。

## 使用例の結果

複雑なクエリのサンプル

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

**SQL 出力**

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

リクエスト本文に filteringExpressionTree を含む POST リクエスト

```
https://data-northwind.appbuilder.dev/QueryBuilder/ExecuteQuery
```

## その他の参考資料

- [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs)
- [NorthwindAPI QueryBuilder モデル](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)

## その他のリソース

<div class="divider--half"></div>

- [クエリ ビルダーの使用方法のステップ バイス テップ ガイド](query-builder-step-by-step-guide.md)
- [App Builder コンポーネント](../indigo-design-app-builder-components.md)
- [App Builder インターフェイスの概要](../interface-overview.md)
- [フォーム ビルダー](form-builder.md)
- [グリッド リモート ページング](grid-remote-paging.md)
- [CRUD 操作](crud-operations.md)
- [リモート データ操作](remote-data-operations.md)
- [Flex レイアウト](../flex-layouts/flex-layouts.md)
- [Desktop アプリの実行方法](../running-desktop-app.md)
