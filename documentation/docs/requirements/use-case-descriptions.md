---
sidebar_position: 5
---

# Use-Case Descriptions

### Case 0
_User sets up telemetry device for the first time._
1. User plugs the telemetry device into a connector on the car’s wiring harness (the connector contains pins for 12 power and ground, 5V power, CAN high and low).

### Case 1
_User edits ECU and webapp CAN configurations to transmit/receive data channels._
1. User configures the vehicle's ECU to transmit relevant data over CAN IDs between 0x200-0x300. First time setup should include:
    - Engine coolant temperature
    - Engine speed (RPM)
    - Battery voltage
    - Throttle position
2. User opens the telemetry webapp and opens the CAN ID configuration page from the navbar.
3. For every data channel transmitted from the ECU, the user adds a new row to the CAN configuration table and enters how it is being transmitted (including CAN ID, offset, length in bytes, adder, multiplier, and unit).

Note: All other use cases assume that case 0 and 1 (first time setup) has occurred.

### Case 2
_User views live data on default dashboard page._
1. User opens the telemetry webapp, where they see a default dashboard page. It displays "Not Connected", and shows the following default displays (which are visible but empty, as no data is transmitting):
    - A time-series graph of engine coolant temperature
    - A time-series graph of engine speed (RPM)
    - A number for battery voltage
    - A linear gauge for throttle position
2. A driver turns on the car, beginning data transmission, which causes the display to change to “Connected.” The display components populate with live numbers.
3. After the car has been on for thirty seconds, the live graphs start to automatically scroll to display the new data.
4. After the car has been on for a few minutes, the user scrubs back in time to view data from earlier in the run.
5. The driver turns the car off. A pop-up window appears, titled “Lost Connection!,” asking the user if they want to continue viewing the data from that run or clear the displays. 
6. User clicks “continue viewing,” and is able to scrub back in time throughout the run.
7. The user clicks “clear displays” to clear the data from the past run. 

### Case 3
_User inserts new display components on default dashboard page._
1. User configures the ECU and webapp to transmit/receive two additional data channels - Manifold Air Pressure (MAP) and Vehicle Speed - to the telemetry device over CAN.
2. User opens the telemetry webapp to the default dashboard page (Not Connected).
3. User clicks the "Insert New Display" button, which brings up a menu of options to create a new dashboard display component (component editor).
4. User chooses options to create a radial gauge for the channel MAP, and clicks “Save”.
5. The new gauge appears on the dashboard.
6. User clicks the "Insert New Display" button again.
7. User chooses options to create a time-series graph of vehicle speed. They change the options to make the color of the line graph orange, and edit the vertical scale to the range 0 to 100 mph.
8. The new time-series graph appears on the dashboard.
9. When the page says “Connected,” the new graphs also populate with live data.

### Case 4
_User edits existing components on the dashboard._
1. User configures the ECU and webapp to transmit/receive an additional data channel, Fuel Pressure.
2. User opens the telemetry webapp to default dashboard page (Not Connected).
3. User clicks the settings button on the default battery voltage display, bringing up the component editor.
4. User changes the data channel from battery voltage to fuel pressure, and the type of graph from a number to a linear gauge. 
5. User deletes the throttle position display.

### Case 5
_Two users view website at the same time._
1. User 1 opens the telemetry webapp to the default dashboard (Not Connected because the car is off).
2. A driver turns the car on, causing User 1’s page to switch to Connected.
3. User 2 opens the telemetry webapp to the default dashboard, and sees Connected since the car is on.
4. User 2 sees the same display as user 1 - live data as well as historical data from earlier in the run.


<!-- 
OLD USE CASES

## Case 1
_A race crew is testing their vehicle with their driver to make sure the car is performing well._     
1. Crew connects device to the electrical control unit (ECU).    
2. Driver gets into vehicle and ensure the device is turned on.    
3. Crew ensures data is being updated to monitors.    
4. Driver drives.    
5. Engine temperature starts to climb above normal operating range.   
6. Device relays temperature data to the crew.   
7. Device sends alert to driver and crew.   
8. Crew determines temperature is climbing too fast, tells driver to come into pit.    
9. Crew discovers a crack in the radiator/coolant leak.   
10. Crew replaces the radiator.   
11. Driver and crew retest.   


## Case 2 
_A crew recently installed a new part and want to make sure the vehicle is running smoothly._
1. Driver installs the device, connects it to the ECU. 
2. Driver drives.
3. Crew monitors horsepower as driver goes around the track.
4. Crew notices an increase in performance.
5. Vehicle is now tested and crew knows part was installed correctly.


