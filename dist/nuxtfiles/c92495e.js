(window.webpackJsonp=window.webpackJsonp||[]).push([[7,22],{731:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"f",(function(){return l})),r.d(t,"a",(function(){return c})),r.d(t,"e",(function(){return d})),r.d(t,"c",(function(){return f})),r.d(t,"d",(function(){return m})),r.d(t,"g",(function(){return h}));var n=r(5);function o(){return n.a.get("/customer/addresses")}function l(e){return n.a.get("/customer/addresses/"+e)}function c(data){return n.a.post("/customer/addresses",data)}function d(data){return n.a.post("customer/set/default/address/",data)}function f(){return n.a.get("/customer/get-default-location")}function m(data){return n.a.delete("customer/addresses/".concat(data))}function h(e,data){return n.a.put("/customer/addresses/"+e,data)}},732:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(5);function o(e){return n.a.get("/areas",{params:e})}},733:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(5);function o(e){return n.a.get("/cities",e)}},734:function(e,t,r){"use strict";r.r(t);var n=r(7),o=(r(40),r(125),r(732)),l=r(733),c={props:{itemValue:{type:String,default:"id"},disabled:{type:Boolean,default:!1},hideCity:{type:Boolean,default:!1},area:{type:[Number,String]},city:{type:[Number,String]},cityErrorMessages:{type:Array,default:function(){return[]}},areaErrorMessages:{type:Array,default:function(){return[]}}},data:function(){return{areas:[],cities:[],loading:{city:!1,area:!1}}},watch:{city:{handler:function(e){e&&this.loadAreas(e)},immediate:!0,deep:!0}},methods:{loadCities:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading.city=!0,t.next=3,Object(l.a)();case 3:e.cities=t.sent.data,e.loading.city=!1;case 5:case"end":return t.stop()}}),t)})))()},loadAreas:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.loading.area=!0,t.areas=[],r.next=4,Object(o.a)({id:e});case 4:t.areas=r.sent.data,t.loading.area=!1;case 6:case"end":return r.stop()}}),r)})))()}},created:function(){this.loadCities()}},d=r(8),component=Object(d.a)(c,(function(){var e=this,t=e._self._c;return t("v-row",[e.hideCity?e._e():t("v-col",{attrs:{cols:"12"}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.city"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-select",{staticClass:"rounded-lg",attrs:{disabled:e.disabled,"return-object":"",items:e.cities,loading:e.loading.city,"item-value":e.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:e.city,"error-messages":e.cityErrorMessages},on:{input:function(t){return e.$emit("citySelected",t)}}})],1),e._v(" "),t("v-col",{attrs:{cols:"12"}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.area"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-select",{staticClass:"rounded-lg",attrs:{"return-object":"",disabled:!e.city||e.disabled,loading:e.loading.area,items:e.areas,"item-value":e.itemValue,"item-text":"name",height:"57",outlined:"",flat:"",value:e.area,"error-messages":e.areaErrorMessages},on:{input:function(t){return e.$emit("areaSelected",t)}}})],1)],1)}),[],!1,null,null,null);t.default=component.exports},743:function(e,t,r){"use strict";r.r(t);r(15),r(47),r(33),r(36),r(16),r(22),r(25),r(21),r(26);var n=r(213),o=r(6),l=r(7),c=(r(40),r(27),r(34),r(9),r(29),r(731)),d=r(211),f=(r(733),["id"]);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={props:{address:{type:Object}},data:function(e){return{phoneValid:!1,editMode:!1,cities:[],form:e.$props.checkout?e.$props.address:{country_name:"Egypt",address:"",city_id:1,city_name:"Kuwait",area_id:null,area_name:"",building_num:"",block_no:"",street_name:"",floor:"",apartment:"",description:"",phone:"",default:!0,branch_id:null},loading:!1,id:null}},computed:{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")}},methods:{checkPhone:function(e){var t=e.isValid;this.phoneValid=t},submit:function(){if(this.$v.$touch(),this.$v.$invalid)return console.log(this.$v),void this.$toast.error("Error");this.id?this.updateAddress():this.createAddress()},fetchOne:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.id=e.$route.params.id,!e.id){t.next=9;break}return e.editMode=!0,t.next=5,Object(c.f)(e.id);case 5:r=t.sent,11===(data=r.data).phone.length&&(data.phone=data.phone.slice(3)),e.form=h(h({},e.form),data);case 9:case"end":return t.stop()}}),t)})))()},createAddress:function(){var e=this;this.loading=!0;var data=h({},this.form);8===data.phone.length&&(data.phone="965"+data.phone),Object(c.a)(data).then((function(){e.$router.push(e.localePath("/profile/addresses")),e.$toast.success("Created")}))},updateAddress:function(){var e=this;this.loading=!0;var t=this.form,r=(t.id,Object(n.a)(t,f));8===r.phone.length&&(r.phone="965"+r.phone),Object(c.g)(this.id,r).then((function(){e.$router.push(e.localePath("/profile/addresses")),e.$toast.success("Updated")})).finally((function(){e.loading=!1}))},areaSelected:function(e){var t;this.form.area_id=e.id,this.form.area_name=e.name,this.form.branch_id=null===(t=e.branches[0])||void 0===t?void 0:t.id},citySelected:function(e){this.form.city_id=e.id,this.form.city_name=e.name}},validations:function(){return{form:{city_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},area_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},building_num:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},block_no:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},street_name:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},floor:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},apartment:{numeric:d.helpers.withParams({lang:this.$i18n.locale},d.numeric),required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},description:{required:d.helpers.withParams({lang:this.$i18n.locale},d.required)},phone:{phone_number:function(e){return/^([5694]\d{7})$/g.test(e)}}}}},watch:{"$props.address":{handler:function(){this.form=this.$props.address}}},created:function(){this.fetchOne(),this.$props.checkout&&(this.form=this.$props.address)}},_=r(8),component=Object(_.a)(v,(function(){var e=this,t=e._self._c;return t("v-card",{staticClass:"py-5"},[t("v-card-text",[t("CommonCountryCityCombo",{attrs:{"hide-city":!0,"item-value":"name",area:e.form.area_name,city:e.form.city_name},on:{areaSelected:e.areaSelected,citySelected:e.citySelected}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.block_no"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.block_no)},on:{input:function(t){return e.$v.form.block_no.$touch()}},model:{value:e.form.block_no,callback:function(t){e.$set(e.form,"block_no",t)},expression:"form.block_no"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.street_name"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.street_name)},on:{input:function(t){return e.$v.form.street_name.$touch()}},model:{value:e.form.street_name,callback:function(t){e.$set(e.form,"street_name",t)},expression:"form.street_name"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.building_number"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.building_num)},on:{input:function(t){return e.$v.form.building_num.$touch()}},model:{value:e.form.building_num,callback:function(t){e.$set(e.form,"building_num",t)},expression:"form.building_num"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.floor"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.floor)},on:{input:function(t){return e.$v.form.floor.$touch()}},model:{value:e.form.floor,callback:function(t){e.$set(e.form,"floor",t)},expression:"form.floor"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.apartment_no"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.apartment)},on:{input:function(t){return e.$v.form.apartment.$touch()}},model:{value:e.form.apartment,callback:function(t){e.$set(e.form,"apartment",t)},expression:"form.apartment"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.additional_info"))+"\n    ")]),e._v(" "),t("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.description)},on:{input:function(t){return e.$v.form.description.$touch()}},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.phone"))+"\n    ")]),e._v(" "),t("div",{staticClass:"d-flex align-start"},[t("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[t("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),e._v(" "),t("div",{staticStyle:{width:"100%"}},[t("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"57","error-messages":e.$validationMsgs(e.$v.form.phone),label:"",placeholder:e.phone_placeholder},on:{input:function(t){return e.$v.form.phone.$touch()}},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)]),e._v(" "),t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-0 font-primary"},[e._v("\n      "+e._s(e.$t("profile.addresses.default"))+"\n    ")]),e._v(" "),t("v-checkbox",{staticClass:"mt-0",attrs:{label:"".concat(e.$t("profile.addresses.default_address"))},model:{value:e.form.default,callback:function(t){e.$set(e.form,"default",t)},expression:"form.default"}})],1),e._v(" "),t("v-card-actions",[this.$route.path.includes("finalize")?e._e():t("v-btn",{staticClass:"rounded-lg",attrs:{loading:e.loading,elevation:"0",large:"",color:"primary"},on:{click:e.submit}},[e._v("\n      "+e._s(e.id?e.$t("profile.addresses.update"):e.$t("profile.addresses.create"))+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{CommonCountryCityCombo:r(734).default})}}]);