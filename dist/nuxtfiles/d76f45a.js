(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{775:function(t,o,e){var content=e(839);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(2).default)("f8721b5c",content,!0,{sourceMap:!1})},838:function(t,o,e){"use strict";e(775)},839:function(t,o,e){var r=e(1)((function(i){return i[1]}));r.push([t.i,'.font-primary[data-v-48c5ac0e],.font-primary .v-btn__content[data-v-48c5ac0e]{color:#65382c}.font--size__40[data-v-48c5ac0e]{font-size:2.5rem}.v-input__slot[data-v-48c5ac0e]{min-height:50px!important}.text-decoration-underline[data-v-48c5ac0e]{flex:0 1 auto}.forget-passowrd[data-v-48c5ac0e]{background:transparent!important;font-family:"exo 2";margin-top:2rem}.v-card__actions>.v-btn.v-btn[data-v-48c5ac0e]{background:#65382c!important;padding:0 5rem}.v-card__actions[data-v-48c5ac0e]{display:block;text-align:center}.text-gray[data-v-48c5ac0e]{color:#65382c!important;font-size:12px!important}.sing-up-Fields[data-v-48c5ac0e]{width:450px!important}.forgetPassowrd[data-v-48c5ac0e]{color:#65382c;font-size:13px;text-align:center}',""]),r.locals={},t.exports=r},887:function(t,o,e){"use strict";e.r(o);e(29),e(63),e(9);var r=e(211),n=e(70),l={middleware:"auth",auth:"guest",data:function(t){return{form:{email:t.$route.query.email,token:"",password:"",password_confirmation:""},loading:!1}},methods:{login:function(){var t=this;this.$v.$touch(),this.$v.$invalid||(this.loading=!0,Object(n.d)(this.form).then((function(o){t.loading=!1,t.$router.replace(t.localePath("/login"))})).catch((function(o){t.loading=!1,t.dialog=!1})),this.loading=!1)}},validations:function(){return{form:{token:{required:r.helpers.withParams({lang:this.$i18n.locale},r.required)},password:{required:r.helpers.withParams({lang:this.$i18n.locale},r.required)},password_confirmation:{required:r.helpers.withParams({lang:this.$i18n.locale},r.required),sameAs:Object(r.sameAs)("password")}}}}},c=(e(838),e(6)),component=Object(c.a)(l,(function(){var t=this,o=t._self._c;return o("v-row",[o("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[o("v-img",{attrs:{src:"/images/big-logo-no-text.png"}})],1),t._v(" "),o("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[o("h2",{staticClass:"text-center font-primary font--size__40 mb-5 mt-5"},[t._v("\n      "+t._s(t.$t("reset_password.reset_password"))+"\n    ")]),t._v(" "),o("v-card",{attrs:{rounded:"lg"}},[o("v-card-text",[o("p",{staticClass:"text-subtitle-1 ml-15 font-weight-bold mb-2 font-primary"},[t._v("\n          "+t._s(t.$t("reset_password.pin"))),o("Sup",[t._v("*")])],1),t._v(" "),o("v-text-field",{staticClass:"rounded-lg ml-15 sing-up-Fields",attrs:{dir:"ltr",outlined:"",solo:"",flat:"",height:"50",width:"486",type:"password","error-messages":t.$validationMsgs(t.$v.form.token)},on:{input:function(o){return t.$v.form.token.$touch()}},model:{value:t.form.token,callback:function(o){t.$set(t.form,"token",o)},expression:"form.token"}}),t._v(" "),o("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary ml-15"},[t._v("\n          "+t._s(t.$t("reset_password.new_password"))+" "),o("Sup",[t._v("*")])],1),t._v(" "),o("v-text-field",{staticClass:"rounded-lg ml-15 sing-up-Fields",attrs:{outlined:"",solo:"",flat:"",height:"50",type:"password","error-messages":t.$validationMsgs(t.$v.form.password)},on:{input:function(o){return t.$v.form.password.$touch()}},model:{value:t.form.password,callback:function(o){t.$set(t.form,"password",o)},expression:"form.password"}}),t._v(" "),o("p",{staticClass:"text-subtitle-1 font-weight-bold mb-1 font-primary ml-15"},[t._v("\n          "+t._s(t.$t("reset_password.confirmation_new_password"))),o("Sup",[t._v("*")])],1),t._v(" "),o("v-text-field",{staticClass:"rounded-lg ml-15 sing-up-Fields",attrs:{outlined:"",solo:"",flat:"",height:"50","error-messages":t.$validationMsgs(t.$v.form.password_confirmation),type:"password"},on:{input:function(o){return t.$v.form.password_confirmation.$touch()}},model:{value:t.form.password_confirmation,callback:function(o){t.$set(t.form,"password_confirmation",o)},expression:"form.password_confirmation"}})],1),t._v(" "),o("v-card-actions",[o("v-btn",{staticClass:"rounded-lg text-center",attrs:{elevation:"0","x-large":"",color:"primary",loading:t.loading},on:{click:t.login}},[t._v(t._s(t.$t("reset_password.save"))+"\n        ")])],1)],1)],1)],1)}),[],!1,null,"48c5ac0e",null);o.default=component.exports}}]);