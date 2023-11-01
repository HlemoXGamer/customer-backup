(window.webpackJsonp=window.webpackJsonp||[]).push([[43,25],{748:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return c}));var r=n(8);function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(arguments.length>1?arguments[1]:void 0)?r.a.get("/guest-apis/categories",{params:t}):r.a.get("/customer/categories",{params:t})}function c(data){return r.a.post("/customer/categoryView",data)}},760:function(t,e,n){"use strict";n.r(e);var r=n(7),o=(n(40),n(8));var c={data:function(){return{activeTab:0,banners:[]}},created:function(){this.getHomeBanner()},methods:{getHomeBanner:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.a.get("/banners").then((function(data){t.banners=data.data.banners}));case 1:case"end":return e.stop()}}),e)})))()}}},l=n(6),component=Object(l.a)(c,(function(){var t=this,e=t._self._c;return e("v-card",{attrs:{rounded:"lg"}},[e("v-carousel",{attrs:{cycle:"","hide-delimiter-background":"","show-arrows-on-hover":"",height:t.$vuetify.breakpoint.mobile?200:500}},t._l(t.banners,(function(n,r){return e("v-carousel-item",{key:r},[e("v-img",{attrs:{cover:"",src:n.image,"min-height":t.$vuetify.breakpoint.mobile?"200px":"500px","min-width":t.$vuetify.breakpoint.mobile?"100%":"700px"}})],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports},764:function(t,e){function n(t,e,n){var r,o,c,l,d;function v(){var m=Date.now()-l;m<e&&m>=0?r=setTimeout(v,e-m):(r=null,n||(d=t.apply(c,o),c=o=null))}null==e&&(e=100);var m=function(){c=this,o=arguments,l=Date.now();var m=n&&!r;return r||(r=setTimeout(v,e)),m&&(d=t.apply(c,o),c=o=null),d};return m.clear=function(){r&&(clearTimeout(r),r=null)},m.flush=function(){r&&(d=t.apply(c,o),c=o=null,clearTimeout(r),r=null)},m}n.debounce=n,t.exports=n},889:function(t,e,n){"use strict";n.r(e);n(29),n(16),n(9);var r=n(748),o=n(760),c=n(764),l=n.n(c),d={components:{Banner:o.default},data:function(){return{categories:[],searchItem:"",page:1,default_location:localStorage.getItem("default_location"),address:{},loading:!1,area_id:JSON.parse(localStorage.getItem("default_area")).id}},watch:{text:function(t){this.debounceSearch(t)},page:function(){this.getCategories({page:this.page})}},methods:{i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},debounceSearch:l()((function(t){this.searchItem=t,this.getCategories()}),500),getCategories:function(){var t=this;this.loading=!0,window.scrollTo({top:520,behavior:"smooth"}),Object(r.b)({name:this.searchItem,page:this.page,area:this.area_id},this.guest).then((function(data){t.categories=data.data,data.meta&&(t.pagination_total_items=data.meta.last_page)})).finally((function(){t.loading=!1}))}},created:function(){this.guest=!this.$auth.loggedIn,this.getCategories()},mounted:function(){this.address=JSON.parse(localStorage.getItem("default_".concat(this.default_location)))}},v=n(6),component=Object(v.a)(d,(function(){var t,e,n=this,r=n._self._c;return r("v-row",{staticClass:"categories-page"},[r("v-col",{attrs:{cols:"12"}},[r("Banner")],1),n._v(" "),r("v-col",{staticClass:"mt-1",attrs:{cols:"12"}},[r("v-row",{staticClass:"justify-space-between align-center py-1",attrs:{"no-gutters":""}},[r("v-btn",{staticClass:"px-0",attrs:{block:"",text:"",elevation:"0"}},[r("v-row",{staticClass:"justify-start align-center",attrs:{"no-gutters":""}},[r("v-icon",{class:n.i18n_me("ml-1","mr-1"),attrs:{color:"#65382c"}},[n._v("mdi-map-marker")]),n._v("\n          "+n._s(n.$t("common.area"))+"\n        ")],1),n._v(" "),r("v-spacer"),n._v(" "),r("v-row",{staticClass:"justify-end align-center",attrs:{"no-gutters":""}},[r("strong",{staticStyle:{color:"#65382c"}},[n._v(n._s("area"==n.default_location?null!==(t=n.address.name)&&void 0!==t?t:"---":null!==(e=n.address.area_name)&&void 0!==e?e:"---"))]),n._v(" "),r("v-icon",{class:n.i18n_me("mr-1","ml-1"),attrs:{color:"#65382c"}},[n._v("mdi-chevron-"+n._s(n.i18n_me("left","right")))])],1)],1)],1),n._v(" "),r("v-divider",{staticClass:"rounded-lg",attrs:{color:"#65382c"}}),n._v(" "),r("v-row",{staticClass:"justify-space-between align-center py-1",attrs:{"no-gutters":""}},[r("v-btn",{staticClass:"px-0",attrs:{block:"",text:"",elevation:"0"}},[r("v-row",{staticClass:"justify-start align-center",attrs:{"no-gutters":""}},[r("v-icon",{class:n.i18n_me("ml-1","mr-1"),attrs:{color:"#65382c"}},[n._v("mdi-clock-time-four")]),n._v("\n          "+n._s(n.$t("common.delivery_time"))+"\n        ")],1),n._v(" "),r("v-row",{staticClass:"justify-end align-center",attrs:{"no-gutters":""}},[r("strong",{staticStyle:{color:"#65382c"}},[n._v("30 mins")]),n._v(" "),r("v-icon",{class:n.i18n_me("mr-1","ml-1"),attrs:{color:"#65382c"}},[n._v("mdi-chevron-"+n._s(n.i18n_me("left","right")))])],1)],1)],1)],1),n._v(" "),r("v-col",{staticClass:"mt-1",attrs:{cols:"12"}},[r("v-text-field",{staticStyle:{"border-radius":"12px"},attrs:{value:n.searchItem,"hide-details":"",clearable:"",flat:"",solo:"",placeholder:n.$t("categories.search_placeholder"),color:"#65382c","background-color":"#ededed",dense:"","prepend-inner-icon":"mdi-magnify",height:"50"},on:{input:n.debounceSearch}})],1),n._v(" "),r("v-col",{staticClass:"mt-3",attrs:{cols:"12"}},[r("v-row",{staticClass:"justify-center flex-wrap",attrs:{"no-gutters":""}},[n._l(n.categories,(function(t,e){return r("commonCategory",{key:e,attrs:{category:t}})})),n._v(" "),n.loading?r("v-progress-circular",{attrs:{size:50,color:"#65382c",indeterminate:""}}):n._e(),n._v(" "),n.categories.length||n.loading?n._e():r("p",{staticClass:"font-primary"},[n._v("\n        "+n._s(n.$t("categories.not_found"))+"\n      ")])],2)],1),n._v(" "),n.categories.length>0?r("v-pagination",{staticClass:"mt-5 w-100 mx-auto",attrs:{"total-visible":n.$vuetify.breakpoint.xs?5:10,length:n.pagination_total_items,color:"#65382c"},model:{value:n.page,callback:function(t){n.page=t},expression:"page"}}):n._e()],1)}),[],!1,null,"79d6af44",null);e.default=component.exports}}]);