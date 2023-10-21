<template>
  <div id="app">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-row>
        <v-col :cols="$vuetify.breakpoint.mobile ? 4 : 2" class="d-flex align-center p-0">
          <nuxt-link :to="localePath('/location')">
            <v-img height="80" max-width="120" contain src="/images/logo.svg" class="logo"></v-img>
          </nuxt-link>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? 8 : 10">
          <v-row>
            <v-col cols="6" class="d-none d-lg-block">
              <v-row>
                <v-col cols="4" class="d-none d-lg-block" v-for="(item, index) in menu" :key="index">
                  <v-menu offset-y v-if="$auth.loggedIn">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" nuxt :to="item.link" icon>
                        {{ item.title }}
                      </v-btn>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" :class="text_dir">
              <div class="d-lg-block d-none">
                <v-menu offset-y v-if="$auth.loggedIn">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-bell</v-icon>
                    </v-btn>
                  </template>
                  <div class="white">
                    <v-list class="">
                      <v-list-item-title class="px-2">notification</v-list-item-title>
                      <v-list-item class="py-1 px-2" v-for="notification in notifications" :key="notification.id"
                        :to="switchLocalePath('en')">
                        <v-list-item-content style="max-width: 300px">
                          <h6 class="pb-2">{{ notification.title }}</h6>
                          <p>{{ notification.body }}</p>
                          <p>{{ notification.time }}</p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-web</v-icon>
                    </v-btn>
                  </template>
                  <div class="white">
                    <v-list>
                      <v-list-item :to="switchLocalePath('en')">
                        <v-list-item-content> English </v-list-item-content>
                      </v-list-item>
                      <v-list-item :to="switchLocalePath('ar')">
                        <v-list-item-content> العربية </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-menu>
                <v-menu offset-y v-if="isLogin">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" @click="goToLogin" small elevation="0"
                      class="rounded-sm">{{ $t("common.sign_in_up") }}</v-btn>
                  </template>
                </v-menu>

                <v-menu offset-y rounded="lg" min-width="400" v-if="$auth.loggedIn">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
                  </template>

                  <div class="white">
                    <v-list>
                      <v-list-item :to="localePath('/profile')">
                        <v-list-item-content>
                          {{ $t("common.edit_profile") }}
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item :to="localePath('/profile/orders')">
                        <v-list-item-content>
                          {{ $t("common.my_orders") }}
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item :to="localePath('/profile/orders')">
                        <v-list-item-content>
                          {{ $t("common.logout") }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-menu>
                <v-menu offset-y rounded="lg" min-width="400" v-if="$auth.loggedIn" ref="cart"
                  :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge v-if="$auth.loggedIn" :content="count" :value="count" overlap offset-y="20" color="primary">
                      <v-btn icon color="dark" elevation="0" v-bind="attrs" v-on="on">
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </v-badge>
                  </template>
                  <div class="white">
                    <miniCart :items.sync="getItems" @click.stop.prevent />
                  </div>
                </v-menu>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in menu" :key="index">
            <v-list-item-title @click="$router.push(item.link)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-content>
        <v-main>
            <div>
                <v-container class="pa-lg-0">
                    <Nuxt />
                </v-container>
            </div>
        </v-main>
    </v-content> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { get } from "@/apis/notification";
import { guest } from "@/apis/auth";
import miniCart from "@/pages/miniCart.vue";
export default {
  components: {
    miniCart,
  },
  data(vm) {
    return {
      drawer: false,
      tab: null,
      notifications: [],
      menu: [
        {
          icon: "home",
          title: vm.$t("common.menu"),
          link: vm.localePath("/products"),
        },
        {
          icon: "Order",
          title: vm.$t("common.orders"),
          link: vm.localePath("/profile/orders"),
        },
        {
          icon: "warning",
          link: vm.localePath("/contact-us"),
          title: vm.$t("common.contact_us"),
        },
      ],
      navigation: [],
      activeNav: {},
      activeMegaMenu: 0,
      megaMenuOpen: false,
      navOpen: false,
      drawer: false,
      items: [],
    };
  },
  computed: {
    ...mapGetters("cart", ["count", "getItems"]),
    isLogin() {
      return (
        !this.$auth.loggedIn &&
        !this.$route.path.includes("login") &&
        !this.$route.path.includes("register") &&
        !this.$route.path.includes("password")
      );
    },
    text_dir() {
      return this.$i18n.locale === "ar" ? "text-left" : "text-right";
    },
  },
  created() {
    this.getNotication();
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
    async getNotication() {
      const { data } = await get();
      this.notifications = data;
    },
    search(e) {
      this.$router.push({
        path: this.localePath("/products"),
        query: {
          search: e.target.value,
        },
      });
      this.$root.$emit("product:search", e.target.value);
    },
    navigate(nav) {
      const paths = {
        ProductCollection: "/collection/",
      };

      this.$router.push(`/collection/${nav.navigable.id}`);
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
  background: #ecbaa8 !important;
  padding: 1rem 0rem;
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
