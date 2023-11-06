<template>
  <v-row justify="center" v-if="product">
    <v-dialog :value="value" fullscreen :scrim="false" transition="dialog-bottom-transition"
      @click:outside="$emit('update', false)">
      <v-card>
        <v-toolbar elevation="0" style="background: transparent; z-index: 1000; width: 100%;" class="product_toolbar">
          <v-row class="d-flex align-center justify-space-between px-5">
            <v-btn elevation="3" @click="$emit('update', false)" class="no-width" style="z-index: 10000;">
            <v-icon small>{{
              i18n_me(`mdi-arrow-right`, `mdi-arrow-left`)
            }}</v-icon>
          </v-btn>
          <nuxt-link
      :to="
        localePath(
          $route.query.cart
            ? ''
            : {
                query: {
                  cart: true,
                },
              },
          $i18n.locale
        )
      "
      class="profile fixed-footer-item"
    >
      <v-badge
        :content="count"
        :value="count"
        overlap
        offset-y=""
        color="#65382c"
      >
        <v-icon color="">mdi-cart</v-icon>
      </v-badge>
    </nuxt-link>
          </v-row>
        </v-toolbar>
        <v-img :src="product.images && product.images[0] ? product.images[0].url : ''
          " min-height="350" max-height="400" style="background: #f8f8f8" />
        <div class="product_content__wrapper">
          <div class="product_content__qty_form">
            <button class="add" @click="updateQty(1)">
              <v-icon color="white">mdi-plus</v-icon>
            </button>
            <p class="product_content__qty_form_qty">{{ qty }}</p>
            <button @click="updateQty(-1)" :disabled="qty === 1">
              <v-icon>mdi-minus</v-icon>
            </button>
          </div>
          <div class="product_content__info">
            <h3 class="product_content__info_title">
              {{ i18n_me(product.name_ar, product.name_en) }}
            </h3>
            <div class="product_content__meta">
              <p class="product_content__meta_category">
                {{
                  product.categories && product.categories[0]
                  ? i18n_me(
                    product.categories[0].name_ar,
                    product.categories[0].name_en
                  )
                  : ""
                }}
              </p>
              <p class="product_content__meta_price">
                {{ product.price }} <span>{{ i18n_me("دينار", "KWD") }}</span>
              </p>
            </div>
            <div class="product_content__info_description">
              {{ i18n_me(product.description_ar, product.description_en) }}
            </div>
          </div>
          <div style="color: red; text-align: center" v-if="product.has_image &&
            (images.length !== qty || images.length > qty * 10)
            ">
            <span v-if="product.has_image && images.length > qty * 10">{{
              $t("cart.please_upload_less", {
                number: images.length - qty * 10,
              })
            }}</span>
            <span v-if="product.has_image && images.length < qty">{{
              $t("cart.please_upload_more", { number: qty - images.length })
            }}</span>
          </div>
          <div class="product_content__actions">
            <v-btn v-if="product.has_image" @click="image_dialog = !image_dialog" block elevation="1" rounded color="#000"
              class="white--text mb-3">{{ $t("products.upload_image") }}
              <v-icon>mdi mdi-upload</v-icon></v-btn>
            <v-btn v-if="product.has_note" @click="note_dialog = !note_dialog" block elevation="1" rounded color="#000"
              class="white--text mb-3">{{ $t("products.add_note") }}
              <v-icon>mdi mdi-upload</v-icon></v-btn>
            <v-btn @click="addToCart" :disabled="product.has_image === 1 &&
              (images.length < qty || images.length > qty * 10)
              " :loading="loading" block elevation="1" rounded color="#65382c" class="white--text">{{
    $t("products.product.add_to_cart") }}</v-btn>
          </div>
        </div>
      </v-card>
      <productImageDialog :value="image_dialog" @close="image_dialog = false" @add-image="(value) => addImage(value)"
        @delete-image="(file) => deleteImage(file)" :images="images" :count="qty" :productId="product.id"/>
      <productNoteDialog :value="note_dialog" @close="note_dialog = false" :notes="notes" :count="qty"
        @add-note="(value) => addNote(value)" @update-notes="(note) => updateNote(note)" />
    </v-dialog>
    <CartDialog v-model="dialogCart"/>
  </v-row>
