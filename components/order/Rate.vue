<template>
  <v-dialog :value="value" max-width="500">
    <v-card class="px-5 py-5">
      <v-btn
        color="primary"
        icon
        @click="$emit('input', false)"
        class="float-right"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title
        class="text-h5 text-center font-primary d-block font-weight-bold"
      >
        <span> {{ $t("profile.orders.orders_details.rate.rate") }}</span>
      </v-card-title>
      <v-card-text class="pa-5 font-primary font-weight-bold"> </v-card-text>
      <p class="mb-0 mb-2 font-weight-bold">
        {{
          order.review
            ? $t("profile.orders.orders_details.rate.your_rate")
            : $t("profile.orders.orders_details.rate.rate_the_order")
        }}
      </p>
      <v-rating
        :readonly="order.review"
        hover
        length="5"
        size="20"
        value="3"
        v-model="form.rate"
        :disabled="order.review"
      ></v-rating>

      <p class="mt-5 mb-2 font-weight-bold">
        {{
          order.review
            ? $t("profile.orders.orders_details.rate.your_rate")
            : $t("profile.orders.orders_details.rate.add_review")
        }}
      </p>
      <p v-if="order.review">
        {{ form.comment }}
      </p>
      <v-textarea
        v-else
        :disabled="order.review"
        v-model="form.comment"
        rows="3"
        class="request"
        solo
        filled
        background-color="#6c352924"
      />
      <v-card-actions class="d-block align-center text-center pa-3">
        <v-btn
          v-if="!order.review"
          color="primary"
          :disabled="order.review"
          rounded
          @click="addReview"
        >
          {{ $t("profile.orders.orders_details.rate.add_review") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  rateOrder,
} from "@/apis/orders";
export default {
  props: ["value", "order"],
  data: (vm) => ({
    form: {
      order_id: vm.$route.params.id,
      comment: "",
      rate: 1,
    },
    loading: false,
  }),
  methods: {
    addReview() {
      this.loading = true;
      rateOrder(this.form).then(() => {
        this.loading = false;
        this.$emit('input', false)
        this.$emit('changeRate', this.form)
        this.$toast.success("Created");
      }).catch(e => {
        this.$emit('input', false)
      })
    },

    // changeRate
  },
};
</script>