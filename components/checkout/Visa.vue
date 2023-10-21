<template>
  <div>
    <p class="text-h6 font-weight-bold mt-8 font-primary">
      {{$t('checkout.payment.payment_methods')}}
    </p>
    <v-card outlined class="p-5" height="86" width="187">
      <div class="center">
        <v-img
          src="/images/payment.png"
          height="31"
          max-width="47"
          contain
        ></v-img>
        <small class="font-primary">{{$t('checkout.payment.credit_card')}}</small>
      </div>
    </v-card>
    <p class="text-h6 font-weight-bold mt-8 font-primary">{{$t('checkout.payment.credit_card')}}</p>
    <div>
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{$t('checkout.payment.credit_card_number')}} <Sup> *</Sup>
      </p>
      <div class="d-flex">
        <v-text-field
          outlined
          solo
          class="rounded-lg sing-up-Fields"
          flat
          height="40"
          v-model="form.number"
          :error-messages="$validationMsgs($v.form.number)"
          @input="$v.form.number.$touch()"
        ></v-text-field>
        <v-card outlined class="ml-3 p-5" height="55" width="100">
          <div class="center">
            <v-img
              src="/images/visa.png"
              height="19"
              max-width="62"
              contain
            ></v-img>
          </div>
        </v-card>
      </div>
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{$t('checkout.payment.expiration_date')}} *
      </p>

      <v-menu transition="scale-transition" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            label="Choose Date"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            solo
            flat
            class="rounded-lg"
            height="57"
            v-model="form.expiration_time"
            :error-messages="$validationMsgs($v.form.expiration_time)"
            @input="$v.form.expiration_time.$touch()"
          ></v-text-field>
        </template>
        <v-date-picker no-title scrollable v-model="form.expiration_time">
        </v-date-picker>
      </v-menu>
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{$t('checkout.payment.cvc')}} <Sup> *</Sup>
      </p>
      <v-text-field
        outlined
        solo
        class="rounded-lg sing-up-Fields"
        flat
        height="40"
        v-model="form.cvv"
        :error-messages="$validationMsgs($v.form.cvv)"
        @input="$v.form.cvv.$touch()"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { required, sameAs, email , helpers } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        number: "",
        expiration_time: null,
        cvv: "",
      },
      loading: false,
    };
  },
  methods: {},
  validations() {
    return {
      form: {
        number: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        expiration_time: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        cvv: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
      },
    };
  },
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