## Case 3 
_A driver has been testing a vehicle. As he is driving, he notices some of the electrical components in the vehicle are flickering, a sign of a problematic battery._
1. Driver installs the device, connects it to the ECU. 
2. Driver drives.
3. Driver notices flickering issue.
4. Crew checks battery voltage readings, confirmed to be low.
5. Crew changes battery.
6. Driver retests vehicle.
 

## Case 4 
_Ian Applebaum is a weekend racer. It’s been a few months since he decided to go to the track, but he notices that his acceleration is a bit rough. The engine sounds uneven, potentially indicating that car has a timing issue. This can cause damage to the vehicle, so Ian decides to check his timing. Ian decides to work on it in the garage._
1. Ian installs the device into his vehicle. 
2. Ian opens his computer and accesses the device UI. 
3. Ian test drives his car. 
4. Ian accesses his timing data from the past couple months where there were no issues. 
5. Ian compares it with the most recent, problematic timing data. 
6. Ian attempts to fix problem by using old timing values to replace the new ones. 
7. Ian test drives the vehicle. 
8. The engine performs well and the sound is normal.
9. Ian takes his significant other for a date with the saved labor costs. 

## Case 5
_A driver is racing in Monaco, but there seems to be an issue. He has been driving for some time and notices that his fuel gauge is indicating that it is still full. Knowing that this cannot be correct, he radios his team about the issue._
1. Team installs the device.
2. Crew checks and maintains the vehicle. Everything is OK.
3. After the race starts, no issues are detected for the first 30 minutes.
4. Driver looks at his fuel gauge and notices it is indicating the tank is full. Needle is stuck.
5. Driver radios the pit crew about this issue. 
6. Team cross checks fuel levels with the live data being transmitted.
7. Team confirms with the driver that he is low on fuel and needs to make a pit stop whenever possible.
8. Driver relies on fuel readings from the team and completes race.

## Case 6
_A driver is getting ready for a race. It is known that tires perform better when hot._
1. Team installs device.
2. Team checks the tire temperature and notices that it is too cold for optimal performance.
3. Before the driver comes up to the starting line, he starts making zig zag patterns to increase friction and heat.
4. Team notifies the driver that the optimal temperature has been achieved and to head to the starting line.
5. Driver goes to starting line and race begins shortly.

<!-- ## Case 7
_A driver and his team decide that they must push their lead and floor it. This in turn causes the tires to increase in temperature too much and cause damage to the tires. The team gets a reading that the temperature of the tires have reached above safe levels. The crew tells the driver to come in for a pit stop and tire change._
1. Team installed device.
2. Race starts.
3. Driver takes lead and wants to capitalize. He floors it and lengthens the gap between him and his competitors.
4. The crew watching the tire temperature readings notice that the temperatures are almost at dangerous levels.
5. Team initiates pit stop and driver comes in.
6. Crew installs fresh tires.
7. Driver continues race. -->

<!-- ## Case 7
_The new TFR ergonomics lead wants to view information relevant to vehicle handling and driver performance during a run._
1. The ergonomics lead navigates to the TFR telemetry webpage, where she sees a default dashboard page. It displays "Not Connected" (since the car is off), and shows several blank graphs and gauges.
4. She deletes all of the existing graphs.
5. She clicks the "Insert New Display" button, which brings up a menu of options to create a new dashboard display component.
6. She enters options to view time series plot of the front and rear brake pressure sensor readings, keeping default colors and changing the unit from PSI to kPa, and then clicks "Save". 
7. This new brake pressure plot populates on the dashboard. She drags it to the top left of the screen.
8. She repeats this process twice, adding a gauge for RPM and numerical displays for both throttle position and steering angle,  and dragging them to other places on the dashboard.
9. The car is switched on, providing power to the telemetry device. The ergonomics lead sees that the page says "Connected," and that live sensor data populates the display components.
10. A driver completes an acceleration run while the ergonomics lead monitors performance.
11. When the driver finishes their run, the ergonomics lead immediately shows them the dashboard, using the progress bar at the bottom of the dashboard to scrub backwards and indicate where they shifted into third gear too early. 
12. The driver completes another acceleration run, shifts later, and shaves 0.1 seconds off of their previous time.

## Case 8
_The TFR team members want to review the performance of a test run that was completed last week._
1. User navigates to webpage. 
2. Member logs into account.
3. Member pulls up previous week's data.
4. Member clicks on the graph to adjust scope of graph.
5. Member enters time frame to analyze to get specific readings from certain time frame.
6. Graph displays only data from time frame.

## Case 9 
_A TFR team member wants to add and delete graphs are being displayed to the dashboard._
1. User navigates to webpage.
2. User logs into account and goes into the dashboard.
3. User clicks on the graph.
4. User deletes graph.
5. User adds new graph.
6. User adjusts values to change which sensor is being graphed in graph settings. -->