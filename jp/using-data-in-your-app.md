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

## ローカル ネットワーク ソースからのデータ ソースの使用
これで、ローカル ホストまたはプライベート ネットワークにリクエストを送信できます。これには、通常の REST エンドポイントと Swagger エンドポイントが含まれます。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/internal-network-data-source.gif" />
<p style="text-align:center;">ローカル ネットワーク ソースの使用</p>

<div style="font-size: 2em; margin-top: 0.83em; margin-bottom: 0.83em; margin-left: 0; margin-right: 0; font-weight: bold;">トラブルシューティング</div>

プライベート ネットワークの使用中にエラー ダイアログが表示された場合は、このセクションが問題の解決に役立ちます。問題が解決しない場合は、[問題の報告またはフィードバックの送信](getting-started.md#問題の報告またはフィードバックの送信)セクションに従ってください。
### [リクエストは失敗しました!] エラー ダイアログ
ローカル ネットワークでの作業の本質により、このタイプのエラーでは、CORS の問題 (クロスオリジン) などが原因でローカル / プライベート サービスが失敗したかどうかを識別するために、追加の作業が必要になります。



ローカル サービスの追加中に [リクエストは失敗しました!] ダイアログが表示された場合は、ブラウザーの開発ツールを開き (`F12`）、コンソール / ネットワーク タブでエラーを確認します。最も可能性の高い理由は、CORS の制限です。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/request-failed-error.gif" />
<p style="text-align:center;">[リクエストは失敗しました!] エラー </p>

ローカル サービスの構成に基づいて、クロスオリジン リクエストの問題を解決する方法がいくつかあります。これについては、以下で詳しく説明します。

### ASP.NET Core でクロスオリジン リクエスト (CORS) を有効にする

[この記事](https://docs.microsoft.com/ja-jp/aspnet/core/security/cors?view=aspnetcore-6.0)は、ASP.NET Core アプリで CORS を有効にする方法を示しています。Web App Builder が、すべてまたは特定のオリジンを許可する CORS ポリシーを追加するようにすることができます:

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

`app` の初期化の直後に .UseCors() を設定します。

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

### IIS マネージャー、web.config、または C# を使用して CORS を有効にする

IIS を使用して内部でホストされているデータ ソースにアクセスできるようにするには、以下の手順に従います:

1. サーバーまたはローカル PC で IIS マネージャーを開きます。
2. 応答ヘッダーを編集する必要がある Web サイトに移動します。
3. 下の画像に示すように、編集しているサイトに関連するリストまたはアイコンから、中央のペインから [HTTP 応答ヘッダー] を選択します。
4. [HTTP 応答ヘッダー] をダブル クリックします。
5. 次に、右側のペインから [追加] をクリックします。
6. ダイアログ ボックスが開きます。[名前] には「Access-Control-Allow-Origin」と入力し、[値] にはアスタリスク (*) を入力します。
7. [OK] をクリックします。これで完了です。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/IIS-config.gif" />
<p style="text-align:center;">IIS 構成</p>

CORS を有効にするには、asp.net Web サイトの web.config ファイルに構成を追加するか、global.asax ファイルにコードを追加します。詳細情報は[ここ (英語)](https://qawithexperts.com/article/asp-net/enabling-cors-in-iis-various-possible-methods/291)にあります。

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