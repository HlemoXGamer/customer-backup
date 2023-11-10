<template>
  <v-card
    :color="checkout_loading ? '' : 'grey lighten-4'"
    rounded="lg"
    :loading="checkout_loading"
    :disabled="checkout_loading"
  >
    <v-card-text class="pa-8">
      <p class="text-h6 font-weight-bold grey--text text--darken-1">
        {{ $t("checkout.summary") }}
      </p>
      <template v-if="items && items.length > 0">
        <div v-for="item in items" :key="item.id" class="dropcart__product">
          <div class="dropcart__product-info">
            <div class="dropcart__product-name row">
              <span class="col-8 font-primary">
                {{ i18n_me(item.product.name_ar, item.product.name_en) }} x
                {{ item.quantity }}
              </span>
              <span class="col-4 dropcart__product-price">
                KWD {{ item.price }}</span
              >
            </div>
          </div>
        </div>

        <div
          :class="`dropcart__totals text-${
            $i18n.locale === 'ar' ? 'right' : 'left'
          } font-primary`"
        >
          <table>
            <tbody>
              <template>
                <tr>
                  <th>{{ $t("checkout.sub_total") }}</th>
                  <td>KWD {{ total }}</td>
                </tr>
                <tr v-if="newSubTotal">
                  <th>{{ $t("checkout.new_sub_total") }}</th>
                  <td>KWD {{ newSubTotal }}</td>
                </tr>
                <tr v-if="discount">
                  <th>{{ $t("checkout.discount") }}</th>
                  <td class="font-weight-bold green--text text--lighten-1">
                    {{ discount }}
                  </td>
                </tr>
                <tr>
                  <th>{{ $t("checkout.delivery_cost") }}</th>
                  <td>KWD {{ delivery_cost }}</td>
                  <!-- <td>KWD {{ delivery_fee }}</td> -->
                </tr>
                <!-- <tr>
                  <th>{{ $t("common.service_cost") }}</th>
                  <td>KWD 0.450</td>
                </tr> -->
              </template>
              <tr>
                <th
                  colspan="2"
                  style="background-color: #99999930; height: 1px"
                ></th>
              </tr>

              <tr class="mt-5">
                <th>{{ $t("checkout.total") }}</th>
                <td v-if="!newSubTotal">KWD {{ total + delivery_fee }}</td>
                <td v-else>KWD {{ newSubTotal + delivery_fee }}</td>
              </tr>
              <tr>
                <td colspan="2" class="text-center font-weight-bold pt-5">
                  {{ $t("checkout.estimated_message") }}

                  <span style="display: block">{{
                    calculateEstimatedTime(
                      est_time,
                      $t("checkout.day"),
                      $t("checkout.hour"),
                      $t("checkout.minute")
                    )
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!-- <div class="d-flex align-center justify-space-between">
            <p class="text-subtitle-1">Subtotal:</p>
            <p class="text-subtitle-1 font-weight-bold black--text">
                {{ sub_total }} KWD
            </p>
        </div>
        <div class="d-flex align-center justify-space-between">
            <p class="text-subtitle-1">Shipping:</p>
            <p class="text-subtitle-1 font-weight-bold green--text text--lighten-1">
                {{ shipping == 0 ? "Calculated Later" : shipping + " KWD" }}
            </p>
        </div> -->
      <!-- <div class="d-flex align-center justify-space-between">
        <p class="text-subtitle-1">{{ $t("checkout.discount") }}:</p>
        <p class="text-subtitle-1 font-weight-bold green--text text--lighten-1">
          {{ discount }} KWD
        </p>
      </div> -->

      <!-- <v-expansion-panels accordion v-if="step == 3">
        <v-expansion-panel class="shadow-none">
          <v-expansion-panel-header color="grey lighten-2">
            Do You Have Coupon ?
          </v-expansion-panel-header>
          <v-expansion-panel-content color="grey lighten-2" class="pt-3 pb-1">
            <v-text-field solo label="Coupon code" flat class="rounded-lg" outlined v-model="coupon">
              <template #append>
                <v-btn elevation="0" @click="applyCoupon">apply</v-btn>
              </template>
            </v-text-field>

            <v-list rounded dense v-if="checkout.discounts && checkout.discounts.length">
              <v-list-item v-for="(discount, index) in checkout.discounts" :key="discount.id" dense>
                <v-list-item-content>
                  <v-list-item-title v-text="discount.code"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon>
                    <v-icon :disabled="loading" color="red lighten-1"
                      @click="removeDiscount(index, discount.id)">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->
    </v-card-text>

    <!-- <v-card-actions class="pa-8 pb-3">
      <div class="flex-grow-1"> -->
    <!-- <div class="d-flex justify-space-between font-weight-bold text-h6">
                <p>Total</p>
                <p>{{ total }} KWD</p>
            </div> -->

    <!-- <v-btn
          x-large
          class="rounded-lg"
          height="57"
          color="light-blue darken-3"
          elevation="0"
          dark
          block
        >
          Place Order
        </v-btn> -->
    <!-- </div>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import { show as getBranch } from "@/apis/branches";
export default {
  computed: {
    ...mapState("cart", [
      "items",
      "total",
      "delivery_cost",
      "delivery_fee",
      "est_time",
    ]),
    ...mapState("checkout", ["step", "checkout", "checkout_loading"]),
    ...mapGetters("checkout", ["shipping", "sub_total"]),
    ...mapFields("checkout", ["form.is_pickup", "form.delivery_date"]),
  },
  data() {
    return {
      is_picked: false,
      disabled: false,
      same_day: false,
      label: false,
      checkbox_req: false,
      branch_start: "",
      branch: "",
      same_date_branch: {},
      loading: false,
      // quantity: 1,
      // totals: [],
      // total: 0,
      // items: [
      //   {
      //     name: "French Croissants",
      //     id: 0,
      //     quantity: 1,
      //     desc: "ngus, beef, cheese, onion, Tomato jam, piks",
      //     categories: "Cake",
      //     price: 250,
      //     mediaUrl:
      //       "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
      //   },
      //   {
      //     name: "English Croissants",
      //     id: 1,
      //     desc: "ngus, beef, cheese, onion, Tomato jam, piks",
      //     categories: "Cake",
      //     price: 100,
      //     quantity: 1,
      //     mediaUrl:
      //       "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
      //   },
      // ],
    };
  },
  mounted() {
    // this.calculateTotals();
    this.setPicked();
    this.get_branch();
  },
  methods: {
    get_branch() {
      getBranch(localStorage.getItem("guest_branch")).then(({ data }) => {
        this.branch = data;
      });

      getBranch(2).then(({ data }) => {
        this.same_date_branch = data;
      });
    },
    calculateEstimatedTime(totalmins, d, h, m) {
      if (Math.sign(totalmins) != -1) {
        var mins = totalmins % 60;
        var hours = Math.floor(totalmins / 60);
        var days = Math.floor(hours / 24);
        var hourss = hours % 24;
        return (
          days + " " + d + " - " + hourss + " " + h + " - " + mins + " " + m
        );
      } else {
        var absTotal = Math.abs(totalmins);
        var mins = absTotal % 60;
        var hours = Math.floor(absTotal / 60);
        var days = Math.floor(hours / 24);
        var hourss = hours % 24;
        return (
          ":" +
          days +
          " " +
          d +
          " - " +
          hourss +
          " " +
          h +
          " - " +
          mins +
          " " +
          m
        );
      }
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    setPicked() {
      let branch_id = 0;
      let area = " ";
      if (this.$auth.loggedIn) {
        if (localStorage.getItem("default_area")) {
          area = JSON.parse(localStorage.getItem("default_area"));
          branch_id = area["branches"][0]["id"];
        } else {
          branch_id = JSON.parse(localStorage.getItem("default_address"))[
            "branch_id"
          ];
        }
      } else {
        branch_id = localStorage.getItem("guest_branch");
      }

      getBranch(branch_id)
        .then(({ data }) => {
          this.branch = data;
          const timer = new Date();
          const start = this.branch.start.split(":")[0];
          const end = this.branch.end.split(":")[0];
          this.branch_start = start;
          if (
            ((timer.getHours() >= parseInt(end) && parseInt(end) > 12) ||
              timer.getHours() < parseInt(start)) &&
            timer.getHours() % 24 >= parseInt(end)
          ) {
            this.is_picked = true;
            this.disabled = true;
            this.label = true;
            this.$store.commit("checkout/SET_IS_PICKUP", true);
          } else {
            this.is_picked = false;
            this.disabled = false;
            this.label = false;
            this.$store.commit("checkout/SET_IS_PICKUP", false);
          }

          if (timer.getHours() >= 0 && parseInt(start) > timer.getHours()) {
            this.is_picked = false;
            this.same_day = true;
            this.checkbox_req = true;
            this.$store.commit("checkout/SET_IS_PICKUP", true);
          }
        })
        .catch((err) => {
          if (err === "You Are Trying To Access A Forbidden Request") {
            this.$router.push(this.localePath("/profile/orders"));
          }
          if (err === "Unauthenticated.") {
            this.$router.push({
              path: this.localePath("/login"),
              query: { order_id: this.id },
            });
          }
        });
    },
    reverseCheckbox(chckbox) {
      if (this.same_day === true || this.is_picked === true) {
        this.$store.commit("checkout/SET_IS_PICKUP", true);
      } else {
        this.$store.commit("checkout/SET_IS_PICKUP", false);
        this.$store.commit("checkout/SET_DELIVERY_DATE", null);
      }
      const timer = new Date();
      if (
        this.checkbox_req === true &&
        timer.getHours() >= 0 &&
        parseInt(this.branch_start) > timer.getHours()
      ) {
        this[chckbox] = true;
      } else {
        this.checkbox_req = false;
      }
    },
  },
};
</script>
<style scoped>
.dropcart__totals {
  padding: 16px 6px 0;
}

.dropcart__product-info .font-primary {
  font-size: 1rem !important;
}

.dropcart__totals.font-primary {
  font-size: 1rem !important;
}

.dropcart__totals th {
  padding-right: 16px;
  text-align: left;
}

[dir="rtl"] .dropcart__totals th {
  padding-left: 16px;
  padding-right: unset;
  text-align: right;
}

.dropcart__totals td {
  text-align: right;
}

[dir="rtl"] .dropcart__totals td {
  text-align: left;
}

.dropcart__totals table {
  width: 100%;
}
</style>
