---
title: Getting started with App Builder 
_description: Learn how to build awesome apps using App Builder. You can use predefined or edit one of our prebuilt layouts. Try App Builder today.
_keywords: App builder, Indigo Design, Infragistics
---

# Getting started with App Builder

### In this article:
* <a href="#launch-app-builder">Launch App Builder</a>
* <a href="#getting-the-code">Getting the code</a>
* <a href="#running-the-generated-app-locally">Running the app locally</a>

<section class="video-container">
    <div>
        <div class="video-container__item">
            <iframe src="https://www.youtube.com/embed/DK50La2GFJ0" frameborder="0" allowfullscreen></iframe>
        </div>
        <p>Get Started with App Builder</p>
    </div>
</section>


## Launch App Builder
You can login directly in your App Builder profile or by signing it with Indigo.Design. You will land in the home screen and from here you can access each of the three core Indigo.Design products - Prototypes and Usability Tests, as well as the newest one - App Builder which can be found under the Apps tab. 

From the App Builder home screen, users can start a new app, preview or edit an existing one. Through the context menu, every existing app can also be renamed, duplicated or archived.  

AB Sign-in
<img src="./images/Standalone-AB.PNG" srcset="./images/Standalone-AB-@2x.png 2x" />

Indigo.Cloud Sign-in
![Indigo-Design-home-screen](./images/Indigo-Design-home-screen.gif)
<p style="text-align:center;">Indigo.Design home screen</p>

What you'll see when you launch the [App Builder]({environment:infragisticsBaseUrl}/products/indigo-design/app-builder) for first time is a pop up window suggesting a quick onboarding tour. What you will see next is the create new project dialog. There are four ways to start a new app:
1. <b>Create from existing design</b> - if you have an existing Sketch file, created using the Indigo.Design UI kit for Sketch, you can upload it at this point and continue your design in the App Builder, without the need to recreate everything from scratch. Note, that due to the differences between the absolute layout in Sketch and the Flex layout in the App Builder, some additional adjustments may be needed after parsing your Sketch file.
2. <b>Sample apps</b> - the getting started apps will help you explore applications that have been created using the App Builder and also allow you to modify them in your own user space. They are also a good source for you to preview generated code for a larger application without having to create your own app from scratch. If you use the App Builder for first time, we recommend to use the sample app option as a starting point. This is the quickest way to onboard yourself with the awesome features of the tool and to start building your application.
3. <b>Default layouts</b> - start a new app from scratch, benefiting from a basic predefined layout.
4. <b>Blank</b> - start a new app from scratch.

<img src="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder.png" srcset="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder-@2x.png 2x" />
<p style="text-align:center;">New project dialog</p>

Note, that once in the App Builder, users are enabled to easily switch between their active applications or go back to their workspace in App Builder from the in-app side menu at design time without leaving the App Builder.

<img src="./images/Indigo-Design-side-menu.png" srcset="./images/Indigo-Design-side-menu-@2x.png 2x" />
<p style="text-align:center;">Side menu</p>


## Getting the code
The App Builder always displays a live-running web application both on the design surface and in the preview window. The underlying code and application model are updated in real time as you make changes to the application in the design surface. You can view the generated application code at any time in the preview window and you can also download the generated application at any time as a complete application code repository, which you can then open in a code editor of your choice. Then you can build and run the application you've designed using the App Builder locally on your machine and you can make additional modifications on the generated code.
 
<img src="./images/Preview-App-Indigo-Design-App-Builder.png" srcset="./images/Preview-App-Indigo-Design-App-Builder@2x.png 2x" />
<p style="text-align:center;">Application preview window</p>


<img src="./images/App-VSCode-Indigo-Design-App-Builder.png" srcset="./images/App-VSCode-Indigo-Design-App-Builder@2x.png 2x" />
<p style="text-align:center;">Code of a generated application and then run in VScode</p>


> [!NOTE]
> Once the code for your application is downloaded, changes made locally will not be reflected in your App Builder user space.

## On-Premises version of App Builder
App Builder is a SaaS which provides Developers, Designers and Product Managers with a consolidated platform for software product discovery, software product design, building interactive product PoCs and emitting pixel-perfect code projects ready for subsequent modifications.

Some businesses are part of highly regulated industries. Mostly for security reasons, a lot of them have limited to no access to cloud-based solutions like the App Builder, or limited internet connectivity in certain locations. In order to cover this segment, we had to provide an easy way for such organizations to bring the App Builder behind the firewall, by allowing them to use their own instance of the platform to run on their own infrastructure and to be accessible only by internal personnel.

On-premises applications are reliable, secure, and allow enterprises to maintain a level of control that the cloud often cannot.

Check out this topic for [more technical details on how to install](on-prem-prerequisites-and-installation.md) the On-premises solution.

![on-premises-ab-demo](./images/on-premises-ab-demo.gif)
<p style="text-align:center;">On-Premises version</p>

## Running the generated app locally

In order to run the downloaded application, the following prerequisites need to be installed on your machine. Check out [this topic](generate-app/run-application-locally.md) for more information on how to run the generated application locally.

1. NodeJS.
2. Visual Studio Code (we recommend VS Code, but you can use a different code editor).

<div>
    <div style="display:inline-block;width:45%;text-align:center;">
      <img src="./images/general/nodejs.svg"
           style="display:flex;max-height:100px;margin:auto auto 20px auto;" />
      <a target="_blank" href="https://nodejs.org/en/download/" class="no-external-icon"
         style="color:white;background-color:#09f;text-decoration:none;font-weight:700;font-size:16px;padding: 5px 15px 5px 15px;">
        DOWNLOAD NODE
      </a>
    </div>
    <div style="display:inline-block;width:45%;text-align:center;">
      <img src="./images/general/vs-code.svg"
           style="display:flex;max-height:100px;margin:auto auto 20px auto;" />
      <a target="_blank" href="https://code.visualstudio.com/download" class="no-external-icon"
         style="color:white;background-color:#09f;text-decoration:none;font-weight:700;font-size:16px;padding: 5px 15px 5px 15px;">
        DOWNLOAD VS CODE
      </a>
    </div>
</div>
<div class="divider--half"></div>

## Tutorial video
Learn more about our low-code App Builder in our short overview video:

> [!Video https://www.youtube.com/embed/WSQ38lLacH4]

## Report an issue or send feedback

[This repository](https://github.com/IgniteUI/app-builder) is intended for issues and feature requests submission, as well as for general product discussions, questions and any feedback that you want to share. You can also <a href="mailto:feedback@indigo.design">send us an email</a>.
## Additional Resources
<div class="divider--half"></div>

* [App Builder Interface Overview](interface-overview.md)
* [Single Page And Navigation](single-page-apps-and-navigation.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Generate app](generate-app/generate-app-overview.md)
* [Indigo.Design Getting Started](https://www.infragistics.com/products/indigo-design/help/getting-started)