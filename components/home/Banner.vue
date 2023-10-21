<template>
  <v-card rounded="lg">
    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      :height="$vuetify.breakpoint.mobile ? 200 : 500"
    >
      <v-carousel-item v-for="(banner, index) in banners" :key="index">
        <v-img cover :src="banner.image" :min-height="$vuetify.breakpoint.mobile ? '200px' : '500px'" :min-width="$vuetify.breakpoint.mobile ? '100%' : '700px'"></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import { get as getBanner } from "~/apis/banners";
export default {
  data: () => ({
    activeTab: 0,
    banners: [],
  }),
  created() {
    this.getHomeBanner();
  },
  methods: {
    async getHomeBanner() {
      getBanner().then((data) => {
        this.banners = data.data.banners;
      });
    },
  },
};
</script>
