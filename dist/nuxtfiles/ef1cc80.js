(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{729:function(t,e,o){"use strict";o.d(e,"a",(function(){return r})),o.d(e,"b",(function(){return c}));var n=o(8);function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(arguments.length>1?arguments[1]:void 0)?n.a.get("/guest-apis/products",{params:t}):n.a.get("/customer/products",{params:t})}function c(t){return n.a.get("/products/".concat(t))}},740:function(t,e,o){var content=o(755);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(2).default)("fd371144",content,!0,{sourceMap:!1})},745:function(t,e,o){"use strict";o.d(e,"b",(function(){return r})),o.d(e,"a",(function(){return c}));var n=o(8);function r(){return n.a.get("/wishlist")}function c(t){return n.a.post("/wishlist",{product_id:t})}},753:function(t,e,o){"use strict";o.d(e,"b",(function(){return r})),o.d(e,"a",(function(){return c}));var n=o(8);function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(arguments.length>1?arguments[1]:void 0)?n.a.get("/guest-apis/categories",{params:t}):n.a.get("/customer/categories",{params:t})}function c(data){return n.a.post("/customer/categoryView",data)}},754:function(t,e,o){"use strict";o(740)},755:function(t,e,o){var n=o(1)((function(i){return i[1]}));n.push([t.i,".dropcart.mobile{height:100vh!important}.no-width{font-size:.5rem!important;height:auto!important;min-height:auto!important;min-width:auto!important;padding:.8em!important;width:auto!important}.product_toolbar{background-color:transparent;position:absolute!important;top:0}.product_toolbar .v-toolbar__content{background-color:transparent!important}.product_content__wrapper{background:#fff;border-radius:50px 50px 0 0;height:100%;padding:1.5em 2em 2em;position:relative;top:-60px;width:100%}.product_content__qty_form{background:#f5f5f5;border-radius:10px;height:100px;position:absolute;right:2em;top:-50px;width:40px}[dir=rtl] .product_content__qty_form{left:2em!important;right:auto!important}.product_content__qty_form button.add{background:#65382c!important;color:#fff}.product_content__qty_form button{background:hsla(10,48%,88%,.871);border-radius:10px;color:#fff!important;height:30px;width:100%}.product_content__qty_form_qty{height:40px;line-height:40px;margin:0!important;overflow:hidden;text-align:center;width:100%}.product_content__info_title{padding-right:40px}[dir=rtl] .product_content__info_title{padding-left:40px;padding-right:0!important}.product_content__meta{display:flex;justify-content:space-between}.product_content__meta_price{font-size:1em;font-weight:700}.product_content__meta_price>span{font-size:.8em;font-weight:100}.product_content__actions{bottom:33px;display:block;left:50%;position:fixed;transform:translateX(-50%);width:90%}.white--text{color:#fff!important}",""]),n.locals={},t.exports=n},761:function(t,e,o){"use strict";o.r(e);o(16),o(15),o(25),o(20),o(26);var n=o(60),r=o(7),c=o(5),d=(o(39),o(52),o(32),o(21),o(9),o(34),o(40),o(219)),l=o(727),_=o(22);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var f={components:{CartDialog:d.default},props:{value:{type:Boolean,default:!0},product:{type:Object,default:function(){return{name_en:"",name_ar:"",images:[],price:10}}}},data:function(t){return{qty:1,loading:!1,images:[],notes:[],deleted_images:[],update_notes:[],image_dialog:!1,note_dialog:!1,dialogCart:!!t.$route.query.cart}},watch:{"$route.query":{handler:function(t,e){this.dialogCart=!1,t.cart&&(this.dialogCart=!0)},deep:!0,immediate:!0}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(_.c)("cart",["getItems","total","delivery_fee","count"])),methods:{close:function(){this.$emit("update",!1)},updateQty:function(t){this.qty+=t},reset:function(){this.qty=1,this.images=[],this.deleted_images=[],this.update_notes=[],this.notes=[]},addToCart:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$store.dispatch("cart/add",{product_id:t.product.id,images:t.images.map((function(image){return image.file})),notes:t.notes?t.notes.map((function(t){return t})):[""].concat(Object(n.a)(t.notes.map((function(t){return t})))),quantity:t.qty||1,special_request:""});case 4:t.$toast.success("Item Added to Your Cart successfully"),t.reset(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$toast.error(e.t0.message);case 11:return e.prev=11,t.loading=!1,e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,8,11,14]])})))()},i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},addImage:function(t){this.images=[].concat(Object(n.a)(this.images),[{file:t,id:Object(l.a)(),type:"new"}])},deleteImage:function(t){"new"!==t.type&&this.deleted_images.push(t.id),this.images=this.images.filter((function(img){return img.id!==t.id}))},updateNote:function(t){this.update_notes.includes(t.id)||this.update_notes.push(t.id)},addNote:function(t){this.notes=Object(n.a)(this.notes)},closeCart:function(){try{this.$refs.cart.save()}catch(t){}}}},h=f,v=(o(754),o(6)),component=Object(v.a)(h,(function(){var t=this,e=t._self._c;return t.product?e("v-row",{attrs:{justify:"center"}},[e("v-dialog",{attrs:{value:t.value,fullscreen:"",scrim:!1,transition:"dialog-bottom-transition"},on:{"click:outside":function(e){return t.$emit("update",!1)}}},[e("v-card",[e("v-toolbar",{staticClass:"product_toolbar",staticStyle:{background:"transparent","z-index":"1000",width:"100%"},attrs:{elevation:"0"}},[e("v-row",{staticClass:"d-flex align-center justify-space-between px-5"},[e("v-btn",{staticClass:"no-width",staticStyle:{"z-index":"10000"},attrs:{elevation:"3"},on:{click:function(e){return t.$emit("update",!1)}}},[e("v-icon",{attrs:{small:""}},[t._v(t._s(t.i18n_me("mdi-arrow-right","mdi-arrow-left")))])],1),t._v(" "),e("nuxt-link",{staticClass:"profile fixed-footer-item",attrs:{to:t.localePath(t.$route.query.cart?"":{query:{cart:!0}},t.$i18n.locale)}},[e("v-badge",{attrs:{content:t.count,value:t.count,overlap:"","offset-y":"",color:"#65382c"}},[e("v-icon",{attrs:{color:""}},[t._v("mdi-cart")])],1)],1)],1)],1),t._v(" "),e("v-img",{staticStyle:{background:"#f8f8f8"},attrs:{src:t.product.images&&t.product.images[0]?t.product.images[0].url:"","min-height":"350","max-height":"400"}}),t._v(" "),e("div",{staticClass:"product_content__wrapper"},[e("div",{staticClass:"product_content__qty_form"},[e("button",{staticClass:"add",on:{click:function(e){return t.updateQty(1)}}},[e("v-icon",{attrs:{color:"white"}},[t._v("mdi-plus")])],1),t._v(" "),e("p",{staticClass:"product_content__qty_form_qty"},[t._v(t._s(t.qty))]),t._v(" "),e("button",{attrs:{disabled:1===t.qty},on:{click:function(e){return t.updateQty(-1)}}},[e("v-icon",[t._v("mdi-minus")])],1)]),t._v(" "),e("div",{staticClass:"product_content__info"},[e("h3",{staticClass:"product_content__info_title"},[t._v("\n            "+t._s(t.i18n_me(t.product.name_ar,t.product.name_en))+"\n          ")]),t._v(" "),e("div",{staticClass:"product_content__meta"},[e("p",{staticClass:"product_content__meta_category"},[t._v("\n              "+t._s(t.product.categories&&t.product.categories[0]?t.i18n_me(t.product.categories[0].name_ar,t.product.categories[0].name_en):"")+"\n            ")]),t._v(" "),e("p",{staticClass:"product_content__meta_price"},[t._v("\n              "+t._s(t.product.price)+" "),e("span",[t._v(t._s(t.i18n_me("دينار","KWD")))])])]),t._v(" "),e("div",{staticClass:"product_content__info_description"},[t._v("\n            "+t._s(t.i18n_me(t.product.description_ar,t.product.description_en))+"\n          ")])]),t._v(" "),t.product.has_image&&(t.images.length!==t.qty||t.images.length>10*t.qty)?e("div",{staticStyle:{color:"red","text-align":"center"}},[t.product.has_image&&t.images.length>10*t.qty?e("span",[t._v(t._s(t.$t("cart.please_upload_less",{number:t.images.length-10*t.qty})))]):t._e(),t._v(" "),t.product.has_image&&t.images.length<t.qty?e("span",[t._v(t._s(t.$t("cart.please_upload_more",{number:t.qty-t.images.length})))]):t._e()]):t._e(),t._v(" "),e("div",{staticClass:"product_content__actions"},[t.product.has_image?e("v-btn",{staticClass:"white--text mb-3",attrs:{block:"",elevation:"1",rounded:"",color:"#000"},on:{click:function(e){t.image_dialog=!t.image_dialog}}},[t._v(t._s(t.$t("products.upload_image"))+"\n            "),e("v-icon",[t._v("mdi mdi-upload")])],1):t._e(),t._v(" "),t.product.has_note?e("v-btn",{staticClass:"white--text mb-3",attrs:{block:"",elevation:"1",rounded:"",color:"#000"},on:{click:function(e){t.note_dialog=!t.note_dialog}}},[t._v(t._s(t.$t("products.add_note"))+"\n            "),e("v-icon",[t._v("mdi mdi-upload")])],1):t._e(),t._v(" "),e("v-btn",{staticClass:"white--text",attrs:{disabled:1===t.product.has_image&&(t.images.length<t.qty||t.images.length>10*t.qty),loading:t.loading,block:"",elevation:"1",rounded:"",color:"#65382c"},on:{click:t.addToCart}},[t._v(t._s(t.$t("products.product.add_to_cart")))])],1)])],1),t._v(" "),e("productImageDialog",{attrs:{value:t.image_dialog,images:t.images,count:t.qty,productId:t.product.id},on:{close:function(e){t.image_dialog=!1},"add-image":function(e){return t.addImage(e)},"delete-image":function(e){return t.deleteImage(e)}}}),t._v(" "),e("productNoteDialog",{attrs:{value:t.note_dialog,notes:t.notes,count:t.qty},on:{close:function(e){t.note_dialog=!1},"add-note":function(e){return t.addNote(e)},"update-notes":function(e){return t.updateNote(e)}}})],1),t._v(" "),e("CartDialog",{model:{value:t.dialogCart,callback:function(e){t.dialogCart=e},expression:"dialogCart"}})],1):t._e()}),[],!1,null,null,null);e.default=component.exports},772:function(t,e,o){var content=o(833);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(2).default)("958bc59c",content,!0,{sourceMap:!1})},832:function(t,e,o){"use strict";o(772)},833:function(t,e,o){var n=o(1)((function(i){return i[1]}));n.push([t.i,".categories_mobile .slick-slider{overflow:hidden!important}.category-slider-wrapper{height:100%}.category-slider-wrapper--active .category-slider{background-color:#65382c;color:#fff}.print-popup{bottom:0;left:0;position:fixed;right:0;top:0}.category-slider{align-items:center;border-radius:12px;box-sizing:border-box;cursor:pointer;display:inline-flex!important;flex-direction:column!important;height:92px!important;padding:.5em 0;text-align:center;width:100%}.category-slider-image{background:#65382c;border-radius:20px}.category-slider-text{font-size:.75rem;font-weight:700;margin-top:.5em;padding:0 5px;position:relative}.slick-next:before,.slick-prev:before{color:#65382c!important}.print-popup-body{background-color:#fff;border-radius:15px!important;max-width:100%;padding:40px 20px 20px;position:relative;width:900px!important}.print-popup-body .the-title{display:block;text-align:center}.print-popup-body .close-or-back{cursor:pointer;font-size:20px;left:15px;position:absolute;top:15px}.print-popup-body .close-or-back i{font-size:40px!important}.print-popup-body .popup-content .strip-one{margin-bottom:60px;text-align:center}.print-popup-body .popup-content .strip-one .title{color:#65382c;font-size:40px!important;font-weight:700}.print-popup-body .popup-content .strip-one .cake_type{max-width:200px!important;width:200px!important}.print-popup-body .popup-content .strip-one .cake_type .v-text-field__details{display:none}.print-popup-body .popup-content .strip-one .cake_type .v-input__slot{margin-bottom:0}.print-popup-body .popup-content .strip-two .cat-shape-container{border:2px solid transparent;border-radius:15px;cursor:pointer;height:183px;margin:auto;overflow:hidden;padding:5px;transition:.3s;width:183px}.print-popup-body .popup-content .strip-two .cat-shape-container:first-child img{border-radius:15px}.print-popup-body .popup-content .strip-two .cat-shape-container.active,.print-popup-body .popup-content .strip-two .cat-shape-container:hover{background-color:hsla(22,48%,64%,.302);border-color:#65382c}.print-popup-body .popup-content .strip-two .title{color:#65382c;font-size:30px!important;font-weight:700}.print-popup-body .popup-content .strip-two .cake_row{border-bottom:1px solid #d3d3d3}.print-popup-body .popup-content .strip-two .cake_image{border-radius:15px}.print-popup-body .popup-content .strip-two .cake_size label{color:#65382c;font-size:18px;font-weight:700}.print-popup-body .popup-content .strip-two .cat-shape{height:170px;margin:auto;overflow:hidden;width:170px}.print-popup-body .popup-content .strip-two .cat-shape.second{border-radius:100%}.print-popup-body .popup-content .strip-two .cat-shape img{width:100%}.print-popup-body .popup-content .strip-three{margin-top:40px;text-align:center}.print-popup-body .popup-content .strip-three .title{color:#65382c;font-size:30px!important;font-weight:700}.print-popup-body .popup-content .strip-three .cake_color{border:4px solid #d3d3d3;border-radius:15px;cursor:pointer;height:75px;overflow:hidden;transition:.3s;width:75px}.print-popup-body .popup-content .strip-three .cake_color.active,.print-popup-body .popup-content .strip-three .cake_color:hover{background-color:hsla(22,48%,64%,.302);border-color:#65382c}",""]),n.locals={},t.exports=n},869:function(t,e,o){"use strict";o.r(e);o(34),o(40),o(16),o(126),o(29),o(63),o(825);var n=o(7),r=o(60),c=(o(39),o(52),o(324),o(9),o(20),o(330),o(162),o(32),o(21),o(827)),d=o.n(c),l=(o(828),o(830),o(729)),_=o(745),m=o(727),f=(o(753),{props:{categories:{type:Array,default:[]},value:{type:Array,default:[]}},data:function(t){return{settings:{rtl:"ar"===t.$i18n.locale,arrows:!t.$vuetify.breakpoint.mobile,dots:!1,focusOnSelect:!0,infinite:!1,speed:500,slidesToShow:t.$vuetify.breakpoint.mobile?3:6,slidesToScroll:2,touchThreshold:5},form:{cake_type:"",cake_shape:"",cake_size:"",cake_color:""},loading:!1,printCakePopUpOpened:!1,activePopup:0,selectedType:12,selectedCategoryItems:[],selectedCategoryCriteria:{},dialog:!1,image_dialog:!1,note_dialog:!1,images:[],notes:[],deleted_images:[],update_notes:[],product:{},addToCartLoading:!1,count:1,special_request:"",showAlert:!1,id:""}},components:{VueSlickCarousel:d.a},methods:{categoryViewed:function(t){},getCategory:function(){var t=this;this.loading=!0,Object(l.a)({category:this.selectedType,branch_id:this.$auth.loggedIn?"":localStorage.getItem("guest_branch")},!this.$auth.loggedIn).then((function(e){if(t.selectedCategoryItems=e.data,!e.data.length)return t.$toast.error(t.$t("products.not_found")),void(t.loading=!1);var o=e.data.map((function(t){return t.name_en.trim().split("-").map((function(t){return t}))})),n={};o.forEach((function(element){element.length>2?(t.form.cake_shape=element[1],Object.keys(n).includes(element[0])||(n[element[0]]={sizes:{}}),Object.keys(n[element[0]].sizes).includes(element[2])||(n[element[0]].sizes[element[2]]={colors:[]}),n[element[0]].sizes[element[2]].colors.includes(element[3])||n[element[0]].sizes[element[2]].colors.push(element[3])):(t.form.cake_shape=element[0],Object.keys(n).includes(element[0])||(n[element[0]]={colors:[]}),n[element[0]].colors.includes(element[1])||n[element[0]].colors.push(element[1]))})),t.resetFields(),t.loading=!1,t.selectedCategoryCriteria=n,t.activePopup=1,t.form.cake_type=Object.keys(t.selectedCategoryCriteria)[0]})).catch((function(e){t.loading=!1}))},handleCloseBack:function(){0==this.activePopup?this.printCakePopUpOpened=!1:(this.activePopup=0,this.form.cake_shape="",this.resetFields())},openPrintCake:function(t){this.printCakePopUpOpened=!0,this.activePopup=0,this.categoryViewed(t)},update:function(t){this.categoryViewed(t.id),this.value.includes(t.id)?this.$emit("input",[]):this.$emit("input",[t.id])},i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},pickColor:function(t){this.form.cake_color=t},resetFields:function(){this.form.cake_size="",this.form.cake_color=""},saveCake:function(){var t="",e="",o={};this.form.cake_type!==this.form.cake_size&&this.form.cake_size!==this.form.cake_shape?(t=Object.values(this.form).join("-"),e=Object.values(this.selectedCategoryItems).findIndex((function(e){return e.name_en.trim()==t})),o=Object.values(this.selectedCategoryItems)[e]):(t=this.form.cake_shape+"-"+this.form.cake_color,e=Object.values(this.selectedCategoryItems).findIndex((function(e){return e.name_en.trim()==t})),o=Object.values(this.selectedCategoryItems)[e]),this.product=o,this.id=this.product.id,this.dialog=!0,this.printCakePopUpOpened=!1},addImage:function(t){this.images=[].concat(Object(r.a)(this.images),[{file:t,id:Object(m.a)(),type:"new"}])},addNote:function(t){this.notes=Object(r.a)(this.notes)},deleteImage:function(t){"new"!==t.type&&this.deleted_images.push(t.id),this.images=this.images.filter((function(img){return img.id!==t.id}))},updateNote:function(t){this.update_notes.includes(t.id)||this.update_notes.push(t.id)},changeCount:function(t){this.count=this.count+t},handleClickCartIcon:function(t){var data=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.has_image||t.has_note?this.dialog=!0:this.addToCart(t,data)},addToCartDialog:function(t,data){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:e.addToCart(t,data).then((function(){e.dialog=!1,e.image_dialog=!1,e.note_dialog=!1,e.images=[],e.notes=[],e.count=1,e.special_request=""}));case 1:case"end":return o.stop()}}),o)})))()},addToCart:function(t){var e=arguments,o=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var r,data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return data=e.length>1&&void 0!==e[1]?e[1]:{},o.addToCartLoading=!0,o.$toast.success("Item Added to Your Cart successfully"),n.next=5,o.$store.dispatch("cart/add",{product_id:t.id,mediaUrl:null===(r=t.images[0])||void 0===r?void 0:r.url,quantity:data.count||1,images:o.images.map((function(image){return image.file})),notes:o.notes.map((function(t){return t})),special_request:data.special_request||""});case 5:o.addToCartLoading=!1;case 6:case"end":return n.stop()}}),n)})))()},addToWishList:function(){Object(_.a)(this.product.id),this.$toast.success("Added To WishList")}}}),h=f,v=(o(832),o(6)),component=Object(v.a)(h,(function(){var t=this,e=this,o=e._self._c;return o("div",{class:e.$vuetify.breakpoint.mobile?"categories_mobile":""},[o("VueSlickCarousel",e._b({},"VueSlickCarousel",e.settings,!1),e._l(e.categories,(function(t){return o("div",{key:t.id,class:"category-slider-wrapper ".concat(e.value.includes(t.id)?"category-slider-wrapper--active":""),on:{click:function(o){"Photo Print Cake"===t.name_en?e.openPrintCake(t.id):e.update(t)}}},[o("div",{staticClass:"category-slider"},[o("v-img",{staticClass:"category-slider-image",attrs:{width:"60",height:"60",src:t.image}}),e._v(" "),o("span",{staticClass:"category-slider-text"},[e._v(e._s(e.i18n_me(t.name_ar,t.name_en)))])],1)])})),0),e._v(" "),o("v-dialog",{attrs:{transition:"dialog-bottom-transition",width:"auto","retain-focus":!1},model:{value:e.printCakePopUpOpened,callback:function(t){e.printCakePopUpOpened=t},expression:"printCakePopUpOpened"}},[o("div",{staticClass:"print-popup-body"},[o("div",{staticClass:"close-or-back",on:{click:e.handleCloseBack}},[1===e.activePopup?o("v-icon",[e._v("mdi-keyboard-backspace")]):e._e(),e._v(" "),0===e.activePopup?o("v-icon",[e._v("mdi-window-close")]):e._e()],1),e._v(" "),0===e.activePopup?o("div",{staticClass:"popup-content"},[o("div",{staticClass:"strip-one"},[o("span",{staticClass:"title"},[e._v(" "+e._s(e.$t("products.how_it_looks")))])]),e._v(" "),o("div",{staticClass:"strip-two"},[o("v-row",[o("v-col",{staticClass:"d-flex"},[o("div",{staticClass:"cat-shape-container",class:{active:19===e.selectedType},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.selectedType=19}}},[o("div",{staticClass:"cat-shape"},[o("img",{attrs:{contain:"",src:"/images/rect.jpg"}})])])]),e._v(" "),o("v-col",{staticClass:"d-flex"},[o("div",{staticClass:"cat-shape-container",class:{active:20===e.selectedType},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.selectedType=20}}},[o("div",{staticClass:"cat-shape second"},[o("img",{attrs:{contain:"",src:"/images/rnd.jpg"}})])])]),e._v(" "),o("v-col",{staticClass:"d-flex"},[o("div",{staticClass:"cat-shape-container",class:{active:21===e.selectedType},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.selectedType=21}}},[o("div",{staticClass:"cat-shape last"},[o("img",{attrs:{contain:"",src:"/images/tuxpi.com.1689444014-removebg-preview.png"}})])])])],1)],1),e._v(" "),o("div",{staticClass:"strip-three"},[o("v-btn",{style:{backgroundColor:"#65382c",color:"white",fontSize:"20px",fontWeight:"bold",width:"120px",height:"40px"},attrs:{loading:e.loading},on:{click:e.getCategory}},[e._v("\n              "+e._s(e.$t("products.next")))])],1)]):e._e(),e._v(" "),1===e.activePopup?o("div",{staticClass:"popup-content"},[o("div",{staticClass:"strip-one d-flex",class:e.$vuetify.breakpoint.smAndDown?"justify-center flex-column align-center":"justify-center align-center"},[o("span",{staticClass:"title",class:e.$vuetify.breakpoint.smAndDown?"mt-4":"mx-7"},[e._v("\n              "+e._s(e.$t("products.how_it_looks")))]),e._v(" "),o("div",{staticClass:"cake_type",class:e.$vuetify.breakpoint.smAndDown?"mt-10":"mx-5"},[o("v-combobox",{attrs:{label:e.$t("products.cake_type"),outlined:"",items:Object.keys(e.selectedCategoryCriteria)},on:{change:e.resetFields},model:{value:e.form.cake_type,callback:function(t){e.$set(e.form,"cake_type",t)},expression:"form.cake_type"}})],1)]),e._v(" "),o("div",{staticClass:"strip-two px-4"},[o("span",{staticClass:"title px-3"},[e._v(" "+e._s(e.$t("products.choose_size")))]),e._v(" "),Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("sizes")?o("v-col",e._l(e.selectedCategoryCriteria[e.form.cake_type].sizes,(function(t,n){return o("v-row",{key:n},[o("v-row",{staticClass:"d-flex justify-space-between px-5 py-3 mt-3 cake_row align-center"},[o("div",[o("v-radio-group",{model:{value:e.form.cake_size,callback:function(t){e.$set(e.form,"cake_size",t)},expression:"form.cake_size"}},[Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes).length&&"undefined"!==n?o("v-radio",{staticClass:"cake_size",attrs:{color:"#65382c",value:n,label:n}}):o("v-radio",{staticClass:"cake_size",attrs:{color:"#65382c",value:e.form.cake_type,label:e.form.cake_type}})],1)],1),e._v(" "),o("img",{staticClass:"cake_image",attrs:{contain:"",src:"/images/"+e.form.cake_shape.split(" ").join("_").toLowerCase()+".jpg",width:"80px"}})])],1)})),1):e._e(),e._v(" "),Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("colors")?o("v-col",e._l(e.selectedCategoryCriteria,(function(t,n){return o("v-row",{key:n},[o("v-row",{staticClass:"d-flex justify-space-between px-5 py-3 mt-3 cake_row align-center"},[o("div",[o("v-radio-group",{model:{value:e.form.cake_size,callback:function(t){e.$set(e.form,"cake_size",t)},expression:"form.cake_size"}},[o("v-radio",{staticClass:"cake_size",attrs:{color:"#65382c",value:e.form.cake_type,label:e.form.cake_type}})],1)],1),e._v(" "),o("img",{staticClass:"cake_image",attrs:{contain:"",src:"/images/"+e.form.cake_shape.split(" ").join("_").toLowerCase()+".jpg",width:"80px"}})])],1)})),1):e._e()],1),e._v(" "),o("div",{staticClass:"strip-three"},[Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("sizes")?o("v-card",[e.form.cake_size.length&&0!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes).length&&"undefined"!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes)[0]?o("v-card-title",[o("span",{staticClass:"title px-3"},[e._v("\n                  "+e._s(e.$t("products.choose_color")))])]):e._e(),e._v(" "),o("v-col",[e.form.cake_size.length&&0!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes).length&&"undefined"!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes)[0]?o("v-row",{staticClass:"my-5"},[o("v-row",{staticClass:"d-flex justify-space-around align-center"},e._l(e.selectedCategoryCriteria[e.form.cake_type].sizes[e.form.cake_size].colors,(function(t){return o("div",{key:t,staticClass:"cake_color",class:e.form.cake_color===t?"active":"",style:{backgroundColor:"offwhite"==t.toLowerCase().replaceAll(/\s/g,"")?"#f9f1f1":t},on:{click:function(o){return e.pickColor(t)}}})})),0)],1):e._e(),e._v(" "),o("v-btn",{staticClass:"mt-7",style:{backgroundColor:"#65382c",color:"white",fontSize:"20px",fontWeight:"bold",width:"120px",height:"40px"},attrs:{disabled:!e.form.cake_color.length&&0!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes).length&&"undefined"!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes)[0]||!e.form.cake_size.length},on:{click:e.saveCake}},[e._v("\n                  "+e._s(e.$t("products.save")))])],1)],1):e._e(),e._v(" "),Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("colors")?o("v-card",[e.form.cake_size.length?o("v-card-title",[o("span",{staticClass:"title px-3"},[e._v("\n                  "+e._s(e.$t("products.choose_color")))])]):e._e(),e._v(" "),o("v-col",[e.form.cake_size.length?o("v-row",{staticClass:"my-5"},[o("v-row",{staticClass:"d-flex justify-space-around align-center"},e._l(e.selectedCategoryCriteria[e.form.cake_type].colors,(function(t){return o("div",{key:t,staticClass:"cake_color",class:e.form.cake_color===t?"active":"",style:{backgroundColor:"offwhite"==t.toLowerCase().replaceAll(/\s/g,"")?"#f9f1f1":t},on:{click:function(o){return e.pickColor(t)}}})})),0)],1):e._e(),e._v(" "),Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("sizes")?o("v-btn",{staticClass:"mt-7",style:{backgroundColor:"#65382c",color:"white",fontSize:"20px",fontWeight:"bold",width:"120px",height:"40px"},attrs:{disabled:!e.form.cake_color.length&&0!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes).length&&"undefined"!==Object.keys(e.selectedCategoryCriteria[e.form.cake_type].sizes)[0]||!e.form.cake_size.length},on:{click:e.saveCake}},[e._v("\n                  "+e._s(e.$t("products.save")))]):e._e(),e._v(" "),Object.keys(e.selectedCategoryCriteria[e.form.cake_type]).includes("colors")?o("v-btn",{staticClass:"mt-7",style:{backgroundColor:"#65382c",color:"white",fontSize:"20px",fontWeight:"bold",width:"120px",height:"40px"},attrs:{disabled:!e.form.cake_color.length},on:{click:e.saveCake}},[e._v("\n                  "+e._s(e.$t("products.save")))]):e._e()],1)],1):e._e()],1)]):e._e()])]),e._v(" "),Object.keys(e.product).length&&!e.$vuetify.breakpoint.mobile?o("v-dialog",{attrs:{"max-width":"750"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",{class:"d-flex flex-column overflow-hidden px-5 py-7 product-dialog\n                   ".concat(e.$vuetify.breakpoint.mobile?"mobile-dialog":"","\n                  "),attrs:{elevation:"0",outlined:"",rounded:"md"}},[o("div",{staticClass:"d-flex meta"},[o("img",{attrs:{height:"72",width:"70",src:e.product.images[0]?e.product.images[0].url:"",alt:""}}),e._v(" "),o("div",{class:"flex-grow-1 ".concat("en"===e.$i18n.locale?"pl-5":"pr-5")},[o("div",{class:"\n                        ".concat(e.$vuetify.breakpoint.mobile?"text-subtitle-2":"text-subtitle-1","\n                           text-decoration-none\n                          font-weight-bold font-primary\n                          bg-transparent\n                          px-0\n                        "),attrs:{elevation:"0"}},[e._v("\n              "+e._s(e.i18n_me(e.product.name_ar,e.product.name_en))+"\n            ")]),e._v(" "),o("div",[o("small",{staticClass:"desc"},[e._v(e._s(e.i18n_me(e.product.description_ar,e.product.description_en)))])]),e._v(" "),o("div",{staticClass:"mt-5"},e._l(e.product.categories,(function(t,n){return o("span",{key:t.id,staticClass:"text-body-1 font-primary font-weight-bold"},[e._v("\n                "+e._s(e.i18n_me(t.name_ar,t.name_en))+"\n                "),n!==e.product.categories.length-1?o("span",[e._v(", ")]):e._e()])})),0)]),e._v(" "),o("div",[o("div",{staticClass:"actions-wrapper"},[o("div",[o("div",{class:"row flex-nowrap justify-".concat(e.i18n_me("start","end")," align-center\n")},[o("v-btn",{staticClass:"font-primary",attrs:{disabled:e.count<=1,icon:""},on:{click:function(t){return e.changeCount(-1)}}},[o("v-icon",[e._v("mdi-minus")])],1),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.count,expression:"count"}],staticClass:"count_input font-primary",domProps:{value:e.count},on:{input:function(t){t.target.composing||(e.count=t.target.value)}}}),e._v(" "),o("v-btn",{staticClass:"font-primary",attrs:{icon:""},on:{click:function(t){return e.changeCount(1)}}},[o("v-icon",[e._v("mdi-plus")])],1)],1)]),e._v(" "),o("div",{staticClass:"font-weight-bold font-primary"},[e._v("\n                "+e._s(e.product.price)+" KWD\n              ")])])])]),e._v(" "),e.product.has_image&&(e.images.length<e.count||e.images.length>10*e.count)?o("div",{staticStyle:{color:"red","text-align":"center"}},[e.product.has_image&&e.images.length>10*e.count?o("span",[e._v(e._s(e.$t("cart.please_upload_less",{number:e.images.length-10*e.count})))]):e._e(),e._v(" "),e.product.has_image&&e.images.length<e.count?o("span",[e._v(e._s(e.$t("cart.please_upload_more",{number:e.count-e.images.length})))]):e._e()]):e._e(),e._v(" "),o("div",{class:"row mt-4 ".concat(1!=e.product.has_image||1!=e.product.has_note?"justify-center align-center":"justify-space-between")},[1==e.product.has_note?o("v-btn",{staticClass:"col-5 text--white white--text",attrs:{loading:e.addToCartLoading,disabled:e.addToCartLoading,color:"black",elevation:"0",rounded:""},on:{click:function(t){e.note_dialog=!0}}},[e._v("\n            "+e._s(e.$t("products.add_note"))+"\n          ")]):e._e(),e._v(" "),1==e.product.has_image?o("v-btn",{staticClass:"ml-5 col-5 text--white white--text",attrs:{loading:e.addToCartLoading,disabled:e.addToCartLoading,color:"black",elevation:"0",rounded:""},on:{click:function(t){e.image_dialog=!0}}},[e._v("\n            "+e._s(e.$t("products.upload_image"))+"\n          ")]):e._e(),e._v(" "),o("v-btn",{class:1==e.product.has_note&&1==e.product.has_image?"mt-3 col-5 Newprimary":"ml-8 col-5 Newprimary",attrs:{disabled:e.product.has_image&&(e.images.length<e.count||e.images.length>10*e.count)||e.addToCartLoading,loading:e.addToCartLoading,elevation:"0",rounded:"",block:1==e.product.has_note&&1==e.product.has_image},on:{click:function(t){return e.addToCartDialog(e.product,{count:e.count,special_request:e.special_request})}}},[e._v("\n            "+e._s(e.$t("products.product.add_to_cart"))+"\n          ")])],1)])],1):e._e(),e._v(" "),Object.keys(e.product).length&&e.$vuetify.breakpoint.mobile?o("MobileProductDialog",{attrs:{product:e.product},on:{update:function(e){return t.dialog=e}},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}}):e._e(),e._v(" "),e.$vuetify.breakpoint.mobile?e._e():o("productImageDialog",{attrs:{value:e.image_dialog,images:e.images,count:e.count,productId:e.id},on:{close:function(t){e.image_dialog=!1},"add-image":function(t){return e.addImage(t)},"delete-image":function(t){return e.deleteImage(t)}}}),e._v(" "),e.$vuetify.breakpoint.mobile?e._e():o("productNoteDialog",{attrs:{value:e.note_dialog,notes:e.notes,count:e.count},on:{close:function(t){e.note_dialog=!1},"add-note":function(t){return e.addNote(t)},"update-notes":function(t){return e.updateNote(t)}}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MobileProductDialog:o(761).default})}}]);