<template>
  <div class="pt-5" style="position: relative;">
    <p class="text-h6 font-weight-bold mb-5 mx-auto"
      style="width: fit-content; color: #65382c; border-bottom: 1px solid #65382c;">{{ $t('cart.order_details') }}</p>
      <v-btn :disabled="!products.length" :loading="removeAllLoading" text color="#65382c" @click="emptyCart()" style="position: absolute; top: 20px;" :style="{ 'left': $i18n.locale === 'ar' ? 0 : '', 'right': $i18n.locale === 'en' ? 0 : ''}" class="font-weight-bold rounded-lg"><v-icon class="mx-2">{{ $vuetify.breakpoint.xs ? 'mdi-cart-off' : 'mdi-cart-off' }}</v-icon>{{ !$vuetify.breakpoint.xs ? $t("cart.remove_all") : '' }}</v-btn>
    <v-card v-if="products.length" class="a-product-card d-flex align-center justify-space-betweenm my-1 py-2 px-2" width="100%"
      style="border-radius: 10px;" color="#fff" v-for="(product, index) in products" :key="index" :style="{ 'border': product.product.has_image == 1 &&  product.images.length < product.quantity ? '2px solid red' : '' }">
      <!-- <v-img @click="productViewed(product.product_id)" cover height="50" width="50" class="rounded-lg"
        lazy-src="https://placehold.co/70x70/png?text=Product" src="https://placehold.co/70x70/png?text=Product"
        style="cursor: pointer;" /> -->
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
          <div class="d-flex align-center justify-space-between">
            <v-btn v-if="hasExtraFlavor(product.product_id)" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product.product_id, 'extras_flavors')">
              <v-icon color="#65382c">mdi-candy-outline</v-icon>
            </v-btn>
            <v-btn v-if="product.product.has_image == 1" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product, 'image')">
              <v-icon color="#65382c">mdi-image</v-icon>
            </v-btn>
            <v-btn v-if="product.product.has_note == 1" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product, 'note')">
              <v-icon color="#65382c">mdi-draw-pen</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-center justify-center" v-if="product.product.is_flavor == 0 && product.product.is_extra == 0">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
              @click="changeCount(1, product.product_id, product, product.quantity)" :disabled="removeAllLoading">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">mdi-plus</v-icon>
            </v-btn>
            <input class="rounded text-center px-0 font-weight-bold" type="text" min="1" :value="product.quantity"
              readonly style="text-align: center; outline: none; width: 25px; color: #65382c;">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
              @click="changeCount(-1, product.product_id, product, product.quantity)" :disabled="removeAllLoading">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">{{ product.quantity === 1 ? 'mdi-delete' :
                'mdi-minus' }}</v-icon>
            </v-btn>
          </div>
          <div v-else class="d-flex align-center justify-center" v-if="product.product.is_flavor == 1 || product.product.is_extra == 1">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
              @click="changeCount(-1, product.product_id, product, product.quantity)" :disabled="removeAllLoading">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
    <p v-if="!products.length && !productsLoading" class="text-center font-weight-bold text-h6"
      style="height: 100%; color: #65382c;">
      {{ $t("cart.no_products") }}
    </p>
    <v-row no-gutters class="justify-center flex-wrap" v-if="productsLoading && products.length == 0">
      <v-progress-circular :size="50" color="#65382c" indeterminate></v-progress-circular>
    </v-row>
    <v-divider style="color: grey" class="my-3" />
    <v-col class="mx-0 my-0 pa-0 px-0 d-flex flex-column align-start">
      <p class="font-weight-bold text-h7 pb-0 mb-0" style="color: #65382c;">{{ $t("checkout.voucher_code") }}</p>
      <v-text-field hide-details class="rounded-lg mt-0 py-2" outlined style="width: 100%" color="#65382c"
        v-model="voucher_code" :placeholder="$t('checkout.enter_voucher')">
        <template #append>
          <v-row no-gutters class="align-center justify-center" style="margin-top: -7px">
            <v-btn :disabled="!voucher_code.length || removeAllLoading" class="my-auto mx-0 rounded-lg" elevation="0" text :loading="loading" @click="applyVoucher()">
              {{ $t("checkout.apply") }}
            </v-btn>
          </v-row>
        </template>
      </v-text-field>
    </v-col>
    <v-col class="mx-0 my-0 pa-0 px-0">
      <v-row no-gutters class="align-center justify-space-between">
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("profile.orders.subtotal") }}
        </p>
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ subTotal }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row v-if="newSubTotal" no-gutters class="align-center justify-space-between">
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("new_sub_total") }}
        </p>
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ newSubTotal }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row v-if="discount" no-gutters class="align-center justify-space-between">
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("checkout.discount") }}
        </p>
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ discount }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row no-gutters class="align-center justify-space-between">
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("checkout.delivery_cost") }}
        </p>
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ delivery_cost }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row no-gutters class="align-center justify-space-between">
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ $t("checkout.total") }}
        </p>
        <p class="my-0 mx-0 px-0 py-1 font-weight-bold text-h7" style="color: #65382c;">
          {{ total + delivery_cost }} {{ $t("products.KWD") }}
        </p>
      </v-row>
      <v-row no-gutters class="align-center justify-center" v-if="products.length && (subTotal < minimum_charge)">
        <p class="text-center font-h6 red--text my-2 red--text font-weight-bold">{{ $t("cart.total_cost") }} {{ minimum_charge }} {{ $t("products.KWD") }}</p>
      </v-row>
      <v-divider style="color: grey" class="my-3" />
      <v-row no-gutters class="mt-3 mb-0 align-center justify-space-around">
        <v-btn :disabled="disable_checkout || subTotal == 0" class="rounded-lg" elevation="0" color="#ecbaa8" @click="toCheckout()">{{ $t("cart.pay_now") }}</v-btn>
        <v-btn class="rounded-lg" elevation="0" text style="border: 1px solid grey" :to="localePath('/categories')">{{
          $t("cart.continue_shopping") }}</v-btn>
      </v-row>
    </v-col>

    <productImageDialog
      :value="dialog.image_dialog"
      @close="dialog.image_dialog = false"
      :images="dialog.images"
      :product-id="dialog.product_id"
      :count="dialog.count"
      :self="true"
      @updated="fetch()"
    />
    <productNoteDialog
      :value="dialog.note_dialog"
      @close="dialog.note_dialog = false"
      :notes="dialog.notes"
      :product-id="dialog.product_id"
      :count="dialog.count"
      :self="true"
      @updated="fetch()"
    />
    <commonFlavorsExtras :dialog="dialog.extras_flavors_dialog" :items="dialog.extras_flavors" :loading="removeExtraFlavorLoading" @close="dialog.extras_flavors_dialog = false" @remove="removeExtraFlavor"/>
  </div>
