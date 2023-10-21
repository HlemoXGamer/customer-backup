<template>
  <v-card>
    <p class="text-subtitle-1 font-weight-bold mb-2">
      {{ $t("checkout.shipping.full_name") }}
    </p>

    <v-text-field
      outlined
      solo
      class="rounded-lg"
      flat
      height="57"
      v-model="name"
      :error-messages="$validationMsgs($v.name)"
      @input="$v.name.$touch()"
    ></v-text-field>

    <v-row>
      <v-col cols="6">
        <p class="text-subtitle-1 font-weight-bold mb-2">
          {{ $t("checkout.shipping.phone_number") }}
        </p>

        <div class="d-flex align-start">
          <div
            class="country-container"
            style="max-height: 56px; line-height: 66px"
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/color/48/null/kuwait.png"
            />
          </div>
          <div style="width: 100%">
            <v-text-field
              dir="ltr"
              outlined
              class="rounded-lg"
              flat
              height="57"
              v-model="phone"
              :error-messages="$validationMsgs($v.phone)"
              @input="$v.phone.$touch()"
              label=""
              :placeholder="phone_placeholder"
            ></v-text-field>
          </div>
        </div>

        <!-- <vue-tel-input-vuetify
          outlined
          solo
          flat
          height="57"
          v-model="phone"
          :error-messages="$validationMsgs($v.phone)"
          @input="$v.phone.$touch()"
          :onlyCountries="['kw']"
          defaultCountry="kw"
          mode="international"
          @validate="checkPhone"
          label=""
        ></vue-tel-input-vuetify> -->
      </v-col>
      <v-col cols="6">
        <p class="text-subtitle-1 font-weight-bold mb-2">
          {{ $t("checkout.shipping.email") }}
        </p>

        <v-text-field
          outlined
          solo
          class="rounded-lg"
          flat
          height="57"
          type="email"
          v-model="email"
          :error-messages="$validationMsgs($v.email)"
          @input="$v.email.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <div v-if="!is_pickup">
      <p class="text-h6 font-weight-bold mt-8">
        {{ $t("checkout.shipping.shipping_label") }}
      </p>

      <CommonCountryCityCombo
        :country="country_id"
        :city="city_id"
        :city-error-messages="$validationMsgs($v.city_id)"
        :country-error-messages="$validationMsgs($v.country_id)"
        @countrySelected="(c) => (country_id = c)"
        @citySelected="(c) => (city_id = c)"
      ></CommonCountryCityCombo>

      <p class="text-subtitle-1 font-weight-bold mb-2">
        {{ $t("checkout.shipping.address") }}
      </p>

      <v-text-field
        outlined
        solo
        class="rounded-lg"
        flat
        height="57"
        v-model="address"
        :error-messages="$validationMsgs($v.address)"
        @input="$v.address.$touch()"
      ></v-text-field>
      <p class="text-subtitle-1 font-weight-bold mb-2">
        {{ $t("checkout.shipping.building_floor_apartment") }}
      </p>

      <v-text-field
        outlined
        solo
        class="rounded-lg"
        flat
        height="57"
        v-model="apartment"
        :error-messages="$validationMsgs($v.apartment)"
        @input="$v.apartment.$touch()"
      ></v-text-field>
    </div>
  </v-card>
</template>


<script>
import { mapFields } from "vuex-map-fields";
import { required, email, helpers } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      phoneValid: false,
    };
  },
  computed: mapFields("checkout", [
    "form.user_data.name",
    "form.user_data.email",
    "form.user_data.phone",
    "form.user_data.address.country_id",
    "form.user_data.address.city_id",
    "form.user_data.address.address",
    "form.user_data.address.apartment",
    "form.is_pickup",
  ]),
  methods: {
    checkPhone({ isValid }) {
      this.phoneValid = isValid;
    },
  },
  validations() {
    let validations = {
      name: { required },
      phone: {
        required: helpers.withParams(
          {
            lang: this.$i18n.locale,
          },
          required
        ),
        phoneValid: () => this.phoneValid,
      },
      email: {
        required: helpers.withParams(
          {
            lang: this.$i18n.locale,
          },
          required
        ),
        email,
      },
    };

    if (!this.is_pickup) {
      validations = {
        ...validations,
        address: { required },
        apartment: { required },
        city_id: { required },
        country_id: { required },
      };
    }

    return validations;
  },
};
</script>