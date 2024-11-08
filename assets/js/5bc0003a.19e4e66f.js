"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[635],{29122:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var n=r(74848),s=r(28453);const i={sidebar_position:2},o="System Block Diagram",a={id:"requirements/system-block-diagram",title:"System Block Diagram",description:"system diagram",source:"@site/docs/requirements/system-block-diagram.md",sourceDirName:"requirements",slug:"/requirements/system-block-diagram",permalink:"/project-racecar-telemetry/docs/requirements/system-block-diagram",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/requirements/system-block-diagram.md",tags:[],version:"current",lastUpdatedBy:"Arianna Reischer",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"System Overview",permalink:"/project-racecar-telemetry/docs/requirements/system-overview"},next:{title:"General Requirements",permalink:"/project-racecar-telemetry/docs/requirements/general-requirements"}},c={},d=[{value:"Description",id:"description",level:2}];function l(e){const t={br:"br",h1:"h1",h2:"h2",img:"img",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"system-block-diagram",children:"System Block Diagram"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.img,{alt:"system diagram",src:r(60599).A+"",width:"932",height:"518"}),(0,n.jsx)(t.br,{}),"\n",(0,n.jsx)(t.strong,{children:"Figure 1."})," High level design of the RCT"]}),"\n",(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsx)(t.p,{children:"Our project will consist of several key components: the Vehicle Components, Cloud Server Side Component, and Frontend Web Component."}),"\n",(0,n.jsx)(t.p,{children:"The Vehicle Components will include the telemetry device embedded in the TFR car and a cell phone with hotspot. The car's existing sensors will collect real-time data such as engine speed and fuel pressure. This data will be processed by the ECU (Engine Control Unit) and transmitted via the CAN Bus to an ESP32 microcontroller. The ESP32 will send the sensor data through a hotspot connection to the cloud."}),"\n",(0,n.jsx)(t.p,{children:"In the Cloud Server Side Component, the data will be stored in Firebase's Realtime Database, and the Next.js website will be hosted on Firebase Hosting."}),"\n",(0,n.jsx)(t.p,{children:"The Frontend Web Component will include a Next.js website that fetches and displays real-time sensor data from the Firebase Realtime Database, providing users with a dynamic and up-to-date interface to monitor the car's performance."})]})}function m(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},60599:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/system_block_diagram-faf43349076b9f1955765b9992fdda8f.png"},28453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>a});var n=r(96540);const s={},i=n.createContext(s);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);