---
title: State and context binding
_description: App Builder enables users to use local and global variables that help with storing different data to manage your app state
_keywords: App builder, Infragistics, Data Sources, Data Binding
---

# State and context binding

# Limitations
- Non-swagger URL/Query Params support - For the time being you won't be able to load data from query/path params
```
GET	/posts/1/comments
GET	/comments?postId=1
```
- No usage of variables in Grid templating for Blazor and WC
- Binding a component to repeated data of one object is not supported upon code generation.
- Combo component specifics:
   - If `valueKey` property is set, it will result limitation 
   - Leaving a required parameter empty is allowed by the AppBuilder - CodeGen will handle this by setting a default value, however this should not be allowed in the AppBuilder. I guess the same should be valid also in the UI when adding a data source and defining parameters through swagger.
   