(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{746:function(t,e,r){"use strict";var n=r(4),c=r(747).start;n({target:"String",proto:!0,forced:r(748)},{padStart:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}})},747:function(t,e,r){var n=r(11),c=r(82),o=r(28),l=r(325),h=r(48),f=n(l),m=n("".slice),d=Math.ceil,v=function(t){return function(e,r,n){var l,v,y=o(h(e)),S=c(r),k=y.length,O=void 0===n?" ":o(n);return S<=k||""==O?y:((v=f(O,d((l=S-k)/O.length))).length>l&&(v=m(v,0,l)),t?y+v:v+y)}};t.exports={start:v(!1),end:v(!0)}},748:function(t,e,r){var n=r(69);t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},817:function(t,e,r){"use strict";r.r(e);var n=r(6),c=(r(33),r(36),r(16),r(746),r(9),r(37),r(32),r(15),r(22),r(25),r(21),r(26),r(17)),o=r(118);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{currentDay:"",currentHour:"",currentMinute:"",minutes:this.generateMinutes(0,59)}},watch:{currentHour:function(t){(console.log(t),this.isPreOrder&&"8 pm"===t?this.minutes=this.generateMinutes(0,30):this.minutes=this.generateMinutes(0,59),this.currentMinute="",this.isSameDay)&&(t.includes("pm")?(new Date).getHours()==parseInt(t)+12&&(this.minutes=Object(o.a)("asap",new Date).minutes):(new Date).getHours()==parseInt(t)&&(this.minutes=Object(o.a)("asap",new Date).minutes),"8 pm"===t&&(this.minutes=this.generateMinutes(0,30)))}},methods:{showPayment:function(){var t;if(!this.currentDay||!this.currentHour||!this.currentMinute)return this.$toast.error(this.$t("checkout.delivery_time_required"));(this.isPreOrder||this.isSameDay)&&this.$store.commit("checkout/SET_DELIVERY_DATE",this.transformDate(this.currentDay+" "+this.currentHour+" "+(null!==(t=this.currentMinute)&&void 0!==t?t:0))),this.$store.dispatch("checkout/checkout",JSON.parse(localStorage.getItem("shipping_address"))),this.$store.commit("checkout/SHOW_SUMMARY")},back:function(){this.$store.commit("checkout/SHOW_SHIPPING")},transformDate:function(t){var e=t.split(" "),r=parseInt(e[2],10),n={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[e[1]],c=parseInt(e[3],10),o=parseInt(e[5],10),l=e[4],h=new Date;h.setFullYear(h.getFullYear(),n,r),h.setHours(c,o,0,0);var f=h.getFullYear(),m=(h.getMonth()+1).toString().padStart(2,"0"),d=h.getDate().toString().padStart(2,"0"),v=h.getHours().toString().padStart(2,"0"),y=h.getMinutes().toString().padStart(2,"0"),S=h.getSeconds().toString().padStart(2,"0");return"".concat(f,"-").concat(m,"-").concat(d," ").concat(v,":").concat(y,":").concat(S," ").concat(l)},generateMinutes:function(t,e){for(var r=[],i=t;i<=e;i++)r.push(i<10?"0".concat(i):i.toString());return r}},computed:h(h({},Object(c.d)("timer",["days","hours","minutes","ampm","payment"])),{},{isPreOrder:function(){return"pre-order"==this.$store.state.checkout.type},isSameDay:function(){return"same-day"==this.$store.state.checkout.type},isAsap:function(){return"asap"==this.$store.state.checkout.type}})},m=r(8),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e("v-col",{attrs:{cols:"12"}},[t.isPreOrder||t.isSameDay?e("v-row",{staticClass:"align-center justify-center mb-5 mt-0 pt-0"},[e("scroll-picker-group",{staticClass:"flex font-weight-bold",staticStyle:{color:"#65382c"}},[e("scroll-picker",{attrs:{options:t.days},model:{value:t.currentDay,callback:function(e){t.currentDay=e},expression:"currentDay"}}),t._v(" "),e("scroll-picker",{attrs:{options:t.hours},model:{value:t.currentHour,callback:function(e){t.currentHour=e},expression:"currentHour"}}),t._v(" "),e("scroll-picker",{attrs:{options:t.minutes},model:{value:t.currentMinute,callback:function(e){t.currentMinute=e},expression:"currentMinute"}})],1)],1):t._e(),t._v(" "),t.isAsap?e("v-row",{staticClass:"align-center justify-center text-h6"},[e("p",{staticClass:"font-primary font-weight-bold py-5",staticStyle:{"font-size":"18px"}},[t._v("\n            Delivery will arrive after 40 min from Pay time\n        ")])]):t._e(),t._v(" "),e("v-card",[e("v-card-actions",{staticClass:"justify-space-between px-0"},[e("v-btn",{class:t.$vuetify.breakpoint.xs?"mt-4":"",staticStyle:{background:"transparent !important"},attrs:{elevation:"0",text:"",color:"grey",large:"",dark:""},on:{click:t.back}},[e("v-icon",{attrs:{left:"en"===t.$i18n.locale,right:"ar"===t.$i18n.locale,large:""}},[t._v("\n                    mdi-chevron-"+t._s("en"===t.$i18n.locale?"left":"right")+"\n                ")]),t._v("\n                "+t._s(t.$t("checkout.time.return"))+"\n            ")],1),t._v(" "),e("v-btn",{staticClass:"rounded-lg to-payment",style:{flex:t.$vuetify.breakpoint.mobile?1:.7},attrs:{"x-large":"",height:"57",color:"#65382c",elevation:"0",dark:""},on:{click:t.showPayment}},[t._v("\n                "+t._s(t.$t("checkout.time.continue"))+"\n            ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);