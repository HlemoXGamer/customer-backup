(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{920:function(t,e,o){"use strict";o.r(e);o(29),o(16),o(15),o(22),o(25),o(21),o(26);var r=o(6),n=(o(9),o(17)),l=o(55);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={data:function(){return{loading:!1}},computed:v(v(v({},Object(n.d)("cart",["items"])),Object(n.c)("cart",["totalPrice"])),Object(l.b)("checkout",["form.user_data","form.payment_method_code","form.notes","payment_methods"])),methods:{checkout:function(){var t=this;this.loading=!0,this.$store.dispatch("checkout/checkout").then((function(){})).finally((function(){t.loading=!1}))}}},_=o(8),component=Object(_.a)(d,(function(){var t=this,e=t._self._c;return e("v-card",[e("v-card-text",{staticClass:"pt-0"},[e("p",{staticClass:"text-body-1 grey--text"},[t._v('\n      Review your oder details: Your order will not be placed until you click\n      "Place Order”\n    ')]),t._v(" "),e("p",{staticClass:"font-weight-bold text-h5 mt-10 black--text"},[t._v("\n      Order Information\n    ")]),t._v(" "),e("v-divider",{staticClass:"mb-5"}),t._v(" "),e("v-row",[e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("v-card",[e("p",{staticClass:"font-weight-bold text-subtitle-1"},[t._v("Shipping Address")]),t._v(" "),e("v-row",[e("v-col",{attrs:{cols:"8"}},[e("ul",[e("li",[t._v(t._s(t.user_data.name))]),t._v(" "),e("li",[t._v(t._s(t.user_data.phone))]),t._v(" "),e("li",[t._v(t._s(t.user_data.email))]),t._v(" "),e("li",[t._v(t._s(t.user_data.address.address))]),t._v(" "),e("li",[t._v(t._s(t.user_data.address.apartment))])])]),t._v(" "),e("v-col",{attrs:{cols:"4"}},[e("v-btn",{attrs:{outlined:"",color:"blue",small:""},on:{click:function(e){return t.$store.commit("checkout/SHOW_SHIPPING")}}},[t._v("change")])],1)],1)],1)],1),t._v(" "),e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("v-card",[e("p",{staticClass:"font-weight-bold text-subtitle-1"},[t._v("Payment")]),t._v(" "),e("v-row",[e("v-col",{attrs:{cols:"8"}},[t._v("\n              "+t._s(t.payment_methods[t.payment_method_code])+"\n            ")]),t._v(" "),e("v-col",{attrs:{cols:"4"}},[e("v-btn",{attrs:{outlined:"",color:"blue",small:""},on:{click:function(e){return t.$store.commit("checkout/SHOW_PAYMENT")}}},[t._v("change")])],1)],1)],1)],1)],1),t._v(" "),e("p",{staticClass:"font-weight-bold text-h5 mt-10 black--text"},[t._v("Items")]),t._v(" "),e("v-divider",{staticClass:"mb-5"}),t._v(" "),e("v-list",{staticClass:"rounded-lg",attrs:{elevation:"2"}},t._l(t.items,(function(o){return e("v-card",{key:o.id,attrs:{rounded:"lg"}},[e("v-list-item",{staticClass:"rounded-lg",attrs:{"three-line":""}},[e("v-list-item-avatar",{staticClass:"rounded-lg",attrs:{size:"85",color:"grey"}},[e("v-img",{attrs:{src:o.product.cover.url,width:"85",height:"85"}})],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{staticClass:"text-h6 text-white-space"},[t._v("\n              "+t._s(o.product.name_en)+"\n            ")]),t._v(" "),e("v-list-item-subtitle",{staticClass:"text-white-space"},[t._v(t._s(o.variant.name))]),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold"},[t._v("\n              "+t._s(o.quantity*o.variant.price)+"\n              "),e("span",{staticClass:"text-subtitle-2"},[t._v("KWD")])])],1)],1)],1)})),1),t._v(" "),e("p",{staticClass:"text-subtitle-1 font-weight-bold mb-2 mt-10"},[t._v("\n      Additional Notes\n    ")]),t._v(" "),e("v-text-field",{staticClass:"rounded-lg",attrs:{outlined:"",solo:"",flat:"",height:"57",label:" Additional notes for customer support team:"},model:{value:t.notes,callback:function(e){t.notes=e},expression:"notes"}})],1),t._v(" "),e("v-card-actions",{staticClass:"justify-space-between px-0"},[e("v-btn",{staticClass:"d-none d-lg-block",attrs:{nuxt:"",to:"/cart",elevation:"0",text:"",color:"grey",large:"",dark:""}},[e("v-icon",{attrs:{left:"",large:""}},[t._v(" mdi-chevron-left ")]),t._v(" Return to Cart\n    ")],1),t._v(" "),e("v-btn",{staticClass:"rounded-lg",style:{flex:t.$vuetify.breakpoint.mobile?1:.7},attrs:{"x-large":"",height:"57",color:"light-blue darken-3",elevation:"0",dark:"",loading:t.loading},on:{click:t.checkout}},[t._v("\n      Checkout\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);