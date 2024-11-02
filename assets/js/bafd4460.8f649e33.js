"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6024],{39553:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=i(74848),s=i(28453);const r={sidebar_position:4},a="Features and Requirements",l={id:"requirements/features-and-requirements",title:"Features and Requirements",description:"Functional Requirements",source:"@site/docs/requirements/features-and-requirements.md",sourceDirName:"requirements",slug:"/requirements/features-and-requirements",permalink:"/project-racecar-telemetry/docs/requirements/features-and-requirements",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/requirements/features-and-requirements.md",tags:[],version:"current",lastUpdatedBy:"dennis-yeom",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"General Requirements",permalink:"/project-racecar-telemetry/docs/requirements/general-requirements"},next:{title:"Use-Case Descriptions",permalink:"/project-racecar-telemetry/docs/requirements/use-case-descriptions"}},o={},c=[{value:"Functional Requirements ",id:"functional-requirements-",level:2},{value:"Nonfunctional Requirements ",id:"nonfunctional-requirements-",level:2}];function d(e){const n={h1:"h1",h2:"h2",li:"li",ol:"ol",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"features-and-requirements",children:"Features and Requirements"}),"\n",(0,t.jsx)(n.h2,{id:"functional-requirements-",children:"Functional Requirements "}),"\n",(0,t.jsx)("b",{children:"1.  Data collection & transmission"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["A device plugs into the vehicles communication area network (CAN) bus to receive sensor & diagnostic information from the engine control unit (ECU).","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"The device contains a microcontroller, CAN transceiver, and hardware to plug into a standard automotive connector on the vehicle."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"A smartphone with hotspot capability is placed in the vehicle to provide a WiFi access point for the telemetry device."}),"\n",(0,t.jsx)(n.li,{children:"A microcontroller within the device filters incoming CAN frames and uploads relevant CAN IDs to a database (for the purposes of the project, the TFR team will be instructed to only use CAN IDs 0x200-0x300 to transmit data)."}),"\n",(0,t.jsxs)(n.li,{children:["A CAN Configuration page on the webapp allows users to input how data is stored within CAN frames using the following options (examples are given for transmission of throttle position data):","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Data Channel (String): "Throttle Position"'}),"\n",(0,t.jsx)(n.li,{children:"CAN ID (Hex number): 0x230"}),"\n",(0,t.jsx)(n.li,{children:"Message Length (bits): 16"}),"\n",(0,t.jsx)(n.li,{children:"Message offset (bits): 0"}),"\n",(0,t.jsx)(n.li,{children:"Adder (int): 0"}),"\n",(0,t.jsx)(n.li,{children:"Multiplier (int): 1"}),"\n",(0,t.jsx)(n.li,{children:'Unit (String): "%"'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)("b",{children:"2.  Data storage"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Live data is stored in a Firebase realtime database.\xa0"}),"\n",(0,t.jsx)(n.li,{children:"Web server data is stored in Firestore database."}),"\n"]}),"\n",(0,t.jsx)("b",{children:"3.  Data Visualization"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"A default dashboard page containing various widgets (e.g., graphs, gauges, number displays) appears when users first open the page."}),"\n",(0,t.jsx)(n.li,{children:"A text box says \u201cConnected\u201d if data is currently streaming to the database, and \u201cNot Connected\u201d otherwise."}),"\n",(0,t.jsxs)(n.li,{children:["If \u201c",(0,t.jsx)("ins",{children:"Connected"}),"\u201d:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Widgets automatically populate with live data."}),"\n",(0,t.jsx)(n.li,{children:"If there are any new CAN IDs from the database (meaning that the ECU settings have been changed to transmit different data), a data assignment window appears where the user can specify what data the new CAN ID\u2019s correspond to. This will require the TFR team to look at the ECU software, especially the first time the webpage is used."}),"\n",(0,t.jsx)(n.li,{children:"Users can scrub to previous timestamps to see past data within a session."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["If \u201c",(0,t.jsx)("ins",{children:"Not Connected"}),"\u201d:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["If no data has been streamning recently:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"A pop-up gives the user a list of reasons data is not streaming. It has a \u201cDo not show this message again\u201d checkbox."}),"\n",(0,t.jsx)(n.li,{children:"Widgets still appear but indicate that data is unavailable (through text or color)."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["If live data was just streaming but has stopped (eg., the car has turned off):","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"A pop-up gives the user the option to delete the data that just streamed, download it as a CSV, or continue viewing it."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Widgets are customizable.","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Each has a button to open a component editor with options to change:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Data channel displayed"}),"\n",(0,t.jsx)(n.li,{children:"Data label"}),"\n",(0,t.jsx)(n.li,{children:"Display component type (linear gauge, radial gauge, time-series graph, numerical, warning)"}),"\n",(0,t.jsx)(n.li,{children:"Unit of measurement (e.g., mph to kph)"}),"\n",(0,t.jsx)(n.li,{children:"Minimum & maximum values (for non-numerical components)"}),"\n",(0,t.jsx)(n.li,{children:"Color (for certain components, like line graphs)"}),"\n",(0,t.jsx)(n.li,{children:"Trigger threshold (for warnings)"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"There is an \u201cinsert new display\u201d button which adds a component onto the screen and opens the component editor."}),"\n",(0,t.jsx)(n.li,{children:"Widgets can be dragged and dropped to different locations on the screen."}),"\n",(0,t.jsx)(n.li,{children:"Widgets can be resized."}),"\n",(0,t.jsx)(n.li,{children:"Widgets can be deleted."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["There is a menu for various layout/data related options.","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Save recent data - users can download data from a specified timeline for later viewing.\xa0"}),"\n",(0,t.jsx)(n.li,{children:"Save layout - saves dashboard layout\xa0"}),"\n",(0,t.jsx)(n.li,{children:"Open layout - prompts user to browse for a saved layout"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"nonfunctional-requirements-",children:"Nonfunctional Requirements "}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)("b",{children:"Performance"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Telemetry data have no more than .500 ms latency."}),"\n",(0,t.jsx)(n.li,{children:"Data can transmit up to 500m away."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)("b",{children:"Usability of Website"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"No contact required between Capstone team and TFR team - Any information required to use the website is included as written instructions on the webpage."}),"\n",(0,t.jsx)(n.li,{children:"Layouts and data are available to all team members to facilitate sharing."}),"\n",(0,t.jsx)(n.li,{children:"Data channels are easily exportable to CSV file."}),"\n",(0,t.jsx)(n.li,{children:"Multiple users can view live data at once."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)("b",{children:"Integration with TFR car"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Telemetry device connects to the vehicle wiring harness with a single standard automotive connector (Deutsch DTM connector)"}),"\n",(0,t.jsx)(n.li,{children:"Connector will have wires for 12V power & ground, 5V power, CAN high and low"}),"\n",(0,t.jsx)(n.li,{children:"Deivce weighs under 1.5 lbs."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)("b",{children:"Robustness"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Device casing is waterproof (can be run underwater without any leakage)."}),"\n",(0,t.jsx)(n.li,{children:"Device casing is vibration proof (components are secured to case and device has padding)."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)("b",{children:"Testing/Proof of Concept"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"System capability will be tested and demonstrated with an RC car."}),"\n",(0,t.jsx)(n.li,{children:"RC car will have an MCU, can transceiver, battery, and two basic sensors to simulate racecar communication and power."}),"\n",(0,t.jsx)(n.li,{children:"Telemetry device can plug directly into RC car as it would the real harness."}),"\n",(0,t.jsx)(n.li,{children:"RC car data transmission will be tested from 0-500 m away to measure latency."}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>l});var t=i(96540);const s={},r=t.createContext(s);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);