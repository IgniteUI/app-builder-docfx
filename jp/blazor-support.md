---
title: App Builder - Blazor コード生成
_description: App Builder を使用して、ユーザーはコードとアプリの生成に使用するプラットフォームを選択できます。
_keywords: App Builder, Web App Builder, Blazor, Blazor コード生成, Blazor アプリの生成, Blazor UI App Builder, App Builder Blazor サポート
_language: ja
---
# App Builder による Blazor コード生成

.NET 6 では、コード生成オプションとして App Builder のプレビュー バージョンをサポートしています。このベータ版は、Blazor サポートに関する多数の機能リクエストに続いて公開されます。

つまり、簡単なドラッグアンドドロップで任意の Blazor UI を作成し、次のコンポーネントのすべてのリリース可能な Razor、C#、CSS コードをシングルクリックで取得できます。

- Grid のデータ バインディング
- Badge
- Icon
- Checkbox、Switch
- Avatar
- InputGroup
- コンテナー - Absolute、Row、Column
- Hyperlink、Image、text および title
- List
- Button、Link Button
- Card
- NavBar
- Radio Group

<img class="responsive-img" src="./images/blazor-introduction.png" />
<p style="text-align:center;">AppBuilder からの Blazor コード生成</p>

> [!NOTE]
><b>まだ利用できないコンポーネントのコードを生成しようとすると、そのようなコンポーネントがまだサポートされていないことを示すプレースホルダーが表示されます。これにより、デザイナーでより複雑な UI を開発することを控える必要はありません。

### この記事の内容:
* <a href="#introduction">機能の概要</a>
* <a href="#blazor-code-generation">Blazor コード生成</a>
* <a href="#uploading-an-application-to-github">アプリケーションを Github にアップロードする</a>
* <a href="#known-issues-and-limitations">既知の問題点および制限事項</a>

## 概要
前述のように、Blazor コード生成機能のベータ版は少数のコンポーネントをサポートしますが、多くのコンポーネントをサポートする予定です。グリッドコード生成をお見逃しなく - ほとんどのグリッド機能はまだサポートされていませんが、データ バインディングは Ignite UI for Blazor のネイティブ グリッド コンポーネントで Blazor アプリケーションを実行する機能を提供します。AppBuilder デザイナーでグリッドでより多くの機能を有効にしても問題ありません。デザインからのコード生成は単なるデータ バインディング以上のものをもたらします。

## Blazor コード生成
アプリケーションのデザインを完了し、コードをプレビューする前に、`[GitHub に公開]` と `[プレビュー]` アクション ボタンの隣のナビゲーション バーにあるプラットフォーム ピッカー ドロップダウンに注意してください。アプリに適したフレームワークは `[Blazor ベータ版]` オプションを選択して Blazor のコードを生成します。Angular の場合は `[Angular]` を選択します。ピッカーで選択した内容が保存され、次回 App Builder にアクセスしたときにフレームワークが事前に選択されています。

## アプリケーションを Github にアップロードする
アプリケーションをプレビュー モードで表示したり、ローカルにダウンロードしたりする以外に、完全なアプリコード リポジトリを生成するオプションがあります。これを行うには、[アプリの生成] ボタンに移動し、GitHub アカウントを App Builder に接続します。

## 既知の問題点および制限事項
Blazor アプリケーションの生成には、次の制限があります:
- 生成されたアプリケーションは、認証付きデータ ソースからデータを読み込みできません。
- データ ソースとして渡すことができるのは、オブジェクトの単一レベルの配列のみです。オブジェクト型またはネストされた配列型のデータ ソースはサポートされていません。
- WASM プロジェクトのみが生成されます。
- 白いテーマのみが生成されます。
- カスタム テーマは、カスタム ラウンドネスとカスタム エレベーションをまだサポートしていません。
- 生成されたアプリケーションでは、今のところ Bootstrap はオフになっています。

生成されたコンポーネントには、次の制限があります:
- Navigation drawer は、固定された状態でのみ機能します。ミニ バージョンも動作しません。
- Date picker はドロップダウン モードでのみ機能し、初期日付は設定できません。
- Input Group は日付型をサポートしていません。
- Radio Group は水平モードをサポートしていません。
- グリッドはツールバーを生成できません。これにより、高度なフィルタリング、エクスポート、ピン固定、および非表示の生成ができなくなります。セルと行の選択の設定は同時に機能しません。列の選択、ページング、グループ化、および列の移動はまだサポートされていません。フィルタリングは、Excel スタイル モードでのみ機能します。
- すべてのコンポーネントについて、切り替え操作はまだ生成されていません。また、日付は内部フィールドにバインドされていません。

Blazor でサポートされているすべてのコンポーネントに関する追加情報は、[アプリを生成](generate-app/generate-app-overview.md#サポートされているコンポーネント)にあります。

## その他のリソース

<div class="divider--half"></div>

* [アプリを生成する](./generate-app/generate-app-overview.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)
* [Indigo.Design コンポーネント](https://jp.infragistics.com/products/indigo-design/help/components/components-overview)