</template>

<script>
import { checkVoucher } from "~/apis/checkout";
import { mapState, mapActions, mapGetters } from "vuex";
import { removeCart } from "~/apis/cart";
export default {
  data() {
    return {
      mobileProductDialog: false,
      mobileProductDialogData: {},
      initCheckout: false,
      products: [],
      allExtrasFlavors: [],
      addToCartLoading: false,
      subTotal: 0,
      voucher_code: "",
      discount: "",
      discount_type: "",
      discount_rate: "",
      newSubTotal: "",
      loading: false,
      productsLoading: false,
      removeAllLoading: false,
      removeExtraFlavorLoading: false,
      dialog: {
        image_dialog: false,
        images: [],
        note_dialog: false,
        notes: [],
        extras_flavors_dialog: false,
        extras_flavors: [],
        product_id: "",
        count: 0,
      },
    };
  },
  methods: {
    ...mapActions("cart", ["setItemNotes"]),
    hasExtraFlavor(product_id){
      return this.extra_flavors.map(item => item.product_id).includes(product_id);
    },
    async emptyCart(){
      this.removeAllLoading = true;

      await removeCart(this.id, this.$auth.loggedIn);

      await this.fetch();

      this.removeAllLoading = false;
    },
    addImage(file) {
      this.images = [...this.images, { file, id: uuidv4(), type: "new" }];
    },
    deleteImage(file) {
      if (file.type !== "new") {
        this.deleted_images.push(file.id);
      }
      this.images = this.images.filter((img) => img.id !== file.id);
    },
    updateNote(note) {
      this.update_notes.push(note.id);
    },
    openDialog(product, type) {
      if (type === "image") {
        this.openImageDialog(product);
      } else if(type === "note") {
        this.openNoteDialog(product);
      } else if(type === "extras_flavors"){
        this.openExtrasFlavorsDialog(product);
      }
    },
    openImageDialog(product) {
      this.dialog.images = product.images;
      this.dialog.product_id = product.product_id;
      this.dialog.count = product.quantity;
      const theThis = this;
      setTimeout(function () {
        theThis.dialog.image_dialog = true;
      }, 200);
    },
    openNoteDialog(product) {
      this.dialog.notes = product.notes;
      this.dialog.product_id = product.product_id;
      this.dialog.count = product.quantity;

      const theThis = this;
      setTimeout(function () {
        theThis.dialog.note_dialog = true;
      }, 200);
      this.setItemNotes({
        itemNotes: product.notes,
        productId: product.product_id,
      });
    },
    openExtrasFlavorsDialog(product) {
      this.dialog.extras_flavors = this.allExtrasFlavors.filter(item => item.product_id == product);
      this.dialog.extras_flavors_dialog = true;
    },
    toCheckout() {
      this.$router.push(
        this.localePath(this.$auth.loggedIn ? "/checkout/finalize" : "/checkout")
      );
    },
    async fetch() {
      this.productsLoading = true;
      const defaultLocation = localStorage.getItem(`default_location`);
      if(defaultLocation == "area"){
        const area = JSON.parse(localStorage.getItem('default_area'));
        await this.$store.dispatch("cart/get", { branch: area.id });
      }else if(defaultLocation == "address"){
        const area = JSON.parse(localStorage.getItem(`default_address`));
        await this.$store.dispatch("cart/get", { branch: area.branch_id });
      }
      this.products = this.items;
      this.allExtrasFlavors = this.extra_flavors;
      this.subTotal = this.total;
      this.productsLoading = false;
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
    applyVoucher() {
      this.loading = true;
      checkVoucher({ v_code: this.voucher_code, total: this.total })
        .then((res) => {
          this.discount_rate = res.discount_rate;
          this.discount_type = res.discount_type;
          const types = {
            fixed: "KWD",
            percentage: "%",
            free_delivevery: "FD",
          };
          this.discount = res.discount_rate + types[this.discount_type];

          if (this.discount_type == "fixed") {
            this.newSubTotal = Number(this.total - Number(this.discount_rate));
          } else if (this.discount_type == "percentage") {
            this.newSubTotal =
              this.total - this.total * (Number(this.discount_rate) / 100);
          } else if (this.discount_type == "free_delivevery") {
            this.delivery_cost = 0;
          }

          this.$store.commit("checkout/SET_V_CODE", this.voucher_code);
          this.loading = false;
          this.$toast.success(res.message);
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    async increment(item) {
      this.addToCartLoading = true;
      try{
        // TODO: wait for the user to stop, then send the whole qty
        const Idx = this.products.findIndex((i) => i.product_id === item.product_id);
        const newItems = JSON.parse(JSON.stringify(this.products));
        newItems[Idx].quantity = newItems[Idx].quantity + 1;
        await this.$store.dispatch("cart/setAll", newItems);
        const newitem = {
          ...item,
          quantity: 1,
          images: item.images.map((image) => image.file),
          // notes: item.notes.map((note) => note.note),
          notes: ["", ...item.notes.map((note) => note.note)],
        };
        await this.$store.dispatch("cart/add", newitem);
        await this.fetch();
      }finally{
        this.addToCartLoading = false;
      }
    },
    async decrement(item) {
      this.addToCartLoading = true;
      try{ 
        const Idx = this.products.findIndex((i) => i.product_id === item.product_id);
        const newItems = JSON.parse(JSON.stringify(this.products));
        newItems[Idx].quantity = newItems[Idx].quantity - 1;

        await this.$store.dispatch("cart/setAll", newItems);
        const newitem = {
          ...item,
          quantity: -1,
          images: item.images.map((image) => image.file),
          notes: item.notes.map((note) => note.note),
        };
        await this.$store.dispatch("cart/add", newitem);
        await this.fetch();
      }finally{
        this.addToCartLoading = false;
      }
    },
    async changeCount(number, product_id, product, quantity) {
      if (quantity + number <= 0) {
        return await this.$store.dispatch("cart/remove", product_id).then(async () => {
          await this.fetch();
        });
      }
      if(number == 1){
        this.increment(product);
      }else if(number == -1){
        this.decrement(product);
      }
    },
    async removeExtraFlavor(id){
      this.removeExtraFlavorLoading = true;
      await this.$store.dispatch("cart/remove", id);
      this.removeExtraFlavorLoading = false;
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
  computed: {
    ...mapState("cart", ["id", "total", "delivery_cost", "items", "delivery_fee", "count", "delivery_cost", "minimum_charge", "extra_flavors"]),
    disable_checkout() {
      return this.items.find(
        (item) =>
          (item.product.has_image && item.quantity > item.images.length) ||
          this.subTotal < this.minimum_charge ||
          !item.product.in_stock
      );
    },
  },
  mounted() {
    this.fetch();
  }
};
</script>