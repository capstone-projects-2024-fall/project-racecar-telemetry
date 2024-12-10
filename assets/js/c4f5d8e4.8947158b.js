"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[2634],{35093:(e,s,i)=>{i.d(s,{A:()=>r});i(96540);var t=i(74848);function r(e){function s(){return s=e.id?e.id:(s=(s=(s=e.caption).replaceAll("."," ")).replaceAll(" ","-")).toLowerCase()}return(0,t.jsxs)("figure",{id:s(),align:e.align?e.align:"center",style:e.style?e.style:{},children:[e.children,e.src?(0,t.jsx)("img",{src:e.src,alt:e.alt}):(0,t.jsx)(t.Fragment,{}),(0,t.jsx)("figcaption",{align:e.align?e.align:"center",style:{fontWeight:"bold"},children:e.caption}),(0,t.jsx)("figcaption",{align:e.align?e.align:"center",style:{},children:e.subcaption})]})}},97385:(e,s,i)=>{i.r(s),i.d(s,{default:()=>p});i(96540);var t=i(34164),r=(i(28774),i(44586)),n=i(28244),a=i(74848),c=i(28453);function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...(0,c.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.p,{children:(0,a.jsx)(s.a,{href:"https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801646",children:(0,a.jsx)(s.img,{src:"https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg",alt:"Open in Codespaces"})})}),"\n",(0,a.jsxs)("div",{align:"center",children:[(0,a.jsx)(s.h1,{id:"racecar-telemetry",children:"Racecar Telemetry"}),(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.a,{href:"https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues",children:(0,a.jsx)(s.img,{src:"https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software",alt:"Report Issue on Jira"})}),"\n",(0,a.jsx)(s.a,{href:"https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml",children:(0,a.jsx)(s.img,{src:"https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg",alt:"Deploy Docs"})}),"\n",(0,a.jsx)(s.a,{href:"https://applebaumian.github.io/tu-cis-4398-docs-template/",children:(0,a.jsx)(s.img,{src:"https://img.shields.io/badge/-Documentation%20Website-brightgreen",alt:"Documentation Website Link"})})]})]}),"\n",(0,a.jsx)(s.h2,{id:"running-the-web-app",children:"running the web app"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsxs)(s.li,{children:["cd into ",(0,a.jsx)(s.code,{children:"racecartelemetry_webapp"})]}),"\n",(0,a.jsxs)(s.li,{children:["run ",(0,a.jsx)(s.code,{children:"npm i"})," and wait for installation to complete"]}),"\n",(0,a.jsxs)(s.li,{children:["run ",(0,a.jsx)(s.code,{children:"npm run dev"})," to run the website on localhost"]}),"\n"]}),"\n",(0,a.jsx)(s.h2,{id:"keywords",children:"Keywords"}),"\n",(0,a.jsx)(s.p,{children:"Section 002, Racecar telemetry, embedded systems (ESP32), wireless networks, server-client programming, web application development"}),"\n",(0,a.jsx)(s.h2,{id:"project-abstract",children:"Project Abstract"}),"\n",(0,a.jsx)(s.p,{children:"This document proposes a wireless vehicle telemetry system to transmit real-time data from a Formula-style racecar to devices off the track. The system will allow racing teams to view important sensor and diagnostic information - e.g., RPM, lap times, engine temperature - on their devices while up to 500 meters away. Having live data will help to facilitate assessment of driver and vehicle performance on dynamic testing days, preserve engine health through live diagnostics, and promote a deeper team-wide understanding of the vehicle."}),"\n",(0,a.jsx)(s.p,{children:"One side of the proposed system is the mobile component, consisting of the hardware embedded into the vehicle\u2019s wiring and a smartphone that provides mobile hotspot, and the software to run the server side of the system. The client side consists of devices that connect to the vehicle\u2019s network to display data in a webpage. The final product is a web page that enables users to view live racecar data in the form of customizable widgets for graphs, gauges, and warnings."}),"\n",(0,a.jsx)(s.p,{children:"This project is intended for use in Temple Formula Racing\u2019s (TFR) vehicle, which competes in the Formula Society of Automotive Engineers (FSAE) competition. In this competition, university teams are challenged to design, fabricate, and race formula-style vehicles."}),"\n",(0,a.jsx)(s.h2,{id:"high-level-requirement",children:"High Level Requirement"}),"\n",(0,a.jsx)(s.p,{children:"Users (spectators or team members at a TFR event) will use laptops or phones to connect to the vehicle telemetry system\u2019s wireless network. They will navigate to a web page which will automatically populate with data sent from the vehicle and update in real time. The user can select which data channels are shown and in what format through the use of widgets (for example, a vehicle speed vs. time graph). This web page should feel like a customizable vehicle dashboard. Additionally, the user will be able to select values for which a warning will appear (e.g., a popup if engine temperature exceeds 220\xb0 F)."}),"\n",(0,a.jsx)(s.h2,{id:"conceptual-design",children:"Conceptual Design"}),"\n",(0,a.jsx)(s.p,{children:"System architecture (see system diagram for details):"}),"\n",(0,a.jsxs)(s.ol,{children:["\n",(0,a.jsx)(s.li,{children:"CAN (Controller Area Network) transceiver - converts vehicle communication bus signal into something readable by the microprocessor"}),"\n",(0,a.jsx)(s.li,{children:"Microprocessor - responsible for processing vehicle data and uploading to database over WiFi."}),"\n",(0,a.jsx)(s.li,{children:"Mobile Hotspot - a cell phone with moblie hotspot is in the car to provide WiFi to the ESP32 while driving."}),"\n",(0,a.jsx)(s.li,{children:"Database - a Firebase database is used to store live data (CAN IDs and messages)"}),"\n",(0,a.jsx)(s.li,{children:"Website - a website pulls data from the database to display live in a customizeable dashboard."}),"\n"]}),"\n",(0,a.jsx)(s.h2,{id:"background",children:"Background"}),"\n",(0,a.jsx)(s.p,{children:"The background will contain a more detailed description of the product and a comparison to existing similar projects/products. A literature search should be conducted and the results listed. Proper citation of sources is required. If there are similar open-source products, you should state whether existing source will be used and to what extent. If there are similar closed-source/proprietary products, you should state how the proposed product will be similar and different."}),"\n",(0,a.jsx)(s.h2,{id:"required-resources",children:"Required Resources"}),"\n",(0,a.jsx)("iframe",{src:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&headers=false",frameborder:"0",width:"80%",height:"500"}),"\n",(0,a.jsx)(s.p,{children:"Knowledge Requirements"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsx)(s.li,{children:"The software architecture, specifically server-client interaction, requires elaboration before the project can proceed."}),"\n",(0,a.jsx)(s.li,{children:"We will consult Temple Electrical Engineering faculty throughout the semester for advice and theoretical background."}),"\n",(0,a.jsx)(s.li,{children:"For additional background, members of the Capstone team can contact other FSAE teams who have successfully implemented telemetry systems."}),"\n"]}),"\n",(0,a.jsx)(s.p,{children:"The system will be bench tested using simulated vehicle serial communication. This is how the final product will be presented."}),"\n",(0,a.jsx)(s.h2,{id:"collaborators",children:"Collaborators"}),"\n",(0,a.jsx)("table",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/ApplebaumIan",children:[(0,a.jsx)("img",{src:"https://avatars.githubusercontent.com/u/9451941?v=4",width:"100;",alt:"ApplebaumIan"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Ian Tyler Applebaum"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/NasierF",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Nasier"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Nasier Fowlkes"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/WJ2K",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Jacky"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"WenJie (Jacky) Ke"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/arjunpatel5",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Arjun"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Arjun Patel"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/nick-pell",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Nick"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Nick Pell"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/ajreisc",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Arianna"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Arianna Reischer"})})]})}),(0,a.jsx)("td",{align:"center",children:(0,a.jsxs)("a",{href:"https://github.com/dennis-yeom",children:[(0,a.jsx)("img",{src:"",width:"100;",alt:"Dennis"}),(0,a.jsx)("br",{}),(0,a.jsx)("sub",{children:(0,a.jsx)("b",{children:"Dennis Yeom"})})]})})]})})]})}function o(e={}){const{wrapper:s}={...(0,c.R)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function h(){return(0,a.jsx)("div",{className:"container",style:{marginTop:"50px",marginBottom:"100px"},children:(0,a.jsx)(o,{})})}const d={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN"};var u=i(76902);function m(){const{siteConfig:e}=(0,r.A)();return(0,a.jsx)("header",{className:(0,t.A)("hero hero--primary",d.heroBanner),children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("h1",{className:"hero__title",children:e.title}),(0,a.jsx)("p",{className:"hero__subtitle",children:e.tagline})]})})}function p(){const{siteConfig:e}=(0,r.A)();return(0,a.jsxs)(n.A,{title:"Home",description:"Description will go into a meta tag in <head />",children:[(0,a.jsx)(m,{}),(0,a.jsx)("main",{children:(0,a.jsx)(u.A,{children:(0,a.jsx)(h,{})})})]})}},76902:(e,s,i)=>{i.d(s,{A:()=>n});i(96540);var t=i(20360),r=i(74848);function n(e){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(t.A,{...e})})}},51433:(e,s,i)=>{i.d(s,{A:()=>a});var t=i(96540),r=i(35093),n=i(74966);const a={React:t,...t,Figure:r.A,dinosaur:n.A}},74966:(e,s,i)=>{i.d(s,{A:()=>t});const t="data:image/png;base64,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"}}]);