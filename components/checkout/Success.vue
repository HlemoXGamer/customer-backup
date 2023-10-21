<template>
  <div>
    <v-card dark color="black" rounded="lg" class="pa-4">
      <v-card-title class="white--text font-weight-bold"
        >Thanks for shopping with us.</v-card-title
      >
      <v-card-text class="white--text">
        <p>You will receive an email confirmation shortly</p>
        <p>Order Number: {{ order.id }}</p>
        <p>Tracking Number: #{{ order.tracking }}</p>
      </v-card-text>
    </v-card>
    <v-card
      color="grey lighten-3 mt-5 pa-4"
      rounded="lg"
      v-if="!$auth.loggedIn"
    >
      <v-card-text>
        <p class="black--text font-weight-bold text-h6">
          Now You Can Create Account
        </p>
        <v-row>
          <v-col cols="6">
            <v-text-field
              solo
              outlined
              flat
              class="rounded-lg"
              label="Enter Your Password"
              type="password"
              v-model="form.password"
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu transition="scale-transition" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Birthday Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  solo
                  flat
                  class="rounded-lg"
                  height="57"
                  v-model="form.birthday"
                  hide-details=""
                ></v-text-field>
              </template>
              <v-date-picker no-title scrollable v-model="form.birthday">
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          x-large
          class="rounded-lg"
          height="57"
          color="primary lighten-1"
          elevation="0"
          dark
          block
          @click="create"
          :loading="loading"
        >
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createAccount } from "@/apis/checkout";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      form: {
        password: "",
        birthday: null,
      },
    };
  },
  computed: {
    ...mapState("checkout", ["order"]),
  },
  methods: {
    create() {
      this.loading = true;
      createAccount(this.form)
        .then((data) => {
          this.$auth
            .setUserToken(data.data.token, data.data.token)
            .then(() => {
              this.$store.dispatch("cart/get");
              this.$toast.success("Registered");
              this.$router.replace(this.localePath("/profile/orders"));
            });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>