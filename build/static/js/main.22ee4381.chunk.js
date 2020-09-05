(this["webpackJsonpmintbean-react-2020-08-28"]=this["webpackJsonpmintbean-react-2020-08-28"]||[]).push([[0],{55:function(e,t,a){},69:function(e,t,a){e.exports=a(87)},87:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(11),c=a.n(l),s=(a(55),a(47)),i=a(45),o=a(53),d=a(10),u=a.n(d),m=a(9),p=a(21),b=a(35),h=a(36),f=a(8),g=a(42),v=a(41),E=function(e){Object(g.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={editable:!1,title:"",description:"",id:""},n.state.title=n.props.title,n.state.description=n.props.description,n.state.id=n.props.id,n}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"mb-2 mt-3",id:this.state.id},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h6",{className:" pt-3 text-sm text-secondary"},this.state.title)),r.a.createElement("div",null,r.a.createElement("p",{className:"pt-3 text-secondary"},this.state.description))))}}]),a}(r.a.Component),y=a(27),S=a(19),k=a.n(S),C=a(95),O=a(56),x=a(57),j=a(96),N=a(100),I=a(101),w=a(99),T=a(98),D=a(25),L=a(26),M=function(e){Object(g.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={allColumns:[],currentColumn:"",currentTitle:"",currentDescription:"",createColumn:""},n.deleteItem=n.deleteItem.bind(Object(f.a)(n)),n.editItem=n.editItem.bind(Object(f.a)(n)),n.addCard=n.addCard.bind(Object(f.a)(n)),n.createSection=n.createSection.bind(Object(f.a)(n)),n.onDragEnd=n.onDragEnd.bind(Object(f.a)(n)),n.closeModal=n.closeModal.bind(Object(f.a)(n)),n.openModal=n.openModal.bind(Object(f.a)(n)),n.createTodo=n.createTodo.bind(Object(f.a)(n)),n.clearAll=n.clearAll.bind(Object(f.a)(n)),n.modal=n.modal.bind(Object(f.a)(n)),n.updateLocalStorage=n.updateLocalStorage.bind(Object(f.a)(n)),n.createColumn=n.createColumn.bind(Object(f.a)(n)),n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.getLocalStorage()}},{key:"updateLocalStorage",value:function(){var e=this,t=this.state.allColumns;t.forEach((function(t){return localStorage.setItem(t,JSON.stringify(e.state[t]))})),localStorage.setItem("allColumns",JSON.stringify(t))}},{key:"getLocalStorage",value:function(){var e=Object(p.a)(u.a.mark((function e(){var t,a,n,r,l,c,s,i,o,d,p,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object.keys(localStorage).length){e.next=10;break}return e.next=3,this.setState({allColumns:["todos","inprog","done"],todos:{cards:[],id:k()(),colName:"todos"},inprog:{cards:[],id:k()(),colName:"inprog"},done:{cards:[],id:k()(),colName:"done"}});case 3:t={cards:[],id:k()(),colName:"done"},localStorage.setItem("todos",JSON.stringify(t)),localStorage.setItem("inprog",JSON.stringify(t)),localStorage.setItem("done",JSON.stringify(t)),localStorage.setItem("allColumns",JSON.stringify(["todos","inprog","done"])),e.next=36;break;case 10:a=JSON.parse(localStorage.getItem("allColumns")),n=0;case 12:if(!(n<a.length)){e.next=34;break}return r=a[n],e.next=16,this.setState(Object(m.a)({},r,{cards:[],id:k()(),colName:"".concat(r)}));case 16:l=[],c=JSON.parse(localStorage.getItem(a[n])),s=c.cards.length,i=0;case 20:if(!(i<s)){e.next=31;break}return o=c.cards[i].title,d=c.cards[i].description,p=c.cards[i].id,b={title:o,description:d,id:p},l.push(b),e.next=28,this.setState(Object(m.a)({},this.state[r].cards,this.state[r].cards.push(b)));case 28:i++,e.next=20;break;case 31:n++,e.next=12;break;case 34:this.setState({allColumns:a}),console.log(this.state);case 36:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleSubmit",value:function(){var e=Object(p.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=this.state.currentColumn,null===localStorage.getItem(a)?[]:JSON.parse(localStorage.getItem(a)),""!==(n={title:this.state.currentTitle,description:this.state.currentDescription,id:k()()}).title){e.next=8;break}return alert("Please Enter A Valid Title"),e.abrupt("return");case 8:return e.next=10,this.setState(Object(m.a)({},this.state[a].cards,this.state[a].cards.push(n)));case 10:this.updateLocalStorage(),this.closeModal(),this.setState({currentTitle:"",currentDescription:""});case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"clearAll",value:function(){localStorage.clear(),this.setState({allColumns:[]}),this.getLocalStorage()}},{key:"update",value:function(e){var t=this;return function(a){return t.setState(Object(m.a)({},e,a.currentTarget.value))}}},{key:"createTodo",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit.bind(this)},r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{className:"mt-5",placeholder:"Title",type:"text",value:this.state.currentTitle,onChange:this.update("currentTitle")})),r.a.createElement("label",null,r.a.createElement("input",{className:"mt-5",placeholder:"Description",type:"text",value:this.state.currentDescription,onChange:this.update("currentDescription")}))),r.a.createElement(C.a,null,r.a.createElement(O.a,{className:"btn-sm ml-2 mt-5 mb-2 mr-0",type:"submit"},"Submit"),r.a.createElement(O.a,{className:"btn-sm m-2 mt-5 ml-0",onClick:this.closeModal},"Close"))))}},{key:"openModal",value:function(){document.getElementsByClassName("newTodoForm")[0].style.display="flex"}},{key:"closeModal",value:function(){document.getElementsByClassName("newTodoForm")[0].style.display="none",this.setState({newTodoContainer:"hidden"})}},{key:"addCard",value:function(e){this.setState({currentColumn:e}),this.openModal()}},{key:"deleteItem",value:function(){var e=Object(p.a)(u.a.mark((function e(t,a){var n,r,l,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.currentTarget.parentElement.previousElementSibling.id,r=Object(o.a)(this.state[t].cards),l=r.find((function(e){return e.id===n})),c=0,r.forEach((function(e,t){if(e.id===l.id)return c=t})),r.splice(c,1),e.next=8,this.setState(Object(m.a)({},t,{cards:r,id:this.state[t].id,colName:t}));case 8:this.updateLocalStorage();case 9:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"editItem",value:function(){var e=Object(p.a)(u.a.mark((function e(t,a){var n,r,l,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.currentTarget.parentElement.previousElementSibling.id,r=Object(o.a)(this.state[t].cards),l=r.find((function(e){return e.id===n})),c=0,r.forEach((function(e,t){if(e.id===l.id)return c=t})),r.splice(c,1),e.next=8,this.setState(Object(m.a)({},t,{cards:r,id:this.state[t].id,colName:t}));case 8:this.updateLocalStorage();case 9:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"dragCol",value:function(e){}},{key:"onDragEnd",value:function(){var e=Object(p.a)(u.a.mark((function e(t){var a,n,r,l,c,o,d,p,b,h,f,g,v,E,y,S,k,C;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.destination,n=t.source,a){e.next=3;break}return e.abrupt("return");case 3:if(a.droppableId!==n.droppableId||a.index!==n.index){e.next=5;break}return e.abrupt("return");case 5:if("column"!==t.type){e.next=15;break}return r=Array.from(this.state.allColumns),l=r.splice(n.index,1),c=Object(i.a)(l,1),o=c[0],r.splice(a.index,0,o),d=Object(s.a)(Object(s.a)({},this.state),{},{allColumns:r}),e.next=12,this.setState(d);case 12:return this.updateLocalStorage(),e.abrupt("return");case 15:if(p=this.state[n.droppableId].cards,b=this.state[a.droppableId].cards,h=Array.from(p),f=Array.from(b),b!==p){e.next=25;break}g=h.splice(n.index,1),v=Object(i.a)(g,1),E=v[0],h.splice(a.index,0,E),this.setState(Object(m.a)({},n.droppableId,{cards:h,id:this.state[a.droppableId].id,colName:n.droppableId})),e.next=30;break;case 25:return S=h.splice(n.index,1),k=Object(i.a)(S,1),C=k[0],f.splice(a.index,0,C),e.next=29,this.setState((y={},Object(m.a)(y,n.droppableId,{cards:h,id:this.state[n.droppableId].id,colName:n.droppableId}),Object(m.a)(y,a.droppableId,{cards:f,id:this.state[a.droppableId].id,colName:a.droppableId}),y));case 29:this.updateLocalStorage();case 30:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"createSection",value:function(e){var t=this;return r.a.createElement("div",{id:"container"},r.a.createElement("h2",null,e),r.a.createElement(x.a,null,r.a.createElement(C.a,null,r.a.createElement(O.a,{className:"btn-block  btn-light text-primary m-2",onClick:function(){return t.removeCol(e)}},"-")),r.a.createElement(C.a,null,r.a.createElement(O.a,{className:"btn-block  btn-light text-primary m-2",onClick:function(){return t.addCard(e)}},"+"))),r.a.createElement("div",null,r.a.createElement(y.c,{droppableId:e,className:"dropable",direction:"vertical"},(function(a){return r.a.createElement("div",Object.assign({id:e,className:"card-drag"},a.droppableProps,{ref:a.innerRef}),t.state[e].cards.map((function(a,n){return r.a.createElement(y.b,{key:a.id,draggableId:a.id,index:n},(function(n){return r.a.createElement(x.a,Object.assign({className:"bg-light shadow shadow-lg mt-3 border-primary border",ref:n.innerRef},n.draggableProps,n.dragHandleProps),r.a.createElement(E,{title:a.title,description:a.description,id:a.id}),r.a.createElement("div",{className:" flex flex-column justify-content-end"},r.a.createElement(O.a,{className:"btn-sm py-0 mb-2 btn-danger",onClick:function(a){return t.deleteItem(e,a)}},"X")))}))})),a.placeholder)}))))}},{key:"removeCol",value:function(e){localStorage.removeItem(e);var t=this.state.allColumns.indexOf(e),a=Array.from(this.state.allColumns);a.splice(t,1),localStorage.setItem("allColumns",JSON.stringify(a)),this.getLocalStorage()}},{key:"createColumn",value:function(){var e=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.allColumns,""!==this.state.createColumn&&!t.includes(this.state.createColumn)){e.next=4;break}return alert("Please Enter a Valid Column Name"),e.abrupt("return");case 4:if(!(this.state.allColumns.length>10)){e.next=7;break}return alert("Eleven columns is the max. Please delete one if you would like to create a new column."),e.abrupt("return");case 7:return t.push(this.state.createColumn),e.next=10,this.setState(Object(m.a)({allColumns:t},this.state.createColumn,{cards:[],id:k()(),colName:this.state.createColumn}));case 10:this.updateLocalStorage(),console.log(this.state);case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"modal",value:function(){return r.a.createElement("div",{className:"newTodoForm"},r.a.createElement("div",{className:"modal-content w-25 h-50"},r.a.createElement("h1",{className:" text-secondary"},"Add Todo"),this.createTodo()))}},{key:"mapColumns",value:function(){var e=this;return r.a.createElement(y.c,{className:"dropable",droppableId:"allColumns",direction:"horizontal",type:"column"},(function(t){return r.a.createElement("div",Object.assign({id:"Columns"},t.droppableProps,{ref:t.innerRef}),r.a.createElement(C.a,{className:"justify-content-left flex-nowrap row-cols-".concat(e.state.allColumns.length/12)},e.state.allColumns.map((function(t,a){return r.a.createElement(y.b,{className:"border-secondary border-warning",key:a,draggableId:a+"Column",index:a},(function(n){return r.a.createElement(j.a,Object.assign({className:"progress-bar progress-bar-striped m-4 progress-bar-animated pb-3 justify-content-start shadow-lg shadow border-warning border p-3",ref:n.innerRef},n.draggableProps,n.dragHandleProps),r.a.createElement("section",{key:a},e.createSection(t)))}))}))),t.placeholder)}))}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{sticky:"top",className:"w-100 navbar navbar-dark bg-primary mb-1"},r.a.createElement(N.a.Brand,{className:"main-title"},"Kanban"),r.a.createElement(N.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(N.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(I.a,{className:"mr-auto"},r.a.createElement(w.a,{title:"Mackenzie Young",id:"basic-nav-dropdown"},r.a.createElement(w.a.Item,{href:"#action/3.1"},r.a.createElement(D.a,{icon:L.c})),r.a.createElement(w.a.Item,{href:"#action/3.2"},r.a.createElement(D.a,{icon:L.a})),r.a.createElement(w.a.Item,{href:"#action/3.3"},r.a.createElement(D.a,{icon:L.b})),r.a.createElement(w.a.Divider,null),r.a.createElement(w.a.Item,{href:"#action/3.4"},r.a.createElement(D.a,{icon:L.d})))),r.a.createElement(I.a.Link,{href:"https://github.com/mac9330/Kantan",className:" nav text-white"},"ReadMe ",r.a.createElement(D.a,{icon:L.d})),r.a.createElement(T.a,{inline:!0,onSubmit:function(){return e.createColumn()}},r.a.createElement("input",{type:"text",placeholder:"Add Column",className:"mr-sm-1",value:this.state.createColumn,onChange:this.update("createColumn")}),r.a.createElement(O.a,{variant:"outline-success",className:"btn-link bg-darken-4 text-decoration-none table-hover bg-white btn-sm m-1 pl-1 pr-1 pt-0 pb-0",type:"submit"},"+")))),r.a.createElement(j.a,{fluid:!0},r.a.createElement(y.a,{onDragEnd:function(t){return e.onDragEnd(t)}},r.a.createElement(x.a,{className:"justify-content-end"},r.a.createElement(O.a,{onClick:this.clearAll},"Reset to default")),this.mapColumns()),this.modal()))}}]),a}(r.a.Component),J=a(97),A=a(65);var P=function(){return r.a.createElement(J.a,{backend:A.a},r.a.createElement(M,null))};a(86);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.22ee4381.chunk.js.map