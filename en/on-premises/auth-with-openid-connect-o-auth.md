# On-Prem Authentication with OpenID Connect (OAuth 2.0)

This document aims to provide configuration instructions on how to configure custom authentication providers for the App Builder on-premise instance by using OpenID Connect server supporting OAuth 2.0 CODE authorization flow with PKCE.

The guide includes:

- Required OIDC client settings.
- Configuration settings specific to App Builder.
- Additional options such as oidc_scope and oidc_redirect_uri.

## Settings for the OIDC Client

- OAuth2 Flow: Authorization Code + PKCE
- Refresh tokens enabled (`offline_access` scope),
- Access token lifetime: (suggested 600 seconds)
- Refresh token lifetime: sliding window recommended with a minimum of 1 hour (24hs recommended) and max life determined by the organization or unlimited).
- Include User claims in Id Token (there are two required standard claims: "sub" & "email" and two optional custom claims "given_name" & "family_name")
- Required scopes: openid email profile offline_access appbuilder.user
- Audience: "appbuilder" (default)
- Sign in redirect uri: <app builder host>/oidc/ig/callback
- Post logout url: <app builder host>/oidc/ig/callback-postlogout

## Settings for App Builder

### Required configuration settings
- AuthSettings__SkipAuth: false
- AuthSettings__Authority: _OpenId server URL_
- AuthSettings__ClientId: _OpenId Client Id_
- AuthSettings__AccountIssuer: _Server Unique Alias_

### Other options
- oidc_scope: 'openid email offline_access profile appbuilder.user' (default)
- oidc_redirect_uri: '/oidc/ig/callback', (default)
- oidc_post_logout_redirect_uri: /oidc/ig/callback-postlogout' (default)
- AuthSettings:Audience: "appbuilder" (default)

> [!NOTE]
> To use the OIDC auth you need to set the FrontendOptions_SkipAuth setting to false.

After setting up your OIDC client you’ll need to pass 3 required properties to App Builder docker container as environment variables:

e.g.
```sh
docker run --restart always -p 80:5000 -e ConnectionStrings__Provider=SqlServer -e "ConnectionStrings:...." -e AuthSettings__SkipAuth=false -e AuthSettings__Authority="https://my-auth-server.example.com" -e AuthSettings__ClientId="1234-4657-00" -e AuthSettings__AccountIssuer="MyAuth" -v "C:\ProgramData\Infragistics\Appbuilder\logs:/appbuilder/logs" -v "C:\ProgramData\Infragistics\Appbuilder\storage:/appbuilder/storage" --name appbuilder appbuilder:1.0
```

## Additional Resources
<div class="divider--half"></div>

* [On-prem Prerequisites and Installation Overview](../on-prem-prerequisites-and-installation.md)
* [App Builder Deployment Configuration Flags](configuration-flags.md)
* [External Resources Whitelisting](external-references-for-whitelisting.md)
* [Running Desktop App](../running-desktop-app.md)
* [Generate app](../generate-app/generate-app-overview.md)
* [Indigo.Design Getting Started](https://www.infragistics.com/products/indigo-design/help/getting-started)