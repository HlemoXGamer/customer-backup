(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{814:function(e,t,o){"use strict";o.r(t);var r={props:{dialog:{type:Boolean,default:!1},isAddress:{type:Boolean,default:!1},address:{type:Object,default:function(){}}},data:function(){return{center:{lat:29.33919817328526,lng:47.671376497490094},theAddress:null,searchTerm:""}},mounted:function(){this.getCurrentLocation()},methods:{getCurrentLocation:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e.center={lat:t.coords.latitude||0,lng:t.coords.longitude||0}}),(function(e){console.error("Error getting current location:",e)})):console.error("Geolocation is not supported in this browser.")},replaceMarker:function(e){this.center={lat:e.latLng.lat(),lng:e.latLng.lng()},this.geocodeLatLng({lat:e.latLng.lat(),lng:e.latLng.lng()})},geocodeLatLng:function(e){var t=this;(new google.maps.Geocoder).geocode({location:e},(function(e,o){if("OK"===o&&e[0]){var r=e[0].formatted_address;t.theAddress=r,t.$emit("set-address",t.theAddress.split(" "),t.center)}else console.error("Geocoding failed due to:",o)}))},searchLocation:function(){var e=this;(new google.maps.Geocoder).geocode({address:this.searchTerm},(function(t,o){if("OK"===o&&t[0]){var r={lat:t[0].geometry.location.lat(),lng:t[0].geometry.location.lng()};e.center=r,e.replaceMarker({latLng:r})}else console.error("Search was not successful for the following reason:",o)}))}}},n=o(8),component=Object(n.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("v-dialog",{attrs:{persistent:"","max-width":"1100"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t("v-card",{staticClass:"px-3 py-3 rounded-lg dialog-card",staticStyle:{position:"relative"},attrs:{color:"white"}},[t("v-btn",{staticStyle:{position:"absolute",top:"10px",right:"10px"},attrs:{icon:"",large:"",color:"#65382c"},on:{click:function(t){return e.$emit("close")}}},[t("v-icon",[e._v("mdi-close")])],1),e._v(" "),t("p",{staticClass:"font-primary text-h4 py-3 text-center font-weight-bold mb-3 mt-5"},[e._v("Pick a Location")]),e._v(" "),t("div",{staticStyle:{"padding-bottom":"10px"}},[t("v-text-field",{staticStyle:{"border-radius":"12px"},attrs:{"hide-details":"",clearable:"",flat:"",solo:"",placeholder:e.$t("common.areas.search_placeholder"),color:"#65382c","background-color":"#ededed",dense:"","prepend-inner-icon":"mdi-map-marker",height:"50"},on:{input:function(t){return e.searchLocation()}},model:{value:e.searchTerm,callback:function(t){e.searchTerm=t},expression:"searchTerm"}})],1),e._v(" "),t("GmapMap",{ref:"mapRef",staticStyle:{width:"100%",height:"400px"},attrs:{center:e.center,zoom:18,"map-type-id":"terrain"},on:{click:e.replaceMarker}},[t("GmapMarker",{attrs:{position:e.center,clickable:!0,draggable:!0}})],1),e._v(" "),e.isAddress?t("v-row",{staticClass:"py-4 align-center justify-center",attrs:{"no-gutters":""}},[t("v-btn",{staticStyle:{width:"fit-content"},attrs:{color:"#65382c",dark:"",elevation:"0"},on:{click:function(t){return e.$emit("updateLatLng",e.address,e.center)}}},[e._v("Update The Address")])],1):e._e()],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);