(window.webpackJsonp=window.webpackJsonp||[]).push([[59,41],{804:function(t,e,n){var content=n(867);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(2).default)("7de34068",content,!0,{sourceMap:!1})},816:function(t,e,n){"use strict";n.r(e);n(29);var o=n(6),r=n(60),c=(n(9),n(16),n(15),n(22),n(25),n(21),n(26),n(5));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=n(212);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={props:{product:{type:Object}},data:function(){return{loading:!1,reviews:Object(r.a)(this.product.reviews),form:{body:"",rate:null}}},methods:{submit:function(){var t,data,e=this;(this.$v.$touch(),this.$v.$invalid)||(this.loading=!0,(t=this.product.id,data=this.form,c.a.post("products/".concat(t,"/review"),d(d({},data),{},{product_id:t}))).then((function(){e.$toast.success("Review Submitted"),e.reviews.push(_(_({},e.form),{},{user:e.$auth.user}))})).finally((function(){e.loading=!1})))}},validations:function(){return{form:{body:{required:v.helpers.withParams({lang:this.$i18n.locale},v.required)},rate:{required:v.helpers.withParams({lang:this.$i18n.locale},v.required)}}}}},h=n(8),component=Object(h.a)(m,(function(){var t=this,e=t._self._c;return e("v-card",{staticClass:"mt-13"},[e("v-card-title",[t._v("Reviews ")]),t._v(" "),e("v-list",{attrs:{"three-line":""}},[t._l(t.reviews,(function(n,o){return[e("v-list-item",{key:o},[e("v-list-item-avatar"),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{staticClass:"d-flex"},[e("p",{staticClass:"mr-5"},[t._v(t._s(n.user.name))]),t._v(" "),e("v-rating",{attrs:{color:"yellow darken-3",length:"5",size:"17",readonly:"",value:n.rate}})],1),t._v(" "),e("v-list-item-subtitle",[t._v("\n            "+t._s(n.body)+"\n          ")])],1)],1)]}))],2),t._v(" "),t.$auth.loggedIn?e("div",[e("v-textarea",{attrs:{placeholder:"Write Your Review",outlined:"",dense:"",solo:"",flat:"","error-messages":t.$validationMsgs(t.$v.form.body)},on:{input:function(e){return t.$v.form.body.$touch()}},model:{value:t.form.body,callback:function(e){t.$set(t.form,"body",e)},expression:"form.body"}}),t._v(" "),e("v-rating",{attrs:{color:"yellow darken-3",length:"5",size:"28","error-messages":t.$validationMsgs(t.$v.form.rate)},on:{input:function(e){return t.$v.form.rate.$touch()}},model:{value:t.form.rate,callback:function(e){t.$set(t.form,"rate",e)},expression:"form.rate"}}),t._v(" "),e("v-btn",{staticClass:"rounded-lg mt-5",attrs:{color:"primary",elevation:"0",loading:t.loading},on:{click:t.submit}},[t._v("Review")])],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports},822:function(t,e,n){"use strict";n.r(e);var o=n(750),r=n(220),c=n.n(r),l=(n(737),{components:{Product:o.default,VueSlickCarousel:c.a},props:{title:{type:String}},data:function(){return{products:[],loading:!1,settings:{dots:!1,arrows:!1,slidesToShow:4,slidesToScroll:4,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1}}]}}},methods:{next:function(){this.$refs.carousel.next()},prev:function(){this.$refs.carousel.prev()}},created:function(){}}),d=n(8),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"py-5"},[e("div",{staticClass:"d-flex align-center justify-space-between"},[e("p",{staticClass:"text-h5 font-weight-bold"},[t._v(t._s(t.title))]),t._v(" "),e("div",[e("v-btn",{attrs:{small:"",icon:"",fab:"",color:"primary"},on:{click:t.prev}},[e("v-icon",[t._v("mdi-chevron-"+t._s("en"===t.$i18n.locale?"left":"right")+"\n        ")])],1),t._v(" "),e("v-btn",{attrs:{small:"",icon:"",outlined:"",color:"primary"},on:{click:t.next}},[e("v-icon",[t._v("mdi-chevron-"+t._s("en"===t.$i18n.locale?"right":"left"))])],1)],1)]),t._v(" "),t.loading&&!t.$vuetify.breakpoint.mobile?e("v-row",t._l(4,(function(i){return e("v-col",{key:i,attrs:{cols:"3"}},[e("v-sheet",{attrs:{outlined:"",rounded:"lg"}},[e("v-skeleton-loader",{staticClass:"mx-auto",attrs:{"max-width":"300",type:"card"}})],1)],1)})),1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports},866:function(t,e,n){"use strict";n(804)},867:function(t,e,n){var o=n(1)((function(i){return i[1]}));o.push([t.i,'.quantity-input.number-input{background-color:#fff;border-radius:5px;padding:.5rem 2rem}.quantity-input.number-input .number-input__input{border:none!important;color:#141414;font-weight:700}.quantity-input.number-input .number-input__button--minus{border-right:none!important}.quantity-input.number-input .number-input__button--plus:before{content:"\\F0142"!important}.quantity-input.number-input .number-input__button--minus:before,.quantity-input.number-input .number-input__button--plus:before{background:none!important;font:normal normal normal 24px/1 "Material Design Icons";font-size:2rem;height:auto!important;width:auto!important}.quantity-input.number-input .number-input__button--minus:before{content:"\\F0141"!important}.quantity-input.number-input .number-input__button--plus:after{background:none!important}.quantity-input.number-input .number-input__button--plus{border-left:none!important}.quantity-input:before{color:#aba3a3;content:"Quantity";display:block;font-size:.7rem;font-weight:700;height:10px;margin-bottom:4px;text-align:center}.product-header{background:#fff;padding:20px 0;position:sticky;top:75px;z-index:9}.product-info-accordion .v-expansion-panel:before{box-shadow:none!important;margin-bottom:30px}.product-info-accordion .v-expansion-panel-header{background:#757575;border-radius:10px;color:#fff;font-size:18px;font-weight:600;margin-bottom:6px;transition:all .3s ease-in-out}.product-info-accordion .v-expansion-panel-content{padding:15px 0}.product-info-accordion .v-expansion-panel-header.v-expansion-panel-header--active,.product-info-accordion .v-expansion-panel-header:hover{background:#000}.product-info-accordion .v-expansion-panel--active>.v-expansion-panel-header{min-height:0;min-height:auto}.product-info-accordion .v-expansion-panel-header__icon i:before{color:#fff;content:"\\F0415"}.product-info-accordion .v-expansion-panel-header.v-expansion-panel-header--active .v-expansion-panel-header__icon i:before{content:"\\F0374"}',""]),o.locals={},t.exports=o},918:function(t,e,n){"use strict";n.r(e);n(29);var o=n(7),r=(n(40),n(22),n(9),n(32),n(737)),c=n(780),l=n(781),d=n(782),v=n(822),f=n(865),_={components:{ColorSelect:c.default,ConditionSelect:l.default,SizeSelect:d.default,CategoryProducts:v.default},head:function(){return{title:this.product.name_en+" - "+this.selected_variant.vendor.name}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params,e.next=3,Object(r.b)(n.slug);case 3:return o=e.sent.data,e.abrupt("return",{product:o,selected_variant:o.featured_variant,selectedOptions:{size:o.featured_variant.size,color:o.featured_variant.color,condition:o.featured_variant.condition},otherVariantListings:[],activeProductTab:0,activeMedia:0,infoActive:0,addToCartLoading:!1,quantity:1});case 5:case"end":return e.stop()}}),e)})))()},watch:{selectedOptions:{handler:function(){var t=this.selectedOptions,e=t.size,n=t.color,o=t.condition,r=this.product.variants.filter((function(t){return t.size==e&&t.color==n&&t.condition==o})),c=(r=Object(f.sortBy)(r,"price")).shift();this.otherVariantListings=r,c.vendor.id!=this.selected_variant.vendor.id&&history.pushState({},null,"/".concat(c.vendor.slug,"/").concat(c.vendor.id,"/").concat(this.product.slug)),this.selected_variant=c},deep:!0}},methods:{addToCart:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 4:t.addToCartLoading=!1;case 5:case"end":return e.stop()}}),e)})))()},openAccordion:function(t){this.infoActive=t,this.$vuetify.goTo(".product-info-accordion",{offset:120})},changeVendor:function(t){history.pushState({},null,"/".concat(t.vendor.slug,"/").concat(t.vendor.id,"/").concat(this.product.slug)),this.selected_variant=t}}},m=(n(866),n(8)),component=Object(m.a)(_,(function(){var t=this,e=t._self._c;return e("div",[e("v-row",[e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:9}},[e("div",{staticClass:"product-header"},[e("h2",{staticClass:"black--text text-uppercase"},[t._v("\n          "+t._s(t.product.name_en)+"\n        ")]),t._v(" "),e("div",{staticClass:"d-flex text-subtitle-2"},[t._v("\n          Sold By\n          "),e("nuxt-link",{staticClass:"ml-2",attrs:{to:"/"}},[t._v(t._s(t.selected_variant.vendor.name))])],1),t._v(" "),e("div",{staticClass:"d-none d-lg-flex my-5"},[e("div",{staticClass:"d-flex align-center"},[e("v-rating",{attrs:{color:"yellow darken-3",readonly:"",length:"5",size:"25",value:t.product.review_rate}}),t._v(" "),e("p",{staticClass:"mb-0 text-subtitle-2"},[t._v("5 reviews")])],1),t._v(" "),e("v-divider",{staticClass:"mx-3",attrs:{vertical:""}}),t._v(" "),e("a",{staticClass:"text-decoration-none blue--text text--darken-3",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.openAccordion(0)}}},[t._v("Description")]),t._v(" "),e("v-divider",{staticClass:"mx-3",attrs:{vertical:""}}),t._v(" "),e("a",{staticClass:"text-decoration-none blue--text text--darken-3",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.openAccordion(1)}}},[t._v("Ingredients")]),t._v(" "),e("v-divider",{staticClass:"mx-3",attrs:{vertical:""}}),t._v(" "),e("a",{staticClass:"text-decoration-none blue--text text--darken-3",attrs:{href:"#"}},[t._v("How To Use")]),t._v(" "),e("v-divider",{staticClass:"mx-3",attrs:{vertical:""}}),t._v(" "),e("a",{staticClass:"text-decoration-none blue--text text--darken-3",attrs:{href:"#"}},[t._v("Shipping & Return")])],1)]),t._v(" "),e("v-row",[e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("v-card",{attrs:{elevation:"0",color:"grey lighten-3"}},[e("v-img",{attrs:{src:t.product.media[t.activeMedia].url,contain:"",height:"410"}}),t._v(" "),e("v-card-actions",{staticClass:"white"},[e("v-slide-group",{attrs:{mandatory:"","center-active":"","show-arrows":""},model:{value:t.activeMedia,callback:function(e){t.activeMedia=e},expression:"activeMedia"}},t._l(t.product.media,(function(image,n){return e("v-slide-item",{key:n,scopedSlots:t._u([{key:"default",fn:function(t){var n=t.active,o=t.toggle;return[e("v-card",{staticClass:"ma-4",class:{"opacity--medium":!n},attrs:{height:"130",width:"140",elevation:n?2:0,color:"grey lighten-3"},on:{click:o}},[e("v-img",{attrs:{src:image.url,height:"130",contain:""}})],1)]}}],null,!0)})})),1)],1)],1)],1),t._v(" "),e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:6}},[e("div",{staticClass:"d-flex"},[e("p",{staticClass:"text-subtitle-2 mt-1"},[t._v("List Price:")]),t._v(" "),e("div",{staticClass:"d-flex flex-column"},[e("div",{staticClass:"d-flex align-center"},[e("p",{staticClass:"text-h6 font-weight-bold ml-3 mb-0"},[t._v("\n                  "+t._s(t.selected_variant.compare_at_price)+" KWD\n                ")]),t._v(" "),t.selected_variant.compare_at_price<t.selected_variant.price?e("p",{staticClass:"text-subtitle-2 font-weight-bold ml-3 text-decoration-line-through mb-0"},[t._v("\n                  "+t._s(t.selected_variant.price)+" KWD\n                ")]):t._e()])])]),t._v(" "),e("p",{staticClass:"text-subtitle-2 font-weight-bold green--text"},[t._v("Unpacked")]),t._v(" "),t.product.options.product_colors?e("div",[e("p",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-subtitle-1"},[t._v("Color:")]),t._v("\n              30-lb bag\n            ")]),t._v(" "),e("ColorSelect",{attrs:{colors:t.product.options.product_colors},model:{value:t.selectedOptions.color,callback:function(e){t.$set(t.selectedOptions,"color",e)},expression:"selectedOptions.color"}})],1):t._e(),t._v(" "),t.product.options.product_conditions?e("div",[e("p",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-subtitle-1"},[t._v("Condition:")]),t._v("\n              30-lb bag\n            ")]),t._v(" "),e("ConditionSelect",{attrs:{conditions:t.product.options.product_conditions},model:{value:t.selectedOptions.condition,callback:function(e){t.$set(t.selectedOptions,"condition",e)},expression:"selectedOptions.condition"}})],1):t._e(),t._v(" "),t.product.options.product_sizes?e("div",[e("p",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-subtitle-1"},[t._v("Size:")]),t._v("\n              30-lb bag\n            ")]),t._v(" "),e("SizeSelect",{attrs:{sizes:t.product.options.product_sizes},model:{value:t.selectedOptions.size,callback:function(e){t.$set(t.selectedOptions,"size",e)},expression:"selectedOptions.size"}})],1):t._e()])],1),t._v(" "),e("v-expansion-panels",{staticClass:"product-info-accordion mt-15",attrs:{accordion:""},model:{value:t.infoActive,callback:function(e){t.infoActive=e},expression:"infoActive"}},[e("v-expansion-panel",[e("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""}},[t._v("\n            Description\n          ")]),t._v(" "),e("v-expansion-panel-content",[e("p",{domProps:{innerHTML:t._s(t.product.description_en)}})])],1),t._v(" "),e("v-expansion-panel",[e("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""}},[t._v("\n            Ingredients\n          ")]),t._v(" "),e("v-expansion-panel-content",[t._v(" Ingredients ")])],1),t._v(" "),e("v-expansion-panel",[e("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""}},[t._v("\n            How to use\n          ")]),t._v(" "),e("v-expansion-panel-content",[e("p",{domProps:{innerHTML:t._s(t.product.usage_en)}})])],1),t._v(" "),e("v-expansion-panel",[e("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""}},[t._v("\n            About the Brand\n          ")]),t._v(" "),e("v-expansion-panel-content",[t._v("\n            About the Brand\n          ")])],1),t._v(" "),e("v-expansion-panel",[e("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""}},[t._v("\n            Shipping & Return\n          ")]),t._v(" "),e("v-expansion-panel-content",[t._v("\n            Shipping & Return\n          ")])],1)],1),t._v(" "),e("ProductReview",{attrs:{product:t.product}})],1),t._v(" "),e("v-col",{attrs:{cols:t.$vuetify.breakpoint.mobile?12:3}},[e("v-card",{attrs:{elevation:"0",outlined:"",color:"grey lighten-4"}},[e("v-card-text",[e("p",{staticClass:"font-weight-bold green--text text-center"},[t._v("In Stock")]),t._v(" "),e("client-only",{attrs:{placeholder:"quantity"}},[e("number-input",{staticClass:"quantity-input",attrs:{controls:"",center:"",rounded:"",min:1},model:{value:t.quantity,callback:function(e){t.quantity=e},expression:"quantity"}})],1),t._v(" "),e("p",{staticClass:"font-weight-bold text-center mt-4"},[e("span",{staticClass:"text-subtitle-2"},[t._v("Subtotal:")]),t._v("\n            340KWD\n          ")]),t._v(" "),e("v-btn",{staticClass:"text-capitalize",attrs:{"x-large":"",block:"",elevation:"0",color:"primary",loading:t.addToCartLoading},on:{click:t.addToCart}},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-basket-plus-outline ")]),t._v("\n            Add To Cart\n          ")],1),t._v(" "),e("v-btn",{staticClass:"text-capitalize mt-3",attrs:{"x-large":"",block:"",elevation:"0",color:"red darken-2",dark:""}},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-gesture-double-tap")]),t._v("\n            Buy Now\n          ")],1)],1),t._v(" "),e("v-card-actions",{staticClass:"white"},[e("v-btn",{staticClass:"text-capitalize",attrs:{elevation:"0",color:"white"}},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-heart-outline ")]),t._v("\n            Add To Favorite")],1),t._v(" "),e("v-btn",{staticClass:"text-capitalize",attrs:{elevation:"0",color:"white"}},[e("v-icon",{attrs:{left:"",color:"blue darken-2"}},[t._v("\n              mdi-compare-horizontal\n            ")]),t._v("\n            Compare")],1)],1)],1),t._v(" "),t.otherVariantListings.length?e("v-card",{staticClass:"mt-10",attrs:{outlined:"",rounded:"lg"}},[e("p",{staticClass:"text-subtitle-1 font-weight-bold text-center my-2"},[t._v("\n          Other Sellers\n        ")]),t._v(" "),e("v-divider"),t._v(" "),e("v-list",t._l(t.otherVariantListings,(function(n,o){return e("v-list-item",{key:o,on:{click:function(e){return t.changeVendor(n)}}},[e("v-list-item-content",[e("v-list-item-title",{staticClass:"text-title-1 primary--text"},[t._v("\n                KWD "+t._s(n.price)+"\n              ")]),t._v(" "),e("v-list-item-subtitle",{staticClass:"grey--text text--darken-1 mt-2"},[e("span",[t._v("Sold By")]),t._v("\n                "+t._s(n.vendor.name))])],1)],1)})),1)],1):t._e()],1)],1),t._v(" "),e("CategoryProducts",{staticClass:"mt-15",attrs:{title:" Beauty Lovers Also Bought"}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProductReview:n(816).default})}}]);