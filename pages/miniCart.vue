<template>
  <div
    :class="`dropcart ${
      $vuetify.breakpoint.mobile && !dontShouldMobileVersion ? 'mobile' : ''
    }

  `"
    :style="` ${
      $vuetify.breakpoint.mobile && dontShouldMobileVersion ? '' : ''
    }`"
  >
    <!-- <pre>{{JSON.stringify(items, null, 4)}}</pre> -->
    <div class="dropcart__body">
      <div class="dropcart__products-list pb-3 mb-3">
        <div
          class="dropcart__title d-flex align-center justify-space-between"
          style="padding-bottom: 10px"
        >
          <h4 class="font-primary">
            <b>{{ $t("common.cart") }}</b>
          </h4>
          <v-btn
            v-if="
              $vuetify.breakpoint.mobile && !$route.path.includes('/checkout')
            "
            class="no-width"
            elevation="3"
            @click="$router.go(-1)"
          >
            <v-icon small>{{
              i18n_me(`mdi-arrow-right`, `mdi-arrow-left`)
            }}</v-icon></v-btn
          >
        </div>
        <template v-if="items && items.length > 0">
          <div
            :class="
              !($auth.loggedIn && $vuetify.breakpoint.mobile)
                ? 'dropcart__products_container'
                : ''
            "
          >
            <div
              v-for="item in items"
              :key="item.id"
              :class="`dropcart__product ${
                ((item.images.length < item.quantity ||
                  item.images.length > item.quantity * 10) &&
                  item.product.has_image == 1) ||
                item.product.in_stock == 0
                  ? 'has_error'
                  : ''
              }`"
            >
              <div class="dropcart__product-info">
                <div class="dropcart__product-name row">
                  <div :class="{ 'col-6 font-primary px-0': true }">
                    <span class="d-block">
                      {{ i18n_me(item.product.name_ar, item.product.name_en) }}
                    </span>
                    <span class="dropcart__product-price">
                      KWD {{ item.price }}</span
                    >
                    <v-btn
                      depressed
                      small
                      class="d-block black--text"
                      @click="openDialog(item, 'image')"
                      v-if="item.product.has_image == 1"
                      >{{ $t("cart.show_edit_images") }}
                    </v-btn>
                    <v-btn
                      depressed
                      small
                      class="d-block black--text"
                      @click="openDialog(item, 'note')"
                      v-if="item.product.has_note == 1"
                      >{{ $t("cart.show_edit_notes") }}
                    </v-btn>
                  </div>

                  <div class="dropcart__product-meta col-3 mt-0">
                    <div class="row flex-nowrap">
                      <v-btn v-on:click="increment(item)" icon class="col-3">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <input
                        disabled
                        v-model="item.quantity"
                        v-on:input="$emit('input', item.quantity)"
                        class="qty"
                      />

                      <v-btn
                        v-on:click="decrement(item)"
                        v-bind:disabled="item.quantity === 1"
                        icon
                        class="col-3"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <v-btn
                      fab
                      dark
                      small
                      color="error"
                      @click="removeItem(item)"
                    >
                      <v-icon dark> mdi-minus </v-icon>
                    </v-btn>
                  </div>
                </div>
                <div
                  v-if="
                    item.images.length < item.quantity &&
                    item.product.has_image == 1
                  "
                  class="dropcart__error_message"
                >
                  {{
                    $t("cart.please_upload_more", {
                      number: item.quantity - item.images.length,
                    })
                  }}
                </div>
                <!-- <div v-if="item.images.length > item.quantity && item.product.has_image == 1" class="dropcart__error_message"> {{$t('cart.please_upload_less', {number: item.images.length - item.quantity  })}}</div> -->
              </div>
            </div>
          </div>

          <div class="dropcart__totals pt-5 font-primary">
            <table>
              <tbody>
                <template>
                  <tr>
                    <th>{{ $t("common.subtotal") }}</th>
                    <td>KWD {{ loading ? sub_total_local : sub_total }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t("common.delivery_cost") }}</th>
                    <!-- <td>KWD {{ delivery_fee }}00</td> -->
                    <td>KWD {{ delivery_cost }}</td>
                    <!-- x: {{JSON.stringify(delivery_fee)}} -->
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
                  <th>{{ $t("common.total") }}</th>
                  <td>
                    KWD
                    {{
                      loading
                        ? Number(sub_total_local) + Number(delivery_fee)
                        : Number(sub_total) + Number(delivery_fee)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="dropcart__buttons">
            <!-- <nuxt-link :to="$url.cart()" class="btn btn-secondary" v-if="isMobile">
                    Add Item
                </nuxt-link> -->
            <!-- TODO: this is disable version, uncomment when test ends -->
            <div class="text-center">
              <p v-if="sub_total < minimum_charge" class="red--text">
                {{ $t("checkout.minimum_subtotal") }} {{ minimum_charge }}
              </p>
              <!-- <p v-if="last_order" class="red--text">{{ $t('checkout.last_order') }}</p> -->
              <v-btn
                rounded
                color="primary"
                dark
                @click="goToCheckout()"
                :class="{
                  disabled: disable_checkout,
                }"
              >
                {{ $t("common.checkout") }}
              </v-btn>
            </div>

            <!-- <div class="text-center">
              <v-btn rounded color="#6c3529" :class="disable_checkout ? 'disabled' : ''" dark @click=goToCheckout()>
                {{ $t("common.checkout") }}
              </v-btn>
            </div> -->

            <!-- <v-btn @click="goToCheckout()" color="primary"> -->

            <!-- </v-btn> -->
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            <h2 class="font-primary">
              <b>{{ $t("common.cart_empty") }}</b>
            </h2>
          </div>
        </template>
        <productImageDialog
          :value="dialog.image_dialog"
          @close="dialog.image_dialog = false"
          :images="dialog.images"
          :product-id="dialog.product_id"
          :count="dialog.count"
          :self="true"
        />
        <productNoteDialog
          :value="dialog.note_dialog"
          @close="dialog.note_dialog = false"
          :notes="dialog.notes"
          :product-id="dialog.product_id"
          :count="dialog.count"
          :self="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { add } from "~/store/cart";
import { mapState, mapActions, mapGetters } from "vuex";
import { show as getBranch } from "@/apis/branches";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    sub_total: {
      type: Number,
    },
    delivery_fee: {
      type: Number,
    },
    delivery_cost: {
      type: Number,
    },
    minimum_charge: {
      type: Number,
    },
    dontShouldMobileVersion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: {
        image_dialog: false,
        images: [],
        note_dialog: false,
        notes: [],
        product_id: "",
        count: 0,
      },
      quantity: 1,
      totals: [],
      total_local: 0,
      sub_total_local: 0,
      low_cost: 5,
      branch: {},
      last_order: 0,
    };
  },
  computed: {
    ...mapState("cart", ["loading", "branch_start", "branch_end"]),
    ...mapGetters("cart", [
      "getItems"]),
    disable_checkout() {
      return this.items.find(
        (item) =>
          (item.product.has_image && item.quantity > item.images.length) ||
          this.sub_total < this.minimum_charge ||
          !item.product.in_stock
      );
    },
  },
  methods: {
    ...mapActions("cart", ["setItemNotes"]),
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
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
      } else {
        this.openNoteDialog(product);
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
    calculateTotals(newItems) {
      this.sub_total_local = newItems.reduce((p, c) => {
        // return c.price * c.quantity + p;
        return Number(c.price * c.quantity) + p;
      }, 0);
    },
    getDisableCheckout() {
      return this.items.find((item) => !item.product.in_stock);
    },
    goToCheckout() {
      // this.$store.dispatch("cart/get");
      
      // if (this.getDisableCheckout() !== undefined) {
      //   this.$router.push(this.localePath("/checkout"));
      // } else {
      //   this.$toast.error(this.$t("checkout.out_of_stock"));
      // }

      this.$store.dispatch("cart/get").then(() => {
        if(this.getItems.find((item) => !item.product.in_stock) === undefined){
          if(this.$route.path.includes("/checkout")){
            this.$emit("close");
          }else{
            this.$router.push(this.localePath("/checkout"));
          }
      }else{
        this.$toast.error(this.$t("checkout.out_of_stock"));
      }
    })
    },
    increment(item) {
      // TODO: wait for the user to stop, then send the whole qty
      const Idx = this.items.findIndex((i) => i.product_id === item.product_id);
      const newItems = JSON.parse(JSON.stringify(this.items));
      newItems[Idx].quantity = newItems[Idx].quantity + 1;
      this.calculateTotals(newItems);
      this.$store.dispatch("cart/setAll", newItems);
      const newitem = {
        ...item,
        quantity: 1,
        images: item.images.map((image) => image.file),
        // notes: item.notes.map((note) => note.note),
        notes: ["", ...item.notes.map((note) => note.note)],
      };
      this.$store.dispatch("cart/add", newitem);
    },
    decrement(item) {
      const Idx = this.items.findIndex((i) => i.product_id === item.product_id);
      const newItems = JSON.parse(JSON.stringify(this.items));
      newItems[Idx].quantity = newItems[Idx].quantity - 1;
      this.calculateTotals(newItems);

      this.$store.dispatch("cart/setAll", newItems);
      const newitem = {
        ...item,
        quantity: -1,
        images: item.images.map((image) => image.file),
        notes: item.notes.map((note) => note.note),
      };
      this.$store.dispatch("cart/add", newitem);
    },
    removeItem(item) {
      // const oldItems = {...this.items}
      const newItems = this.items.filter(
        (_item) => _item.product_id !== item.product_id
      );
      this.calculateTotals(newItems);
      // this.items.splice(this.items.indexOf(item), 1);
      this.$store.dispatch("cart/remove", item.product_id);
      // this.$store.dispatch("cart/setAll", []);
      // this.calculateTotals();
    },
    // getLastOrder() {
    //   this.loading = true;
    //   let branch_id = 0;
    //   if (this.$auth.loggedIn) {
    //     branch_id = JSON.parse(localStorage.getItem("user"))['branch_id'];
    //   } else {
    //     branch_id = localStorage.getItem("guest_branch");
    //   }

    //   getBranch(branch_id).then(({ data }) => {
    //     this.branch = data;
    //     const timer = new Date()
    //     if (timer.getHours() >= this.branch.end.split(':')[0]) {
    //       this.last_order = 1
    //     } else if (timer.getHours() <= this.branch.start.split(':')[0]) {
    //       this.last_order = 1
    //     } else {
    //       this.last_order = 0
    //     }
    //     this.loading = false;
    //   }).catch(err => {
    //     if (err === 'You Are Trying To Access A Forbidden Request') {
    //       this.$router.push(this.localePath('/profile/orders'))
    //     }
    //     if (err === 'Unauthenticated.') {
    //       this.$router.push({ path: this.localePath('/login'), query: { order_id: this.id } })
    //     }
    //   })
    // },
  },
  created() {
    // this.getLastOrder()
  },
};
</script>

<style lang="scss">
.font-primary {
  color: $font-primary !important;
}

.dropcart.mobile {
  height: 90vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
}

.dropcart {
  font-size: 15px;
  font-weight: 400;
  color: #353535;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.dropcart__empty {
  padding: 42px 30px;
  text-align: center;
}

.dropcart__products-list {
  padding: 20px 16px;
}

.dropcart__products_container {
  overflow: auto;
  max-height: 270px;
}

.dropcart__product {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border: 1px solid #cccccc4d;
  padding: 10px;
  border-radius: 5px;
}

.dropcart__product.has_error {
  border-color: red !important;
}

.dropcart__product + .dropcart__product {
  margin-top: 24px;
}

.dropcart__product-image {
  width: 70px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.dropcart__product-name {
  align-items: center;
  justify-content: space-between;
  margin-top: -2px;
  line-height: 18px;
  font-size: 15px;
}

.dropcart__product-name a {
  color: inherit;
  -webkit-transition: 0.15s;
  transition: 0.15s;
}

.dropcart__product-name a:hover {
  color: #1a66ff;
}

.dropcart__product-info {
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

[dir="ltr"] .dropcart__product-info {
  padding-right: 10px;
  padding-left: 16px;
}

[dir="rtl"] .dropcart__product-info {
  padding-left: 10px;
  padding-right: 16px;
}

.dropcart__error_message {
  position: absolute;
  bottom: -22px;
  left: 10px;
  color: red;
}

[dir="rtl"] .dropcart__error_message {
  left: unset;
  right: 20px;
}

.dropcart__product-options {
  list-style: none;
  margin: 3px 0 0;
  padding: 0;
  font-size: 13px;
  line-height: 16px;
  color: #999;
}

.dropcart__product-meta {
  margin-top: 5px;
  font-size: 13px;
}

.dropcart__product-meta .qty {
  width: 30px;
  text-align: center;
}

.dropcart__product-price {
  font-size: 14px;
  font-weight: 700;
  color: #65382c;
}

.dropcart__product-remove {
  margin-top: -6px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

[dir="ltr"] .dropcart__product-remove {
  margin-right: -6px;
}

[dir="rtl"] .dropcart__product-remove {
  margin-left: -6px;
}

.dropcart__totals {
  border-top: 1px solid #ebebeb;
  line-height: 24px;
  padding: 16px 20px 0;
}

[dir="ltr"] .dropcart__totals th {
  padding-right: 16px;
  text-align: left;
}

[dir="rtl"] .dropcart__totals th {
  padding-left: 16px;
  text-align: right;
}

[dir="ltr"] .dropcart__totals td {
  text-align: right;
}

[dir="rtl"] .dropcart__totals td {
  text-align: left;
}

.dropcart__totals table {
  width: 100%;
}

.dropcart__buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 4px;
  padding: 20px;
}

.dropcart__buttons > * {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

[dir="ltr"] .dropcart__buttons > :first-child {
  margin-right: 8px;
}

[dir="rtl"] .dropcart__buttons > :first-child {
  margin-left: 8px;
}

.dropcart--style--dropdown {
  -webkit-box-shadow: 0 1px 15px rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.25);
  background: #fff;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .dropcart--style--dropdown {
    -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  }
}

.dropcart--style--offcanvas {
  visibility: hidden;
  -webkit-transition: visibility 0s 0.3s;
  transition: visibility 0s 0.3s;
  -webkit-overflow-scrolling: auto;
}

.dropcart--style--offcanvas .dropcart__backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #353535;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  z-index: 1000;
}

.dropcart--style--offcanvas .dropcart__body {
  position: fixed;
  top: 0;
  z-index: 1010;
  height: 100%;
  max-height: 100%;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  max-width: 340px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

[dir="ltr"] .dropcart--style--offcanvas .dropcart__body {
  margin-left: 30px;
  right: 0;
  -webkit-transform: translateX(calc(100% + 30px));
  transform: translateX(calc(100% + 30px));
}

[dir="rtl"] .dropcart--style--offcanvas .dropcart__body {
  margin-right: 30px;
  left: 0;
  -webkit-transform: translateX(calc(-100% + -30px));
  transform: translateX(calc(-100% + -30px));
}

.dropcart--style--offcanvas .dropcart__header {
  height: 55px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-bottom: 1px solid #ebebeb;
}

.dropcart--style--offcanvas .dropcart__title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 20px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.dropcart--style--offcanvas .dropcart__close {
  border: none;
  padding: 0;
  margin: 0;
  width: 54px;
  height: 54px;
  background: transparent;
  fill: #999;
  -webkit-transition: fill 0.2s;
  transition: fill 0.2s;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.dropcart--style--offcanvas .dropcart__close:focus {
  outline: none;
}

.dropcart--style--offcanvas .dropcart__close:focus,
.dropcart--style--offcanvas .dropcart__close:hover {
  fill: #353535;
}

.dropcart--style--offcanvas .dropcart__products-list {
  -ms-flex-negative: 1;
  flex-shrink: 1;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.dropcart--style--offcanvas .dropcart__totals,
.dropcart--style--offcanvas .dropcart__buttons {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.dropcart--style--offcanvas.dropcart--open {
  visibility: visible;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

.dropcart--style--offcanvas.dropcart--open .dropcart__backdrop {
  opacity: 0.9;
}

.dropcart--style--offcanvas.dropcart--open .dropcart__body {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.no-width {
  width: auto !important;
  height: auto !important;
  font-size: 0.5rem !important;
  min-width: auto !important;
  min-height: auto !important;
  padding: 0.8em !important;
}

@media (min-height: 600px) {
  .dropcart--style--offcanvas .dropcart__products-list {
    overflow-y: auto;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
}

@media (max-height: 599px) {
  .dropcart--style--offcanvas .dropcart__header {
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    background: #fff;
    z-index: 1;
  }

  .dropcart--style--offcanvas .dropcart__body {
    overflow-y: auto;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
}
</style>
