---
title: App Builder オンプレミスの前提条件、インストール、および構成
_description: App Builder のオンプレミス版をインストール、構成、実行する方法について説明します。前提条件、Docker セットアップ、データベース構成、AI 機能、統合が含まれます。
_keywords: App Builder, On-premises, Infragistics, Docker, 構成, インストール
_language: ja
---

# App Builder オンプレミスの前提条件、インストール、および構成ガイド

## 前提条件

このセクションでは、オンプレミス バージョンの App Builder をインストールするための前提条件を示し、Linux/Mac OS/Windows を維持およびサポートする操作パラメーターを構成するシステム管理者を対象としています。

### データベースの管理

要件に基づいて、MySQL、MSSQL Server、または PostgreSQL のいずれかのデータベース管理システムを使用することができます。

#### MySQL のインストール

1 - [MySQL community edition](https://dev.mysql.com/doc/refman/8.0/en/installing.html) をインストールします ([Windows 用の直接リンク](https://dev.mysql.com/downloads/installer/))。

- 選択:
  - Developer default (開発者のデフォルト)、Next (次へ) および Execute (実行)。

  > 注: 「One or more products requirements have not been satisfied. Do you want to continue?」 というプロンプトが表示された場合は、「Yes」 を選択してください。

- インストールの終了後:
  - [次へ] を選択してサーバーを構成し、プロンプトが表示されたら、必要なルート パスワードを入力してから [実行] を選択します。
  - サーバー構成が終了したら、残りの構成は必要ないため、Cancel (キャンセル) を選択してインストーラーを終了します。

2 - MySQL へのコンテナー接続を許可します。

手順 1 の root ユーザーとパスワードで MySQL に接続し、以下の SQL スクリプトを実行します (ユーザー名とパスワードは AppBuilder から使用されるものになります)。
> 注: [MySQL Workbench ツール](https://dev.mysql.com/downloads/workbench/)を使用して SQL スクリプトを実行できます。

```
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;
```

#### MSSQL Server のインストール

1 - [Sql Server](https://www.microsoft.com/ja-jp/sql-server/sql-server-downloads) をインストールします ([直接リンク](https://go.microsoft.com/fwlink/?linkid=866658))

<img class="box-shadow" style="width: 56%;" src="../images/on-premises-sql-express.png" />
<p style="margin-top:-20px;width: 56%; text-align:center;">On-Premises Sql Express インストール</p>

> 注: オンプレミス サーバーには、VS の組み込み SQL Server Express ではなく、実際の SQL Server が必要です。

2 - tcp/ip を有効にします - 詳細な説明は[こちら](https://docs.microsoft.com/ja-jp/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol?view=sql-server-ver15#to-enable-a-server-network-protocol)。

<img class="box-shadow" src="../images/sql-server-config-manager.png" />
<p style="margin-top:-20px;width:56%; text-align:center;">SqlServer Config Manager</p>

3 - Sql Express の一部として新しい App_Builder ユーザーを追加します。この目的のために [Sql Server Management Studio をインストール](https://docs.microsoft.com/ja-jp/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)して使用できます。

<img class="box-shadow" style="width: 57%;" src="../images/login-parameters.png" />
<p style="margin-top:-20px;width: 57%; text-align:center;">ログイン パラメーター ダイアログ</p>


> 注: 新しく追加されたユーザーに対して、データベースの作成権限が拒否される場合があります。`dbcreator` のようなデータベースを作成するための資格情報を与えるサーバー ロールを与えることを検討する必要があります。

> 注: 管理者の決定に基づいて、[SSMS による認証モード](https://learn.microsoft.com/ja-jp/sql/database-engine/configure-windows/change-server-authentication-mode?view=sql-server-ver16#change-authentication-mode-with-ssms)の変更が必要になる場合があります。SQL Server データベース エンジンは、Windows 認証モードまたは混合モード ( SQL Server 認証モードと Windows 認証モード) のいずれかに設定されます。

### Docker のインストール

Windows ガイド -> [docs.microsoft.com ガイド](https://docs.microsoft.com/ja-jp/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-and-11#tabpanel_1_Windows-10-and-11)

## インストール

このセクションでは、Docker とデータベース (MySQL、MSSQL Server、または PostgreSQL) が既にインストールされていることを前提としています。

### 初回インストール

1 - Infragistics カスタマー ポータルのダウンロード セクションから appbuilder.zip をダウンロードします。<br/>
2 - appbuilder.zip ファイルに含まれる appbuilder.tar を展開します。<br/>
3 - 展開した場所でターミナルまたはコマンド プロンプト ウィンドウを開きます。<br/>
4 - イメージをロードして確認します。<br/>

以下を実行:

```bash
docker load --input appbuilder.tar
```

イメージが正しく読み込まれていることを確認するには、次の表の例を参照してください:

```bash
docker images
```

| REPOSITORY    | TAG               | IMAGE ID          | CREATED                                   |SIZE   |
| --------:     | ----------------  | ----------------- | ---------------------------------------   |-----  |
| appbuilder    | 1.0               | 2a05977e039b      |12 days ago                                |854MB  |

5 - コンテナーを実行します:

```bash
docker run --restart always -p 80:5000 -e "ConnectionStrings:AppBuilderMySqlConnection=server=<your-mysql-database-ip>;database=<your-mysql-schema>;user=<your-mysql-database-user>;password=<your-mysql-database-password>;oldguids=false" -v <external-folder-for-logs>:/appbuilder/logs -v <external-folder-for-storage>:/appbuilder/storage --name appbuilder appbuilder:1.0
```

- **MySQL の例** - これは、MySql インスタンスが 192.168.2.5 で IndigoAppBuilderOnPrem という名前のスキーマを username=appbuilder および password=appbuilder で実行しており、ログとストレージを保存する外部フォルダーとして C:/AppBuilder を選択したと仮定した場合のコマンドです。

```bash
docker run --restart always -p 80:5000 -e "ConnectionStrings:AppBuilderMySqlConnection=server=192.168.2.5;database=IndigoAppBuilderOnPrem;user=appbuilder;password=appbuilder;oldguids=false" -v C:/AppBuilder/logs:/appbuilder/logs -v C:/AppBuilder/storage:/appbuilder/storage --name appbuilder appbuilder:1.0
```

- **MSSQL Server の例** - これは、SQL Server インスタンスが SQLEXPRESS サーバーで IndigoAppBuilderOnPrem という名前のスキーマを USER ID=APP_BUILDER および password=Appbuilder2023 で実行しており、ログとストレージを保存する外部フォルダーとして C:/AppBuilder を選択したと仮定した場合のコマンドです。

```bash
docker run --restart always -p 80:5000 -e "ConnectionStrings:Provider=SqlServer" -e "ConnectionStrings:AppBuilderSqlServerConnection=Data Source=DEV-ZKOLEV\SQLEXPRESS,1433;Database=IndigoAppBuilderOnPrem;User ID=APP_BUILDER;Password=Appbuilder2023!;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False" -v C:/AppBuilder/logs:/appbuilder/logs -v C:/AppBuilder/storage:/appbuilder/storage --name appbuilder appbuilder:1.0
```

6 - ブラウザーを開いて `http://localhost/` を入力します

> 注: Docker Desktop を使用している場合は、Containers/Apps に移動し、コンテナーを見つけ、`[Open in browser]` をクリックします。

<img class="box-shadow" src="../images/docker-apps.png" />
<p style="margin-top:-20px;text-align:center;">Docker Containers/Apps</p>

### OpenID Connect (OAuth 2.0) による認証

詳細については、[OpenID Connect (OAuth 2.0) を使用したオンプレミス認証](auth-with-openid-connect-o-auth.md)のトピックを参照してください。

### 更新

1 - 新しく公開された zip ファイルで初回インストールの最初の 4 つの手順に従います。

2 - 新しいイメージが正しくロードされたことを確認します (古いイメージは <none> としてタグ付けされているはずです)。

```bash
docker images
```


| REPOSITORY        | TAG       | IMAGE ID          | CREATED       |SIZE   |
| --------:         | --------- | ----------------- | ------------- |-----  |
| appbuilder        | 1.0       | 27ff4c1079ac      | 43 hours ago  |932MB  |
| <none>            | <none>    | 2a05977e039b      | 12 days ago   |854MB  |

3 - コンテナーを停止します。

```bash
docker stop appbuilder
```

4 - コンテナーを削除します。

```bash
docker rm appbuilder
```

5 - 初回インストールの手順 5 で使用したのと同じコマンドでコンテナーを実行します。

### アクティブ化

このセクションでは、オンプレミス インスタンスが既にインストールされており、実行していることを前提としています。

サーバーが最初に起動されると、プロンプト ダイアログにインストール ID が表示され、認証キーが要求されます。このインストール ID をお住まいの地域に基づいて[セールス部門](https://jp.infragistics.com/about-us/contact-us#sales)に送信すると、サーバーをアクティブ化するための認証キーが提供されます。


<img class="box-shadow" style="width:36%;" src="../images/activate-app-builder.png" />
<p style="margin-top:-20px;width:36%;text-align:center;">App Builder のアクティブ化</p>

> 注: キーの有効期限が切れる 30 日前に、UI から直接警告メッセージが表示されます。

## 構成の概要

### デフォルト構成

カスタム構成なしで AppBuilder Docker イメージを起動すると、以下の機能は**デフォルトで無効**になります:

- データベース接続 - データベース資格情報が提供されていません (環境変数または構成ファイルで構成する必要があります)
- AI 機能 - すべての AI 機能が無効
- AI チャット パネル - チャット インターフェイスが非表示
- Teams 通知 - 外部ログ統合なし
- レート制限 - リクエスト スロットリングなし
- GitHub/Azure DevOps 統合 - 公開機能が無効

### 構成方法

AppBuilder を構成するには 2 つのオプションがあります:

#### オプション 1: 環境変数 (クイック スタート)

コンテナーを起動するときに、環境変数として直接構成を渡します:

```bash
docker run --restart always -p 80:5000 \
  -v C:/appbuilder/config:/appbuilder/config \
  -v C:/appbuilder/logs:/appbuilder/logs \
  -v C:/appbuilder/storage:/appbuilder/storage \
  --name appbuilder \
  appbuilder:1.0
```

必要なディレクトリ構造:

```
/appbuilder/config/
├── appsettings.json                    # メイン構成オーバーライド
└── ai/                                 # AI 構成 (オプション)
    ├── ai.appsettings.json             # AI プロバイダーとモデル設定
    ├── ai.providers.appsettings.json   # プロバイダー エンドポイント構成
    └── ai.credentials.appsettings.json # API キーと資格情報
    └── ai.models.appsettings.json      # 利用可能な API モデル
```

### 構成ファイル リファレンス

| ファイル | 目的 | 必須 |
|------|---------|----------|
| `appsettings.json` | メイン バックエンド構成 - データベース、認証、ログ、ストレージ、統合を制御します。 | はい |
| `configs/ai/ai.appsettings.json` | AI 機能設定 - 使用する AI プロバイダーとモデルを定義します。 | AI が有効な場合のみ |
| `configs/ai/ai.credentials.appsettings.json` | AI プロバイダー API キー - AI サービスの認証資格情報を保存します。 | AI が有効な場合のみ |
| `configs/ai/ai.providers.appsettings.json` | AI プロバイダー エンドポイント - API ベース URL を構成します (変更が必要なことはほとんどありません)。 | AI が有効な場合のみ |
| `configs/ai/ai.models.appsettings.json` | AI プロバイダー モデルです。 | AI が有効な場合のみ |

**注:** AI 機能を有効にする予定がない場合は、AI 構成ファイルを完全にスキップできます。

## メイン構成 (appsettings.json)

### データベース接続

データベース接続設定は、AppBuilder がユーザー プロジェクト、コンポーネント、アセット、メタデータを含むすべてのアプリケーション データを保存する場所を決定します。

```json
{
  "ConnectionStrings": {
    "Provider": "MySql",
    "AppBuilderMySqlConnection": "server=host.docker.internal;port=3306;database=IndigoAppBuilder;user=root;password=yourpassword;oldguids=false",
    "AppBuilderSqlServerConnection": "Data Source=<server>;Database=<database>;User Id=<username>;Password=<password>;Encrypt=False;TrustServerCertificate=True;MultipleActiveResultSets=True",
    "AppBuilderPostgreSqlConnection": "Host=<hostname>;Port=5432;Database=<database>;Username=<username>;Password=<password>"
  }
}
```

| オプション | タイプ | 説明 |
| --- | --- | --- |
| Provider | 文字列 | 使用するデータベース エンジンを決定します。有効な値: "MySql"、"SqlServer"、"PostgreSql" です。アプリケーションは、このプロバイダー値と一致する接続文字列のみを使用します。 |
| AppBuilderMySqlConnection | 文字列 | MySQL/MariaDB 接続文字列です。Provider が "MySql" の場合に使用されます。`oldguids=false` パラメーターは、適切な GUID 処理に必要です。Docker ホスト マシン上のデータベースに接続するには `host.docker.internal` を使用し、Docker コンテナーでホストされるデータベースに接続するには `server=mysql` を使用します。**重要:** コンテナー化されたデータベースを使用する場合は、`--network` オプションと共に AppBuilder コンテナーを起動します (例: `docker run --restart always -p 8080:5000 --network appbuilder-network`)。 |
| AppBuilderSqlServerConnection | 文字列 | SQL Server 接続文字列です。Provider が "SqlServer" の場合に使用されます。`MultipleActiveResultSets=True` は、Entity Framework Core が SQL Server で正しく動作するために必要です。 |
| AppBuilderPostgreSqlConnection | 文字列 | PostgreSQL 接続文字列です。Provider が "PostgreSql" の場合に使用されます。標準の Npgsql 接続文字列形式です。 |

### ロギング構成

アプリケーション ログの書き込みと管理方法を制御します。

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Warning",
      "Microsoft": "Warning"
    }
  },
  "CustomLogging": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "Microsoft.EntityFrameworkCore": "Error"
      }
    },
    "Files": {
      "Paths": {
        "AI": "./logs/ai.log",
        "Backend": "./logs/backend.log",
        "DataProtection": "./logs/data-protection.log"
      },
      "RollingInterval": "Infinite",
      "FileSizeLimitBytes": 52428800,
      "RollOnFileSizeLimit": true,
      "FlushToDiskInterval": "00:00:01",
      "Retention": 90
    },
    "Teams": {
      "AIError": {
        "Enabled": false,
        "LogicAppUrl": "",
        "Period": "00:00:01",
        "TeamId": "",
        "ChannelId": ""
      },
      "DataProtection": {
        "Enabled": false,
        "Email": ""
      }
    }
  }
}
```

#### Teams 通知

| オプション | 説明 |
|--------|-------------|
| `Teams.AIError.Enabled` | `true` の場合、AI エラーは Logic App Webhook 経由で Microsoft Teams チャネルに送信されます。 |
| `Teams.AIError.LogicAppUrl` | Teams に投稿する Azure Logic App の URL です。 |
| `Teams.DataProtection.Enabled` | `true` の場合、データ保護アラートはメールで送信されます。 |
| `Teams.DataProtection.Email` | データ保護アラートのメール アドレスです。 |


### レート制限オプション

不正使用を防ぐためにリクエスト レート制限を制御します。

```json
{
  "IPRateLimiterOptions": {
    "Enabled": false,
    "PermitLimit": 500,
    "SegmentsPerWindow": 10,
    "WindowSeconds": 60,
    "QueueLimit": 0,
    "QueueProcessingOrder": "OldestFirst"
  },
  "UserRateLimiterOptions": {
    "Enabled": false,
    "PermitLimit": 1000,
    "SegmentsPerWindow": 6,
    "WindowSeconds": 60,
    "QueueLimit": 0,
    "QueueProcessingOrder": "OldestFirst"
  }
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `Enabled` | ブール値 | **レート制限がアクティブかどうか。** 有効にするには `true` に設定します。内部/信頼されたネットワークの場合は、`false` のままにできます。 |
| `PermitLimit` | 整数 | **ウィンドウごとに許可される最大リクエスト数です。** IP リミッターはデフォルトで 500、ユーザー リミッターは 1000 です。 |
| `SegmentsPerWindow` | 整数 | **タイム ウィンドウが分割されるセグメントの数です。** スライディング ウィンドウ アルゴリズムに使用されます。値が高いほど、よりスムーズな制限が行われます。 |
| `WindowSeconds` | 整数 | **秒単位のタイム ウィンドウ サイズです。** リクエストはこのローリング ウィンドウ内でカウントされます。 |
| `QueueLimit` | 整数 | **制限を超えたときにキューに入れるリクエストの数です。** `0` は即座に拒否することを意味します。値が高いほど、後で処理するためにリクエストをキューに入れます。 |
| `QueueProcessingOrder` | 文字列 | **キューに入ったリクエストを処理する順序です。**`"OldestFirst"` (FIFO) または `"NewestFirst"` (LIFO)。 |

**IP レート リミッター:** IP アドレスごとにリクエストを制限します。個々の悪意あるアクターから保護します。

**ユーザー レート リミッター:** 認証されたユーザーごとにリクエストを制限します。認証されたユーザーによる不正使用から保護します。

### GitHub との統合

GitHub リポジトリへのプロジェクトのプッシュを有効にします。

以下で disablePublishToGithub: false を設定します。

```json
{
  "FrontendOptions": {
    "Extras": "{ disablePublishToGithub: false, disableSurvey: true, disableAnalytics: true, disableFeedback: true, requiresActivation: true }"
  }
}
```

```json
{
  "GithubOptions": {
    "Enabled": true,
    "BaseUrl": "https://github.com/",
    "AuthorizeClientEndpoint": "/login/oauth/authorize",
    "AccessTokenEndpoint": "/login/oauth/access_token",
    "Scope": "user repo workflow",
    "RedirectUri": "/oauth/github/auth-callback",
    "ClientId": "<your-github-oauth-app-client-id>",
    "ClientSecret": "<your-github-oauth-app-client-secret>",
    "PackageAccessTokenSuffix": ""
  }
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `BaseUrl` | 文字列 | **GitHub ベース URL です。** github.com の場合は `"https://github.com/"` を使用し、GitHub Enterprise URL を使用します。 |
| `AuthorizeClientEndpoint` | 文字列 | **OAuth 認証エンドポイント パスです。** 標準値です。カスタム GitHub Enterprise を使用している場合以外は変更しないでください。 |
| `AccessTokenEndpoint` | 文字列 | **OAuth トークン エンドポイント パスです。** 標準値です。変更しないでください。 |
| `Scope` | 文字列 | **リクエストする OAuth スコープです。** `"user repo workflow"` は、ユーザー情報の読み取り、リポジトリへのアクセス、ワークフローのトリガーを許可します。 |
| `RedirectUri` | 文字列 | **OAuth コールバック パスです。** これは GitHub OAuth App 設定で構成されたものと一致する必要があります。 |
| `ClientId` | 文字列 | **GitHub OAuth App クライアント ID です。** [GitHub] > [Settings] > [Developer settings] > [OAuth Apps] で OAuth App を作成します。 |
| `ClientSecret` | 文字列 | **GitHub OAuth App クライアント シークレットです。** これは非公開情報であるため安全に保管してください。 |

**セットアップ手順:**

1. [GitHub] > [Settings] > [Developer settings] > [OAuth Apps] > [New OAuth App] に移動します。
2. [Homepage URL] を AppBuilder URL に設定します。
3. [Authorization callback URL] を `https://your-appbuilder-url/oauth/github/auth-callback` に設定します。
4. クライアント ID とクライアント シークレットを構成にコピーします。
5. 変更を含めるためにコンテナーを再起動します。 `docker run --restart always -p 8080:5000 --network appbuilder-network -v C:/appbuilder/config:/appbuilder/config --name appbuilder -d appbuilder:2.0`

### Azure DevOps との統合

Azure DevOps リポジトリへのプロジェクトの公開を有効にします。

以下で disablePublishToDevOps: false を設定します。

```json
{
  "FrontendOptions": {
    "Extras": "{ disablePublishToDevOps: false, disableSurvey: true, disableAnalytics: true, disableFeedback: true, requiresActivation: true }"
  }
}
```

```json
{
  "DevOpsOptions": {
    "Enabled": true,
    "TokenEncryptionKeyBase64": "<generate-a-random-16-byte-base64-key>",
    "BaseUrl": "https://login.microsoftonline.com/",
    "TenantId": "common",
    "AuthorizeClientEndpoint": "oauth2/v2.0/authorize",
    "RedirectUri": "/oauth/devops/auth-callback",
    "AccessTokenEndpoint": "oauth2/v2.0/token",
    "RevokeTokenEndpoint": "https://graph.microsoft.com/v1.0/users/{userObjectId}/revokeSignInSessions",
    "Scopes": "499b84ac-1321-427f-aa17-267ca6975798/user_impersonation offline_access openid profile user.read",
    "ClientId": "<your-azure-ad-app-client-id>",
    "ClientSecret": "<your-azure-ad-app-client-secret>",
    "RestApiVersion": "7.1",
    "ExcludedOrganizations": []
  }
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `TokenEncryptionKeyBase64` | 文字列 | **保存された OAuth トークンを暗号化するためのキーです。** `openssl rand -base64 16` で生成します。 |
| `BaseUrl` | 文字列 | **Azure AD ログイン URL です。** Microsoft ID プラットフォームの標準値です。 |
| `TenantId` | 文字列 | **Azure AD テナントです。** 任意の Microsoft アカウントを許可するには `"common"` を使用し、シングルテナントの場合はテナント ID を指定します。 |
| `Scopes` | 文字列 | **Azure DevOps の OAuth スコープです。** GUID は Azure DevOps のリソース ID です。設定の意味と効果を理解していない場合は変更しないでください。 |
| `ClientId` | 文字列 | **Azure AD App Registration クライアント ID です。** |
| `ClientSecret` | 文字列 | **Azure AD App Registration クライアント シークレットです。** |
| `RestApiVersion` | 文字列 | **Azure DevOps REST API バージョンです。** `"7.1"` が現在の安定バージョンです。 |
| `ExcludedOrganizations` | 配列 | **非表示にする Azure DevOps 組織のリストです。** ユーザーは公開時にこれらの組織を表示しません。 |

変更を含めるためにコンテナーを再起動します。 `docker run --restart always -p 8080:5000 --network appbuilder-network -v C:/appbuilder/config:/appbuilder/config --name appbuilder -d appbuilder:2.0`


### メール構成

メール通知を有効にします (オプション)。

```json
{
  "EmailOptions": {
    "Smtp": {
      "Server": "smtp.your-server.com",
      "Port": "587",
      "User": "your-smtp-user",
      "Password": "your-smtp-password"
    }
  }
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `Server` | 文字列 | **SMTP サーバー ホスト名です。** |
| `Port` | 文字列 | **SMTP サーバー ポートです。** 一般的な値: `"587"` (TLS)、`"465"` (SSL)、`"25"` (暗号化なし - 非推奨)。 |
| `User` | 文字列 | **SMTP 認証ユーザー名です。** |
| `Password` | 文字列 | **SMTP 認証パスワードです。** |

## AI 構成

AI 機能は**オプション**です。有効にするには、`configs/ai/` 内のファイルを構成します。

### ai.appsettings.json

使用する AI プロバイダーとモデルを制御します。

```json
{
  "AIOptions": {
    "Provider": "OPENAI",
    "Model": "gpt-4.1-mini",
    "SupportsVision": true
  },
  "ImageGeneration": {
    "Provider": "OPENAI",
    "Model": "gpt-image-1"
  },
  "GoogleCloudTranscribe": {
    "Enabled": false,
    "Credentials": "GoogleCloud",
    "Model": "latest_long",
    "DefaultLanguageCode": "en-US"
  }
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `AIOptions.Provider` | 文字列 | **テキスト生成プロバイダーです。** 値: `"OPENAI"`、`"ANTHROPIC"`、`"GOOGLECLOUD"`、`"GROQ"` |
| `AIOptions.Model` | 文字列 | **テキスト生成モデル ID です。** 選択したプロバイダーの有効なモデルである必要があります (下表を参照)。 |
| `AIOptions.SupportsVision` | ブール値 | **モデルが画像を分析できるかどうか。** 画像認識機能を持つモデルの場合は有効にします。 |
| `ImageGeneration.Provider` | 文字列 | **画像生成プロバイダーです。** 値: `"OPENAI"`、`"GOOGLECLOUD"`、`"RUNWARE"` |
| `ImageGeneration.Model` | 文字列 | **画像生成モデル ID です。** |
| `GoogleCloudTranscribe.Enabled` | ブール値 | **音声からテキストへの変換を有効にします。** Google Cloud 資格情報が必要です。 |
| `GoogleCloudTranscribe.DefaultLanguageCode` | 文字列 | **音声認識のデフォルト言語です。** 例: `"en-US"`、`"de-DE"`、`"fr-FR"`。 |

**利用可能なモデル:**

| プロバイダー | テキスト モデル | 画像モデル |
|----------|-------------|--------------|
| OpenAI | `gpt-5.2`、`gpt-5.1`、`gpt-5-mini`、`gpt-5-nano`、`gpt-4.1`、`gpt-4.1-mini`、`gpt-4.1-nano` | `gpt-image-1` |
| Anthropic | `claude-sonnet-4-5-20250929`、`claude-haiku-4-5-20251001` | - |
| Google Cloud | `gemini-2.5-pro`、`gemini-2.5-flash`、`gemini-3-pro-preview` | `imagen-4.0-generate-001`、`imagen-4.0-ultra-generate-001`、`imagen-4.0-fast-generate-001` |
| Groq | `llama-3.3-70b-versatile`、`llama-3.1-8b-instant` | - |
| Runware | - | `runware:100@1`、`runware:101@1` |

### ai.credentials.appsettings.json

AI プロバイダーの API キーを保存します。

```json
{
  "AICredentialsOptions": {
    "OpenAI": {
      "ApiKey": "<your-openai-api-key>"
    },
    "Anthropic": {
      "ApiKey": "<your-anthropic-api-key>"
    },
    "Groq": {
      "ApiKey": "<your-groq-api-key>"
    },
    "Runware": {
      "ApiKey": "<your-runware-api-key>"
    },
    "GoogleCloud": {
      "JsonCredentials": {
        "type": "service_account",
        "project_id": "your-project-id",
        "private_key_id": "...",
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "...",
        "client_id": "...",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
      }
    }
  }
}
```

**使用する予定のプロバイダーのみを構成します。**API キーは次のところから取得します:

- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/
- Groq: https://console.groq.com/
- Runware: https://runware.ai/
- Google Cloud: Google Cloud Console でサービス アカウントを作成してください

### フロントエンド環境設定

これらの設定はフロントエンド アプリケーションに渡され、UI 機能と動作を制御します。

```json
{
  "FrontendOptions": {
    "Extras": "{ disableSurvey: true, disableAnalytics: true, disableFeedback: true, requiresActivation: true, disableAI: false, enableAIChat: true }"
  }
}
```

`Extras` フィールドは、フロントエンド構成フラグを含む JSON 文字列です:

| 設定 | デフォルト (オンプレミス) | 説明 |
|---------|-------------------|-------------|
| `disableAI` | `true` | **AI 機能のマスター スイッチです。** `true` の場合、すべての AI 関連 UI が非表示になり、AI API は呼び出されません。 |
| `enableAIChat` | `false` | **ツールボックスに AI チャット パネルを表示します。** パネルにより、ユーザーはコンポーネントとレイアウトを生成するために AI と対話できます。 |
| `enableSpeechToText` | `false` | **AI チャットで音声入力用のマイク ボタンを表示します。** Google Cloud 音声認識が構成されている必要があります。 |

**仕組み:** これらの値は、バックエンド API 経由で実行時にフロントエンドに挿入されます。フロントエンドは初期化時にこれらのフラグを読み取り、それに応じて機能を有効/無効にします。
AI 機能を機能させるためには、これらのファイル `ai.appsettings.json`、`ai.credentials.appsettings.json`、`ai.providers.appsettings.json`、`ai.models.appsettings.json` に必要な資格情報、モデル、設定を指定する必要があります。

## Docker イメージのインストールとコンテナーの実行

### ボリューム マウント

| コンテナー パス | 目的 | 必須 |
|---------------|---------|----------|
| `/app/appsettings.json` | メイン構成 | はい |
| `/app/configs/ai/` | AI 構成ファイル | AI が有効な場合のみ |
| `/app/storage/` | ファイル ストレージ (アップロード、エクスポート) | はい (永続化のため) |
| `/app/logs/` | ログ ファイル | 推奨 |

### Docker Run コマンド

イメージをロードします。

```bash
docker load -i appbuilder.tar
```

DB 接続用の環境変数のみを指定してコンテナーを実行します。

```bash
docker run --restart always -p 80:5000 \
  -e "ConnectionStrings:AppBuilderSqlServerConnection=Data Source=<server>,<port>;Database=<db-name>;User ID=<user>;Password=<password>;Encrypt=False;TrustServerCertificate=False;MultipleActiveResultSets=True" \
  -v C:/appbuilder/logs:/appbuilder/logs \
  -v C:/appbuilder/storage:/appbuilder/storage \
  --name appbuilder \
  appbuilder:1.0
```

カスタム構成をマウントしてコンテナーを実行します。 `-v C:/appbuilder/config:/appbuilder/config \`

別の docker コンテナーで実行されているデータベースに接続する場合:
appsettings ファイルの接続文字列を次のように設定します: `AppBuilderMySqlConnection": "Server=mysql;Port=3306;Database=AppBuilder;User=user;Password=password;`、
docker ネットワークを作成し、mysql を含めます。
開始コマンドでネットワークを指定します。

```bash
docker run --restart always -p 80:5000 \
  --network appbuilder-network \
  -v C:/appbuilder/config:/appbuilder/config \
  -v C:/appbuilder/logs:/appbuilder/logs \
  -v C:/appbuilder/storage:/appbuilder/storage \
  --name appbuilder \
  appbuilder:1.0
```

ホスト PC で実行されているデータベースに接続する場合、サーバーに `host.docker.internal` を使用します:
appsettings ファイルの接続文字列を次のように設定します: `AppBuilderMySqlConnection": "server=host.docker.internal;Port=3306;Database=AppBuilder;User=user;Password=password;`、

```bash
docker run --restart always -p 80:5000 \
  -v C:/appbuilder/config:/appbuilder/config \
  -v C:/appbuilder/logs:/appbuilder/logs \
  -v C:/appbuilder/storage:/appbuilder/storage \
  --name appbuilder \
  appbuilder:1.0
```

## クイック スタート チェックリスト

### 最小構成

1. appsettings.json の `ConnectionStrings` を更新するか、環境オーバーライド オプション (フラグ) を使用します。

### 認証あり

1. 最小構成を完了します。
2. `SkipAuth` を `false` に設定します。
3. OAuth プロバイダー (Azure AD、Okta、Keycloak など) を構成します。
4. AuthSettings で `Authority`、`ClientId` を設定します。

### AI 機能あり

1. 最小構成を完了します。
2. 選択した AI プロバイダーから API キーを取得します。
3. `ai.appsettings.json` をプロバイダーとモデルで構成します。
4. `ai.credentials.appsettings.json` に API キーを追加します。
5. `appsetting.json` ファイルの `FrontendOptions` で `disableAI: false` および `enableAIChat: true` を設定します。

### GitHub/DevOps 統合あり

1. OAuth App (GitHub) または App Registration (Azure AD) を作成します。
2. プロバイダーでコールバック URL を構成します。
3. 構成に Client ID と Secret を追加します。


## トラブルシューティング

### ログの場所

| ログ ファイル | 内容 |
|----------|----------|
| `./logs/appbuilder.log` | API リクエスト、認証、一般的なエラー関連 |
| `./logs/codegen.log` | API リクエスト、認証、一般的なエラー関連 |
| `./logs/ai.log` | AI プロバイダーのリクエストと応答 |

### 一般的な問題

**データベース接続が失敗しました**

- 接続文字列の形式がプロバイダーと一致することを確認してください。
- データベース サーバーがコンテナーからアクセス可能であることを確認してください。
- Windows/Mac の Docker Desktop の場合、`localhost` の代わりに `host.docker.internal` を使用してください。
- データベース ユーザーがテーブルを作成する権限を持っていることを確認してください。

**ブラウザーで CORS エラー**

- 正確なオリジン (プロトコルとポートを含む) を `CorsPolicy.Origins` に追加してください。
- ブロックされている実際のオリジンをブラウザー コンソールで確認してください。

**AI 機能が機能しない**

- フロントエンド環境で `disableAI: false` を確認してください。
- API キーが有効でクレジットがあることを確認してください。
- `ai.log` で特定のエラー メッセージを確認してください。
- モデル名が利用可能なモデルと完全に一致することを確認してください。

**ファイルのアップロードが失敗する**

- ストレージ ディレクトリが存在し、書き込み可能であることを確認してください。
- 大きな画像をアップロードする場合は `MaxImageSizeMb` を確認してください。
- ボリュームが Docker で正しくマウントされていることを確認してください。

**認証が機能しない**

- `SkipAuth` が `false` であることを確認してください。
- `Authority` URL がアクセス可能であることを確認してください。
- コールバック URL が構成と OAuth プロバイダーの両方で一致することを確認してください。
- OAuth エラーのブラウザー コンソールを確認してください。

### Windows 上の Docker Desktop

Windows 上の Docker Desktop は、Windows マシンにログインしないと自動的に起動しない問題 [Docker Desktop on Windows](https://github.com/docker/for-win/issues/6670) - Docker チームは、プロダクション ワークロードに Docker Desktop を推奨していません。Windows コンテナーが必要な場合は、Linux ボックスでは Docker を使用するか、Windows Server では Docker を使用する必要があります。

## その他のリソース

<div class="divider--half"></div>

- [OpenID Connect を使用したオンプレミス認証](auth-with-openid-connect-o-auth.md)
- [App Builder の配置構成フラグ](configuration-flags.md)
- [外部リソースのホワイトリスト化](external-references-for-whitelisting.md)
- [App Builder インターフェイスの概要](../interface-overview.md)
- [単一ページとナビゲーション](../single-page-apps-and-navigation.md)
- [App Builder コンポーネント](../indigo-design-app-builder-components.md)
- [Flex レイアウト](../flex-layouts/flex-layouts.md)
- [Desktop アプリの実行方法](../running-desktop-app.md)
- [アプリの生成 ](../generate-app/generate-app-overview.md)
- [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)
