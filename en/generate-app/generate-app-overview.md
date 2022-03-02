---
title: App Builder - Preview Code and Generate App
_description: App Builder is a design to code solution, enabling design and development teams to quickly and easily design and build real web applications.
_keywords: App Builder, Web App Builder, Design Systems, Design Systems UX, UI kit, Sketch, Ignite UI for Angular, Sketch to Angular, Angular, Angular Design System, Export code from Sketch, Design Kits for Angular, Sketch UI kits
---
# Generate App

> [!NOTE]
><b>The applications, designed in Indigo.Design App Builder can be downloaded or directly uploaded to a GitHub repository. 

<section class="video-container">
    <div>
        <div class="video-container__item">
            <iframe width="800" height="450" src="https://www.youtube.com/embed/zxT-nIXKn7I" frameborder="0" allowfullscreen></iframe>
        </div>
        <p>Preview and Generate App Code</p>
    </div>
</section>

App Builder with Angular code generation has been in the market for a few months now, but with .NET 6 release we launched the beta version of Blazor Code Generation.

Now there is the Platform picker dropdown, located in the navigation bar just next to the `Publish to Github` and `Preview` action buttons. Choose the `Blazor BETA` option to generate code for Blazor, or `Angular` to see a preview of the generated app and code.

<img class="responsive-img" src="../images/generate-code.png" />
<p style="text-align:center;">Pick platform for code generation</p>

The design and development user story will be completed once the application is generated with all styling and layout properties. Currently, Indigo.Design App Builder offers options to upload all your application files to a GitHub repository or download them as a package and then run it locally.

## Supported Components

Right now AppBuilder generates application for Angular and Blazor. Below is a list of each supported components in each platform:
| Component              | Angular            | Blazor             |
|------------------------|--------------------|--------------------|
| **Layouts**                                                      |
| Absolute Layout        | :heavy_check_mark: | :heavy_check_mark: |
| Card                   | :heavy_check_mark: | :question:         |
| Column Layout          | :heavy_check_mark: | :heavy_check_mark: |
| Expansion Panel        | :heavy_check_mark: | :x:                |
| Row Layout             | :heavy_check_mark: | :heavy_check_mark: |
| Tab Layout             | :heavy_check_mark: | :x:                |
| **Menu and Navigation**                                          |
| Navigation Bar         | :heavy_check_mark: | :question:         |
| Navigation Drawer      | :heavy_check_mark: | :question:         |
| Views Container        | :heavy_check_mark: | :heavy_check_mark: |
| **Content**                                                      |
| Avatar                 | :heavy_check_mark: | :question:         |
| Calendar               | :heavy_check_mark: | :x:                |
| Chip                   | :heavy_check_mark: | :x:                |
| Icon                   | :heavy_check_mark: | :question:         |
| Image                  | :heavy_check_mark: | :question:         |
| Link                   | :heavy_check_mark: | :question:         |
| Text                   | :heavy_check_mark: | :question:         |
| Title                  | :heavy_check_mark: | :question:         |
| **Input & Forms**                                                |
| Button                 | :heavy_check_mark: | :question:         |
| Button Group           | :heavy_check_mark: | :x:                |
| Checkbox               | :heavy_check_mark: | :question:         |
| Combo                  | :heavy_check_mark: | :x:                |
| Date Picker            | :heavy_check_mark: | :question:         |
| Drop Down              | :heavy_check_mark: | :x:                |
| Floating Action Button | :heavy_check_mark: | :question:         |
| Icon Button            | :heavy_check_mark: | :question:         |
| Input Group            | :heavy_check_mark: | :question:         |
| Radio Group            | :heavy_check_mark: | :question:         |
| Select                 | :heavy_check_mark: | :x:                |
| Slider                 | :heavy_check_mark: | :x:                |
| Switch                 | :heavy_check_mark: | :question:         |
| Text Area              | :heavy_check_mark: | :x:                |
| **Grids & Lists**                                                |
| Grid                   | :heavy_check_mark: | :question:         |
| List                   | :heavy_check_mark: | :question:         |
| **Notifications**                                                |
| Badge                  | :heavy_check_mark: | :question:         |
| Banner                 | :heavy_check_mark: | :x:                |
| Dialog Window          | :heavy_check_mark: | :x:                |
| Snackbar               | :heavy_check_mark: | :x:                |

> Note: See [Blazor Support](../blazor-support.md#known-issues-and-limitations) for more details on the known issues and limitations for the Blazor components.

## Additional Resources

<div class="divider--half"></div>

* [Blazor Support](../blazor-support.md)
* [Upload Application to GitHub](upload-application-to-github.md)
* [Run Application Locally](run-application-locally.md)
* [Preview Application Code](../preview-code.md)
