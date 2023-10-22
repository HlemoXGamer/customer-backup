<template>
  <div id="app">
    <!-- :style="isLocation ? 'pointer-events:none;' : ''" -->
    <v-app-bar app class="elevation-0 px-0 mx-0" height="110px">
      <v-row class="align-center justify-space-between pb-0 mb-0">
        <v-col :cols="$vuetify.breakpoint.mobile ? 4 : 2" :class="`d-flex align-center px-0 pb-0 mb-0 ${this.$vuetify.breakpoint.mobile && !this.$auth.loggedIn
            ? 'fix-image'
            : ''
          }`">
          <nuxt-link :to="goToHome" class="py-2">
            <v-img :height="$vuetify.breakpoint.xs ? 40 : 50" max-width="100" contain src="/images/big-logo.png" class="logo"></v-img>
          </nuxt-link>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.mobile" :cols="$vuetify.breakpoint.mobile ? 2 : 10" class="pb-0 pt-0 mb-0">
          <v-row class="icons-container d-flex align-center justify-end pt-0">
            <!-- <v-col cols="6" class="d-none d-lg-block">
              <v-row>
                <v-col cols="3" v-if="$auth.loggedIn" class="d-none d-lg-block" v-for="(item, index) in menu"
                  :key="index">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" nuxt :to="item.link" icon>
                        {{ item.title }}
                      </v-btn>
                    </template>
                  </v-menu>
                </v-col>
                <v-col cols="3" v-if="!$auth.loggedIn" class="d-none d-lg-block pb-0 mb-0">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" nuxt :to="menu[0].link" icon>
                        {{ menu[0].title }}
                      </v-btn>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col> -->
            <v-col cols="6" :class="`d-lg-block d-none pb-0 mb-0 ${text_dir}`">
              <div class="d-lg-block d-none">
                <!-- notifications -->
                <v-menu offset-x origin="top right" offset-y v-if="$auth.loggedIn" min-width="300" max-height="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon @click="updateNotification">
                      <v-badge offset-y="0" v-if="notificationTotal > 0" overlap :value="notificationTotal"
                        color="#65382c" class="white--text">
                        <span slot="badge">{{ notificationTotal }}</span>
                      </v-badge>
                      <v-icon color="#65382c">mdi-bell</v-icon>
                    </v-btn>
                  </template>
                  <div class="white">
                    <v-list class="">
                      <v-list-item-title class="px-4 py-2" style="border-bottom: 1px solid #eee">
                        <h3>
                          {{ $t("common.notifications") }}
                        </h3>
                      </v-list-item-title>
                      <v-list-item v-if="notifications.length === 0">
                        <v-list-item-title class="px-4 mb-2">
                          <h2>
                            {{ $t("common.no_notifications") }}
                          </h2>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="notifications.length !== 0" @click="
                        $router.push(
                          localePath(
                            '/profile/orders/' + notification.order_id
                          )
                        )
                        " class="pb-1 px-4" v-for="notification in notifications" :key="notification.id">
                        <v-list-item-title>
                          {{ $t("profile.orders.orders_details.order") }} #{{
                            notification.order_id
                          }}
                          {{ $i18n.locale === "en" ? "is " : ""
                          }}{{
  $t(
    `profile.orders.orders_details.${notification.status}`
  )
}}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-menu>
                <!-- change language -->
                <v-menu offset-y transition="slide-y-transition" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon>
                      <v-icon color="#65382c">mdi-web</v-icon>
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

                <!-- edit profile -->
                <v-menu offset-y min-width="100px" rounded="lg" v-if="$auth.loggedIn" transition="slide-y-transition" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" elevation="0" v-bind="attrs" v-on="on" icon>
                      <v-icon color="#65382c">mdi-account</v-icon>
                    </v-btn>
                  </template>

                  <div class="white">
                    <v-list>
                      <v-list-item exact-path nuxt :to="localePath('/profile')">
                        <v-list-item-content>
                          {{ $t("common.edit_profile") }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item exact-path nuxt :to="localePath('/profile/addresses')">
                        <v-list-item-content>
                          {{ $t("common.my_address") }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item nuxt exact-path :to="localePath('/profile/orders')">
                        <v-list-item-content>
                          {{ $t("common.my_orders") }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item @click="logout">
                        <v-list-item-content>
                          {{ $t("common.logout") }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-menu>
                <!-- <v-menu offset-y rounded="lg" min-width="400" ref="cart" :close-on-content-click="false"> -->
                  <!-- <template v-slot:activator="{ on, attrs }"> -->
                    <v-badge :content="count" :value="count" overlap offset-y="20" color="#65382c" class="white--text">
                      <v-btn icon color="dark" elevation="0" :to="localePath('/cart')">
                        <v-icon color="#65382c">mdi-cart</v-icon>
                      </v-btn>
                    </v-badge>
                  <!-- </template> -->
                  <!-- <div class="white">
                    <miniCart :sub_total.sync="total" :delivery_fee.sync="delivery_fee"
                      :delivery_cost.sync="delivery_cost" :minimum_charge.sync="minimum_charge" :items.sync="getItems"
                      @close="closeCart" @click.stop.prevent />
                  </div> -->
                <!-- </v-menu> -->
              </div>
            </v-col>
          </v-row>
        </v-col>
        <!-- <div v-else-if="$vuetify.breakpoint.mobile && $auth.loggedIn">
          <div class="icons-container">
            <div class="search-icon-header">
              <v-btn @click="showSearch" icon text class="m-0 h-auto">
                <v-icon large color="#65382c">mdi-magnify</v-icon>
              </v-btn>
            </div>
          </div>
        </div> -->
        <div v-else-if="$vuetify.breakpoint.mobile && !$auth.loggedIn" :class="{
          'ml-auto':
            $vuetify.breakpoint.mobile &&
            !$auth.loggedIn &&
            $i18n.locale === 'en',
          'mr-auto':
            $vuetify.breakpoint.mobile &&
            !$auth.loggedIn &&
            $i18n.locale === 'ar',
        }">
          <div class="icons-container">
            <v-menu offset-y transition="slide-y-transition" bottom>
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
            <v-menu offset-y offset-x rounded="lg" :position-x="0" ref="cart" left min-width="100%"
              :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-badge :content="count" :value="count" overlap offset-y="20" color="#65382c" class="white--text">
                  <v-btn icon color="dark" elevation="0" v-bind="attrs" v-on="on">
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                </v-badge>
              </template>
              <div class="white">
                <miniCart :dont-should-mobile-version="true" :sub_total.sync="total" :delivery_fee.sync="delivery_fee"
                  :delivery_cost.sync="delivery_cost" :minimum_charge.sync="minimum_charge" :items.sync="getItems"
                  @close="closeCart" @click.stop.prevent />
              </div>
            </v-menu>

            <v-btn color="primary" @click="goToLogin" small elevation="0" class="rounded-sm">{{ $t("common.login")
            }}</v-btn>

            <!--add cart here-->
          </div>
        </div>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none mt-2"></v-app-bar-nav-icon>

        <v-col cols="12" style="background-color: #ecbaa8;">
          <p class="mb-0 font-weight-bold text-center text-h7" style="color: #65382c;">
            {{ $t("common.sweet_moments") }}
          </p>
      </v-col>

      </v-row>
    </v-app-bar>
    <v-navigation-drawer :right="$i18n.locale === 'ar'" v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-if="$auth.loggedIn" v-for="(item, index) in menu" :key="index">
            <v-list-item-title @click="$router.push(item.link)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$auth.loggedIn">
            <v-list-item-title @click="$router.push(menu[0].link)">{{
              menu[0].title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialogSearch" transition="dialog-bottom-transition">
      <div class="dialogSearch">
        <v-text-field outlined :placeholder="$t('common.search_here')" :value="text" @input="(value) => (text = value)" />
        <!-- <h1>hi</h1> -->
      </div>
    </v-dialog>
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
// import { get } from "@/apis/notification";
import { guest } from "@/apis/auth";
import miniCart from "@/pages/miniCart.vue";
import { mapFields } from "vuex-map-fields";

export default {
  components: {
    miniCart,
  },
  data(vm) {
    return {
      drawer: false,
      dialogSearch: vm.$route.query.search ? true : false,
      tab: null,
      // notifications: [],
      totalN: 0,
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
    isLocation() {
      return this.$route.path.includes("location");
    },
    ...mapGetters("cart", [
      "getItems",
      "total",
      "delivery_fee",
      "count",
      "delivery_cost",
      "minimum_charge",
    ]),
    ...mapGetters("notification", {
      notifications: "items",
      notificationTotal: "total",
    }),
    ...mapFields("search", ["text"]),
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
    goToHome() {
      return this.localePath("/pick-service");
      const default_location = localStorage.getItem("default_location");
      if (!default_location) {
        return this.localePath("/location");
      } else {
        return this.localePath("/products");
      }
    },
    menu() {
      return [
        {
          icon: "location",
          title: this.$t("common.location"),
          link: this.localePath("/location"),
        },
        {
          icon: "home",
          title: this.$t("common.menu"),
          link: this.localePath("/products"),
        },
        {
          icon: "Order",
          title: this.$t("common.orders"),
          link: this.localePath("/profile/orders"),
        },
        {
          icon: "warning",
          link: this.localePath("/contact-us"),
          title: this.$t("common.contact_us"),
        },
      ];
    },
  },
  methods: {
    updateNotification() {
      this.$store.dispatch("notification/updateNotifications");
    },
    goToLogin() {
      this.$router.push(this.localePath("/login"));
    },
    async logout() {
      this.$store.commit("cart/CLEAR_ALL");
      // window.localStorage.removeItem('auth._token.laravelJWT')
      // window.localStorage.removeItem('auth.strategy')
      // window.localStorage.removeItem('auth._token_expiration.laravelJWT')
      // window.localStorage.removeItem('token')
      // window.localStorage.removeItem('user')

      await this.$auth.logout();
      this.$router.replace(this.localePath("/login"));

      guest();
    },
    showSearch(e) {
      this.dialogSearch = true;
      if (!this.$route.path.includes("products")) {
        this.$router.push({
          path: this.localePath("/products"),
          query: {
            search: true,
          },
        });
      }
      // this.$router.push({
      //   path: this.localePath("/products"),
      //   query: {
      //     search: e.target.value,
      //   },
      // });
      // this.$root.$emit("product:search", e.target.value);
    },
    navigate(nav) {
      const paths = {
        ProductCollection: "/collection/",
      };

      this.$router.push(`/collection/${nav.navigable.id}`);
    },
    closeCart() {
      try {
        this.$refs.cart.save();
      } catch { }
    },
  },
};
</script>

<style scoped>
header {
  /* box-sizing: content-box; */
  /* height: 70px !important; */
  background: #fff !important;
  /* padding: 1rem 0rem; */
}

[dir="rtl"] .search-icon-header {
  text-align: left;
}

.search-icon-header {
  display: block;
  font-size: 30px;
  color: #65382c;
  text-align: right;
}

@media screen and (min-width: 960px) {
  .search-icon-header {
    display: none;
  }
}

.icons-container {
  align-items: center !important;
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
  color: #65382c !important;
}

.dialogSearch {
  background: rgb(238, 235, 235) !important;
  height: 55px;
  position: fixed;
  top: 0;
  left: 0;
}
</style>

<style>
.guest-login .v-toolbar__content {
  display: block !important;
}

.fix-image {
  position: relative;
  left: 25px;
}

[dir="rtl"] .fix-image {
  left: unset;
  right: 25px;
}

:deep(.v-toolbar__content){
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
