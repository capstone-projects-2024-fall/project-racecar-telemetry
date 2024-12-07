---
sidebar_position: 2
---

# System Block Diagram

![system diagram](/img/system_block_diagram.png)  
**Figure 1.** High level design of the RCT

## Description
Our project will consist of several key components: the Vehicle Components, Cloud Server Side Component, and Frontend Web Component.

### Vehicle Components
- ESP32 for transmitting data to database.
- Hotspot for ESP32 to have internet connection.
- ECU reads all sensor data and sends CAN packets to Feather M4 for processing.
- Feather M4 processes CAN data into readable messages.

### Server Side
- Firebase will store real time data.
- Firestore for storing historic data.
- Next.js for website.

### Front-end
- Next.js for website to fetch and display sensor data.


