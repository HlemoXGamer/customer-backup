(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{777:function(e,t,o){var content=o(840);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(2).default)("453002f0",content,!0,{sourceMap:!1})},839:function(e,t,o){"use strict";o(777)},840:function(e,t,o){var r=o(1)((function(i){return i[1]}));r.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),r.push([e.i,".updateImg input[data-v-7f3966a1]{display:none}.updateImg img[data-v-7f3966a1],.updateImg label[data-v-7f3966a1]{border-radius:50%;cursor:pointer;height:212px;width:213px}.font-primary[data-v-7f3966a1]{font-size:2rem}.font-primary[data-v-7f3966a1],.font-primary-Password[data-v-7f3966a1]{color:#65382c!important}.v-application .v-text-field--outlined .v-label[data-v-7f3966a1],.v-application .v-text-field--solo .v-label[data-v-7f3966a1]{top:calc(50% - 9px)!important}.vue-tel-input-vuetify .vti__flag[data-v-7f3966a1]{display:block;margin:auto!important;position:static!important;transform:scale(1.2);width:20px}.vue-tel-input-vuetify .vti__flag+input[data-v-7f3966a1]{display:none}",""]),r.locals={},e.exports=r},896:function(e,t,o){"use strict";o.r(t);o(28);var r=o(7),n=(o(39),o(35),o(34),o(40),o(211)),l=o(215),c=n.helpers.regex("serial",/^([5694]\d{7})$/g),f={data:function(e){return{loading:!1,phoneValid:!1,imageData:"",form:{image:"",name:"",email:"",phone:""}}},methods:{getProfile:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.b)();case 2:o=t.sent,11===(r=o.data.user).phone.length&&(r.phone=r.phone.slice(3)),e.form=r;case 6:case"end":return t.stop()}}),t)})))()},previewThumbnail:function(e){var t=this,input=e.target;if(input.files&&input.files[0]){this.form.image=input.files[0];var o=new FileReader;o.onload=function(e){t.imageData=e.target.result},o.readAsDataURL(input.files[0])}},update:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data,o,r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$v.$touch(),!e.$v.$invalid){t.next=3;break}return t.abrupt("return");case 3:for(n in data={},o=new FormData,r=["name","email","phone","image"],e.form)r.includes(n)&&("phone"===n&&8===e.form.phone.length?o.append("phone","965"+e.form.phone):o.append(n,e.form[n]),data[n]=e.form[n]);e.loading=!0,Object(l.c)(o).then((function(){e.loading=!1,e.$toast.success("Updated")})).catch((function(t){e.loading=!1}));case 9:case"end":return t.stop()}}),t)})))()},checkPhone:function(e){var t=e.isValid;this.phoneValid=t}},validations:function(){return{form:{name:{required:n.helpers.withParams({lang:this.$i18n.locale},n.required)},email:{required:n.helpers.withParams({lang:this.$i18n.locale},n.required),email:n.helpers.withParams({lang:this.$i18n.locale},n.email)},phone:{required:n.helpers.withParams({lang:this.$i18n.locale},n.required),phone_number:c}}}},computed:{phone_placeholder:function(){return this.$t("profile.addresses.phone_placeholder")},image:function(){return this.imageData.length>0?this.imageData:this.form.image?this.form.image:"/images/upload.png"}},created:function(){this.getProfile()}},m=(o(839),o(6)),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("div",[t("v-row",{class:e.$vuetify.breakpoint.mobile?"":"mt-10"},[t("v-col",{attrs:{cols:"12"}},[t("h3",{staticClass:"ml-5 font-primary font-weight-bold"},[e._v("\n        "+e._s(e.$t("profile.profile.edit_profile"))+"\n      ")])]),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:3}},[t("div",{staticClass:"d-block align-center justify-space-between"},[t("form",{staticClass:"updateImg mt-5"},[t("label",[t("img",{attrs:{src:e.image}}),e._v(" "),t("input",{attrs:{type:"file"},on:{change:e.previewThumbnail}})])])])]),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:9}},[t("v-card",{staticClass:"pa-4",attrs:{rounded:"lg"}},[t("v-row",[t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:6}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[e._v("\n              "+e._s(e.$t("profile.profile.username"))),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{attrs:{outlined:"",solo:"",name:"name","error-messages":e.$validationMsgs(e.$v.form.name),label:"Full Name",required:""},on:{input:function(t){return e.$v.form.name.$touch()}},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:6}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[e._v("\n              "+e._s(e.$t("profile.profile.email"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("v-text-field",{attrs:{outlined:"",solo:"",label:"E-mail","error-messages":e.$validationMsgs(e.$v.form.email),name:"email",required:""},on:{input:function(t){return e.$v.form.email.$touch()}},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:6}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[e._v("\n              "+e._s(e.$t("profile.profile.phone"))+" "),t("Sup",[e._v("*")])],1),e._v(" "),t("div",{staticClass:"d-flex align-start"},[t("div",{staticClass:"country-container",staticStyle:{"max-height":"56px","line-height":"66px"}},[t("img",{attrs:{width:"20",height:"20",src:"https://img.icons8.com/color/48/null/kuwait.png"}})]),e._v(" "),t("div",{staticStyle:{width:"100%"}},[t("v-text-field",{staticClass:"rounded-lg",attrs:{dir:"ltr",outlined:"",flat:"",height:"50","error-messages":e.$validationMsgs(e.$v.form.phone),label:"",placeholder:e.phone_placeholder},on:{input:function(t){return e.$v.form.phone.$touch()}},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)])]),e._v(" "),t("v-col",{attrs:{cols:e.$vuetify.breakpoint.mobile?12:6}},[t("nuxt-link",{staticClass:"font-primary-Password text-center d-block",attrs:{to:e.localePath("/profile/change-password")}},[e._v(e._s(e.$t("profile.profile.change_password")))])],1)],1),e._v(" "),t("v-card-actions",[t("v-btn",{attrs:{elevation:"0","x-large":"",color:"primary",loading:e.loading},on:{click:e.update}},[e._v(e._s(e.$t("profile.profile.save")))])],1)],1)],1)],1)],1)}),[],!1,null,"7f3966a1",null);t.default=component.exports}}]);