---
title: App Builder オンプレミスの前提条件とインストール
_description: App Builder オンプレミス バージョンの使用を開始する方法と、それをインストールして実行するための前提条件について説明します。
_keywords: App builder, オンプレミス, インフラジスティックス
_language: ja
---

# App Builder オンプレミスの前提条件とインストール

## 前提条件

このトピックでは、オンプレミス バージョンの App Builder をインストールするための前提条件を示し、Linux/Mac OS/Windows を維持およびサポートする操作パラメーターを構成するシステム管理者を対象としています。

### Database Management
Based on your requirements you can decide to use either MySQL or MSSQL Server database management systems.

#### MySQL Installation

1 - Install [MySQL community edition](https://dev.mysql.com/doc/refman/8.0/en/installing.html) ([direct link for windows](https://dev.mysql.com/downloads/installer/))

   - Select:
      * Developer default, Next and Execute. 

        > Note: if you get a prompt saying "one or more products requirements have not been satisfied. Do you want to continue?" Just select Yes)
   - After installation ends:
     * Select next to configure the server, when prompted enter the root password you wish, then Execute.  
     * After the server configuration ends, select Cancel to exit the installer since the rest of the configuration is not needed.

2 - Allow container connection to MySQL.

Connect to MySQL with root user and password of step 1 and execute the following sql script (username and pasword will be the ones used from AppBuilder). 
> Note: you can use [MySQL Workbench tool](https://dev.mysql.com/downloads/workbench/) to execute sql scripts.

```
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;
```

#### MSSQL Server Installation

1 - [SQL Server](https://www.microsoft.com/ja-jp/sql-server/sql-server-downloads) ([直接リンク](https://go.microsoft.com/fwlink/?linkid=866658)) をインストールします。

<img class="responsive-img" style="width: 56%; box-shadow: 5px -4px 13px 1px grey" src="./images/on-premise-sql-express.png" />
<p style="margin-top:-20px;width: 56%; text-align:center;">オンプレミス SQL Express のインストール</p>

> 注: オンプレミス サーバーには、VS の組み込み SQL Server Express ではなく、実際の SQL Server が必要です。

2 - tcp/ip を有効にするための詳細な説明は[こちら](https://docs.microsoft.com/ja-jp/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol?view=sql-server-ver15#to-enable-a-server-network-protocol)にあります。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/sql-server-config-manager.png" />
<p style="margin-top:-20px;width:56%; text-align:center;">SQL Server 構成マネージャー</p>

3 - Sql Express の新しい App_Builder ユーザー部分を追加します。[SQL Server Management Studio をインストールして](https://docs.microsoft.com/ja-jp/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)、その目的に使用できます。

<img class="responsive-img" style="width: 57%; box-shadow: 5px -4px 13px 1px grey" src="./images/login-parameters.png" />
<p style="margin-top:-20px;width: 57%; text-align:center;">ログイン パラメーター ダイアログ</p>

> Note: Create database permissions might be denied for the newly added user. You should consider giving them a Server Roles that will give them credentials to create database like `dbcreator`.

> Note: Based on administrator decision a change of [authentication mode with SSMS](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/change-server-authentication-mode?view=sql-server-ver16#change-authentication-mode-with-ssms) might be required. SQL Server Database Engine is set to either Windows Authentication mode or SQL Server and Windows Authentication mode.

### Docker をインストール

Windows ガイド -> [docs.microsoft.com guide](https://docs.microsoft.com/ja-jp/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-and-11#tabpanel_1_Windows-10-and-11)

## インストール
このセクションでは、Docker と MySQL データベースが既にインストールされていることを前提としています。

### 初回インストール

1 - Download the appbuilder.zip part of your Download section under the Infragistics Customer Portal.<br/>
2 - appbuilder.zip ファイルに含まれている appbuilder.tar を抽出します。<br/> 
3 - 抽出した場所でターミナルまたはコマンド プロンプト ウィンドウを開きます。<br/>
4 - 画像を読み込んで確認します。<br/>

以下を実行します:

```
docker load --input appbuilder.tar
```

画像が正しく読み込まれていることを確認するには、次の表の例を参照してください:

```
docker images
```

| リポジトリ    | タグ               | 画像 ID          | 作成日                                   |サイズ   |
| --------:     | ----------------  | ----------------- | ---------------------------------------   |-----  |
| appbuilder    | 1.0               | 2a05977e039b      |12 days ago                                |854MB  |

5 - コンテナーを実行します:

```
docker run --restart always -p 80:5000 -e "ConnectionStrings:AppBuilderMySqlConnection=server=<your-mysql-database-ip>;database=<your-mysql-schema>;user=<your-mysql-database-user>;password=<your-mysql-database-password>;oldguids=false" -v <external-folder-for-logs>:/appbuilder/logs -v <external-folder-for-storage>:/appbuilder/storage --name appbuilder appbuilder:1.0
```

- **MySQL example** - This would be the command assuming your MySql instance is running a schema named IndigoAppBuilderOnPrem on 192.168.2.5 with username=appbuilder and password=appbuilder and that you have selected C:/AppBuilder as the external folder to store the logs and storage. 

```
docker run --restart always -p 80:5000 -e "ConnectionStrings:AppBuilderMySqlConnection=server=192.168.2.5;database=IndigoAppBuilderOnPrem;user=appbuilder;password=appbuilder;oldguids=false" -v C:/AppBuilder/logs:/appbuilder/logs -v C:/AppBuilder/storage:/appbuilder/storage --name appbuilder appbuilder:1.0
```

- **MSSQL Server example** - This would be the command assuming your Sql Server instance is running a schema named IndigoAppBuilderOnPrem with SQLEXPRESS server, with USER ID=APP_BUILDER and password=Appbuilder2023! and that you have selected C:/AppBuilder as the external folder to store the logs and storage.

```
docker run --restart always -p 80:5000 -e "ConnectionStrings:Provider=SqlServer" -e "ConnectionStrings:AppBuilderSqlServerConnection=Data Source=DEV-ZKOLEV\SQLEXPRESS,1433;Database=IndigoAppBuilderOnPrem;User ID=APP_BUILDER;Password=Appbuilder2023!;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False" -v C:/AppBuilder/logs -v C:/AppBuilder/storage --name appbuilder appbuilder:1.0
```

6 - ブラウザーを開き、`http://localhost/` と入力します。

> 注: Docker Desktop を使用している場合は、Containers/Apps に移動し、コンテナーを見つけ、[Open in browser] をクリックします。

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/docker-apps.png" />
<p style="margin-top:-20px;text-align:center;">Docker の Containers/Apps</p>

### 更新

1 - 新しく公開された zip ファイルを使用して、初回インストールの最初の 4 つの手順に従います。

2 - 新しい画像が正しく読み込まれたことを確認します (古い画像は <none> としてタグ付けする必要があります)。

```
docker images
```


| リポジトリ        | タグ       | 画像 ID          | 作成日       |サイズ   |
| --------:         | --------- | ----------------- | ------------- |-----  |
| appbuilder        | 1.0       | 27ff4c1079ac      | 43 hours ago  |932MB  |
| <none>            | <none>    | 2a05977e039b      | 12 days ago   |854MB  |
        
3 - コンテナーを停止します。

```
docker stop appbuilder
```

4 - コンテナーを削除します。

```
docker rm appbuilder
```

5 - 初回インストールの手順 5 で使用したコマンドと同じコマンドでコンテナーを実行します。


## アクティブ化
このセクションでは、オンプレミス インスタンスが既にインストールされており、実行していることを前提としています。

サーバーが最初に起動されると、プロンプト ダイアログにインストール ID が表示され、認証キーが要求されます。このインストール ID をお住まいの地域に基づいて[セールス部門](https://jp.infragistics.com/about-us/contact-us#sales)に送信すると、サーバーをアクティブ化するための認証キーが提供されます。


<img class="responsive-img" style="width:36%;box-shadow: 5px -4px 13px 1px grey" src="./images/activate-app-builder.png" />
<p style="margin-top:-20px;width:36%;text-align:center;">App Builder をアクティブにする</p>

> 注: キーの有効期限が切れる 30 日前に、UI から直接警告メッセージが表示されます。

## トラブルシューティング
### Windows 上の Docker Desktop
[Windows 上の Docker Desktop は、Windows マシンにログインしないと自動的に起動しない問題](https://github.com/docker/for-win/issues/6670) - Docker チームは、プロダクション ワークロードに Docker Desktop を推奨していません。Windows コンテナーが必要な場合は、Linux ボックスでは Docker を使用するか、Windows Server では Docker を使用する必要があります。

## その他のリソース
<div class="divider--half"></div>

* [App Builder インターフェイスの概要 ](interface-overview.md)
* [単一ページアプリとナビゲーション](single-page-apps-and-navigation.md)
* [App Builder コンポーネント](indigo-design-app-builder-components.md)
* [Flex レイアウト](flex-layouts/flex-layouts.md)
* [Desktop アプリの実行方法](running-desktop-app.md)
* [アプリを生成する](generate-app/generate-app-overview.md)
* [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)

