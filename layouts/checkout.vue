<template>
  <v-app :dir="dir" :class="{ 'checkout-page': true, 'dialog-open': dialog }">
    <VmHeader />
  <!--   <v-app-bar hide-on-scroll color="#ecbaa8" elevation="0" app height="80">
      <div class="d-flex flex-grow-1 align-center justify-space-around py-5">
        <v-btn
          nuxt
          :to="localePath('/products')"
          elevation="0"
          text
          color="#65382c"
          dark
          class="d-none d-lg-inline-flex"
        >
          <v-icon
            :left="$i18n.locale === 'en'"
            :right="$i18n.locale === 'ar'"
            large
          >
            mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
          </v-icon>
          {{ $t("checkout.continue_shop") }}
        </v-btn>
        <nuxt-link :to="goToHome">
          <v-img
            height="70"
            max-width="120"
            contain
            src="/images/big-logo-no-text.png"
            class="logo"
          ></v-img>
        </nuxt-link>
        <v-menu
          v-model="menu"
          absolute
          :position-y="70"
          :position-x="positionX"
          offset-y
        >
          <div class="white">
            <miniCart
              :sub_total.sync="total"
              :delivery_fee.sync="delivery_fee"
              :delivery_cost.sync="delivery_cost"
              :minimum_charge.sync="minimum_charge"
              :items.sync="getItems"
              @click.stop.prevent
            />
          </div>
        </v-menu>
        <v-badge :content="count" bordered overlap color="#65382c">
          <v-btn
            ref="cart"
            outlined
            elevation="0"
            class="rounded-lg cart-btn"
            x-large
            color="#65382c"
            @click="openCart"
          >
            <v-icon large> mdi-shopping </v-icon>
          </v-btn>
        </v-badge>
      </div>
    </v-app-bar> -->
    <v-main>
      <v-container class="py-16">
        <Nuxt />
      </v-container>
    </v-main>
    <VmFooter v-if="!$vuetify.breakpoint.mobile" />

    <v-dialog v-model="dialog" class="dialog-checkout" hide-overlay>
      <miniCart
        :sub_total.sync="total"
        :delivery_fee.sync="delivery_fee"
        :delivery_cost.sync="delivery_cost"
        :minimum_charge.sync="minimum_charge"
        :items.sync="getItems"
        @close="dialog = false"
        @click.stop.prevent
      />
    </v-dialog>

    <!-- <v-footer absolute dark app padless color="grey ">
      <v-card class="flex pa-10 pb-4" flat tile>
        <v-row class="mb-10">
          <v-col
            :cols="$vuetify.breakpoint.mobile ? 12 : 4"
            class="d-flex align-center justify-center"
          >
            <p class="text-h5 font-weight-bold mb-0">
              {{ $t("checkout.footer.help") }}
            </p>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
            <v-row>
              <v-col cols="4">
                <v-list-item two-line>
                  <v-list-item-icon>
                    <v-icon size="35">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t("checkout.footer.call") }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      (+20) 109 266 4805
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item two-line>
                  <v-list-item-icon>
                    <v-icon size="35">mdi-forum</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t("checkout.footer.chat") }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t("checkout.footer.ask") }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item two-line>
                  <v-list-item-icon>
                    <v-icon size="35">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t("checkout.footer.email_us") }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Support@suble.com
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Suble</strong>
        </v-card-text>
      </v-card>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import VmFooter from "./footer.vue";
import VmHeader from "./header.vue";
import miniCart from "@/pages/miniCart.vue";

export default {
  components: {
    VmFooter,
    VmHeader,
    miniCart,
  },
  data() {
    return {
      dialog: false,
      menu: false,
      positionX: 300,
    };
  },
  methods: {
    openCart() {
      if (this.$vuetify.breakpoint.mobile) {
        this.dialog = true;
        this.menu = false;
      } else {
        const currentPosition = this.$refs.cart.$el.getClientRects()[0].x;
        this.positionX =
          this.$i18n.locale === "en"
            ? currentPosition - 140
            : currentPosition + 140;
        this.menu = true;
        this.dialog = false;
      }
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        document.body.classList.add("dialog-open-body");
      } else {
        document.body.classList.remove("dialog-open-body");
      }
    },
  },
  computed: {
    ...mapGetters("cart", [
      "getItems",
      "total",
      "delivery_fee",
      "count",
      "delivery_cost",
      "minimum_charge",
    ]),
    dir() {
      return this.$i18n.locale === "en" ? "ltr" : "rtl";
    },
    goToHome() {
      return this.localePath("/location");
      const default_location = localStorage.getItem("default_location");
      if (!default_location) {
        return this.localePath("/location");
      } else {
        return this.localePath("/products");
      }
    },
  },
};
</script>
<style>
.checkout-btn-text {
  line-height: 21px;
  height: 18px;
}

.checkout-page .dropcart.mobile {
  top: 80px !important;
}
</style>
