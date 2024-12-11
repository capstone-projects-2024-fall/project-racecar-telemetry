### Use Case 0 - Device Initial Setup
_User follows instructions for initial setup of up telemetry device._
1. User opens the telemetry website to the default dashboard page.
2. A pop-up appears with instructions on how to set up the telemetry device for the first time, including installation of the device in the vehicle.
3. Following the instructions, user plugs the telemetry device into a connector on the car’s wiring harness (the connector contains pins for 5V power, ground, CAN high and CAN low).
4. User closes out of the instructions pop-up.

```mermaid
sequenceDiagram
actor User
participant Default Dash

User -) Default Dash: User opens Default Dashboard page
activate User
activate Default Dash
Default Dash --) User: Initial setup instructions
deactivate Default Dash
User -) Telemetry Device: User plugs telemetry device into car
deactivate User

```

### Use Case 1 - CAN Configuration
_User edits ECU and webapp CAN configurations to transmit/receive data channels._
1. User configures the vehicle's ECU (engine control unit) to transmit desired data over CAN IDs between 0x200-0x300.
2. User opens the telemetry webapp and opens the CAN Configuration page from the navbar.
3. User is able to choose a previously created configuration or create a new one.
4. When creating new configuration, user can assign CANID and number of signals incoming from ECU.
    - For each data channel, user provides the channel name, start bit, bit length, adder, multiplier, and unit.

```mermaid
sequenceDiagram
actor User
participant ECU
participant CAN Config
participant Firestore

User -) ECU: Configure ECU to send desired CAN data.
activate User
activate ECU
ECU --) User: 
deactivate ECU
User -) CAN Config: Enter new config name, clicks "Create"
activate CAN Config
CAN Config -) Firestore: Save config name
activate Firestore
Firestore --) CAN Config: success
deactivate Firestore
CAN Config --) User: Show config editor
User -) CAN Config: Click "Add Row"
CAN Config --) User: Show CAN ID/signal editor
User -) CAN Config: Enter CAN ID, # of Signals, click "Edit Signal Info"
CAN Config -) User: Show Edit Signal Info popup window
User -) CAN Config: Enter configuration info for each data channel, click "Save Changes"
CAN Config -) Firestore: Save configuration data
activate Firestore
Firestore --) CAN Config: Success
deactivate Firestore
CAN Config --) User: Show popup "Data saved successfully"
deactivate CAN Config
deactivate User
```

Note: All other use cases assume that case 0 and 1 (first time setup) has occurred.

### Use Case 2 - Viewing Live Data
_User views live data on default dashboard page._
1. User opens the telemetry webapp, where they see a default dashboard page. It displays "Not Connected", and shows the following default displays (which are visible but empty, as no data is transmitting):
    - "Chips" for each data channel being transmitted across the top of the screen (this persists throughout all pages)
    - A time-series graph of engine coolant temperature
    - A time-series graph of engine speed (RPM)
    - A number for battery voltage
    - A linear gauge for throttle position
2. User selects the current CAN configuration from a menu.
3. A driver turns on the car, beginning data transmission, which causes the display to change to “Connected.” The display components populate with live numbers.

```mermaid
sequenceDiagram
actor User
participant Dash
participant Firestore
participant Realtime
participant ESP32
participant FeatherM4

User -) Dash: Open Default Dashboard page, select CAN Configuration from menu
activate User
activate Dash
User -) Dash: Select a CAN Configuration from menu
Dash -) Firestore: Update Current Configuration
activate Firestore
Firestore -) Dash: Success
deactivate Firestore
Dash --) User: show "Not connected" page with blank displays
User -) Car: Turn on car
activate Car
Car -) ESP32: Power on ESP32
activate ESP32
ESP32 -) Firestore: Retrieve current CAN Configuration
activate Firestore
Firestore --) ESP32: Current CAN Configuration
deactivate Firestore
loop While car is running
    Car -) FeatherM4: Transmit CAN packets
    FeatherM4 -) FeatherM4: Filter CAN packets by ID
    FeatherM4 -) ESP32: Transmit CAN packets via i2C
    ESP32 --) featherM4: successs
    ESP32 -) ESP32: Translate CAN packets to JSON of data channels
    ESP32 -) Realtime: Upload JSON of data channels
    activate Realtime
    Realtime --) ESP32: Success
    Dash -) Realtime: Retrieve data channels for current config
    Realtime --) Dash: Data channels
    deactivate Realtime
    Dash -) User: Show live data channels via data displays
end
deactivate Car
deactivate Dash
deactivate User
deactivate ESP32

```

