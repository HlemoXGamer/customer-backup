(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{787:function(e,n,t){"use strict";t.r(n);var r=t(7),o=(t(43),t(5));var c={data:function(){return{activeTab:0,banners:[]}},created:function(){this.getHomeBanner()},methods:{getHomeBanner:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o.a.get("/banners").then((function(data){e.banners=data.data.banners}));case 1:case"end":return n.stop()}}),n)})))()}}},l=t(8),component=Object(l.a)(c,(function(){var e=this,n=e._self._c;return n("v-card",{attrs:{rounded:"lg"}},[n("v-carousel",{attrs:{cycle:"","hide-delimiter-background":"","show-arrows-on-hover":"",height:e.$vuetify.breakpoint.mobile?200:500}},e._l(e.banners,(function(t,r){return n("v-carousel-item",{key:r},[n("v-img",{attrs:{cover:"",src:t.image,"min-height":e.$vuetify.breakpoint.mobile?"200px":"500px","min-width":e.$vuetify.breakpoint.mobile?"100%":"700px"}})],1)})),1)],1)}),[],!1,null,null,null);n.default=component.exports}}]);