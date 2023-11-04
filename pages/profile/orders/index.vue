<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <v-col cols="12">
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h3 :class="{
            'font-weight-bold font-primary ': true,
            'font--size__30': $vuetify.breakpoint.mobile,
            'font--size__40': !$vuetify.breakpoint.mobile,
          }">
            {{ $t("profile.orders.my_orders") }}
          </h3>
          <span class="font-primary font-weight-bold text-right">{{ orders.length }} {{ $t("profile.orders.order.plural")
          }}</span>
        </div>
        <!-- <v-row>
          <v-col :cols="!$vuetify.breakpoint.mobile ? 10 : 12" />
          <v-col :cols="!$vuetify.breakpoint.mobile ? 2 : 6">
            <v-select
            v-model="status"
              :items="statuses"
              item-text="label"
              item-value="value"
              :label="$t('profile.orders.status.status')"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row> -->
        <v-divider class="mt-4 mb-10"></v-divider>
        <v-row>
          <v-col cols="12" v-for="order in orders" :key="order.id">
            <v-card rounded="lg" class="py-3" :style="order.isSuccess === 0 ? 'border: 3px solid #fb8c00;' : 'border: 2px solid #65382c;'">
              <v-card-text>
                <v-row>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 10 : 12">
                    <v-row>
                      <v-col cols="6">
                        <p class="font-weight-bold text-subtitle-1">
                          {{ $t("profile.orders.order_no") }}:
                          {{ order.id }}
                        </p>
                      </v-col>
                      <v-col cols="6" v-if="order.isSuccess === 0">
                        <p class="font-weight-bold text-subtitle-1">
                          {{ $t("profile.orders.orders_details.status") }}:
                          <span class="warning--text">
                            {{ $t(`profile.orders.orders_details.hold`)}}
                          </span>
                        </p>
                      </v-col>
                      <v-col cols="6" v-if="order.status !== 'created' && order.isSuccess === 1">
                        <p class="font-weight-bold text-subtitle-1">
                          {{ $t("profile.orders.orders_details.status") }}:
                          {{ $t(`profile.orders.orders_details.${order.status}`)}}
                        </p>
                      </v-col>
                      <v-col cols="6">
                        <p class="font-weight-bold text-subtitle-1">
                          {{ $t("profile.orders.order_date") }} :
                          {{ order.created_at }}
                        </p>
                      </v-col>
                      <v-col cols="6">
                        <p class="font-weight-bold text-subtitle-1">
                          {{ $t("profile.orders.order_total_cost") }} :
                          {{ order.total }} KWD
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="#65382c" dark nuxt link :to="localePath('/profile/orders/' + order.id)">
                      {{ $t("profile.orders.show_details") }}</v-btn>
                  </v-col>
                  <!-- <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6">
                                    <p class="font-weight-bold text-subtitle-1">#Items</p>
                                    <p>{{ order.products.length }}</p>
                                </v-col> -->
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <CommonEmptyPage icon="mdi-shopping" :text="$t('profile.orders.no_orders')"
          v-if="!orders.length && !this.loading">
          <v-btn x-large elevation="0" class="mt-10" nuxt color="Newprimary" to="/products">{{
            $t("profile.orders.shop_now") }}</v-btn>
        </CommonEmptyPage>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Product from "@/components/common/Product.vue";
import { get } from "@/apis/orders";
export default {
  components: {
    Product,
  },
  data() {
    return {
      loading: false,
      status: 0,
      range: 0,
      statuses: [
        {
          label: this.$t("profile.orders.status.created"),
          value: "created",
        },
        {
          label: this.$t("profile.orders.status.paid"),
          value: "paid",
        },
        {
          label: this.$t("profile.orders.status.in_progress"),
          value: "in_progress",
        },
        {
          label: this.$t("profile.orders.status.ready_for_delivery"),
          value: "ready_for_delivery",
        },
        {
          label: this.$t("profile.orders.status.on_the_way"),
          value: "on_the_way",
        },
        {
          label: this.$t("profile.orders.status.delivered"),
          value: "delivered",
        },
        {
          label: this.$t("profile.orders.status.cancelled"),
          value: "cancelled",
        },
      ],
      ranges: [
        { label: this.$t("profile.orders.range.past"), value: "past" },
        { label: this.$t("profile.orders.range.upcoming"), value: "upcoming" },
      ],
      orders: [],
      orders: [],
      total: 0,
    };
  },
  methods: {
    // sortOrder(a, b) {
    //   return new Date(b.created_at) - new Date(a.created_at)
    // },
    getOrders() {
      get().then((data) => {
        this.orders = data.data;
        this.total = data.meta.total;
      });
    },
  },
  watch: {
    status() {
      this.getOrders();
    },
    range() {
      this.getOrders();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style>
.font--size__40 {
  font-size: 2.5rem !important;
}

.font--size__30 {
  font-size: 1.5rem !important;
}

.v-application .primary {
  background-color: #65382c !important;
  border-color: #65382c !important;
}
</style>