### Use Case 3 - Inserting Display Conmponents
_User inserts new display components on custom dashboard page._
1. User opens the telemetry webapp to the default dashboard page (Not Connected).
2. User clicks the "Add Row" button. Insert number of components in row.
3. User chooses "+" sign to assign: Component type, CAN ID, data channel, etc.
4. The new component appears on the dashboard.
5. When the page says “Connected,” the new graphs also populate with live data.

``` mermaid
sequenceDiagram
actor User
participant Dash

User -) Dash: Click "Add Row" (number of components)
activate User
activate Dash
Dash --) User: Show row with specified number of placeholder components
User -) Dash: Click "+" sign to add a component (type, CAN ID, data channel, scale, color)
Dash --) User: Show specified component
Dash -) Realtime: Retrieve live data channel
activate Realtime
Realtime --) Dash: current data channel value
deactivate Realtime
Dash --) User: Live data on display
deactivate User
deactivate Dash

``` 

### Use Case 4 - Editing Displays
_User edits existing components on the dashboard._
1. User clicks the settings button on existing component, bringing up the component editor.
2. User changes the data channel. For example, from battery voltage to fuel pressure, and the max display value to 100. 
3. User deletes the throttle position display.

``` mermaid
sequenceDiagram

actor User
participant Dash

User -) Dash: Click Settings icon
activate User
activate Dash
Dash --) User: Show component editor window
User -) Dash: Select different component settings (data channel, scale, color, unit)
Dash --) User: Show new component
Dash -) Realtime: Retrieve live data channel
activate Realtime
Realtime --) Dash: current data channel value
deactivate Realtime
Dash --) User: Live data on display
deactivate User
deactivate Dash

```

### Use Case 5 - Multi-user Viewing
_Two users view website at the same time._
1. User 1 opens the telemetry webapp to the CAN Configuration page.
2. User 1 creates a new CAN Configuration called "TFR Config". 
3. Users 1 and 2 opens the telemetry webapp to the default dashboard on their own devices. 
4. User 2 selects "TFR Config" from the list of configurations.
5. User 1 adds new components to their dashboard.
6. User 2 adds new components (different than User 1) to their dashboard.
7. User 1 turns the car on.
8. Users see live data.

```mermaid
sequenceDiagram

actor User 1
actor User 2
participant Dash 1
participant Dash 2

User 1 -) Config: Open CAN Configuration page and create a new configuration (TFR Config)
activate Config
activate User 1
Config -) Firestore: Save TFR Config
activate Firestore
Firestore --) Config: success
deactivate Firestore
Config --) User 1: Saved configuration successfully
deactivate Config
User 1 -) Dash 1: Select TFR Config
activate Dash 1
Dash 1 -) Firestore: update current configuration
activate Firestore
Firestore --) Dash 1: success
deactivate Firestore
User 1 -) Dash 1: Add/edit new components
Dash 1 --) User 1: Show new components
User 2 -) Dash 2: Open dashboard, add new components
activate User 2
activate Dash 2
Dash 2 --) User 2: Show new components
deactivate User 2
deactivate Dash 2

deactivate Dash 1
deactivate User 1  

```


actor User1
actor User2
participant Dashboard1

<!-- 
OLD SEQUENCE DIAGRAMS
### Use Case 1:
_A race crew is testing their vehicle with their driver to make sure the car is performing well._ 

```mermaid
sequenceDiagram
participant Driver
participant Crew

Driver -) Car: Driver starts car

activate Car
activate Temperature Sensor
activate ECU
activate Transceiver

Car -) Temperature Sensor: Engine oil temperature sensor turned on
Temperature Sensor -) ECU: Temperature data sent
ECU -) Transceiver: ECU sends data through CAN bus to Transceiver
Driver -) MCU: Driver attaches MCU to Transceiver

activate MCU

Transceiver -) MCU: Temperature data sent
MCU -) Cloud: Data sent to cloud database and website processing
Cloud -) Crew: Crew reads live data from website
MCU -) Cloud: Temperature warning sent
MCU -) Driver: Temperature warning sent
MCU -) Crew: Temperature warning sent
Crew -) Driver: Crew communicates with driver



deactivate Car
deactivate Temperature Sensor
deactivate ECU
deactivate Transceiver
deactivate MCU
```

### Use Case 2:
_A crew recently installed a new part and want to make sure the vehicle is running smoothly._

```mermaid
sequenceDiagram
participant d as driver
participant cr as crew
participant c as Car
participant s as Sensors
participant m as MCU
participant cl as Cloud

d -) c: Driver starts car
activate c

c -) s: Sensored powered on
activate s

d -) m: Driver installed MCU
activate m

s -) m: Sensors send data to MCU

m -) cl: MCU sends data wirelessly to the cloud

cl -) cr: Crew pulls data from cloud database and website

deactivate m
deactivate s
deactivate c

```

