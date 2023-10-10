---
title: State and context binding
_description: App Builder enables users to use local and global variables that help with storing different data to manage your app state
_keywords: App builder, Infragistics, Data Sources, Data Binding
---

# State and context binding

# Limitations
- Non-swagger URL/Query Params support - For the time being you won't be able to load data from query/path params:
```
GET	/posts/1/comments
GET	/comments?postId=1
```
- No usage of variables in Grid templating for Blazor and WC
- Binding a component to repeated data of one object is not supported upon code generation.
- Combo value key limitation 
