(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{758:function(n,t,e){"use strict";e.r(t);e(28),e(162);var o={props:{conditions:{type:Array,required:!0}},computed:{value:function(){var n=this;return this.conditions.findIndex((function(t){return t.id==n.$attrs.value}))}}},r=e(6),component=Object(r.a)(o,(function(){var n=this,t=n._self._c;return t("v-chip-group",{attrs:{value:n.value,mandatory:"","active-class":"yellow darken-2 font-weight-bold"},on:{change:function(t){return n.$emit("input",n.conditions[t].id)}}},n._l(n.conditions,(function(e,o){return t("v-chip",{key:o,attrs:{label:"",outlined:""}},[n._v("\n    "+n._s(e.name)+"\n  ")])})),1)}),[],!1,null,null,null);t.default=component.exports}}]);