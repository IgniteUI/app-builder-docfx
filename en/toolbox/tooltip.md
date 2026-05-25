---
title: Tooltip Component
_description: App Builder's Tooltip component enables developers to display contextual information on hover or focus using the visual designer — no code required.
_keywords: App Builder, Tooltip, Infragistics
---

# Tooltip Overview

The **Tooltip** component in App Builder lets you surface contextual help or supplemental information when users hover over or focus on a target element in your application. Tooltips are configured visually through the **Properties** panel, and their trigger and content can all be customized without writing code.

Tooltips use the underlying [Ignite UI Tooltip](https://www.infragistics.com/products/ignite-ui-angular/angular/components/tooltip) component and generate clean, framework-specific code for Angular, React, Blazor, and Web Components.

## Key Features

### Adding a Tooltip to a Component

Tooltips are enabled directly from the target component's **Properties** panel. To attach a tooltip:

1. Select the target component on the **Design Canvas**.
2. In the **Properties** panel, scroll to the **Tooltip** section.
3. Toggle **Enable Tooltip** on.
4. Click the **Edit Tooltip** link that appears to open the tooltip and configure its properties (Target, Mode, Show delay, Hide delay, Arrow).


### Tooltip Content

You can bind the tooltip content to a **variable** or a **data field** from a connected data source, enabling dynamic, context-aware hints at runtime.


### Show / Hide Delay

Control the responsiveness of tooltips by setting:

- **Show delay** — the time (ms) before the tooltip appears after the user hovers over the target. Defaults to **300 ms**.
- **Hide delay** — the time (ms) before the tooltip disappears after the cursor leaves. Defaults to **0 ms**.

These delays improve usability and prevent tooltip flicker for users who quickly move the cursor across multiple elements.

### Mode

The **Mode** property controls how the tooltip is dismissed:

- **Default** — the tooltip appears on hover/focus and dismisses automatically when the cursor or focus leaves the target.
- **Sticky** — the tooltip remains visible until the user explicitly closes it.

### Arrow

Toggle the directional **Arrow** indicator on or off. When enabled, a small arrow points from the tooltip toward its target element, making the association between the tooltip and its target visually clear.

### Tooltip Trigger

By default, tooltips are triggered on **hover** (mouse) and **focus** (keyboard). This dual behavior ensures accessibility compliance with WCAG guidelines.

## Supported Properties

| Property     | Description                                                         |
|--------------|---------------------------------------------------------------------|
| Target       | The component the tooltip is attached to                            |
| Mode         | How the tooltip is dismissed: **default** (auto) or **sticky** (manual) |
| Show delay   | Delay (ms) before the tooltip is shown. Defaults to 300             |
| Hide delay   | Delay (ms) before the tooltip is hidden. Defaults to 0              |
| Arrow        | Toggles the directional arrow indicator on or off                   |

## Accessibility

The Tooltip component is built with accessibility in mind:

- The target element receives `aria-describedby` linking it to the tooltip content.
- Tooltips are keyboard-accessible via focus events.
- Screen reader support is provided through proper ARIA roles.

## Code Generation

App Builder generates framework-specific tooltip code based on your visual configuration:

- **Angular**: Uses `igxTooltip` and `igxTooltipTarget` directives from Ignite UI for Angular.
- **React**: Uses the `IgrTooltip` component from Ignite UI for React.
- **Blazor**: Uses `IgbTooltip` from Ignite UI for Blazor.
- **Web Components**: Uses `igc-tooltip` from Ignite UI for Web Components.

> [!NOTE]
> Tooltip content bound to variables or data fields is reflected in the generated code as dynamic bindings specific to each framework.

## Known Issues and Limitations

- **Nested tooltips** are not allowed.
- **Repeated tooltips** in generated code:
  - Angular :heavy_check_mark:
  - React, Blazor, Web Components :construction: — the tooltip does not get correctly attached to the repeated target.
- **Tooltip in a repeated Select item**: Tooltips attached to repeated Select items don't work in Angular unless the `ngProjectAs` attribute is added to the `ng-container` wrapping the select item. For example:

```html
<igx-select type="border" class="user-input">
  @for (item of northwindCategories; track item) {
    <ng-container ngProjectAs="igx-select-item">
      <igx-select-item value="Option" #selectItem [igxTooltipTarget]="tooltip4" [showDelay]="300" [hideDelay]="0">
        {{ item.name }}
      </igx-select-item>
      <div #tooltip4="tooltip" igxTooltip>
        <div class="column-layout group_1">
          <p class="ig-typography__body-2 text">
            {{ item.description }}
          </p>
        </div>
      </div>
    </ng-container>
  }
  <label igxLabel>Label/Placeholder</label>
</igx-select>
```

## Additional Resources

<div class="divider--half"></div>

- [App Builder Components](../indigo-design-app-builder-components.md)
- [App Builder Interface Overview](../interface-overview.md)
