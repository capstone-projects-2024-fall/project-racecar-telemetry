# Cloud Database Design
## Entity Realtional Diagram: 

```mermaid
erDiagram
    %%this shows the heiarchy of our Json tree in our FireBase- 
    %%real time database
    CAN_DATA ||--o{ CAN_ID : contains
    CAN_ID ||--o{ TIMESTAMP : records
    TIMESTAMP ||--o{ DATA : contains

    CAN_DATA {
        string canDataRoot "Root node for CAN data"
    }

    CAN_ID {
        string canID "CAN identifier (e.g., 200, 201)"
    }

    TIMESTAMP {
        string timestamp "Timestamp of data collection"
    }

    DATA {
        string data "Hexadecimal data from CAN"
        int length "Length of data"
    }

    ESP32 ||--o{ CAN_DATA : sends
```

### Why Firebase?
Firebase provides us with a real-time database which is useful for our functions. This facilitates live data streaming for retrieving data coming in the car in real time.

### Why Firestore?
Firestore allows us to access historical data for future analysis of data recorded by a car. This is also useful for us to have persisting CAN configurations for different users.

