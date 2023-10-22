<template>
  <div class="pt-5">
    <p class="text-h7 font-weight-bold mb-5 mx-auto" style="width: fit-content; color: #65382c; border-bottom: 1px solid #65382c;">{{$t('cart.order_details')}}</p>
    <v-card v-if="products.length" class="a-product-card d-flex align-center justify-space-betweenm my-1" width="100%"
      style="border-radius: 10px;" color="#fff" v-for="(product, index) in products" :key="index">
      <v-img @click="productViewed(product.product_id)" cover height="50" width="50" class="rounded-lg"
        lazy-src="https://placehold.co/70x70/png?text=Product" src="https://placehold.co/70x70/png?text=Product" style="cursor: pointer;" />
      <v-card-text class="py-0 px-2 d-flex flex-row justify-space-between" style="height: 40px">
        <v-row no-gutters class="align-center justify-space-between h-100" style="height: 100%;">
          <v-col class="px-0 my-0 mx-0 py-0 d-flex flex-column justify-space-between h-100" style="height: 100%;">
            <p class="mb-0 font-weight-bold text-left w-100" :class="{ 'text-right': $i18n.locale == 'ar' }"
              style="color:#65382c;">
              {{ product.product[`name_${$i18n.locale}`] }}
              </p>
              <p class="mb-0 text-left" :class="{ 'text-right': $i18n.locale == 'ar' }" style="color:#65382c;">
                {{ product.price }} {{ $t("products.KWD") }}
              </p>
          </v-col>
          <div class="d-flex align-center justify-center">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0" @click="changeCount(1, product.product_id, product.quantity)">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">mdi-plus</v-icon>
            </v-btn>
            <input class="rounded text-center px-0 font-weight-bold" type="text" min="1" :value="product.quantity" readonly style="text-align: center; outline: none; width: 25px; color: #65382c;">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0" @click="changeCount(-1, product.product_id, product.quantity)">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">{{ product.quantity === 1 ? 'mdi-delete' : 'mdi-minus' }}</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
    <p v-if="!products.length" class="text-center font-weight-bold text-h6" style="height: 100%; color: #65382c;">
      {{ $t("cart.no_products") }}
    </p>
    <v-divider style="color: grey" class="my-3"/>
    <v-col class="mx-0 my-0 pa-0 px-0 d-flex flex-column align-start">
      <p class="font-weight-bold text-h7 pb-0 mb-0" style="color: #65382c;">{{ $t("checkout.voucher_code") }}</p>
      <v-text-field hide-details class="rounded-lg mt-0 py-2" outlined style="width: 100%" color="#65382c" :placeholder="$t('checkout.enter_voucher')">
        <template #append>
          <v-row no-gutters class="align-center justify-center" style="margin-top: -7px">
            <v-btn class="my-auto mx-0 rounded-lg" elevation="0" text>
              {{ $t("checkout.apply") }}
            </v-btn>
          </v-row>
        </template>
      </v-text-field>
    </v-col>
    <v-col class="mx-0 my-0 pa-0 px-0">
      <v-row no-gutters class="align-center justify-space-between" >
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("profile.orders.subtotal") }}
        </p> 
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ subTotal }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row no-gutters class="align-center justify-space-between" >
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("checkout.delivery_cost") }}
        </p> 
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ delivery_cost }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row no-gutters class="align-center justify-space-between" >
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("checkout.total") }}
        </p> 
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ total }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-divider style="color: grey" class="my-3"/>
      <v-row no-gutters class="mt-3 mb-0 align-center justify-space-around">
        <v-btn class="rounded-lg" elevation="0" color="#ecbaa8" @click="toCheckout()">{{ $t("cart.pay_now") }}</v-btn>
        <v-btn class="rounded-lg" elevation="0" text style="border: 1px solid grey" :to="localePath('/products')">{{ $t("cart.continue_shopping") }}</v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>

export default {
  data() {
    return {
      mobileProductDialog: false,
      mobileProductDialogData: {},
      initCheckout: false,
      products: [],
      addToCartLoading: false,
      delivery_cost: 0,
      total: 0,
      subTotal: 0
    };
  },
  computed: {
  },
  methods: {
    toCheckout() {
      this.$router.push(
        this.localePath(this.$auth.loggedIn ? "/checkout/finalize" : "/checkout")
      );
    },
    async fetch() {
      const area = JSON.parse(localStorage.getItem("default_area"));
      await this.$store.dispatch("cart/get", { branch: area.branches[0] }).then(() => {
        this.products = this.$store.state.cart.items;
        this.subTotal = this.$store.state.cart.total;
        this.delivery_cost = this.$store.state.cart.delivery_cost;
        this.total = this.subTotal + this.delivery_cost
      });
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    updateDialogShow(boolean) {
      this.mobileProductDialog = boolean;
    },
    updateDialogData(data) {
      this.mobileProductDialogData = data;
    },
    changeCount(number, product_id, quantity) {
      if(quantity + number === 0){
        return this.$store.dispatch("cart/remove", product_id).then(() => {
          this.fetch();
        });
      }
      this.addToCart(product_id, { count: number });
    },
    async addToCart(product, data = {}) {
      this.addToCartLoading = true;
      await this.$store.dispatch("cart/add", {
        product_id: product,
        quantity: data.count || 1,
      }).then(() => {
        this.fetch();
      });

      this.addToCartLoading = false;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>