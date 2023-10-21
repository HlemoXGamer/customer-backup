<template>
  <div class="py-10">
    <p class="text-h5 font-weight-bold mb-3">New Brands</p>

    <v-row>
      <v-col
        :cols="$vuetify.breakpoint.mobile ? 12 : 6"
        v-for="brand in brands"
        :key="brand.id"
      >
        <v-card rounded="lg" link to="/products" hover>
          <v-img
            src="https://d3e7ardzpaj3y4.cloudfront.net/image/catalog%2Fapp_component%2F97849648_-09-1242x810.png"
            contain
          ></v-img>
        </v-card>
        <p class="font-weight-bold text-h6 text-center my-5">
          {{ brand.name }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { get } from "@/apis/brands";
export default {
  data() {
    return {
      brands: [],
    };
  },

  async fetch() {
    await get({ per_page: 2 }).then((data) => {
      this.brands = data.data;
    });
  },
};
</script>