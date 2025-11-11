---
title: App Builder オンプレミスの外部参照のホワイトリスト化
_description: オンプレミス インスタンスのすべての外部リソースをホワイトリストに登録する方法について説明します。
_keywords: App builder, On-premises, whitelisting, オンプレミス, ホワイトリスト化
_language: ja
---

# オンプレミス App Builder の外部リソースのホワイトリスト化

## 概要

このドキュメントでは、オンプレミス環境内で App Builder が適切に機能するためにホワイトリストに登録する必要がある外部 URL について説明します。これらの URL をホワイトリストに登録すると、コンポーネント ライブラリ、ドキュメント、ビデオ チュートリアルなどのリソースへのシームレスなアクセスが保証され、開発とユーザー エクスペリエンスの両方が向上します。

## 実装のヒント

このホワイトリストを統合することで、開発者はオンプレミスのセットアップから Infragistics App Builder に必要なすべての外部リソースにアクセスできるようになります。

1. ブロックされないように、以下の URL がネットワークのホワイトリストまたはプロキシ設定に追加されていることを確認してください。
2. 新しいリソースや URL が追加された場合、または変更があった場合は、このリストを定期的に更新してください。
3. 複数のサブページが必要になる可能性があるドメインには、ワイルドカード エントリの使用を検討してください (例: すべての Infragistics リソースの場合は *.infragistics.com)。例:

- すべての Infragistics リソースに `*.infragistics.com` を追加します。
- App Builder 固有のリソース用に `*.appbuilder.dev` を追加します。
- 複数のパスが存在する可能性がある YouTube などのサービスの場合、YouTube サイト全体へのアクセスを許可するには `*.youtube.com` を検討してください。
- Discord チャンネルは[一般的な Web URL](https://discord.com/channels/836634487483269200/836635360594755665) ではないため、特定のエントリが必要になる場合があります。

## ホワイトリストのカテゴリ

以下に、App Builder プラットフォームに含まれるすべての外部 URL の詳細なリストを示します。明確さと使いやすさを確保するために、URL はその目的に基づいてカテゴリごとに整理されています。

### App Builder リソース

- [ランディング ページ。](https://jp.infragistics.com/products/appbuilder)
- [価格ページ。](https://www.appbuilder.dev/ja/pricing)
- [Windows](https://jp.infragistics.com/products/appbuilder/download)、[Mac](https://jp.infragistics.com/products/appbuilder/download/mac)、[Linux](https://jp.infragistics.com/products/appbuilder/download/linux) 用の App Builder デスクトップ アプリケーション。
- [プレビュー版環境](https://preview.appbuilder.dev/)と[製品版環境](https://my.appbuilder.dev/)のプラットフォーム URL。
- [サブスクリプション](https://account.appbuilder.dev/subscriptions)と[個人プロファイル](https://account.appbuilder.dev/private-profile)のユーザー アカウント。

### ドキュメントとヘルプ。

- [作業の開始。](https://jp.infragistics.com/products/appbuilder/help/getting-started)
- [変更ログ。](https://jp.infragistics.com/products/appbuilder/help/change-log)
- [ナビゲーションのヒント。](https://jp.infragistics.com/products/appbuilder/help/single-page-apps-and-navigation)
- [レイアウトのヒント。](https://jp.infragistics.com/products/appbuilder/help/flex-layouts/flex-layouts)

#### 製品ページ

- [Reveal BI のヘルプ ページ。](https://help.revealbi.io/ja/web/getting-started-angular/)

#### 法律 & プライバシー。

- [Infragistics のプライバシー ポリシー。](https://jp.infragistics.com/legal/privacy)
- [Infragistics の利用条件。](https://jp.infragistics.com/legal/terms-of-use)
- [App Builder AI のプライバシー ポリシー。](https://www.appbuilder.dev/ja/ai-privacy-policy)

#### コミュニティ & サポート

- [Discord](https://discord.com/channels/836634487483269200/836635360594755665)
- [ウェビナーや作業の開始コンテンツを含む YouTube ビデオ。](https://www.youtube.com/@AppBuilder_Dev)

#### コンポーネント ライブラリ

- [Ignite UI for Angular](https://jp.infragistics.com/products/ignite-ui-angular/angular)
- [Ignite UI for Blazor](https://jp.infragistics.com/products/ignite-ui-blazor/blazor)
- [Ignite UI for Web Components](https://jp.infragistics.com/products/ignite-ui-web-components/web-components)
- [Ignite UI for React](https://jp.infragistics.com/products/ignite-ui-react/react)


このトピックの推奨事項に従うことで、ユーザーは必要なリソースに簡単にアクセスできるようになり、ネットワーク セキュリティを維持しながらワークフローの摩擦を軽減できます。

## その他の App Builder リソース

<div class="divider--half"></div>

- [OpenID Connect を使用したオンプレミス認証](auth-with-openid-connect-o-auth.md)
- [App Builder の配置構成フラグ](configuration-flags.md)
