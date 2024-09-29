---
sidebar_position: 4
---

# Development Environment  

## Hardware Requirements  
### Main Telemetry Device Hardware Components
- CAN Transceiver: TJA1050  
- Microprocessor: ESP-WROOM32-DEVKITV1
- Smartphone with mobile hotspot capability

### Complete Hardware Requirements
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&headers=false" frameborder="0" width="100%" height="500"></iframe>
  
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
| Hardware Setup (Telemetry Device)        | Wiring & packaging ESP32, CAN transceiver, and connector | 2 hours              | Not Started   |
| Hardware Setup (Test Bench)              | Wiring additional ESP32, transceiver, connector, and terminal resistor to enable device testing    | 2 hours              | Not Started   |
| IDE Installation (VSCode)                | Installing Visual Studio Code                           | 1 hour               | Completed     |
| Next.js/Node.js Setup                    | Setting up the Next.js and Node.js environment          | 2 hours              | Completed     |
| Firebase Project Setup                   | Creating and configuring a Firebase project             | 2 hours              | Not Started   |
| Firebase SDK Integration                 | Integrating Firebase with Next.js/Node.js               | 3 hours              | Not Started   |
| Real-Time Data Collection Setup          | Configuring ESP32 to transmit data to database          | 3 hours              | Not Started   |
| Graphing Library Setup (Chart.js)        | Installing and configuring Chart.js/Recharts            | 2 hours              | Not Started   |
| Data Visualization Development           | Developing real-time data graphs in Next.js             | 5 hours              | Not Started   |
| Version Control Setup (GitHub)           | Initializing Git repository and pushing code            | 1 hour               | Completed     |

