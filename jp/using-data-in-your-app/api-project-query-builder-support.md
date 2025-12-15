---
title: API プロジェクト向けのクエリ ビルダーのサポート
_description: App Builder のクエリ ビルダーを使用すると、開発者はビジュアル インターフェイスを使用して動的なデータ クエリを作成し、クエリ変数を活用して効率的なサーバー側フィルタリングが可能になります。
_keywords: App Builder, Query Builder, クエリ変数, データ フィルタリング, サーバー側フィルタリング, API リクエスト, インフラジスティックス
_language: ja
---

# API プロジェクト向けのクエリ ビルダーのサポート

## 概要

このガイドでは、ユーザー定義のクエリを有効にするために、API プロジェクトにクエリ ビルダー モデルとユーティリティを実装する方法について説明します。実装には、コントローラーの作成、クエリ ビルダー モデルの定義、およびこれらのクエリから SQL ステートメントを実行および生成するためのユーティリティの追加が含まれます。結果として得られるカスタマイズにより、ユーザーはサブクエリのサポート、フィルタリング、論理演算子、フィールド選択を使用して複雑なクエリを構築し、データ ソースに対して効率的に実行できるようになります。

## 実装オプション

API プロジェクトでクエリ ビルダー サポートを実装するには、2 つの方法があります。

| 方法 | 最適な用途 | 作業レベル |
|----------|----------|--------------|
| **NuGet パッケージ** (`Infragistics.QueryBuilder.Executor`) | 迅速な統合、標準的なユース ケース | 低 |
| **手動での実装** | 完全なカスタマイズ、複雑な要件 | 中～高 |

## オプション 1: Infragistics.QueryBuilder.Executor NuGet パッケージの使用 (推奨)

`Infragistics.QueryBuilder.Executor` パッケージは、最小限の構成で既存の API プロジェクトに直接組み込むことができる、すぐに使用できるクラス、条件、およびメソッドを提供します。

