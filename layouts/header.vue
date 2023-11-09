<template>
  <div id="app">
    <commonReSchedule :dialog="!payment && $store.state.checkout.form.delivery_date !== null" @close="rescheduleDialog = false" />
    <v-app-bar app class="elevation-0 px-0 mx-0" :height="$route.path.includes('/pick-service') ? '110px' : ''">
      <v-row class="align-center justify-space-between pb-0 mb-0">
        <v-col :cols="$vuetify.breakpoint.mobile ? 4 : 2" class="d-flex align-center justify-start px-0 pb-0 mb-0">
          <nuxt-link :to="goToHome" class="py-2">
            <v-img :height="$vuetify.breakpoint.xs ? 40 : 50" :max-width="$vuetify.breakpoint.mobile ? 65 : 100" contain
              src="/images/big-logo.png" class="logo"></v-img>
          </nuxt-link>
        </v-col>
        <v-col class="pb-0 pt-0 mb-0">
          <v-row class="d-flex align-center justify-end pt-0">
            <v-col :class="`pb-0 mb-0 ${text_dir}`">
              <div>
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
                        <v-list-item-title class="px-0">
                          <p class="mb-0 py-3 text-h7 text-center font-weight-bold">
                            {{ $t("common.no_notifications") }}
                          </p>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="notifications.length !== 0"
                        @click="$router.push(localePath('/profile/orders/' + notification.order_id))" class="pb-1 px-4"
                        v-for="notification in notifications" :key="notification.id">
                        <v-list-item-title>
                          {{ $t("profile.orders.orders_details.order") }} #{{ notification.order_id }}{{ $i18n.locale ===
                            "en" ? "is " : "" }}
                          {{ $t(`profile.orders.orders_details.${notification.status}`) }}
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


                <!-- edit profile -->
                <v-menu offset-y min-width="100px" rounded="lg" v-if="$auth.loggedIn && !$vuetify.breakpoint.mobile"
                  transition="slide-y-transition" bottom>
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
                <v-badge :content="count" :value="count" overlap offset-y="20" color="#65382c" class="white--text">
                  <v-btn icon color="dark" elevation="0" :to="localePath('/cart')">
                    <v-icon color="#65382c">mdi-cart</v-icon>
                  </v-btn>
                </v-badge>

                <v-menu offset-y v-if="isLogin">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" @click="goToLogin" small elevation="0"
                      class="rounded-sm">{{ $t("common.sign_in_up") }}</v-btn>
                  </template>
                </v-menu>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none mt-2"></v-app-bar-nav-icon>

        <v-col cols="12" style="background-color: #ecbaa8;" v-if="$route.path.includes('/pick-service')">
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
    <!-- <v-dialog v-model="dialogSearch" transition="dialog-bottom-transition">
      <div class="dialogSearch">
        <v-text-field outlined :placeholder="$t('common.search_here')" :value="text" @input="(value) => (text = value)" />
      </div>
    </v-dialog> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { guest } from "@/apis/auth";
import { mapFields } from "vuex-map-fields";
import { getServerTime } from "@/apis/time";
import { timeChecker } from "@/helpers/timeChecker";
let timeUpdateInterval;

export default {
  data(vm) {
    return {
      drawer: false,
      dialogSearch: vm.$route.query.search ? true : false,
      tab: null,
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
    ...mapState("timer", ["time", "timePeriod", "payment"]),
    ...mapState("checkout", ["type"]),
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
  watch: {
    type(newValue, oldValue) {
      if(newValue == undefined || oldValue == undefined) return;
      const data = timeChecker(this.type, this.time);
      this.$store.dispatch("timer/setData", data);
    },
    payment(newValue, oldValue) {
      if(this.payment == false){
        const data = timeChecker("pre_order", this.time);
        this.$store.dispatch("timer/setData", data);
      }
    }
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
    }
  },
  async mounted() {
    await getServerTime().then((response) => {
      this.$store.dispatch("timer/setTime", response.timer);
      const data = timeChecker(this.type, response.timer);
      console.log(data);
      this.$store.dispatch("timer/setData", data);
    });
    timeUpdateInterval = setInterval(async () => {
      await getServerTime().then((response) => {
        this.$store.dispatch("timer/setTime", response.timer);
        const data = timeChecker(this.type, response.timer);
        this.$store.dispatch("timer/setData", data);
      })
    }, this.timePeriod);
  },
  beforeDestroy() {
    clearInterval(timeUpdateInterval);
  }
};
</script>

<style scoped>
header {
  background: #fff !important;
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

:deep(.v-toolbar__content) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>