---
title: Indigo Design AppBuilder の SPA とナビゲーション
_description: ページに基づいたデザイン アプローチとは異なり、App Builder では、ユーザーのナビゲート方法に基づいて挿入または切り替えられる個別のビューを作成できます。
_keywords: App builder, Indigo Design, インフラジスティックス
_language: ja
---

# 単一ページアプリとナビゲーション

App Builder のもう 1 つの機能は、単一ページのアプリとナビゲーションです。ページに基づいたデザイン アプローチとは異なり、App Builder では、ユーザーのナビゲート方法に基づいて挿入または切り替えられる個別のビューを作成できます。このアクションを確認するには、[+ 新しいアプリ] ボタンを使用して新しいアプリを作成し、定義された上部ナビゲーションを表示するデフォルトのレイアウトの 1 つを選択します。 

<img src="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder.png" srcset="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder-@2x.png 2x" />
<p style="text-align:center;">メニュー ボタンからレイアウト プリセットを追加し、[新しいアプリの作成] を選択する</p>

> [!Video https://www.youtube.com/embed/hssubbXsOTM?si=yKKhVTo-1_fXyJ6A&list=UULF8cj8_eJROxAXsOjhbvduLw]

## 親ビュー vs. 子ビュー

ここに表示されているのは [Master View] です。また、ツールボックスの [ビュー] リストを見ると、その下に 2 つの子ビューがネストされていることがわかります。各子ビューは、プライマリ ツールバー領域のナビゲーション ボタンに対応しています。アプリをプレビューすると、[View 1] をクリックすると、[View 1] 内で利用可能なコンテンツが表示され、[View 2] でも同様に表示されます。 

![top-navigation-interactions-preview-Indigo-Design-App-Builder](./images/top-navigation-interactions-preview-Indigo-Design-App-Builder.gif)
<p style="text-align:center;">ビューを切り替える - レイアウト プリセット</p>

マスター ビューと子ビューの概念に関しては、マスター ビューはアプリのシェルを表し、すべての子ビューで共有される UI 要素を含めることができることに注意してください。この場合、ナビゲーション ツールバーとサイド ナビゲーションは共有コンポーネントです。ナビゲーションに基づいて子ビューを挿入するには、Views container と呼ばれるコンポーネントを追加してプレースホルダーとして機能させることができます。そして、これは子ビューが描画される領域です。Views container は、デフォルトで使用可能なスペースを占めます。

![switch-views-indigo-design-app-builder](./images/switch-views-indigo-design-app-builder.gif)
<p style="text-align:center;">ビューを切り替える - サンプルアプリ</p>

Views container には、アプリの読み込み時に 2 つの子ビューのどちらがデフォルトで表示されるかを定義するプロパティがあります。[Views container] を選択すると、Views container のプロパティから、表示されるデフォルトの子ビューを定義できます。

<img src="./images/views-container-indigo-design-app-builder.png" srcset="./images/views-container-indigo-design-app-builder-@2x.png
 2x" />
<p style="text-align:center;">Views container コンポーネント - サンプル アプリ</p>


![views-interaction-Indigo-Design-App-Builder](./images/views-interaction-Indigo-Design-App-Builder.gif)
<p style="text-align:center;">ビューの変更の操作 - サンプル アプリ</p>

## ナビゲーションの追加 (ルーティング) 

ナビゲーションを子ビューに接続するために、[インタラクション] セクションのボタンへナビゲーション アクションを追加できます。現在、[次へ移動]、[開く / 閉じる] および [表示 / 非表示] (Nav Drawer、Dropdown、Select などのコンポーネント用) アクションを提供していますが、将来のリリースでさらにアクションを追加する予定です。 


<img src="./images/change-navigation-Indigo-Design-App-Builder.png" srcset="./images/change-navigation-Indigo-Design-App-Builder-@2x.png
 2x" />
 <p style="text-align:center;">ナビゲーションを定義する - サンプル アプリ</p>


単一ページ アプリとナビゲーション機能については以上です。要約すると、子ビューは、ナビゲート アクションに基づいて [Master View] 内に挿入されます。子ビューは、Views container コンポーネントを使用して [Master View] 内でホストされます。また、[Master View] に追加されたコンポーネントは、すべての子ビューで共有されます。


## その他のリソース

<div class="divider--half"></div>

* [コードをプレビューしてアプリを生成する](preview-code.md)
* [Angular ルーティング (英語)](https://angular.io/start/start-routing)
* [はじめに]({environment:appbuilderBaseUrl}/help/getting-started)
* [App Builder コンポーネント]({environment:appbuilderBaseUrl}/components)
* [Indigo.Design コンポーネント]({environment:infragisticsBaseUrl}/products/indigo-design/help/components/components-overview)
