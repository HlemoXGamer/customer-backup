(window.webpackJsonp=window.webpackJsonp||[]).push([[58,16,28],{760:function(e,t,r){var content=r(779);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(2).default)("7eeeed7d",content,!0,{sourceMap:!1})},778:function(e,t,r){"use strict";r(760)},779:function(e,t,r){var n=r(1)((function(i){return i[1]}));n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),n.push([e.i,".v-card__actions>.rounded-lg[data-v-d56d28d0]{background:#65382c!important;padding:0 5rem}.v-card__actions>.to-payment[data-v-d56d28d0]{padding:0 1rem!important}",""]),n.locals={},e.exports=n},793:function(e,t,r){var content=r(837);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(2).default)("67b220ee",content,!0,{sourceMap:!1})},814:function(e,t,r){"use strict";r.r(t);var n={props:{dialog:{type:Boolean,default:!1},isAddress:{type:Boolean,default:!1},address:{type:Object,default:function(){}}},data:function(){return{center:{lat:29.33919817328526,lng:47.671376497490094},theAddress:null,searchTerm:""}},mounted:function(){this.getCurrentLocation()},methods:{getCurrentLocation:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e.center={lat:t.coords.latitude||0,lng:t.coords.longitude||0}}),(function(e){console.error("Error getting current location:",e)})):console.error("Geolocation is not supported in this browser.")},replaceMarker:function(e){this.center={lat:e.latLng.lat(),lng:e.latLng.lng()},this.geocodeLatLng({lat:e.latLng.lat(),lng:e.latLng.lng()})},geocodeLatLng:function(e){var t=this;(new google.maps.Geocoder).geocode({location:e},(function(e,r){if("OK"===r&&e[0]){console.log(e);var n=e[0].formatted_address;t.theAddress=n,console.log("Formatted Address:",t.theAddress),t.$emit("set-address",t.theAddress.split(" "),t.center)}else console.error("Geocoding failed due to:",r)}))},searchLocation:function(){var e=this;(new google.maps.Geocoder).geocode({address:this.searchTerm},(function(t,r){if("OK"===r&&t[0]){var n={lat:t[0].geometry.location.lat(),lng:t[0].geometry.location.lng()};e.center=n,e.replaceMarker({latLng:n})}else console.error("Search was not successful for the following reason:",r)}))}}},o=r(8),component=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t("div",[t("v-dialog",{attrs:{persistent:"","max-width":"1100"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t("v-card",{staticClass:"px-3 py-3 rounded-lg dialog-card",staticStyle:{position:"relative"},attrs:{color:"white"}},[t("v-btn",{staticStyle:{position:"absolute",top:"10px",right:"10px"},attrs:{icon:"",large:"",color:"#65382c"},on:{click:function(t){return e.$emit("close")}}},[t("v-icon",[e._v("mdi-close")])],1),e._v(" "),t("p",{staticClass:"font-primary text-h4 py-3 text-center font-weight-bold mb-3 mt-5"},[e._v("Pick a Location")]),e._v(" "),t("div",{staticStyle:{"padding-bottom":"10px"}},[t("v-text-field",{staticStyle:{"border-radius":"12px"},attrs:{"hide-details":"",clearable:"",flat:"",solo:"",placeholder:e.$t("common.areas.search_placeholder"),color:"#65382c","background-color":"#ededed",dense:"","prepend-inner-icon":"mdi-map-marker",height:"50"},on:{input:function(t){return e.searchLocation()}},model:{value:e.searchTerm,callback:function(t){e.searchTerm=t},expression:"searchTerm"}})],1),e._v(" "),t("GmapMap",{ref:"mapRef",staticStyle:{width:"100%",height:"400px"},attrs:{center:e.center,zoom:18,"map-type-id":"terrain"},on:{click:e.replaceMarker}},[t("GmapMarker",{attrs:{position:e.center,clickable:!0,draggable:!0}})],1),e._v(" "),e.isAddress?t("v-row",{staticClass:"py-4 align-center justify-center",attrs:{"no-gutters":""}},[t("v-btn",{staticStyle:{width:"fit-content"},attrs:{color:"#65382c",dark:"",elevation:"0"},on:{click:function(t){return e.$emit("updateLatLng",e.address,e.center)}}},[e._v("Update The Address")])],1):e._e()],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},815:function(e,t,r){"use strict";r.r(t);r(124),r(29),r(15),r(47),r(22),r(25),r(21),r(26);var n=r(7),o=r(6),l=(r(40),r(16),r(34),r(75),r(9),r(33),r(36),r(751)),c=r(732),d=r(55),h=r(731),f=r(774),m=r.n(f),v=r(775),_=r.n(v),y=r(776),$=r.n(y),x=r(777),w=r.n(x),k=r(211);function S(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var j=k.helpers.regex("serial",/^([5694]\d{7})$/g),A=k.helpers.regex("serial",/^[1-9]\d{0,9}$/),C={layout:"checkout",components:{OrderSummary:l.default,ShippingIcon:m.a,PaymentIcon:_.a,SecurityIcon:$.a,OfficeIcon:w.a},mounted:function(){var e=this;this.getDefaultLocation(),localStorage.removeItem("shipping_address"),Object(c.a)().then((function(t){var data=t.data;e.areas=data}))},props:{theAddress:Array,center:Object},data:function(){return{showAddMessage:!1,location_type:null,local:{address:{country_name:"Egypt",address:"",city_id:null,area_id:null,city_name:"x",area_name:"x",building_num:"",block_no:"",street_name:"",floor:"",apartment:"",description:"",phone:"",branch_id:3,name:"",email:"",lat:0,lng:0}},areas:[],city:""}},computed:O(O({},Object(d.b)("checkout",["form.address_id","form.user_data.address.address","form.is_pickup","loading"])),{},{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")}}),methods:{getDefaultLocation:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$auth.loggedIn){t.next=9;break}return t.next=3,Object(h.c)();case 3:r=t.sent,n=r.type,data=r.data,"area"===n?(e.location_type="area",e.local.address=O(O({},e.local.address),data)):"address"===n&&(e.location_type="address",e.local.address=O(O({},data),{},{address_info:e.transformAddress(data)})),t.next=14;break;case 9:e.location_type="area",e.local.address.area_id=JSON.parse(localStorage.getItem("guest_area_id")),e.local.address.area_name=localStorage.getItem("guest_area_name"),e.local.address.city_id=JSON.parse(localStorage.getItem("guest_city_id")),e.local.address.city_name=localStorage.getItem("guest_city_name");case 14:case"end":return t.stop()}}),t)})))()},checkPhone:function(e){var t=e.isValid;this.phoneValid=t},showTime:function(){if(null==this.lat||null==this.lng)return this.$toast.error("Please put your address on the map"),void this.$emit("openGMap");var e=!0;(!this.$auth.loggedIn||this.$auth.loggedIn&&"address"!==this.location_type)&&(this.$v.$touch(),e=e&&!this.$v.$invalid),e&&(localStorage.setItem("shipping_address",JSON.stringify(this.local.address)),this.$emit("address-updated",this.city))},transformAddress:function(address){var e=[];return address.street_name&&e.push(this.$t("profile.addresses.street_name")+" "+address.street_name),address.floor&&e.push(this.$t("profile.addresses.floor")+" "+address.floor),address.apartment&&e.push(this.$t("profile.addresses.apartment_no")+" "+address.apartment),address.block_no&&e.push(this.$t("profile.addresses.block_no")+" "+address.block_no),address.building_no&&e.push(this.$t("profile.addresses.building_number")+" "+address.building_no),e.join(", ")}},watch:{theAddress:function(e){var t=this;this.local.address.country_name=e[e.length-2],this.local.address.street_name=e.slice(0,-2).join(" "),this.local.address.area_name=e[e.length-2];var r=this.areas.find((function(area){return area.name_en.includes(t.local.address.area_name.slice(0,-1).toUpperCase())}));r?(this.$toast.success("Area implemented."),this.city=r,this.center?(this.lat=this.center.lat,this.lng=this.center.lng,console.log(this.lat,this.lng)):this.$toast.error("Please Put Your Address on the map")):this.$toast.error("Area not found.")}},validations:function(){this.$auth.loggedIn||(k.helpers.withParams({lang:this.$i18n.locale},Object(k.requiredIf)((function(e,t){return this.$auth.isLoggedIn}))),Object(k.requiredIf)(!this.$auth.loggedIn),k.email);return{local:{address:{description:{string:k.helpers.withParams({lang:this.$i18n.locale},(function(e){return"string"==typeof e}))},city_id:{},area_id:{},building_num:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required),building_number_validator:A},block_no:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},street_name:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},floor:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},apartment:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},name:{required:Object(k.requiredIf)((function(){return!this.$auth.loggedIn}))},email:{required:Object(k.requiredIf)((function(){return!this.$auth.loggedIn})),email:k.email},phone:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required),phone_number:j}}}}}},I=(r(778),r(8)),component=Object(I.a)(C,(function(){var e,t=this,r=t._self._c;return r("div",[r("p",{staticClass:"text-h6 font-weight-bold mt-8"},[t._v("\n    "+t._s(t.$t("checkout.shipping.shipping_label"))+"\n  ")]),t._v(" "),r("p",[t._v("Shipping Address: "+t._s(null===(e=t.theAddress)||void 0===e?void 0:e.join(" ")))]),t._v(" "),r("v-card",[r("v-row",[r("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:10}},[r("v-card",[r("v-card-text",[r("v-select",{staticClass:"rounded-lg",attrs:{"return-object":"",items:t.areas,loading:t.loading.city,"item-value":t.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:t.city,"error-messages":t.cityErrorMessages},on:{input:function(e){}}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.block_no"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.block_no)},on:{input:function(e){return t.$v.local.address.block_no.$touch()}},model:{value:t.local.address.block_no,callback:function(e){t.$set(t.local.address,"block_no",e)},expression:"local.address.block_no"}}),t._v(" "),this.$auth.loggedIn?t._e():r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s("Full Name")+" "),r("Sup",[t._v("*")])],1),t._v(" "),this.$auth.loggedIn?t._e():r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.name)},on:{input:function(e){return t.$v.local.address.name.$touch()}},model:{value:t.local.address.name,callback:function(e){t.$set(t.local.address,"name",e)},expression:"local.address.name"}}),t._v(" "),this.$auth.loggedIn?t._e():r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s("Email")+" "),r("Sup",[t._v("*")])],1),t._v(" "),this.$auth.loggedIn?t._e():r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57",type:"email","error-messages":t.$validationMsgs(t.$v.local.address.email)},on:{input:function(e){return t.$v.local.address.email.$touch()}},model:{value:t.local.address.email,callback:function(e){t.$set(t.local.address,"email",e)},expression:"local.address.email"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.street_name"))),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.street_name)},on:{input:function(e){return t.$v.local.address.street_name.$touch()}},model:{value:t.local.address.street_name,callback:function(e){t.$set(t.local.address,"street_name",e)},expression:"local.address.street_name"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.building_number"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.building_num)},on:{input:function(e){return t.$v.local.address.building_num.$touch()}},model:{value:t.local.address.building_num,callback:function(e){t.$set(t.local.address,"building_num",e)},expression:"local.address.building_num"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.floor"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.floor)},on:{input:function(e){return t.$v.local.address.floor.$touch()}},model:{value:t.local.address.floor,callback:function(e){t.$set(t.local.address,"floor",e)},expression:"local.address.floor"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.apartment_no"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.apartment)},on:{input:function(e){return t.$v.local.address.apartment.$touch()}},model:{value:t.local.address.apartment,callback:function(e){t.$set(t.local.address,"apartment",e)},expression:"local.address.apartment"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.additional_info"))+"\n            ")]),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.description)},on:{input:function(e){return t.$v.local.address.description.$touch()}},model:{value:t.local.address.description,callback:function(e){t.$set(t.local.address,"description",e)},expression:"local.address.description"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.phone"))+"\n            ")]),t._v(" "),r("div",{staticClass:"d-flex align-start"},[r("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[r("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),t._v(" "),r("div",{staticStyle:{width:"100%"}},[r("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"50","error-messages":t.$validationMsgs(t.$v.local.address.phone),label:"",placeholder:t.phone_placeholder},on:{input:function(e){return t.$v.local.address.phone.$touch()}},model:{value:t.local.address.phone,callback:function(e){t.$set(t.local.address,"phone",e)},expression:"local.address.phone"}})],1)])],1)],1)],1)],1),t._v(" "),r("v-card-actions",{staticClass:"justify-space-between px-0"},[t.$vuetify.breakpoint.mobile?t._e():r("v-btn",{staticStyle:{visibility:"hidden"},attrs:{nuxt:"",to:"/cart",elevation:"0",text:"",color:"grey",large:"",dark:""}},[r("v-icon",{attrs:{left:"en"===t.$i18n.locale,right:"ar"===t.$i18n.locale,large:""}},[t._v("\n          mdi-chevron-"+t._s("en"===t.$i18n.locale?"left":"right")+"\n        ")]),t._v("\n        "+t._s(t.$t("checkout.shipping.back"))+"\n      ")],1),t._v(" "),r("v-btn",{staticClass:"rounded-lg to-payment",style:{flex:t.$vuetify.breakpoint.mobile?1:.7},attrs:{loading:t.loading,"x-large":"",height:"57",color:"dark",elevation:"0",dark:""},on:{click:t.showTime}},[t._v("\n        "+t._s(t.$t("Continue To Shopping"))+"\n      ")])],1)],1)],1)}),[],!1,null,"d56d28d0",null);t.default=component.exports},836:function(e,t,r){"use strict";r(793)},837:function(e,t,r){var n=r(1)((function(i){return i[1]}));n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),n.push([e.i,".isPicked[data-v-1725bea1]{background-color:#ecbaa8;color:#65382c!important;font-weight:700}",""]),n.locals={},e.exports=n},905:function(e,t,r){"use strict";r.r(t);r(15),r(47),r(25),r(21),r(26);var n=r(6),o=r(7),l=(r(40),r(70),r(22),r(9),r(33),r(36),r(29),r(52),r(124),r(27),r(59),r(16),r(732)),c=r(731);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={data:function(){return{toggle:this.$store.state.checkout.type||"asap",currentTab:"areas",currentDay:(new Date).getDate(),currentHour:"",currentMinute:"",current:[],days:[],hours:[],minutes:[],searchTerm:"",areas:[],filteredAreas:[],addresses:[],currentAddress:"",loading:!1,theAddress:null,center:{},savedAddrMapDialog:!1,gmapDialog:!0,currentMapAddress:""}},methods:{isToggle:function(e){var t=this;setTimeout((function(){null==t.toggle&&(t.toggle=e)}),100)},onSetAddress:function(e,t){this.theAddress=e,this.center=t},addDaysToDate:function(e,t){this.days=[];for(var i=0;i<t;i++){var r=new Date(e);r.setDate(e.getDate()+i),this.days.push(r.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit"}))}},search:function(){var e=this;null!==this.searchTerm?this.filteredAreas=this.areas.filter((function(area){return String(area.name).toLowerCase().includes(String(e.searchTerm).toLowerCase())})):this.filteredAreas=this.areas},getAreas:function(){var e=this;this.loading=!0,Object(l.a)().then((function(t){var data=t.data;e.areas=data,e.filteredAreas=data})).finally((function(){e.loading=!1}))},getAddresses:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.b)();case 2:r=t.sent,data=r.data,e.addresses=data.map(e.transformAddress);case 5:case"end":return t.stop()}}),t)})))()},transformAddress:function(address){var e=[];return address.street_name&&e.push(this.$t("profile.addresses.street_name")+" "+address.street_name),address.floor&&e.push(this.$t("profile.addresses.floor")+" "+address.floor),address.apartment&&e.push(this.$t("profile.addresses.apartment_no")+" "+address.apartment),address.block_no&&e.push(this.$t("profile.addresses.block_no")+" "+address.block_no),address.building_no&&e.push(this.$t("profile.addresses.building_number")+" "+address.block_no),h(h({},address),{},{address_info:e.join(", ")})},setDefaultAddress:function(address){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,localStorage.setItem("default_location","address"),localStorage.setItem("default_address",JSON.stringify(address)),t.next=5,Object(c.e)({address_id:address.id});case 5:e.$router.replace(e.localePath("/categories")),e.$store.dispatch("cart/get"),e.loading=!1;case 8:case"end":return t.stop()}}),t)})))()},setDefaultBranch:function(area){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(area),null!=e.currentHour&&null!=e.currentMinute){t.next=3;break}return t.abrupt("return",e.$toast.error(e.$t("checkout.delivery_time_required")));case 3:if(r=area.branches,localStorage.setItem("default_location","area"),localStorage.setItem("default_area",JSON.stringify(area)),!(r.length>0)){t.next=21;break}if(!e.$auth.loggedIn){t.next=13;break}return n=r[0].id,t.next=11,Object(c.e)({branch_id:n,area_id:area.id});case 11:t.next=18;break;case 13:localStorage.setItem("guest_branch",JSON.parse(localStorage.getItem("default_area")).branches[0].id),localStorage.setItem("guest_area_id",JSON.parse(localStorage.getItem("default_area")).id),localStorage.setItem("guest_city_id",JSON.parse(localStorage.getItem("default_area")).branches[0].city_id),localStorage.setItem("guest_area_name",JSON.parse(localStorage.getItem("default_area")).name),localStorage.setItem("guest_city_name","Kuwait");case 18:e.$router.replace(e.localePath("/categories")),t.next=22;break;case 21:e.$toast.error(e.$t("location.no_branches"));case 22:e.$store.dispatch("cart/get",{branch:r[0]});case 23:case"end":return t.stop()}}),t)})))()},checkLatLng:function(address){!address||address.lat||address.lng||(this.currentMapAddress=address,this.savedAddrMapDialog=!0)},updateLatLng:function(address,e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return localStorage.setItem("shipping_address",JSON.stringify(h(h({},address),{},{lat:e.lat,lng:e.lng}))),r.next=3,Object(c.g)(address.id,h(h({},address),{},{lat:e.lat,lng:e.lng}));case 3:return r.next=5,t.getAddresses();case 5:t.setDefaultAddress(address),t.$router.push({path:"/products"}),t.savedAddrMapDialog=!1,t.$toast.success("Address Updated SuccessFully");case 9:case"end":return r.stop()}}),r)})))()}},watch:{toggle:function(e,t){this.$store.commit("checkout/SET_TYPE",e)},currentAddress:function(e,t){this.setDefaultAddress(this.addresses[e])}},computed:{isDeliveryNowDimmed:function(){var e=new Date,t=60*e.getHours()+e.getMinutes();return t>=1185||t<=479},isLaterTodayDimmed:function(){var e=new Date,t=60*e.getHours()+e.getMinutes();return t>=1185&&t<=1439}},mounted:function(){localStorage.removeItem("default_location"),localStorage.removeItem("default_address"),localStorage.removeItem("default_area"),this.getAreas(),this.getAddresses(),this.currentHour=(new Date).getHours()}},m=(r(836),r(8)),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("v-row",{staticClass:"py-5",attrs:{"no-gutters":""}},[t("v-col",{staticClass:"py-0 px-0 mx-0 my-0"},[t("p",{staticClass:"font-weight-bold mb-2",staticStyle:{color:"#65382c","font-size":"20px"}},[e._v(e._s(e.$t("common.choose_service")))]),e._v(" "),t("v-row",{staticClass:"justify-center align-center py-2",attrs:{"no-gutters":""}},[t("v-btn-toggle",{staticClass:"rounded-lg py-0",attrs:{dense:"","active-class":"isPicked"},model:{value:e.toggle,callback:function(t){e.toggle=t},expression:"toggle"}},[t("v-btn",{staticClass:"py-0 me-3 px-4 rounded-lg",staticStyle:{"text-transform":"unset"},attrs:{plain:"",value:"asap",disabled:e.isDeliveryNowDimmed},on:{click:function(t){return e.isToggle("asap")}}},[e._v("\n          Deliver now\n        ")]),e._v(" "),t("v-btn",{staticClass:"ms-3 rounded-lg px-4",staticStyle:{"text-transform":"unset","border-width":"thin"},attrs:{outlined:"",value:"same-day",disabled:e.isLaterTodayDimmed},on:{click:function(t){return e.isToggle("same-day")}}},[e._v("\n          Later Today\n        ")]),e._v(" "),t("v-btn",{staticClass:"ms-3 rounded-lg px-4",staticStyle:{"text-transform":"unset","border-width":"thin"},attrs:{outlined:"",value:"pre-order"},on:{click:function(t){return e.isToggle("pre-order")}}},[e._v("\n          Pre Order\n        ")])],1)],1),e._v(" "),t("v-tabs",{staticClass:"align-center justify-start d-flex mt-6",staticStyle:{width:"100%"},attrs:{color:"#65382c"},model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[t("v-tabs-slider"),e._v(" "),t("v-tab",{staticClass:"rounded-lg",staticStyle:{width:"200px"},attrs:{value:"areas"}},[e._v("\n        "+e._s(e.$t("location.select_your_area"))+"\n      ")]),e._v(" "),t("v-tab",{staticStyle:{width:"200px"},attrs:{value:"addresses",disabled:!e.$auth.loggedIn}},[e._v("\n        "+e._s(e.$t("location.saved_addresses"))+"\n      ")])],1),e._v(" "),t("v-tabs-items",{model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[t("v-tab-item",{key:"areas"},[t("v-col",{staticClass:"mx-0 mt-2 px-0 py-0"},[t("GoogleMap",{attrs:{dialog:e.gmapDialog},on:{"set-address":e.onSetAddress,close:function(t){e.gmapDialog=!1}}}),e._v(" "),t("CheckoutShipping",{attrs:{theAddress:e.theAddress,center:e.center},on:{"address-updated":e.setDefaultBranch,openGMap:function(t){e.gmapDialog=!0}}}),e._v(" "),t("v-col",{staticClass:"d-flex align-center justify-center",attrs:{cols:"12"}},[e.loading?t("v-progress-circular",{attrs:{size:50,color:"#65382c",indeterminate:""}}):e._e()],1)],1)],1),e._v(" "),t("v-tab-item",{key:"addresses"},[e.addresses.length?e._e():t("p",{staticClass:"font-primary font-weight-bold text-center my-5",staticStyle:{"font-size":"20px"}},[e._v("\n          "+e._s(e.$t("common.no_addresses"))+"\n        ")]),e._v(" "),t("v-item-group",{staticClass:"mt-4",model:{value:e.currentAddress,callback:function(t){e.currentAddress=t},expression:"currentAddress"}},[t("GoogleMap",{attrs:{dialog:e.savedAddrMapDialog,isAddress:"",address:e.currentMapAddress},on:{"set-address":e.onSetAddress,updateLatLng:e.updateLatLng,close:function(t){e.savedAddrMapDialog=!1}}}),e._v(" "),e._l(e.addresses,(function(address){return t("v-col",{key:null==address?void 0:address.id,attrs:{cols:"12"}},[t("v-item",{scopedSlots:e._u([{key:"default",fn:function(r){var n=r.active,o=r.toggle;return[t("v-card",{staticClass:"d-flex align-center",attrs:{outlined:"",rounded:"lg","min-height":"150",color:n?"#65382c":""},on:{click:function(t){address.lat?o():e.checkLatLng(address)}}},[t("v-card-text",[t("v-scroll-y-transition",[t("div",{class:"flex-grow-1 ".concat(n?"white--text":"black--text")},[t("p",[e._v(e._s(null==address?void 0:address.address))]),e._v(" "),t("p",[e._v("\n                        "+e._s(null==address?void 0:address.country_name)+"\n                        "+e._s(null==address?void 0:address.city_name)+"\n                        "+e._s(null==address?void 0:address.area_name)+"\n                      ")]),e._v(" "),t("p",[e._v(e._s(null==address?void 0:address.address_info))]),e._v(" "),t("p",[e._v(e._s(null==address?void 0:address.description))])])])],1)],1)]}}],null,!0)})],1)}))],2)],1)],1)],1)],1)}),[],!1,null,"1725bea1",null);t.default=component.exports;installComponents(component,{GoogleMap:r(814).default,CheckoutShipping:r(815).default})}}]);