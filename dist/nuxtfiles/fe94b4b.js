(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{770:function(t,e,r){var content=r(819);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(2).default)("344598c2",content,!0,{sourceMap:!1})},818:function(t,e,r){"use strict";r(770)},819:function(t,e,r){var o=r(1)((function(i){return i[1]}));o.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),o.push([t.i,'.font-primary[data-v-4703e7af],.font-primary .v-btn__content[data-v-4703e7af]{color:#65382c}.font--size__40[data-v-4703e7af]{font-size:2.5rem}.v-input__slot[data-v-4703e7af]{min-height:50px!important}.text-decoration-underline[data-v-4703e7af]{flex:0 1 auto}.forget-passowrd[data-v-4703e7af]{background:transparent!important;font-family:"exo 2";margin-top:2rem}.v-card__actions>.v-btn.v-btn[data-v-4703e7af]{background:#65382c!important;padding:0 5rem}.v-card__actions[data-v-4703e7af]{display:block;text-align:center}.text-gray[data-v-4703e7af]{color:#65382c!important;font-size:12px!important}.sing-up-Fields[data-v-4703e7af]{width:450px!important}.forgetPassowrd[data-v-4703e7af]{color:#65382c;font-size:13px;text-align:center}',""]),o.locals={},t.exports=o},890:function(t,e,r){"use strict";r.r(e);var o=r(7),n=(r(39),r(211)),l=r(70),c={middleware:"auth",auth:"guest",data:function(){return{form:{email:""},loading:!1}},methods:{login:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$v.$touch(),!t.$v.$invalid){e.next=3;break}return e.abrupt("return");case 3:t.loading=!0,Object(l.a)(t.form).then((function(){t.$router.push({path:t.localePath("/resetPassword"),query:{email:t.form.email}})})),t.loading=!1;case 6:case"end":return e.stop()}}),e)})))()}},validations:function(){return{form:{email:{required:n.helpers.withParams({lang:this.$i18n.locale},n.required),email:n.helpers.withParams({lang:this.$i18n.locale},n.email)}}}}},d=(r(818),r(6)),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("v-row",[e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("v-img",{attrs:{src:"/images/big-logo-no-text.png"}})],1),t._v(" "),e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("h2",{staticClass:"text-center font-primary font--size__40 mb-5 mt-5"},[t._v("\n      "+t._s(t.$t("forget_password.forgot_password"))+"\n    ")]),t._v(" "),e("p",{staticClass:"mb-15 forgetPassword"},[t._v("\n      "+t._s(t.$t("forget_password.help"))+"\n    ")]),t._v(" "),e("v-card",{attrs:{rounded:"lg"}},[e("v-card-text",[e("p",{class:t.$vuetify.breakpoint.mobile?"text-subtitle-1  font-weight-bold mb-2 font-primary":"text-subtitle-1 ml-15 mt-15 font-weight-bold mb-2 font-primary"},[t._v("\n          "+t._s(t.$t("forget_password.email"))),e("Sup",[t._v("*")])],1),t._v(" "),e("v-text-field",{class:t.$vuetify.breakpoint.mobile?"rounded-lg sing-up-Fields":"rounded-lg ml-15 sing-up-Fields",attrs:{dir:"ltr",outlined:"",solo:"",flat:"",height:"50",width:"486",type:"email","error-messages":t.$validationMsgs(t.$v.form.email)},on:{input:function(e){return t.$v.form.email.$touch()}},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),e("v-card-actions",[e("v-btn",{staticClass:"rounded-lg text-center",attrs:{elevation:"0","x-large":"",color:"primary",loading:t.loading},on:{click:t.login}},[t._v(t._s(t.$t("forget_password.send"))+"\n        ")])],1)],1)],1)],1)}),[],!1,null,"4703e7af",null);e.default=component.exports}}]);