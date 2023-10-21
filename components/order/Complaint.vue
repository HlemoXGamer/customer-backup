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
        <span>
          {{ $t("profile.orders.orders_details.complaint.complaint") }}</span
        >
      </v-card-title>
      <v-card-text class="pa-5 font-primary font-weight-bold"> </v-card-text>
      <p class="mt-5 mb-2 font-weight-bold">
        {{ order.complain ?  $t("profile.orders.orders_details.complaint.your_complaint") : $t("profile.orders.orders_details.complaint.add_complaint") }}
      </p>
      <p v-if="order.complain">
        {{ order.complain }}
      </p>
      <v-textarea
        v-else
        v-model="form.complain"
        rows="3"
        class="request"
        solo
        filled
        background-color="#6c352924"
      />
      <v-card-actions class="d-block align-center text-center pa-3">
        <v-btn
          :loading="loading"
          v-if="!order.complain"
          color="primary"
          :disabled="order.complain"
          rounded
          @click="addComplaint"
        >
          {{ $t("profile.orders.orders_details.complaint.add_complaint") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  complaintOrder
} from "@/apis/orders";
export default {
  props: ["order", "value"],
  data: () => ({
    form: {
      complain: ''
    },
    loading: false
  }),
  methods: {
    async addComplaint() {
        this.loading = true
        complaintOrder(this.$route.params.id,this.form).then(() => {
            this.loading = false
            this.$toast.success("Created");
            this.$emit('input', false)
            this.$emit('changeComplain', this.form.complain)
        })
        .catch(() => {
            this.loading = false
        })
    },
  },
};
</script>
