---
sidebar_position: 4
---

# Features and Requirements 

## Functional Requirements <!--high level-->
<b>1.  Data collection & transmission</b>
    1.  A device plugs into the vehicles communication area network (CAN) bus to receive sensor & diagnostic information from the engine control unit (ECU).
        1.  The device contains a microcontroller, CAN transceiver, and hardware to plug into a standard automotive connector on the vehicle.
    2.  A smartphone with hotspot capability is placed in the vehicle to provide a WiFi access point to the device.
    3.  A microcontroller within the device parses CAN frames and uploads formatted data to a cloud database.
        1.  Note: Every piece of data transmitted over CAN has its own CAN ID but not a label, so the data in the webpage will have to be associated with meanings at a later stage.

<b>2.  Data storage</b>
    1.  Data is stored in a cloud database. 
        
<b>3.  Data Visualization</b>
    1.  A default dashboard page containing various widgets (e.g., graphs, gauges, number displays) appears when users first open the page.
    2.  A text box says “Connected” if data is currently streaming to the database, and “Not Connected” otherwise.
    3.  If “<ins>Connected</ins>”:
        1.  Widgets automatically populate with live data.
        2.  If there are any new CAN IDs from the database (meaning that the ECU settings have been changed to transmit different data), a data assignment window appears where the user can specify what data the new CAN ID’s correspond to. This will require the TFR team to look at the ECU software, especially the first time the webpage is used.
        3.  A progress bar allows users to scrub to previous timestamps to see past data within a session.
    4.  If “<ins>Not Connected</ins>”:
        1.  A pop-up gives the user a list of reasons data is not streaming. It has a “Do not show this message again” checkbox.
        2.  Widgets still appear but indicate that data is unavailable (through text or color).
    5.  Widgets are customizable.
        1.  Each has a button to open a component editor with options to change:
            1.  Data channel displayed
            2.  Data label
            3.  Display component type (e.g., change from a linear to radial gauge)
            4.  Unit of measurement (e.g., mph to kph)                
            5.  Minimum & maximum values (for non-numerical components)                
            6.  Color (for certain components, like line graphs)
        2.  There is an “insert new display” button which adds a component onto the screen and opens the component editor.            
        3.  Widgets can be dragged and dropped to different locations on the screen.            
        4.  Widgets can be resized.            
        5.  Widgets can be deleted.            
    6.  There is a menu for various layout/data related options.        
        1.  Save recent data - users can download data from a specified timeline for later viewing.             
        2.  Open data file - prompts the user to browse for a downloaded data file to view/            
        3.  Save layout - saves dashboard layout             
        4.  Open layout - prompts user to browse for a saved layout

## Nonfunctional Requirements <!--low level-->

* The graphs have an option to click-drag a threshold or manually entered threshould for an alarm. 

* Initially, work on public network for proof of concept. 

* Socket should be opened on a raspberry Pi on a local network. Using the internet may be a security risk as other teams may try to intercept information of vehicles that are not their own.  

* Information from the ECU will be read by plugging the Pi into the ECU.

* Delay of reading the data point and showing up to read is no more than 1 second.

* Racecar Telemetry will require using a socket for wireless communication between the device and the monitors in the pit crew. The driver can also have a computer they can use to connect to the device.  

* The user may set alerts for certain readings if they go outside of custom set parameters, or the crew can monitor live data for the driver as they race.  

* Data will be stored on cloud for easy access by crew.  

* Wireless communication will be used to transmit data to the crew for easy reading. 

* Data processing can be done using Flask (tentative) 