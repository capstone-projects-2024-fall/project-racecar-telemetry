---
sidebar_position: 5
---

# Use-case descriptions

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

## Case 7
_The new TFR ergonomics lead wants to view information relevant to vehicle handling and driver performance during a run._
1. The ergonomics lead navigates to the TFR telemetry webpage, where she is prompted to log in or sign up for an account.
2. She creates an account.
3. She is redirected to the default dashboard page, which displays "Not Connected" (since the car is off), and several blank graphs and gauges.
4. She deletes all of the existing graphs.
5. She clicks the "Insert New Display" button, which brings up a menu of options to create a new dashboard display component.
6. She enters options to view time series plot of the front and rear brake pressure sensor readings, keeping default colors and changing the unit from PSI to kPa, and then clicks "Save". 
7. This new brake pressure plot populates on the dashboard. She drags it to the top left of the screen.
8. She repeats this process twice, adding a gauge for RPM and numerical displays for both throttle position and steering angle,  and dragging them to other places on the dashboard.
9. The car is switched on, providing power to the telemetry device. The ergonomics lead sees that the page says "Connected," and that live sensor data populates the display components.
10. A driver completes an acceleration run while the ergonomics lead monitors performance.
11. When the driver finishes their run, the ergonomics lead immediately shows them the dashboard, using the progress bar at the bottom of the dashboard to scrub backwards and indicate where they shifted into third gear too early. 
12. The driver completes another acceleration run, shifts later, and shaves 0.1 seconds off of their previous time.