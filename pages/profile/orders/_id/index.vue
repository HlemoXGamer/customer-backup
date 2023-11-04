<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <commonPaymentReSchedule :dialog="paymentDialog" :order="order.id" @close="paymentDialog = false" />
    <!-- <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 2">
      <ProfileNav></ProfileNav>
    </v-col> -->
    <v-col cols="12">
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h3 class="font-weight-bold font-primary font--size__40">
            {{ $t("profile.orders.orders_details.orders_details") }}
          </h3>
        </div>
        <v-divider class="mt-4 mb-10"></v-divider>
        <!-- <pre>{{ JSON.stringify(order, null, 4) }}</pre> -->
        <v-card rounded="lg">
          <v-card-text class="">
            <v-row>
              <v-col :cols="!$vuetify.breakpoint.mobile ? 10 : 12">
                <v-row>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.order_no") }}:
                      {{ order.id }}
                    </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6" v-if="order.status !== 'created' && isSuccess === 1">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.status") }}:
                      {{ $t(`profile.orders.orders_details.${order.status}`) }}
                    </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6" v-if="order.isSuccess === 0">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                          {{ $t("profile.orders.orders_details.status") }}:
                          <span class="warning--text">
                            {{ $t(`profile.orders.orders_details.hold`)}}
                          </span>
                        </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.order_date") }} :
                      {{ order.created_at }}
                    </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.order_total_cost") }}
                      : {{ order.total }}
                    </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 12">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.payment_method") }} :
                      {{ $t("profile.orders.orders_details.online_payment") }}
                      <!-- {{ order.payment_method }} -->
                    </p>
                  </v-col>
                  <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 12">
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.shipping_address") }}
                      :
                    </p>
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ order.address_city }}, {{ order.address_area }}
                    </p>
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ order.address }}
                    </p>
                    <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.addresses.phone") }}:
                      <span dir="ltr">{{ order.address_phone }}</span>
                    </p>
                    <!-- <p class="font-weight-bold text-subtitle-1 font-primary">
                      {{ $t("profile.orders.orders_details.shipping_address") }}
                      : {{ order.address_country }}
                      {{ order.address_city }} -->
                    <!-- {{ order.address_building_no }} -->
                    <!-- {{ order.address_floor }} -->
                    <!-- {{ order.address_apartment }} -->
                    <!-- </p> -->
                  </v-col>
                </v-row>
              </v-col>
              <v-col :cols="!$vuetify.breakpoint.mobile ? 2 : 12">
                <div>
                  <v-btn color="primary" @click="rateDialog = true" dark block :class="!canRate ? 'disabled' : ''">{{
                    $t("profile.orders.orders_details.rate.rate") }}</v-btn>
                </div>
                <div>
                  <v-btn color="primary" @click="complaintDialog = true" dark block :class="`mt-5 ${order.can_complain !== 1 ? 'disabled' : ''
                    }`">{{
    $t("profile.orders.orders_details.complaint.complaint")
  }}</v-btn>
                </div>
                <orderRate @changeRate="(value) => {
                    order.review = {
                      comment: value.comment,
                      rate: value.rate,
                    };
                  }
                  " v-model="rateDialog" :order="order" />
                <orderComplaint @changeComplain="(value) => (order.complain = value)" v-model="complaintDialog"
                  :order="order" />
                <div>
                  <v-btn color="#65382c" dark block :class="`mt-5 ${!canCancel ? 'disabled' : isDisabled}`"
                    @click="dialog = true">
                    {{
                      $t("profile.orders.orders_details.cancel_order")
                    }}</v-btn>
                </div>
                <v-dialog v-model="dialog" max-width="500">
                  <v-card class="pa-2">
                    <v-btn color="#65382c" icon @click="dialog = false" class="float-right">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-card-title class="text-h5 text-center font-primary d-block font-weight-bold">
                      <span>
                        {{
                          $t("profile.orders.orders_details.cancel_order")
                        }}</span>
                    </v-card-title>
                    <v-card-text class="pa-5 font-primary font-weight-bold">
                      <p>
                        {{
                          $t(
                            "profile.orders.orders_details.cancel_confirmation",
                            { number: order.id }
                          )
                        }}
                      </p>
                    </v-card-text>
                    <v-card-actions class="d-block align-center text-center pa-3">
                      <v-btn color="btn-cancel-order" rounded @click="cancelOrder">
                        {{ $t("profile.orders.orders_details.yes") }}
                      </v-btn>

                      <v-btn color="btn-cancel-order" rounded @click="dialog = false">
                        {{ $t("profile.orders.orders_details.no") }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <!-- <v-col :cols="!$vuetify.breakpoint.mobile ? 4 : 6">
                                    <p class="font-weight-bold text-subtitle-1">#Items</p>
                                    <p>{{ order.products.length }}</p>
                                </v-col> -->
            </v-row>
          </v-card-text>
        </v-card>

        <p class="text-h5 font-weight-bold mt-8 font-primary">
          {{ $t("profile.orders.orders_details.items_in_order") }}
        </p>
        <v-divider class="my-5"></v-divider>
        <v-list class="rounded-lg" elevation="0">
          <v-card rounded="lg" v-for="product in order.products" :key="product.id">
            <v-list-item three-line class="rounded-lg font-primary">
              <v-list-item-content>
                <v-list-item-title class="text-h6 text-white-space">
                  <div class="d-flex justify-space-between">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <span>
                          {{ i18n_me(product.name_ar, product.name_en) }} x
                          {{ product.quantity }}
                        </span>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <ul>
                          <li style="
                              display: inline-block;
                              margin: 10px 0 10px 10px;
                            " v-for="note in product.cart_notes" :key="note.id">
                            {{ note.note }}
                          </li>
                        </ul>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <p class="text-subtitle-1 font-weight-bold text-right">
                          {{ product.quantity * product.price }}
                          <span class="text-subtitle-2">KWD</span>
                        </p>
                      </v-col>
                    </v-row>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-4 mb-10"></v-divider>
          </v-card>
        </v-list>
        <v-btn class="float-right px-5" color="#65382c" dark @click="reOrder" :loading="loading_reorder"
          v-if="order.status === 'delivered'">
          {{ $t("profile.orders.orders_details.reorder") }}
        </v-btn>
        <v-btn v-else :to="localePath(`/profile/orders/${this.order.id}/track`)" color="#65382c" dark :class="{
          'float-right px-5': true,
          disabled: order.status === 'cancelled',
        }">{{ $t("profile.orders.orders_details.track_my_order") }}</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Product from "@/components/common/Product.vue";
import { mapGetters } from "vuex";
import { cancelOrder, show as getOrder, reorder } from "@/apis/orders";
export default {
  components: {
    Product,
  },
  data(vm) {
    return {
      id: null,
      dialog: false,
      rateDialog: false,
      complaintDialog: false,
      loadingReorder: false,
      isDisabled: "",
      paymentDialog: false,
      form: {
        order_id: vm.$route.params.id,
        comment: "",
        rate: 1,
      },
      order: {},
      // order: {
      //   address: {
      //     city: {},
      //     country: {},
      //   },
      //   products: [],
      // },
    };
  },
  computed: {
    ...mapGetters("cart", ["loading_reorder"]),
    canRate() {
      return (
        this.order.status === "delivered" || this.order.status === "cancelled"
      );
    },
    canCancel() {
      return this.order.can_cancel == 1;
    },
  },
  methods: {
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    cancelOrder() {
      this.loading = true;
      cancelOrder(this.id)
        .then(() => {
          this.loading = false;
          this.dialog = false;
          this.$router.replace(this.localePath("/profile/orders/"));
        })
        .catch((res) => {
          this.$toast.error(res);
          this.loading = false;
          this.dialog = false;
          this.isDisabled = "disabled";
        });
    },
    transformAddress(order) {
      const address_info = [];
      function pushIfTrue(value, text) {
        if (value) {
          address_info.push(`${text} ${value}`);
        }
      }

      pushIfTrue(
        order.address_building_no,
        this.$t("profile.addresses.building_number")
      );
      pushIfTrue(order.address_floor, this.$t("profile.addresses.floor"));
      pushIfTrue(
        order.address_apartment,
        this.$t("profile.addresses.apartment_no")
      );
      pushIfTrue(order.block_no, this.$t("profile.addresses.block_no"));
      pushIfTrue(
        order.address_street_name,
        this.$t("profile.addresses.street_name")
      );

      return address_info.join(", ");
    },
    getOrder() {
      this.loading = true;
      getOrder(this.id)
        .then(({ data }) => {
          this.order = data;
          this.order.address = this.transformAddress(data);
          if (data.review) {
            this.form = data.review;
          }
          if(data.isSuccess === 0){
            this.paymentDialog = true;
          }
          this.loading = false;
        })
        .catch((err) => {
          // if (err === "You Are Trying To Access A Forbidden Request") {
          //   this.$router.push(this.localePath("/profile/orders"));
          // }
          // if (err === "Unauthenticated.") {
          //   this.$router.push({
          //     path: this.localePath("/login"),
          //     query: { order_id: this.id },
          //   });
          // }
        });
    },
    async reOrder() {
      try {
        this.loadingReorder = true;
        this.$store.dispatch("cart/reOrder", this.id);
      } catch (err) {
      } finally {
        this.loadingReorder = false;
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getOrder();
  },
  // async fetch() {
  //   await show(this.$route.params.id).then((data) => {
  //     this.order = data.data;
  //   });
  // },
};
</script>

<style>
.font--size__40 {
  font-size: 2.5rem !important;
}

.btn-cancel-order {
  background-color: #65382c !important;
  border-color: #65382c !important;
  color: #fff !important;
}
</style>
