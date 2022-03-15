---
title: App Builder でデータを使用する
_description: App Builder を使用して、外部データ ソースを追加し、App Builder で設計されたアプリケーションにバインドできます。
_keywords: App builder, Indigo Design, インフラジスティックス, データ ソース, データ バインディング
_language: ja
---

# データ機能の概要
App Builder のデータ機能を使用して、開発中のアプリケーションで外部データソースを追加、編集、使用できます。デフォルトで、App Builder には、ユーザーが参照に使用できる Northwind データ ソースが含まれています。 Below you can find different ways to set up Rest API data sources:
- By using a JSON type data source, enabling users to upload their own JSON file or provide a Rest API URL with the data source.
- By using a Swagger URL or file definition (json/yaml).

追加されたすべてのデータ ソースはデータ ツールボックスに配置され、ユーザーは各データ ソースを展開/縮小して、含まれているテーブルおよび選択したフィールドを表示できます。

App Builder は、**応答オブジェクト内のネストされたコレクション**もサポートします。戻り値のコレクションをメタデータ オブジェクト (oData など) でラップする API を取り込み、Grid などのデータ バインディングコンポーネントにネスト コレクションを使用したり、それに基づいて繰り返し操作を実行したりできます。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-View-data-source.gif" />
<p style="text-align:center;">Nested Collection Demo</p>

## データ ソースを追加する
App Builder のデータ機能を使用して、JSON (Rest API)、Excel、CSV ファイルなどの外部データ ソースを、ファイルのアップロードまたは外部公開ソースへのリンクによって追加できます。この機能の最初のリリースでは、REST API オプションのみ使用できます。

> [!NOTE]
> App Builder に追加されたデータ ソースはユーザー スペースに制限され、追加したユーザーまたはチーム スペース (チーム機能が利用可能な場合) のみに表示されます。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Add-URL.gif" />
<p style="text-align:center;">URL からデータ ソースを追加する</p>

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Add-JSON-file.gif" />
<p style="text-align:center;">Adding data source by uploading a file</p>

## Swagger データ ソースを追加する
The power of Swagger tools starts with the OpenAPI Specification — the industry standard for RESTful API design.

You can now specify a Swagger definition (by providing a file URL or simply upload it) and an intuitive design will help you pick an endpoint an data fields, with ease. You can later on bind this data source to a component like Grid, Card, List or any other bindable component.

Check out the [full article on how to add a Swagger definition](open-api-swagger-support.md) and bind your data to it.

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/swagger-demo-original.gif" />
<p style="text-align:center;">Swagger demo</p>

## データ フィールドの選択とフィールド タイプの変更
データ ソースが追加されると、ユーザーは特定のデータ フィールドをコンポーネント セクションに接続できます。これを行うには、最初にコンポーネント (以下の例ではカード コンポーネントを使用)を選択し、Repeat モードを Data に変更してメニューをスクロールダウンし、接続するデータ ソースからテーブルを見つけて選択します。最後に、カード セクションを選択したテーブル フィールドに接続します。


<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/dataSources-select-fields.gif" />
<p style="text-align:center;">Selecting data fields</p>

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Change-field-type.gif" />
<p style="text-align:center;">Changing a data source table field type</p>

## データ ソースを繰り返しコンポーネントに接続する
データ ソースが追加されると、ユーザーは特定のデータ フィールドをコンポーネント セクションに接続できます。これを行うには、最初にコンポーネント (以下の例ではカード コンポーネントを使用)を選択し、Repeat モードを Data に変更してメニューをスクロールダウンし、接続するデータ ソースからテーブルを見つけて選択します。最後に、カード セクションを選択したテーブル フィールドに接続します。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/DataSources-Connect-data-source-table-fields.gif" />
<p style="text-align:center;">Connect a data source table field to a component section</p>


## その他のリソース
<div class="divider--half"></div>
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [App Builder インターフェイスの概要](interface-overview.md)
* [単一ページとナビゲーション](single-page-apps-and-navigation.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [アプリを生成する](generate-app/generate-app-overview.md)