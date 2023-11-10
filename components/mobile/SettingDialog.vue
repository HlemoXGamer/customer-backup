<template>
  <v-dialog @click:outside="$router.go(-1)" hide-overlay :value="value">
    <div class="profile-dialog">
      <h3 class="mb-5">{{ $t("dialog.settings") }}</h3>
      <div class="d-flex justify-space-between">
        <div>{{ $t("dialog.language") }}</div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="main-btn"
              color="bg-transparent"
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left v-if="$i18n.locale === 'ar'" dark>
                mdi-arrow-down-drop-circle
              </v-icon>
              {{ activeLanguage }}
              <v-icon right v-if="$i18n.locale === 'en'" dark>
                mdi-arrow-down-drop-circle
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="switchLanguage" :to="switchLocalePath('en')">
              <v-list-item-title>{{ $t("dialog.english") }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('ar')">
              <v-list-item-title>{{ $t("dialog.arabic") }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: ["value"],
  computed: {
    activeLanguage() {
      return this.$i18n.locale === "en"
        ? this.$t("dialog.english")
        : this.$t("dialog.arabic");
    },
  },
  // data: () => ({
  //   items: [
  //     {
  //       title: "ar",
  //     },
  //     {
  //       title: "en",
  //     },
  //   ],
  // }),
  methods: {
    switchLanguage() {
      // this.$router.replace(this.switchLocalePath('en'))
      // if (this.$i18n.local === "ar") {
      //   switchLocalePath("en");
      // } else {
      //   switchLocalePath("ar");
      // }
    },
  },
};
</script>
<style scoped>
.profile-dialog {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  background: #fff;
  padding: 1rem;
}
.main-btn {
  border-bottom: 1px solid #998;
  border-radius: 0;
}
</style>
