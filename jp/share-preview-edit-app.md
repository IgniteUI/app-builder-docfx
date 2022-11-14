---
title: App Builder - アプリケーションの共有、プレビュー、および編集 
_description: App Builder を使用して、ユーザーはコードとアプリの生成に使用するプラットフォームを選択できます。
_keywords: App Builder, Web App Builder, Preview apps, Edit applications, Share apps, アプリのプレビュー, アプリケーションの編集, アプリの共有
_language: ja
---
# アプリケーションの共有、プレビュー、および編集
このトピックでは、アプリケーションを他のユーザーと共有する方法、他のユーザーに編集機能を付与する方法、さまざまなアプリ プレビュー設定とアプリの説明を設定してより有意義なソーシャル プラットフォーム共有を行う方法について詳しく説明します。

## アプリケーションの共有
デザイン モードに [共有] ボタンが追加され、[デスクトップ アプリ](https://github.com/IgniteUI/app-builder-client/releases/tag/1.0.1)の操作性が向上し、必要に応じてアクセス許可もカスタマイズできるようになりました。 

[このリンクを使用するすべてのユーザーにプレビューを許可する] トグルを使用して、共有エクスペリエンスをカスタマイズできます。アプリへのアクセスを停止するためにアプリ リンクを無効にする方法を示す警告アイコンがあります。

[リンクのコピー] と [Twitter] ボタンを使用して、コピーおよび直接共有する機能もあります。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/share-and-preview-image-docfx.png" />
<p style="width: 100%; text-align:center;">共有ボタン</p>

共有ボタンは、アプリケーションの「他の操作」アイコンを介してワークスペース ビューからも利用できます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/share-and-preview-image-workspace.png" />
<p style="width: 100%; text-align:center;">ワークスペースからの共有ボタン</p>

## アプリケーションの共有およびプレビュー

### 個人用ワークスペースからアプリにアクセスするサインインしているユーザー
#### アプリのプレビュー リンク
個人用ワークスペースからの**アプリ プレビュー リンク**を**サインインしているユーザー**と共有すると、後者は**アプリをプレビューする**ためのアクセス権を持ちますが、**モック データ**で表示されます。匿名 (サインインしていない) ユーザーにも同じことが当てはまります。

> [!NOTE]
> ワークスペース以外のメンバーには、常にモック データが使用されます。

#### リンクの編集
個人用ワークスペースから**アプリの編集リンク**を**サインインしているユーザー**と共有すると、後者は編集にアクセスできず、「編集するためのアクセス権がありません。」 メッセージを受け取ります。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/app-from-personal-workspace-signed-in-edit-link.png" />
<p style="width: 100%; text-align:center;">編集するためのアクセス権がありません。</p>

### アプリのワークスペースに参加しているサインイン済みユーザー
#### アプリのプレビュー リンク
**アプリのワークスペースに参加しているサインイン済みユーザー**と**アプリのプレビュー リンク**を共有すると、後者は**アプリのプレビューと編集**にアクセスできます。構成されている場合は、**モック データ**ではなく**実際のデータ**も表示できます。暗号化されたトークンを使用してデータ要求が行われ、実際のデータが取得されます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/app-from-shared-workspace-signed-in-user-real-data.png" />
<p style="width: 100%; text-align:center;">実際のデータを使用した共有ワークスペース</p>

#### リンクの編集
**アプリのワークスペースの一部であるサインインしているユーザー**と**アプリのプレビュー リンク**を共有すると、現在アプリケーションを編集しているユーザーがいない場合、そのユーザーはアプリケーションを編集するためのアクセス権を持つことになります。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/hold-on-while-editing-app.png" />
<p style="width: 100%; text-align:center;">他のユーザーかがアプリを編集しています。少々お待ちください...</p>

ユーザーがワークスペースに参加していない場合、「招待されたメンバーのみが編集できます。」というメッセージが表示されます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/only-invited-members-can-edit.png" />
<p style="width: 100%; text-align:center;">招待されたメンバーのみがアプリを編集できます</p>

### リンクのプレビューが無効になっているサインイン ユーザー
スイッチでリンク共有を無効にすることで、アプリの共有をいつでも停止できます。個人用ワークスペースから**サインイン済み**ユーザーとのアプリの**共有を停止する**と、次の [アクセスが制限されています] ダイアログが表示されます。

[お問い合わせ] リダイレクト ボタンが表示され、App Builder からサインアウトする場合は [サインアウト] ボタンが表示されます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/app-from-personal-workspace-signed-in-disabled-link.png" />
<p style="width: 100%; text-align:center;">アクセスが制限されています</p>

### 匿名ユーザー アプリのプレビュー
匿名ユーザーは、アプリケーションのプレビューを利用できます。すべての編集操作が無効になることに注意してください。メインメニューはロードされておらず、 **コード ビュー** のみが利用可能です。アプリ内で REST API 呼び出しが構成されている場合、匿名ユーザーには常に**モック データ**が表示されます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/anonymous-access-no-edit.png" />
<p style="width: 100%; text-align:center;">匿名アクセスのプレビュー</p>

### 個人用ワークスペースからアプリケーションにアクセスする匿名ユーザー
匿名 (サインインしていない) ユーザーがアプリケーションにアクセスしている場合、アプリケーションを**プレビューできます**。アプリ内で REST API 呼び出しが構成されている場合、匿名ユーザーには常に**モック データ**が表示されます。

### リンクのプレビューが無効になっている匿名ユーザー
匿名ユーザーは、制限されたアプリケーションにアクセスできません。[無料で使い始める!] ボタンを使用していつでもトライアル版アカウントを作成して、利用可能なその他の App Builder 機能をすべて試すことができます。

<img class="responsive-img" style="width: 100%; box-shadow: 5px -4px 13px 1px grey" src="./images/share-edit-and-preview/anonymous-access-disabled-share.png" />
<p style="width: 100%; text-align:center;">アクセスが制限されている、匿名ユーザー</p>

## その他のリソース

<div class="divider--half"></div>

* [アプリでのデータの使用](./using-data-in-your-app.md)
* [オープン API/Swagger サポート](open-api-swagger-support.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)
* [Indigo.Design コンポーネント](https://jp.infragistics.com/products/indigo-design/help/components/components-overview)

