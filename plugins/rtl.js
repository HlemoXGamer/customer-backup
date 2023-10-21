import extend from '../utils/extend-vue-app';

export default async function ({ app }) {
  extend(app, {
    mounted() {
      if (this.$i18n.locale === "ar") {
        this.$vuetify.rtl = true;
      } else {
        this.$vuetify.rtl = false;
      }
    },
    watch: {
      '$i18n.locale': function (value) {
        if (value === "ar") {
          this.$vuetify.rtl = true;
        } else {
          this.$vuetify.rtl = false;
        }
      }
    }
  });
}
