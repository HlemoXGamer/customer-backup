(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{782:function(t,e,n){var content=n(846);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(2).default)("1140a41d",content,!0,{sourceMap:!1})},845:function(t,e,n){"use strict";n(782)},846:function(t,e,n){var r=n(1)((function(i){return i[1]}));r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=PT+Sans&display=swap);"]),r.push([t.i,'.success-container[data-v-b596994a]{align-items:center;background-color:#fff;display:flex;flex-direction:column;font-family:"Readex Pro",sans-serif!important;height:100vh;justify-content:center;width:100vw}.success-container .success-container-text[data-v-b596994a]{margin-bottom:25px}.success-container .success-container-text p[data-v-b596994a]{color:#65382c;font-weight:700;text-align:center}.success-container .success-container-text p[data-v-b596994a]:first-child{font-size:60px}.success-container .success-container-text p[data-v-b596994a]:last-child{font-size:27px;margin-top:20px}',""]),r.locals={},t.exports=r},889:function(t,e,n){"use strict";n.r(e);var r=n(60),c=(n(9),n(20),n(76),n(212)),o={layout:"payment",data:function(){return{order_id:this.$router.currentRoute.query.id,total_value:0,currency:"KWD",items:[]}},methods:{getOrderDetails:function(){var t=this;Object(c.f)(this.order_id).then((function(e){var data=e.data;t.total_value=data.total,data.products.forEach((function(e,n){t.items.push({item_id:e.id,item_name:e.name_en,item_code:e.code,price:e.price,quantity:e.quantity,index:n})}))})).catch((function(t){console.error(t)})).finally((function(){t.gaPurchase(),t.fbPurchase()}))},gaPurchase:function(){var t=this;gtag("event","purchase",{transaction_id:this.order_id,value:this.total_value,tax:0,shipping:.5,currency:this.currency,coupon:"",items:Object(r.a)(this.items)}),setTimeout((function(){t.$router.push("/profile/orders/".concat(t.order_id,"/track"))}),5e3)},fbPurchase:function(){fbq("track","Purchase",{currency:this.currency,value:this.total_value})}},mounted:function(){this.getOrderDetails()}},l=(n(845),n(6)),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"success-container"},[e("div",{staticClass:"success-container-text"},[e("p",[t._v(t._s(t.$t("checkout.payment.thanks_for_buying")))]),t._v(" "),e("p",[t._v(t._s(t.$t("checkout.payment.redirect")))])]),t._v(" "),e("svg",{attrs:{width:"70",height:"70",viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",stroke:"#65382c"}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}}),t._v(" "),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"}})],1)])])])])}),[],!1,null,"b596994a",null);e.default=component.exports}}]);