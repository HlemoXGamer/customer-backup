(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{908:function(t,e,o){"use strict";o.r(e);o(15),o(25),o(21),o(26);var r=o(60),n=o(7),c=o(6),l=(o(40),o(33),o(36),o(52),o(32),o(22),o(9),o(69),o(16),o(125),o(164),o(75),o(95)),d=o(17),m=o(97);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{mobileProductDialog:!1,mobileProductDialogData:{},initCheckout:!1,products:[],allExtrasFlavors:[],addToCartLoading:!1,subTotal:0,voucher_code:"",discount:"",discount_type:"",discount_rate:"",newSubTotal:"",loading:!1,productsLoading:!1,removeAllLoading:!1,removeExtraFlavorLoading:!1,dialog:{image_dialog:!1,images:[],note_dialog:!1,notes:[],extras_flavors_dialog:!1,extras_flavors:[],product_id:"",count:0}}},methods:_(_({},Object(d.b)("cart",["setItemNotes"])),{},{hasExtraFlavor:function(t){return this.extra_flavors.map((function(t){return t.product_id})).includes(t)},emptyCart:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.removeAllLoading=!0,e.next=3,Object(m.e)(t.id,t.$auth.loggedIn);case 3:return e.next=5,t.fetch();case 5:t.removeAllLoading=!1;case 6:case"end":return e.stop()}}),e)})))()},addImage:function(t){this.images=[].concat(Object(r.a)(this.images),[{file:t,id:uuidv4(),type:"new"}])},deleteImage:function(t){"new"!==t.type&&this.deleted_images.push(t.id),this.images=this.images.filter((function(img){return img.id!==t.id}))},updateNote:function(t){this.update_notes.push(t.id)},openDialog:function(t,e){"image"===e?this.openImageDialog(t):"note"===e?this.openNoteDialog(t):"extras_flavors"===e&&this.openExtrasFlavorsDialog(t)},openImageDialog:function(t){this.dialog.images=t.images,this.dialog.product_id=t.product_id,this.dialog.count=t.quantity;var e=this;setTimeout((function(){e.dialog.image_dialog=!0}),200)},openNoteDialog:function(t){this.dialog.notes=t.notes,this.dialog.product_id=t.product_id,this.dialog.count=t.quantity;var e=this;setTimeout((function(){e.dialog.note_dialog=!0}),200),this.setItemNotes({itemNotes:t.notes,productId:t.product_id})},openExtrasFlavorsDialog:function(t){this.dialog.extras_flavors=this.allExtrasFlavors.filter((function(e){return e.product_id==t})),this.dialog.extras_flavors_dialog=!0},toCheckout:function(){this.$router.push(this.localePath(this.$auth.loggedIn?"/checkout/finalize":"/checkout"))},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,area,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.productsLoading=!0,"area"!=(o=localStorage.getItem("default_location"))){e.next=8;break}return area=JSON.parse(localStorage.getItem("default_area")),e.next=6,t.$store.dispatch("cart/get",{branch:area.id});case 6:e.next=12;break;case 8:if("address"!=o){e.next=12;break}return r=JSON.parse(localStorage.getItem("default_address")),e.next=12,t.$store.dispatch("cart/get",{branch:r.branch_id});case 12:t.products=t.items,t.allExtrasFlavors=t.extra_flavors,t.subTotal=t.total,t.productsLoading=!1;case 16:case"end":return e.stop()}}),e)})))()},i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},updateDialogShow:function(t){this.mobileProductDialog=t},updateDialogData:function(data){this.mobileProductDialogData=data},applyVoucher:function(){var t=this;this.loading=!0,Object(l.c)({v_code:this.voucher_code,total:this.total}).then((function(e){t.discount_rate=e.discount_rate,t.discount_type=e.discount_type;t.discount=e.discount_rate+{fixed:"KWD",percentage:"%",free_delivevery:"FD"}[t.discount_type],"fixed"==t.discount_type?t.newSubTotal=Number(t.total-Number(t.discount_rate)):"percentage"==t.discount_type?t.newSubTotal=t.total-t.total*(Number(t.discount_rate)/100):"free_delivevery"==t.discount_type&&(t.delivery_cost=0),t.$store.commit("checkout/SET_V_CODE",t.voucher_code),t.loading=!1,t.$toast.success(e.message)})).catch((function(e){t.loading=!1}))},increment:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n,c,l;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return e.addToCartLoading=!0,o.prev=1,n=e.products.findIndex((function(i){return i.product_id===t.product_id})),(c=JSON.parse(JSON.stringify(e.products)))[n].quantity=c[n].quantity+1,o.next=7,e.$store.dispatch("cart/setAll",c);case 7:return l=_(_({},t),{},{quantity:1,images:t.images.map((function(image){return image.file})),notes:[""].concat(Object(r.a)(t.notes.map((function(t){return t.note}))))}),o.next=10,e.$store.dispatch("cart/add",l);case 10:return o.next=12,e.fetch();case 12:return o.prev=12,e.addToCartLoading=!1,o.finish(12);case 15:case"end":return o.stop()}}),o,null,[[1,,12,15]])})))()},decrement:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var r,n,c;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return e.addToCartLoading=!0,o.prev=1,r=e.products.findIndex((function(i){return i.product_id===t.product_id})),(n=JSON.parse(JSON.stringify(e.products)))[r].quantity=n[r].quantity-1,o.next=7,e.$store.dispatch("cart/setAll",n);case 7:return c=_(_({},t),{},{quantity:-1,images:t.images.map((function(image){return image.file})),notes:t.notes.map((function(t){return t.note}))}),o.next=10,e.$store.dispatch("cart/add",c);case 10:return o.next=12,e.fetch();case 12:return o.prev=12,e.addToCartLoading=!1,o.finish(12);case 15:case"end":return o.stop()}}),o,null,[[1,,12,15]])})))()},changeCount:function(t,e,o,r){var c=this;return Object(n.a)(regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:if(!(r+t<=0)){l.next=4;break}return l.next=3,c.$store.dispatch("cart/remove",e).then(Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.fetch();case 2:case"end":return t.stop()}}),t)}))));case 3:return l.abrupt("return",l.sent);case 4:1==t?c.increment(o):-1==t&&c.decrement(o);case 5:case"end":return l.stop()}}),l)})))()},removeExtraFlavor:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return e.removeExtraFlavorLoading=!0,o.next=3,e.$store.dispatch("cart/remove",t);case 3:e.removeExtraFlavorLoading=!1;case 4:case"end":return o.stop()}}),o)})))()},addToCart:function(t){var e=arguments,o=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return data=e.length>1&&void 0!==e[1]?e[1]:{},o.addToCartLoading=!0,r.next=4,o.$store.dispatch("cart/add",{product_id:t,quantity:data.count||1}).then((function(){o.fetch()}));case 4:o.addToCartLoading=!1;case 5:case"end":return r.stop()}}),r)})))()}}),computed:_(_({},Object(d.d)("cart",["id","total","delivery_cost","items","delivery_fee","count","delivery_cost","minimum_charge","extra_flavors"])),{},{disable_checkout:function(){var t=this;return this.items.find((function(e){return e.product.has_image&&e.quantity>e.images.length||t.subTotal<t.minimum_charge||!e.product.in_stock}))}}),mounted:function(){this.fetch()}},h=f,x=o(8),component=Object(x.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"pt-5",staticStyle:{position:"relative"}},[e("p",{staticClass:"text-h6 font-weight-bold mb-5 mx-auto",staticStyle:{width:"fit-content",color:"#65382c","border-bottom":"1px solid #65382c"}},[t._v(t._s(t.$t("cart.order_details")))]),t._v(" "),e("v-btn",{staticClass:"font-weight-bold rounded-lg",staticStyle:{position:"absolute",top:"20px"},style:{left:"ar"===t.$i18n.locale?0:"",right:"en"===t.$i18n.locale?0:""},attrs:{disabled:!t.products.length,loading:t.removeAllLoading,text:"",color:"#65382c"},on:{click:function(e){return t.emptyCart()}}},[e("v-icon",{staticClass:"mx-2"},[t._v("mdi-cart-off")]),t._v(t._s(t.$vuetify.breakpoint.xs?"":t.$t("cart.remove_all")))],1),t._v(" "),t._l(t.products,(function(o,r){return t.products.length?e("v-card",{key:r,staticClass:"a-product-card d-flex align-center justify-space-betweenm my-1 py-2 px-2",staticStyle:{"border-radius":"10px"},style:{border:1==o.product.has_image&&o.images.length<o.quantity?"2px solid red":""},attrs:{width:"100%",color:"#fff"}},[e("v-card-text",{staticClass:"py-0 px-2 d-flex flex-row justify-space-between",staticStyle:{height:"40px"}},[e("v-row",{staticClass:"align-center justify-space-between h-100",staticStyle:{height:"100%"},attrs:{"no-gutters":""}},[e("v-col",{staticClass:"px-0 my-0 mx-0 py-0 d-flex flex-column justify-space-between h-100",staticStyle:{height:"100%"}},[e("p",{staticClass:"mb-0 font-weight-bold text-left w-100",class:{"text-right":"ar"==t.$i18n.locale},staticStyle:{color:"#65382c"}},[t._v("\n            "+t._s(o.product["name_".concat(t.$i18n.locale)])+"\n          ")]),t._v(" "),e("p",{staticClass:"mb-0 text-left",class:{"text-right":"ar"==t.$i18n.locale},staticStyle:{color:"#65382c"}},[t._v("\n            "+t._s(o.price)+" "+t._s(t.$t("products.KWD"))+"\n          ")])]),t._v(" "),e("div",{staticClass:"d-flex align-center justify-space-between"},[t.hasExtraFlavor(o.product_id)?e("v-btn",{staticClass:"d-block black--text mx-1",attrs:{icon:"",color:"#65382c",small:""},on:{click:function(e){return t.openDialog(o.product_id,"extras_flavors")}}},[e("v-icon",{attrs:{color:"#65382c"}},[t._v("mdi-candy-outline")])],1):t._e(),t._v(" "),1==o.product.has_image?e("v-btn",{staticClass:"d-block black--text mx-1",attrs:{icon:"",color:"#65382c",small:""},on:{click:function(e){return t.openDialog(o,"image")}}},[e("v-icon",{attrs:{color:"#65382c"}},[t._v("mdi-image")])],1):t._e(),t._v(" "),1==o.product.has_note?e("v-btn",{staticClass:"d-block black--text mx-1",attrs:{icon:"",color:"#65382c",small:""},on:{click:function(e){return t.openDialog(o,"note")}}},[e("v-icon",{attrs:{color:"#65382c"}},[t._v("mdi-draw-pen")])],1):t._e()],1),t._v(" "),0==o.product.is_flavor&&0==o.product.is_extra?e("div",{staticClass:"d-flex align-center justify-center"},[e("v-btn",{staticClass:"rounded-sm px-0 py-0 mx-0 my-0",attrs:{loading:t.addToCartLoading,small:"",icon:"",disabled:t.removeAllLoading},on:{click:function(e){return t.changeCount(1,o.product_id,o,o.quantity)}}},[e("v-icon",{staticClass:"mx-0 my-0 rounded",staticStyle:{color:"#65382c"},attrs:{small:""}},[t._v("mdi-plus")])],1),t._v(" "),e("input",{staticClass:"rounded text-center px-0 font-weight-bold",staticStyle:{"text-align":"center",outline:"none",width:"25px",color:"#65382c"},attrs:{type:"text",min:"1",readonly:""},domProps:{value:o.quantity}}),t._v(" "),e("v-btn",{staticClass:"rounded-sm px-0 py-0 mx-0 my-0",attrs:{loading:t.addToCartLoading,small:"",icon:"",disabled:t.removeAllLoading},on:{click:function(e){return t.changeCount(-1,o.product_id,o,o.quantity)}}},[e("v-icon",{staticClass:"mx-0 my-0 rounded",staticStyle:{color:"#65382c"},attrs:{small:""}},[t._v(t._s(1===o.quantity?"mdi-delete":"mdi-minus"))])],1)],1):t._e(),t._v(" "),1==o.product.is_flavor||1==o.product.is_extra?e("div",{directives:[{name:"else",rawName:"v-else"}],staticClass:"d-flex align-center justify-center"},[e("v-btn",{staticClass:"rounded-sm px-0 py-0 mx-0 my-0",attrs:{loading:t.addToCartLoading,small:"",icon:"",disabled:t.removeAllLoading},on:{click:function(e){return t.changeCount(-1,o.product_id,o,o.quantity)}}},[e("v-icon",{staticClass:"mx-0 my-0 rounded",staticStyle:{color:"#65382c"},attrs:{small:""}},[t._v("mdi-delete")])],1)],1):t._e()],1)],1)],1):t._e()})),t._v(" "),t.products.length||t.productsLoading?t._e():e("p",{staticClass:"text-center font-weight-bold text-h6",staticStyle:{height:"100%",color:"#65382c"}},[t._v("\n    "+t._s(t.$t("cart.no_products"))+"\n  ")]),t._v(" "),t.productsLoading&&0==t.products.length?e("v-row",{staticClass:"justify-center flex-wrap",attrs:{"no-gutters":""}},[e("v-progress-circular",{attrs:{size:50,color:"#65382c",indeterminate:""}})],1):t._e(),t._v(" "),e("v-divider",{staticClass:"my-3",staticStyle:{color:"grey"}}),t._v(" "),e("v-col",{staticClass:"mx-0 my-0 pa-0 px-0 d-flex flex-column align-start"},[e("p",{staticClass:"font-weight-bold text-h7 pb-0 mb-0",staticStyle:{color:"#65382c"}},[t._v(t._s(t.$t("checkout.voucher_code")))]),t._v(" "),e("v-text-field",{staticClass:"rounded-lg mt-0 py-2",staticStyle:{width:"100%"},attrs:{"hide-details":"",outlined:"",color:"#65382c",placeholder:t.$t("checkout.enter_voucher")},scopedSlots:t._u([{key:"append",fn:function(){return[e("v-row",{staticClass:"align-center justify-center",staticStyle:{"margin-top":"-7px"},attrs:{"no-gutters":""}},[e("v-btn",{staticClass:"my-auto mx-0 rounded-lg",attrs:{disabled:!t.voucher_code.length||t.removeAllLoading,elevation:"0",text:"",loading:t.loading},on:{click:function(e){return t.applyVoucher()}}},[t._v("\n            "+t._s(t.$t("checkout.apply"))+"\n          ")])],1)]},proxy:!0}]),model:{value:t.voucher_code,callback:function(e){t.voucher_code=e},expression:"voucher_code"}})],1),t._v(" "),e("v-col",{staticClass:"mx-0 my-0 pa-0 px-0"},[e("v-row",{staticClass:"align-center justify-space-between",attrs:{"no-gutters":""}},[e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.$t("profile.orders.subtotal"))+"\n      ")]),t._v(" "),e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.subTotal)+" "+t._s(t.$t("products.KWD"))+"\n      ")])]),t._v(" "),t.newSubTotal?e("v-row",{staticClass:"align-center justify-space-between",attrs:{"no-gutters":""}},[e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.$t("new_sub_total"))+"\n      ")]),t._v(" "),e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.newSubTotal)+" "+t._s(t.$t("products.KWD"))+"\n      ")])]):t._e(),t._v(" "),t.discount?e("v-row",{staticClass:"align-center justify-space-between",attrs:{"no-gutters":""}},[e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.$t("checkout.discount"))+"\n      ")]),t._v(" "),e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.discount)+" "+t._s(t.$t("products.KWD"))+"\n      ")])]):t._e(),t._v(" "),e("v-row",{staticClass:"align-center justify-space-between",attrs:{"no-gutters":""}},[e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.$t("checkout.delivery_cost"))+"\n      ")]),t._v(" "),e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.delivery_cost)+" "+t._s(t.$t("products.KWD"))+"\n      ")])]),t._v(" "),e("v-row",{staticClass:"align-center justify-space-between",attrs:{"no-gutters":""}},[e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.$t("checkout.total"))+"\n      ")]),t._v(" "),e("p",{staticClass:"my-0 mx-0 px-0 py-1 font-weight-bold text-h7",staticStyle:{color:"#65382c"}},[t._v("\n        "+t._s(t.total+t.delivery_cost)+" "+t._s(t.$t("products.KWD"))+"\n      ")])]),t._v(" "),t.products.length&&t.subTotal<t.minimum_charge?e("v-row",{staticClass:"align-center justify-center",attrs:{"no-gutters":""}},[e("p",{staticClass:"text-center font-h6 red--text my-2 red--text font-weight-bold"},[t._v(t._s(t.$t("cart.total_cost"))+" "+t._s(t.minimum_charge)+" "+t._s(t.$t("products.KWD")))])]):t._e(),t._v(" "),e("v-divider",{staticClass:"my-3",staticStyle:{color:"grey"}}),t._v(" "),e("v-row",{staticClass:"mt-3 mb-0 align-center justify-space-around",attrs:{"no-gutters":""}},[e("v-btn",{staticClass:"rounded-lg",attrs:{disabled:t.disable_checkout||0==t.subTotal,elevation:"0",color:"#ecbaa8"},on:{click:function(e){return t.toCheckout()}}},[t._v(t._s(t.$t("cart.pay_now")))]),t._v(" "),e("v-btn",{staticClass:"rounded-lg",staticStyle:{border:"1px solid grey"},attrs:{elevation:"0",text:"",to:t.localePath("/categories")}},[t._v(t._s(t.$t("cart.continue_shopping")))])],1)],1),t._v(" "),e("productImageDialog",{attrs:{value:t.dialog.image_dialog,images:t.dialog.images,"product-id":t.dialog.product_id,count:t.dialog.count,self:!0},on:{close:function(e){t.dialog.image_dialog=!1},updated:function(e){return t.fetch()}}}),t._v(" "),e("productNoteDialog",{attrs:{value:t.dialog.note_dialog,notes:t.dialog.notes,"product-id":t.dialog.product_id,count:t.dialog.count,self:!0},on:{close:function(e){t.dialog.note_dialog=!1},updated:function(e){return t.fetch()}}}),t._v(" "),e("commonFlavorsExtras",{attrs:{dialog:t.dialog.extras_flavors_dialog,items:t.dialog.extras_flavors,loading:t.removeExtraFlavorLoading},on:{close:function(e){t.dialog.extras_flavors_dialog=!1},remove:t.removeExtraFlavor}})],2)}),[],!1,null,null,null);e.default=component.exports}}]);