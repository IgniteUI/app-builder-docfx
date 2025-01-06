# OpenID Connect (OAuth 2.0) を使用したオンプレミス認証

このドキュメントは、PKCE (Proof Key for Code Exchange) を使用した OAuth 2.0 CODE 認証フローをサポートする OpenID Connect サーバーを使用して、App Builder オンプレミス インスタンスのカスタム認証プロバイダーを構成する方法を説明します。

ガイドの内容:

- 必要な OIDC クライアント設定。
- App Builder 固有の構成設定。
- oidc_scope や oidc_redirect_uri などの追加オプション。

## OIDC クライアントの設定

- OAuth2 フロー: 認証コード + PKCE
- トークンの更新を有効にする (`offline_access` スコープ)
- アクセス トークンの有効期限: (推奨 600 秒)
- 更新トークンの有効期限: スライディング ウィンドウが推奨され、最小 1 時間 (24 時間を推奨)、最大有効期間は組織によって決定され、無制限になります。
- ID トークンにユーザークレームを含めます (必須の標準クレーム: "sub" と "email"、オプションのカスタム クレーム: "given_name" と "family_name")。
- 必要なスコープ: openid email profile offline_access appbuilder.user
- Audience: "appbuilder" (デフォルト)
- サインイン リダイレクト URI: <app builder host>/oidc/ig/callback
- ログアウト後の URL: <app builder host>/oidc/ig/callback-postlogout

## App Builder の設定

### 必要な構成設定
- AuthSettings__SkipAuth: false
- AuthSettings__Authority: _OpenId server URL_
- AuthSettings__ClientId: _OpenId Client Id_
- AuthSettings__AccountIssuer: _Server Unique Alias_

### その他のオプション
- oidc_scope: 'openid email offline_access profile appbuilder.user' (デフォルト)
- oidc_redirect_uri: '/oidc/ig/callback' (デフォルト)
- oidc_post_logout_redirect_uri: /oidc/ig/callback-postlogout' (デフォルト)
- AuthSettings:Audience: "appbuilder" (デフォルト)

> [!NOTE]
> OIDC 認証を使用するには、FrontendOptions_SkipAuth 設定を false に設定する必要があります。

OIDC クライアントを設定したら、次の 3 つの必須プロパティを環境変数として App Builder Docker コンテナーに渡す必要があります。

例:
```sh
docker run --restart always -p 80:5000 -e ConnectionStrings__Provider=SqlServer -e "ConnectionStrings:...." -e AuthSettings__SkipAuth=false -e AuthSettings__Authority="https://my-auth-server.example.com" -e AuthSettings__ClientId="1234-4657-00" -e AuthSettings__AccountIssuer="MyAuth" -v "C:\ProgramData\Infragistics\Appbuilder\logs:/appbuilder/logs" -v "C:\ProgramData\Infragistics\Appbuilder\storage:/appbuilder/storage" --name appbuilder appbuilder:1.0
```

## その他のリソース
<div class="divider--half"></div>

* [オンプレミスの前提条件とインストールの概要](../on-prem-prerequisites-and-installation.md)
* [App Builder の配置構成フラグ](configuration-flags.md)
* [外部リソースのホワイトリスト化](external-references-for-whitelisting.md)
* [Desktop アプリの実行方法](../running-desktop-app.md)
* [アプリを生成する](../generate-app/generate-app-overview.md)
* [Indigo.Design はじめに](https://jp.infragistics.com/products/indigo-design/help/getting-started)