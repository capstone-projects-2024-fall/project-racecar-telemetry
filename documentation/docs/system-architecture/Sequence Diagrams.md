
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
        d-->t: Invalid. Enter username and pw
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
        d-->t: Invalid. Enter username and pw
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