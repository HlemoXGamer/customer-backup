import Vue from 'vue';
import VueSlickCarousel from 'vue-slick-carousel'
import VueNumberInput from '@chenfengyuan/vue-number-input';
Vue.use(VueNumberInput);

Vue.use(VueSlickCarousel)


import VuetifyConfirm from 'vuetify-confirm'

import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';



export default ({ app }) => {
     Vue.use(VuetifyConfirm, { vuetify: app.vuetify })
     Vue.use(VueTelInputVuetify, { vuetify: app.vuetify });

}