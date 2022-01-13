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

## 概要
前述のように、Blazor コード生成機能のベータ版は少数のコンポーネントをサポートしますが、多くのコンポーネントをサポートする予定です。グリッドコード生成をお見逃しなく - ほとんどのグリッド機能はまだサポートされていませんが、データ バインディングは Ignite UI for Blazor のネイティブ グリッド コンポーネントで Blazor アプリケーションを実行する機能を提供します。AppBuilder デザイナーでグリッドでより多くの機能を有効にしても問題ありません。デザインからのコード生成は単なるデータ バインディング以上のものをもたらします。

## Blazor コード生成
アプリケーションのデザインを完了し、コードをプレビューする前に、`[GitHub に公開]` と `[プレビュー]` アクション ボタンの隣のナビゲーション バーにあるプラットフォーム ピッカー ドロップダウンに注意してください。アプリに適したフレームワークは `[Blazor ベータ版]` オプションを選択して Blazor のコードを生成します。Angular の場合は `[Angular]` を選択します。ピッカーで選択した内容が保存され、次回 App Builder にアクセスしたときにフレームワークが事前に選択されています。

## アプリケーションを Github にアップロードする
アプリケーションをプレビュー モードで表示したり、ローカルにダウンロードしたりする以外に、完全なアプリコード リポジトリを生成するオプションがあります。これを行うには、[アプリの生成] ボタンに移動し、GitHub アカウントを App Builder に接続します。