---
sidebar_position: 4
---

# Development Environment  

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



# General Requirements

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

### Dependencies
- @dnd-kit/core@^6.1.0
- @dnd-kit/sortable@^8.0.0
- @emotion/react@^11.13.3
- @emotion/styled@^11.13.0
- @mui/icons-material@^6.1.7
- @mui/material@^6.1.7
- firebase@^10.14.1
- next@14.2.11
- plotly.js@^2.35.2
- react@^18
- react-dom@^18
- react-plotly.js@^2.6.0
- react-scripts@^5.0.1
- @testing-library/jest-dom@^6.5.0
- @testing-library/react@^16.0.1
- @types/node@^20
- @types/react@^18
- @types/react-dom@^18
- eslint@^8
- eslint-config-next@14.2.11
- jest@^29.7.0
- jest-environment-jsdom@^29.7.0
- postcss@^8
- tailwindcss@^3.4.1
- typescript@^4.9.5

### Microcontroller Libraries
Arduino Wire (2.1): facilitates serial communication between two i2c devices
Adafruit_CAN (0.2.1): enables CAN communication for Adafruit M4 Feather CAN
Arduino WiFi (1.2.7): enables WiFi communication for ESP32
Arduino HttpClient (2.2.0): facilitates communication between ESP32 and web server
ArduinoJson (2.7.1): handles JSON object creation/interpretation on ESP32

### Database
Firebase: for storing telemetry data. 
### Testing    
Postman: API testing.  
