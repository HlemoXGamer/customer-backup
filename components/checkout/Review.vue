<template>
  <v-card>
    <v-card-text class="pt-0">
      <p class="text-body-1 grey--text">
        Review your oder details: Your order will not be placed until you click
        "Place Order”
      </p>

      <p class="font-weight-bold text-h5 mt-10 black--text">
        Order Information
      </p>

      <v-divider class="mb-5"></v-divider>

      <v-row>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
          <v-card>
            <p class="font-weight-bold text-subtitle-1">Shipping Address</p>

            <v-row>
              <v-col cols="8">
                <ul>
                  <li>{{ user_data.name }}</li>
                  <li>{{ user_data.phone }}</li>
                  <li>{{ user_data.email }}</li>
                  <li>{{ user_data.address.address }}</li>
                  <li>{{ user_data.address.apartment }}</li>
                </ul>
              </v-col>
              <v-col cols="4">
                <v-btn
                  outlined
                  color="blue"
                  small
                  @click="$store.commit('checkout/SHOW_SHIPPING')"
                  >change</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
          <v-card>
            <p class="font-weight-bold text-subtitle-1">Payment</p>

            <v-row>
              <v-col cols="8">
                {{ payment_methods[payment_method_code] }}
              </v-col>
              <v-col cols="4">
                <v-btn
                  outlined
                  color="blue"
                  small
                  @click="$store.commit('checkout/SHOW_PAYMENT')"
                  >change</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <p class="font-weight-bold text-h5 mt-10 black--text">Items</p>

      <v-divider class="mb-5"></v-divider>

      <v-list class="rounded-lg" elevation="2">
        <v-card rounded="lg" v-for="item in items" :key="item.id">
          <v-list-item three-line class="rounded-lg">
            <v-list-item-avatar class="rounded-lg" size="85" color="grey">
              <v-img
                :src="item.product.cover.url"
                width="85"
                height="85"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6 text-white-space">
                {{ item.product.name_en }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-white-space">{{
                item.variant.name
              }}</v-list-item-subtitle>
              <p class="text-subtitle-1 font-weight-bold">
                {{ item.quantity * item.variant.price }}
                <span class="text-subtitle-2">KWD</span>
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list>

      <p class="text-subtitle-1 font-weight-bold mb-2 mt-10">
        Additional Notes
      </p>

      <v-text-field
        outlined
        solo
        class="rounded-lg"
        flat
        height="57"
        label=" Additional notes for customer support team:"
        v-model="notes"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="justify-space-between px-0">
      <v-btn
        nuxt
        to="/cart"
        elevation="0"
        text
        color="grey"
        large
        dark
        class="d-none d-lg-block"
      >
        <v-icon left large> mdi-chevron-left </v-icon> Return to Cart
      </v-btn>
      <v-btn
        x-large
        class="rounded-lg"
        height="57"
        color="light-blue darken-3"
        elevation="0"
        dark
        :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }"
        @click="checkout"
        :loading="loading"
      >
        Checkout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("cart", ["items"]),
    ...mapGetters("cart", ["totalPrice"]),
    ...mapFields("checkout", [
      "form.user_data",
      "form.payment_method_code",
      "form.notes",
      "payment_methods",
    ]),
  },
  methods: {
    checkout() {
      this.loading = true;
      this.$store
        .dispatch("checkout/checkout")
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>