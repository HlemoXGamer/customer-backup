<template>
  <div v-if="product.status !== 0" class="product_wrapper" @click="open">
    <div class="product_image">
      <v-carousel
                  cycle
                  height="250"
                  hide-delimiters
                  width="100%"
                  :show-arrows="false"
                >
                  <v-carousel-item
                    v-for="image in product.images"
                    :src="image.url"
                    height="250"
                    width="100%"
                    :key="image.id"
                    >
                  </v-carousel-item>
                </v-carousel>
      <div class="out-text" v-if="product.status === 0">
        <span>{{ $t("products.out_of_stock") }}</span>
      </div>
    </div>

    <div class="product_info">
      <div class="product_info__title">
        {{ i18n_me(product.name_ar, product.name_en) }}
      </div>
      <div class="product_info__meta">
        <div class="product_info__price">
          {{ product.price }}
          <span class="product_info__price_currancy">{{
            i18n_me("دينار", "KWD")
          }}</span>
        </div>

        <div class="product_info__category">
          {{
            product.categories[0]
            ? i18n_me(
              product.categories[0].name_ar,
              product.categories[0].name_en
            )
            : product.created_at
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({ name_en: "", name_ar: "", images: [], price: 10 }),
    },
  },
  methods: {
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    open() {
      if (this.product.status !== 0) {
        this.$emit('updateData', this.product)
        this.$emit('updateShow', true)
      }

    }
  },
};
</script>
<style>
.product_wrapper {
  /* background-color: rgba(177,115,101,0.87059); */
  background-color: #efd7d2de;

  border-radius: 20px;
  padding: 0 0 1em;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

.product_image {
  width: 100%;
  position: relative;
}

.product_info__title {
  margin-top: 1em;
  padding: 0 0.5em;
  font-size: 1.1em;
  font-weight: bold;
}

.product_info__meta {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  padding: 0 0.7em;
  font-weight: 700;
}

.product_info__price_currancy {
  font-weight: 100;
  font-size: 0.8rem;
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
</style>
