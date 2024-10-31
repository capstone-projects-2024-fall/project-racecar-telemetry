"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[9623],{87397:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>n,metadata:()=>o,toc:()=>c});var l=i(74848),r=i(28453);const n={sidebar_position:3},a="CalculatorModel.java",o={id:"api-specification/calculator-model-generated",title:"CalculatorModel.java",description:"(generated using Javadoc to Markdown)",source:"@site/docs/api-specification/calculator-model-generated.md",sourceDirName:"api-specification",slug:"/api-specification/calculator-model-generated",permalink:"/project-racecar-telemetry/docs/api-specification/calculator-model-generated",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-racecar-telemetry/edit/main/documentation/docs/api-specification/calculator-model-generated.md",tags:[],version:"current",lastUpdatedBy:"Arjun Patel",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"API 1 - Swagger Petstore",permalink:"/project-racecar-telemetry/docs/api-specification/openapi-spec"},next:{title:"Test Procedures",permalink:"/project-racecar-telemetry/docs/category/test-procedures"}},d={},c=[{value:"<code>public class CalculatorModel</code>",id:"public-class-calculatormodel",level:2},{value:"<code>private double displayValue</code>",id:"private-double-displayvalue",level:2},{value:"<code>private double internalValue</code>",id:"private-double-internalvalue",level:2},{value:"<code>private String displayString</code>",id:"private-string-displaystring",level:2},{value:"<code>private String operation</code>",id:"private-string-operation",level:2},{value:"<code>private boolean start</code>",id:"private-boolean-start",level:2},{value:"<code>private boolean dot</code>",id:"private-boolean-dot",level:2},{value:"<code>public CalculatorModel()</code>",id:"public-calculatormodel",level:2},{value:"<code>public String getValue()</code>",id:"public-string-getvalue",level:2},{value:"<code>public void update(String text)</code>",id:"public-void-updatestring-text",level:2},{value:"<code>public double operationAdd(double rhs, double lhs)</code>",id:"public-double-operationadddouble-rhs-double-lhs",level:2}];function s(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h1,{id:"calculatormodeljava",children:"CalculatorModel.java"}),"\n",(0,l.jsxs)(t.p,{children:["(generated using ",(0,l.jsx)(t.a,{href:"https://delight-im.github.io/Javadoc-to-Markdown/",children:"Javadoc to Markdown"}),")"]}),"\n",(0,l.jsx)(t.h2,{id:"public-class-calculatormodel",children:(0,l.jsx)(t.code,{children:"public class CalculatorModel"})}),"\n",(0,l.jsx)(t.p,{children:"This is the model of this MVC implementation of a calculator. It performs the functions of the calculator and keeps track of what the user has entered."}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:"Author:"})," Tom Bylander"]}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"private-double-displayvalue",children:(0,l.jsx)(t.code,{children:"private double displayValue"})}),"\n",(0,l.jsx)(t.p,{children:"This is the numeric value of the number the user is entering, or the number that was just calculated."}),"\n",(0,l.jsx)(t.h2,{id:"private-double-internalvalue",children:(0,l.jsx)(t.code,{children:"private double internalValue"})}),"\n",(0,l.jsx)(t.p,{children:"This is the previous value entered or calculated."}),"\n",(0,l.jsx)(t.h2,{id:"private-string-displaystring",children:(0,l.jsx)(t.code,{children:"private String displayString"})}),"\n",(0,l.jsx)(t.p,{children:"This is the String corresponding to what the user. is entering"}),"\n",(0,l.jsx)(t.h2,{id:"private-string-operation",children:(0,l.jsx)(t.code,{children:"private String operation"})}),"\n",(0,l.jsx)(t.p,{children:"This is the last operation entered by the user."}),"\n",(0,l.jsx)(t.h2,{id:"private-boolean-start",children:(0,l.jsx)(t.code,{children:"private boolean start"})}),"\n",(0,l.jsx)(t.p,{children:"This is true if the next digit entered starts a new value."}),"\n",(0,l.jsx)(t.h2,{id:"private-boolean-dot",children:(0,l.jsx)(t.code,{children:"private boolean dot"})}),"\n",(0,l.jsx)(t.p,{children:"This is true if a decimal dot has been entered for the current value."}),"\n",(0,l.jsx)(t.h2,{id:"public-calculatormodel",children:(0,l.jsx)(t.code,{children:"public CalculatorModel()"})}),"\n",(0,l.jsx)(t.p,{children:"Initializes the instance variables."}),"\n",(0,l.jsx)(t.h2,{id:"public-string-getvalue",children:(0,l.jsx)(t.code,{children:"public String getValue()"})}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\n",(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:"Returns:"})," the String value of what was just calculated"]}),"\n",(0,l.jsx)(t.p,{children:"or what the user is entering"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"public-void-updatestring-text",children:(0,l.jsx)(t.code,{children:"public void update(String text)"})}),"\n",(0,l.jsx)(t.p,{children:"Updates the values maintained by the calculator based on the button that the user has just clicked."}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:"Parameters:"})," ",(0,l.jsx)(t.code,{children:"text"})," \u2014 is the name of the button that the user has just clicked"]}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"public-double-operationadddouble-rhs-double-lhs",children:(0,l.jsx)(t.code,{children:"public double operationAdd(double rhs, double lhs)"})}),"\n",(0,l.jsxs)(t.p,{children:["Operation to add two numbers. ",(0,l.jsx)("pre",{children:" operationAdd(3,2); // should equal 5.0 "})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:"Parameters:"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:"rhs"})," \u2014 ",(0,l.jsx)(t.code,{children:"double"})," representing the right hand side of the operator"]}),"\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:"lhs"})," \u2014 ",(0,l.jsx)(t.code,{children:"double"})," representing the left hand side of the operator"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:"Returns:"})," ",(0,l.jsx)(t.code,{children:"double"})]}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(s,{...e})}):s(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>o});var l=i(96540);const r={},n=l.createContext(r);function a(e){const t=l.useContext(n);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),l.createElement(n.Provider,{value:t},e.children)}}}]);