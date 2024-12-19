"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[9041],{17832:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>o});var i=r(74848),n=r(28453);const s={sidebar_position:2},a=void 0,c={id:"system-architecture/Hardware Design",title:"Hardware Design",description:"Telemetry Device",source:"@site/docs/system-architecture/Hardware Design.md",sourceDirName:"system-architecture",slug:"/system-architecture/Hardware Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Hardware Design",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/system-architecture/Hardware Design.md",tags:[],version:"current",lastUpdatedBy:"NasierF",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Webpage Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Webpage Design"},next:{title:"Development Environment",permalink:"/project-racecar-telemetry/docs/system-architecture/development-environment"}},d={},o=[{value:"Telemetry Device",id:"telemetry-device",level:2},{value:"Connector Pinout",id:"connector-pinout",level:3},{value:"Wiring Diagram",id:"wiring-diagram",level:3},{value:"Hardware Testing &amp; Integration",id:"hardware-testing--integration",level:2},{value:"RC Car",id:"rc-car",level:3},{value:"Wiring Diagram",id:"wiring-diagram-1",level:4},{value:"Complete Hardware Requirements",id:"complete-hardware-requirements",level:2}];function l(e){const t={em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"telemetry-device",children:"Telemetry Device"}),"\n",(0,i.jsx)(t.p,{children:"The telemetry device consists of a ESP32 and Feather M4 wired to a standard automotive connector that will be plugged directly into the vehicle's wiring harness. The telemetry device also requires a mobile hotspot to be in the car while transmitting data."}),"\n",(0,i.jsx)(t.p,{children:"Components:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"ESP-WROOM-32 DEVKITV1: ESP microcontroller (includes CAN controller but not a CAN transceiver)"}),"\n",(0,i.jsx)(t.li,{children:"Adafruit Feather M4 CAN Express with ATSAME51"}),"\n",(0,i.jsx)(t.li,{children:"1100 mAh LION battery"}),"\n",(0,i.jsx)(t.li,{children:"120 ohm Terminal Resistor"}),"\n",(0,i.jsx)(t.li,{children:"Mobile Hotspot"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"The CAN (Controller Area Network) bus is the TFR vehicle's serial communication bus, which is capable of transmitting sensor and diagnostic information from the vehicle's ECU (Engine control unit) to the telemetry device. The Adafruit Feather M4 CAN was selected for use because of its integrated CAN transceeiver and microcontroller, giving it the ability to interpret CAN frames from the car.\nAn ESP32 was selected because of its WiFi capability. The feather uses i2c protocol to transmit the interpreted CAN frames to the ESP32, and the ESP32 then handles pushing the data to the Firebase realtime database."}),"\n",(0,i.jsx)(t.h3,{id:"connector-pinout",children:"Connector Pinout"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"A DTM04-4P: 4 pin Deutsch Connector is connected to the Telemetry Device in order to plug into the TFR vehicle."})}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Color"}),(0,i.jsx)(t.th,{children:"Label"}),(0,i.jsx)(t.th,{children:"Meaning"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Black"}),(0,i.jsx)(t.td,{children:"GND"}),(0,i.jsx)(t.td,{children:"Connects to the vehicle's chassis ground."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Orange"}),(0,i.jsx)(t.td,{children:"5V_PWR"}),(0,i.jsx)(t.td,{children:"5V power supplied by vehicle's ECU (through an internal voltage regulator)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Yellow"}),(0,i.jsx)(t.td,{children:"CAN_HI"}),(0,i.jsx)(t.td,{children:"Vehicle CAN bus's CAN High wire."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Green"}),(0,i.jsx)(t.td,{children:"CAN_LO"}),(0,i.jsx)(t.td,{children:"Vehicle CAN bus's CAN low wire."})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"wiring-diagram",children:"Wiring Diagram"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"system diagram",src:r(29189).A+"",width:"613",height:"742"})}),"\n",(0,i.jsx)(t.h2,{id:"hardware-testing--integration",children:"Hardware Testing & Integration"}),"\n",(0,i.jsx)(t.h3,{id:"rc-car",children:"RC Car"}),"\n",(0,i.jsx)(t.p,{children:"An RC car will be used to test range and data transmission from the ESP32 to the realtime database. The testing device consists of the following components:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"ESP-WROOM-32 DEVKITV1"}),"\n",(0,i.jsx)(t.li,{children:"9V Battery - powers RC components and telemetry device"}),"\n",(0,i.jsx)(t.li,{children:"3 axis accelerometer - wired to the ESP32 (the one acting as the ECU) to provide sensor measurements to transmit live"}),"\n"]}),"\n",(0,i.jsx)(t.h4,{id:"wiring-diagram-1",children:"Wiring Diagram"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"system diagram",src:r(45569).A+"",width:"737",height:"528"})}),"\n",(0,i.jsx)(t.h2,{id:"complete-hardware-requirements",children:"Complete Hardware Requirements"}),"\n",(0,i.jsx)("iframe",{src:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&headers=false",frameborder:"0",width:"100%",height:"500"})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},45569:(e,t,r)=>{r.d(t,{A:()=>i});const i=r.p+"assets/images/RC-car-breadboard-d660ef9919a370cf2ad17d1a7f89c550.png"},29189:(e,t,r)=>{r.d(t,{A:()=>i});const i=r.p+"assets/images/Telemetry-Device-Breadboard-c0ae85262542fec7c1bc18cb27ab332f.png"},28453:(e,t,r)=>{r.d(t,{R:()=>a,x:()=>c});var i=r(96540);const n={},s=i.createContext(n);function a(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);