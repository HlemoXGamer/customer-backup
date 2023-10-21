<template>
  <div class="py-5">
    <div class="d-flex align-center justify-space-between">
      <p class="text-h5 font-weight-bold">{{ title }}</p>
      <div>
        <v-btn small icon fab color="primary" @click="prev"
          ><v-icon
            >mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
          </v-icon></v-btn
        >
        <v-btn small icon outlined color="primary" @click="next"
          ><v-icon
            >mdi-chevron-{{ $i18n.locale === "en" ? "right" : "left" }}</v-icon
          ></v-btn
        >
      </div>
    </div>

    <v-row v-if="loading && !$vuetify.breakpoint.mobile">
      <v-col cols="3" v-for="i in 4" :key="i">
        <v-sheet outlined rounded="lg">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- <VueSlickCarousel v-bind="settings" ref="carousel" v-if="!loading">
      <div class="ma-2" v-for="product in 5" :key="product">
        <Product class="mr-4" :product="product"></Product>
      </div>
    </VueSlickCarousel> -->
  </div>
</template>

<script>
import Product from "@/components/common/Product";
import VueSlickCarousel from "vue-slick-carousel";

import { new_arrivals } from "@/apis/products";

export default {
  components: {
    Product,
    VueSlickCarousel,
  },
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      products: [],
      loading: false,
      settings: {
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    next() {
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    },
  },
  created() {
    // new_arrivals().then(({ data }) => {
    //   this.products = data;
    //   this.loading = false;
    // });
  },
};
</script>