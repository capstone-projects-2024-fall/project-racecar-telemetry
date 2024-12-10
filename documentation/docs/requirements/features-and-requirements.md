---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

### 1. Data collection & transmission
1. A device plugs into the vehicle's communication area network (CAN) bus to receive sensor & diagnostic information from the engine control unit (ECU).
    1. The device contains a microcontroller with WiFi, microcontroller with a CAN controller and transceiver, and hardware to plug into a standard automotive connector on the vehicle.
2. A smartphone with hotspot capability is placed in the vehicle to provide a WiFi access point for the telemetry device.
3. A microcontroller within the device filters incoming CAN frames and uploads relevant CAN IDs to a database (for the purposes of the project, the TFR team will be instructed to only use CAN IDs 0x200-0x300 to transmit data).
4. A CAN Configuration page on the web app allows users to input how data is stored within CAN frames using the following options (examples are given for transmission of throttle position data):
    - Data Channel (String): "Throttle Position"
    - CAN ID (Hex number): 0x230
    - Message Length (bits): 16
    - Start bit: 0
    - Adder (int): 0
    - Multiplier (int): 1
    - Unit (String): "%"

### 2. Data storage
1. Live data is stored in a Firebase realtime database. 
2. CAN configuration data is stored in the Firestore database.

### 3. Data Visualization
1. A default dashboard page containing various widgets (e.g., graphs, gauges, number displays) appears when users first open the page.
2. A text box says “Connected” if data is currently streaming to the database, and “Not Connected” otherwise.
3. If “**Connected**”, widgets automatically populate with live data.
4. If “**Not Connected**”, widgets still appear but indicate that data is unavailable (through text or color).
5. Widgets are customizable:
    - Users can edit data channels, colors, and other settings.
    - Users can add, drag, resize, or delete widgets.

## Nonfunctional Requirements

### 1. Performance
1. Telemetry data must have no more than 2000 ms latency.
2. Data transmission range is up to 500m.

### 2. Usability of Website
1. No contact required between the Capstone team and the TFR team—usage instructions are included on the webpage.
2. Multiple users can view live data simultaneously.

### 3. Integration with TFR car
1. The telemetry device connects to the vehicle wiring harness using a standard automotive connector (Deutsch DTM connector).
2. The device weighs under 1.5 lbs.

### 4. Testing/Proof of Concept
1. System capability will be tested using an RC car.
2. The RC car will simulate racecar communication and power using an MCU, CAN transceiver, battery, and sensors.
3. Data transmission latency will be tested from 0-2000 ms.

