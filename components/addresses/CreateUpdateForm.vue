<template>
  <v-card class="py-5">
    <v-card-text>
      <CommonCountryCityCombo
        :hide-city="true"
        item-value="name"
        :area="form.area_name"
        :city="form.city_name"
        @areaSelected="areaSelected"
        @citySelected="citySelected"
      ></CommonCountryCityCombo>

      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.block_no") }} <Sup>*</Sup>
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.block_no"
        :error-messages="$validationMsgs($v.form.block_no)"
        @input="$v.form.block_no.$touch()"
      ></v-text-field>

      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.street_name") }}<Sup>*</Sup>
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.street_name"
        :error-messages="$validationMsgs($v.form.street_name)"
        @input="$v.form.street_name.$touch()"
      ></v-text-field>

      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.building_number") }} <Sup>*</Sup>
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.building_num"
        :error-messages="$validationMsgs($v.form.building_num)"
        @input="$v.form.building_num.$touch()"
      ></v-text-field>

      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.floor") }} <Sup>*</Sup>
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.floor"
        :error-messages="$validationMsgs($v.form.floor)"
        @input="$v.form.floor.$touch()"
      ></v-text-field>
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.apartment_no") }} <Sup>*</Sup>
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.apartment"
        :error-messages="$validationMsgs($v.form.apartment)"
        @input="$v.form.apartment.$touch()"
      ></v-text-field>

      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.additional_info") }}
      </p>
      <v-text-field
        outlined
        class="rounded-lg"
        flat
        height="57"
        v-model="form.description"
        :error-messages="$validationMsgs($v.form.description)"
        @input="$v.form.description.$touch()"
      ></v-text-field>
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.phone") }}
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
            v-model="form.phone"
            :error-messages="$validationMsgs($v.form.phone)"
            @input="$v.form.phone.$touch()"
            label=""
            :placeholder="phone_placeholder"
          ></v-text-field>
        </div>
      </div>

      <p class="text-subtitle-1 font-weight-bold mb-0 font-primary">
        {{ $t("profile.addresses.default") }}
      </p>
      <v-checkbox
        v-model="form.default"
        :label="`${$t('profile.addresses.default_address')}`"
        class="mt-0"
      />
      <!-- <vue-tel-input-vuetify
        outlined
        solo
        flat
        height="57"
        v-model="form.phone"
        :error-messages="$validationMsgs($v.form.phone)"
        @input="$v.form.phone.$touch()"
        :onlyCountries="['kw']"
        defaultCountry="kw"
        mode="international"
        @validate="checkPhone"
        label=""
        :placeholder="phone_placeholder"
      ></vue-tel-input-vuetify> -->
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="submit"
        :loading="loading"
        elevation="0"
        large
        class="rounded-lg"
        color="primary"
        v-if="!this.$route.path.includes('finalize')"
      >
        {{
          id ? $t("profile.addresses.update") : $t("profile.addresses.create")
        }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { create, show, update } from "@/apis/addresses";
import { required, numeric, helpers } from "vuelidate/lib/validators";
import { get } from "~/apis/cities";

const phone_number = (value) => {
  console.log({ value });
  return /^(\[5694]\d{7})$/g.test(value);
};

export default {
  props: {
    address: {
      type: Object,
    },
  },
  data(vm) {
    return {
      phoneValid: false,
      editMode: false,
      cities: [],
      form: vm.$props.checkout
        ? vm.$props.address
        : {
            // TODO: why country name ?
            // TODO: why city_name and area_name. why not id ?
            // TODO: branch_id : how should i get it ?
            country_name: "Egypt",
            address: "",
            city_id: 1,
            city_name: "Kuwait", // TODO: delete after the api update
            area_id: null,
            area_name: "", // TODO: delete after the api update
            building_num: "",
            block_no: "",
            street_name: "",
            floor: "",
            apartment: "",
            description: "",
            phone: "",
            default: true,
            branch_id: null, // TODO: delete after the api update
          },
      loading: false,
      id: null,
      // editMode: false,
    };
  },
  computed: {
    phone_placeholder() {
      return this.$t("profile.addresses.phone_placeholder");
    },
  },
  methods: {
    checkPhone({ isValid }) {
      this.phoneValid = isValid;
    },
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.log(this.$v);
        this.$toast.error("Error");
        return;
      }

      this.id ? this.updateAddress() : this.createAddress();
    },
    async fetchOne() {
      this.id = this.$route.params.id;

      if (this.id) {
        this.editMode = true;
        const { data } = await show(this.id);
        if (data.phone.length === 11) {
          data.phone = data.phone.slice(3);
        }
        this.form = { ...this.form, ...data };
      }
    },
    createAddress() {
      this.loading = true;
      const data = { ...this.form };
      if (data.phone.length === 8) {
        data.phone = "965" + data.phone;
      }
      create(data).then(() => {
        this.$router.push(this.localePath("/profile/addresses"));
        this.$toast.success("Created");
      });
    },
    updateAddress() {
      this.loading = true;
      const { id, ...updatedData } = this.form;
      if (updatedData.phone.length === 8) {
        updatedData.phone = "965" + updatedData.phone;
      }
      update(this.id, updatedData)
        .then(() => {
          this.$router.push(this.localePath("/profile/addresses"));
          this.$toast.success("Updated");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    areaSelected(c) {
      this.form.area_id = c.id;
      this.form.area_name = c.name;
      this.form.branch_id = c.branches[0]?.id;
    },
    citySelected(c) {
      this.form.city_id = c.id;
      this.form.city_name = c.name;
    },
  },
  validations() {
    return {
      form: {
        city_name: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        area_name: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        building_num: {
          numeric: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            numeric
          ),
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        block_no: {
          numeric: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            numeric
          ),
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        street_name: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        floor: {
          numeric: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            numeric
          ),
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        apartment: {
          numeric: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            numeric
          ),
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        description: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        phone: {
          // required: helpers.withParams(
          //   {
          //     lang: this.$i18n.locale,
          //   },
          //   required
          // ),
          phone_number: function (value) {
              return /^([5694]\d{7})$/g.test(value);
          },
        },
      },
    };
  },
  // TODO: move it to the store
  watch: {
    "$props.address": {
      handler() {
        this.form = this.$props.address;
      },
    },
  },
  created() {
    this.fetchOne();
    // TODO: move it to the store
    if (this.$props.checkout) {
      this.form = this.$props.address;
    }
  },
};
</script>
