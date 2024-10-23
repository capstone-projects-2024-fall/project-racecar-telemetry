---
sidebar_position: 4
---

# Features and Requirements 

## Functional Requirements <!--high level-->
<b>1.  Data collection & transmission</b>
    1.  A device plugs into the vehicles communication area network (CAN) bus to receive sensor & diagnostic information from the engine control unit (ECU).
        1.  The device contains a microcontroller, CAN transceiver, and hardware to plug into a standard automotive connector on the vehicle.
    2.  A smartphone with hotspot capability is placed in the vehicle to provide a WiFi access point for the telemetry device.
    3.  A microcontroller within the device filters incoming CAN frames and uploads relevant CAN IDs to a database (for the purposes of the project, the TFR team will be instructed to only use CAN IDs 0x200-0x300 to transmit data).
    4.  A CAN Configuration page on the webapp allows users to input how data is stored within CAN frames using the following options (examples are given for transmission of throttle position data):
            - Data Channel (String): "Throttle Position"
            - CAN ID (Hex number): 0x230
            - Message Length (bits): 16
            - Message offset (bits): 0
            - Adder (int): 0
            - Multiplier (int): 1
            - Unit (String): "%"

<b>2.  Data storage</b>
    1.  Live data is stored in a Firebase realtime database. 
    2.  Web server data is stored in Firestore database.
        
<b>3.  Data Visualization</b>
    1.  A default dashboard page containing various widgets (e.g., graphs, gauges, number displays) appears when users first open the page.
    2.  A text box says “Connected” if data is currently streaming to the database, and “Not Connected” otherwise.
    3.  If “<ins>Connected</ins>”:
        1.  Widgets automatically populate with live data.
        2.  If there are any new CAN IDs from the database (meaning that the ECU settings have been changed to transmit different data), a data assignment window appears where the user can specify what data the new CAN ID’s correspond to. This will require the TFR team to look at the ECU software, especially the first time the webpage is used.
        3.  Users can scrub to previous timestamps to see past data within a session.
    4.  If “<ins>Not Connected</ins>”:
        1.  If no data has been streamning recently:
            1.  A pop-up gives the user a list of reasons data is not streaming. It has a “Do not show this message again” checkbox.
            2.  Widgets still appear but indicate that data is unavailable (through text or color).
        2.  If live data was just streaming but has stopped (eg., the car has turned off):
            1. A pop-up gives the user the option to delete the data that just streamed, download it as a CSV, or continue viewing it.
    5.  Widgets are customizable.
        1.  Each has a button to open a component editor with options to change:
            1.  Data channel displayed
            2.  Data label
            3.  Display component type (linear gauge, radial gauge, time-series graph, numerical, warning)
            4.  Unit of measurement (e.g., mph to kph)                
            5.  Minimum & maximum values (for non-numerical components)                
            6.  Color (for certain components, like line graphs)
            7.  Trigger threshold (for warnings)
        2.  There is an “insert new display” button which adds a component onto the screen and opens the component editor.            
        3.  Widgets can be dragged and dropped to different locations on the screen.            
        4.  Widgets can be resized.            
        5.  Widgets can be deleted.            
    6.  There is a menu for various layout/data related options.        
        1.  Save recent data - users can download data from a specified timeline for later viewing.             
        2.  Save layout - saves dashboard layout             
        3.  Open layout - prompts user to browse for a saved layout

## Nonfunctional Requirements <!--low level-->
1.  <b>Performance</b>
    1.  Telemetry data have no more than .500 ms latency.
    2.  Data can transmit up to 500m away.
2.  <b>Usability of Website</b>
    1.  No contact required between Capstone team and TFR team - Any information required to use the website is included as written instructions on the webpage. 
    2.  Layouts and data are available to all team members to facilitate sharing.
    3.  Data channels are easily exportable to CSV file.
    4.  Multiple users can view live data at once.
3.  <b>Integration with TFR car</b>
    1.  Telemetry device connects to the vehicle wiring harness with a single standard automotive connector (Deutsch DTM connector)
    2.  Connector will have wires for 12V power & ground, 5V power, CAN high and low
    2.  Deivce weighs under 1.5 lbs.
4.  <b>Robustness</b>
    1.  Device casing is waterproof (can be run underwater without any leakage).
    2.  Device casing is vibration proof (components are secured to case and device has padding).
5.  <b>Testing/Proof of Concept</b>
    1.  System capability will be tested and demonstrated with an RC car.
    2.  RC car will have an MCU, can transceiver, battery, and two basic sensors to simulate racecar communication and power.
    3.  Telemetry device can plug directly into RC car as it would the real harness.
    4.  RC car data transmission will be tested from 0-500 m away to measure latency. 