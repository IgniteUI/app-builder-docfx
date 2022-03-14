---
title: OpenAPI (Swagger) Support
_description: App Builder enables users to add Swagger definition with endpoints, authentication and parameters
_keywords: App builder, Infragistics, Data Sources, Data Binding
---

# OpenAPI (Swagger) Support

The power of Swagger tools starts with the OpenAPI Specification — the industry standard for RESTful API design

## Swagger Overview

**Swagger** offers the most powerful and easiest to use tools to take full advantage of the OpenAPI Specification. These tools can help you design, build, document and consume REST APIs.

## OpenAPI Overview

**OpenAPI Specification** (formerly Swagger Specification) is an API description format for REST APIs. An OpenAPI file allows you to describe your entire API, including:

- Available endpoints (/users) and operations on each endpoint (GET /users, POST /users)

<img class="responsive-img" style="width: 70%; box-shadow: 5px -4px 13px 1px grey" src="./images/configure-endpoints.png" />
<p style="width: 70%; text-align:center;">Configure Endpoints</p>

- Operation parameters Input and output for each operation

<img class="responsive-img" style="width: 70%; box-shadow: 5px -4px 13px 1px grey" src="./images/endpoint-params.png" />
<p style="width: 70%; text-align:center;">Set Endpoints Parameters/Apps</p>

- Authentication methods
- Contact information, license, terms of use and other information

API specifications can be written in YAML or JSON. The format is easy to learn and readable to both humans and machines. The complete OpenAPI Specification can be found on GitHub: [OpenAPI 3.0 Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md). More about OpenAPI [here](https://swagger.io/docs/specification/about/).

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/swagger-demo-original.gif" />
<p style="text-align:center;">Swagger demo</p>

## Specify Swagger definition

At this point you can either specify a _Swagger file URL_ (json/yaml) or _Upload a definition_. Once loaded a _Configure endpoints_ will appear.

The left-side of the _Configure endpoints_ dialog consists of:
- Base URL - can be automatically populated if value for it is present in the file definition
- Authorization - provide auth key if needed
- Endpoints tree view - All available endpoints will be loaded here along with its type (GET, PUT, POST and etc.)

The right-side of the _Configure endpoints_ dialog consists of:
- Request url with _Send_ button that can be used to test the connection before selecting it
- Tab elements for authorization, parameters and headers - if one is required, it will be marked as such.
- Tab content section showing _info_ messages or required fields. Example image:

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/endpoints-dialog.png" />
<p style="text-align:center;">Configure Endpoints Dialog</p>

## Additional Resources
<div class="divider--half"></div>

* [App Builder Components](indigo-design-app-builder-components.md)## Additional Resources
* [App Builder Interface Overview](interface-overview.md)
* [Single Page And Navigation](single-page-apps-and-navigation.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Generate app](generate-app/generate-app-overview.md)