### Use Case 3:
_A driver has been testing a vehicle. As he is driving, he notices some of the electrical components in the vehicle are flickering, a sign of a problematic battery._

```mermaid
sequenceDiagram
participant d as driver
participant cr as crew
participant c as Car
participant s as Voltage Sensor
participant m as MCU
participant cl as Cloud

d -) c: Driver starts car
activate c

c -) s: Sensor is turned on
activate s

d -) m: Driver installed MCU
activate m

s -) m: Sensors send data to MCU

m -) cl: MCU sends data wirelessly to the cloud

cl -) cr: Crew pulls data from cloud database and website

cr -) c: Crew replaces battery

deactivate m
deactivate s
deactivate c

```

### Use Case 4:
_A driver is getting ready for a race. It is known that tires perform better when hot._

```mermaid
sequenceDiagram
participant d as Driver
participant c as Car
participant t as Tire Temp Sensor
participant m as MCU
participant cl as Cloud

d -) c: Driver starts car
activate c

c -) t: Tire Temp Sensor powered on
activate t

d -) m: Driver installs device
activate m

t -) m: Sensor sends data to device

m -) cl: Device sends data to cloud database/website

cl -) c: Crew reads tire temperature using website

c -) d: Crew relays info to driver

deactivate m
deactivate c
deactivate t

```

### Use Case 7:
_The new TFR ergonomics lead wants to view information relevant to vehicle handling and driver performance during a run._
```mermaid
sequenceDiagram
actor e as Ergonomics Lead
participant dash as Dashboard Home
participant d as Database

actor dr as Driver
actor c as Racecar
participant esp as MCU


activate e
e -) dash: Click 'Insert New Display' (type: graph, sensors: [brake pressure front, brake pressure rear], unit: kPa)
dash --) e: Show new display component


dr -) c: Turn on car
activate dr
activate c

c -) esp: Initialize
activate esp

loop While car is running

    c -) esp: Transmit sensor data(CAN ID, data, timestamp)

    esp -) d: Upload data to cloud database
    activate d
    d -) dash: Get CAN data (CAN ID, identifier, data, timestamp)
    dash --) e: Show displays with live data
end
dr -) c: Turn off car
deactivate c
deactivate esp



e -) dash: Scrub to previous data(timestamp)
dash --) e: Display data at previous timestamp

e -) dr: Explain data from acceleration run

dr -) c: Turn on car
activate c

c -) esp: Initialize
activate esp

loop While car is running

    c -) esp: Transmit sensor data(CAN ID, data, timestamp)

    esp -) d: Upload data to cloud database
    d -) dash: Get CAN data (CAN ID, identifier, data, timestamp)

    dash --) e: Show displays with live data
end
dr -) c: Turn off car
deactivate c
deactivate esp


deactivate d
deactivate dr

deactivate e

```

### Use Case 8:

```mermaid
sequenceDiagram

actor t as TFR Member
participant l as Login Page
participant d as Database
participant dash as Dashboard Home

t -) l: Clicks Log In
activate t
activate l

l --) t: Log in prompt

t -) l: Username and password entered

activate d
d -) d: Check if valid user/password
    loop While username and password do not match
        d->t: Invalid. Enter username and pw
    end
deactivate d

d --) l: Successful login

l -) dash: Redirect to dash board

dash --) t: Display dash board home page

t -) dash: Click option to pull up past data

dash --) d: Request for information

activate d
d -) dash: Pull data from previous run and display graphs.
deactivate d 


dash --) t: Display graph

t -) dash: Click on graph to enter desired time values.

dash --) t: Display graph with only desired time frame.
```

### Use Case 9:
_A TFR team member wants to add and delete graphs are being displayed to the dashboard._

```mermaid
sequenceDiagram

actor t as TFR Member
participant l as Login Page
participant d as Database
participant dash as Dashboard Home

l --) t: Log in prompt

t -) l: Username and password entered

activate d
d -) d: Check if valid user/password
    loop While username and password do not match
        d->t: Invalid. Enter username and pw
    end
deactivate d

d --) l: Successful login

l -) dash: Redirect to dash board

dash --) t: Display dash board home page

t -) dash: Click on graph.

dash --) t: Display graph menu.

t -) dash: Choose delete graph option.

dash --) t: Display updates with a deleted graph.

t -) dash: Click on add graph option.

dash --) t: Display graph menu.

t -) dash: Choose sensor-to-read value.

dash -) d: Find corresponding sensor values

activate d
d -) dash: Read data from corresponding sensor.
deactivate d

dash --) t: Display graph for the chosen sensor to be read.

```

-->