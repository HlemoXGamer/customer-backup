<template>
  <div>
    <v-row>
      <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 9">
        <div class="product-header">
          <h2 class="black--text text-uppercase">
            {{ product.name_en }}
          </h2>
          <div class="d-flex text-subtitle-2">
            Sold By
            <nuxt-link to="/" class="ml-2">{{
              selected_variant.vendor.name
            }}</nuxt-link>
          </div>

          <div class="d-none d-lg-flex my-5">
            <div class="d-flex align-center">
              <v-rating
                color="yellow darken-3"
                readonly
                length="5"
                size="25"
                :value="product.review_rate"
              ></v-rating>
              <p class="mb-0 text-subtitle-2">5 reviews</p>
            </div>

            <v-divider vertical class="mx-3"></v-divider>

            <a
              href="#"
              class="text-decoration-none blue--text text--darken-3"
              @click.prevent="openAccordion(0)"
              >Description</a
            >
            <v-divider vertical class="mx-3"></v-divider>
            <a
              href="#"
              class="text-decoration-none blue--text text--darken-3"
              @click.prevent="openAccordion(1)"
              >Ingredients</a
            >
            <v-divider vertical class="mx-3"></v-divider>
            <a href="#" class="text-decoration-none blue--text text--darken-3"
              >How To Use</a
            >
            <v-divider vertical class="mx-3"></v-divider>
            <a href="#" class="text-decoration-none blue--text text--darken-3"
              >Shipping & Return</a
            >
          </div>
        </div>

        <v-row>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
            <v-card elevation="0" color="grey lighten-3">
              <v-img
                :src="product.media[activeMedia].url"
                contain
                height="410"
              ></v-img>
              <v-card-actions class="white">
                <v-slide-group
                  mandatory
                  center-active
                  show-arrows
                  v-model="activeMedia"
                >
                  <v-slide-item
                    v-for="(image, index) in product.media"
                    :key="index"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      class="ma-4"
                      height="130"
                      width="140"
                      @click="toggle"
                      :elevation="active ? 2 : 0"
                      :class="{ 'opacity--medium': !active }"
                      color="grey lighten-3"
                    >
                      <v-img :src="image.url" height="130" contain></v-img>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
            <div class="d-flex">
              <p class="text-subtitle-2 mt-1">List Price:</p>
              <div class="d-flex flex-column">
                <div class="d-flex align-center">
                  <p class="text-h6 font-weight-bold ml-3 mb-0">
                    {{ selected_variant.compare_at_price }} KWD
                  </p>
                  <p
                    class="
                      text-subtitle-2
                      font-weight-bold
                      ml-3
                      text-decoration-line-through
                      mb-0
                    "
                    v-if="
                      selected_variant.compare_at_price < selected_variant.price
                    "
                  >
                    {{ selected_variant.price }} KWD
                  </p>
                </div>
                <!-- <p class="green--text mt-2 ml-3">You save 7.01 (11%)</p> -->
              </div>
            </div>
            <!-- <div class="d-flex">
              <p class="text-subtitle-2 mt-1">Auto ship:</p>
              <div class="d-flex flex-column">
                <div class="d-flex align-center">
                  <p class="text-h6 font-weight-bold ml-3 mb-0">210 KWD</p>
                  <p class="green--text mb-0 ml-3">(Save an extra 5%)</p>
                </div>
                <p class="grey--text text-caption mt-2 ml-3" style="width: 80%">
                  Simply select Autoship at checkout for easy regular
                  deliveries.
                </p>
              </div>
            </div> -->
            <!-- <v-card elevation="0" color="orange lighten-4 mt-3 mb-5">
              <v-card-title class="text-subtitle-2 font-weight-bold">
                Why Autoship?
              </v-card-title>
              <v-card-text>
                <ul class="text-black">
                  <li>FREE access to chat with licensed vets 7 days a week.</li>
                  <li>Save 5% on all future Autoship orders.</li>
                </ul>
              </v-card-text>
            </v-card> -->

            <p class="text-subtitle-2 font-weight-bold green--text">Unpacked</p>

            <div v-if="product.options.product_colors">
              <p class="font-weight-bold">
                <span class="text-subtitle-1">Color:</span>
                30-lb bag
              </p>
              <ColorSelect
                :colors="product.options.product_colors"
                v-model="selectedOptions.color"
              />
            </div>
            <div v-if="product.options.product_conditions">
              <p class="font-weight-bold">
                <span class="text-subtitle-1">Condition:</span>
                30-lb bag
              </p>
              <ConditionSelect
                :conditions="product.options.product_conditions"
                v-model="selectedOptions.condition"
              />
            </div>
            <div v-if="product.options.product_sizes">
              <p class="font-weight-bold">
                <span class="text-subtitle-1">Size:</span>
                30-lb bag
              </p>
              <SizeSelect
                v-model="selectedOptions.size"
                :sizes="product.options.product_sizes"
              />
            </div>
          </v-col>
        </v-row>

        <v-expansion-panels
          accordion
          class="product-info-accordion mt-15"
          v-model="infoActive"
        >
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              Description
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-html="product.description_en"></p>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              Ingredients
            </v-expansion-panel-header>
            <v-expansion-panel-content> Ingredients </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              How to use
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-html="product.usage_en"></p>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              About the Brand
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              About the Brand
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              Shipping & Return
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Shipping & Return
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <ProductReview :product="product"></ProductReview>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
        <v-card elevation="0" outlined color="grey lighten-4">
          <v-card-text>
            <p class="font-weight-bold green--text text-center">In Stock</p>
            <client-only placeholder="quantity">
              <number-input
                controls
                center
                rounded
                :min="1"
                v-model="quantity"
                class="quantity-input"
              ></number-input>
            </client-only>

            <p class="font-weight-bold text-center mt-4">
              <span class="text-subtitle-2">Subtotal:</span>
              340KWD
            </p>

            <v-btn
              x-large
              block
              elevation="0"
              color="primary"
              class="text-capitalize"
              @click="addToCart"
              :loading="addToCartLoading"
            >
              <v-icon left> mdi-basket-plus-outline </v-icon>
              Add To Cart
            </v-btn>
            <v-btn
              x-large
              block
              elevation="0"
              color="red darken-2"
              class="text-capitalize mt-3"
              dark
            >
              <v-icon left> mdi-gesture-double-tap</v-icon>
              Buy Now
            </v-btn>
          </v-card-text>
          <v-card-actions class="white">
            <v-btn elevation="0" color="white" class="text-capitalize">
              <v-icon left> mdi-heart-outline </v-icon>
              Add To Favorite</v-btn
            >
            <v-btn elevation="0" color="white" class="text-capitalize">
              <v-icon left color="blue darken-2">
                mdi-compare-horizontal
              </v-icon>
              Compare</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card
          outlined
          rounded="lg"
          class="mt-10"
          v-if="otherVariantListings.length"
        >
          <p class="text-subtitle-1 font-weight-bold text-center my-2">
            Other Sellers
          </p>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              @click="changeVendor(listingVariant)"
              v-for="(listingVariant, index) in otherVariantListings"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title class="text-title-1 primary--text">
                  KWD {{ listingVariant.price }}
                </v-list-item-title>
                <v-list-item-subtitle class="grey--text text--darken-1 mt-2"
                  ><span>Sold By</span>
                  {{ listingVariant.vendor.name }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <CategoryProducts
      title=" Beauty Lovers Also Bought"
      class="mt-15"
    ></CategoryProducts>
  </div>
</template>


<script>
import { show } from "@/apis/products";
import ColorSelect from "@/components/product/ColorSelect.vue";
import ConditionSelect from "@/components/product/ConditionSelect.vue";
import SizeSelect from "@/components/product/SizeSelect.vue";
import CategoryProducts from "@/components/common/CategoryProducts";
import { groupBy, sortBy } from "lodash";
export default {
  components: {
    ColorSelect,
    ConditionSelect,
    SizeSelect,
    CategoryProducts,
  },
  head() {
    return {
      title: this.product.name_en + " - " + this.selected_variant.vendor.name,
    };
  },
  async asyncData({ params }) {
    console.log({params})
    const product = (await show(params.slug)).data;
    return {
      product,
      selected_variant: product.featured_variant,
      selectedOptions: {
        size: product.featured_variant.size,
        color: product.featured_variant.color,
        condition: product.featured_variant.condition,
      },
      otherVariantListings: [],
      activeProductTab: 0,
      activeMedia: 0,
      infoActive: 0,
      addToCartLoading: false,
      quantity: 1,
    };
  },
  watch: {
    selectedOptions: {
      handler: function () {
        const { size, color, condition } = this.selectedOptions;

        let variants = this.product.variants.filter((variant) => {
          return (
            variant.size == size &&
            variant.color == color &&
            variant.condition == condition
          );
        });

        variants = sortBy(variants, "price");

        const new_selected_variant = variants.shift();

        this.otherVariantListings = variants;

        if (new_selected_variant.vendor.id != this.selected_variant.vendor.id) {
          history.pushState(
            {},
            null,
            `/${new_selected_variant.vendor.slug}/${new_selected_variant.vendor.id}/${this.product.slug}`
          );
        }

        this.selected_variant = new_selected_variant;
      },
      deep: true,
    },
  },
  methods: {
    async addToCart() {
      // this.$router.replace({
      //   name: "product-show",
      //   params: { vendor_name: "dasds", vendor_id: 1, slug: "asd" },
      // });

      return;
      this.addToCartLoading = true;

      await this.$store.dispatch("cart/add", {
        product_id: this.product.id,
        listing_id: this.selected_variant.listing_id,
        variant_id: this.selected_variant.id,
        quantity: this.quantity,
      });

      this.addToCartLoading = false;
    },
    openAccordion(index) {
      this.infoActive = index;
      this.$vuetify.goTo(".product-info-accordion", { offset: 120 });
    },
    changeVendor(variant) {
      history.pushState(
        {},
        null,
        `/${variant.vendor.slug}/${variant.vendor.id}/${this.product.slug}`
      );

      this.selected_variant = variant;
    },
  },
};
</script>

<style >
.quantity-input.number-input {
  background-color: white;
  padding: 0.5rem 2rem;
  border-radius: 5px;
}
.quantity-input.number-input .number-input__input {
  border: none !important;
  font-weight: bold;
  color: #141414;
}
.quantity-input.number-input .number-input__button--minus {
  border-right: none !important;
}

.quantity-input.number-input .number-input__button--plus::before {
  content: "\F0142" !important;
}
.quantity-input.number-input .number-input__button--plus::before,
.quantity-input.number-input .number-input__button--minus::before {
  background: none !important;
  font: normal normal normal 24px/1 "Material Design Icons";
  height: initial !important;
  width: initial !important;
  font-size: 2rem;
}
.quantity-input.number-input .number-input__button--minus::before {
  content: "\F0141" !important;
}
.quantity-input.number-input .number-input__button--plus::after {
  background: none !important;
}
.quantity-input.number-input .number-input__button--plus {
  border-left: none !important;
}

.quantity-input::before {
  content: "Quantity";
  font-weight: bold;
  color: #aba3a3;
  height: 10px;
  font-size: 0.7rem;
  text-align: center;
  display: block;
  margin-bottom: 4px;
}

.product-header {
  position: sticky;
  top: 75px;
  z-index: 9;
  background: white;
  padding: 20px 0;
}

.product-info-accordion .v-expansion-panel::before {
  box-shadow: none !important;
  margin-bottom: 30px;
}
.product-info-accordion .v-expansion-panel-header {
  border-radius: 10px;
  background: #757575;
  color: white;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
}
.product-info-accordion .v-expansion-panel-content {
  padding: 15px 0;
}
.product-info-accordion
  .v-expansion-panel-header.v-expansion-panel-header--active,
.product-info-accordion .v-expansion-panel-header:hover {
  background: black;
}
.product-info-accordion .v-expansion-panel--active > .v-expansion-panel-header {
  min-height: initial;
}

.product-info-accordion .v-expansion-panel-header__icon i::before {
  content: "\F0415";
  color: white;
}

.product-info-accordion
  .v-expansion-panel-header.v-expansion-panel-header--active
  .v-expansion-panel-header__icon
  i::before {
  content: "\F0374";
}
</style>