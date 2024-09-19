---
sidebar_position: 4
---

# Features and Requirements 

## Functional Requirements <!--high level-->
* Live readings of different data points from the ECU will be displayed on graphs.

* Users will be able to adjust values within the ECU and other computers in the vehicle.  

* Racecar Telemetry will have an intuitive user-friendly interface. 

* When opening the app on a monitor, the user should have a UI that allows them to read live data. 

* Home page contains profiles such as Eco-Mode and performance boost. 

* Home page contains option to look at live readings from ECU. 

* Home screen is mainly made up of options. 

* The graphs for the live readings should show performance over the last 5 minutes.  

* A general overview is available where you can see performance over a whole “test drive”. 

* Alarms can be set if values fall out of a specified range. 

* Users will be able to move the graphs to customize their screen. That way they can see the ones they want easily. 

* Users can create a custom HUD where only graphs they select are shown 

* Users can save profiles for monitoring different graphs. 

* Data is automatically sent to a database to be saved. 

* To increase user friendliness, preset profiles for performance or fuel-saving can be made.

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