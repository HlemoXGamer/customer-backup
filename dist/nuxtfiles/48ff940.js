(window.webpackJsonp=window.webpackJsonp||[]).push([[58,28],{752:function(t,e,r){"use strict";r.r(e);var o=r(7),n=(r(40),r(5));var c={data:function(){return{activeTab:0,banners:[]}},created:function(){this.getHomeBanner()},methods:{getHomeBanner:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.a.get("/banners").then((function(data){t.banners=data.data.banners}));case 1:case"end":return e.stop()}}),e)})))()}}},l=r(8),component=Object(l.a)(c,(function(){var t=this,e=t._self._c;return e("v-card",{attrs:{rounded:"lg"}},[e("v-carousel",{attrs:{cycle:"","hide-delimiter-background":"","show-arrows-on-hover":"",height:t.$vuetify.breakpoint.mobile?200:500}},t._l(t.banners,(function(r,o){return e("v-carousel-item",{key:o},[e("v-img",{attrs:{cover:"",src:r.image,"min-height":t.$vuetify.breakpoint.mobile?"200px":"500px","min-width":t.$vuetify.breakpoint.mobile?"100%":"700px"}})],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports},774:function(t,e){function r(t,e,r){var o,n,c,l,d;function h(){var f=Date.now()-l;f<e&&f>=0?o=setTimeout(h,e-f):(o=null,r||(d=t.apply(c,n),c=n=null))}null==e&&(e=100);var f=function(){c=this,n=arguments,l=Date.now();var f=r&&!o;return o||(o=setTimeout(h,e)),f&&(d=t.apply(c,n),c=n=null),d};return f.clear=function(){o&&(clearTimeout(o),o=null)},f.flush=function(){o&&(d=t.apply(c,n),c=n=null,clearTimeout(o),o=null)},f}r.debounce=r,t.exports=r},791:function(t,e,r){var content=r(840);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(2).default)("35d16c5e",content,!0,{sourceMap:!1})},839:function(t,e,r){"use strict";r(791)},840:function(t,e,r){var o=r(1)((function(i){return i[1]}));o.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap);"]),o.push([t.i,".products{background:#f4f7ff!important}.font-primary{color:#65382c!important}.products .v-messages{display:none!important}.v-application .Newprimary{background-color:#65382c!important;border-color:#65382c!important}.Newprimary .v-btn__content{color:#fff}.products .v-label{color:#2a4aba;font-size:20px}.v-application .primary--text{caret-color:#65382c!important;color:#65382c!important}.v-text-field--outlined>.v-input__control>.v-input__slot{align-items:stretch}.v-text-field--outlined .v-label{top:.5rem!important}.searchHear .v-input__slot{background:#f4f7ff!important}.products .Newprimary.action-filter .v-btn__content,.products .v-card__actions>.v-btn.v-btn{padding:0 1rem!important}.products-page .font-primary{font-size:1.25rem}.a-product-card{border:2px solid transparent;transition:.3s}.a-product-card:hover{border-color:rgba(101,56,44,.608)!important;transform:scale(1.001) translateY(-5px)}",""]),o.locals={},t.exports=o},912:function(t,e,r){"use strict";r.r(e);r(15),r(25),r(21),r(26);var o=r(6),n=(r(125),r(22),r(9),r(16),r(124),r(737)),c=r(756),l=r(774),d=r.n(l),h=r(55);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={refTimer:void 0,components:{Banner:r(752).default},data:function(){return{mobileProductDialog:!1,mobileProductDialogData:{},page:1,pagination_total_items:0,apply:!1,categories:[],products:[],searchItem:null,loading:!1,filter:{categories:[],price_from:0,price_to:1e4,price:[0,1e4]}}},computed:m(m({},Object(h.b)("search",["text"])),{},{category_filter:function(){return this.filter.categories.join(",")}}),watch:{text:function(t){this.debounceSearch(t)},page:function(){this.getProducts(this.filter)},filter:{handler:function(){this.getProducts(this.filter)},deep:!0}},methods:{categoryViewed:function(t){try{Object(c.a)(t)}catch(t){console.error(t)}},updateDialogShow:function(t){this.mobileProductDialog=t},updateDialogData:function(data){this.mobileProductDialogData=data},i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},debounceSearch:d()((function(t){this.searchItem=t,this.getProducts(this.apply?this.filter:{})}),500),search:function(){this.$router.push({path:this.localePath("/products"),query:{search:this.searchItem}}),this.$root.$emit("product:search",this.searchItem)},getProducts:function(){var t=this;this.products=[],this.loading=!0,window.scrollTo({top:520,behavior:"smooth"}),Object(n.a)({name:this.searchItem,page:this.page,branch_id:this.branch_id,category:this.$store.state.category.selected_category[0]},this.guest).then((function(data){t.products=data.data,data.meta&&(t.pagination_total_items=data.meta.last_page)})).finally((function(){t.loading=!1}))},getCategories:function(){var t=this;Object(c.b)({},this.guest).then((function(e){var data=e.data;t.categories=data}))},applyFilter:function(){this.apply=!0,this.getProducts(this.filter)},resetFilter:function(){this.apply=!1,this.filter={categories:[],price_from:0,price_to:1e4,price:[0,1e4]},this.searchItem="",this.getProducts()},getBranchFromStorage:function(){var area=window.localStorage.getItem("default_area");if(area){var t=JSON.parse(area);if(t.branches&&t.branches.length>0)return t.branches[0].id}},handleCategoryChange:function(t){localStorage.setItem("selected_category",t),this.$store.dispatch("category/setCategory",t[0]),this.page=1,this.getProducts()}},mounted:function(){this.guest=!this.$auth.loggedIn,this.branch_id=this.guest?this.getBranchFromStorage():null,this.getCategories();var t=localStorage.getItem("selected_category");null!==t&&this.$store.dispatch("category/setCategory",Number(t)),this.getProducts()}},y=(r(839),r(8)),component=Object(y.a)(v,(function(){var t=this,e=this,r=e._self._c;return r("v-row",{staticClass:"products-page"},[r("v-col",{attrs:{cols:"12"}},[r("Banner")],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("MobileCategories",{attrs:{categories:e.categories,selected_category:e.$store.state.category.selected_category},on:{input:e.handleCategoryChange}})],1),e._v(" "),r("v-col",{staticClass:"mt-1",attrs:{cols:"12"}},[r("v-text-field",{staticStyle:{"border-radius":"12px"},attrs:{value:e.searchItem,"hide-details":"",clearable:"",flat:"",solo:"",placeholder:e.$t("products.search_placeholder"),color:"#65382c","background-color":"#ededed",dense:"","prepend-inner-icon":"mdi-magnify",height:"50"},on:{input:e.debounceSearch}})],1),e._v(" "),r("v-col",{staticClass:"mt-3",attrs:{cols:"12"}},[r("v-row",{staticClass:"justify-center flex-wrap",attrs:{"no-gutters":""}},[e._l(e.products,(function(t,o){return r("commonProduct",{key:o,attrs:{product:t},on:{updateShow:e.updateDialogShow,updateData:e.updateDialogData}})})),e._v(" "),e.loading?r("v-progress-circular",{attrs:{size:50,color:"#65382c",indeterminate:""}}):e._e(),e._v(" "),e.products.length||e.loading?e._e():r("p",{staticClass:"font-primary"},[e._v("\n        "+e._s(e.$t("products.not_found"))+"\n      ")])],2),e._v(" "),r("MobileProductDialog",{attrs:{product:e.mobileProductDialogData},on:{update:function(e){return t.mobileProductDialog=e}},model:{value:e.mobileProductDialog,callback:function(t){e.mobileProductDialog=t},expression:"mobileProductDialog"}}),e._v(" "),e.products.length>0?r("v-pagination",{staticClass:"mt-5 w-100 mx-auto",attrs:{"total-visible":e.$vuetify.breakpoint.xs?5:10,length:e.pagination_total_items,color:"#65382c"},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}):e._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MobileCategories:r(893).default,MobileProductDialog:r(768).default})}}]);