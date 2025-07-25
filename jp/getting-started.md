---
title: App Builder を使用した作業の開始
_description: App Builder を使用してすばらしいアプリを作成する方法を学びます。定義済みのものを使用するか、用意されたレイアウトから選んで編集できます。今すぐ App Builder をお試しください。
_keywords: App builder, Indigo Design, インフラジスティックス
_language: ja
---

# App Builder を使用した作業の開始

App Builder は、すべてのコードを記述することなく、デザインを機能的な Web アプリにすばやく変換できるローコード プラットフォームです。空の状態から始めたり、テンプレートを使用したり、Figma デザインをインポートしたりすることができ、ドラッグ アンド ドロップ コンポーネント、実際のデータとの接続、レイアウトのカスタマイズを使用して視覚的にアプリを構築します。Angular、React、Blazor、Web Components の実稼働環境に対応するコードを生成し、ワンクリックで GitHub または Azure にエクスポートまたは配置できます。

## すべての仕組みを理解するために

以下の図は、App Builder がデザインおよび開発ツールのの広範なエコシステムの中でどのように機能しているかを高い視点から示した概要です。

<img class="box-shadow" src="images/platform-ecosystem.png" />
<p style="width: 100%; text-align:center;">プラットフォーム エコシステム</p>

### 簡単に言うと:

* **デザインシ ステム → UI キットとアダプター**:
  それは、UI キット (Figma の Indigo.Design など) として実装されたデザイン システムから始まります。アダプターはデザインを App Builder が使用できる形式に変換します。
* **App Builder + 統合**:
  App Builder を使用して、アプリを視覚的に作成します。REST データ、Reveal SDK ウィジェット (ダッシュボード用)、Slingshot タスク (プロジェクト管理用) をサポートしています。
* **共通アプリ モデル**:
  すべてが中央の**共通アプリ モデル**に集約されます。共通アプリ モデルは、開始方法 (デザインのインポートまたは手動ビルド) に関係なく、アプリを記述する統一された形式です。
* **コード生成 (Codegen)**:
  次に、モデルは**コード ジェネレーター**によって使用され、次のような実際の使用可能なコードが出力されます。
  * **Angular**
  * **React**
  * **Web Components**
  * **Blazor**
* **配置対象**:
  最後に、生成されたコードは、**GitHub** や **Microsoft Azure** などのプラットフォームに直接配置できます。

