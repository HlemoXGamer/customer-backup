(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{760:function(e,t,r){var content=r(779);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(2).default)("4bcffbe3",content,!0,{sourceMap:!1})},778:function(e,t,r){"use strict";r(760)},779:function(e,t,r){var o=r(1)((function(i){return i[1]}));o.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),o.push([e.i,".v-card__actions>.rounded-lg[data-v-6a053c8c]{background:#65382c!important;padding:0 5rem}.v-card__actions>.to-payment[data-v-6a053c8c]{padding:0 1rem!important}",""]),o.locals={},e.exports=o},814:function(e,t,r){"use strict";r.r(t);r(124),r(29),r(15),r(47),r(22),r(25),r(21),r(26);var o=r(7),l=r(6),n=(r(40),r(328),r(16),r(34),r(75),r(9),r(33),r(36),r(751)),d=r(732),c=r(55),h=r(731),m=r(774),f=r.n(m),_=r(775),v=r.n(_),$=r(776),y=r.n($),x=r(777),w=r.n(x),k=r(211);function O(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function C(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var S=k.helpers.regex("serial",/^([5694]\d{7})$/g),j=k.helpers.regex("serial",/^[1-9]\d{0,9}$/),P={layout:"checkout",components:{OrderSummary:n.default,ShippingIcon:f.a,PaymentIcon:v.a,SecurityIcon:y.a,OfficeIcon:w.a},mounted:function(){var e=this;this.getDefaultLocation(),localStorage.removeItem("shipping_address"),Object(d.a)().then((function(t){var data=t.data;e.areas=data,e.areas.sort((function(a,b){var e=a.name_en.toUpperCase(),t=b.name_en.toUpperCase();return e<t?-1:e>t?1:0}))}))},props:{theAddress:Array,center:Object},data:function(){return{showAddMessage:!1,location_type:null,cityErrorMessages:[],currentArea:null,local:{address:{country_name:"Kuwait",address:"",city_id:null,area_id:null,city_name:"x",area_name:"x",building_num:"",block_no:"",street_name:"",floor:"",apartment:"",description:"",phone:"",branch_id:3,name:"",email:"",lat:0,lng:0}},areas:[],city:""}},computed:C(C({},Object(c.b)("checkout",["form.address_id","form.user_data.address.address","form.is_pickup","loading"])),{},{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")}}),methods:{getDefaultLocation:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$auth.loggedIn){t.next=9;break}return t.next=3,Object(h.c)();case 3:r=t.sent,o=r.type,data=r.data,"area"===o?(e.location_type="area",e.local.address=C(C({},e.local.address),data)):"address"===o&&(e.location_type="address",e.local.address=C(C({},data),{},{address_info:e.transformAddress(data)})),t.next=14;break;case 9:e.location_type="area",e.local.address.area_id=JSON.parse(localStorage.getItem("guest_area_id")),e.local.address.area_name=localStorage.getItem("guest_area_name"),e.local.address.city_id=JSON.parse(localStorage.getItem("guest_city_id")),e.local.address.city_name=localStorage.getItem("guest_city_name");case 14:case"end":return t.stop()}}),t)})))()},checkPhone:function(e){var t=e.isValid;this.phoneValid=t},showShopping:function(){var e=!0;if((!this.$auth.loggedIn||this.$auth.loggedIn&&"address"!==this.location_type)&&(this.$v.$touch(),e=e&&!this.$v.$invalid),e){if(!this.currentArea)return this.$toast.error(this.$t("checkout.shipping.choose_area"));this.local.address.address=this.transformAddress(this.local.address),localStorage.setItem("shipping_address",JSON.stringify(this.local.address)),this.local.address.area_id=this.currentArea.id,this.$emit("address-updated",this.currentArea)}},transformAddress:function(address){var e=[];return address.street_name&&e.push(this.$t("profile.addresses.street_name")+" "+address.street_name),address.floor&&e.push(this.$t("profile.addresses.floor")+" "+address.floor),address.apartment&&e.push(this.$t("profile.addresses.apartment_no")+" "+address.apartment),address.block_no&&e.push(this.$t("profile.addresses.block_no")+" "+address.block_no),address.building_no&&e.push(this.$t("profile.addresses.building_number")+" "+address.building_no),e.join(", ")}},watch:{theAddress:function(e){var t=this;this.local.address.country_name=e[e.length-2],this.local.address.street_name=e.slice(0,-2).join(" "),this.local.address.area_name=e[e.length-2];var r=this.areas.find((function(area){return area.name_en.includes(t.local.address.area_name.slice(0,-1).toUpperCase())}));r?(this.$toast.success("Area implemented."),this.city=r,this.center?(this.lat=this.center.lat,this.lng=this.center.lng):this.$toast.error("Please Put Your Address on the map")):this.$toast.error("Area not found.")}},validations:function(){return{local:{address:{description:{string:k.helpers.withParams({lang:this.$i18n.locale},(function(e){return"string"==typeof e}))},city_id:{},area_id:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},building_num:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required),building_number_validator:j},block_no:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},street_name:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},floor:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},apartment:{numeric:k.helpers.withParams({lang:this.$i18n.locale},k.numeric),required:k.helpers.withParams({lang:this.$i18n.locale},k.required)},name:{required:Object(k.requiredIf)((function(){return!this.$auth.loggedIn}))},email:{required:Object(k.requiredIf)((function(){return!this.$auth.loggedIn})),email:k.email},phone:{required:k.helpers.withParams({lang:this.$i18n.locale},k.required),phone_number:S}}}}}},I=(r(778),r(8)),component=Object(I.a)(P,(function(){var e,t=this,r=t._self._c;return r("div",[r("p",{staticClass:"text-h6 font-weight-bold mt-8"},[t._v("\n    "+t._s(t.$t("checkout.shipping.shipping_label"))+"\n  ")]),t._v(" "),r("p",[t._v("Shipping Address: "+t._s(null===(e=t.theAddress)||void 0===e?void 0:e.join(" ")))]),t._v(" "),r("v-card",[r("v-row",[r("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:10}},[r("v-card",[r("v-card-text",[r("v-combobox",{staticClass:"rounded-lg",attrs:{items:t.areas,loading:t.loading.city,"item-text":"name","item-value":"id",height:"57",outlined:"",flat:"","error-messages":t.$validationMsgs(t.$v.local.address.area_id),color:"#65382c"},model:{value:t.currentArea,callback:function(e){t.currentArea=e},expression:"currentArea"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.block_no"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.block_no),color:"#65382c"},on:{input:function(e){return t.$v.local.address.block_no.$touch()}},model:{value:t.local.address.block_no,callback:function(e){t.$set(t.local.address,"block_no",e)},expression:"local.address.block_no"}}),t._v(" "),this.$auth.loggedIn?t._e():r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s("Full Name")+" "),r("Sup",[t._v("*")])],1),t._v(" "),this.$auth.loggedIn?t._e():r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.name),color:"#65382c"},on:{input:function(e){return t.$v.local.address.name.$touch()}},model:{value:t.local.address.name,callback:function(e){t.$set(t.local.address,"name",e)},expression:"local.address.name"}}),t._v(" "),this.$auth.loggedIn?t._e():r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s("Email")+" "),r("Sup",[t._v("*")])],1),t._v(" "),this.$auth.loggedIn?t._e():r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57",type:"email","error-messages":t.$validationMsgs(t.$v.local.address.email),color:"#65382c"},on:{input:function(e){return t.$v.local.address.email.$touch()}},model:{value:t.local.address.email,callback:function(e){t.$set(t.local.address,"email",e)},expression:"local.address.email"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.street_name"))),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.street_name),color:"#65382c"},on:{input:function(e){return t.$v.local.address.street_name.$touch()}},model:{value:t.local.address.street_name,callback:function(e){t.$set(t.local.address,"street_name",e)},expression:"local.address.street_name"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.building_number"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.building_num),color:"#65382c"},on:{input:function(e){return t.$v.local.address.building_num.$touch()}},model:{value:t.local.address.building_num,callback:function(e){t.$set(t.local.address,"building_num",e)},expression:"local.address.building_num"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.floor"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.floor),color:"#65382c"},on:{input:function(e){return t.$v.local.address.floor.$touch()}},model:{value:t.local.address.floor,callback:function(e){t.$set(t.local.address,"floor",e)},expression:"local.address.floor"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.apartment_no"))+" "),r("Sup",[t._v("*")])],1),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.apartment),color:"#65382c"},on:{input:function(e){return t.$v.local.address.apartment.$touch()}},model:{value:t.local.address.apartment,callback:function(e){t.$set(t.local.address,"apartment",e)},expression:"local.address.apartment"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.additional_info"))+"\n            ")]),t._v(" "),r("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.local.address.description),color:"#65382c"},on:{input:function(e){return t.$v.local.address.description.$touch()}},model:{value:t.local.address.description,callback:function(e){t.$set(t.local.address,"description",e)},expression:"local.address.description"}}),t._v(" "),r("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n              "+t._s(t.$t("profile.addresses.phone"))+"\n            ")]),t._v(" "),r("div",{staticClass:"d-flex align-start"},[r("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[r("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),t._v(" "),r("div",{staticStyle:{width:"100%"}},[r("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"50","error-messages":t.$validationMsgs(t.$v.local.address.phone),label:"",placeholder:t.phone_placeholder,color:"#65382c"},on:{input:function(e){return t.$v.local.address.phone.$touch()}},model:{value:t.local.address.phone,callback:function(e){t.$set(t.local.address,"phone",e)},expression:"local.address.phone"}})],1)])],1)],1)],1)],1),t._v(" "),r("v-card-actions",{staticClass:"justify-space-between px-0"},[t.$vuetify.breakpoint.mobile?t._e():r("v-btn",{staticStyle:{visibility:"hidden"},attrs:{nuxt:"",to:"/cart",elevation:"0",text:"",color:"grey",large:"",dark:""}},[r("v-icon",{attrs:{left:"en"===t.$i18n.locale,right:"ar"===t.$i18n.locale,large:""}},[t._v("\n          mdi-chevron-"+t._s("en"===t.$i18n.locale?"left":"right")+"\n        ")]),t._v("\n        "+t._s(t.$t("checkout.shipping.back"))+"\n      ")],1),t._v(" "),r("v-btn",{staticClass:"rounded-lg to-payment",style:{flex:t.$vuetify.breakpoint.mobile?1:.7},attrs:{loading:t.loading,"x-large":"",height:"57",color:"dark",elevation:"0",dark:""},on:{click:t.showShopping}},[t._v("\n        "+t._s(t.$t("Continue To Shopping"))+"\n      ")])],1)],1)],1)}),[],!1,null,"6a053c8c",null);t.default=component.exports}}]);