---
title: Reveal ダッシュボード
_description: App Builder を使用すると、ユーザーは Reveal ダッシュボードを使用してデータを視覚化し、データ分析を行うことができます。
_keywords: App builder, インフラジスティックス, Reveal BI
_language: ja
---

# Reveal ダッシュボード

App Builder ツールボックスから Reveal ダッシュボードを直接追加し、データをホストしている Reveal Server SDK への URL を指定できるようになりました。App Builder は、App Builder がリクエストと応答を送受信するサーバーのエンドポイントである baseURL を取得するクライアント アプリケーションであると考えてください。

Reveal ダッシュボードが読み込まれると、Marketing (マーケティング)、Sales (販売)、Campaigns (キャンペーン)、Manufacturing (製造) の 4 つの使用可能なオプションからダッシュボード名を指定できます。テスト目的のみに独自のサーバーをホストしています。エクスポートすると、デモ目的で Marketing ダッシュボードのみを公開するトライアル サーバー (ベース URL) への参照が取得されます。

> [!NOTE]
> ビジネス インテリジェンス ソリューションとしての Reveal についての詳細は[こちら](https://help.revealbi.io/ja/web/overview/)です。

<iframe id="frame" style="aspect-ratio: 4/3; width: 100%;" src="https://my.appbuilder.dev/app/wrwn5yv0tcjg/preview"/>

## 既知の問題と制限

- Reveal ダッシュボード コード生成は **Angular でのみ**利用可能です。
- ビューごとに 1 つのベース URL バインディングのみがサポートされます。2 つ以上の Reveal ダッシュボードが App Builder ビューに追加される場合、それらは同じベース URL を使用する必要があります。
- スペースを含むフォントでカスタム テーマを使用しても、可視化内のテキストには影響しません。
- アプリケーションのプレビュー:
  - 表示スケールが 100% と異なる場合のビューのサイズ変更の問題、垂直/水平スクロールバーで顕著になります。**回避策:** ラッピング (親) Reveal  ダッシュボードのパディングを設定します。リビール ダッシュボードが配置されるステップ コンテナーのパディングを使用した[例](https://my.appbuilder.dev/app/wrwn5yv0tcjg/preview)。
  - App Builder プレビューでダッシュボードを編集すると、サーバーから予期しないエラー (_Unexpected error - Quill is not defined_) が発生する可能性があります。
- コードのエクスポート時:
  - ダッシュボード要素を操作して展開または縮小するときに、サイズ変更の問題が発生する可能性があります。Reveal プレースホルダーは、ブラウザー ウィンドウ全体のサイズが変更されたときに適切にサイズ変更されますが、内部要素のサイズ変更の場合はそうではありません。
