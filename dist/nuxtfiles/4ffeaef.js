(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{732:function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),r.d(e,"f",(function(){return c})),r.d(e,"a",(function(){return l})),r.d(e,"e",(function(){return d})),r.d(e,"c",(function(){return f})),r.d(e,"d",(function(){return m})),r.d(e,"g",(function(){return v}));var n=r(5);function o(){return n.a.get("/customer/addresses")}function c(t){return n.a.get("/customer/addresses/"+t)}function l(data){return n.a.post("/customer/addresses",data)}function d(data){return n.a.post("customer/set/default/address/",data)}function f(){return n.a.get("/customer/get-default-location")}function m(data){return n.a.delete("customer/addresses/".concat(data))}function v(t,data){return n.a.put("/customer/addresses/"+t,data)}},733:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(5);function o(t){return n.a.get("/areas",{params:t})}},738:function(t,e,r){var content=r(755);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(2).default)("7336eb6e",content,!0,{sourceMap:!1})},754:function(t,e,r){"use strict";r(738)},755:function(t,e,r){var n=r(1)((function(i){return i[1]}));n.push([t.i,".location-tab{border:1px solid #eee;border-radius:10px;margin-left:-10px;margin-right:-10px;margin-top:10px;position:relative}.mobile-location .location-tab{margin-left:0!important;margin-right:0!important}.location-tab:not(.guest-tab) .disabled-row{opacity:.2;pointer-events:none}.location-tab:not(.guest-tab) .tab-title{padding-left:40px!important}[dir=rtl] .location-tab:not(.guest-tab) .tab-title{padding-left:0!important;padding-right:40px!important}.location-tab:not(.guest-tab) .tab-checkbox{position:absolute;top:40px}.location-tab.guest-tab .tab-checkbox{display:none}.location-tab .tab-title{color:#65382c}",""]),n.locals={},t.exports=n},772:function(t,e,r){"use strict";r.r(e);r(15),r(47),r(22),r(9),r(25),r(21),r(26);var n=r(6),o=r(7),c=(r(40),r(27),r(59),r(16),r(29),r(52),r(125),r(733)),l=r(732);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{item:0,area:null,address:null,areas:[],addresses:[],loading:!1,activeTab:"area"}},watch:{area:{handler:function(){this.$refs.area_select&&this.$refs.area_select.blur()},deep:!0}},computed:{disabled:function(){return"area"===this.activeTab&&!this.area||"address"===this.activeTab&&!this.addresses[this.item]}},methods:{setActive:function(t){this.activeTab=t},setDefaultAddress:function(address){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,localStorage.setItem("default_location","address"),localStorage.setItem("default_address",JSON.stringify(address)),e.next=5,Object(l.e)({address_id:address.id});case 5:t.$router.replace(t.localePath("/products")),t.$store.dispatch("cart/get"),t.loading=!1;case 8:case"end":return e.stop()}}),e)})))()},setDefaultBranch:function(area){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,r=area.branches,localStorage.setItem("default_location","area"),localStorage.setItem("default_area",JSON.stringify(area)),!(r.length>0)){e.next=19;break}if(!t.$auth.loggedIn){e.next=11;break}return n=r[0].id,e.next=9,Object(l.e)({branch_id:n,area_id:area.id});case 9:e.next=16;break;case 11:localStorage.setItem("guest_branch",JSON.parse(localStorage.getItem("default_area")).branches[0].id),localStorage.setItem("guest_area_id",JSON.parse(localStorage.getItem("default_area")).id),localStorage.setItem("guest_city_id",JSON.parse(localStorage.getItem("default_area")).branches[0].city_id),localStorage.setItem("guest_area_name",JSON.parse(localStorage.getItem("default_area")).name),localStorage.setItem("guest_city_name","Kuwait");case 16:t.$router.replace(t.localePath("/products")),e.next=20;break;case 19:t.$toast.error(t.$t("location.no_branches"));case 20:t.$store.dispatch("cart/get",{branch:r[0]}),t.loading=!1;case 22:case"end":return e.stop()}}),e)})))()},submitLocation:function(){"area"===this.activeTab?this.setDefaultBranch(this.area):this.setDefaultAddress(this.addresses[this.item])},getAddresses:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.b)();case 2:r=e.sent,data=r.data,t.addresses=data.map(t.transformAddress);case 5:case"end":return e.stop()}}),e)})))()},getAreas:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)();case 2:r=e.sent,data=r.data,t.areas=data;case 5:case"end":return e.stop()}}),e)})))()},transformAddress:function(address){var t=[];return address.street_name&&t.push(this.$t("profile.addresses.street_name")+" "+address.street_name),address.floor&&t.push(this.$t("profile.addresses.floor")+" "+address.floor),address.apartment&&t.push(this.$t("profile.addresses.apartment_no")+" "+address.apartment),address.block_no&&t.push(this.$t("profile.addresses.block_no")+" "+address.block_no),address.building_no&&t.push(this.$t("profile.addresses.building_number")+" "+address.block_no),f(f({},address),{},{address_info:t.join(", ")})},updateModelValue:function(data){}},mounted:function(){localStorage.removeItem("default_location"),localStorage.removeItem("default_address"),localStorage.removeItem("default_area"),this.getAddresses(),this.getAreas()}},v=(r(754),r(8)),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e("div",[e("v-row",{staticClass:"mb-5"},[e("v-col",{class:"text-center ".concat(t.$vuetify.breakpoint.mobile?"text-h4":"text-h3"),attrs:{cols:"12"}},[t._v("\n      "+t._s(t.$t("location.set_address"))+"\n    ")])],1),t._v(" "),e("v-form",[e("v-container",{class:"".concat(t.$vuetify.breakpoint.mobile?"mobile-location":"")},[e("v-row",{attrs:{justify:"space-between"}},[e("v-col",{class:"location-tab px-5 py-5 ".concat(t.$auth.loggedIn?"":"guest-tab"),attrs:{cols:t.$vuetify.breakpoint.mobile||!t.$auth.loggedIn?"12":"6"}},[e("div",[e("v-radio",{staticClass:"tab-checkbox",attrs:{"off-icon":"area"===t.activeTab?"$radioOn":"$radioOff"},on:{click:function(e){return t.setActive("area")}}})],1),t._v(" "),e("v-container",[e("v-row",{class:"".concat("area"!==t.activeTab?"disabled-row":"")},[e("v-col",{staticClass:"text-h4 tab-title",attrs:{cols:"12"}},[t._v(t._s(t.$t("location.select_your_area")))]),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("v-autocomplete",{ref:"area_select",attrs:{placeholder:t.$t("location.select_your_area"),"return-object":"",items:t.areas,"item-text":"ar"===t.$i18n.locale?"name_ar":"name_en","item-value":"id",outlined:""},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}})],1)],1)],1)],1),t._v(" "),t.$auth.loggedIn?e("v-col",{staticClass:"location-tab px-5 py-5",attrs:{cols:t.$vuetify.breakpoint.mobile?"12":"6"}},[e("div",[e("v-radio",{staticClass:"tab-checkbox",attrs:{"off-icon":"address"===t.activeTab?"$radioOn":"$radioOff"},on:{click:function(e){return t.setActive("address")}}})],1),t._v(" "),e("v-container",[e("v-row",{class:"".concat("address"!==t.activeTab?"disabled-row":"")},[e("v-col",{staticClass:"text-h4 tab-title",attrs:{cols:"12"}},[t._v("\n                "+t._s(t.$t("location.saved_addresses")))]),t._v(" "),e("v-item-group",{model:{value:t.item,callback:function(e){t.item=e},expression:"item"}},t._l(t.addresses,(function(address){return e("v-col",{key:address.id,attrs:{cols:"12"}},[e("v-item",{scopedSlots:t._u([{key:"default",fn:function(r){var n=r.active,o=r.toggle;return[e("v-card",{staticClass:"d-flex align-center",attrs:{outlined:"",rounded:"lg","min-height":"150",color:n?"#65382c":""},on:{click:o}},[e("v-card-text",[e("v-scroll-y-transition",[e("div",{class:"flex-grow-1 ".concat(n?"white--text":"black--text")},[e("p",[t._v(t._s(address.address))]),t._v(" "),e("p",[t._v("\n                              "+t._s(address.country_name)+"\n                              "+t._s(address.city_name)+"\n                              "+t._s(address.area_name)+"\n                            ")]),t._v(" "),e("p",[t._v(t._s(address.address_info))]),t._v(" "),e("p",[t._v(t._s(address.description))])])])],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1):t._e(),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("v-btn",{staticClass:"white--text",attrs:{block:"",color:"#65382c",loading:t.loading,disabled:t.disabled},on:{click:t.submitLocation}},[t._v("\n            "+t._s(t.$t("location.see_menu"))+"\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);