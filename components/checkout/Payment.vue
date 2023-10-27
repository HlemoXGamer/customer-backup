<template>
  <div>
    <!-- <Visa /> -->
    <Methods />
    <!-- <v-radio-group v-model="payment_method_code" mandatory class="custom-radio">
      <v-radio :value="3">
        <template v-slot:label>
          <span>Pay Online</span>
          <v-chip color="success">EXTRA 10 EGP OFF</v-chip>
        </template>
      </v-radio>

      <v-radio :value="1">
        <template v-slot:label>
          <span>Cash On Delivery</span>
        </template>
      </v-radio>
    </v-radio-group> -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-2" height="50vh">
        <v-card-text class="pa-5 font-primary font-weight-bold" height="50vh">
          <div class="center text-center">
            <v-img
              src="/images/done.png"
              height="106"
              max-width="106"
              contain
            ></v-img>
            <div class="text-center mt-3 mb-3">
              {{ $t("checkout.payment.popup.thanks") }}
            </div>
            <small class="text-center p-2">{{
              $t("checkout.payment.popup.track_help")
            }}</small>
            <div class="d-flex p-2 align-center justify-space-between">
              <small>{{ $t("checkout.payment.popup.order_num") }}:2366</small>
              <small
                >{{ $t("checkout.payment.popup.date") }}:August 14, 2022</small
              >
            </div>
            <v-btn
              color="primary"
              rounded
              @click="dialog = false"
              d-block
              class="text-center mt-3 mb-3"
            >
              {{ $t("checkout.payment.popup.track_button") }}
            </v-btn>
            <div class="text-center mt-3 mb-3">
              <small>{{ $t("checkout.payment.popup.order_somthing") }}</small>
            </div>
          </div>
        </v-card-text>
        <!-- <v-card-actions>
                <v-spacer></v-spacer>

            </v-card-actions> -->
      </v-card>
    </v-dialog>
    <v-card-actions
      class="justify-space-between px-0 mt-5"
      :class="$vuetify.breakpoint.xs ? 'flex-wrap-reverse' : ''"
    >
      <v-btn
        @click="back"
        elevation="0"
        text
        color="grey"
        large
        dark
        style="background: transparent !important"
        :class="$vuetify.breakpoint.xs ? 'mt-4' : ''"
      >
        <v-icon
          :left="$i18n.locale === 'en'"
          :right="$i18n.locale === 'ar'"
          large
        >
          mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
        </v-icon>
        {{ $t("checkout.payment.return") }}
      </v-btn>
      <v-btn
        x-large
        class="rounded-lg"
        height="57"
        color="#65382c"
        elevation="0"
        dark
        :loading="loading"
        :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }"
        @click="confirm"
      >
        {{ $t("checkout.payment.confirm") }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Visa from "./Visa";
import Methods from "./Methods";
export default {
  components: {
    Visa,
    Methods,
  },
  data() {
    return {
      dialog: false,
      tips: [5, 15, 20],
      customTip: null,
      loading: false,
    };
  },
  computed: {
    ...("checkout", ["loading"]),
    ...mapFields("checkout", [
      "form.payment_method_code",
      "form.tipping",
      "form",
      "selectedTip",
    ]),
    ...mapGetters("cart", ["getItems"]),
  },
  watch: {
    selectedTip(val) {
      if (val == null) return;

      this.customTip = null;
      if (val == 3) return this.setTip(0);

      this.setTip(this.getTipValue(this.tips[val]));
    },
  },
  methods: {
    getTipValue(percentage) {
      const total = 500;

      return (percentage / 100) * total;
    },
    setTip(tip) {
      this.$store.commit("checkout/SET_TIP", tip);
    },

    setCustomTip() {
      if (this.customTip == null || this.customTip <= 0) return;

      this.selectedTip = null;

      this.$store.commit("checkout/SET_TIP", parseInt(this.customTip));
    },
    async confirm() {
      console.log(this.form.is_pickup);
      if (this.form.is_pickup && this.form.is_pickup !== false) {
        let time = this.form.delivery_time;
        console.log(time);
        if (!time.A.length || !time.hh.length || !time.mm.length) {
          this.$toast.error(this.$t("checkout.delivery_time_required"));
        } else {
          console.log("1");
          this.$store.dispatch("cart/get").then(() => {
            if (
              this.getItems.find((item) => !item.product.in_stock) === undefined
            ) {
              this.$store.dispatch("checkout/confirm");
            } else {
              this.$toast.error(this.$t("checkout.out_of_stock"));
              // this.loading = false;
            }
          });
        }
      } else {
        console.log(this.form.delivery_date);

        this.$store.dispatch("cart/get").then(() => {
          if (
            this.getItems.find((item) => !item.product.in_stock) === undefined
          ) {
            this.$store.dispatch("checkout/confirm");
          } else {
            this.$toast.error(this.$t("checkout.out_of_stock"));
            // this.loading = false;
          }
        });
      }

      // this.dialog = true;
      // this.loading = true;
    },
    back() {
      this.$store.commit("checkout/SHOW_TIME");
    },
  },
};
</script>
