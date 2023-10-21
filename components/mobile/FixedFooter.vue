<template>
  <div class="fixed-footer" v-if="$vuetify.breakpoint.mobile">
    <nuxt-link
      :to="localePath($auth.loggedIn ? goToHome : '/login', $i18n.locale)"
      class="logo fixed-footer-item"
    >
      <v-icon>mdi-home</v-icon>
      <span class="fixed-footer-text"> {{ $t("dialog.home") }} </span>
    </nuxt-link>
    <nuxt-link
      :to="
        localePath(
          $route.query.cart
            ? ''
            : {
                query: {
                  cart: true,
                },
              },
          $i18n.locale
        )
      "
      class="profile fixed-footer-item"
    >
      <v-badge
        :content="count"
        :value="count"
        overlap
        offset-y=""
        color="#65382c"
      >
        <v-icon color="">mdi-cart</v-icon>
      </v-badge>
      <span class="fixed-footer-text"> {{ $t("dialog.cart") }} </span>
    </nuxt-link>
    <nuxt-link
      :to="
        localePath(
          $route.query.menu
            ? ''
            : {
                query: {
                  menu: true,
                },
              },
          $i18n.locale
        )
      "
      class="orders fixed-footer-item"
    >
      <v-icon color="">mdi-account</v-icon>
      <span class="fixed-footer-text"> {{ $t("dialog.account") }} </span>
    </nuxt-link>

    <AccountDialog v-model="dialogProfile" />
    <CartDialog v-model="dialogCart" />
    <SettingDialog v-model="dialogSettings" />
    <NotificationDialog v-model="dialogNotification" />
  </div>
</template>
<script>
import AccountDialog from "@/components/mobile/AccountDialog";
import CartDialog from "@/components/mobile/CartDialog";
import SettingDialog from "@/components/mobile/SettingDialog";
import NotificationDialog from "@/components/mobile/NotificationDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    AccountDialog,
    CartDialog,
    SettingDialog,
    NotificationDialog,
  },
  data: (vm) => ({
    dialogProfile: vm.$route.query.menu ? true : false,
    dialogCart: vm.$route.query.cart ? true : false,
    dialogSettings: vm.$route.query.settings ? true : false,
    dialogNotification: vm.$route.query.notification ? true : false,
  }),
  watch: {
    "$route.query": {
      handler(query, oldQuery) {
        this.dialogCart = false;
        this.dialogProfile = false;
        this.dialogSettings = false;
        this.dialogNotification = false;

        if (query.menu) {
          this.dialogProfile = true;
        } else if (query.cart) {
          this.dialogCart = true;
        } else if (query.settings) {
          this.dialogSettings = true;
        }else if (query.notification) {
          this.dialogNotification = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("cart", ["count"]),
    goToHome() {
      return ("/location");
      const default_location = localStorage.getItem("default_location");
      if (!default_location) {
        return ("/location");
      } else {
        return ("/products");
      }
    },
  },
};
</script>
<style scoped>
.fixed-footer {
  bottom: 0;
  border-top: 2px solid #6c352975;
  /* left: 50%;
  transform: translateX(-50%); */
  /* padding-top: 3rem; */
  position: fixed;
  width: 100%;
  height: 10vh;
  border-radius: 0.2rem;
  background: #fff;
  color: #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
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
  color: #65382c !important;
}
.fixed-footer-item .v-icon {
  color: inherit;
}
.fixed-footer-item .fixed-footer-text {
  color: inherit;
  font-size: 0.9rem;
  font-weight: bold;
}
.logo {
  /* color: #6c3529; */
  font-weight: bold;
  font-size: 32px;
}
</style>
