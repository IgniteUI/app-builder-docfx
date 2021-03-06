---
title: Indigo Design App Builder - 変更ログ 
_description: Indigo Design App Builder を使用すると、実際のアプリケーション シナリオをカバーするために、画面とコンポーネント間の接続を作成する際にデザインおよび開発チームがさまざまなインタラクションを使用できます。
_keywords: App Builder, Web App Builder, デザイン システム, デザイン システム UX, UI キット, Sketch, Ignite UI for Angular, Sketch to Angular, Angular, Angular デザイン システム, Sketch から コードをエクスポート, Angular 用のデザイン キット, Sketch UI キット, インタラクション
_language: ja
---
# Indigo Design App Builder - 変更ログ

> [!NOTE]
><b>最新の更新は 2022 年 6 月 13 日に行われました。

## 2022 年 6 月リリース
### 機能
 - コンポーネント ツールボックスに **Category Chart** を追加しました。
 - コンポーネント ツールボックスに **Pie Chart** を追加しました。
 - **GitHub の統合**: ユーザーの変更をロールバックせずに更新を公開できるようになりました。
 - **ローカル ネットワーク ソース**からのデータ リクエストを許可するようになりました。

[詳細情報](https://www.infragistics.com/community/blogs/b/infragistics/posts/app-builder-release-with-charts-support-and-more)

## 2022 年 5 月リリース
### 機能
- Sketch で Material、Fluent、Bootstrap、Indigo テーマに一致する **4 つの新しい UI キット**を使用してデザインを作成できます。
- **Blazor** に **Dark テーマ**のサポートを追加しました。

### 機能改善
- **Blazor** アプリのコード生成:
  - **DropDown、Chip、Slider、Snackbar** のサポートを追加しました。
  - **Navigation drawer、Navigation bar、および Card** のコード生成を更新しました。
  - オープン/クローズまたは表示/非表示アクションを使用する**クリック インタラクション**を生成できるようになりました。
  - バインドされたデータ (コレクション) に基づいた繰り返しコンポーネントのサポートを追加しました。
- Sketch からアプリをインポートする際の色解析を改善しました。
- Angular と Blazor の改善 - コード出力から**デフォルト値のままのプロパティを除外しました**。
- 「Task Management」 **サンプル アプリ**を新しいビジュアル スタイルで更新しました。
- **Navigation bar** の外観プロパティを設定できるようになりました。
- メインのアプリ メニューから **App Builder デスクトップ アプリケーションをダウンロード**できるようになりました。

## メンテナンスの更新とバグ修正
- Indigo.Design UI キットの名前を変更しました。
- エンドポイント (OpenAPI) の構成時の baseUrl の自動入力を更新しました。

## 2022 年 4 月リリース
### 機能
- リンクされたすべてのリソース (テーマ、画像アセット、データ)を含め、**アプリケーションを別のワークスペースにコピーできます**。
- 新しいアプリの作成時に新しい**アプリ テンプレート**を選択できます。
- アプリで新しいビューを作成するときに**プリセット レイアウト**を選択できます。

### 機能改善
- **Swagger UI** 関連およびバグ修正

### メンテナンスの更新とバグ修正
**これには以下が含まれますが、これらに限定されません:**
- Swagger テーブルのコンテキスト メニューを非表示にしました。
- URL を追加時の進行状況インジケーターを、完了ボタンに追加しました。
- DS テーブルにない `requestInfo` を修正しました。
- 表示する baseUrl がない場合にドロップダウンを非表示にしました。
- 認証方法に必要な機能を追加しました。
- 空の .json ファイルを使用しないようにしました。
- エンドポイントが多数がある場合のパフォーマンスを改善しました。
- [データの選択] ダイアログが、フィールドではなくデータ ソースを表示する問題を修正しました。

## 2022 年 3 月リリース
### 機能
- データ バインディング RestAPI ストーリーの一部としての **OpenAPI (Swagger) サポート**。
- **オンプレミス版の App Builder**。独自のサーバーにインストールし、独自のサーバー ファイアウォールの背後にインストールできます。このインスタンスは、任意のインフラストラクチャで実行可能で、内部担当者のみがアクセスできます。

### 機能改善
- 画像の丸め半径を px、%、または rem で設定できます
- ビューやプレビューの切り替え時にデザイン サーフェスのズーム レベルを保持します。
- **Blazor** アプリ生成の改善
  - **カスタム テーマ** (カラー パレットとタイポグラフィ) のサポートが追加されました。
  - アプリのテーマから**グローバル フォント**と**色/背景**を適用できます。
  - REST API の URL ソースを追加する際に、**カスタム ヘッダー** を使用できるようにします。
  - **Date Picker**、**Grid** (列)、**List**、**Nav-Drawer** 項目のコード生成の改善。
  - オブジェクトをデータ ソースとした**ネストされた配列**のサポートを追加しました。

### メンテナンスの更新とバグ修正
**これには以下が含まれますが、これらに限定されません:**
- 「Sketch のアセットを取得する」で発生するエラーの修正。
- Select コンポーネントのポップアップがプレビュー モードで上部に表示されない問題。
- アプリを複製するときに、カスタム ビューポートが失われる問題。
- データ パネルのブレッドクラムが最近の視覚拡張と一致しない問題。
- Fluent テーマおよび丸めを設定すると、アイコンが入力をオーバーフローする問題。
- ドラッグ時にタブをデタッチするとアプリが正しく動作しない問題。
- テキスト編集後にボタンがサイズ変更される問題。
- キャンバスでコンポーネントを選択解除してもアウトライン セクションが縮小されない問題。
- ComboBox 項目はプレビューの影響を受け、クリアボタンがない問題。
- Select は、開く/閉じるアクションを追加するときに「コンポーネントの選択」リストに表示される問題。
- Checkbox および Switch は、none に設定されていてもラベル位置を生成する問題。
- ダーク Fluent テーマの丸みを 1 に設定するとライトになる問題。
- Grid: セル編集はプレビュー モードで正しく機能しない問題。
- Sketch プラグインからのサインアウトが正しく機能しない問題。
- アプリ バーのボタンの無効な状態が正しく機能しない問題。
- 名前に % または # が含まれるアセットは、生成されたアプリケーションに表示されない問題。
- Angular のサービス メソッドと Blazor ビュー モデルでの 非 ASCII Unicode 名のデータ ソースの処理を改善しました。
- 生成されたテキスト コンテンツで中括弧がエスケープされない問題。 - **Angular 固有**
- アプリのルート コンテナーが完全な高さまで拡張されていることを確認します。 - **Blazor 固有**
- 同じデータにバインドされた複数の反復子は、同じビューに複数のデータ プロパティを作成しないようになりました。 - **Blazor 固有**


## 2022 年 1 月 リリース

### 機能改善
- **Sketch UI キットのテーマサポートの改善** - 表面の色を変更するライト/ダーク モードの切り替えが、グレーの色の設定方法に影響するようになりました - 黒または白の派生物として。
- **UI キットのバージョン チェックの更新** - パーサー dll とシンボル間の一貫性のために `<major>.<minor>` と一致するようになりました。シンボル バージョンがパーサー バージョンよりも高い場合、`<patch>` は無視され、エラーをスローしません。(#13942)

### メンテナンスの更新とバグ修正
**これには以下が含まれますが、これらに限定されません:**
- ワークスペースのタイトルが更新されんない問題。
- 新しいワークスペースの作成のキャンセルが無効な状態を表示する問題。
- ダイアログ/ヘッダー/アカウント ダイアログの改善。
- データ ソース検索の空の状態のテンプレートを追加しました。
- [すべてを表示] ワークスペース リンクをスクロール可能な領域から移動しました。
- タイプが Bound であり、データ フィールドが設定されている場合、プロパティはバインドされていると見なされるようにしました。(#14296)
- IsOverlay = true のコンポーネントのデータ セクションを避けます。(#14305)
- カスタム リスト項目のコンテンツを修正しました。(#14322)
- ビジュアルの更新を通知して、境界とオーバーレイを更新します。(#14306)
- 移動中またはサイズ変更中は、親の装飾を非表示にします。(#1388)
- ズームイン/ズームアウト アクションを制限します。(#14268)
- リアルタイム同期によって通知された新しいアプリのメイン メニューを更新します レイヤーに塗りつぶしがある場合にカラー バリエーションを記述する新しい方法を使用するには、スタイルを設定する代わりに、不透明度を変更して同じ色合いを実現します。(#14552)
- 深くネストされたグループと背景を解析するとエラーが発生する問題。(#13954)
- People アプリの解析の修正。(#13905)
- ダイアログ ウィンドウのナビゲーションが機能しない問題 ([GitHub issue](https://github.com/IgniteUI/app-builder/issues/7))。

## 2021 年 12 月 リリース
### 機能
- Blazor (ベータ版) 用のアプリをデザインおよび生成します。
- Windows、macOS、および Linux にデスクトップ アプリとして App Builder をインストールします。
- Adobe XD 用の Indigo.Design UI キットを追加しました。
- 新しい Adobe XD プラグインを使用してデザインからアプリを作成します。

### 機能改善
- アプリとグループ ワークスペースを管理するために App Builder メニューを更新しました。
- 応答オブジェクト内のネストされたコレクションのサポートを追加しました。
- Data-Grid コンポーネントに Excel へのエクスポート機能を追加しました。
- 大きな画像をアセットとしてアップロードする際の自動圧縮を追加しました。
- Sketch プラグインの更新、テーマの改善、および [Sketch からの新しいアプリの作成] のストーリー。

## 2021 年 10 月 リリース
### 機能
 - **画像をアセット ライブラリにアップロードし**、同じワークスペース内のすべてのアプリで共有します。
 - アプリのソース コードを公開またはダウンロードするときにアプリで使用される**アップロードされた画像をダウンロードします**。
 - Sketch プラグインから直接**アプリを作成します**。

### 機能改善
 - ハード コーディングされた JSON データの代わりに、生成されたアプリに **REST エンドポイント URL を含めます**。
 - Sketch ファイルで利用可能な**画像を抽出し**、ワークスペース アセット ライブラリに追加します。
 - **ドキュメントのアウトライン**要素のコンテキスト メニューを追加しました。
 - **ドキュメントのアウトライン**のルート レベルの要素として最も外側のコンテナ (ビュー) を表示します。
 - **画像フィット**および**レイアウト位置**オプションのツールチップの説明を追加しました。

### メンテナンスの更新とバグ修正
 - 一般的なバグ修正とメンテナンス アップデート。

## 2021 年 9 月 リリース

### 機能
 - ツールボックスの **Grid** コンポーネント部分に機能を追加しました。
 - 並べ替え、フィルタリング、セル/行の編集、ページング、選択、GroupBy などの 10 以上の新機能。
 - コンポーネント ツールボックスに **Snackbar** を追加しました。
 - オンボーディング エクスペリエンスの改善:
  - クイック ヒント - クイック ヒント機能は、利用可能な概念とアクセラレーターについてユーザーを徐々に教育することを目的としています。クイック ヒントは、コンポーネントのサイズ変更や新しい子ビューの追加など、ユーザーが App Builder で特定のアクションを完了するとトリガーされます。
  - サンプル アプリは、説明付きの新しい視覚的なつまみを表示します。
- GitHub アクションの統合 - GitHub Publish は、ノードの依存関係のクリーン インストール、キャッシュ/復元、ソース コードのビルド、ノードのさまざまなバージョンでのテストの実行を行うワークフローを追加するようになりました。

### 機能改善

 - アプリのダウンロードと GitHub への公開の読み込み時間を短縮
 - [アプリの生成] ボタンが [GitHub に公開] になりました。
 - [新しいアプリケーションの作成] ダイアログが 2 つのサイズになりました。1 つは大型のディスプレイ用、もう 1 つは小型のディスプレイ用です。Sketch または XD のアセットを取得するための新しいセクション。
 - すべてのサンプル アプリには、実際のスクリーンショットを表す更新された意味のあるサムネイルと、ホバーしたときのアプリの簡単なテキスト説明が含まれています。
 - アプリ生成用に .sketch ファイルをアップロードする際のテーマの読み込みが改善されました。
 - Adobe XD ファイルのサポート (Adobe XD プラグインの準備ができたら利用可能になります)。

### メンテナンスの更新とバグ修正

 - アプリの読み込み時間の改善と、アプリ ビルダーを使用する際の一般的なパフォーマンスの調整。
 - 一般的なバグ修正。
 - データが繰り返される要素のエラーを修正しました。
 - バインド可能な要素のデータ ソース リストの母集団の修正。

[詳細情報 (英語)](https://www.infragistics.com/community/blogs/b/infragistics/posts/indigo-design-app-builder-september-release)

## 2021 年 7 月 12 日リリース

### 機能
* **GitHub の統合**: 生成したアプリを ZIP ファイルとしてダウンロードする代わりに GitHub リポジトリに公開できます。
* コンポーネント ツールボックスに「Slider」を追加しました。
* コンポーネント ツールボックスに「Banner」を追加しました。
* [新しいアプリの作成] ダイアログに参照として 2 つの新しいサンプル アプリを追加しました。
* 韓国語翻訳を追加しました。

### 機能改善
* アプリをプレビューするときは、ツールバーのドロップダウンを使用して「マスター ビュー と「子ビュー」を切り替える機能。
* ドラッグアンドドロップを使用して、ドキュメントのアウトラインまたはデザイン サーフェスのコンポーネントを並べ替える機能。
* ドラッグアンドドロップ機能を使用して、ツールボックスのビュー タブで「マスター ビュー」と「子ビュー」を並べ替える機能。
* 「Radio」コンポーネントを「Radio Group」に更新しました。
* 「タブ ヘッダー」内のカスタム コンテンツを許可するように「タブ レイアウト」を更新しました。
* Flex レイアウトで折り返しが有効になっている場合の「align-content」ドロップダウンのアイコンを改善しました。
* アプリは、v11.1.15 ではなく Ignite UI Angular v12.0.1 を使用して生成されます。

### メンテナンスの更新とバグ修正
* 読み込み時間の改善と、App Builder UI を使用する際のパフォーマンスの調整。
* 一般的なバグ修正

## 公式リリース

### 全般
* クラウド インテグレーションおよびチーム コラボレーション - App Builder へのアクセスは、ユーザーがアクティブなアプリケーション プロジェクトを見つける <b>Indigo.Design クラウドの [アプリ] タブ</b>から実行できます。そこから、ユーザーは新しいアプリを起動するか、既存のアプリをプレビュー、名前変更、アーカイブ、または複製できます。<b>Sketch ファイル</b>を App Builder の新しいアプリケーションの開始点として使用します。ユーザーは、App Builder でアップロードすることにより、既存の <b>Sketch ファイル</b>から新しいアプリケーションを開始できます。

### UI コンポーネント
* Dialog
* Combo
* Tabs layout
* Expansion panel
* Date time editor (入力タイプ)
* Button group
* Text area
* Hyperlink

### インタラクション
* 開く/閉じる - 「開く/閉じる」インタラクションにより、<b>Dialog コンポーネント</b>などのオーバーレイ コンポーネントを使用してインタラクションを作成できます。
* 表示/非表示 - 「表示/非表示」は、同じビューで別のコンポーネントの表示状態を表示または非表示にするためにコンポーネントに適用できるインタラクションです。

### App Builder でデータを使用する
* データ ソース - ユーザーが独自の JSON ファイルをアップロードするか、データ ソースに Rest API URL を提供できます。追加されたデータ ソースは、コンポーネントを実際のデータ ソース フィールドに接続するためにリピーターでも使用できます。

### コードの生成
* 全般的な改善とバグ修正

## 公開リリース

### 全般
* レイアウトの<b>幅と高さの最小値と最大値</b>を設定するオプション
* コンポーネントおよびレイアウト サイズ単位の追加 - 新しく追加された単位は、<b>auto min、auto max、px、rem、vh、vw、%</b> です。
* 新しいレイアウト位置オプション - 新しく追加された配置オプションは <b>relative、absolute、fixed、sticky、overflow</b> で、コンポーネントおよびレイアウトに適用できます。
* <b>Ctrl/Cmd + E</b> によるコンポーネントのクイック追加ショートカット
* エラー処理サービスの改善
* さまざまなデバイスでのアプリのクイック プレビュー - アプリ プロジェクトをプレビューする場合、ユーザーはトップ バーのデバイス アイコンを使用してさまざまなビューポートですばやくプレビューできます。
* コンポーネントの外観と境界線のオプション
* 最初の同時実行バージョンの実装
* サンプル アプリ ライブラリの拡張 - このリリースのコンポーネントは、既存のサンプルアプリの機能強化に使用されました。

### UI コンポーネント
* Dropdown
* Select
* Chip
* Navigation drawer
* Navigation bar​

### App Builder でデータを使用する
* リピーター機能 - コンポーネントをデータ ソース フィールドに接続できます。
* モック データへのバインド - ユーザーは、モックアップの Northwind データを使用してデータ バインディングやリピーターを試すことができます。

### コードの生成
* 全般的な改善とバグ修正


## プライベート リリース

### 全般
* インタラクティブなフロー - インタラクティブなフロー機能が拡張され、マスターおよび子ビューのルーティングが可能になりました。
* プリセット レイアウト - 新しいデザインをすばやく開始するための 4 つの定義済みレイアウトが追加されました。
* サンプル アプリのライブラリ - 3 つの定義済みサンプル アプリが追加されました。デザイン プロセスをスピードアップし、Indigo.Design App Builder の仕組みをすばやく確認するための出発点として使用できます。
* 全般的な改善とバグ修正
* 視覚的な改善とユーザーエクスペリエンスの向上

### テーマ サービス
* テーマ プリセット - <b>Material、Bootstrap、Fluent</b> のダーク バージョンとライト バージョンに 6 つの定義済みテーマが追加されました。
* 新しいカスタム テーマ機能の追加 - ユーザーは会社のブランド アセットおよびデザイン システムに合わせてカスタム テーマを作成できます。


### UI コンポーネント
* Absolute Layout 
* Row Layout 
* Column Layout 
* Card
* Views Container
* Avatar
* Calendar
* Icon
* Image
* Text
* Title
* Button
* Checkbox
* Date picker
* Floating Action Button 
* Icon Button
* Input Group
* Radio
* Switch
* Grid
* Badge

### コードの生成
* 全般的な改善とバグ修正

## その他のリソース

<div class="divider--half"></div>


* [作業の開始](getting-started.md)
* [Indigo Design App Builder コンポーネント](indigo-design-app-builder-components.md)
* [インタラクション](interactions.md)
* [Indigo Design App Builder でデータを使用する](using-data-in-your-app.md)
