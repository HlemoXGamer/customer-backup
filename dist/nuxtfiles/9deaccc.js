(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{789:function(t,e,o){var content=o(862);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(2).default)("2c5912c2",content,!0,{sourceMap:!1})},861:function(t,e,o){"use strict";o(789)},862:function(t,e,o){var n=o(1)((function(i){return i[1]}));n.push([t.i,".product_wrapper{background-color:hsla(10,48%,88%,.871);border-radius:20px;display:flex;flex-direction:column;justify-content:center;margin:0 auto;overflow:hidden;padding:0 0 1em;width:90%}.product_image{position:relative;width:100%}.product_info__title{font-size:1.1em;font-weight:700;margin-top:1em;padding:0 .5em}.product_info__meta{display:flex;font-weight:700;justify-content:space-between;margin-top:1em;padding:0 .7em}.product_info__price_currancy{font-size:.8rem;font-weight:100}.out-text{align-items:center;background:rgba(0,0,0,.5);color:#fff;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%}.out-text span{transform:rotate(-20deg)}",""]),n.locals={},t.exports=n},900:function(t,e,o){"use strict";o.r(e);var n={props:{product:{type:Object,default:function(){return{name_en:"",name_ar:"",images:[],price:10}}}},methods:{i18n_me:function(t,e){return"en"===this.$i18n.locale?e:t},open:function(){0!==this.product.status&&(this.$emit("updateData",this.product),this.$emit("updateShow",!0))}}},r=(o(861),o(6)),component=Object(r.a)(n,(function(){var t=this,e=t._self._c;return 0!==t.product.status?e("div",{staticClass:"product_wrapper",on:{click:t.open}},[e("div",{staticClass:"product_image"},[e("v-carousel",{attrs:{cycle:"",height:"250","hide-delimiters":"",width:"100%","show-arrows":!1}},t._l(t.product.images,(function(image){return e("v-carousel-item",{key:image.id,attrs:{src:image.url,height:"250",width:"100%"}})})),1),t._v(" "),0===t.product.status?e("div",{staticClass:"out-text"},[e("span",[t._v(t._s(t.$t("products.out_of_stock")))])]):t._e()],1),t._v(" "),e("div",{staticClass:"product_info"},[e("div",{staticClass:"product_info__title"},[t._v("\n      "+t._s(t.i18n_me(t.product.name_ar,t.product.name_en))+"\n    ")]),t._v(" "),e("div",{staticClass:"product_info__meta"},[e("div",{staticClass:"product_info__price"},[t._v("\n        "+t._s(t.product.price)+"\n        "),e("span",{staticClass:"product_info__price_currancy"},[t._v(t._s(t.i18n_me("دينار","KWD")))])]),t._v(" "),e("div",{staticClass:"product_info__category"},[t._v("\n        "+t._s(t.product.categories[0]?t.i18n_me(t.product.categories[0].name_ar,t.product.categories[0].name_en):t.product.created_at)+"\n      ")])])])]):t._e()}),[],!1,null,null,null);e.default=component.exports}}]);