---
title: App Builder - コードをプレビューしてアプリを生成する
_description: App Builder は、デザインからコードまでのソリューションであり、設計および開発チームが実際の Web アプリケーションを迅速かつ簡単に設計および構築できるようにします。
_keywords: App Builder, Web App Builder, デザイン システム, デザイン システム UX, UI キット, Sketch, Ignite UI for Angular, Sketch to Angular, Angular, Angular デザイン システム, Sketch から コードをエクスポート, Angular 用のデザイン キット, Sketch UI キット
_language: ja
---
# アプリを生成する

> [!NOTE]
><b>Indigo.Design App Builder でデザインされたアプリケーションは、ダウンロードするか、GitHub リポジトリに直接アップロードできます。 

<section class="video-container">
    <div>
        <div class="video-container__item">
            <iframe width="800" height="450" src="https://www.youtube.com/embed/zxT-nIXKn7I" frameborder="0" allowfullscreen></iframe>
        </div>
        <p>コードのプレビューと生成について</p>
    </div>
</section>

Angular コード生成機能を備えた App Builder は数か月前から販売されていますが、.NET 6 リリースで Blazor コード生成のベータ版をリリースしました。

プラットフォーム ピッカー ドロップダウンは、`[GitHub に公開]` と `[プレビュー]` アクションボタンの隣のナビゲーション バーにあります。`[Blazor ベータ版]` オプションを選択して Blazor のコードを生成するか、`[Angular]` で生成したアプリとコードのプレビューを表示します。

<img class="responsive-img" src="../images/generate-code.png" />
<p style="text-align:center;">コード生成のプラットフォームの選択</p>

すべてのスタイリングおよびレイアウト プロパティを使用してアプリケーションが生成されると、デザインおよび開発のユーザー ストーリーが完成します。現在、Indigo.Design App Builder には、すべてのアプリケーション ファイルを GitHub リポジトリにアップロードするか、パッケージとしてダウンロードしてローカルで実行するオプションがあります。

## サポートされているコンポーネント

Currently, the App Builder supports code generation for Angular and Blazor. Below is a list of supported components per platform:
| コンポーネント              | Angular            | Blazor                           |
|------------------------|--------------------|----------------------------------|
| **レイアウト**                                                                    |
| Absolute Layout        | :heavy_check_mark: | :heavy_check_mark:               |
| Card                   | :heavy_check_mark: | :heavy_check_mark::construction: |
| Column Layout          | :heavy_check_mark: | :heavy_check_mark:               |
| Expansion Panel        | :heavy_check_mark: | :x:                              |
| Row Layout             | :heavy_check_mark: | :heavy_check_mark:               |
| Tab Layout             | :heavy_check_mark: | :x:                              |
| **メニューおよびナビゲーション**                                                        |
| Navigation Bar         | :heavy_check_mark: | :heavy_check_mark::construction: |
| Navigation Drawer      | :heavy_check_mark: | :heavy_check_mark::construction: |
| Views Container        | :heavy_check_mark: | :heavy_check_mark:               |
| **コンテンツ**                                                                    |
| Avatar                 | :heavy_check_mark: | :heavy_check_mark::construction: |
| Calendar               | :heavy_check_mark: | :x:                              |
| Chip                   | :heavy_check_mark: | :x:                              |
| Icon                   | :heavy_check_mark: | :heavy_check_mark::construction: |
| Image                  | :heavy_check_mark: | :heavy_check_mark:               |
| Link                   | :heavy_check_mark: | :heavy_check_mark:               |
| Text                   | :heavy_check_mark: | :heavy_check_mark:               |
| Title                  | :heavy_check_mark: | :heavy_check_mark:               |
| **入力およびフォーム**                                                              |
| Button                 | :heavy_check_mark: | :heavy_check_mark:               |
| Button Group           | :heavy_check_mark: | :x:                              |
| Checkbox               | :heavy_check_mark: | :heavy_check_mark:               |
| Combo                  | :heavy_check_mark: | :x:                              |
| Date Picker            | :heavy_check_mark: | :heavy_check_mark::construction: |
| Drop Down              | :heavy_check_mark: | :x:                              |
| Floating Action Button | :heavy_check_mark: | :heavy_check_mark:               |
| Icon Button            | :heavy_check_mark: | :heavy_check_mark::construction: |
| Input Group            | :heavy_check_mark: | :heavy_check_mark::construction: |
| Radio Group            | :heavy_check_mark: | :heavy_check_mark::construction: |
| Select                 | :heavy_check_mark: | :x:                              |
| Slider                 | :heavy_check_mark: | :x:                              |
| Switch                 | :heavy_check_mark: | :heavy_check_mark:               |
| Text Area              | :heavy_check_mark: | :x:                              |
| **グリッドおよびリスト**                                                              |
| Grid                   | :heavy_check_mark: | :heavy_check_mark::construction: |
| List                   | :heavy_check_mark: | :heavy_check_mark:               |
| **通知**                                                              |
| Badge                  | :heavy_check_mark: | :heavy_check_mark:               |
| Banner                 | :heavy_check_mark: | :x:                              |
| Dialog Window          | :heavy_check_mark: | :x:                              |
| Snackbar               | :heavy_check_mark: | :x:                              |

> 注: 部分的に生成されたコンポーネントは :construction: でマークされます。Blazor コンポーネントの既知の問題および制限の詳細については、[Blazor サポート](../blazor-support.md#既知の問題点および制限事項)を参照してください。

## その他のリソース

<div class="divider--half"></div>

* [Blazor サポート](../blazor-support.md)
* [アプリケーションを GitHub にアップロードする](upload-application-to-github.md)
* [アプリケーションをローカルで実行する](run-application-locally.md)
* [アプリケーション コードのプレビュー](../preview-code.md)
* [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)
* [Indigo.Design コンポーネント](https://jp.infragistics.com/products/indigo-design/help/components/components-overview)
