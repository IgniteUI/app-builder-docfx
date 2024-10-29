---
title: Grid Remote paging
_description: Remote paging feature allows the grid to load and display data dynamically, fetching only a portion of the data from the server as needed
_keywords: App builder, Remote Paging, Infragistics, Data Sources
---

# Form Builder Overview

App Builder’s Form Builder functionality allows developers to design HTML forms visually with a seamless drag-and-drop experience. With an emphasis on auto-generating form structures from API endpoints, Form Builder not only simplifies UI creation but also connects these forms directly to backend data sources. This feature offers flexibility in form layout, component customization, and notification capabilities for form submissions, errors, and server-side validations.

## Key features of Form Builder

1. **Automatic Form Generation from Data Sources**  
When a developer drags an endpoint or data model onto the design surface, Form Builder auto-generates form components based on the endpoint’s properties:
    - `POST` and `PUT` methods create input fields for data submission.

2. **Dynamic Component Selection and Metadata-Based Mapping**  
Form components are chosen based on the data type and metadata of each field, ensuring intuitive inputs and labels (e.g., date fields use date pickers, boolean fields use switches). Developers retain control, with the ability to modify components as needed, add validations, or adjust labels directly in the properties panel.

3. **Form Customization Options**  
App Builder enables developers to tailor the form layout and behavior after it’s generated, allowing:
   - Adding or removing elements within the form.
   - Adjusting control properties like validation, label customization, and mapping.
   - Setting up additional interactions like `OnSuccess` and `OnError` events.

4. **Runtime and Preview Support for Forms**  
Preview and runtime environments let end-users interact with the forms as they would in a production setting, including:
   - Real-time input validation feedback.
   - Visual notifications upon successful form submission or error handling, currently via a Snackbar component.

## End-User Experience with Forms

- **Form Creation and Modification**  
   Users can drop an entity or endpoint onto the design surface, triggering automatic form generation. Once generated, the form can be edited to include/exclude fields, customize labels, and set input validation, providing an intuitive design experience.

- **Live Interaction with Forms**  
   In App Builder’s preview mode, end-users can interact with forms, enabling:
   - Input data validation (real-time).
   - Form submission with feedback on successful submissions or validation errors.

- **Control Flexibility for Varied Use Cases**  
   With features like dynamic action button placement and event handling for `Submit` and `Reset`, App Builder supports diverse use cases—from simple data entry forms to more complex CRUD operations integrated within an application.

- **Configurable Action Buttons**  
   Form action buttons (`Submit`, `Reset`) offer type and appearance customization, supporting both in-form and external placements. This flexibility is critical for developers who need finer control over form behavior in complex layouts.

- **Snackbar Notifications**  
   Success and error messages are displayed via Snackbars, providing non-intrusive feedback on form submission. These notifications are hardcoded for the initial release but will support more flexible interaction handling in future iterations.

- **Property Panel Customization**  
   Every form component and control can be fine-tuned in the properties panel. For instance:
   - **Validation**: Customize required fields or toggle controls as disabled.
   - **Labels and Placeholders**: Update display text based on user needs or project standards.

## Code generation beyond Auto-Generated Forms

After generation, forms remain fully customizable. Developers can:
- Add/remove form elements and rearrange layouts.
- Integrate forms with additional data sources for multi-step form workflows.
- Manually add server-side validation checks and handle custom form submission interactions.

## Form Controls Support

The Form Builder supports a range of UI controls mapped to specific data types, ensuring developers can create accessible and responsive forms with minimal effort. Below is a summary of supported controls and current limitations.

| Form Control  | Default Type  | Status      | Notes                                    |
|---------------|---------------|-------------|------------------------------------------|
| Radio Group   | Boolean       | Implemented | Lacks required field validation          |
| Checkbox      | Boolean       | Implemented | Lacks required field validation          |
| Switch        | Boolean       | Implemented | -                                        |
| Slider        | Number        | Implemented | -                                        |
| Select        | Enum          | Implemented | -                                        |
| Combo Box     | Enum          | Implemented | -                                        |
| Date Picker   | Date          | Implemented | -                                        |
| Calendar      | Date          | Implemented | May not refresh selected date accurately |
| Input Field   | String, Number| Implemented | -                                        |

> **Note**: Form controls currently support basic validation properties (`Required`, `Disabled`). Future enhancements will add:
> - **Range validation** (`min`, `max`).
> - **String length validation** (`min length`, `max length`).
> - **Pattern validation** (regex).
> - **Enum validations** for select and combo box controls.

All Form controls support “two-way” binding and corresponding form context.

## Future Enhancements

The roadmap for App Builder’s Form Builder includes improvements to validation options, extended metadata support, and expanded notification and interaction handling. Additionally, enhanced runtime previews, custom validators, and support for more advanced field types will offer developers even greater flexibility.

## Known limitations

**The following known issues and limitations apply to the initial release of the Form Builder, launched on October 28.*

- **Form Copy-Pasting**: Copying and pasting a form currently leads to issues where the original form loses its data bindings, which transfer to the newly pasted form instance instead.
- **Boolean Required Flag Confusion**: There is ambiguity around the implementation of a required Boolean field, especially for scenarios like “accept terms of service.”
- **Submit/Reset Form Behavior**: The Submit/Reset functionality has been adapted to work correctly due to a mixture of template and reactive forms, but may still encounter inconsistencies.
- **Code Generation**:
    - **Typing Issues with Form Models**: Form models may encounter typing inconsistencies, particularly when working with nested structures or arrays. This complicates the generation of accurate form models in the output code.
    - **igx-hint Element in Preview**: The `igx-hint` element is currently excluded from preview as it is not generated in the final code. Future updates may include functionality to support message display.

## Additional Resources

<div class="divider--half"></div>

* [App Builder Components](../indigo-design-app-builder-components.md)
* [App Builder Interface Overview](../interface-overview.md)
* [Single Page And Navigation](../single-page-apps-and-navigation.md)
* [App Builder Components](../indigo-design-app-builder-components.md)
* [Flex Layouts](../flex-layouts/flex-layouts.md)
* [Running Desktop App](../running-desktop-app.md)
