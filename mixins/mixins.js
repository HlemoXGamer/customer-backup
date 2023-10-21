export default {
  methods: {
    goToHome() {
      const default_location = localStorage.getItem("default_location");
      if (!default_location) {
        this.$router.push(this.localePath("/pick-service"));
      } else {
        this.$router.push(this.localePath("/products"));
      }
    },
  },
};
