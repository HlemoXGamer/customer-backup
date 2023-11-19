<template>
  <client-only>
    <v-row :class="$vuetify.breakpoint.mobile ? 'flex-column-reverse' : ''">
      <v-col :cols="step < 5 && !$vuetify.breakpoint.mobile ? 12 : 12">
        <v-stepper :value="step" elevation="0">
          <v-card elevation="0" color="#fff6ee" class="rounded-lg mb-10" v-if="step < 5">
            <v-card-text class="pt-0 pb-5 d-flex align-center justify-space-around"
              :class="{ 'px-16': !$vuetify.breakpoint.mobile }">
              <div class="d-flex flex-column align-center justify-center pt-15" style="width:130px">
                <div class="step-btn" :class="{ active: step == 1, complete: step > 1 }">
                  <v-btn :ripple="false" fab elevation="0">
                    <v-icon v-if="step > 1">mdi-check</v-icon>
                    <ShippingIcon v-else />
                  </v-btn>
                </div>
                <p class="font-weight-bold mt-5" :class="[step >= 1 ? 'brown--text' : 'grey--text']">
                  {{ $t("checkout.shipping.shipping") }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex flex-column align-center justify-center pt-15" style="width:130px">
                <div class="step-btn" :class="{ active: step == 2, complete: step > 2 }">
                  <v-btn :ripple="false" fab elevation="0">
                    <v-icon v-if="step > 1">mdi-check</v-icon>

                    <v-icon v-else>mdi-clock-outline</v-icon>
                  </v-btn>
                </div>
                <p class="font-weight-bold mt-5" :class="[step >= 2 ? 'brown--text' : 'grey--text']">
                  {{ $t("checkout.shipping.time") }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex flex-column align-center justify-center pt-15" style="width:130px">
                <div class="step-btn" :class="{ active: step == 3, complete: step > 3 }">
                  <v-btn :ripple="false" fab elevation="0">
                    <v-icon v-if="step > 2">mdi-check</v-icon>
                    <v-icon v-else>mdi-script-text-outline</v-icon>
                  </v-btn>
                </div>
                <p class="font-weight-bold mt-5" :class="[step >= 3 ? 'brown--text' : 'grey--text']">
                  {{ $t("Summary") }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex flex-column align-center justify-center pt-15" style="width:130px">
                <div class="step-btn" :class="{ active: step == 4, complete: step > 4 }">
                  <v-btn :ripple="false" fab elevation="0">
                    <v-icon v-if="step > 3">mdi-check</v-icon>
                    <PaymentIcon v-else />
                  </v-btn>
                </div>
                <p class="font-weight-bold mt-5" :class="[step >= 4 ? 'brown--text' : 'grey--text']">
                  {{ $t("checkout.shipping.payment_methods") }}
                </p>
              </div>
            </v-card-text>
          </v-card>
          <v-stepper-items>
            <v-stepper-content step="1">
              <CheckoutShipping />
            </v-stepper-content>

            <v-stepper-content step="2">
              <CheckoutPickTime v-if="step == 2" />
            </v-stepper-content>

            <v-stepper-content step="3">
              <CheckoutSummary v-if="step == 3" />
            </v-stepper-content>

            <v-stepper-content step="4">
              <CheckoutPayment />
            </v-stepper-content>
            <v-stepper-content step="5">
              <CheckoutSuccess />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </client-only>
</template>
<script>
import CountryCityCombo from "@/components/common/CountryCityCombo.vue";
import AddressSelector from "@/components/addresses/AddressSelector.vue";
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import { required, helpers } from "vuelidate/lib/validators";

import { mapFields } from "vuex-map-fields";

import ShippingIcon from "~/static/images/shipping.svg?inline";
import PaymentIcon from "~/static/images/payment.svg?inline";
import SecurityIcon from "~/static/images/security.svg?inline";
import OfficeIcon from "~/static/images/office.svg?inline";

export default {
  layout: "checkout",
  fetchOnServer: false,
  components: {
    CountryCityCombo,
    OrderSummary,
    AddressSelector,
    ShippingIcon,
    PaymentIcon,
    SecurityIcon,
    OfficeIcon,
  },
  data() {
    return {
      showAddMessage: false,
    };
  },
  async fetch() {
    try {
      await this.$store.dispatch("checkout/get");
    } catch (error) { }
  },
  computed: {
    ...mapFields("checkout", ["step", "form.address_id", "selectedShipping"]),
  },
  methods: {
    checkout() {
      this.$store.dispatch("checkout/checkout");
    },
    showPayment() {
      this.$store.commit("checkout/SHOW_PAYMENT");
    },
  },
  validations() {
    return {
      form: {
        user_data: {
          name: {
            required: helpers.withParams(
              {
                lang: this.$i18n.locale,
              },
              required
            ),
          },
          phone: {
            required: helpers.withParams(
              {
                lang: this.$i18n.locale,
              },
              required
            ),
          },
          email: {
            required: helpers.withParams(
              {
                lang: this.$i18n.locale,
              },
              required
            ),
          },
          address: {
            country_id: {
              required: helpers.withParams(
                {
                  lang: this.$i18n.locale,
                },
                required
              ),
            },
            city_id: {
              required: helpers.withParams(
                {
                  lang: this.$i18n.locale,
                },
                required
              ),
            },
            address: {
              required: helpers.withParams(
                {
                  lang: this.$i18n.locale,
                },
                required
              ),
            },
            apartment: {
              required: helpers.withParams(
                {
                  lang: this.$i18n.locale,
                },
                required
              ),
            },
          },
        },
      },
    };
  },
  mounted(){
    this.$store.commit("checkout/SHOW_SHIPPING");
  }
};
</script>

<style scoped>
.step-btn {
  border: 3px solid transparent;
  border-radius: 100%;
}

.step-btn.active {
  border: 3px solid #65382c;
  border-radius: 100%;
}

.step-btn svg * {
  fill: grey !important;
}

.step-btn.active svg * {
  fill: #fff !important;
}

.step-btn.complete i {
  color: #fff !important;
}

.step-btn .v-btn {
  margin: 3px;
  background: white !important;
  color: grey !important;
  border: 3px solid #e6e6e6;
}

.step-btn.active .v-btn {
  margin: 3px;
  background: #65382c !important;
  color: white !important;
  border: 0px solid #e6e6e6;
}

.step-btn.complete .v-btn {
  background: #65382c !important;
  border: 0px solid #e6e6e6;
}
</style>
