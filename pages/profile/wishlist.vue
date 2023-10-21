<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 2">
      <ProfileNav></ProfileNav>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 10">
      <v-card outlined rounded="lg" class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h3>{{$t('profile.wishlist.my_wishlist')}}</h3>
        </div>

        <v-divider class="mt-4 mb-10"></v-divider>

        <v-row>
          <v-col cols="4" v-for="wish in wishlist" :key="wish.id">
            <Product :product="wish.product"></Product>
          </v-col>
        </v-row>

        <CommonEmptyPage
          icon="mdi-heart-outline"
          :text="$t('profile.wishlist.not_found')"
          v-if="!wishlist.length && !$fetchState.pending"
        >
          <v-btn
            x-large
            elevation="0"
            class="mt-10"
            nuxt
            color="primary"
            to="/products"
            >{{$t('profile.wishlist.shop_now')}}</v-btn
          >
        </CommonEmptyPage>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Product from "@/components/common/Product.vue";
import { get } from "@/apis/wishlist";
export default {
  components: {
    Product,
  },
  data() {
    return {
      wishlist: [],
      total: 0,
    };
  },
  fetch() {
    get().then((data) => {
      this.wishlist = data.data;
      this.total = data.meta.total;
    });
  },
};
</script>