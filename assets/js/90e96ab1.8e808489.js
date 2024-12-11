"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[2418],{8243:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=t(74848),s=t(28453);const i={},r=void 0,o={id:"system-architecture/Sequence Diagrams",title:"Sequence Diagrams",description:"Use Case 0 - Device Initial Setup",source:"@site/docs/system-architecture/Sequence Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Sequence Diagrams",permalink:"/project-racecar-telemetry/docs/system-architecture/Sequence Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/system-architecture/Sequence Diagrams.md",tags:[],version:"current",lastUpdatedBy:"Jacky",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Cloud Database Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Cloud_DB_Design"},next:{title:"API Specification",permalink:"/project-racecar-telemetry/docs/category/api-specification"}},c={},l=[{value:"Use Case 0 - Device Initial Setup",id:"use-case-0---device-initial-setup",level:3},{value:"Use Case 1 - CAN Configuration",id:"use-case-1---can-configuration",level:3},{value:"Use Case 2 - Viewing Live Data",id:"use-case-2---viewing-live-data",level:3},{value:"Use Case 3 - Inserting Display Conmponents",id:"use-case-3---inserting-display-conmponents",level:3},{value:"Use Case 4 - Editing Displays",id:"use-case-4---editing-displays",level:3},{value:"Use Case 5 - Multi-user Viewing",id:"use-case-5---multi-user-viewing",level:3}];function d(e){const n={em:"em",h3:"h3",li:"li",mermaid:"mermaid",ol:"ol",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h3,{id:"use-case-0---device-initial-setup",children:"Use Case 0 - Device Initial Setup"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"User follows instructions for initial setup of up telemetry device."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User opens the telemetry website to the default dashboard page."}),"\n",(0,a.jsx)(n.li,{children:"A pop-up appears with instructions on how to set up the telemetry device for the first time, including installation of the device in the vehicle."}),"\n",(0,a.jsx)(n.li,{children:"Following the instructions, user plugs the telemetry device into a connector on the car\u2019s wiring harness (the connector contains pins for 5V power, ground, CAN high and CAN low)."}),"\n",(0,a.jsx)(n.li,{children:"User closes out of the instructions pop-up."}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\nactor User\nparticipant Default Dash\n\nUser -) Default Dash: User opens Default Dashboard page\nactivate User\nactivate Default Dash\nDefault Dash --) User: Initial setup instructions\ndeactivate Default Dash\nUser -) Telemetry Device: User plugs telemetry device into car\ndeactivate User\n"}),"\n",(0,a.jsx)(n.h3,{id:"use-case-1---can-configuration",children:"Use Case 1 - CAN Configuration"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"User edits ECU and webapp CAN configurations to transmit/receive data channels."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User configures the vehicle's ECU (engine control unit) to transmit desired data over CAN IDs between 0x200-0x300."}),"\n",(0,a.jsx)(n.li,{children:"User opens the telemetry webapp and opens the CAN Configuration page from the navbar."}),"\n",(0,a.jsx)(n.li,{children:"User is able to choose a previously created configuration or create a new one."}),"\n",(0,a.jsxs)(n.li,{children:["When creating new configuration, user can assign CANID and number of signals incoming from ECU.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"For each data channel, user provides the channel name, start bit, bit length, adder, multiplier, and unit."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:'sequenceDiagram\nactor User\nparticipant ECU\nparticipant CAN Config\nparticipant Firestore\n\nUser -) ECU: Configure ECU to send desired CAN data.\nactivate User\nactivate ECU\nECU --) User: \ndeactivate ECU\nUser -) CAN Config: Enter new config name, clicks "Create"\nactivate CAN Config\nCAN Config -) Firestore: Save config name\nactivate Firestore\nFirestore --) CAN Config: success\ndeactivate Firestore\nCAN Config --) User: Show config editor\nUser -) CAN Config: Click "Add Row"\nCAN Config --) User: Show CAN ID/signal editor\nUser -) CAN Config: Enter CAN ID, # of Signals, click "Edit Signal Info"\nCAN Config -) User: Show Edit Signal Info popup window\nUser -) CAN Config: Enter configuration info for each data channel, click "Save Changes"\nCAN Config -) Firestore: Save configuration data\nactivate Firestore\nFirestore --) CAN Config: Success\ndeactivate Firestore\nCAN Config --) User: Show popup "Data saved successfully"\ndeactivate CAN Config\ndeactivate User'}),"\n",(0,a.jsx)(n.p,{children:"Note: All other use cases assume that case 0 and 1 (first time setup) has occurred."}),"\n",(0,a.jsx)(n.h3,{id:"use-case-2---viewing-live-data",children:"Use Case 2 - Viewing Live Data"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"User views live data on default dashboard page."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:['User opens the telemetry webapp, where they see a default dashboard page. It displays "Not Connected", and shows the following default displays (which are visible but empty, as no data is transmitting):',"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:'"Chips" for each data channel being transmitted across the top of the screen (this persists throughout all pages)'}),"\n",(0,a.jsx)(n.li,{children:"A time-series graph of engine coolant temperature"}),"\n",(0,a.jsx)(n.li,{children:"A time-series graph of engine speed (RPM)"}),"\n",(0,a.jsx)(n.li,{children:"A number for battery voltage"}),"\n",(0,a.jsx)(n.li,{children:"A linear gauge for throttle position"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.li,{children:"User selects the current CAN configuration from a menu."}),"\n",(0,a.jsx)(n.li,{children:"A driver turns on the car, beginning data transmission, which causes the display to change to \u201cConnected.\u201d The display components populate with live numbers."}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:'sequenceDiagram\nactor User\nparticipant Dash\nparticipant Firestore\nparticipant Realtime\nparticipant ESP32\nparticipant FeatherM4\n\nUser -) Dash: Open Default Dashboard page, select CAN Configuration from menu\nactivate User\nactivate Dash\nUser -) Dash: Select a CAN Configuration from menu\nDash -) Firestore: Update Current Configuration\nactivate Firestore\nFirestore -) Dash: Success\ndeactivate Firestore\nDash --) User: show "Not connected" page with blank displays\nUser -) Car: Turn on car\nactivate Car\nCar -) ESP32: Power on ESP32\nactivate ESP32\nESP32 -) Firestore: Retrieve current CAN Configuration\nactivate Firestore\nFirestore --) ESP32: Current CAN Configuration\ndeactivate Firestore\nloop While car is running\n    Car -) FeatherM4: Transmit CAN packets\n    FeatherM4 -) FeatherM4: Filter CAN packets by ID\n    FeatherM4 -) ESP32: Transmit CAN packets via i2C\n    ESP32 --) featherM4: successs\n    ESP32 -) ESP32: Translate CAN packets to JSON of data channels\n    ESP32 -) Realtime: Upload JSON of data channels\n    activate Realtime\n    Realtime --) ESP32: Success\n    Dash -) Realtime: Retrieve data channels for current config\n    Realtime --) Dash: Data channels\n    deactivate Realtime\n    Dash -) User: Show live data channels via data displays\nend\ndeactivate Car\ndeactivate Dash\ndeactivate User\ndeactivate ESP32\n'}),"\n",(0,a.jsx)(n.h3,{id:"use-case-3---inserting-display-conmponents",children:"Use Case 3 - Inserting Display Conmponents"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"User inserts new display components on custom dashboard page."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User opens the telemetry webapp to the default dashboard page (Not Connected)."}),"\n",(0,a.jsx)(n.li,{children:'User clicks the "Add Row" button. Insert number of components in row.'}),"\n",(0,a.jsx)(n.li,{children:'User chooses "+" sign to assign: Component type, CAN ID, data channel, etc.'}),"\n",(0,a.jsx)(n.li,{children:"The new component appears on the dashboard."}),"\n",(0,a.jsx)(n.li,{children:"When the page says \u201cConnected,\u201d the new graphs also populate with live data."}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:'sequenceDiagram\nactor User\nparticipant Dash\n\nUser -) Dash: Click "Add Row" (number of components)\nactivate User\nactivate Dash\nDash --) User: Show row with specified number of placeholder components\nUser -) Dash: Click "+" sign to add a component (type, CAN ID, data channel, scale, color)\nDash --) User: Show specified component\nDash -) Realtime: Retrieve live data channel\nactivate Realtime\nRealtime --) Dash: current data channel value\ndeactivate Realtime\nDash --) User: Live data on display\ndeactivate User\ndeactivate Dash\n'}),"\n",(0,a.jsx)(n.h3,{id:"use-case-4---editing-displays",children:"Use Case 4 - Editing Displays"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"User edits existing components on the dashboard."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User clicks the settings button on existing component, bringing up the component editor."}),"\n",(0,a.jsx)(n.li,{children:"User changes the data channel. For example, from battery voltage to fuel pressure, and the max display value to 100."}),"\n",(0,a.jsx)(n.li,{children:"User deletes the throttle position display."}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\n\nactor User\nparticipant Dash\n\nUser -) Dash: Click Settings icon\nactivate User\nactivate Dash\nDash --) User: Show component editor window\nUser -) Dash: Select different component settings (data channel, scale, color, unit)\nDash --) User: Show new component\nDash -) Realtime: Retrieve live data channel\nactivate Realtime\nRealtime --) Dash: current data channel value\ndeactivate Realtime\nDash --) User: Live data on display\ndeactivate User\ndeactivate Dash\n"}),"\n",(0,a.jsx)(n.h3,{id:"use-case-5---multi-user-viewing",children:"Use Case 5 - Multi-user Viewing"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"Two users view website at the same time."})}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User 1 opens the telemetry webapp to the CAN Configuration page."}),"\n",(0,a.jsx)(n.li,{children:'User 1 creates a new CAN Configuration called "TFR Config".'}),"\n",(0,a.jsx)(n.li,{children:"Users 1 and 2 opens the telemetry webapp to the default dashboard on their own devices."}),"\n",(0,a.jsx)(n.li,{children:'User 2 selects "TFR Config" from the list of configurations.'}),"\n",(0,a.jsx)(n.li,{children:"User 1 adds new components to their dashboard."}),"\n",(0,a.jsx)(n.li,{children:"User 2 adds new components (different than User 1) to their dashboard."}),"\n",(0,a.jsx)(n.li,{children:"User 1 turns the car on."}),"\n",(0,a.jsx)(n.li,{children:"Users see live data."}),"\n"]}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\n\nactor User 1\nactor User 2\nparticipant Dash 1\nparticipant Dash 2\n\nUser 1 -) Config: Open CAN Configuration page and create a new configuration (TFR Config)\nactivate Config\nactivate User 1\nConfig -) Firestore: Save TFR Config\nactivate Firestore\nFirestore --) Config: success\ndeactivate Firestore\nConfig --) User 1: Saved configuration successfully\ndeactivate Config\nUser 1 -) Dash 1: Select TFR Config\nactivate Dash 1\nDash 1 -) Firestore: update current configuration\nactivate Firestore\nFirestore --) Dash 1: success\ndeactivate Firestore\nUser 1 -) Dash 1: Add/edit new components\nDash 1 --) User 1: Show new components\nUser 2 -) Dash 2: Open dashboard, add new components\nactivate User 2\nactivate Dash 2\nDash 2 --) User 2: Show new components\ndeactivate User 2\ndeactivate Dash 2\n\ndeactivate Dash 1\ndeactivate User 1  \n"}),"\n",(0,a.jsx)(n.p,{children:"actor User1\nactor User2\nparticipant Dashboard1"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var a=t(96540);const s={},i=a.createContext(s);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);