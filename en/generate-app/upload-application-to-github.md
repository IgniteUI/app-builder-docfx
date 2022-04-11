---
title: App Builder - Upload Application to GitHub
_description: App Builder enables users to choose between downloading their application locally or uploading it to their GitHub repository.
_keywords: App Builder, Web App Builder, Design Systems, Design Systems UX, UI kit, Sketch, Ignite UI for Angular, Sketch to Angular, Angular, Angular Design System, Export code from Sketch, Design Kits for Angular, Sketch UI kits, GitHub
---
# Upload Application To Github

> [!NOTE]
><b>Once ready with your design in Indigo.Design App Builder you can upload it to your private or GitHub repository. 


### In this article:
* <a href="#intro">Introduction of the feature</a>
* <a href="#uploading-an-application-to-github">Uploading an application to GitHub</a>

## Intro
One of the great Indigo.Design App Builder features is actually the code generation service, so once the app design is ready and the code reviewed, users can get the final application code. However, what makes the experience even greater is the fact that the app code can be easily uploaded to a GitHub repository directly from inside the App Builder. GitHub is a favorite tool for thousands of developers, so this App Builder feature allows users to benefit from all GitHub features, such as assigning reviewers, tracking changes, commenting and many more. By delivering this feature, the Indigo.Design product team adds one more piece to the full design-to-code collaborative story, but also integrates the App Builder platform with a well-known service that engineers are already used to. 

## Uploading an application to GitHub
After finalizing the design of your application and previewing its code, it comes the time for generating the full app code repository. In order to do that, simply go to the Generate app button and then connect your GitHub account to the App Builder. You can also download your application files from the button menu.


<img class="responsive-img" src="../images/connect-to-github2.png" srcset="../images/connect-to-github-@2x.png 2x" />
<p style="text-align:center;">Connect Indigo.Design App Builder to GitHub</p>

Once you log in with your GitHub account, you should authorize Indigo.Design to access it in order to pick up the repository where the app code will be stored. There, you can select between creating a new repository or adding to an existing one. When creating a new repository you can specify the name of the app, add description and choose between public or private repo. Once ready, the app files are being uploaded to GitHub, creating a new GitHub repository.

<img class="responsive-img" src="../images/pick-repository-publish-to-github2.png" srcset="../images/pick-repository-publish-to-github-@2x.png 2x" />
<p style="text-align:center;">Publish application to an existing repo in GitHub</p>

<img class="responsive-img" src="../images/create-new-repo-publish-to-github2.png" srcset="../images/create-new-repo-publish-to-github-@2x.png 2x" />
<p style="text-align:center;">Create a new repository to GitHub</p>

When the upload process is done, users can apply changes to the GitHub repo from inside the App Builder or click to "View it on GitHub" and see the updated files in GitHub.

<img class="responsive-img" src="../images/App-VSCode-Indigo-Design-App-Builder2.png" srcset="../images/view-application-publish-to-github-@2x.png 2x" />
<p style="text-align:center;">An application running in VSCode</p>

## Troubleshooting

### Already pushed changes are being overwritten
There are times when you will be doing application changes externally with code and not via the App Builder. Those changes will be overwritten once you push a change from the App Builder GitHub UI. In order to resolve that you can follow these recommended approaches.

#### Option 1 (recommended)
- Keep pushing from App Builder (leave the PR open, don't merge it).
- Make your changes in `master` branch
- Merge manually and resolve conflicts: 

```
git checkout master
```

```
git merge appbuilder-branch
```

#### Option 2
- Create a `dev` branch
- You can merge AppBuilder PRs to master
- Make your changes in the `dev` branch
- Merge manually and resolve conflicts: 

```
git checkout dev 
```

```
git merge master
```

In this case, `dev` becomes your main branch and you keep master only for Appbuilder.

> [!NOTE]
> We're [working in improving this experience](https://github.com/IgniteUI/app-builder/issues/11) with the best of both options. You'll be able to merge App Builder work to `master` and next time App Builder will create a PR that contains only the new differences.

## Additional Resources

<div class="divider--half"></div>

* [Run Application Locally](run-application-locally.md)
* [Preview Application Code](../preview-code.md)
* [Indigo.Design Getting Started](https://www.infragistics.com/products/indigo-design/help/getting-started)
* [Indigo.Design Components](https://www.infragistics.com/products/indigo-design/help/components/components-overview)
