"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[755],{8755:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var l=a(5155),s=a(2115);function o(e){let{onMapUpload:t,existingMapImage:a}=e,[o,r]=(0,s.useState)(!1),[n,i]=(0,s.useState)(null),c=(0,s.useRef)(null);(0,s.useEffect)(()=>{a&&i(a)},[a]);let d=e=>{if(!e.type.match("image/jpeg")&&!e.type.match("image/png"))return void alert("Please upload a JPG or PNG image file.");let a=new FileReader;a.onload=e=>{var t;(null==(t=e.target)?void 0:t.result)&&i(e.target.result)},a.readAsDataURL(e),t(e)},m=()=>{c.current&&(c.current.value="",c.current.click())};return(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Map Upload"}),(0,l.jsx)("p",{className:"text-gray-600 mb-4",children:"Upload an office map image (JPG, PNG)."}),n?(0,l.jsxs)("div",{className:"mt-4",children:[(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsx)("img",{src:n,alt:"Office Map Preview",className:"max-w-full h-auto rounded-lg shadow-sm"}),(0,l.jsxs)("div",{className:"absolute top-2 right-2 flex space-x-2",children:[(0,l.jsx)("button",{className:"bg-blue-500 text-white p-2 rounded-full",onClick:m,title:"Replace with new image",type:"button",children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:[(0,l.jsx)("path",{d:"M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"}),(0,l.jsx)("path",{d:"M9 13h2v5a1 1 0 11-2 0v-5z"})]})}),(0,l.jsx)("button",{className:"bg-red-500 text-white p-2 rounded-full",onClick:()=>{i(null)},title:"Remove current image",type:"button",children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,l.jsx)("path",{fillRule:"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})})})]})]}),(0,l.jsx)("p",{className:"mt-2 text-sm text-gray-500",children:"Map uploaded successfully. You can now place employees on the map."}),(0,l.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:"Need to replace the image? Click the upload button in the top-right corner of the image."})]}):(0,l.jsxs)("div",{className:"border-2 border-dashed ".concat(o?"border-blue-500 bg-blue-50":"border-gray-300"," rounded-lg p-12 text-center transition-colors"),onDragOver:e=>{e.preventDefault(),r(!0)},onDragLeave:()=>{r(!1)},onDrop:e=>{e.preventDefault(),r(!1),e.dataTransfer.files&&e.dataTransfer.files[0]&&d(e.dataTransfer.files[0])},children:[(0,l.jsx)("p",{className:"text-gray-500 mb-2",children:"Drag and drop your map image here"}),(0,l.jsx)("p",{className:"text-gray-400 text-sm",children:"or"}),(0,l.jsx)("button",{className:"mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",onClick:m,type:"button",children:"Browse Files"}),(0,l.jsx)("input",{type:"file",ref:c,className:"hidden",accept:".jpg,.jpeg,.png",onChange:e=>{e.target.files&&e.target.files[0]&&d(e.target.files[0])}})]})]})}function r(e){let{onEmployeesImport:t}=e,[a,o]=(0,s.useState)(!1),[r,n]=(0,s.useState)(null),i=(0,s.useRef)(null),c=e=>{if(n(null),!e.name.endsWith(".csv"))return void n("Please upload a CSV file.");let a=new FileReader;a.onload=e=>{try{var a;if(null==(a=e.target)?void 0:a.result){let a=e.target.result,l=d(a);if(0===l.length)return void n("No valid employees found in the CSV. Please check the format.");t(l)}}catch(e){n('Failed to parse CSV. Please ensure it has "first name" and "last name" columns.')}},a.onerror=()=>{n("Failed to read the file. Please try again.")},a.readAsText(e)},d=e=>{let t=e.split(/\r?\n/).filter(e=>e.trim().length>0);if(t.length<2)throw Error("CSV must have at least a header row and one data row");let a=t[0].split(",").map(e=>e.trim().toLowerCase()),l=a.findIndex(e=>"first name"===e||"firstname"===e),s=a.findIndex(e=>"last name"===e||"lastname"===e);if(-1===l||-1===s)throw Error('CSV must have "first name" and "last name" columns');let o=[];for(let e=1;e<t.length;e++){let a=t[e].split(",").map(e=>e.trim());a.length>Math.max(l,s)&&o.push({firstName:a[l],lastName:a[s]})}return o};return(0,l.jsxs)("div",{className:"w-full mb-6",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Import Employees from CSV"}),(0,l.jsx)("p",{className:"text-gray-600 mb-4",children:'Upload a CSV file with "first name" and "last name" columns to import employees.'}),(0,l.jsxs)("div",{className:"border-2 border-dashed ".concat(a?"border-blue-500 bg-blue-50":"border-gray-300"," rounded-lg p-8 text-center transition-colors"),onDragOver:e=>{e.preventDefault(),o(!0)},onDragLeave:()=>{o(!1)},onDrop:e=>{e.preventDefault(),o(!1),e.dataTransfer.files&&e.dataTransfer.files[0]&&c(e.dataTransfer.files[0])},children:[(0,l.jsx)("p",{className:"text-gray-500 mb-2",children:"Drag and drop your CSV file here"}),(0,l.jsx)("p",{className:"text-gray-400 text-sm",children:"or"}),(0,l.jsx)("button",{className:"mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",onClick:()=>{var e;null==(e=i.current)||e.click()},children:"Browse Files"}),(0,l.jsx)("input",{type:"file",ref:i,className:"hidden",accept:".csv",onChange:e=>{e.target.files&&e.target.files[0]&&c(e.target.files[0])}})]}),r&&(0,l.jsx)("div",{className:"mt-4 p-3 bg-red-100 text-red-700 rounded-md",children:r}),(0,l.jsxs)("div",{className:"mt-4",children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"CSV Format Example:"}),(0,l.jsx)("div",{className:"bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto",children:(0,l.jsxs)("pre",{children:["first name,last name",(0,l.jsx)("br",{}),"John,Doe",(0,l.jsx)("br",{}),"Jane,Smith"]})})]})]})}function n(e){var t,a,o;let{mapImage:n,employees:i,onEmployeeAdd:c,onEmployeeUpdate:d,onEmployeeRemove:m,onEmployeesBulkAdd:p}=e,[u,h]=(0,s.useState)(!1),[x,g]=(0,s.useState)(null),[f,b]=(0,s.useState)(!1),[y,j]=(0,s.useState)(null),[v,N]=(0,s.useState)(null),[w,C]=(0,s.useState)([]),S=(0,s.useRef)(null);(0,s.useEffect)(()=>{C(i.filter(e=>e.position.x<.1&&e.position.y<.1||0===e.position.x&&0===e.position.y))},[i]);let k=(e,t)=>{t.stopPropagation(),g(e)},E=(e,t)=>{d(e,{name:t})},M=(e,t)=>{d(e,{team:t})},T=e=>{m(e),g(null)},R=(e,t)=>{t.stopPropagation(),j(e),g(e)},D=e=>{N(e),h(!1)};return(0,s.useEffect)(()=>{if(y){let e=()=>j(null);return document.addEventListener("mouseup",e),()=>{document.removeEventListener("mouseup",e)}}},[y]),(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsxs)("div",{className:"flex flex-wrap justify-between items-center mb-4 gap-2",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold",children:"Employee Placement"}),(0,l.jsxs)("div",{className:"flex gap-2",children:[(0,l.jsx)("button",{className:"px-4 py-2 rounded-md ".concat(u?"bg-green-500":"bg-blue-500"," text-white"),onClick:()=>{h(!u),N(null)},children:u?"Cancel":"Add Employee"}),(0,l.jsx)("button",{className:"px-4 py-2 rounded-md bg-purple-500 text-white",onClick:()=>b(!f),children:f?"Cancel Import":"Import from CSV"})]})]}),f&&(0,l.jsxs)("div",{className:"mb-6 p-5 border rounded-lg bg-gray-50",children:[(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("h3",{className:"font-medium text-lg",children:"Import Employees from CSV"}),(0,l.jsx)("p",{className:"text-gray-600",children:"Upload a CSV file with employee names to add them to the map. Employees will need to be placed manually after import."})]}),(0,l.jsx)(r,{onEmployeesImport:e=>{p(e.map((e,t)=>({id:"emp-csv-".concat(Date.now(),"-").concat(t),name:"".concat(e.firstName," ").concat(e.lastName),position:{x:0,y:0}}))),b(!1)}}),(0,l.jsxs)("div",{className:"mt-4 bg-blue-50 p-3 rounded-md border border-blue-200",children:[(0,l.jsx)("h4",{className:"font-medium text-blue-700",children:"What happens after import?"}),(0,l.jsxs)("ul",{className:"list-disc list-inside mt-2 text-sm text-blue-700",children:[(0,l.jsx)("li",{children:'Imported employees will appear in the "Unlocated Employees" list'}),(0,l.jsx)("li",{children:"Click on an employee name and then click on the map to place them"}),(0,l.jsx)("li",{children:'Each employee\'s name will be set to "First Last" from the CSV'}),(0,l.jsx)("li",{children:"Teams can be assigned after placement"})]})]})]}),w.length>0&&!f&&(0,l.jsxs)("div",{className:"mb-6 p-4 border rounded-lg bg-yellow-50",children:[(0,l.jsxs)("h3",{className:"font-medium mb-2 text-yellow-800",children:["Unlocated Employees (",w.length,")"]}),(0,l.jsx)("p",{className:"text-sm text-yellow-700 mb-3",children:v?"Click on the map to place the selected employee":"Click on an employee's name below, then click on the map to place them"}),(0,l.jsx)("div",{className:"flex flex-wrap gap-2",children:w.map(e=>(0,l.jsx)("button",{className:"px-3 py-1 text-sm rounded-full ".concat(v===e.id?"bg-green-500 text-white":"bg-white border border-yellow-300 hover:bg-yellow-100"),onClick:()=>D(e.id),children:e.name},e.id))})]}),(u||v)&&!f&&(0,l.jsx)("div",{className:"mb-4 p-2 bg-yellow-100 rounded-md",children:(0,l.jsx)("p",{className:"text-sm text-yellow-800",children:v?'Click on the map to place "'.concat((null==(t=i.find(e=>e.id===v))?void 0:t.name)||"employee",'"'):"Click on the map to place a new employee"})}),!f&&(0,l.jsxs)("div",{className:"relative border rounded-lg overflow-hidden",ref:S,onClick:e=>{if(!u&&!v||!S.current)return;let t=S.current.getBoundingClientRect(),a=(e.clientX-t.left)/t.width*100,l=(e.clientY-t.top)/t.height*100;if(v)i.find(e=>e.id===v)&&(d(v,{position:{x:a,y:l}}),N(null),g(v));else{let e={id:"emp-".concat(Date.now()),name:"New Employee",position:{x:a,y:l}};c(e),h(!1),g(e.id)}},onMouseMove:e=>{if(!y||!S.current)return;let t=S.current.getBoundingClientRect(),a=(e.clientX-t.left)/t.width*100;d(y,{position:{x:Math.max(0,Math.min(100,a)),y:Math.max(0,Math.min(100,(e.clientY-t.top)/t.height*100))}})},onMouseUp:()=>{j(null)},children:[(0,l.jsx)("img",{src:n,alt:"Office Map",className:"w-full h-auto"}),i.filter(e=>e.position.x>.1||e.position.y>.1).map(e=>(0,l.jsx)("div",{className:"absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-move ".concat(x===e.id?"ring-2 ring-blue-500 bg-blue-100":e.team?function(e){let t=e.split("").reduce((e,t)=>t.charCodeAt(0)+e,0),a=["bg-blue-400","bg-green-400","bg-purple-400","bg-yellow-400","bg-red-400","bg-indigo-400","bg-pink-400","bg-cyan-400","bg-emerald-400","bg-orange-400","bg-teal-400","bg-fuchsia-400"];return a[t%a.length]}(e.team):"bg-gray-400"," ").concat(y===e.id?"opacity-70":""),style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},onClick:t=>k(e.id,t),onMouseDown:t=>R(e.id,t),children:e.name.substring(0,2).toUpperCase()},e.id))]}),x&&!f&&(0,l.jsxs)("div",{className:"mt-4 p-4 border rounded-lg",children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"Employee Details"}),(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),(0,l.jsx)("input",{type:"text",className:"w-full px-3 py-2 border rounded-md",value:(null==(a=i.find(e=>e.id===x))?void 0:a.name)||"",onChange:e=>E(x,e.target.value)})]}),(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Team"}),(0,l.jsx)("input",{type:"text",className:"w-full px-3 py-2 border rounded-md",value:(null==(o=i.find(e=>e.id===x))?void 0:o.team)||"",onChange:e=>M(x,e.target.value)})]}),(0,l.jsx)("button",{className:"px-3 py-1 bg-red-500 text-white rounded-md text-sm",onClick:()=>T(x),children:"Remove Employee"})]})]})}function i(e){var t;let{mapImage:a,rooms:o,onRoomAdd:r,onRoomUpdate:n,onRoomRemove:i}=e,[c,d]=(0,s.useState)(!1),[m,p]=(0,s.useState)(null),u=(0,s.useRef)(null),h=(e,t)=>{t.stopPropagation(),p(e)},x=(e,t)=>{n(e,{name:t})},g=e=>{i(e),p(null)};return(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold",children:"Room Renaming"}),(0,l.jsx)("button",{className:"px-4 py-2 rounded-md ".concat(c?"bg-green-500":"bg-blue-500"," text-white"),onClick:()=>d(!c),children:c?"Cancel":"Add Room Label"})]}),c&&(0,l.jsx)("div",{className:"mb-4 p-2 bg-yellow-100 rounded-md",children:(0,l.jsx)("p",{className:"text-sm text-yellow-800",children:"Click on the map to place a room label"})}),(0,l.jsxs)("div",{className:"relative border rounded-lg overflow-hidden",ref:u,onClick:e=>{if(!c||!u.current)return;let t=u.current.getBoundingClientRect(),a=(e.clientX-t.left)/t.width*100,l=(e.clientY-t.top)/t.height*100,s={id:"room-".concat(Date.now()),name:"New Room",position:{x:a,y:l}};r(s),d(!1),p(s.id)},children:[(0,l.jsx)("img",{src:a,alt:"Office Map",className:"w-full h-auto"}),o.map(e=>(0,l.jsx)("div",{className:"absolute px-2 py-1 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ".concat(m===e.id?"bg-blue-100 border-2 border-blue-500":"bg-white/80 border border-gray-300"),style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},onClick:t=>h(e.id,t),children:e.name},e.id))]}),m&&(0,l.jsxs)("div",{className:"mt-4 p-4 border rounded-lg",children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"Room Details"}),(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),(0,l.jsx)("input",{type:"text",className:"w-full px-3 py-2 border rounded-md",value:(null==(t=o.find(e=>e.id===m))?void 0:t.name)||"",onChange:e=>x(m,e.target.value)})]}),(0,l.jsx)("button",{className:"px-3 py-1 bg-red-500 text-white rounded-md text-sm",onClick:()=>g(m),children:"Remove Room Label"})]})]})}let c=["bg-blue-400","bg-green-400","bg-purple-400","bg-yellow-400","bg-red-400","bg-indigo-400","bg-pink-400","bg-cyan-400","bg-emerald-400","bg-orange-400","bg-teal-400","bg-fuchsia-400"];function d(e){let{employees:t,onEmployeeUpdate:a,onHighlightEmployee:o}=e,[r,n]=(0,s.useState)([{id:"team-1",name:"Engineering",color:"bg-blue-400"},{id:"team-2",name:"Design",color:"bg-green-400"},{id:"team-3",name:"Marketing",color:"bg-purple-400"},{id:"team-4",name:"Sales",color:"bg-yellow-400"}]),[i,d]=(0,s.useState)(""),[m,p]=(0,s.useState)(c[0]);(0,s.useEffect)(()=>{let e=[...new Set(t.map(e=>e.team).filter(e=>void 0!==e&&""!==e))].filter(e=>!r.some(t=>t.name===e));e.length>0&&n([...r,...e.map(e=>({id:"team-".concat(Date.now(),"-").concat(Math.random().toString(36).substr(2,9)),name:e,color:c[Math.floor(Math.random()*c.length)]}))])},[t,r]),(0,s.useEffect)(()=>{try{let e=localStorage.getItem("officeMapperTeams");e&&n(JSON.parse(e))}catch(e){console.error("Error loading teams from localStorage:",e)}},[]),(0,s.useEffect)(()=>{try{localStorage.setItem("officeMapperTeams",JSON.stringify(r))}catch(e){console.error("Error saving teams to localStorage:",e)}},[r]);let u=(e,t)=>{a(e,{team:t||void 0})},h=e=>{let t=r.find(t=>t.name===e);return t?t.color:"bg-gray-400"},x=e=>{n(r.filter(t=>t.id!==e));let l=r.find(t=>t.id===e);l&&t.forEach(e=>{e.team===l.name&&a(e.id,{team:void 0})})},g=e=>{o&&o(e)};return(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Team Assignment"}),(0,l.jsxs)("div",{className:"mb-6",children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"Teams"}),(0,l.jsx)("div",{className:"flex gap-2 flex-wrap mb-3",children:r.map(e=>(0,l.jsxs)("div",{className:"".concat(e.color," px-3 py-1 rounded-full text-sm flex items-center"),children:[e.name,(0,l.jsx)("button",{onClick:()=>x(e.id),className:"ml-2 text-gray-700 hover:text-red-700 focus:outline-none",title:"Remove team",children:"\xd7"})]},e.id))}),(0,l.jsxs)("div",{className:"flex gap-2 flex-wrap",children:[(0,l.jsx)("input",{type:"text",className:"flex-1 px-3 py-2 border rounded-md min-w-[200px]",placeholder:"New team name",value:i,onChange:e=>d(e.target.value)}),(0,l.jsx)("select",{className:"px-3 py-2 border rounded-md",value:m,onChange:e=>p(e.target.value),children:c.map((e,t)=>(0,l.jsxs)("option",{value:e,children:["Color ",t+1]},e))}),(0,l.jsx)("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-md",onClick:()=>{i.trim()&&(n([...r,{id:"team-".concat(Date.now(),"-").concat(Math.random().toString(36).substr(2,9)),name:i,color:m}]),d(""))},children:"Add Team"})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"Employees"}),(0,l.jsxs)("table",{className:"w-full border-collapse",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{className:"bg-gray-100",children:[(0,l.jsx)("th",{className:"text-left p-2 border",children:"Name"}),(0,l.jsx)("th",{className:"text-left p-2 border",children:"Team"}),(0,l.jsx)("th",{className:"text-left p-2 border",children:"Actions"})]})}),(0,l.jsxs)("tbody",{children:[t.map(e=>(0,l.jsxs)("tr",{className:"hover:bg-gray-50 cursor-pointer",onClick:()=>g(e.id),children:[(0,l.jsx)("td",{className:"p-2 border",children:e.name}),(0,l.jsx)("td",{className:"p-2 border",children:e.team?(0,l.jsx)("span",{className:"inline-block px-2 py-1 rounded-full text-xs ".concat(h(e.team)),children:e.team}):"Not assigned"}),(0,l.jsx)("td",{className:"p-2 border",children:(0,l.jsxs)("select",{className:"w-full px-2 py-1 border rounded",value:e.team||"",onChange:t=>u(e.id,t.target.value||null),onClick:e=>e.stopPropagation(),children:[(0,l.jsx)("option",{value:"",children:"No Team"}),r.map(e=>(0,l.jsx)("option",{value:e.name,children:e.name},e.id))]})})]},e.id)),0===t.length&&(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:3,className:"p-4 text-center text-gray-500",children:"No employees added yet. Add employees on the map first."})})]})]}),o&&(0,l.jsx)("p",{className:"mt-2 text-sm text-gray-500",children:"Click on an employee row to highlight their location on the map."})]})]})}function m(e){let{employees:t,onHighlightEmployee:a}=e,[o,r]=(0,s.useState)(""),[n,i]=(0,s.useState)(null),[c,d]=(0,s.useState)(t),m=Array.from(new Set(t.filter(e=>e.team).map(e=>e.team)));return(0,s.useEffect)(()=>{let e=[...t];if(o){let t=o.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.team&&e.team.toLowerCase().includes(t))}n&&(e=e.filter(e=>e.team===n)),d(e)},[o,n,t]),(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Search & Filter"}),(0,l.jsxs)("div",{className:"flex gap-4 mb-4",children:[(0,l.jsx)("div",{className:"flex-1",children:(0,l.jsx)("input",{type:"text",className:"w-full px-3 py-2 border rounded-md",placeholder:"Search employees or teams...",value:o,onChange:e=>r(e.target.value)})}),(0,l.jsx)("div",{children:(0,l.jsxs)("select",{className:"w-full px-3 py-2 border rounded-md",value:n||"",onChange:e=>i(e.target.value||null),children:[(0,l.jsx)("option",{value:"",children:"All Teams"}),m.map(e=>(0,l.jsx)("option",{value:e,children:e},e))]})})]}),(0,l.jsx)("div",{className:"border rounded-lg overflow-hidden",children:(0,l.jsxs)("table",{className:"w-full border-collapse",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{className:"bg-gray-100",children:[(0,l.jsx)("th",{className:"text-left p-2 border",children:"Name"}),(0,l.jsx)("th",{className:"text-left p-2 border",children:"Team"}),(0,l.jsx)("th",{className:"text-left p-2 border",children:"Actions"})]})}),(0,l.jsxs)("tbody",{children:[c.map(e=>(0,l.jsxs)("tr",{className:"hover:bg-gray-50 cursor-pointer",onClick:()=>a(e.id),children:[(0,l.jsx)("td",{className:"p-2 border",children:e.name}),(0,l.jsx)("td",{className:"p-2 border",children:e.team||"Not assigned"}),(0,l.jsx)("td",{className:"p-2 border",children:(0,l.jsx)("button",{className:"px-3 py-1 bg-blue-500 text-white rounded-md text-sm",onClick:t=>{t.stopPropagation(),a(e.id)},children:"Locate"})})]},e.id)),0===c.length&&(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:3,className:"p-4 text-center text-gray-500",children:"No employees found matching your search criteria."})})]})]})})]})}function p(e){let{mapImage:t,employees:a,rooms:o,highlightedEmployee:r,onClose:n}=e,i=(0,s.useRef)(null),c=(0,s.useRef)(null),d=(0,s.useRef)(null);(0,s.useEffect)(()=>{let e=e=>{"Escape"===e.key&&n()},t=e=>{i.current&&!i.current.contains(e.target)&&n()};return document.addEventListener("keydown",e),document.addEventListener("mousedown",t),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",e),document.removeEventListener("mousedown",t),document.body.style.overflow="auto"}},[n]),(0,s.useEffect)(()=>{if(r&&c.current&&d.current){let e=d.current,t=c.current,a=e.getBoundingClientRect(),l=t.getBoundingClientRect(),s=l.left+l.width/2-a.left-a.width/2,o=l.top+l.height/2-a.top-a.height/2;e.scrollBy({left:s,top:o,behavior:"smooth"})}},[r]);let m=r?a.find(e=>e.id===r):null;return(0,l.jsx)("div",{className:"fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4",children:(0,l.jsxs)("div",{ref:i,className:"bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col",children:[(0,l.jsxs)("div",{className:"p-4 border-b flex justify-between items-center",children:[(0,l.jsxs)("h2",{className:"text-xl font-semibold",children:["Office Map",m&&(0,l.jsxs)("span",{className:"ml-2 text-blue-600",children:["→ Showing: ",m.name]})]}),(0,l.jsx)("button",{onClick:n,className:"text-gray-500 hover:text-gray-700",children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,l.jsx)("div",{className:"p-4 flex-1 overflow-auto",ref:d,children:(0,l.jsxs)("div",{className:"relative border rounded-lg overflow-hidden",children:[(0,l.jsx)("img",{src:t,alt:"Office Map",className:"w-full h-auto"}),a.map(e=>{let t=r===e.id;return(0,l.jsxs)("div",{ref:t?c:null,className:"absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-sm group ".concat(t?"ring-4 ring-red-500 animate-pulse bg-red-200 z-50 w-14 h-14 font-bold":e.team?"".concat(function(e){try{let t=localStorage.getItem("officeMapperTeams");if(t){let a=JSON.parse(t).find(t=>t.name===e);if(a)return a.color}}catch(e){console.error("Error getting team color from localStorage:",e)}let t=["bg-blue-400","bg-green-400","bg-purple-400","bg-yellow-400","bg-red-400","bg-indigo-400","bg-pink-400","bg-cyan-400","bg-emerald-400","bg-orange-400","bg-teal-400","bg-fuchsia-400"];return t[e.split("").reduce((e,t)=>t.charCodeAt(0)+e,0)%t.length]}(e.team)," w-10 h-10"):"bg-gray-400 w-10 h-10"),style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},children:[e.name.substring(0,1).toUpperCase(),(0,l.jsxs)("div",{className:"absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded ".concat(t?"opacity-100":"opacity-0 group-hover:opacity-100"," pointer-events-none transition-opacity z-10"),children:[e.name," ",e.team?"(".concat(e.team,")"):""]})]},e.id)}),o.map(e=>(0,l.jsx)("div",{className:"absolute px-2 py-1 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-sm",style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},children:e.name},e.id))]})}),(0,l.jsx)("div",{className:"p-4 border-t",children:(0,l.jsxs)("div",{className:"flex gap-4 flex-wrap",children:[(0,l.jsxs)("div",{className:"text-sm",children:[(0,l.jsx)("span",{className:"font-medium",children:"Total Employees:"})," ",a.length]}),(0,l.jsxs)("div",{className:"text-sm",children:[(0,l.jsx)("span",{className:"font-medium",children:"Total Rooms:"})," ",o.length]}),(0,l.jsxs)("div",{className:"text-sm",children:[(0,l.jsx)("span",{className:"font-medium",children:"Assigned to Teams:"})," ",a.filter(e=>e.team).length]})]})})]})})}function u(){let[e,t]=(0,s.useState)(null),[a,r]=(0,s.useState)([]),[c,u]=(0,s.useState)([]),[h,x]=(0,s.useState)("upload"),[g,f]=(0,s.useState)(null),[b,y]=(0,s.useState)(!1),[j,v]=(0,s.useState)(null),[N,w]=(0,s.useState)(!0),[C,S]=(0,s.useState)(!1),[k,E]=(0,s.useState)(!1);(0,s.useEffect)(()=>{if(window.location.hostname.includes("github.io")){console.log("GitHub Pages deployment detected - using offline mode"),E(!0);try{let e=localStorage.getItem("officeMapperData");if(e){let a=JSON.parse(e);a.mapImage&&t(a.mapImage),a.employees&&r(a.employees),a.rooms&&u(a.rooms)}}catch(e){console.error("Error loading from localStorage:",e)}w(!1);return}(async()=>{try{w(!0);let a=await fetch("/api/office-map");if(a.ok){let l=await a.json();if(l.data){t(l.data.mapImage);let a=l.data.employees.map(e=>({id:e._id||"emp-".concat(Date.now(),"-").concat(Math.random()),name:e.name,position:e.position,team:e.team}));r(a);let s=l.data.rooms.map(e=>({id:e._id||"room-".concat(Date.now(),"-").concat(Math.random()),name:e.name,position:e.position}));u(s),e&&x("employees")}}else if(500===a.status){console.warn("MongoDB connection failed, switching to offline mode"),E(!0);try{let e=localStorage.getItem("officeMapperData");if(e){let a=JSON.parse(e);a.mapImage&&t(a.mapImage),a.employees&&r(a.employees),a.rooms&&u(a.rooms)}}catch(e){console.error("Error loading from localStorage:",e)}}}catch(e){console.error("Failed to fetch office map:",e),E(!0);try{let e=localStorage.getItem("officeMapperData");if(e){let a=JSON.parse(e);a.mapImage&&t(a.mapImage),a.employees&&r(a.employees),a.rooms&&u(a.rooms)}}catch(e){console.error("Error loading from localStorage:",e)}}finally{w(!1)}})()},[]);let M=async()=>{if(e)try{let t;S(!0);try{localStorage.setItem("officeMapperData",JSON.stringify({mapImage:e,employees:a,rooms:c}))}catch(e){console.error("Error saving to localStorage:",e)}if(k){v({message:"Data saved locally (offline mode)",type:"success"}),setTimeout(()=>v(null),5e3),S(!1);return}let l=a.map(e=>({name:e.name,position:e.position,team:e.team})),s=c.map(e=>({name:e.name,position:e.position})),o=await fetch("/api/office-map");if((t=o.ok&&404!==o.status?await fetch("/api/office-map",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({mapImage:e,employees:l,rooms:s})}):await fetch("/api/office-map",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mapImage:e,employees:l,rooms:s})})).ok)v({message:"Office map saved successfully!",type:"success"}),setTimeout(()=>v(null),5e3);else if(500===t.status)E(!0),v({message:"Database connection failed. Working in offline mode.",type:"error"}),setTimeout(()=>v(null),5e3);else throw Error("Failed to save office map")}catch(e){console.error("Error saving office map:",e),E(!0),v({message:"Failed to save to database. Working in offline mode.",type:"error"}),setTimeout(()=>v(null),5e3)}finally{S(!1)}},T=a=>{console.log("Map upload triggered with file:",a.name);let l=new FileReader;l.onload=a=>{var l;(null==(l=a.target)?void 0:l.result)&&(t(a.target.result),console.log("Map image updated successfully"),e?(v({message:"Map successfully replaced!",type:"success"}),setTimeout(()=>v(null),5e3)):x("employees"),setTimeout(()=>M(),500))},l.readAsDataURL(a)},R=(e,t)=>{r(a.map(a=>a.id===e?{...a,...t}:a)),setTimeout(()=>M(),500)};return(0,s.useEffect)(()=>{if(g){let e=setTimeout(()=>{f(null)},5e3);return()=>clearTimeout(e)}},[g]),(0,l.jsxs)("div",{className:"min-h-screen p-6",children:[(0,l.jsxs)("header",{className:"mb-8",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{className:"text-3xl font-bold",children:"OfficeMapper"}),(0,l.jsxs)("p",{className:"text-gray-600",children:["Upload and manage your office seating plan",k&&" (Offline Mode)"]})]}),e&&(0,l.jsx)("button",{onClick:M,disabled:C,className:"px-4 py-2 rounded-md ".concat(C?"bg-gray-400":"bg-green-500 hover:bg-green-600"," text-white flex items-center gap-2"),children:C?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("svg",{className:"animate-spin h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,l.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,l.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Saving..."]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,l.jsx)("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),k?"Save Locally":"Save to Database"]})})]}),k&&(0,l.jsx)("div",{className:"mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800",children:"Working in offline mode. Data is saved only to your browser's local storage."}),j&&(0,l.jsx)("div",{className:"mt-4 p-3 rounded-md ".concat("success"===j.type?"bg-green-100 text-green-700":"bg-red-100 text-red-700"),children:j.message})]}),N?(0,l.jsx)("div",{className:"flex items-center justify-center h-64",children:(0,l.jsxs)("div",{className:"flex flex-col items-center",children:[(0,l.jsxs)("svg",{className:"animate-spin h-10 w-10 text-blue-500 mb-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,l.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,l.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,l.jsx)("p",{className:"text-lg text-gray-600",children:"Loading office map data..."})]})}):e?(0,l.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,l.jsxs)("div",{className:"lg:col-span-2",children:[(0,l.jsx)("div",{className:"border-b mb-4",children:(0,l.jsxs)("nav",{className:"flex space-x-4",children:[(0,l.jsx)("button",{className:"py-2 px-1 border-b-2 ".concat("employees"===h?"border-blue-500 text-blue-600":"border-transparent"),onClick:()=>x("employees"),children:"Employee Placement"}),(0,l.jsx)("button",{className:"py-2 px-1 border-b-2 ".concat("rooms"===h?"border-blue-500 text-blue-600":"border-transparent"),onClick:()=>x("rooms"),children:"Room Renaming"}),(0,l.jsx)("button",{className:"py-2 px-1 border-b-2 ".concat("teams"===h?"border-blue-500 text-blue-600":"border-transparent"),onClick:()=>x("teams"),children:"Team Assignment"}),(0,l.jsx)("button",{className:"py-2 px-1 border-b-2 ".concat("search"===h?"border-blue-500 text-blue-600":"border-transparent"),onClick:()=>x("search"),children:"Search & Filter"}),(0,l.jsx)("button",{className:"py-2 px-1 border-b-2 ".concat("upload"===h?"border-blue-500 text-blue-600":"border-transparent"),onClick:()=>x("upload"),children:"Change Map"})]})}),"employees"===h&&(0,l.jsx)(n,{mapImage:e,employees:a,onEmployeeAdd:e=>{r([...a,e]),setTimeout(()=>M(),500)},onEmployeeUpdate:R,onEmployeeRemove:e=>{r(a.filter(t=>t.id!==e)),setTimeout(()=>M(),500)},onEmployeesBulkAdd:e=>{r([...a,...e]),x("employees"),v({message:"Successfully imported ".concat(e.length," employees! You can now drag them to their exact positions."),type:"success"}),setTimeout(()=>{v(null)},5e3),setTimeout(()=>M(),500)}}),"rooms"===h&&(0,l.jsx)(i,{mapImage:e,rooms:c,onRoomAdd:e=>{u([...c,e]),setTimeout(()=>M(),500)},onRoomUpdate:(e,t)=>{u(c.map(a=>a.id===e?{...a,...t}:a)),setTimeout(()=>M(),500)},onRoomRemove:e=>{u(c.filter(t=>t.id!==e)),setTimeout(()=>M(),500)}}),"teams"===h&&(0,l.jsx)(d,{employees:a,onEmployeeUpdate:R,onHighlightEmployee:f}),"search"===h&&(0,l.jsx)(m,{employees:a,onHighlightEmployee:f}),"upload"===h&&(0,l.jsx)(o,{onMapUpload:T,existingMapImage:e})]}),(0,l.jsx)("div",{className:"lg:col-span-1",children:(0,l.jsxs)("div",{className:"border rounded-lg p-4 sticky top-6",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Preview"}),(0,l.jsxs)("div",{className:"relative border rounded-lg overflow-hidden cursor-pointer group",onClick:()=>y(!0),children:[(0,l.jsx)("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100",children:(0,l.jsx)("div",{className:"bg-white/80 rounded-full p-2",children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})})}),(0,l.jsx)("img",{src:e,alt:"Office Map",className:"w-full h-auto"}),a.map(e=>(0,l.jsxs)("div",{className:"absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs group ".concat(g===e.id?"ring-4 ring-red-500 animate-pulse bg-red-200 z-50 w-8 h-8 font-bold":e.team?function(e){try{let t=localStorage.getItem("officeMapperTeams");if(t){let a=JSON.parse(t).find(t=>t.name===e);if(a)return a.color}}catch(e){console.error("Error getting team color from localStorage:",e)}let t=["bg-blue-400","bg-green-400","bg-purple-400","bg-yellow-400","bg-red-400","bg-indigo-400","bg-pink-400","bg-cyan-400","bg-emerald-400","bg-orange-400","bg-teal-400","bg-fuchsia-400"];return t[e.split("").reduce((e,t)=>t.charCodeAt(0)+e,0)%t.length]}(e.team):"bg-gray-400"),style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},children:[e.name.substring(0,1).toUpperCase(),(0,l.jsxs)("div",{className:"absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity",children:[e.name," ",e.team?"(".concat(e.team,")"):""]})]},e.id)),c.map(e=>(0,l.jsx)("div",{className:"absolute px-1 py-0.5 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-xs",style:{left:"".concat(e.position.x,"%"),top:"".concat(e.position.y,"%")},children:e.name},e.id))]}),(0,l.jsxs)("div",{className:"mt-4",children:[(0,l.jsx)("h3",{className:"font-medium mb-2",children:"Statistics"}),(0,l.jsxs)("ul",{className:"text-sm space-y-1",children:[(0,l.jsxs)("li",{children:["Total Employees: ",a.length]}),(0,l.jsxs)("li",{children:["Total Rooms: ",c.length]}),(0,l.jsxs)("li",{children:["Assigned to Teams: ",a.filter(e=>e.team).length]})]})]})]})})]}):(0,l.jsx)("div",{className:"max-w-3xl mx-auto",children:(0,l.jsx)(o,{onMapUpload:T})}),b&&e&&(0,l.jsx)(p,{mapImage:e,employees:a,rooms:c,highlightedEmployee:g,onClose:()=>y(!1)})]})}}}]);