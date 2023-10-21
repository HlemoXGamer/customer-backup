<template>
  <div>
    <v-card height="400" rounded="xl">
      <v-img
        :src="cover"
        class="white--text align-end justify-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
        height="400px"
      >
        <div class="pa-10">
          <h1>{{ collection.name }}</h1>
          <h4 class="mt-5">{{ collection.description }}</h4>
        </div>
      </v-img>
    </v-card>

    <v-row class="mt-10">
      <v-col cols="3" v-for="product in products" :key="product.id">
        <CommonProduct :product="product"></CommonProduct>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { show, products as getProducts } from "@/apis/collection";
export default {
  async asyncData({ params }) {
    const collection = (await show(params.id)).data;
    const products = (await getProducts(params.id)).data;

    return {
      collection: collection,
      products: products.data,
    };
  },
  computed: {
    cover() {
      return this.collection.cover
        ? this.collection.cover
        : "/images/banner23.png";
    },
  },
};
</script>