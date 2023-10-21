(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{871:function(t,e,n){"use strict";n.r(e),n.d(e,"LocalNotificationsWeb",(function(){return r}));var o=n(147);class r extends o.a{constructor(){super(...arguments),this.pending=[],this.deliveredNotifications=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(t){if("TypeError"==t.name)return!1}return!0}}async getDeliveredNotifications(){const t=[];for(const e of this.deliveredNotifications){const n={title:e.title,id:parseInt(e.tag),body:e.body};t.push(n)}return{notifications:t}}async removeDeliveredNotifications(t){for(const e of t.notifications){const t=this.deliveredNotifications.find((t=>t.tag===String(e.id)));null==t||t.close(),this.deliveredNotifications=this.deliveredNotifications.filter((()=>!t))}}async removeAllDeliveredNotifications(){for(const t of this.deliveredNotifications)t.close();this.deliveredNotifications=[]}async createChannel(){throw this.unimplemented("Not implemented on web.")}async deleteChannel(){throw this.unimplemented("Not implemented on web.")}async listChannels(){throw this.unimplemented("Not implemented on web.")}async schedule(t){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");for(const e of t.notifications)this.sendNotification(e);return{notifications:t.notifications.map((t=>({id:t.id})))}}async getPending(){return{notifications:this.pending}}async registerActionTypes(){throw this.unimplemented("Not implemented on web.")}async cancel(t){this.pending=this.pending.filter((e=>!t.notifications.find((t=>t.id===e.id))))}async areEnabled(){const{display:t}=await this.checkPermissions();return{value:"granted"===t}}async requestPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(await Notification.requestPermission())}}async checkPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(Notification.permission)}}transformNotificationPermission(t){switch(t){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var t;const e=[],n=(new Date).getTime();for(const o of this.pending)(null===(t=o.schedule)||void 0===t?void 0:t.at)&&o.schedule.at.getTime()<=n&&(this.buildNotification(o),e.push(o));this.pending=this.pending.filter((t=>!e.find((e=>e===t))))}sendNotification(t){var e;if(null===(e=t.schedule)||void 0===e?void 0:e.at){const e=t.schedule.at.getTime()-(new Date).getTime();return this.pending.push(t),void setTimeout((()=>{this.sendPending()}),e)}this.buildNotification(t)}buildNotification(t){const e=new Notification(t.title,{body:t.body,tag:String(t.id)});return e.addEventListener("click",this.onClick.bind(this,t),!1),e.addEventListener("show",this.onShow.bind(this,t),!1),e.addEventListener("close",(()=>{this.deliveredNotifications=this.deliveredNotifications.filter((()=>!this))}),!1),this.deliveredNotifications.push(e),e}onClick(t){const data={actionId:"tap",notification:t};this.notifyListeners("localNotificationActionPerformed",data)}onShow(t){this.notifyListeners("localNotificationReceived",t)}}}}]);