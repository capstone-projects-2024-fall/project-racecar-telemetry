---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements 

Racecar Telemetry will require using a socket for wireless communication between the device and the monitors in the pit crew. The driver can also have a computer they can use to connect to the device. 

Socket should be opened on a raspberry Pi on a local network. Using the internet may be a security risk as other teams may try to intercept information of vehicles that are not their own. 

Initially, work on public network for proof of concept. 

When opening the app on a monitor, the user should have a UI that allows them to read live data. 

Home page contains profiles such as Eco-Mode and performance boost. 

Home page contains option to look at live readings from ECU. 

Home screen is mainly made up of options. 

The graphs for the live readings should show performance over the last 5 minutes.  

A general overview is available where you can see performance over a whole “test drive”. 

The graphs have an option to click-drag a threshold or manually entered threshould for an alarm. 

Alarms can be set if values fall out of a specified range. 

Users will be able to move the graphs to customize their screen. That way they can see the ones they want easily. 

Users can create a custom HUD where only graphs they select are shown 

Users can save profiles for monitoring different graphs. 

Data is automatically sent to a database to be saved. 

 

## Nonfunctional Requirements 

Racecar Telemetry will have an intuitive user-friendly interface. 

Live readings of different data points from the ECU will be displayed on graphs. 

Users will be able to clearly read and see the data the car is outputting in real time. 

Users will be able to adjust values within the ECU and other computers in the vehicle.  

 

The user may set alerts for certain readings if they go outside of custom set parameters, or the crew can monitor live data for the driver as they race. 

The user will see an alert if temperatures climb above acceptable operating ranges. 

Crew can monitor trigger gear, camshaft timing, and crankshaft timing to ensure there are no issues with timing in real time. 

To increase user friendliness, preset profiles for performance or fuel-saving can be made. 

Wireless communication will be used to transmit data to the crew for easy reading. 
