---
title: SPA and Navigation in App Builder 
_description: Unlike a page-based design approach, App Builder lets you create separate views that are injected or switched based on how users navigate.
_keywords: App builder, Indigo Design, Infragistics
---

# Single page apps and navigation  

<section class="video-container">
    <div>
        <div class="video-container__item">
            <iframe src="https://www.youtube.com/embed/hssubbXsOTM?si=yKKhVTo-1_fXyJ6A&list=UULF8cj8_eJROxAXsOjhbvduLw" frameborder="0" allowfullscreen></iframe>
        </div>
        <p>Set Up Single-Page Apps and Navigation</p>
    </div>
</section>

Another App Builder feature is the single-page apps and navigation. Unlike a page-based design approach, App Builder lets you create separate views that are injected or switched based on how users navigate. To see this action, you can create a new app using the create new application button, then select one of the default layouts that shows a top navigation defined. 

<img src="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder.png" srcset="./images/getting-Started-new-project-dialog-Indigo-Design-App-Builder-@2x.png 2x" />
<p style="text-align:center;">Add layout preset from the Menu button, then select Create New App</p>

## Parent view vs. Child views 

What you see here is the master view. And when you look at the views list in the toolbox, you can see that there are two child views nested under it. Each child view corresponds to the navigation buttons in the primary toolbar area. When you preview the app, you will see that clicking on view 1 shows you content available inside view 1, and similarly for view 2. 

![top-navigation-interactions-preview-Indigo-Design-App-Builder](./images/top-navigation-interactions-preview-Indigo-Design-App-Builder.gif)
<p style="text-align:center;">Switch between views - layout preset</p>

Regarding the master view and child view concept, it should be noted that the master view represents the shell of your app, and can container UI elements that will be shared across all it's child views. In this case, the navigation toolbar and the side navigation are the shared components. To inject the child views based on navigation, you can add a component called a views-container to serve as a place-holder. And this is the area where child-views are rendered. The Views-container, by default, occupies the available space. 

![switch-views-indigo-design-app-builder](./images/switch-views-indigo-design-app-builder.gif)
<p style="text-align:center;">Switch between views - sample app</p>

The views-container has a property to define which of the two child views will be shown by default when the app loads. Once the Views container is selected, from the Views Container Properties can be defined which is the default child view displayed.

<img src="./images/views-container-indigo-design-app-builder.png" srcset="./images/views-container-indigo-design-app-builder-@2x.png
 2x" />
<p style="text-align:center;">Views container component - sample app</p>


![views-interaction-Indigo-Design-App-Builder](./images/views-interaction-Indigo-Design-App-Builder.gif)
<p style="text-align:center;">Change views interaction - sample app</p>

## Add navigations (routing)  

To connect the navigation to the child views, a navigation action to the button in the 'interactions' section can be added. Currently, we offer Navigate to and Toggle (for components like Nav Drawer, Dropdown and Select) actions, but we'll be adding more actions in future releases. 


<img src="./images/change-navigation-Indigo-Design-App-Builder.png" srcset="./images/change-navigation-Indigo-Design-App-Builder-@2x.png
 2x" />
 <p style="text-align:center;">Define navigation - sample app</p>


That's it for single page apps and the navigation feature. To summarize, child views are injected inside the master view based on navigate action. Child views are hosted inside the master view using the views-container component. And components added to the master view are shared across all it's children views. 


## Additional Resources

<div class="divider--half"></div>

* [Preview Code and Generate App](preview-code.md)
* [Angular Routing](https://angular.io/start/start-routing)
* [Getting Started]({environment:appbuilderBaseUrl}/help/getting-started)
* [App Builder Components]({environment:appbuilderBaseUrl}/components)
* [Indigo.Design Components]({environment:infragisticsBaseUrl}/products/indigo-design/help/components/components-overview)

