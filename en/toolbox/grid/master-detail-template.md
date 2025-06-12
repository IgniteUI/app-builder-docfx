# Master-Detail Template in the Grid

## What Is Master-Detail Template?

Master-detail template allow you to enrich your data grids by expanding rows to display additional information about a record. This feature helps you build interactive views where users can click to reveal related summaries, or any other components tied to that specific row data.

For example, you can show an **employee's performance info**, a **vehicle's trip history**, or a **customer’s recent orders** directly within the row, making your applications more informative and engaging.

## What Can You Do with It?

With **App Builder’s Master-Detail template support**, you can:

* Create **expandable rows** that reveal additional data on demand.
* Add **cards, and text blocks** that use row-specific data.
* Reproduce rich UX patterns like those in our [Fleet Management example](https://www.infragistics.com/products/ignite-ui-angular/grid-samples).

## How It Works in App Builder

* App Builder offers a **design-time experience** for inserting components inside the row detail area.
* Components inside this area can be bound to:
  * The current **row’s data context**.
* You can easily preview how these template will appear directly inside the App Builder Canvas and App Preview.

## Try It Out

To start using Master-Detail template:

1. Add a **Grid** to your canvas.
2. Under the Grid Properties Panel -> Custom template, click on **Grid-details** switch.
3. Drag and drop components you would want to use, inside the details area.
4. Bind them to fields from the grid row context.
5. Preview your app and export your code to extend the functionality even further.

## Known Limitations

### Overlay Components (e.g., Dialog, Banner)

Overlay elements like **Dialogs** or **Banners**, placed inside master-detail template, currently do not work correctly when code generated .

While these components may appear functional in the App Builder preview, they **do not retain the row data context** in the generated application. For example, a dialog meant to show details like `EmployeeId` will not have access to that value at local runtime.

## Resources

* [Fleet Management Sample (GitHub)](https://www.infragistics.com/products/ignite-ui-angular/grid-samples)