## App Builder を起動する
App Builder にアクセスするには、[https://appbuilder.dev](https://appbuilder.dev) に移動してサインインします。または、[https://my.appbuilder.dev](https://my.appbuilder.dev) にアクセスして App Builder を直接起動することもできます。アプリを作成および編集するには、有効なトライアル版または有料サブスクリプションが必要です。

## 新しいアプリの作成
[新しいアプリケーションの作成] ダイアログから新しいアプリケーションを作成するには、次の 3 つの方法があります。

1. **サンプル アプリ** - 入門アプリは、App Builder を使用して作成されたアプリケーションを探索するのに役立ち、独自のユーザー スペースでそれらを変更することもできます。また、独自のアプリを最初から作成しなくても、より大きなアプリケーション用に生成されたコードをプレビューするための優れたソースです。App Builder を初めて使用する場合は、[Sample Apps] オプションを開始点として使用することをお勧めします。これは、ツールのすばらしい機能を利用してアプリケーションの構築を開始するための最も簡単な方法です。
2. **アプリのレイアウト** - 定義済みレイアウトを使用して新しいアプリケーションを作成します。こちらには、空のテンプレートに基づいてアプリを作成するオプションもあります。
4. **デザインのインポート** - Figma または Sketch 用の Indigo.Design UI キットを使用して作成された既存のデザイン ファイルがある場合、これをアプリの開始点として使用できます。これを行うには、デザイン、UI キット、サンプル デザイン ファイルを公開するためのプラグインが含まれる Indigo.Design システムを取得してください。

<br>

> [!NOTE]
> Sketch の絶対レイアウトと App Builder の Flex レイアウトの違いにより、Sketch ファイルの解析後に追加の調整が必要になる場合があります。
<br>

<img src="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder.png" srcset="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder-@2x.png 2x" />
<p style="text-align:center;">[新しいプロジェクト] ダイアログ</p>

注: App Builder にアクセスすると、デザイン時に App Builder を終了せずに、アプリ内のサイド メニューからアクティブなアプリケーションを簡単に切り替えたり、App Builder のワークスペースに戻ることができます。

<img src="./images/Indigo-Design-side-menu.png" srcset="./images/Indigo-Design-side-menu-@2x.png 2x" />
<p style="text-align:center;">サイド メニュー</p>

## コードの取得
App Builder は、常にライブ実行中の Web アプリケーションをデザイン画面とプレビュー ウィンドウの両方に表示します。基になるコードとアプリケーション モデルは、デザイン画面でアプリケーションに変更を加えると、リアルタイムで更新されます。生成されたアプリケーション コードはプレビュー ウィンドウでいつでも表示できます。また、生成されたアプリケーションを完全なアプリケーション コード リポジトリとしてダウンロードして、選択したコード エディターで開くこともできます。次に、App Builder を使用してデザインしたアプリケーションをマシン上でローカルにビルドして実行し、生成されたコードに追加の変更を加えることができます。
 
<img src="./images/Preview-App-Indigo-Design-App-Builder.png" srcset="./images/Preview-App-Indigo-Design-App-Builder@2x.png 2x" />
<p style="text-align:center;">アプリケーション プレビュー ウィンドウ</p>


<img src="./images/App-VSCode-Indigo-Design-App-Builder.png" srcset="./images/App-VSCode-Indigo-Design-App-Builder@2x.png 2x" />
<p style="text-align:center;">生成されたアプリケーションのコードを VS Code で実行する</p>


> [!NOTE]
> アプリケーションのコードがダウンロードされると、ローカルで行われた変更は App Builder ユーザー スペースに反映されません。

## オンプレミス版の App Builder
App Builder は、ソフトウェア製品の検出、ソフトウェア製品の設計、インタラクティブな製品概念実証の構築、ピクセルパーフェクトなコード プロジェクトの生成などの統合プラットフォームを開発者、デザイナー、製品マネージャーに提供する SaaS です。

規制の厳しい業界に属する企業もあります。ほとんどの場合、セキュリティ上の理由から、App Builde rなどのクラウド ベースのソリューションへのアクセスが制限されているか、特定の場所でのインターネット接続が制限されています。このセグメントをカバーするためには、このような組織が App Builder をファイアウォールの内側に導入するための簡単な方法を提供する必要がありました。この方法では、独自のインフラ上で動作するプラットフォームのインスタンスを使用し、内部の人員のみがアクセスできるようにする必要がありました。

オンプレミス アプリケーションは信頼性が高く、安全であるため、クラウドでは実現できないレベルの制御を維持できます。

オンプレミス ソリューションの[インストール方法に関する技術的な詳細](on-prem-prerequisites-and-installation.md)については、このトピックを参照してください。

![on-premises-ab-demo](./images/on-premises-ab-demo.gif)
<p style="text-align:center;">オンプレミス版</p>

## 作成したアプリをローカルで実行する

ダウンロードしたアプリケーションを実行するには、次の前提条件がマシンにインストールされている必要があります。生成されたアプリケーションをローカルで実行する方法の詳細については、[このトピック](generate-app/run-application-locally.md)を参照してください。

1. NodeJS.
2. Visual Studio Code (VS Code をお勧めしますが、別のコード エディターを使用することもできます)。

<div>
    <div style="display:inline-block;width:45%;text-align:center;">
      <img src="./images/general/nodejs.svg"
           style="display:flex;max-height:100px;margin:auto auto 20px auto;" />
      <a target="_blank" href="https://nodejs.org/en/download/" class="no-external-icon"
         style="color:white;background-color:#09f;text-decoration:none;font-weight:700;font-size:16px;padding: 5px 15px 5px 15px;">
        NODE のダウンロード
      </a>
    </div>
    <div style="display:inline-block;width:45%;text-align:center;">
      <img src="./images/general/vs-code.svg"
           style="display:flex;max-height:100px;margin:auto auto 20px auto;" />
      <a target="_blank" href="https://code.visualstudio.com/download" class="no-external-icon"
         style="color:white;background-color:#09f;text-decoration:none;font-weight:700;font-size:16px;padding: 5px 15px 5px 15px;">
        VS CODE のダウンロード
      </a>
    </div>
</div>
<div class="divider--half"></div>

## ビデオ チュートリアル


> [!Video https://www.youtube.com/embed/QnQV80hWfco?si=Kcg2ZTIBeENvgaga&list=UULF8cj8_eJROxAXsOjhbvduLw&rel=0]

## 問題の報告またはフィードバックの送信

[このリポジトリ](https://github.com/IgniteUI/app-builder)は、問題や機能リクエストの送信、および製品の全般的なディスカッション、質問、共有したいフィードバックを対象としています。<a href="mailto:appbuilder@infragistics.com">メールを送信する</a>こともできます。

## その他のリソース
<div class="divider--half"></div>

* [App Builder インターフェイスの概要](interface-overview.md)
* [単一ページとナビゲーション](single-page-apps-and-navigation.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [アプリを生成する](generate-app/generate-app-overview.md)
* [Indigo.Design はじめに]({environment:infragisticsBaseUrl}/products/indigo-design/help/getting-started)