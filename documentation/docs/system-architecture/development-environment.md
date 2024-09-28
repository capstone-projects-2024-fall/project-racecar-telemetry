---
sidebar_position: 4
---

# Development Environment  

## Hardware Requirements  
# Telemetry Hardware  
- CAN Transceiver (2x): SN65HVD23x    
- Microprocessor: ESP32-ETHERNET-KIT-VE   
- Wireless Transmitter: Ubiquity UniFi Access Point AC Mesh   
- POE (Power over Ethernet) Injector: Tycon Gigabit HP PoE Inserter/Splitter   
- Second microprocessor (for test bench): ESP32   
- Additional electrical hardware, such as connectors, jumper wires, ethernet cables. 
  
## Software Requirements  
### IDE     
- Visual Studio Code  
- Github Codespaces  
- Arduino IDE    
### Programming Languages & Libraries    
- Next.js/Node.js:      Main frameworks for developing the web application.  
- Firebase SDK:         For data storage and real-time database connectivity.  
- Chart.js or Recharts: For creating graphs and charts.  
- Socket.io:            For handling real-time data streaming if needed.
### Database
Firebase: for storing telemetry data. 
### Testing    
Postman: API testing.    

## Tasks and Effort Map

| **Task**                                 | **Description**                                          | **Estimated Effort** | **Status**    |
|------------------------------------------|--------------------------------------------------------|----------------------|---------------|
| Hardware Setup                           | Assembling sensors, Raspberry Pi, and OBD-II Interface  | 4 hours              | Not Started   |
| IDE Installation (VSCode)                | Installing Visual Studio Code                           | 1 hour               | Completed     |
| Next.js/Node.js Setup                    | Setting up the Next.js and Node.js environment          | 2 hours              | Completed     |
| Firebase Project Setup                   | Creating and configuring a Firebase project             | 2 hours              | Not Started   |
| Firebase SDK Integration                 | Integrating Firebase with Next.js/Node.js               | 3 hours              | Not Started   |
| Real-Time Data Collection Setup          | Configuring sensors and Raspberry Pi to send data       | 3 hours              | Not Started   |
| Graphing Library Setup (Chart.js)        | Installing and configuring Chart.js/Recharts            | 2 hours              | Not Started   |
| Data Visualization Development           | Developing real-time data graphs in Next.js             | 5 hours              | Not Started   |
| Version Control Setup (GitHub)           | Initializing Git repository and pushing code            | 1 hour               | Completed     |

