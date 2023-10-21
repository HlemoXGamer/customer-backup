<template>
  <v-dialog
    @click:outside="$router.go(-1)"
    hide-overlay
    class="profile-dialog"
    :value="value"
  >
    <div class="profile-menu">
      <div class="profile-menu-header">
        <div class="profile">
          <div class="profile-photo">
            <v-icon>mdi-account</v-icon>
          </div>
          <div class="profile-info">
            <span>{{ hi }}</span>
          </div>
        </div>
        <v-btn
          @click="$router.push({ query: { settings: true } })"
          rounded
          elevation="0"
          class="settings bg-transparent"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
      <div class="profile-menu-list">
        <div class="profile-menu-list-item">
          <v-icon color="#666">mdi-account</v-icon>
          <nuxt-link :to="localePath('/profile')">{{
            $t("dialog.profile")
          }}</nuxt-link>
        </div>
        <div class="profile-menu-list-item">
          <v-icon color="#666">mdi-playlist-star</v-icon>
          <nuxt-link :to="localePath('/profile/orders')">{{
            $t("dialog.your_orders")
          }}</nuxt-link>
        </div>
        <div class="profile-menu-list-item">
          <v-icon color="#666">mdi-map-marker-account-outline</v-icon>
          <nuxt-link :to="localePath('/profile/addresses')">{{
            $t("dialog.addresses")
          }}</nuxt-link>
        </div>

        <div class="profile-menu-list-item">
          <v-icon color="#666">mdi-bell</v-icon>
          <nuxt-link
            :to="
              localePath(
                $route.query.notification
                  ? ''
                  : {
                      query: {
                        notification: true,
                      },
                    },
                $i18n.locale
              )
            "
            >{{ $t("dialog.notifications") }}</nuxt-link
          >
        </div>
        <div class="profile-menu-list-item">
          <v-icon color="#666">mdi-information-outline</v-icon>
          <nuxt-link :to="localePath('/contact-us')">{{
            $t("dialog.about_us")
          }}</nuxt-link>
        </div>

        <div class="profile-menu-list-item" @click="logout">
          <v-icon color="#666">{{
            $i18n.locale === "en" ? "mdi-arrow-left" : "mdi-arrow-right"
          }}</v-icon>
          <v-btn class="p-0 m-0 ml-0 mr-0" text>{{ $t("common.logout") }}</v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import { get as getProfile } from "@/apis/profile";
import { guest } from "@/apis/auth";

export default {
  props: ["value"],
  data: () => ({
    languageDialog: true,
    name: "",
  }),
  computed: {
    hi() {
      if (this.$i18n.locale === "en") {
        return "Hi " + this.name;
      } else {
        return "مرحباً " + this.name;
      }
    },
  },
  methods: {
    showLanguageDialog() {
      this.languageDialog = true;
    },
    async getProfile() {
      try {
        const {
          data: { user },
        } = await getProfile();
        this.name = user.name;
      } catch (err) {
        this.name = "guest";
      }
    },
    async logout() {
      this.$store.commit("cart/CLEAR_ALL");

      await this.$auth.logout();
      guest();
    },
  },
  created() {
    this.getProfile();
  },
};
</script>
<style lang="scss" scoped>
.profile-menu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  background: #fff;
  padding: 1rem;
}

.profile-menu-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .profile {
    display: flex;
    align-items: center;
    .profile-photo {
      width: 38px;
      height: 38px;
      border: 2px solid #000;
      text-align: center;
      line-height: 38px;
      border-radius: 50%;
      box-sizing: content-box;
      color: #000;
    }
    .profile-info {
      padding-left: 1rem;
      font-weight: bold;
    }
  }
}

.profile-menu-list .profile-menu-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  a {
    color: #000;
    font-weight: 500;
    margin-left: 1rem;
    text-decoration: none;
    text-transform: capitalize;
  }
}

[dir="rtl"] {
  .profile-menu-list .profile-menu-list-item a {
    margin-left: unset;
    margin-right: 1rem;
  }

  .profile {
    .profile-info {
      padding-left: unset;
      padding-right: 1rem;
    }
  }
}
</style>
