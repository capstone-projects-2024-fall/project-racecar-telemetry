---
sidebar_position: 1
---
## Front-End Figma Design

Login Page:
![login](/img/Login_Page.png) 

Dashboard (Connected):
![dashboardConnected](/img/Dashboard_Connected.png)

Dashboard (Not Connected):
![dashboardConnected](/img/Dashboard_NotConnected.png)

Component Editor:
![dashboardConnected](/img/ComponentEditor.png)

Data Assignment Window:
![dashboardConnected](/img/DataAssignment.png)

## Front-End UML Class Diagram
This diagram shows the different components which will make up the Dashboard of the web app. The dashboard page is made up of the LoginForm, Graph, LinearGraph, RadialGraph, GraphEditor, NavBar, LogoutButton, Header, NewDisplayButton, ErrorModal, and DataAssignmentWindow components. This is a NextJS app, and this diagram shows the path of /app/dashboard/page.js. All of the Graph related components allow users to customize their dashboard and view data in different ways. The LoginForm component is used to authenticate users sessions. The NavBar and Header components are for structure, design, and allows users to add new displays to their dashboard. The ErrorModal is used when there is a problem with the Live streaming of data, and gives a specific error message to help resolve it. The DataAssignmentWindow is used when the CAN IDs change and need to be mapped to their new data assignment.


```mermaid
classDiagram
App *-- Dashboard
Dashboard *-- Page
Page *-- LoginForm
Page *-- Graph
Graph *-- GraphEditor
Page *-- NavBar
Page *-- Header
Header *-- NewDisplayButton
NavBar *-- LogoutButton
Graph <|-- LinearGraph
Graph <|-- RadialGraph
Page *-- ErrorModal
Page *-- DataAssignmentWindow


ErrorModal: +String errorMessage
Header: +String imagePath
Header: +String Title
Header: +String Status
Header: +setStatus(String)void
NewDisplayButton: +onNewDisplay()void
NavBar: +onLogout()void
LogoutButton: +Logout()void
Page: +String status
Page: +Map CANIDs
Page: +handleLogout()void
Page: +handleNewDisplay()void
Page: +handleChangeCanIDs()void
Dashboard: 
LoginForm: +onSubmit()void
LoginForm: +String username
LoginForm: +String password
Graph: +int DataChannel
Graph: +String DataLabel
Graph: +String DisplayType
Graph: +int UnitOfMeasure
Graph: +String Color
Graph: +int Max
Graph: +int Min
Graph: +onDelete()void
Graph: +onClickSettings()void
Page: +handleDelete()void
Page: +handleClickSettings()void
Page: +handleSubmit()void
Page: +handleSetStatus()void
GraphEditor: +setDataChannel(int)void
GraphEditor: +setDataLabel(String)void
GraphEditor: +setDisplayType(String)void
GraphEditor: +setUnitOfMeasure(int)void
GraphEditor: +setColor(String)void
GraphEditor: +setMax(int)void
GraphEditor: +setMin(int)void
LinearGraph: 
RadialGraph: 
DataAssignmentWindow: +setCanIDS(Map)
```

<!--
A check list for architecture design is attached here [architecture\_design\_checklist.pdf](https://templeu.instructure.com/courses/106563/files/16928870/download?wrap=1 "architecture_design_checklist.pdf")  and should be used as a guidance.
-->


<!--

### Use Case 4:

```mermaid
sequenceDiagram
participant i as Ian
participant c as Car
participant s as Crankshaft Position Sensor
participant m as MCU
participant cl as Cloud

i -) c: Ian starts the car
activate c

c -) s: Sensor is activated
activate s

i -) m: Ian installs MCU
activate m

cl -) i: Ian downloads previously stored sensor data/settings

i -) m: Ian replaces current settings with previous settings

i -) c: Ian test drives car

deactivate m
deactivate s
deactivate c
```

### Use Case 5:

```mermaid
sequenceDiagram
participant d as Driver
participant c as Car
participant f as Fuel Sensor
participant m as MCU
participant cl as Cloud

d -) c: Driver starts car
activate c

c -) f: Fuel sensor powered on
activate f

d -) m: Driver installs device
activate m

f -) m: Sensor sends data to device

m -) cl: Device sends data to cloud database/website

cl -) c: Crew reads fuel levels using website

c -) d: Crew relays info to driver

deactivate m
deactivate c
deactivate f
```
-->