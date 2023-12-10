(window.webpackJsonp=window.webpackJsonp||[]).push([[63,7,21,45],{734:function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),r.d(e,"f",(function(){return l})),r.d(e,"a",(function(){return c})),r.d(e,"e",(function(){return d})),r.d(e,"c",(function(){return f})),r.d(e,"d",(function(){return m})),r.d(e,"g",(function(){return h}));var n=r(5);function o(){return n.a.get("/customer/addresses")}function l(t){return n.a.get("/customer/addresses/"+t)}function c(data){return n.a.post("/customer/addresses",data)}function d(data){return n.a.post("customer/set/default/address/",data)}function f(){return n.a.get("/customer/get-default-location")}function m(data){return n.a.delete("customer/addresses/".concat(data))}function h(t,data){return n.a.put("/customer/addresses/"+t,data)}},735:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(5);function o(t){return n.a.get("/areas",{params:t})}},736:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(5);function o(t){return n.a.get("/cities",t)}},737:function(t,e,r){"use strict";r.r(e);var n=r(7),o=(r(40),r(102),r(735)),l=r(736),c={props:{itemValue:{type:String,default:"id"},disabled:{type:Boolean,default:!1},hideCity:{type:Boolean,default:!1},area:{type:[Number,String]},city:{type:[Number,String]},cityErrorMessages:{type:Array,default:function(){return[]}},areaErrorMessages:{type:Array,default:function(){return[]}}},data:function(){return{areas:[],cities:[],loading:{city:!1,area:!1}}},watch:{city:{handler:function(t){t&&this.loadAreas(t)},immediate:!0,deep:!0}},methods:{loadCities:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading.city=!0,e.next=3,Object(l.a)();case 3:t.cities=e.sent.data,t.loading.city=!1;case 5:case"end":return e.stop()}}),e)})))()},loadAreas:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading.area=!0,e.areas=[],r.next=4,Object(o.a)({id:t});case 4:e.areas=r.sent.data,e.loading.area=!1;case 6:case"end":return r.stop()}}),r)})))()}},created:function(){this.loadCities()}},d=r(8),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("v-row",[t.hideCity?t._e():e("v-col",{attrs:{cols:"12"}},[e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.city"))),e("Sup",[t._v("*")])],1),t._v(" "),e("v-select",{staticClass:"rounded-lg",attrs:{disabled:t.disabled,"return-object":"",items:t.cities,loading:t.loading.city,"item-value":t.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:t.city,"error-messages":t.cityErrorMessages},on:{input:function(e){return t.$emit("citySelected",e)}}})],1),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.area"))),e("Sup",[t._v("*")])],1),t._v(" "),e("v-select",{staticClass:"rounded-lg",attrs:{"return-object":"",disabled:!t.city||t.disabled,loading:t.loading.area,items:t.areas,"item-value":t.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:t.area,"error-messages":t.areaErrorMessages},on:{input:function(e){return t.$emit("areaSelected",e)}}})],1)],1)}),[],!1,null,null,null);e.default=component.exports},749:function(t,e,r){"use strict";r.r(e);r(17),r(48),r(33),r(36),r(16),r(22),r(25),r(18),r(26);var n=r(216),o=r(6),l=r(7),c=(r(40),r(27),r(34),r(9),r(29),r(734)),d=r(214),f=(r(736),["id"]);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={props:{address:{type:Object}},data:function(t){return{phoneValid:!1,editMode:!1,cities:[],form:t.$props.checkout?t.$props.address:{country_name:"Egypt",address:"",city_id:1,city_name:"Kuwait",area_id:null,area_name:"",building_num:"",block_no:"",street_name:"",floor:"",apartment:"",description:"",phone:"",default:!0,branch_id:null},loading:!1,id:null}},computed:{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")}},methods:{checkPhone:function(t){var e=t.isValid;this.phoneValid=e},submit:function(){this.$v.$touch(),this.$v.$invalid?this.$toast.error("Error"):this.id?this.updateAddress():this.createAddress()},fetchOne:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id=t.$route.params.id,!t.id){e.next=9;break}return t.editMode=!0,e.next=5,Object(c.f)(t.id);case 5:r=e.sent,11===(data=r.data).phone.length&&(data.phone=data.phone.slice(3)),t.form=h(h({},t.form),data);case 9:case"end":return e.stop()}}),e)})))()},createAddress:function(){var t=this;this.loading=!0;var data=h({},this.form);8===data.phone.length&&(data.phone="965"+data.phone),Object(c.a)(data).then((function(){t.$router.push(t.localePath("/profile/addresses")),t.$toast.success("Created")}))},updateAddress:function(){var t=this;this.loading=!0;var e=this.form,r=(e.id,Object(n.a)(e,f));8===r.phone.length&&(r.phone="965"+r.phone),Object(c.g)(this.id,r).then((function(){t.$router.push(t.localePath("/profile/addresses")),t.$toast.success("Updated")})).finally((function(){t.loading=!1}))},areaSelected:function(t){var e;this.form.area_id=t.id,this.form.area_name=t.name,this.form.branch_id=null===(e=t.branches[0])||void 0===e?void 0:e.id},citySelected:function(t){this.form.city_id=t.id,this.form.city_name=t.name}},validations:function(){return{form:{city_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},area_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},building_num:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},block_no:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},street_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},floor:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},apartment:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},description:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},phone:{phone_number:function(t){return/^([5694]\d{7})$/g.test(t)}}}}},watch:{"$props.address":{handler:function(){this.form=this.$props.address}}},created:function(){this.fetchOne(),this.$props.checkout&&(this.form=this.$props.address)}},_=r(8),component=Object(_.a)(v,(function(){var t=this,e=t._self._c;return e("v-card",{staticClass:"py-5"},[e("v-card-text",[e("CommonCountryCityCombo",{attrs:{"hide-city":!0,"item-value":"name",area:t.form.area_name,city:t.form.city_name},on:{areaSelected:t.areaSelected,citySelected:t.citySelected}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.block_no"))+" "),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.block_no)},on:{input:function(e){return t.$v.form.block_no.$touch()}},model:{value:t.form.block_no,callback:function(e){t.$set(t.form,"block_no",e)},expression:"form.block_no"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.street_name"))),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.street_name)},on:{input:function(e){return t.$v.form.street_name.$touch()}},model:{value:t.form.street_name,callback:function(e){t.$set(t.form,"street_name",e)},expression:"form.street_name"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.building_number"))+" "),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.building_num)},on:{input:function(e){return t.$v.form.building_num.$touch()}},model:{value:t.form.building_num,callback:function(e){t.$set(t.form,"building_num",e)},expression:"form.building_num"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.floor"))+" "),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.floor)},on:{input:function(e){return t.$v.form.floor.$touch()}},model:{value:t.form.floor,callback:function(e){t.$set(t.form,"floor",e)},expression:"form.floor"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.apartment_no"))+" "),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.apartment)},on:{input:function(e){return t.$v.form.apartment.$touch()}},model:{value:t.form.apartment,callback:function(e){t.$set(t.form,"apartment",e)},expression:"form.apartment"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.additional_info"))+"\n    ")]),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.description)},on:{input:function(e){return t.$v.form.description.$touch()}},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.phone"))+"\n    ")]),t._v(" "),e("div",{staticClass:"d-flex align-start"},[e("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[e("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),t._v(" "),e("div",{staticStyle:{width:"100%"}},[e("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"57","error-messages":t.$validationMsgs(t.$v.form.phone),label:"",placeholder:t.phone_placeholder},on:{input:function(e){return t.$v.form.phone.$touch()}},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)]),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-0 font-primary"},[t._v("\n      "+t._s(t.$t("profile.addresses.default"))+"\n    ")]),t._v(" "),e("v-checkbox",{staticClass:"mt-0",attrs:{label:"".concat(t.$t("profile.addresses.default_address"))},model:{value:t.form.default,callback:function(e){t.$set(t.form,"default",e)},expression:"form.default"}})],1),t._v(" "),e("v-card-actions",[this.$route.path.includes("finalize")?t._e():e("v-btn",{staticClass:"rounded-lg",attrs:{loading:t.loading,elevation:"0",large:"",color:"primary"},on:{click:t.submit}},[t._v("\n      "+t._s(t.id?t.$t("profile.addresses.update"):t.$t("profile.addresses.create"))+"\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CommonCountryCityCombo:r(737).default})},750:function(t,e,r){"use strict";r.r(e);r(327);var n={data:function(t){return{items:[{title:t.$t("common.my_account"),icon:"mdi-account",link:t.localePath("/profile")},{title:t.$t("common.my_orders"),icon:"mdi-shopping",link:t.localePath("/profile/orders")},{title:t.$t("common.my_address"),icon:"mdi-map-marker",link:t.localePath("/profile/addresses")}]}}},o=r(8),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return t.$vuetify.breakpoint.mobile?t._e():e("v-card",{staticStyle:{position:"sticky",top:"100px"},attrs:{outlined:"",rounded:"lg"}},[e("v-list",{staticClass:"py-0",attrs:{dense:""}},[e("v-list-item-group",{attrs:{color:"primary",mandatory:""}},[t._l(t.items,(function(r,i){return[e("v-list-item",{key:i,attrs:{nuxt:"",exact:"",to:r.link}},[e("v-list-item-icon",[e("v-icon",{attrs:{size:"20"},domProps:{textContent:t._s(r.icon)}})],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(r.title)}})],1)],1),t._v(" "),e("v-divider")]}))],2)],1)],1)}),[],!1,null,null,null);e.default=component.exports},952:function(t,e,r){"use strict";r.r(e);var n=r(8),component=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("v-row",{class:t.$vuetify.breakpoint.mobile?"":"mt-10"},[t.$vuetify.breakpoint.mobile?t._e():e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:2}},[e("ProfileNav")],1),t._v(" "),e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:10}},[e("v-card",{staticClass:"pa-4",attrs:{outlined:"",rounded:"lg"}},[e("AddressesCreateUpdateForm")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProfileNav:r(750).default,AddressesCreateUpdateForm:r(749).default})}}]);