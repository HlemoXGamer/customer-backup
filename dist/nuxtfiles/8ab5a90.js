(window.webpackJsonp=window.webpackJsonp||[]).push([[50,25],{735:function(t,n,r){"use strict";var e={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let o;const c=new Uint8Array(16);function d(){if(!o&&(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(c)}const l=[];for(let i=0;i<256;++i)l.push((i+256).toString(16).slice(1));function m(t,n=0){return(l[t[n+0]]+l[t[n+1]]+l[t[n+2]]+l[t[n+3]]+"-"+l[t[n+4]]+l[t[n+5]]+"-"+l[t[n+6]]+l[t[n+7]]+"-"+l[t[n+8]]+l[t[n+9]]+"-"+l[t[n+10]]+l[t[n+11]]+l[t[n+12]]+l[t[n+13]]+l[t[n+14]]+l[t[n+15]]).toLowerCase()}n.a=function(t,n,r){if(e.randomUUID&&!n&&!t)return e.randomUUID();const o=(t=t||{}).random||(t.rng||d)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,n){r=r||0;for(let i=0;i<16;++i)n[r+i]=o[i];return n}return m(o)}},893:function(t,n,r){"use strict";r.r(n);r(29),r(15),r(47);var e=r(7),o=(r(40),r(5));function c(t){return o.a.get("/collections/".concat(t,"/products"))}var d={asyncData:function(t){return Object(e.a)(regeneratorRuntime.mark((function n(){var r,e,d;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.params,n.next=3,l=r.id,o.a.get("/collections/".concat(l));case 3:return e=n.sent.data,n.next=6,c(r.id);case 6:return d=n.sent.data,n.abrupt("return",{collection:e,products:d.data});case 8:case"end":return n.stop()}var l}),n)})))()},computed:{cover:function(){return this.collection.cover?this.collection.cover:"/images/banner23.png"}}},l=r(8),component=Object(l.a)(d,(function(){var t=this,n=t._self._c;return n("div",[n("v-card",{attrs:{height:"400",rounded:"xl"}},[n("v-img",{staticClass:"white--text align-end justify-end",attrs:{src:t.cover,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)",height:"400px"}},[n("div",{staticClass:"pa-10"},[n("h1",[t._v(t._s(t.collection.name))]),t._v(" "),n("h4",{staticClass:"mt-5"},[t._v(t._s(t.collection.description))])])])],1),t._v(" "),n("v-row",{staticClass:"mt-10"},t._l(t.products,(function(t){return n("v-col",{key:t.id,attrs:{cols:"3"}},[n("CommonProduct",{attrs:{product:t}})],1)})),1)],1)}),[],!1,null,null,null);n.default=component.exports;installComponents(component,{CommonProduct:r(749).default})}}]);