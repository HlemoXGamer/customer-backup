<template>
<div>
  <!-- <Soon /> -->
</div>

  <!-- <div> -->
    <!-- <Banner></Banner> -->
    <!-- <NewArrivals></NewArrivals> -->

    <!-- <CategoryProducts title="Croissant"></CategoryProducts>

    <CategoryProducts title="Doughnuts"></CategoryProducts> -->
  <!-- </div> -->
</template>
<script>
// import NewBrands from "@/components/home/NewBrands";
import NewArrivals from "@/components/home/NewArrivals";
// import Soon from "@/components/home/Soon";
// import Banner from "@/components/home/Banner";
// import CategoryProducts from "@/components/common/CategoryProducts";
export default {
  components: {
    // Soon,
    // Banner,
    NewArrivals,
    // CategoryProducts,
    // NewBrands,
    
  },
  created () {
    this.$router.replace(this.localePath('/pick-service'))
  }
};
</script>