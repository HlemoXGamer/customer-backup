<template>
  <v-dialog @click:outside="$router.go(-1)" hide-overlay :value="value">
    <miniCart
      :sub_total.sync="total"
      :delivery_fee.sync="delivery_fee"
      :delivery_cost.sync="delivery_cost"
      :items.sync="getItems"
      :minimum_charge.sync="minimum_charge"
      @click.stop.prevent
    />
  </v-dialog>
</template>
<script>
import miniCart from "@/pages/miniCart.vue";
import { mapGetters } from "vuex";

export default {
  props: ["value"],
  components: {
    miniCart,
  },
  computed: {
    ...mapGetters("cart", [
      "getItems",
      "total",
      "delivery_fee",
      "delivery_cost",
      "minimum_charge",
    ]),
  },
};
</script>
