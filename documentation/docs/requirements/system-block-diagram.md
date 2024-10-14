---
sidebar_position: 2
---

# System Block Diagram

![system diagram](/img/system_block_diagram.png)  
**Figure 1.** High level design of the RCT

## Description
Our project will consist of several key components: the Vehicle Components, Cloud Server Side Component, and Frontend Web Component.

The Vehicle Components will include the telemetry device embedded in the TFR car and a cell phone with hotspot. The car's existing sensors will collect real-time data such as engine speed and fuel pressure. This data will be processed by the ECU (Engine Control Unit) and transmitted via the CAN Bus to an ESP32 microcontroller. The ESP32 will send the sensor data through a hotspot connection to the cloud.

In the Cloud Server Side Component, the data will be stored in Firebase's Realtime Database, and the Next.js website will be hosted on Firebase Hosting.

The Frontend Web Component will include a Next.js website that fetches and displays real-time sensor data from the Firebase Realtime Database, providing users with a dynamic and up-to-date interface to monitor the car's performance.

