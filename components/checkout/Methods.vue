<template>
  <div>
    <p class="text-h6 font-weight-bold mt-8 font-primary">
      {{ $t("checkout.payment.payment_methods") }}
    </p>
    <v-list>
      <v-list-item-group v-model="payment_method_code" class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-column align-center justify-content-center' : ''">
        <v-list-item v-for="(item, i) in items" :key="i" style="width: 100%;">
          <v-list-item-icon>
            <img contain :src="'/images/'+item.icon" height="50px" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="font-weight-bold"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
// import { required, sameAs, email , helpers } from "vuelidate/lib/validators";
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields("checkout", ["form.payment_method_code"]),
  },
  data() {
    return {
      items: [
        {
          icon: "knet.jpg",
          text: "Knet",
        },
        {
          icon: "bookeey.png",
          text: "Bookeey",
        },
        {
          icon: "credit_card.png",
          text: "Credit",
        },
        {
          icon: "apple_pay.png",
          text: "Apple Pay"
        },
      ],
      loading: false,
    };
  },
  methods: {},
  //   validations() {
  //     return {
  //       form: {
  //         number: {
  //           required: helpers.withParams(
  //             {
  //               lang: this.$i18n.locale,
  //             },
  //             required
  //           ),
  //         },
  //         expiration_time: {
  //           required: helpers.withParams(
  //             {
  //               lang: this.$i18n.locale,
  //             },
  //             required
  //           ),
  //         },
  //         cvv: {
  //           required: helpers.withParams(
  //             {
  //               lang: this.$i18n.locale,
  //             },
  //             required
  //           ),
  //         },
  //       },
  //     };
  //   },
};
</script>

<style lang="scss">
.font-primary {
  color: $font-primary;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.center .v-image {
  margin: 0 auto;
}

.center small {
  font-size: 0.6rem;
}
</style>
