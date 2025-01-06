---
title: オンプレミスおよび SDK 配置用の App Builder 構成フラグ
_description: オンプレミスおよびSDKインスタンスの配置フラグを構成する方法について説明します。
_keywords: App builder, On-premises, deployment flags, オンプレミス, 配置フラグ
_language: ja
---


# オンプレミスおよび SDK 配置用の構成フラグ

このドキュメントでは、App Builder オンプレミス インスタンスを配置および管理するために使用できる構成フラグについて説明します。このドキュメントでは、次のような主要な環境変数の例を示す必要があります。

```sh
docker run --restart always -p 80:5000 -e AuthSettings__ClientId="1234-4657-00"
```

## 構成可能なプロパティ

### environment.ts を通じて (App Builder SDK コンテキストの一部)

```
// 構成プロパティの説明:

- favicon: '/favicon_dev.ico',              // 独自のファビコンを設定できるようにします
- disableSurvey: false,                     // App Builder の調査を無効にします
- enableLibrariesManagement: false,         // ライブラリ管理のドロップダウンを表示/非表示にします
- disablePublishToGithub: false,            // 「GitHub にプッシュ」 ボタンを無効/有効にします
- disableFeedback: false,                   // フィードバック ダイアログの表示を切り替えます
- showOnboardingVideos: false,              // オンボーディングの YouTube ビデオを切り替えます
- toggleableDatasourceTags: false,          // データ ソースのカラー タグの表示状態を切り替えます
- hideMainMenu: false,                      // アプリケーション シェルのメイン メニューの表示状態を切り替えます
- personalWorkspaceLabel: 'myProjects',     // 個人ワークスペースのラベル値を設定します
- disableCodegen: false,                    // コード生成サービスの使用を切り替えます
- hideSharingOptions: false,                // UI の共有オプションの表示を切り替えます
- hideHelpResources: false,                 // インターフェース内のヘルプ リソースを非表示にします
- hideAppBuilderLogo: false,                // App Builder のロゴを非表示にします
- disableQuickTips: false,                  // クイック ヒントを無効にします
- hideMockDataSources: false,               // UI からモック データ ソースを非表示にします
- hideVerbPills: false,                     // API 関連機能の HTTP 動詞ピルを非表示にします
- useSummaryForOperationName: false,        // 操作名にはフルネームではなく要約を使用します
- showObjectDatasources: false,             // オブジェクトベースのデータ ソースのサポートを有効にします (限定的な使用例)
- hideDesktopApp: false,                    // UI でデスクトップ アプリ関連のオプションを非表示にします
- hideAccountMenu: false,                   // UI からアカウント メニューを非表示にします
- hideExperimentalGenerators: [],           // コード エクスポートから非表示にするフレームワークを指定します (例: [{ platform: Platform.react }])
- disableMockDataUponFailedEndpoint: false, // エンドポイントにエンドポイントが発生した場合にモック データが使用されないようにします
- disableAI: false,                         // AI 関連の機能を無効にします
- enableCssGridLayout: true,                // CSS グリッド レイアウト機能を有効にします
- showPreviewInvite: true,                  // コラボレーション機能のプレビュー招待を表示します

// テーマのプロパティ:

appTheme: {                                  
    schema: 'light-bootstrap-schema',       // 基本テーマのスキーマを定義します
    colors: {                               
        primary: '#2D8DFF',                 // アプリケーション内で使用するプライマリ カラー
        secondary: '#2D8DFF',               // セカンダリ カラー
        surface: '#F1F7FF',
        success: '#31AB2B',                 // 成功インジケーターのカラー
        warn: '#F2C200',                    // 警告インジケーターのカラー
        error: '#DB372A',                   // エラー インジケーターのカラー
        info: '#0678FF',                    // 情報インジケーターのカラー
        grays: '#2F2F2F',
    },
    typeface: 'Public Sans',                // アプリケーションのデフォルト フォント
    fonts: [],                              // 追加のフォント ファミリー
    scale: 'bootstrap-type-scale',
    roundness: 0.3,                         // 角丸
    elevation: null,                        // 該当する場合、標高 (影)
},

shellTheme: {                               
    typeface: 'Public Sans',                // アプリケーション シェルで使用されるフォント
    colors: {                               
        primary: '#2D8DFF',                 // プライマリ カラー
        grays: '#9A9DA2',
        success: '#31AB2B',                 // 成功インジケーターのカラー
        warn: '#F2C200',                    // 警告カラー
        error: '#DB372A',                   // エラー カラー
        aux1: '#068E6B',
        aux2: '#9C27B0',
    },
}
```
 
### docker run コマンドのパラメーターを通じて (オンプレミスのコンテキスト)

```sh
docker run --restart always -p 80:5000 -e AuthSettings__ClientId="1234-4657-00"
```

## その他のリソース
<div class="divider--half"></div>

* [OpenID Connect による認証](auth-with-openid-connect-o-auth.md)
* [外部リソースのホワイトリスト化](external-references-for-whitelisting.md)
* [オンプレミスの前提条件とインストールの概要](../on-prem-prerequisites-and-installation.md)
* [App Builder インターフェイスの概要](../interface-overview.md)