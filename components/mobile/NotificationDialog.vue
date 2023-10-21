<template>
  <v-dialog v-if="value"  @click:outside="$router.go(-1)" hide-overlay :value="value">
    <div class="profile-dialog">
      <div class="white notification-list-wrapper">
        <v-list class="notification-list">
          <v-list-item v-if="notifications.length === 0">
            <v-list-item-title class="px-4 mb-2">
              <h2>
                {{ $t("common.no_notifications") }}
              </h2></v-list-item-title
            >
          </v-list-item>
          <v-list-item
            v-else
            @click="
              $router.push(
                localePath('/profile/orders/' + notification.order_id)
              )
            "
            class="pb-1 px-4"
            v-for="notification in notifications"
            :key="notification.id"
            style="border-bottom:1px solid #eee;"
          >
            <v-list-item-title>
              {{ $t("profile.orders.orders_details.order") }} #{{
                notification.order_id
              }}
              {{ $i18n.locale === "en" ? "is " : ""
              }}{{ $t(`profile.orders.orders_details.${notification.status}`) }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
// import Pusher from 'pusher-js'
// const pusher = new Pusher("269cf0af26cc414b447e",{cluster: "eu"})
// const channel = pusher.subscribe("presence-quickstart");

export default {
  props: ["value"],
  computed : {
    ...mapGetters("notification", {
      notifications: "items",
      notificationTotal: "total",
    }),
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
.notification-list-wrapper {
  height: 100%;
}
.notification-list {
  height: 100%;
  overflow-y: auto;
}
.last-p {
  margin-bottom: 0px;
}
</style>
