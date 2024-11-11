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
This diagram shows the different components which will make up the Dashboard of the web app. The main Page component consists of GraphEditor, NavBar, DataGauge, TimeSeriesGraph, GGDiagram, LinearGauge, and DataWidget, which are all ways that our website displays data. The CANConfiguration page, along with its related components, ConfigManager, CANDataAssignment, and CANInput manage CAN customization.


```mermaid
classDiagram
App *-- Page
Page *-- GraphEditor
Page *-- NavBar
Page *-- DataGauge
Page *-- TimeSeriesGraph
Page *-- GGDiagram
Page *-- LinearGauge
Page *-- DataWidget
App *-- CANConfiguration
CANConfiguration *-- ConfigManager
CANConfiguration *-- CANDataAssignment



CANDataAssignment *-- CANInput


DataGauge: +String canID
DataGauge: +String metricKey
DataGauge: +String title
DataGauge: +Number maxPrimaryRange
DataGauge: +Number maxSecondaryRange
DataGauge: +String primaryUnit
DataGauge: +String secondaryUnit
DataGauge: +Number metricValue
DataGauge: +Boolean isSecondaryUnit = false
DataGauge: +useEffect()void
DataGauge: +convertToFahrenheit(number)number
DataGauge: +convertToMPH(number)number
DataGauge: +toggleUnit()void
DataGauge: +setMetricValue(String)void
DataGauge: +setIsSecondaryUnit(Bool)void

TimeSeriesGraph: +String canID
TimeSeriesGraph: +String yAxis
TimeSeriesGraph: +String title
TimeSeriesGraph: +Array timestamps
TimeSeriesGraph: +Array axisToPlot
TimeSeriesGraph: +useEffect()void
TimeSeriesGraph: +Array data
TimeSeriesGraph: +Object layout
TimeSeriesGraph: +setTimestamps(Array)void
TimeSeriesGraph: +setAxisToPlot(Array)void

LinearGauge: +String canID
LinearGauge: +String valueToShow
LinearGauge: +String title
LinearGauge: +String value
LinearGauge: +useEffect()void
LinearGauge: +Array data 
LinearGauge: +Object latout
LinearGauge: +setValue(String)void

DataWidget: +String canID
DataWidget: +String valueToDisplay
DataWidget: +Int number
DataWidget: +String text
DataWidget: +useEffect()void
DataWidget: +setNumber()void
DataWidget: +setText()void





GGDiagram: +String canID
GGDiagram: +String title
GGDiagram: +Array lateral
GGDiagram: +Array longitudinal
GGDiagram: +useEffect()void
GGDiagram: +Array data
GGDiagram: +Object Layout
GGDiagram: +setLat(Array)void
GGDiagram: +setLong(Array)void


NavBar: +Bool isConnected

Page: +Object attributes
Page: +Object listeners
Page: +Object transform
Page: +Object transistion
Page: +Object style
Page: +State layout

Page: +setNodeRef()void
Page: +setLayout()void
Page: +useSensors()void
Page: +handleDragEnd(event)void



GraphEditor: +int DataChannel
GraphEditor: +String DataLabel
GraphEditor: +String DisplayType
GraphEditor: +int UnitOfMeasure
GraphEditor: +String Color
GraphEditor: +int Max
GraphEditor: +int Min


GraphEditor: +setDataChannel(int)void
GraphEditor: +setDataLabel(String)void
GraphEditor: +setDisplayType(String)void
GraphEditor: +setUnitOfMeasure(int)void
GraphEditor: +setColor(String)void
GraphEditor: +setMax(int)void
GraphEditor: +setMin(int)void

CANDataAssignment: +Array rows
CANDataAssignment: +setRows(Array)void
CANDataAssignment: +handleAddRow(Array)void
CANDataAssignment: +handleRowChange(int, Object)void
CANDataAssignment: +handleSubmit()void
CANDataAssignment: +handleCancel()void

CANInput: +Int index
CANInput: +Object row
CANInput: +onRowChange(Object)void
CANInput: +handleInputChange(String, Int)void

ConfigManager: +Array configs
ConfigManager: +setConfigs(array)void
ConfigManager: +String selectedConfig
ConfigManager: +setSelectedConfig(array)void
ConfigManager: +Object configData
ConfigManager: +setConfigData(Object)void
ConfigManager: +String errorMessage
ConfigManager: +setErrorMessage(String)void
ConfigManager: +fetchConfigs(String)Object
ConfigManager: +useEffect()void
ConfigManager: +selectConfig()void
ConfigManager: +createConfig()void

CANConfiguration: +String selectedConfig
CANConfiguration: +setSelectedConfig(String)void
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