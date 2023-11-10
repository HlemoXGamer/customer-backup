<template>
  <div class="pt-5">
    <p class="text-h7 font-weight-bold mb-5 mx-auto"
      style="width: fit-content; color: #65382c; border-bottom: 1px solid #65382c;">{{ $t('cart.order_details') }}</p>
    <v-card v-if="products.length" class="a-product-card d-flex align-center justify-space-betweenm my-1" width="100%"
      style="border-radius: 10px;" color="#fff" v-for="(product, index) in products" :key="index" :style="{ 'border': product.product.has_image == 1 &&  product.images.length < product.quantity ? '2px solid red' : '' }">
      <v-img @click="productViewed(product.product_id)" cover height="50" width="50" class="rounded-lg"
        lazy-src="https://placehold.co/70x70/png?text=Product" src="https://placehold.co/70x70/png?text=Product"
        style="cursor: pointer;" />
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
            <v-btn v-if="product.product.has_image == 1" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product, 'image')">
              <v-icon color="#65382c">mdi-image</v-icon>
            </v-btn>
            <v-btn v-if="product.product.has_note == 1" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product, 'note')">
              <v-icon color="#65382c">mdi-draw-pen</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-center justify-center">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
              @click="changeCount(1, product.product_id, product, product.quantity)">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">mdi-plus</v-icon>
            </v-btn>
            <input class="rounded text-center px-0 font-weight-bold" type="text" min="1" :value="product.quantity"
              readonly style="text-align: center; outline: none; width: 25px; color: #65382c;">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
              @click="changeCount(-1, product.product_id, product, product.quantity)">
              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">{{ product.quantity === 1 ? 'mdi-delete' :
                'mdi-minus' }}</v-icon>
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
            <v-btn :disabled="!voucher_code.length" class="my-auto mx-0 rounded-lg" elevation="0" text :loading="loading" @click="applyVoucher()">
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
      <v-divider style="color: grey" class="my-3" />
      <v-row no-gutters class="mt-3 mb-0 align-center justify-space-around">
        <v-btn :disabled="disable_checkout" class="rounded-lg" elevation="0" color="#ecbaa8" @click="toCheckout()">{{ $t("cart.pay_now") }}</v-btn>
        <v-btn class="rounded-lg" elevation="0" text style="border: 1px solid grey" :to="localePath('/products')">{{
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
  </div>
</template>

<script>
import { checkVoucher } from "~/apis/checkout";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      mobileProductDialog: false,
      mobileProductDialogData: {},
      initCheckout: false,
      products: [],
      addToCartLoading: false,
      subTotal: 0,
      voucher_code: "",
      discount: "",
      discount_type: "",
      discount_rate: "",
      newSubTotal: "",
      loading: false,
      productsLoading: false,
      dialog: {
        image_dialog: false,
        images: [],
        note_dialog: false,
        notes: [],
        product_id: "",
        count: 0,
      },
    };
  },
  methods: {
    ...mapActions("cart", ["setItemNotes"]),
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
      } else {
        this.openNoteDialog(product);
      }
    },
    openImageDialog(product) {
      this.dialog.images = product.images;
      this.dialog.product_id = product.product_id;
      this.dialog.count = 1;
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
    toCheckout() {
      this.$router.push(
        this.localePath(this.$auth.loggedIn ? "/checkout/finalize" : "/checkout")
      );
    },
    async fetch() {
      this.productsLoading = true;
      const area = JSON.parse(localStorage.getItem(`default_${localStorage.getItem("default_location")}`));
      await this.$store.dispatch("cart/get", { branch: area.branches ? area.branches[0] : area.branch_id }).then(() => {
        this.products = this.items;
        this.subTotal = this.total;
      });
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
      // TODO: wait for the user to stop, then send the whole qty
      const Idx = this.products.findIndex((i) => i.product_id === item.product_id);
      const newItems = JSON.parse(JSON.stringify(this.products));
      newItems[Idx].quantity = newItems[Idx].quantity + 1;
      await this.$store.dispatch("cart/setAll", newItems);
      const newitem = {
        ...item,
        quantity: item.quantity,
        images: item.images.map((image) => image.file),
        // notes: item.notes.map((note) => note.note),
        notes: ["", ...item.notes.map((note) => note.note)],
      };
      await this.$store.dispatch("cart/add", newitem);
      this.addToCartLoading = false;
      this.fetch();
    },
    async decrement(item) {
      this.addToCartLoading = true;
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
      this.addToCartLoading = false;
      this.fetch();
    },
    changeCount(number, product_id, product, quantity) {
      if (quantity + number === 0) {
        return this.$store.dispatch("cart/remove", product_id).then(() => {
          this.fetch();
        });
      }
      if(number == 1){
        this.increment(product);
      }else if(number == -1){
        this.decrement(product);
      }
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
    ...mapState("cart", ["total", "delivery_cost", "items"]),
    disable_checkout() {
      return this.items.find(
        (item) =>
          (item.product.has_image && item.quantity > item.images.length) ||
          this.sub_total < this.minimum_charge ||
          !item.product.in_stock
      );
    },
  },
  mounted() {
    this.fetch();
  }
};
</script>