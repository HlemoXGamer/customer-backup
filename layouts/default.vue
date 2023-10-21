<template>
  <v-app :dir="dir" :class="{ 'guest-mobile': $vuetify.breakpoint.mobile && !$auth.loggedIn }">
    <productHeader />
    <!-- <Soon /> -->
    <v-main>
      <v-overlay :value="navOpen || megaMenuOpen" z-index="20"></v-overlay>
      <div :style="`padding-bottom: 50px; padding-top: ${$vuetify.breakpoint.mobile ? '10' : '10'
        }px`">
        <v-container :class="{
          'pa-lg-0': true,
          'pb-10': $vuetify.breakpoint.mobile && isLogin,
          'pt-0': $vuetify.breakpoint.mobile,
        }">
          <Nuxt />
        </v-container>
      </div>
    </v-main>

    <VmFooter />

    <v-navigation-drawer v-model="drawer" fixed>
      <v-list nav dense>
        <v-list-item-group> </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <FixedFooter v-if="isLogin" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { guest } from "@/apis/auth";
import VmFooter from "./footer.vue";
// import VmHeader from "./header.vue";
import FixedFooter from "@/components/mobile/FixedFooter.vue";
import Soon from "@/components/home/Soon.vue";
import { LocalNotifications } from "@capacitor/local-notifications";

export default {
  head() {
    return this.$nuxtI18nHead();
  },
  components: {
    FixedFooter,
    // VmHeader,
    VmFooter,
    Soon,
  },
  data() {
    return {
      navigation: [],
      activeNav: {},
      activeMegaMenu: 0,
      megaMenuOpen: false,
      navOpen: false,
      drawer: false,
    };
  },
  computed: {
    ...mapGetters("cart", ["count"]),
    isLogin() {
      return this.$auth.loggedIn;
      // !this.$route.path.includes("login") &&
      // !this.$route.path.includes("register") &&
      // !this.$route.path.includes("forget-password") &&
      // !this.$route.path.includes("resetPassword")
    },
    dir() {
      return this.$i18n.locale === "en" ? "ltr" : "rtl";
    },
  },
  methods: {
    goToLogin() {
      this.$router.push(this.localePath("/login"));
    },
    async logout() {
      this.$store.commit("cart/CLEAR_ALL");

      await this.$auth.logout();
      guest();
    },
    search(e) {
      this.$router.push({
        path: "/products",
        query: { search: e.target.value },
      });
      this.$root.$emit("product:search", e.target.value);
    },
  },
  async mounted() {
    await LocalNotifications.requestPermissions();
    this.$store.dispatch("notification/getNotifications");
  },
};
</script>
<style scoped>
header {
  height: 70px !important;
  background: #65382c !important;
}

.theme--light.v-btn.v-btn--icon {
  color: #65382c !important;
}

.v-app-bar.main-app-bar .logo {
  height: 33px !important;
}

.v-application .primary {
  background: transparent !important;
  border: 1px solid #65382c !important;
}
</style>
