---
sidebar_position: 2
---
# Integration tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

### Use Case 1
_User edits ECU and webapp CAN configurations to transmit/receive data channels._
- Test cases check for the rendering of CAN Configuration inputs in the React DOM.

### Use Case 2
_User views live data on default dashboard page._
- Test cases mock the Telemetry Connected Status and check for proper display of the status in the React DOM.
- Test cases mock the DataGauge component to ensure it is visible.

### Use Case 3
_User inserts new display components on custom dashboard page._
- Test cases mock the MUI icons used to add and delete new components on dashboard.
- Ensures these buttons are rendered and able to be used.

### Use Case 4
_User edits existing components on the dashboard._
- Test cases ensure the dashboard can be edited by checking for the rendering and functionality of the delete component button.

### Use Case 5
_Two users view website at the same time._
- Test simulates two seperate instances of the dashboard and ensures that the Telemetry Connection Status stays consistent between them.

