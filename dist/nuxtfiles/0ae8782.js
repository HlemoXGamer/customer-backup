(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{801:function(o,t,r){var content=r(865);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,r(2).default)("0d02cf6a",content,!0,{sourceMap:!1})},864:function(o,t,r){"use strict";r(801)},865:function(o,t,r){var e=r(1)((function(i){return i[1]}));e.push([o.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),e.push([o.i,".font-primary[data-v-d7e6739a]{color:#65382c!important;font-size:2rem}.v-application .Newprimary[data-v-d7e6739a]{background-color:#65382c!important;border-color:#65382c!important}.buttonBlock[data-v-d7e6739a]{margin:2rem auto}.Newprimary .v-btn__content[data-v-d7e6739a]{color:#fff;padding:0 5rem}",""]),e.locals={},o.exports=e},912:function(o,t,r){"use strict";r.r(t);var e=r(210),n=r(214),l={data:function(){return{loading:!1,form:{old_password:"",new_password:"",new_password_confirmation:""}}},validations:function(){return{form:{old_password:{required:e.helpers.withParams({lang:this.$i18n.locale},e.required)},new_password:{required:e.helpers.withParams({lang:this.$i18n.locale},e.required)},new_password_confirmation:{required:e.helpers.withParams({lang:this.$i18n.locale},e.required),sameAs:Object(e.sameAs)("new_password")}}}},methods:{update:function(){var o=this;this.loading=!0,Object(n.a)(this.form).then((function(){o.loading=!1,o.$toast.success("Updated")})).catch((function(t){o.loading=!1}))}}},d=(r(864),r(8)),component=Object(d.a)(l,(function(){var o=this,t=o._self._c;return t("v-row",{class:o.$vuetify.breakpoint.mobile?"":"mt-10"},[t("v-col",{attrs:{cols:"12"}},[t("h3",{staticClass:"ml-5 font-primary font-weight-bold"},[o._v("\n      "+o._s(o.$t("profile.change_password.change_password"))+"\n    ")])]),o._v(" "),t("v-col",{attrs:{cols:"12 "}},[t("v-card",{staticClass:"pa-4",attrs:{rounded:"lg"}},[t("v-row",[t("v-col",{attrs:{cols:o.$vuetify.breakpoint.mobile?12:3}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[o._v("\n            "+o._s(o.$t("profile.change_password.old_password"))),t("Sup",[o._v("*")])],1),o._v(" "),t("v-text-field",{staticClass:"rounded-lg sing-up-Fields",attrs:{outlined:"",solo:"",flat:"",height:"30",type:"password","error-messages":o.$validationMsgs(o.$v.form.old_password)},on:{input:function(t){return o.$v.form.old_password.$touch()}},model:{value:o.form.old_password,callback:function(t){o.$set(o.form,"old_password",t)},expression:"form.old_password"}})],1),o._v(" "),t("v-col",{attrs:{cols:o.$vuetify.breakpoint.mobile?12:3}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[o._v("\n            "+o._s(o.$t("profile.change_password.new_password"))),t("Sup",[o._v("*")])],1),o._v(" "),t("v-text-field",{staticClass:"rounded-lg sing-up-Fields",attrs:{outlined:"",solo:"",flat:"",height:"30",type:"password","error-messages":o.$validationMsgs(o.$v.form.new_password)},on:{input:function(t){return o.$v.form.new_password.$touch()}},model:{value:o.form.new_password,callback:function(t){o.$set(o.form,"new_password",t)},expression:"form.new_password"}})],1),o._v(" "),t("v-col",{attrs:{cols:o.$vuetify.breakpoint.mobile?12:3}},[t("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary"},[o._v("\n            "+o._s(o.$t("profile.change_password.password_confirmation"))),t("Sup",[o._v("*")])],1),o._v(" "),t("v-text-field",{staticClass:"rounded-lg sing-up-Fields",attrs:{outlined:"",solo:"",flat:"",height:"30","error-messages":o.$validationMsgs(o.$v.form.new_password_confirmation),type:"password"},on:{input:function(t){return o.$v.form.new_password_confirmation.$touch()}},model:{value:o.form.new_password_confirmation,callback:function(t){o.$set(o.form,"new_password_confirmation",t)},expression:"form.new_password_confirmation"}})],1),o._v(" "),t("v-col",{attrs:{cols:o.$vuetify.breakpoint.mobile?12:3}},[t("v-btn",{staticClass:"text-center d-block buttonBlock",attrs:{elevation:"0","x-large":"",color:"Newprimary",loading:o.loading},on:{click:o.update}},[o._v("\n            "+o._s(o.$t("profile.change_password.save"))+"\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,"d7e6739a",null);t.default=component.exports}}]);