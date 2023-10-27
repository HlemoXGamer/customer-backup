<template>
  <v-app :dir="dir">
    <VmHeader />
    <v-main>
      <v-overlay :value="navOpen || megaMenuOpen" z-index="20"></v-overlay>
      <div style="padding-bottom: 50px; padding-top: 50px">
        <v-container class="pa-lg-0">
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

  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { guest } from "@/apis/auth";
import VmFooter from "./footer.vue";
import VmHeader from "./header.vue";

export default {
  head () {
    return this.$nuxtI18nHead()
  },
  components: {
    VmHeader,
    VmFooter,
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
      return (
        !this.$auth.loggedIn &&
        !this.$route.path.includes("login") &&
        !this.$route.path.includes("register")
      );
    },
    dir () {
      return this.$i18n.locale === 'en' ? 'ltr': 'rtl'
    }
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
    // search(e) {
    //   this.$router.push({
    //     path: "/products",
    //     query: { search: e.target.value },
    //   });
    //   this.$root.$emit("product:search", e.target.value);
    // },
    navigate(nav) {
      // const paths = {
      //   ProductCollection: "/collection/",
      // };

      // this.$router.push(`/collection/${nav.navigable.id}`);
    },
  },
  // async fetch() {
  //   this.navigation = (await get()).data;
  // },
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


.fixed-footer {
  bottom: 0;
  border-top: 2px solid #6c3529aa ;
  /* left: 50%;
  transform: translateX(-50%); */
  /* padding-top: 3rem; */
  position: fixed;
  width: 100%;
  height: 12vh;
  border-radius: 0.2rem;
  background: #fff;
  color: #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2rem;
  /* backdrop-filter: blur(20px); */
}

.fixed-footer-item {
  color: #888;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.fixed-footer-item.nuxt-link-active {
  color:red !important;
}
.fixed-footer-item .v-icon {
  color:inherit;
}
.fixed-footer-item .fixed-footer-text {
  color: inherit;
  font-size: 0.90rem;
  font-weight: bold;
}
.logo {
  color: #65382c;
  font-weight: bold;
  font-size: 32px;
}
</style>