[![NuGet](https://img.shields.io/nuget/v/Infragistics.QueryBuilder.Executor.svg)](https://www.nuget.org/packages/Infragistics.QueryBuilder.Executor/)

### 前提条件

- .NET 8 または .NET 9
- Microsoft.EntityFrameworkCore
- AutoMapper
- 既存の ASP.NET Core API プロジェクト

### 手順 1: パッケージのインストール

```bash
dotnet add package Infragistics.QueryBuilder.Executor
```

### 手順 2: サービスの構成

`Program.cs` または `Startup.cs` で、DbContext と結果 DTO を使用して QueryBuilder サービスを登録します。

```csharp
// Program.cs
builder.Services.AddQueryBuilder<MyDbContext, MyResultDto>();

// Required for SwaggerUI compatibility
builder.Services.AddControllers().AddNewtonsoftJson(o => 
    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
```

### 手順 3: クエリ エンドポイントの公開

クエリ ビルダー機能を公開するためにエンドポイント ルーティングを構成します。

```csharp
app.UseEndpoints(endpoints => 
{ 
    endpoints.UseQueryBuilder<MyDbContext, MyResultDto>("/api/query"); 
});
```

### 手順 4: クエリの送信

API がクエリ ペイロードを受け入れる準備が整いました。以下はリクエストの例です。

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

### 手順 5: SQL の生成 (オプション)

診断や分析のために、クエリ モデルから SQL を生成できます。

```csharp
var sql = SqlGenerator.GenerateSql(query);
Console.WriteLine(sql);
// Output: SELECT Id, Name, Email FROM Users WHERE IsActive = 1 AND CreatedDate > '2024-01-01'
```

## オプション 2: 手動での実装

完全なカスタマイズや複雑なエンティティ マッピングが必要なプロジェクトでは、クエリ ビルダーを手動で実装できます。実装は [NorthwindAPI REST API](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder) プロジェクトで示されています。

### 前提条件

- .NET Core または .NET API プロジェクト。
- LINQ、Entity Framework、またはその他の ORM を使用したデータ クエリの基礎知識。
- C# および ASP.NET Core コントローラーの基本的な理解。

### 手順 1: QueryBuilderController の作成

QueryBuilderController は、クエリ リクエストを処理するためのエントリ ポイントとして機能します。クライアントから Query オブジェクトを受け取り、QueryExecutor を使用して処理し、結果を返します。

Controllers ディレクトリに `QueryBuilderController.cs` という名前のファイルを作成します。

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

完全な例については、[NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs) を参照してください。


### 手順 2: クエリ ビルダー モデルの定義

クエリ ビルダーは、クエリ構造を表すためのモデル郡に依存します。これらを `QueryBuilder` ディレクトリまたは名前空間に配置します。

#### FilterType 列挙型

フィルターを組み合わせるための論理演算子を定義します。

```csharp
public enum FilterType
{
    And = 0,
    Or = 1,
}
```

#### Query クラス

クエリ全体の構造を表します。

```csharp
public class Query
{
    public string Entity { get; set; }
    public string[] ReturnFields { get; set; }
    public FilterType Operator { get; set; }
    public QueryFilter[] FilteringOperands { get; set; }
}
```

| プロパティ | 説明 |
|----------|-------------|
| `Entity` | クエリの対象となるエンティティ/テーブル (例: "Products")。 |
| `ReturnFields` | 結果に含めるフィールド (例: `["Name", "Price"]`、またはすべてを表す `["*"]`)。 |
| `Operator` | フィルターを組み合わせるための論理演算子 (`And` または `Or`)。 |
| `FilteringOperands` | 条件を定義する QueryFilter オブジェクトの配列。 |

#### QueryFilter クラス

個別のフィルタリング条件を表します。

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

#### QueryFilterCondition クラス

使用可能なフィルタリング条件を定義します。

```csharp
public class QueryFilterCondition
{
    public string Name { get; set; }
    public bool IsUnary { get; set; }
    public string IconName { get; set; }
}
```

詳細な実装は、[NorthwindAPI QueryBuilder モデル](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)を参照してください。

### 手順 3: QueryExecutor の実装

QueryExecutor クラスは、Query オブジェクトを処理し、LINQ 式に変換して IQueryable データ ソースに対して実行します。

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

## サポートされているフィルター条件

どちらの実装オプションも、Angular クエリ ビルダー コンポーネント (`IgxQueryBuilderComponent`) に対応する以下のフィルター条件をサポートしています。

### 文字列の条件

| 条件 | 説明 |
|-----------|-------------|
| `contains` | フィールドに検索値が含まれる |
| `doesNotContain` | フィールドに検索値が含まれない |
| `startsWith` | フィールドが検索値で始まる |
| `endsWith` | フィールドが検索値で終わる |
| `equals` | フィールドが検索値と等しい |
| `doesNotEqual` | フィールドが検索値と等しくない |
| `empty` | フィールドが空 |
| `notEmpty` | フィールドが空でない |
| `null` | フィールドが null |
| `notNull` | フィールドが null でない |

### 数値の条件

| 条件 | 説明 |
|-----------|-------------|
| `equals` | フィールドが検索値と等しい |
| `doesNotEqual` | フィールドが検索値と等しくない |
| `greaterThan` | フィールドが検索値より大きい |
| `lessThan` | フィールドが検索値より小さい |
| `greaterThanOrEqualTo` | フィールドが検索値より大きい |
| `lessThanOrEqualTo` | フィールドが検索値より小さい |
| `empty` | フィールドが空/ゼロ |
| `notEmpty` | フィールドが空/ゼロでない |
| `null` | フィールドが null |
| `notNull` | フィールドが null でない |

### 日付/時刻の条件

| 条件 | 説明 |
|-----------|-------------|
| `equals` | フィールドが検索値と等しい |
| `doesNotEqual` | フィールドが検索値と等しくない |
| `before` | フィールドが検索値より前である |
| `after` | フィールドが検索値より後である |
| `today` |  フィールドが今日の日付と一致する |
| `yesterday` | フィールドが昨日の日付と一致する |
| `thisMonth` | フィールドが今月内である |
| `lastMonth` | フィールドが先月内である |
| `nextMonth` | フィールドが来月内である |
| `thisYear` | フィールドが今年内である |
| `lastYear` | フィールドが昨年内である |
| `nextYear` | フィールドが来年内である |
| `null` | フィールドが null |
| `notNull` | フィールドが null でない |

### ブール値の条件

| 条件 | 説明 |
|-----------|-------------|
| `true` | フィールドが true である |
| `false` | フィールドが false である |
| `null` | フィールドが null |
| `notNull` | フィールドが null でない |

### サブクエリ条件

| 条件 | 説明 |
|-----------|-------------|
| `inQuery` | フィールド値がサブクエリ結果に存在する |
| `notInQuery` | フィールド値がサブクエリ結果に存在しない |


## Angular フロントエンドとの統合

クエリ ビルダー API は、**Ignite UI for Angular クエリ ビルダー コンポーネント** (`IgxQueryBuilderComponent`) とシームレスに連携するように設計されています。このコンポーネントは、期待される API ペイロード形式と一致するクエリ構造を生成します。

### 主要な Angular コンポーネント

`IgniteUI/igniteui-angular` リポジトリから:

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

### 例: クエリ式ツリーの作成

```typescript
// エンティティとフィールドの定義
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
        ]    }
];

// サブクエリを含む複雑なクエリの構築
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

### クエリ ビルダー コンポーネントの使用

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

## 例: サブクエリを含む複雑なクエリ

### クエリ ペイロード

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

### 生成された SQL 出力

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

### API エンドポイント

```
POST https://data-northwind.appbuilder.dev/QueryBuilder/ExecuteQuery
Content-Type: application/json
```

## ローカライゼーション サポート

Angular クエリ ビルダー コンポーネントには、フィルター条件ラベル用の組み込みローカライゼーション サポートが含まれています。`igniteui-angular` リポジトリは、以下を含む複数の言語のリソース文字列を提供しています。

- 英語 (EN) - デフォルト
- フランス語 (FR)
- ドイツ語 (DE)
- スペイン語 (ES)
- イタリア語 (IT)
- ポルトガル語 (PT)
- ポーランド語 (PL)
- スウェーデン語 (SV)
- その他

リソース文字列の例:

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

## その他の参考資料

- [Infragistics. QueryBuilder. Executor NuGet パッケージ](https://www.nuget.org/packages/Infragistics.QueryBuilder.Executor/)
- [NorthwindAPI QueryBuilderController](https://github.com/IgniteUI/NorthwindAPI/blob/main/NorthwindCRUD/Controllers/QueryBuilderController.cs)
- [NorthwindAPI QueryBuilder モデル](https://github.com/IgniteUI/NorthwindAPI/tree/main/NorthwindCRUD/QueryBuilder)
- [Ignite UI for Angular Query Builder コンポーネント](https://github.com/IgniteUI/igniteui-angular/tree/master/projects/igniteui-angular/query-builder)
- [クエリ ビルダーの使用方法のステップ バイス テップ ガイド](query-builder-step-by-step-guide.md)
