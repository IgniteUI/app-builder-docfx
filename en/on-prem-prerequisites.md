---
title: App Builder On-premise Prerequisites
_description: Learn how to start using App Builder On-premises version and what are the prerequisites to install and run it.
_keywords: App builder, On-premise, Infragistics
---

# App Builder On-premise Prerequisites

This document lists the prerequisites to install the On-Prem version of AppBuilder and is intended for System Administrators who configure operational parameters that maintains and supports Linux/Mac OS/Windows

## <a name='sql-server'>Install SQL Server</a>

1. Install [Sql Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) ([direct link](https://go.microsoft.com/fwlink/?linkid=866658))

<img class="responsive-img" src="./images/on-premise-sql-express.png" />
<p style="text-align:center;">On-Premise Sql Express Installation</p>

> Note: An On-prem server should have a real Sql Server not an embedded Sql Server Express of VS

2. Enable tcp/ip - detailed explanation [here](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol?view=sql-server-ver15#to-enable-a-server-network-protocol).

<img class="responsive-img" src="./images/sql-server-config-manager.png" />
<p style="text-align:center;">SqlServer Config Manager</p>

3. Add a new App_Builder user part of Sql Express. You can [install Sql Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) and use it for that purpose.

<img class="responsive-img" src="./images/login-parameters.png" />
<p style="text-align:center;">Login Parameters Dialog</p>

## <a name='docker'>Install Docker</a>

Windows guide -> [docs.microsoft.com guide](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-and-11#tabpanel_1_Windows-10-and-11)

## Additional Resources
<div class="divider--half"></div>

* [App Builder Interface Overview](interface-overview.md)
* [Single Page And Navigation](single-page-apps-and-navigation.md)
* [App Builder Components](indigo-design-app-builder-components.md)
* [Flex Layouts](flex-layouts/flex-layouts.md)
* [Running Desktop App](running-desktop-app.md)
* [Generate app](generate-app/generate-app-overview.md)

