"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[5769],{28295:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var a=n(74848),r=n(28453);const s={},i=void 0,o={id:"system-architecture/Database Design",title:"Database Design",description:"Entity Realtional Diagram:",source:"@site/docs/system-architecture/Database Design.md",sourceDirName:"system-architecture",slug:"/system-architecture/Database Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Database Design",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/system-architecture/Database Design.md",tags:[],version:"current",lastUpdatedBy:"Arjun Patel",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Cloud Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Cloud Design"},next:{title:"Sequence Diagrams",permalink:"/project-racecar-telemetry/docs/system-architecture/Sequence Diagrams"}},c={},d=[{value:"Entity Realtional Diagram:",id:"entity-realtional-diagram",level:2}];function m(e){const t={h2:"h2",mermaid:"mermaid",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{id:"entity-realtional-diagram",children:"Entity Realtional Diagram:"}),"\n",(0,a.jsx)(t.mermaid,{value:'erDiagram\n    %%this shows the heiarchy of our Json tree in our FireBase- \n    %%real time database\n    CAN_DATA ||--o{ CAN_ID : contains\n    CAN_ID ||--o{ TIMESTAMP : records\n    TIMESTAMP ||--o{ DATA : contains\n\n    CAN_DATA {\n        string canDataRoot "Root node for CAN data"\n    }\n\n    CAN_ID {\n        string canID "CAN identifier (e.g., 200, 201)"\n    }\n\n    TIMESTAMP {\n        string timestamp "Timestamp of data collection"\n    }\n\n    DATA {\n        string data "Hexadecimal data from CAN"\n        int length "Length of data"\n    }\n\n    ESP32 ||--o{ CAN_DATA : sends'})]})}function l(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var a=n(96540);const r={},s=a.createContext(r);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);