# Master-Detail Template in the Grid

## What Is Master-Detail Template?

Master-detail template allow you to enrich your data grids by expanding rows to display additional information about a record. This feature helps you build interactive views where users can click to reveal related summaries, or any other components tied to that specific row context data.

## What Can You Do with It?

With **App Builder’s Master-Detail template support**, you can:

* Use **expandable rows** that reveal additional row data.
* Leverage Component binding support - Add **cards, text blocks or other components** that can use row-specific data.

## How It Works in App Builder

* App Builder offers a **design-time experience** for inserting components inside the row detail area.
* Components inside this area can be bound to:
  * The current **row’s data context**.
  * Other data sources and Variables context.
* You can easily preview how these template will appear directly inside the App Builder Canvas and App Preview.

## Try It Out

To start using Master-Detail template:

1. Add a **Grid** to your canvas.
2. Under the Grid Properties Panel -> Custom template, click on **Grid-details** switch.
3. Drag and drop components you would want to use, inside the details area.
4. Bind them to fields from the grid row context.
5. Preview your app and export your code to extend the functionality even further.

## Known Limitations
### Contextual binding, Row ID Parameters Not Supported

When using a component within a Master-Detail template, **contextual binding using the current row’s ID as a parameter is not supported**. If the component’s data source requires parameters, these must not be bound to the master-detail (row) context. Instead, use manual values or predefined variables. This restriction helps avoid unsupported code generation scenarios involving per-row parameter binding.

> [!NOTE]
> This limitation applies only to data source parameters and iterated element data bindings. Other parameter picker components—such as those in the Set Data action sections for component interactions—are not affected and remain fully supported.

This restriction helps avoid:
- Ambiguity around dynamic subscriptions.
- Performance bottlenecks due to lack of caching.

### Iterating over data collection from the contextual binding is not implemented in CodeGen

Iterating over data collection from the contextual binding is not implemented in CodeGen. Such scenario fails to codegenerate.

### Overlay Components (e.g., Dialog, Banner)

Overlay elements like **Dialogs** or **Banners**, placed inside master-detail template, currently do not work correctly when code generated .

While these components may appear functional in the App Builder preview, they **do not retain the row data context** in the generated application. For example, a dialog meant to show details like `EmployeeId` will not have access to that value at local runtime.

### Working with Conditional Actions
Binding a parameter or comparison value in a Conditional Action to the Template context is not yet supported. At this time, only component properties and SetVariable support binding to the Template context.

## Resources

* [Fleet Management Sample (GitHub)](https://www.infragistics.com/products/ignite-ui-angular/grid-samples)