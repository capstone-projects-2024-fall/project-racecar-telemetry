"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6891],{50413:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>d,contentTitle:()=>i,default:()=>g,frontMatter:()=>s,metadata:()=>o,toc:()=>h});var t=n(74848),r=n(28453);const s={sidebar_position:1},i=void 0,o={id:"system-architecture/Webpage Design",title:"Webpage Design",description:"Front-End Figma Design",source:"@site/docs/system-architecture/Webpage Design.md",sourceDirName:"system-architecture",slug:"/system-architecture/Webpage Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Webpage Design",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/system-architecture/Webpage Design.md",tags:[],version:"current",lastUpdatedBy:"Arianna Reischer",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Design Overview",permalink:"/project-racecar-telemetry/docs/system-architecture/Design Overview"},next:{title:"Hardware Design",permalink:"/project-racecar-telemetry/docs/system-architecture/Hardware Design"}},d={},h=[{value:"Front-End Figma Design",id:"front-end-figma-design",level:2},{value:"Front-End UML Class Diagram",id:"front-end-uml-class-diagram",level:2}];function c(e){const a={h2:"h2",img:"img",mermaid:"mermaid",p:"p",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h2,{id:"front-end-figma-design",children:"Front-End Figma Design"}),"\n",(0,t.jsxs)(a.p,{children:["Login Page:\n",(0,t.jsx)(a.img,{alt:"login",src:n(66003).A+"",width:"1200",height:"1398"})]}),"\n",(0,t.jsxs)(a.p,{children:["Dashboard (Connected):\n",(0,t.jsx)(a.img,{alt:"dashboardConnected",src:n(38334).A+"",width:"1200",height:"1494"})]}),"\n",(0,t.jsxs)(a.p,{children:["Dashboard (Not Connected):\n",(0,t.jsx)(a.img,{alt:"dashboardConnected",src:n(60383).A+"",width:"1200",height:"1494"})]}),"\n",(0,t.jsxs)(a.p,{children:["Component Editor:\n",(0,t.jsx)(a.img,{alt:"dashboardConnected",src:n(11324).A+"",width:"1200",height:"1494"})]}),"\n",(0,t.jsxs)(a.p,{children:["Data Assignment Window:\n",(0,t.jsx)(a.img,{alt:"dashboardConnected",src:n(41383).A+"",width:"1200",height:"1398"})]}),"\n",(0,t.jsx)(a.h2,{id:"front-end-uml-class-diagram",children:"Front-End UML Class Diagram"}),"\n",(0,t.jsx)(a.p,{children:"This diagram shows the different components which will make up the Dashboard of the web app. The dashboard page is made up of the LoginForm, Graph, LinearGraph, RadialGraph, GraphEditor, NavBar, LogoutButton, Header, NewDisplayButton, ErrorModal, and DataAssignmentWindow components. This is a NextJS app, and this diagram shows the path of /app/dashboard/page.js. All of the Graph related components allow users to customize their dashboard and view data in different ways. The LoginForm component is used to authenticate users sessions. The NavBar and Header components are for structure, design, and allows users to add new displays to their dashboard. The ErrorModal is used when there is a problem with the Live streaming of data, and gives a specific error message to help resolve it. The DataAssignmentWindow is used when the CAN IDs change and need to be mapped to their new data assignment."}),"\n",(0,t.jsx)(a.mermaid,{value:"classDiagram\nApp *-- Dashboard\nDashboard *-- Page\nPage *-- LoginForm\nPage *-- Graph\nGraph *-- GraphEditor\nPage *-- NavBar\nPage *-- Header\nHeader *-- NewDisplayButton\nNavBar *-- LogoutButton\nGraph <|-- LinearGraph\nGraph <|-- RadialGraph\nPage *-- ErrorModal\nPage *-- DataAssignmentWindow\n\n\nErrorModal: +String errorMessage\nHeader: +String imagePath\nHeader: +String Title\nHeader: +String Status\nHeader: +setStatus(String)void\nNewDisplayButton: +onNewDisplay()void\nNavBar: +onLogout()void\nLogoutButton: +Logout()void\nPage: +String status\nPage: +Map CANIDs\nPage: +handleLogout()void\nPage: +handleNewDisplay()void\nPage: +handleChangeCanIDs()void\nDashboard: \nLoginForm: +onSubmit()void\nLoginForm: +String username\nLoginForm: +String password\nGraph: +int DataChannel\nGraph: +String DataLabel\nGraph: +String DisplayType\nGraph: +int UnitOfMeasure\nGraph: +String Color\nGraph: +int Max\nGraph: +int Min\nGraph: +onDelete()void\nGraph: +onClickSettings()void\nPage: +handleDelete()void\nPage: +handleClickSettings()void\nPage: +handleSubmit()void\nPage: +handleSetStatus()void\nGraphEditor: +setDataChannel(int)void\nGraphEditor: +setDataLabel(String)void\nGraphEditor: +setDisplayType(String)void\nGraphEditor: +setUnitOfMeasure(int)void\nGraphEditor: +setColor(String)void\nGraphEditor: +setMax(int)void\nGraphEditor: +setMin(int)void\nLinearGraph: \nRadialGraph: \nDataAssignmentWindow: +setCanIDS(Map)"})]})}function g(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11324:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/ComponentEditor-41d849039911403d8555e9e777beb1a5.png"},38334:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/Dashboard_Connected-8484d49c6039bd3cdcf8fd3ebe4f8778.png"},60383:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/Dashboard_NotConnected-5065dd1c44dfbaf577d8eaab06c64698.png"},41383:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/DataAssignment-24f3596e01aa09c2e35b0becf44c85fa.png"},66003:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/Login_Page-b623326a7e46793fc28fecbebf141ab4.png"},28453:(e,a,n)=>{n.d(a,{R:()=>i,x:()=>o});var t=n(96540);const r={},s=t.createContext(r);function i(e){const a=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:a},e.children)}}}]);