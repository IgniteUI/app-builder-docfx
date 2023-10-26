---
title: State and context binding
_description: App Builder enables users to use local and global variables that help with storing different data to manage your app state
_keywords: App builder, Infragistics, Data Sources, Data Binding
---

# State and context binding

# Limitations
- Non-swagger URL/Query Params support - For the time being you won't be able to load data from query/path params
```
GET   /posts/1/comments
GET   /comments?postId=1
```
- Using variables in Grid templating for Blazor and WC is currently not supported.
- Binding a component to repeated data of one object is not supported upon code generation.
- Combo component specifics:
   - Combo with multi-selection mode and specified `valueKey` property will require a Variable to handle an array of primitives, although this is currently not supported in App Builder nor the code generation. Upon Combo multi-selection the `SelectionChanged` event will receive an array of the `valueKey` type.
- Binding a component to an Array of primitives is currently not supported.
- Leaving a required parameter empty is allowed by the AppBuilder - Code generation will be possible by setting a default value. This will result in an Error state and you will be notified with a warning, although this won't stop you from generating the code for the app and may result in compilation errors.
