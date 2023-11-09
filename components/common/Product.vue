<template>
  <div :style="$vuetify.breakpoint.width > 414 ? 'width: 229px;' : 'width: 47%;'" class="my-1 mx-1">
    <v-card class="a-product-card" :width="$vuetify.breakpoint.width > 414 ? 229 : '100%'" min-height="200"
      style="border-radius: 10px;" color="#ecbaa8">
      <v-img @click="productViewed(product.id)" cover :height="$vuetify.breakpoint.width > 414 ? 200 : 150"
        :lazy-src="product.images[0].url" :src="product.images[0].url" style="cursor: pointer;" />
      <v-card-text class="py-2 px-3 d-flex flex-column justify-space-between" style="min-height: 100px">
        <p class="mb-0 font-weight-bold text-left w-100" :class="{ 'text-right': $i18n.locale == 'ar' }"
          style="color:#65382c;">
          {{ product[`name_${$i18n.locale}`] }}
        </p>
        <v-row no-gutters class="align-end justify-space-between">
          <p class="mb-0 text-left" :class="{ 'text-right': $i18n.locale == 'ar' }" style="color:#65382c;">
            {{ product.price }} {{ $t("products.KWD") }}
          </p>
          <v-btn v-if="!isInCart" :loading="addToCartLoading"  @click="handleClickCartIcon(product)" small elevation="0" color="#fff" style="border-radius: 5px; color: #65382c;"><v-icon left dark small
              class="ml-0 mr-0">mdi-plus</v-icon>{{ $t("products.Add") }}</v-btn>
          <div v-if="product.has_image === 0 && product.has_note === 0 && inCartCount >= 1" class="d-flex align-center justify-center">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0" @click="changeCount(1)">
              <v-icon small class="mx-0 my-0 rounded" style="background: #fff; color: #65382c;">mdi-plus</v-icon>
            </v-btn>
            <input class="rounded text-center px-0 font-weight-bold" type="text" min="1" :value="inCartCount" readonly style="text-align: center; outline: none; width: 25px; color: #65382c;">
            <v-btn :loading="addToCartLoading" small icon class="rounded-sm px-0 py-0 mx-0 my-0" @click="changeCount(-1)">
              <v-icon small class="mx-0 my-0 rounded" :style="inCartCount === 1 ? 'background: transparent; border: 1px solid #65382c' : 'background: #fff;'" style="color: #65382c;">{{ inCartCount === 1 ? 'mdi-delete' : 'mdi-minus' }}</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="750">
      <v-card elevation="0" outlined rounded="md" :class="`d-flex flex-column overflow-hidden px-5 py-7 product-dialog ${$vuetify.breakpoint.mobile ? 'mobile-dialog' : ''}`">
        <div class="d-flex meta">
          <img height="72" width="70" :src="product.images[0] ? product.images[0].url : ''" alt="" />
          <div :class="`flex-grow-1 ${$i18n.locale === 'en' ? 'pl-5' : 'pr-5'
            }`">
            <div elevation="0" :class="`
                ${$vuetify.breakpoint.mobile
                ? 'text-subtitle-2'
                : 'text-subtitle-1'
              }
                text-decoration-none
                font-weight-bold font-primary
                bg-transparent
                px-0`">
              {{ i18n_me(product.name_ar, product.name_en) }}
            </div>

            <div>
              <small class="desc">{{
                i18n_me(product.description_ar, product.description_en)
              }}</small>
            </div>

            <div class="mt-5">
              <span v-for="(category, index) in product.categories" :key="category.id"
                class="text-body-1 font-primary font-weight-bold">
                {{ i18n_me(category.name_ar, category.name_en) }}
                <span v-if="index !== product.categories.length - 1">,
                </span>
              </span>
            </div>
          </div>
          <div>
            <div class="actions-wrapper">
              <div>
                <div :class="`row flex-nowrap justify-${i18n_me(
                  'start',
                  'end'
                )} align-center`">
                  <v-btn :disabled="count <= 1" icon class="font-primary" @click="changeCount(-1)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <input class="count_input font-primary" readonly
                    style="pointer-events: none !important; user-select: none !important;" v-model="count" />
                  <v-btn icon class="font-primary" @click="changeCount(1)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="font-weight-bold font-primary">
                {{ product.price }} {{ $t("products.KWD") }}
              </div>
            </div>
          </div>
        </div>
        <div style="color: red; text-align: center" v-if="product.has_image &&
          (images.length < count || images.length > count * 10)
          ">
          <span v-if="product.has_image && images.length > count * 10">{{
            $t("cart.please_upload_less", {
              number: images.length - count * 10,
            })
          }}</span>
          <span v-if="product.has_image && images.length < count">{{
            $t("cart.please_upload_more", {
              number: count - images.length,
            })
          }}</span>
        </div>
        <div :class="`row mt-4 ${product.has_image != 1 || product.has_note != 1
              ? 'justify-center align-center'
              : 'justify-space-between'
            }`">
          <v-btn v-if="product.has_note == 1" @click="note_dialog = true" :loading="addToCartLoading"
            :disabled="addToCartLoading" class="col-5 text--white white--text" color="black" elevation="0" rounded>
            {{ $t("products.add_note") }}
          </v-btn>

          <v-btn v-if="product.has_image == 1" @click="image_dialog = true" :loading="addToCartLoading"
            :disabled="addToCartLoading" class="ml-5 col-5 text--white white--text" color="black" elevation="0" rounded>
            {{ $t("products.upload_image") }}
          </v-btn>
          <v-btn class="add_to_cart" :data-price="product.price" :data-id="product.id" :data-name="product.name_en"
            :data-quantity="count" :disabled="(product.has_image &&
              (images.length < count ||
                images.length > count * 10)) ||
              addToCartLoading
              " @click="
    addToCartDialog(product, { count, special_request })
    " :loading="addToCartLoading" :class="product.has_note == 1 && product.has_image == 1
    ? 'mt-3 col-5 Newprimary'
    : 'ml-8 col-5 Newprimary'
    " elevation="0" rounded :block="product.has_note == 1 && product.has_image == 1">
            {{ $t("products.product.add_to_cart") }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <productImageDialog :value="image_dialog" @close="image_dialog = false" @add-image="(value) => addImage(value)"
      @delete-image="(file) => deleteImage(file)" :images="images" :count="count" />

    <productNoteDialog :value="note_dialog" @close="note_dialog = false" :notes="notes" :count="count"
      @add-note="(value) => addNote(value)" @update-notes="(note) => updateNote(note)" />

    <!-- <v-card v-if="product.status !== 0" elevation="0" outlined rounded="md" :class="`d-flex flex-row overflow-hidden product-card ${$vuetify.breakpoint.mobile ? 'px-4 py-4' : ''
          }`">
          <div class="product-image" :style="{
            height: $vuetify.breakpoint.mobile ? '70px' : '116px',
            width: $vuetify.breakpoint.mobile ? '70px' : '114px',
          }">

            <v-carousel cycle hide-delimiters :height="$vuetify.breakpoint.mobile ? '70' : '116px'"
              :width="$vuetify.breakpoint.mobile ? '70' : '114px'" :show-arrows="false">
              <v-carousel-item v-for="image in product.images" :src="image.url"
                :height="$vuetify.breakpoint.mobile ? '70' : '116px'" :width="$vuetify.breakpoint.mobile ? '70' : '114px'"
                :key="image.id">
              </v-carousel-item>
            </v-carousel> -->
    <!-- <img
              style="object-fit: cover"
              :height="$vuetify.breakpoint.mobile ? '70' : 116"
              :width="$vuetify.breakpoint.mobile ? '70' : 114"
              :src="product.images[0] ? product.images[0].url : ''"
              alt=""
            /> -->
    <!-- <div class="out-text" v-if="product.status === 0">
              <span>{{ $t("products.out_of_stock") }}</span>
            </div>
          </div>
          <div :class="{
            'ml-5': $i18n.locale === 'en' && !$vuetify.breakpoint.mobile,
            'mr-5': $i18n.locale === 'ar' && !$vuetify.breakpoint.mobile,
            'ml-3': $i18n.locale === 'en' && $vuetify.breakpoint.mobile,
            'mr-3': $i18n.locale === 'ar' && $vuetify.breakpoint.mobile,
          }">
            <div elevation="0" @click="productViewed(product.id)"
              :class="`${$vuetify.breakpoint.mobile
                  ? 'text-subtitle-2'
                  : 'text-subtitle-1'
                } text-decoration-none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }`">
              {{ i18n_me(product.name_ar, product.name_en) }}
            </div>

            
            <div>
              <small class="desc">{{
                i18n_me(product.description_ar, product.description_en)
              }}</small>
            </div>

            <div class="mt-5">
              <span v-for="(category, index) in product.categories" :key="category.id"
                class="text-body-1 font-primary font-weight-bold">
                {{ i18n_me(category.name_ar, category.name_en) }}
                <span v-if="index !== product.categories.length - 1">, </span>
              </span>
            </div>
          </div>

          <div class="d-flex flex-column align-end justify-space-between ml-auto">
            <div :class="i18n_me('text-left', 'text-right')">
              <v-fade-transition>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <button elevation="0" class="add_to_cart" :data-price="product.price" :data-id="product.id" :data-name="product.name_en" :data-quantity="count" :class="`addToCart ${product.status === 0 ? 'disable-cursor' : ''
                      }`" @click="handleClickCartIcon(product)" :loading="addToCartLoading" v-bind="attrs" v-on="on">
                      <v-icon size="20">mdi-plus</v-icon>
                    </button>
                  </template>
                  <span>Add To Cart</span>
                </v-tooltip>
              </v-fade-transition>
              <div class="mt-5">
                <span class="text-body-1 font-primary b-0">KWD {{ product.price }}
                </span>
              </div>
            </div>
            <div>
              <span v-if="product.status === 0">{{
                $t("products.similar")
              }}</span>
            </div>
          </div>
        </v-card>-->
  </div>
</template>

<script>
import ColorSelect from "@/components/product/ColorSelect.vue";
import ConditionSelect from "@/components/product/ConditionSelect.vue";
import SizeSelect from "@/components/product/SizeSelect.vue";
import { add as addToWishList } from "@/apis/wishlist";
import { productView } from "@/apis/products";
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    ColorSelect,
    ConditionSelect,
    SizeSelect,
  },
  data() {
    return {
      count: 1,
      special_request: "",
      showAlert: false,
      dialog: false,
      image_dialog: false,
      note_dialog: false,
      images: [],
      notes: [],
      deleted_images: [],
      update_notes: [],
      addToCartLoading: false,
    };
  },
  watch: {
    selectedOptions: {
      handler: function () {
        const { size, color, condition } = this.selectedOptions;

        const variant = this.product.variants.find((variant) => {
          return (
            variant.size == size &&
            variant.color == color &&
            variant.condition == condition
          );
        });

        this.selected_variant = variant;
      },
      deep: true,
    },
  },
  computed: {
    isInCart() {
      return this.$store.state.cart.items.map(item => item.product_id).includes(this.product.id);
    },
    inCartCount() {
      return this.$store.state.cart.items.find(item => item.product_id == this.product.id)?.quantity || 0;
    },
    url() {
      // if (!this.product.featured_vendor) return "";
      // return `/${this.product.featured_vendor.slug}/${this.product.featured_vendor.id}/${this.product.slug}`;
    },
  },
  methods: {
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    addImage(file) {
      this.images = [...this.images, { file, id: uuidv4(), type: "new" }];
    },
    addNote(notes) {
      this.notes = [...this.notes];
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
    changeCount(number) {
      if(this.count + number === 0){
        return this.$store.dispatch("cart/remove", this.product.id);
      }
      this.count = this.count + number;
      this.addToCart(this.product, { count: number });
    },
    handleClickCartIcon(product, data = {}) {
      if (product.has_image || product.has_note) {
        this.open(this.$vuetify.breakpoint.mobile)
      } else {
        this.addToCart(product, data);
      }
    },
    async addToCartDialog(product, data) {
      this.addToCart(product, data).then(() => {
        this.dialog = false;
        this.image_dialog = false;
        this.note_dialog = false;
        this.images = [];
        this.notes = [];
        this.count = 1;
        this.special_request = "";
      });
    },
    async addToCart(product, data = {}) {
      this.addToCartLoading = true;
      this.$toast.success("Item Added to Your Cart successfully");
      await this.$store.dispatch("cart/add", {
        product_id: product.id,
        mediaUrl: product.images[0]?.url,
        quantity: data.count || 1,
        images: this.images.map((image) => image.file),
        notes: this.notes.map((note) => note),
        special_request: data.special_request || "",
      });

      this.addToCartLoading = false;
    },
    addToWishList() {
      addToWishList(this.product.id);
      this.$toast.success("Added To WishList");
    },
    productViewed(id) {
      // try{
      //     productView({ product_id: id })
      // }catch(err){
      //   console.error(err);
      // };
      this.open(this.$vuetify.breakpoint.mobile)
    },
    open(isMobile) {
      if (this.product.status !== 0 && isMobile) {
        this.$emit('updateData', this.product)
        this.$emit('updateShow', true)
      }else{
        this.dialog = true;
      }
    }
  },
};
</script>

<style lang="scss">
.mobile-dialog.product-dialog {
  position: absolute;
  top: 0;
  left: 0;
  height: 90vh;
}

.product-card {
  transform: translate(0, 0);

  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translate(10px, -10px);
  box-shadow: 0 0 20px #ff6c2952 !important;
}

.v-application .primary {
  background-color: #65382c !important;
  border-color: #65382c !important;
}

.v-application .primary--text {
  color: #65382c !important;
  caret-color: #65382c !important;
}

.product-card {
  padding: 2rem;
  background: #f4f7ff !important;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px 1rem !important;
}

.font-primary {
  color: $font-primary !important;
}

.addToCart {
  border-radius: 50%;
  background: #65382c;
  opacity: 0.5;
  border: 1px solid;
  height: 34px;
  width: 34px;
}

.addToCart i {
  color: white !important;
}

.desc {
  font-size: 14px;
  color: #909dcb;
}

.count_input {
  border: 1px solid;
  width: 25px;
  border-radius: 3px;
  text-align: center;
}

.request {
  border-radius: 12px !important;
}

.request * {
  box-shadow: unset !important;
}

.meta {
  padding-bottom: 1rem;
  border-bottom: 1px solid #65382c;
}

.actions-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.product-image {
  position: relative;
}

.out-text {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.out-text span {
  transform: rotate(-20deg);
}

.disable-cursor {
  pointer-events: none;
}
</style>
