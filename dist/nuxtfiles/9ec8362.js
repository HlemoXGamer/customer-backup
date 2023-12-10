(window.webpackJsonp=window.webpackJsonp||[]).push([[6,7,21],{734:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"f",(function(){return l})),r.d(t,"a",(function(){return d})),r.d(t,"e",(function(){return c})),r.d(t,"c",(function(){return f})),r.d(t,"d",(function(){return m})),r.d(t,"g",(function(){return h}));var n=r(5);function o(){return n.a.get("/customer/addresses")}function l(e){return n.a.get("/customer/addresses/"+e)}function d(data){return n.a.post("/customer/addresses",data)}function c(data){return n.a.post("customer/set/default/address/",data)}function f(){return n.a.get("/customer/get-default-location")}function m(data){return n.a.delete("customer/addresses/".concat(data))}function h(e,data){return n.a.put("/customer/addresses/"+e,data)}},735:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(5);function o(e){return n.a.get("/areas",{params:e})}},736:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(5);function o(e){return n.a.get("/cities",e)}},737:function(e,t,r){"use strict";r.r(t);var n=r(7),o=(r(40),r(102),r(735)),l=r(736),d={props:{itemValue:{type:String,default:"id"},disabled:{type:Boolean,default:!1},hideCity:{type:Boolean,default:!1},area:{type:[Number,String]},city:{type:[Number,String]},cityErrorMessages:{type:Array,default:function(){return[]}},areaErrorMessages:{type:Array,default:function(){return[]}}},data:function(){return{areas:[],cities:[],loading:{city:!1,area:!1}}},watch:{city:{handler:function(e){e&&this.loadAreas(e)},immediate:!0,deep:!0}},methods:{loadCities:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading.city=!0,t.next=3,Object(l.a)();case 3:e.cities=t.sent.data,e.loading.city=!1;case 5:case"end":return t.stop()}}),t)})))()},loadAreas:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.loading.area=!0,t.areas=[],r.next=4,Object(o.a)({id:e});case 4:t.areas=r.sent.data,t.loading.area=!1;case 6:case"end":return r.stop()}}),r)})))()}},created:function(){this.loadCities()}},c=r(8),component=Object(c.a)(d,(function(){var e=this,t=e._self._c;return t("v-row",[e.hideCity?e._e():t("v-col",{attrs:{cols:"12"}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.city"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-select",{staticClass:"rounded-lg",attrs:{disabled:e.disabled,"return-object":"",items:e.cities,loading:e.loading.city,"item-value":e.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:e.city,"error-messages":e.cityErrorMessages},on:{input:function(t){return e.$emit("citySelected",t)}}})],1),e._v(" "),t("v-col",{attrs:{cols:"12"}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.area"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-select",{staticClass:"rounded-lg",attrs:{"return-object":"",disabled:!e.city||e.disabled,loading:e.loading.area,items:e.areas,"item-value":e.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:e.area,"error-messages":e.areaErrorMessages},on:{input:function(t){return e.$emit("areaSelected",t)}}})],1)],1)}),[],!1,null,null,null);t.default=component.exports},749:function(e,t,r){"use strict";r.r(t);r(17),r(48),r(33),r(36),r(16),r(22),r(25),r(18),r(26);var n=r(216),o=r(6),l=r(7),d=(r(40),r(27),r(34),r(9),r(29),r(734)),c=r(214),f=(r(736),["id"]);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={props:{address:{type:Object}},data:function(e){return{phoneValid:!1,editMode:!1,cities:[],form:e.$props.checkout?e.$props.address:{country_name:"Egypt",address:"",city_id:1,city_name:"Kuwait",area_id:null,area_name:"",building_num:"",block_no:"",street_name:"",floor:"",apartment:"",description:"",phone:"",default:!0,branch_id:null},loading:!1,id:null}},computed:{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")}},methods:{checkPhone:function(e){var t=e.isValid;this.phoneValid=t},submit:function(){this.$v.$touch(),this.$v.$invalid?this.$toast.error("Error"):this.id?this.updateAddress():this.createAddress()},fetchOne:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.id=e.$route.params.id,!e.id){t.next=9;break}return e.editMode=!0,t.next=5,Object(d.f)(e.id);case 5:r=t.sent,11===(data=r.data).phone.length&&(data.phone=data.phone.slice(3)),e.form=h(h({},e.form),data);case 9:case"end":return t.stop()}}),t)})))()},createAddress:function(){var e=this;this.loading=!0;var data=h({},this.form);8===data.phone.length&&(data.phone="965"+data.phone),Object(d.a)(data).then((function(){e.$router.push(e.localePath("/profile/addresses")),e.$toast.success("Created")}))},updateAddress:function(){var e=this;this.loading=!0;var t=this.form,r=(t.id,Object(n.a)(t,f));8===r.phone.length&&(r.phone="965"+r.phone),Object(d.g)(this.id,r).then((function(){e.$router.push(e.localePath("/profile/addresses")),e.$toast.success("Updated")})).finally((function(){e.loading=!1}))},areaSelected:function(e){var t;this.form.area_id=e.id,this.form.area_name=e.name,this.form.branch_id=null===(t=e.branches[0])||void 0===t?void 0:t.id},citySelected:function(e){this.form.city_id=e.id,this.form.city_name=e.name}},validations:function(){return{form:{city_name:{required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},area_name:{required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},building_num:{numeric:c.helpers.withParams({lang:this.$i18n.locale},c.numeric),required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},block_no:{numeric:c.helpers.withParams({lang:this.$i18n.locale},c.numeric),required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},street_name:{required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},floor:{numeric:c.helpers.withParams({lang:this.$i18n.locale},c.numeric),required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},apartment:{numeric:c.helpers.withParams({lang:this.$i18n.locale},c.numeric),required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},description:{required:c.helpers.withParams({lang:this.$i18n.locale},c.required)},phone:{phone_number:function(e){return/^([5694]\d{7})$/g.test(e)}}}}},watch:{"$props.address":{handler:function(){this.form=this.$props.address}}},created:function(){this.fetchOne(),this.$props.checkout&&(this.form=this.$props.address)}},_=r(8),component=Object(_.a)(v,(function(){var e=this,t=e._self._c;return t("v-card",{staticClass:"py-5"},[t("v-card-text",[t("CommonCountryCityCombo",{attrs:{"hide-city":!0,"item-value":"name",area:e.form.area_name,city:e.form.city_name},on:{areaSelected:e.areaSelected,citySelected:e.citySelected}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.block_no"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.block_no)},on:{input:function(t){return e.$v.form.block_no.$touch()}},model:{value:e.form.block_no,callback:function(t){e.$set(e.form,"block_no",t)},expression:"form.block_no"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.street_name"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.street_name)},on:{input:function(t){return e.$v.form.street_name.$touch()}},model:{value:e.form.street_name,callback:function(t){e.$set(e.form,"street_name",t)},expression:"form.street_name"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.building_number"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.building_num)},on:{input:function(t){return e.$v.form.building_num.$touch()}},model:{value:e.form.building_num,callback:function(t){e.$set(e.form,"building_num",t)},expression:"form.building_num"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.floor"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.floor)},on:{input:function(t){return e.$v.form.floor.$touch()}},model:{value:e.form.floor,callback:function(t){e.$set(e.form,"floor",t)},expression:"form.floor"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.apartment_no"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.apartment)},on:{input:function(t){return e.$v.form.apartment.$touch()}},model:{value:e.form.apartment,callback:function(t){e.$set(e.form,"apartment",t)},expression:"form.apartment"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.additional_info"))+"\n    ")]),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.description)},on:{input:function(t){return e.$v.form.description.$touch()}},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.phone"))+"\n    ")]),e._v(" "),t("div",{staticClass:"d-flex align-start"},[t("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[t("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),e._v(" "),t("div",{staticStyle:{width:"100%"}},[t("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.phone),label:"",placeholder:e.phone_placeholder},on:{input:function(t){return e.$v.form.phone.$touch()}},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)]),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-0 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.default"))+"\n    ")]),e._v(" "),t("v-checkbox",{staticClass:"mt-0",attrs:{label:"".concat(e.$t("profile.addresses.default_address"))},model:{value:e.form.default,callback:function(t){e.$set(e.form,"default",t)},expression:"form.default"}})],1),e._v(" "),t("v-card-actions",[this.$route.path.includes("finalize")?e._e():t("v-btn",{staticClass:"rounded-lg",attrs:{loading:e.loading,elevation:"0",large:"",color:"primary"},on:{click:e.submit}},[e._v("\n      "+e._s(e.id?e.$t("profile.addresses.update"):e.$t("profile.addresses.create"))+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{CommonCountryCityCombo:r(737).default})},822:function(e,t,r){"use strict";r.r(t);var n=r(734),o={props:{address:{type:Object}},data:function(){return{addresses:[]}},created:function(){var e=this;Object(n.b)().then((function(data){e.addresses=data.data,0===e.addresses.length&&e.$emit("input",e.$props.address)}))}},l=r(8),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-10"},[t("p",{staticClass:"text-h6 font-weight-bold mt-8"},[e._v("Select Your Address")]),e._v(" "),t("v-item-group",{attrs:{mandatory:""},on:{change:function(t){return e.$emit("input",e.addresses[t])}}},[t("v-row",[e._l(e.addresses,(function(address){return t("v-col",{key:address.id,attrs:{cols:"12",md:"4"}},[t("v-item",{scopedSlots:e._u([{key:"default",fn:function(r){var n=r.active,o=r.toggle;return[t("v-card",{staticClass:"d-flex align-center",attrs:{outlined:"",rounded:"lg",height:"150",dark:"",color:n?"primary":""},on:{click:o}},[t("v-card-text",[t("v-scroll-y-transition",[t("div",{staticClass:"flex-grow-1"},[t("p",[e._v(e._s(address.address))]),e._v(" "),t("p",[e._v(e._s(address.country_name)+" "+e._s(address.city_name))]),e._v(" "),t("p",[e._v(e._s(address.apartment))])])])],1)],1)]}}],null,!0)})],1)})),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:10}},[t("AddressesCreateUpdateForm",{attrs:{"no-address":0===e.addresses.length,checkout:"",address:e.address},on:{"update:address":function(t){e.address=t}}})],1)],2)],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{AddressesCreateUpdateForm:r(749).default})}}]);