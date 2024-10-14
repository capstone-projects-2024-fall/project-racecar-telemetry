---
sidebar_position: 1
---

![system diagram](/img/system_block_diagram.png)  
**Figure 1.** High level design of the RCT

The overall design is best understood through following a single piece of data from when a signal is produced by a sensor to when the user sees a number on the webpage. The data must be translated through various forms over multiple devices and the cloud before it reaches the user. 

This example will show how Throttle Position would be transmitted from the car to the webpage. Steps 1 and 2a are NOT a part of this project specifically since it already exists in the TFR car. It is shown here to complete the understanding of the data involved.

1. **Rotary potentiometer** mounted to the throttle body captures an **analog voltage signal** of **2.5** that changes as the throttle valve is opened or closed. The analog signal is transmitted to the ECU with a wire.
2. **Engine Control Unit (ECU)**: 
    - uses a calibration table to transform the analog signal from a voltage into a **percentage**, where 0% is fully closed throttle and 100% is wide open. The transformation results in a reading of **50%** throttle. 
    - is configured by the TFR team to transmit Throttle Position using a **CAN message**
        - Team will choose a CAN ID between 0x200 and 0x300 (for the purposes of this project, to simplify filtering relevant CAN messages in telemetry device code). In this example, the team selects ID **0x230**.
        - Every CAN message has 64 bits available to transmit data, and the team can determine how the message will be sent by specifying start bit, bit length, multiplier, and adder. The team chooses the following options:
            - Start bit: 0
            - Bit length: 16
            - Adder: 0
            - Multiplier: 0
        - These settings result in the following CAN message. In reality, more of the 64 bits can be utilized. 

| Timestamp     | CAN ID    | Length    | Message    |
| ------        | -------   | --------- | --------  |   
| 13.45436      | 0x230     | 8         | 32 00 00 00 00 00 00 00 |

    - The ECU's internal circuitry converts this CAN message into a **differential voltage signal** and transmits that signal over the CAN bus.

3. In the telemetry device, the CAN transceiver is wired to 