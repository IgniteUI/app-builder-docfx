---
title: App Builder On-premise Prerequisites and Installation
_description: Learn how to start using App Builder On-premises version and what are the prerequisites to install and run it.
_keywords: App builder, On-premise, Infragistics
---

# App Builder On-premise Prerequisites and Installation

## Prerequisites

This section lists the prerequisites to install the On-Prem version of App Builder and is intended for System Administrators who configure operational parameters that maintain and support Linux/Mac OS/Windows.

### Install SQL Server

1 - Install [Sql Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) ([direct link](https://go.microsoft.com/fwlink/?linkid=866658))

<img class="responsive-img" style="width: 56%; box-shadow: 5px -4px 13px 1px grey" src="./images/on-premise-sql-express.png" />
<p style="margin-top:-20px;width: 56%; text-align:center;">On-Premise Sql Express Installation</p>

> Note: An On-prem server should have a real Sql Server not an embedded Sql Server Express of VS

2 - Enable tcp/ip - detailed explanation [here](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol?view=sql-server-ver15#to-enable-a-server-network-protocol).

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/sql-server-config-manager.png" />
<p style="margin-top:-20px;width:56%; text-align:center;">SqlServer Config Manager</p>

3 - Add a new App_Builder user part of Sql Express. You can [install Sql Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) and use it for that purpose.

<img class="responsive-img" style="width: 57%; box-shadow: 5px -4px 13px 1px grey" src="./images/login-parameters.png" />
<p style="margin-top:-20px;width: 57%; text-align:center;">Login Parameters Dialog</p>

### Install Docker

Windows guide -> [docs.microsoft.com guide](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-and-11#tabpanel_1_Windows-10-and-11)

## Installation
This section assumes that you already have docker and an SQL server database installed.

### First time installation

1 - Download the appbuilder.zip from the link provided to you by your account representative or from the [Infragistics Customer Portal](https://account.infragistics.com/downloads).

2 - Extract the appbuilder.tar contained in the appbuilder.zip file. 

3 - Open a terminal or command prompt window at the extracted location.

4 - Load and verify the image.

Run:

```
docker load --input appbuilder.tar
```

In order to verify that the _image_ is correctly loaded, see the example with the table below:

```
docker images
```

| REPOSITORY    | TAG               | IMAGE ID          | CREATED                                   |SIZE   |
| --------:     | ----------------  | ----------------- | ---------------------------------------   |-----  |
| appbuilder    | 1.0               | 2a05977e039b      |12 days ago                                |854MB  |

5 - Run the container:

```
docker run --restart always -p 80:5000 -e "ConnectionStrings:AppBuilderConnection=Data Source=<your-sql-database-ip>,<your-sql-database-port>;Database=<your-sql-database-name>;User ID=<your-sql-database-user>;Password=<your-sql-database-password>;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False" -v <external-folder-for-logs>:/appbuilder/logs -v <external-folder-for-storage>:/appbuilder/storage --name appbuilder appbuilder:1.0
```

6 - Open your browser and type `http://localhost/`

> [!NOTE]
> If you are using Docker Desktop, go to Containers/Apps, find your container and click `Open in browser` 

<img class="responsive-img" style="box-shadow: 5px -4px 13px 1px grey" src="./images/docker-apps.png" />
<p style="margin-top:-20px;text-align:center;">Docker Containers/Apps</p>

### Updates

1 - Follow the first 4 steps of the first time installation with the newly published zip file

2 - Verify that the new image has loaded correctly (the old image should be tagged as <none>)

```
docker images
```


| REPOSITORY        | TAG       | IMAGE ID          | CREATED       |SIZE   |
| --------:         | --------- | ----------------- | ------------- |-----  |
| appbuilder        | 1.0       | 27ff4c1079ac      | 43 hours ago  |932MB  |
| <none>            | <none>    | 2a05977e039b      | 12 days ago   |854MB  |
        
3 - Stop the container

```
docker stop appbuilder
```

4 - Remove the container

```
docker rm appbuilder
```

5 - Run the container with the same command as the one used in step 5. of the first time installation


## Activation
This section assumes that you already installed the On-Prem instance and it is now up and running.

When the server is first started, a prompt dialog will provide you with _Installation ID_ and a _Authentication key_ will be requested. Send this _Installation ID_ to our [Sales department](https://www.infragistics.com/about-us/contact-us#sales) based on your region and we will provide you with _Authentication key_ to activate the server.


<img class="responsive-img" style="width:36%;box-shadow: 5px -4px 13px 1px grey" src="./images/activate-app-builder.png" />
<p style="margin-top:-20px;width:36%;text-align:center;">Activate App Builder</p>

> [!NOTE]
> You will receive a warning message directly through the UI thirty days before your key expires.

## Troubleshooting
### Docker Desktop on Windows
[Docker Desktop on Windows is not starting automatically without Login to Windows machine](https://github.com/docker/for-win/issues/6670) - Docker team doesn't recommend Docker Desktop for production workloads. You should use Docker on a Linux box or Docker for Windows Server if you want Windows containers.


## Additional Resources
<div class="divider--half"></div>

* [App Builder Interface Overview](interface-overview.md)
* [Single Page And Navigation](single-page-apps-and-navigation.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Generate app](generate-app/generate-app-overview.md)
* [Indigo.Design Getting Started](https://www.infragistics.com/products/indigo-design/help/getting-started)

