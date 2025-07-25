---
title: App Builder でワークスペースを作成および管理する  
_description: App Builder を使用してワークスペースをすばやく作成および管理する方法について説明します。 
_keywords: App Builder, インフラジスティックス, ワークスペース, リモート ページング,複数のアクション, ローコードプラットフォーム, Ignite UI
_language: ja
---

# App Builder でのワークスペースの管理

## 概要

App Builder のワークスペースは、アプリケーションとその関連リソースの共有フォルダーのように機能する共同作業環境です。各ワークスペースでは、招待されたユーザーが重複することなくアプリやワークスペース レベルのアセットにアクセスし、編集および管理できます。

ネイティブ ワークスペースのサポートにより、App Builder はワークスペース機能に関して Indigo.Design Cloud に依存せず、完全に自己完結型になりました。この変更は、SaaS ユーザーとオンプレミス ユーザーの両方にメリットをもたらしますが、特に Indigo.Design プラットフォーム全体を使用せずにアプリを管理したいユーザーにはメリットとなります。

## 主要機能

### ワークスペース コラボレーション
- メールでチーム メンバーを招待します。
- 共有ワークスペースの提案に基づいてメンバーを追加します。
- メール/アカウント検証で招待を承認します。
- メンバーを削除するか、メンバーが自主的に退出できるようにします。
- 招待された (まだ参加していない) メンバーを表示および管理します。
- ユーザー設定ごとにワークスペースをピン固定/ピン固定解除します。

### ワークスペース エンティティ
ワークスペース内のすべてのアプリ間で自動的に共有されるリソース:
- ビューポート
- テーマ
- データ ソース
- アセット (画像など)

### ワークスペース間でのアプリのコピー
次の処理を自動的に実行して、アプリを別のワークスペースにコピーします。
- 共有アセット、テーマ、ビューポート、変数、データ ソース。
- コピー後に GitHub リポジトリ リンクは保存されません。

## 使用方法

### ワークスペースの作成と管理
1. App Builder ダッシュボードから**ワークスペース メニュー**にアクセスします。
2. 既存の UI を使用して、**ワークスペースを作成**したり、ユーザーを招待したり、設定を更新したりします。
3. **ワークスペースのピン固定**オプションを使用してメニューをカスタマイズします。

### メンバーの招待と管理
- App Builder から直接**メールでユーザーを招待します**。
- 招待を受け入れると、セキュリティのためにアカウントの検証が行われます。
- 招待の状態を追跡し、必要に応じて招待を再送信します。
- ただちにメンバーを削除します。

### アプリケーションを別のワークスペースにコピーする
1. アプリのコンテキスト メニューから **[ワークスペースにコピー]** オプションを使用します。
2. ターゲット ワークスペースを選択します。
3. コピー操作を確認します。App Builder は:
   - 必要なリンクされたリソースをすべてコピーします。
   - 可能な場合は既存のものと一致させます。
   - 完了時に成功通知を表示します。

> [!NOTE]
> GitHub リポジトリ リンクは保存されません。リポジトリを手動で再接続する必要があります。

## 変更内容と影響について

- 移行中または移行後に**機能が失われることはありません**。
- **視覚的な UI の変更はありません**。
- アプリが作成または削除されると、**ローカライズされたメール通知**が送信されます。

## 制限

- 同じアプリをライブ リンクとして複数のワークスペースに追加することはできません (アプリ同期なし)。
- コピー後に GitHub リポジトリのリンクが維持されません。
- コピーするワークスペース レベルの成果物を選択することはできません。App Builder はすべてをコピーします。

## ベスト プラクティス

| タスク                              | 推奨 |
|-----------------------------------|----------------|
| ユーザーの追加                      | すばやく招待するには、共有ワークスペースから提案されたユーザーを使用します。 |
| リソースの管理                | アプリをコピーするときに、App Builder が既存のリソースを自動検出して一致させるようにします。 |
| ワークスペース名の変更               | 明確にするために、変更は全ユーザーに適用されます。 |
| ワークスペースから退出                | ワークスペース メニューの **[ワークスペースから退出]** オプションを使用します。 |
| 招待の追跡                  | ワークスペース設定から、承認されていない招待を監視し、再送信します。 |



## よくある質問 (FAQ)

### Indigo.Design で App Builder ワークスペースを表示できますか?
いいえ。ネイティブ ワークスペース サポートは、Indigo.Design から完全に分離されました。App Builder で作成されたワークスペースは表示されず、Indigo で同期されません。

### 移行後、アプリとメンバーはどうなりますか?
**サービスの中断**やデータの損失はありません。既存のワークスペース、アプリ、メンバーシップ、共有 URL はすべて保持されます。

### アプリをコピーするときに、リソースを手動で再リンクする必要がありますか?
いいえ。App Builder は可能な場合にリソースを自動的に一致させます。一致しないリソースのみが複製されます。

## その他のリソース
<div class="divider--half"></div>

* [App Builder インターフェイスの概要](interface-overview.md)
* [単一ページとナビゲーション](single-page-apps-and-navigation.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [アプリの生成](generate-app/generate-app-overview.md)
