(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{344:function(t,e,r){"use strict";var n=r(18),o=(r(52),r(11)),c=(r(10),r(100),r(134),{props:{title:{required:!0,type:String},isAgent:{required:!1,type:Boolean},baseList:{required:!0,type:Array},selectedList:{required:!0,type:Array}},data:function(){return{baseValue:"",selectedValue:""}},computed:{baseListLocal:{get:function(){return this.baseList},set:function(t){this.$emit("updateBase",t)}},selectedListLocal:{get:function(){return this.selectedList},set:function(t){this.$emit("updateSelected",t)}},filteredBase:function(){var t=this;return this.baseListLocal.filter(function(e){return t.isAgent?e.enterpriseName.toLowerCase().includes(t.baseValue.toLowerCase()):e.name.toLowerCase().includes(t.baseValue.toLowerCase())})},filteredSelected:function(){var t=this;return this.selectedListLocal.filter(function(e){return t.isAgent?e.enterpriseName.toLowerCase().includes(t.selectedValue.toLowerCase()):e.name.toLowerCase().includes(t.selectedValue.toLowerCase())})}},methods:{addAll:function(){var t=Object(o.a)(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,[].concat(Object(n.a)(this.selectedListLocal),Object(n.a)(this.filteredBase));case 2:this.selectedListLocal=t.sent,this.baseListLocal=this.baseListLocal.filter(function(t){return!e.filteredBase.includes(t)}),this.baseValue="";case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),transferToRight:function(t){this.baseListLocal=this.baseListLocal.filter(function(e){return e.id!==t.id}),this.selectedListLocal=[].concat(Object(n.a)(this.selectedListLocal),[t])},transferToLeft:function(t){this.selectedListLocal=this.selectedList.filter(function(e){return e.id!==t.id}),this.baseListLocal=[].concat(Object(n.a)(this.baseList),[t])},removeAll:function(){this.baseListLocal=[].concat(Object(n.a)(this.baseListLocal),Object(n.a)(this.selectedListLocal)),this.selectedListLocal=[]}}}),l=r(6),component=Object(l.a)(c,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"duallist"},[r("h6",{staticClass:"duallist-title m-0 pb-0 white"},[t._v(t._s(t.title))]),t._v(" "),r("div",{staticClass:"duallist-box"},[r("div",{staticClass:"duallist-box-border duallist-box-border-first"},[r("div",{staticClass:"duallist-box-search"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.baseValue,expression:"baseValue"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search"},domProps:{value:t.baseValue},on:{input:function(e){e.target.composing||(t.baseValue=e.target.value)}}})]),t._v(" "),t.filteredBase.length?r("ul",{staticClass:"list-group",attrs:{name:"list-item"}},t._l(t.filteredBase,function(b){return r("li",{key:b.id,staticClass:"list-group-item",on:{click:function(e){return t.transferToRight(b)}}},[t._v("\n          "+t._s(t.isAgent?b.enterpriseName:b.name)+"\n        ")])}),0):t._e()]),t._v(" "),r("transition",{attrs:{name:"fade"}},[t.filteredBase.length?r("div",{staticClass:"btn-wrapper"},[r("a",{staticClass:"btn-move",on:{click:t.addAll}})]):t._e()])],1),t._v(" "),r("div",{staticClass:"duallist-box"},[r("div",{staticClass:"duallist-box-border duallist-box-border"},[r("div",{staticClass:"duallist-box-search"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedValue,expression:"selectedValue"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search"},domProps:{value:t.selectedValue},on:{input:function(e){e.target.composing||(t.selectedValue=e.target.value)}}})]),t._v(" "),t.filteredSelected.length?r("ul",{staticClass:"list-group",attrs:{name:"list-item"}},t._l(t.filteredSelected,function(b){return r("li",{key:b.id,staticClass:"list-group-item selected",on:{click:function(e){return t.transferToLeft(b)}}},[t._v("\n          "+t._s(t.isAgent?b.enterpriseName:b.name)+"\n        ")])}),0):t._e()]),t._v(" "),r("transition",{attrs:{name:"fade"}},[t.filteredSelected.length?r("div",{staticClass:"btn-wrapper"},[r("a",{staticClass:"btn-empty",on:{click:t.removeAll}})]):t._e()])],1)])},[],!1,null,null,null);e.a=component.exports},347:function(t,e,r){"use strict";r(52);var n=r(11),o={props:{item:{required:!0,type:Object}},data:function(){return{filters:[],filterName:null}},computed:{data:function(){return{filterName:this.filterName,filter:this.item}}},beforeMount:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getFilters();case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:{selectFilter:function(t){console.log(t.filter),this.$emit("updateFilter",t.filter)},getFilters:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,data;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$axios.get("save-filter");case 3:return e=t.sent,data=e.data,t.next=7,data;case 7:this.filters=t.sent,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}},t,this,[[0,10]])}));return function(){return t.apply(this,arguments)}}(),save:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.post("save-filter",this.data);case 2:if(e=t.sent,!e.data){t.next=10;break}return this.$toast.success("Saved: Search Criteria"),t.next=8,this.getFilters();case 8:t.next=11;break;case 10:case 11:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},c=r(6),component=Object(c.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"p-3 bg-light d-flex justify-content-between"},[r("div",{staticClass:"input-group w-25"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.filterName,expression:"filterName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Save Search Criteria"},domProps:{value:t.filterName},on:{input:function(e){e.target.composing||(t.filterName=e.target.value)}}}),t._v(" "),r("div",{staticClass:"input-group-append"},[r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.save}},[t._v("\n        Save\n      ")])])]),t._v(" "),r("b-dropdown",{attrs:{text:"My Saved Searches",variant:"primary"}},t._l(t.filters,function(e){return r("b-dropdown-item",{key:e.id,on:{click:function(r){return t.selectFilter(e)}}},[t._v(t._s(e.filterName))])}),1)],1)},[],!1,null,null,null);e.a=component.exports},351:function(t,e,r){var content=r(363);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(31).default)("32d58888",content,!0,{sourceMap:!1})},355:function(t,e,r){"use strict";r.r(e);r(29),r(9),r(60),r(52);var n=r(11),o=(r(13),r(10),r(0)),c=r(26),l=r(344),d=r(347),v={components:{DuallistBox:l.a,SaveFilter:d.a},data:function(){return{hasResponse:!1,modal:!1,reports:[],report:null,currentPage:1,perPage:10,pageOptions:[5,10,15],tableFields:[{key:"date",label:"Date"},{key:"name",label:"Report Name"},{key:"actions",label:"Actions"}],item:{startTime:null,callTypes:[]},data:{cscdailydigest:[],cscdailyivrdigest:[],callshistorical:[],maxwaittimebyid:[],amwaterteams:{actual:{awfte:0,awhours:0,agencyfte:0,agencyhours:0}}},sendData:{note:null,forecasted:0,forecastedAwFte:143,forecastedAwHours:1144,forecastedAgencyFte:115,forecastedAgencyHours:1120},testItem:{amwaterteams:{actual:{awfte:82,awhours:656,agencyfte:115,agencyhours:917}},callshistorical:[{offered:356,handled:346,id:6084,answered:350,slanswered:283,abandoned:10,maxwaittime:317,asa:36,aht:529},{offered:356,handled:346,id:6084,answered:350,slanswered:283,abandoned:10,maxwaittime:317,asa:36,aht:529}],cscdailyivrdigest:[{name:"CSC_MAIN_N_CT",date:"2019-04-19",offered:"13510",calltypeid:"6096",contained:"6468",overflowout:"7042"},{name:"CSC_MAIN_N_CT",date:"2019-04-19",offered:"6000",calltypeid:"6096",contained:"6468",overflowout:"7042"}],cscdailydigest:[{identifier:"BILLING_PQ",date:"2019-04-19",offered:"1822"},{identifier:"EMERGENCY_PQ",date:"2019-04-19",offered:"947"},{identifier:"MAKEPAYMENT_PQ",date:"2019-04-19",offered:"386"},{identifier:"OTHER_PQ",date:"2019-04-19",offered:"1916"},{identifier:"SERVICE_PQ",date:"2019-04-19",offered:"1974"},{identifier:"BILLING_PQ",date:"2019-04-19",offered:"1822"},{identifier:"EMERGENCY_PQ",date:"2019-04-19",offered:"947"},{identifier:"MAKEPAYMENT_PQ",date:"2019-04-19",offered:"386"},{identifier:"OTHER_PQ",date:"2019-04-19",offered:"1916"},{identifier:"SERVICE_PQ",date:"2019-04-19",offered:"1974"}]}}},computed:Object(o.a)({},Object(c.d)("shared",["callTypes"]),{optionsCallTypes:function(){var t=this;return{hasFilter:this.callTypes.filter(function(e){return!t.item.callTypes.some(function(t){return t.id===e.id})}),baseList:this.callTypes,selectedList:[],title:"Call Types"}},saveData:function(){return{name:"AMWater-".concat(this.item.startTime),date:this.item.startTime,data:{note:this.sendData.note,forecasted:this.sendData.forecasted,amwaterteams:{awfte:{forecasted:this.sendData.forecastedAwFte,actual:this.data.amwaterteams.actual.awfte},awhours:{forecasted:this.sendData.forecastedAwHours,actual:this.data.amwaterteams.actual.awhours},agencyfte:{forecasted:this.sendData.forecastedAgencyFte,actual:this.data.amwaterteams.actual.agencyfte},agencyhours:{forecasted:this.sendData.forecastedAgencyHours,actual:this.data.amwaterteams.actual.agencyhours},shrinkage:{aw:this.shrinkAgePerc("aw"),agency:this.shrinkAgePerc("agency")}},maxwaittimebyid:{name:this.data.maxwaittimebyid[0].name,waittime:this.data.maxwaittimebyid[0].waittime,date:this.data.maxwaittimebyid[0].date},callshistorical:{oldestCall:this.totalOldestCall,asa:this.totalAsa,aht:this.totalAht},cscdailyivrdigest:{volumeIn:this.totalOffered,contained:this.totalContained,outflowToQueue:this.totalOverflowOut,containmentRate:this.containmentRate},cscdailydigest:{billing:{count:this.breakdownCount("BILLING_PQ"),percentage:this.breakdownPercentage("BILLING_PQ")},emergency:{count:this.breakdownCount("EMERGENCY_PQ"),percentage:this.breakdownPercentage("EMERGENCY_PQ")},makePayment:{count:this.breakdownCount("MAKEPAYMENT_PQ"),percentage:this.breakdownPercentage("MAKEPAYMENT_PQ")},other:{count:this.breakdownCount("OTHER_PQ"),percentage:this.breakdownPercentage("OTHER_PQ")},service:{count:this.breakdownCount("SERVICE_PQ"),percentage:this.breakdownPercentage("SERVICE_PQ")}}}}},containmentRate:function(){return(+this.totalContained/+this.totalOffered*100).toFixed(2)},totalContained:function(){return this.data.cscdailyivrdigest.reduce(function(t,e){return t+ +e.contained},0)},totalOffered:function(){return this.data.cscdailyivrdigest.reduce(function(t,e){return t+ +e.offered},0)},totalOverflowOut:function(){return this.data.cscdailyivrdigest.reduce(function(t,e){return t+ +e.overflowout},0)},totalOldestCall:function(){return this.data.callshistorical.reduce(function(t,e){return t>e.maxwaittime?t:e.maxwaittime},0)},totalCallSize:function(){return this.data.callshistorical.reduce(function(t,e){return t+e.handled},0)},totalAsa:function(){return this.data.callshistorical.map(function(t){return t.handled*t.asa}).reduce(function(t,e){return t+e},0)/this.totalCallSize},totalAht:function(){return this.data.callshistorical.map(function(t){return t.handled*t.aht}).reduce(function(t,e){return t+e},0)/this.totalCallSize},totalBreakdown:function(){return this.data.cscdailydigest.reduce(function(t,e){return t+ +e.offered},0)}}),beforeMount:function(){this.item.callTypes&&this.getShared({endpoint:"shared/calltypes",key:"callTypes"})},methods:Object(o.a)({},Object(c.b)({getShared:"shared/getShared"}),{shrinkAgePerc:function(t){var e=this.sendData,r=e.forecastedAwFte,n=e.forecastedAwHours,o=e.forecastedAgencyFte,c=e.forecastedAgencyHours,l=this.data.amwaterteams.actual,d=l.awfte,v=l.awhours,m=l.agencyfte,_=l.agencyhours;if("aw"===t){var f=+r+ +n;return(100*(f-(d+v))/f).toFixed(2)}if("agency"===t){var h=+o+ +c,w=(100*(h-(m+_))/h).toFixed(2);return console.log(_),w}},breakdownPercentage:function(t){var e=this.data.cscdailydigest.filter(function(e){return e.identifier===t}).reduce(function(t,e){return t+ +e.offered},0);return console.log(e),(100*e/this.totalBreakdown).toFixed(2)},breakdownCount:function(t){return this.data.cscdailydigest.filter(function(e){return e.identifier===t}).reduce(function(t,e){return t+ +e.offered},0)},exportTableToExcel:function(){var t=this;return function(table,e){table.nodeType||(table=document.getElementById(table));var r,n={worksheet:e||"Worksheet",table:table.innerHTML},link=document.createElement("a");link.download="AMWater-".concat(t.report.date),link.href="data:application/vnd.ms-excel;base64,"+function(s){return window.btoa(unescape(encodeURIComponent(s)))}((r=n,'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'.replace(/{(\w+)}/g,function(t,p){return r[p]}))),link.click()}},getReports:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,data;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("daily-metrics");case 2:e=t.sent,data=e.data,this.reports=data;case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getReportById:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,data;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("daily-metrics/".concat(e));case 2:return r=t.sent,data=r.data,t.next=6,data;case 6:return this.report=t.sent,t.next=9,!0;case 9:this.modal=t.sent;case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),saveReport:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$axios.post("daily-metrics",this.saveData);case 3:return t.next=5,this.$toast.success("Report Created");case 5:t.next=11;break;case 7:return t.prev=7,t.t0=t.catch(0),t.next=11,this.$toast.error(t.t0.response.statusText);case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(){return t.apply(this,arguments)}}(),search:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,r,n,o,c,l=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.hasResponse=!1,this.item.endTime=this.item.startTime,t.prev=2,t.next=5,this.$axios.post("cscdailydigest/daily",this.item);case 5:return e=t.sent,t.next=8,this.$axios.post("callshistorical/daily",this.item);case 8:return r=t.sent,t.next=11,this.$axios.post("cscdailyivrdigest/daily",this.item);case 11:return n=t.sent,t.next=14,this.$axios.post("maxwaittime/byid",this.item);case 14:return o=t.sent,t.next=17,this.$axios.post("amwaterteams/daily",this.item);case 17:return c=t.sent,t.next=20,Promise.all([n,e,r,o,c]).then(function(t){l.data={cscdailydigest:t[1].data,callshistorical:t[2].data,cscdailyivrdigest:t[0].data,maxwaittimebyid:t[3].data,amwaterteams:{actual:{awfte:t[4].data[0].handled,awhours:656,agencyfte:t[4].data[1].handled,agencyhours:97}}},l.hasResponse=!0});case 20:this.sendData={forecastedAwFte:82,forecastedAwHours:656,forecastedAgencyFte:115,forecastedAgencyHours:97},t.next=26;break;case 23:t.prev=23,t.t0=t.catch(2),console.log(t.t0);case 26:case"end":return t.stop()}},t,this,[[2,23]])}));return function(){return t.apply(this,arguments)}}()})},m=(r(362),r(6)),component=Object(m.a)(v,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("b-tabs",{staticClass:"nav-variant",attrs:{lazy:""}},[r("b-tab",{staticClass:"p-3",attrs:{title:"Create Report"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:!t.hasResponse,expression:"!hasResponse"}],staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("label",[t._v("Select Date")]),t._v(" "),r("vue-ctk-date-time-picker",{attrs:{label:"Select Date","auto-close":"","no-header":"","only-date":"",formatted:"YYYY-MM-DD",format:"YYYY-MM-DD",color:"#727cf5","enable-button-validate":""},model:{value:t.item.startTime,callback:function(e){t.$set(t.item,"startTime",e)},expression:"item.startTime"}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"col-md-6"},[r("label",[t._v("End Date")]),t._v(" "),r("vue-ctk-date-time-picker",{attrs:{"auto-close":"","no-header":"","only-date":"",formatted:"YYYY-MM-DD",format:"YYYY-MM-DD",color:"#727cf5","enable-button-validate":""},model:{value:t.item.endTime,callback:function(e){t.$set(t.item,"endTime",e)},expression:"item.endTime"}})],1)]),t._v(" "),r("duallist-box",{staticClass:"mb-2 mt-2",attrs:{"base-list":t.optionsCallTypes.hasFilter.length?t.optionsCallTypes.hasFilter:t.optionsCallTypes.baseList,"selected-list":t.item.callTypes,title:t.optionsCallTypes.title},on:{updateSelected:function(e){t.item.callTypes=e},updateBase:function(e){t.optionsCallTypes.baseList=e}}}),t._v(" "),r("save-filter",{staticClass:"mt-2 mb-2",attrs:{item:{callTypes:t.item.callTypes}},on:{updateFilter:function(e){t.item.callTypes=e.callTypes}}}),t._v(" "),r("button",{staticClass:"btn btn-primary mt-2",on:{click:t.search}},[t._v("Search")])],1),t._v(" "),t.hasResponse?r("button",{staticClass:"btn btn-warning mb-2",on:{click:function(e){t.hasResponse=!t.hasResponse}}},[t._v("\n        Back to Filter\n      ")]):t._e(),t._v(" "),t.hasResponse?r("table",{staticClass:"table table-bordered text-center table-sm"},[r("colgroup",[r("col",{staticStyle:{width:"130px"}}),t._v(" "),r("col",{staticStyle:{width:"122px"}}),t._v(" "),r("col",{staticStyle:{width:"253px"}}),t._v(" "),r("col",{staticStyle:{width:"131px"}}),t._v(" "),r("col",{staticStyle:{width:"152px"}}),t._v(" "),r("col",{staticStyle:{width:"146px"}}),t._v(" "),r("col",{staticStyle:{width:"109px"}}),t._v(" "),r("col",{staticStyle:{width:"119px"}}),t._v(" "),r("col",{staticStyle:{width:"138px"}})]),t._v(" "),r("tr",[r("th",{attrs:{colspan:"2"}},[t._v("Volume to Queue")]),t._v(" "),r("th",{attrs:{colspan:"2"}},[t._v("Oldest Call")]),t._v(" "),r("th",[t._v("ASA")]),t._v(" "),r("th",{attrs:{colspan:"4"}},[t._v("AHT")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"2"}},[t._v(t._s(t.totalOverflowOut))]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{colspan:"2",rowspan:"3"}},[t._v("\n            "+t._s(t.$moment.duration(t.totalOldestCall,"second").format("mm:ss",{trim:!1}))+"\n          ")]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{rowspan:"4"}},[t._v("\n            "+t._s(t.$moment.duration(t.totalAsa,"second").format("mm:ss",{trim:!1}))+"\n          ")]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{colspan:"4",rowspan:"4"}},[t._v("\n            "+t._s(t.$moment.duration(t.totalAht,"second").format("mm:ss",{trim:!1}))+"\n          ")])]),t._v(" "),r("tr",[r("td",[t._v("Forecasted")]),t._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.forecasted,expression:"sendData.forecasted"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.sendData.forecasted},on:{input:function(e){e.target.composing||t.$set(t.sendData,"forecasted",e.target.value)}}})])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"2",rowspan:"2"}})]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-bold"},[t._v("\n            "+t._s(t.data.maxwaittimebyid[0].name)+"\n          ")]),t._v(" "),r("td",[t._v("\n            "+t._s(t.$moment.duration(+t.data.maxwaittimebyid[0].waittime,"second").format("mm:ss",{trim:!1}))+"\n\n            -\n            "+t._s(t.$moment(t.data.maxwaittimebyid[0].date).format("hh:mm A"))+"\n          ")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"9"}})]),t._v(" "),r("tr",{staticClass:"font-weight-bold"},[r("td",{attrs:{colspan:"2"}},[t._v("IVR Performance")]),t._v(" "),r("td",{attrs:{colspan:"4"}},[t._v("Staffing")]),t._v(" "),r("td",{attrs:{colspan:"3"}},[t._v("Breakdown of Call Type")])]),t._v(" "),r("tr",[r("td",[t._v("Volume In")]),t._v(" "),r("td",[t._v(t._s(t.totalOffered))]),t._v(" "),r("td"),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Forecasted")]),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Actual")]),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Shrinkage")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Billing")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("BILLING_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("BILLING_PQ"))+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Contained")]),t._v(" "),r("td",[t._v(t._s(t.totalContained))]),t._v(" "),r("td",[t._v("AW FTE")]),t._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.forecastedAwFte,expression:"sendData.forecastedAwFte"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.sendData.forecastedAwFte},on:{input:function(e){e.target.composing||t.$set(t.sendData,"forecastedAwFte",e.target.value)}}})]),t._v(" "),r("td",[t._v(t._s(t.data.amwaterteams.actual.awfte))]),t._v(" "),r("td",{attrs:{rowspan:"2"}},[t._v(t._s(t.shrinkAgePerc("aw"))+"%")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Emergency")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("EMERGENCY_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("EMERGENCY_PQ"))+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Containment Rate")]),t._v(" "),r("td",[t._v(t._s(t.containmentRate)+"%")]),t._v(" "),r("td",[t._v("AW Hours")]),t._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.forecastedAwHours,expression:"sendData.forecastedAwHours"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.sendData.forecastedAwHours},on:{input:function(e){e.target.composing||t.$set(t.sendData,"forecastedAwHours",e.target.value)}}})]),t._v(" "),r("td",[t._v(t._s(t.data.amwaterteams.actual.awhours))]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Make Payment")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("MAKEPAYMENT_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("MAKEPAYMENT_PQ"))+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Outflow to Queue")]),t._v(" "),r("td",[t._v(t._s(t.totalOverflowOut))]),t._v(" "),r("td",[t._v("Agency FTE")]),t._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.forecastedAgencyFte,expression:"sendData.forecastedAgencyFte"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.sendData.forecastedAgencyFte},on:{input:function(e){e.target.composing||t.$set(t.sendData,"forecastedAgencyFte",e.target.value)}}})]),t._v(" "),r("td",[t._v(t._s(t.data.amwaterteams.actual.agencyfte))]),t._v(" "),r("td",{attrs:{rowspan:"2"}},[t._v(t._s(t.shrinkAgePerc("agency"))+"%")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Other")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("OTHER_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("OTHER_PQ"))+"%")])]),t._v(" "),r("tr",[r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("Agency Hours")]),t._v(" "),r("td",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.forecastedAgencyHours,expression:"sendData.forecastedAgencyHours"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.sendData.forecastedAgencyHours},on:{input:function(e){e.target.composing||t.$set(t.sendData,"forecastedAgencyHours",e.target.value)}}})]),t._v(" "),r("td",[t._v(t._s(t.data.amwaterteams.actual.agencyhours))]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Service")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("SERVICE_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("SERVICE_PQ"))+"%")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"9"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.note,expression:"sendData.note"}],staticClass:"form-control text-center",attrs:{placeholder:"Your note here",type:"text"},domProps:{value:t.sendData.note},on:{input:function(e){e.target.composing||t.$set(t.sendData,"note",e.target.value)}}})])])]):t._e(),t._v(" "),t.hasResponse?r("button",{staticClass:"btn btn-primary",on:{click:t.saveReport}},[t._v("\n        Save Report\n      ")]):t._e()]),t._v(" "),r("b-tab",{staticClass:"p-3",attrs:{title:"My Saved Reports"},on:{click:t.getReports}},[r("b-table",{attrs:{items:t.reports,fields:t.tableFields,"current-page":t.currentPage,"per-page":t.perPage,"sort-by":"date",striped:"",hover:"","show-empty":""},scopedSlots:t._u([{key:"actions",fn:function(e){return[r("button",{staticClass:"btn btn-primary",on:{click:function(r){return t.getReportById(e.item.id)}}},[r("i",{staticClass:"mdi mdi-eye"}),t._v(" View\n          ")]),t._v(" "),r("button",{staticClass:"btn btn-danger",on:{click:function(r){return t.deleteReport(e.item.id)}}},[r("i",{staticClass:"mdi mdi-trash-can-outline"}),t._v(" Delete\n          ")])]}}])}),t._v(" "),t.reports.length?r("b-col",{staticClass:"my-1 pl-0",attrs:{md:"6"}},[r("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.reports.length,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1):t._e()],1)],1),t._v(" "),t.report?r("b-modal",{attrs:{size:"xl",title:"Report Detail","ok-only":""},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[t.hasResponse?r("table",{staticClass:"table table-bordered text-center table-sm",attrs:{id:"table"}},[r("colgroup",[r("col",{staticStyle:{width:"130px"}}),t._v(" "),r("col",{staticStyle:{width:"122px"}}),t._v(" "),r("col",{staticStyle:{width:"253px"}}),t._v(" "),r("col",{staticStyle:{width:"131px"}}),t._v(" "),r("col",{staticStyle:{width:"152px"}}),t._v(" "),r("col",{staticStyle:{width:"146px"}}),t._v(" "),r("col",{staticStyle:{width:"109px"}}),t._v(" "),r("col",{staticStyle:{width:"119px"}}),t._v(" "),r("col",{staticStyle:{width:"138px"}})]),t._v(" "),r("tr",[r("th",{attrs:{colspan:"2"}},[t._v("Volume to Queue")]),t._v(" "),r("th",{attrs:{colspan:"2"}},[t._v("Oldest Call")]),t._v(" "),r("th",[t._v("ASA")]),t._v(" "),r("th",{attrs:{colspan:"4"}},[t._v("AHT")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"2"}},[t._v("\n          "+t._s(t.report.data.cscdailyivrdigest.outflowToQueue)+"\n        ")]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{colspan:"2",rowspan:"3"}},[t._v("\n          "+t._s(t.$moment.duration(t.report.data.callshistorical.oldestCall,"second").format("mm:ss",{trim:!1}))+"\n        ")]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{rowspan:"4"}},[t._v("\n          "+t._s(t.$moment.duration(t.report.data.callshistorical.asa,"second").format("mm:ss",{trim:!1}))+"\n        ")]),t._v(" "),r("td",{staticClass:"font-weight-bold h1",attrs:{colspan:"4",rowspan:"4"}},[t._v("\n          "+t._s(t.$moment.duration(t.report.data.callshistorical.aht,"second").format("mm:ss",{trim:!1}))+"\n        ")])]),t._v(" "),r("tr",[r("td",[t._v("Forecasted")]),t._v(" "),r("td",[t._v(t._s(t.report.data.forecasted))])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"2",rowspan:"2"}})]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-bold"},[t._v("\n          "+t._s(t.report.data.maxwaittimebyid)+"\n          "+t._s(t.report.data.maxwaittimebyid.name)+"\n        ")]),t._v(" "),r("td",[t._v("\n          "+t._s(t.$moment.duration(+t.report.data.maxwaittimebyid.waittime,"second").format("mm:ss",{trim:!1}))+"\n          -\n          "+t._s(t.$moment(t.report.data.maxwaittimebyid.date).format("hh:mm A"))+"\n        ")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"9"}})]),t._v(" "),r("tr",{staticClass:"font-weight-bold"},[r("td",{attrs:{colspan:"2"}},[t._v("IVR Performance")]),t._v(" "),r("td",{attrs:{colspan:"4"}},[t._v("Staffing")]),t._v(" "),r("td",{attrs:{colspan:"3"}},[t._v("Breakdown of Call Type")])]),t._v(" "),r("tr",[r("td",[t._v("Volume In")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailyivrdigest.volumeIn))]),t._v(" "),r("td"),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Forecasted")]),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Actual")]),t._v(" "),r("td",{staticClass:"font-weight-bold"},[t._v("Shrinkage")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Billing")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.billing.count))]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.billing.percentage)+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Contained")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailyivrdigest.contained))]),t._v(" "),r("td",[t._v("AW FTE")]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.awfte.forecasted))]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.awfte.actual))]),t._v(" "),r("td",{attrs:{rowspan:"2"}},[t._v(t._s(t.report.data.amwaterteams.shrinkage.aw)+"%")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Emergency")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.emergency.count))]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.emergency.percentage)+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Containment Rate")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailyivrdigest.containmentRate)+"%")]),t._v(" "),r("td",[t._v("AW Hours")]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.awhours.forecasted))]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.awhours.actual))]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Make Payment")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.makePayment.count))]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.makePayment.percentage)+"%")])]),t._v(" "),r("tr",[r("td",[t._v("Outflow to Queue")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailyivrdigest.outflowToQueue))]),t._v(" "),r("td",[t._v("Agency FTE")]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.agencyfte.forecasted))]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.agencyfte.actual))]),t._v(" "),r("td",{attrs:{rowspan:"2"}},[t._v(t._s(t.report.data.amwaterteams.shrinkage.agency)+"%")]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Other")]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.other.count))]),t._v(" "),r("td",[t._v(t._s(t.report.data.cscdailydigest.other.percentage)+"%")])]),t._v(" "),r("tr",[r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("Agency Hours")]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.agencyhours.forecasted))]),t._v(" "),r("td",[t._v(t._s(t.report.data.amwaterteams.agencyhours.actual))]),t._v(" "),r("td",{staticClass:"text-uppercase"},[t._v("Service")]),t._v(" "),r("td",[t._v(t._s(t.breakdownCount("SERVICE_PQ")))]),t._v(" "),r("td",[t._v(t._s(t.breakdownPercentage("SERVICE_PQ"))+"%")])]),t._v(" "),r("tr",[r("td",{attrs:{colspan:"9"}},[t._v(t._s(t.report.data.note))])])]):t._e(),t._v(" "),r("button",{staticClass:"btn btn-primary mt-2",on:{click:function(e){t.exportTableToExcel("amwater")("table")}}},[t._v("\n      Export to Excel\n    ")])]):t._e()],1)},[],!1,null,"512964ea",null);e.default=component.exports},362:function(t,e,r){"use strict";var n=r(351);r.n(n).a},363:function(t,e,r){(t.exports=r(30)(!1)).push([t.i,".table>tr>td[data-v-512964ea]{vertical-align:middle}",""])}}]);