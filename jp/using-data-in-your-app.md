---
title: App Builder でデータを使用する
_description: App Builder を使用して、外部データ ソースを追加し、App Builder で設計されたアプリケーションにバインドできます。
_keywords: App builder, Indigo Design, インフラジスティックス, データ ソース, データ バインディング
_language: ja
---

# データ機能の概要
App Builder のデータ機能を使用して、開発中のアプリケーションで外部データソースを追加、編集、使用できます。デフォルトで、App Builder には、ユーザーが参照に使用できる Northwind データ ソースが含まれています。以下は、REST API データ ソースを設定するさまざまな方法を示しています。
- JSON タイプのデータ ソースを使用することにより、ユーザーは独自の JSON ファイルをアップロードすることや、データ ソースに Rest API URL を提供することができます。
- Swagger URL またはファイル定義 (json/yaml) を使用します。

追加されたすべてのデータ ソースはデータ ツールボックスに配置され、ユーザーは各データ ソースを展開/縮小して、含まれているテーブルおよび選択したフィールドを表示できます。

App Builder は、**応答オブジェクト内のネストされたコレクション**もサポートします。戻り値のコレクションをメタデータ オブジェクト (oData など) でラップする API を取り込み、Grid などのデータ バインディングコンポーネントにネスト コレクションを使用したり、それに基づいて繰り返し操作を実行したりできます。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-View-data-source.gif" />
<p style="text-align:center;">ネストされたコレクションのデモ</p>

## データ ソースを追加する
App Builder のデータ機能を使用して、JSON (Rest API)、Excel、CSV ファイルなどの外部データ ソースを、ファイルのアップロードまたは外部公開ソースへのリンクによって追加できます。この機能の最初のリリースでは、REST API オプションのみ使用できます。

> [!NOTE]
> App Builder に追加されたデータ ソースはユーザー スペースに制限され、追加したユーザーまたはチーム スペース (チーム機能が利用可能な場合) のみに表示されます。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Add-URL.gif" />
<p style="text-align:center;">URL からデータ ソースを追加する</p>

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Add-JSON-file.gif" />
<p style="text-align:center;">ファイルをアップロードしてデータ ソースを追加する</p>

## Swagger データ ソースを追加する
Swagger ツールの機能は、RESTful API 設計の業界標準である OpenAP I仕様から始まります。

Swagger 定義 (ファイル URL の提供またはファイルのアップロード) を指定できるようになりました。また、直感的なデザインにより、データ フィールドとエンドポイントを簡単に選択できます。Grid、Card、List、またはその他のバインド可能なコンポーネントにこのデータ ソースをバインドできます。

[Swagger の定義を追加してデータをバインドする方法についての全記事](open-api-swagger-support.md) を参照してください。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/swagger-demo-original.gif" />
<p style="text-align:center;">Swagger のデモ</p>

## Using data source from local network sources
You can now make requests to a localhost or private networks. This includes regular REST endpoints and Swagger endpoints. 

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/internal-network-data-source.gif" />
<p style="text-align:center;">Local network sources usage</p>

<div style="font-size: 2em; margin-top: 0.83em; margin-bottom: 0.83em; margin-left: 0; margin-right: 0; font-weight: bold;">Troubleshooting</div>

If you get an error dialog while using a private network this section can help resolve the problem. If the problems aren't resolved, follow the [report and issue or send us feedback](getting-started.md#report-an-issue-or-send-feedback) section.
### Request failed error dialog
Due to the essence of working with local networks this type of error requires additional work in order to identify if the local/private service fails due to CORS problems (Cross-Origin Requests) or else.



If `Request failed` dialog appears while you add a local service, open the `dev tools` of your browser (Hit `F12`) and check the console/network tab for errors. The most probable reason would be CORS restrictions.

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/request-failed-error.gif" />
<p style="text-align:center;">Request failed error</p>

Based on the local service configuration, there are some ways to overcome the Cross-Origin Requests problem that we discuss with more details below.

### Enable Cross-Origin Requests (CORS) in ASP.NET Core

[This article](https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0) shows how to enable CORS in an ASP.NET Core app. You can ensure that the Web App builder adds CORS policy that Allows `all` or `specific` origins:

```
var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                      });
});
```

Set .UseCors() right after the `app` initialization.

```
var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

### Enable CORS Using IIS Manager, web.config or C#

Follow the steps below in order to enable access to your internally hosted data source using IIS.

1. Open IIS manager on your server or on your local PC.
2. Navigate to the website you need to edit the response headers for.
3. From the list or Icons related to the site you are editing, select "HTTP Response Headers" from the middle-pane, as shown in the image below
4. Double click "HTTP Repsonse Header"
5. Now, click "Add" from right hand side pane
6. A dialog box will open. For name enter "Access-Control-Allow-Origin" and for Value enter an asterisk (*).
7. Click Ok, you are done.

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/IIS-config.gif" />
<p style="text-align:center;">IIS Configuration</p>

You can simply enable CORS by adding configuration in your asp.net website's web.config file or adding some code in your global.asax file. Detailed information [here](https://qawithexperts.com/article/asp-net/enabling-cors-in-iis-various-possible-methods/291).

## データ フィールドの選択とフィールド タイプの変更
データ ソースが追加されると、ユーザーは特定のデータ フィールドをコンポーネント セクションに接続できます。これを行うには、最初にコンポーネント (以下の例では Card コンポーネントを使用) を選択し、[繰り返し] モードを [Data] に変更してメニューをスクロールダウンし、接続するデータ ソースからテーブルを見つけて選択します。最後に、Card セクションを選択したテーブル フィールドに接続します。


<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/dataSources-select-fields.gif" />
<p style="text-align:center;">データ フィールドを選択する</p>

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Change-field-type.gif" />
<p style="text-align:center;">データ ソース テーブルのフィールド タイプを変更する</p>

## データ ソースを繰り返しコンポーネントに接続する
データ ソースが追加されると、ユーザーは特定のデータ フィールドをコンポーネント セクションに接続できます。これを行うには、最初にコンポーネント (以下の例では Card コンポーネントを使用) を選択し、[繰り返し] モードを [Data] に変更してメニューをスクロールダウンし、接続するデータ ソースからテーブルを見つけて選択します。最後に、Card セクションを選択したテーブル フィールドに接続します。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Connect-data-source-table-fields.gif" />
<p style="text-align:center;">データ ソース テーブルのフィールドをコンポーネント セクションに接続する</p>


## その他のリソース
<div class="divider--half"></div>
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [App Builder インターフェイスの概要](interface-overview.md)
* [単一ページとナビゲーション](single-page-apps-and-navigation.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [アプリを生成する](generate-app/generate-app-overview.md)