</template>
<script>
import CartDialog from "@/components/mobile/CartDialog";
import { v4 as uuidv4 } from "uuid";
import { mapGetters } from "vuex";
export default {
  components: {
    CartDialog,

  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    product: {
      type: Object,
      default: () => ({ name_en: "", name_ar: "", images: [], price: 10 }),
    },
    extra_flavor: {
      type: Array,
      default: [],
    }
  },
  data: (vm) => ({
    qty: 1,
    loading: false,
    images: [],
    notes: [],
    deleted_images: [],
    update_notes: [],
    image_dialog: false,
    note_dialog: false,
    dialogCart: vm.$route.query.cart ? true : false,

  }),
  watch: {
    "$route.query": {
      handler(query, oldQuery) {
        this.dialogCart = false;
         if (query.cart) {
          this.dialogCart = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed:{
    ...mapGetters("cart", ["getItems", "total", "delivery_fee", "count"]),
  },
  methods: {
    close() {
      this.$emit("update", false);
    },
    updateQty(qty) {
      this.qty += qty;
    },
    reset() {
      this.qty = 1;
      this.images = [];
      this.deleted_images = [];
      this.update_notes = [];
      this.notes = [];
    },
    async addToCart() {
      this.loading = true;
      try {
        await this.$store.dispatch("cart/add", {
          extra_flavor: this.extra_flavor,
          product_id: this.product.id,
          images: this.images.map((image) => image.file),
          notes: this.notes
            ? this.notes.map((note) => note)
            : ["", ...this.notes.map((note) => note)],
          quantity: this.qty || 1,
          special_request: "",
        });
        this.$toast.success("Item Added to Your Cart successfully");
        this.reset();
      } catch (err) {
        this.$toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
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
      if (!this.update_notes.includes(note.id)) {
        this.update_notes.push(note.id);
      }
    },
    addNote(notes) {
      this.notes = [...this.notes];
    },
    closeCart() {
      try {
        this.$refs.cart.save();
      } catch {}
    },
  },
};
</script>
<style>
.dropcart.mobile{
  height: 100vh !important;
}
.no-width {
  width: auto !important;
  height: auto !important;
  font-size: 0.5rem !important;
  min-width: auto !important;
  min-height: auto !important;
  padding: 0.8em !important;
}

.product_toolbar {
  background-color: transparent;
  position: absolute !important;
  top: 0;
}

.product_toolbar .v-toolbar__content {
  background-color: transparent !important;
}

.product_content__wrapper {
  position: relative;
  top: -60px;
  /* transform: translateY(-60px); */
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 50px 50px 0 0;
  padding: 1.5em 2em 2em;
}

.product_content__qty_form {
  position: absolute;
  width: 40px;
  height: 100px;
  background: whitesmoke;
  border-radius: 10px;
  top: -50px;
  right: 2em;
}

[dir="rtl"] .product_content__qty_form {
  right: unset !important;
  left: 2em !important;
}

.product_content__qty_form button.add {
  background: #65382c !important;
  color: #fff;
}

.product_content__qty_form button {
  border-radius: 10px;
  height: 30px;
  width: 100%;
  background: rgba(239, 215, 210, 0.87059);
  color: #fff !important;
}

.product_content__qty_form_qty {
  height: 40px;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  margin: 0px !important;
  text-align: center;
}

.product_content__info_title {
  padding-right: 40px;
}

[dir="rtl"] .product_content__info_title {
  padding-right: unset !important;
  padding-left: 40px;
}

.product_content__meta {
  display: flex;
  justify-content: space-between;
}

.product_content__meta_price {
  font-size: 1em;
  font-weight: bold;
}

.product_content__meta_price>span {
  font-size: 0.8em;
  font-weight: 100;
}

.product_content__actions {
  position: fixed;
  display: block;
  width: 90%;
  bottom: 33px;
  left: 50%;
  transform: translateX(-50%);
}

.white--text {
  color: #fff !important;
}
</style>
