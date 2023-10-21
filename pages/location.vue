<template>
    <NewArrivals></NewArrivals>
</template>
<script>
// import NewBrands from "@/components/home/NewBrands";
import NewArrivals from "@/components/home/NewArrivals";
// import Banner from "@/components/home/Banner";
// import CategoryProducts from "@/components/common/CategoryProducts";
export default {
  components: {
    // Banner,
    NewArrivals,
    // CategoryProducts,
    // NewBrands,
    
  },
  created () {
    // if (!this.$auth.loggedIn) {
    //   this.$router.replace(this.localePath('/login'))
    // }
  }
};
</script>