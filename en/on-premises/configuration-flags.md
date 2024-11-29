# Configuration flags upon On-Prem and SDK deployment

This document is outlining the available configuration flags for deploying and managing the App Builder on-premise instance. This document should provide examples of key environment variables, such as:

```sh
docker run --restart always -p 80:5000 -e AuthSettings__ClientId="1234-4657-00"
```

## Configurable properties

### Through environment.ts (part of App Builder SDK context)

```
// Configuration Property Explanations:

- favicon: '/favicon_dev.ico',              // Enables you to set your own favicon
- disableSurvey: false,                     // Disables App Builder surveys
- enableLibrariesManagement: false,         // Shows/hides the dropdown for library management
- disablePublishToGithub: false,            // Disables/enables the "Publish to GitHub" button
- disableFeedback: false,                   // Toggles Feedback dialog visibility
- showOnboardingVideos: false,              // Toggles the onboarding YouTube videos
- toggleableDatasourceTags: false,          // Toggles the visibility of data source color tags
- hideMainMenu: false,                      // Toggles the visibility of the Application Shell Main Menu
- personalWorkspaceLabel: 'myProjects',     // Sets the label value for the personal workspace
- disableCodegen: false,                    // Toggles the usage of the Codegeneration service
- hideSharingOptions: false,                // Toggles the visibility of sharing options in the UI
- hideHelpResources: false,                 // Hides help resources in the interface
- hideAppBuilderLogo: false,                // Hides the App Builder logo
- disableQuickTips: false,                  // Disables Quick tips
- hideMockDataSources: false,               // Hides mock data sources from the UI
- hideVerbPills: false,                     // Hides HTTP verb pills in API-related features
- useSummaryForOperationName: false,        // Uses a summary instead of a full name for operation names
- showObjectDatasources: false,             // Enables support for object-based datasources (limited use case)
- hideDesktopApp: false,                    // Hides desktop app-related options in the UI
- hideAccountMenu: false,                   // Hides the account menu from the UI
- hideExperimentalGenerators: [],           // Specifies frameworks to hide from code export (e.g., [{ platform: Platform.react }])
- disableMockDataUponFailedEndpoint: false, // Prevents mock data from being used if an endpoint fails
- disableAI: false,                         // Disables AI-related features
- enableCssGridLayout: true,                // Enables the CSS Grid layout feature
- showPreviewInvite: true,                  // Shows preview invites for collaborative features

// Theme Properties:

appTheme: {                                  
    schema: 'light-bootstrap-schema',       // Defines the base theme schema
    colors: {                               
        primary: '#2D8DFF',                 // Primary color used throughout the application
        secondary: '#2D8DFF',               // Secondary color
        surface: '#F1F7FF',
        success: '#31AB2B',                 // Success indicator color
        warn: '#F2C200',                    // Warning indicator color
        error: '#DB372A',                   // Error indicator color
        info: '#0678FF',                    // Info indicator color
        grays: '#2F2F2F',
    },
    typeface: 'Public Sans',                // Default font for the application
    fonts: [],                              // Additional font families
    scale: 'bootstrap-type-scale',
    roundness: 0.3,                         // Corner roundness
    elevation: null,                        // Elevation (shadows), if applicable
},

shellTheme: {                               
    typeface: 'Public Sans',                // Font used in the application shell
    colors: {                               
        primary: '#2D8DFF',                 // Primary color
        grays: '#9A9DA2',
        success: '#31AB2B',                 // Success indicator color
        warn: '#F2C200',                    // Warning color
        error: '#DB372A',                   // Error color
        aux1: '#068E6B',
        aux2: '#9C27B0',
    },
}
```
 
### Through a parameter in a docker run command (On-prem context)

```sh
docker run --restart always -p 80:5000 -e AuthSettings__ClientId="1234-4657-00"
```

## Additional Resources
<div class="divider--half"></div>

* [Auth with openid connect](auth-with-openid-connect-o-auth.md)
* [On-prem Prerequisites and Installation Overview](../on-prem-prerequisites-and-installation.md)
* [App Builder Interface Overview](../interface-overview.md)