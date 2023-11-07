<template>
  <div>
    <p class="text-h6 font-weight-bold mt-8" v-if="location_type !== 'address'">
      {{ $t("checkout.shipping.shipping_label") }}
    </p>
    <p>Shipping Address: {{ theAddress?.join(' ') }}</p>
    <v-card>
      <v-row v-if="location_type !== 'address'">
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 10">
          <v-card>
            <v-card-text>
              <!-- <CommonCountryCityCombo
                :hide-city="true"
                :disabled="location_type === 'area'"
                :area="local.address.area_id"
                :city="local.address.city_id"
                @areaSelected="
                  (c) => {
                    local.address.area_id = c.id;
                    local.address.area_name = c.name;
                  }
                "
                @citySelected="
                  (c) => {
                    local.address.city_id = c.id;
                    local.address.city_name = c.name;
                  }
                "
              ></CommonCountryCityCombo> -->
              <v-select return-object :items="areas" :loading="loading.city" :item-value="itemValue" item-text="name"
                height="57" outlined flat class="rounded-lg" :value="city" @input="(e) => { }"
                :error-messages="cityErrorMessages" />

              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.block_no") }} <Sup>*</Sup>
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57" v-model="local.address.block_no"
                :error-messages="$validationMsgs($v.local.address.block_no)"
                @input="$v.local.address.block_no.$touch()"></v-text-field>

              <p v-if="!this.$auth.loggedIn" class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ "Full Name" }} <Sup>*</Sup>
              </p>
              <v-text-field v-if="!this.$auth.loggedIn" outlined class="rounded-lg" flat height="57"
                v-model="local.address.name" :error-messages="$validationMsgs($v.local.address.name)"
                @input="$v.local.address.name.$touch()"></v-text-field>

              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary" v-if="!this.$auth.loggedIn">
                {{ "Email" }} <Sup>*</Sup>
              </p>
              <v-text-field v-if="!this.$auth.loggedIn" outlined class="rounded-lg" flat height="57"
                v-model="local.address.email" type="email" :error-messages="$validationMsgs($v.local.address.email)"
                @input="$v.local.address.email.$touch()"></v-text-field>

              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.street_name") }}<Sup>*</Sup>
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57" v-model="local.address.street_name"
                :error-messages="$validationMsgs($v.local.address.street_name)"
                @input="$v.local.address.street_name.$touch()"></v-text-field>
              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.building_number") }} <Sup>*</Sup>
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57" v-model="local.address.building_num"
                :error-messages="$validationMsgs($v.local.address.building_num)"
                @input="$v.local.address.building_num.$touch()"></v-text-field>
              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.floor") }} <Sup>*</Sup>
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57" v-model="local.address.floor"
                :error-messages="$validationMsgs($v.local.address.floor)"
                @input="$v.local.address.floor.$touch()"></v-text-field>
              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.apartment_no") }} <Sup>*</Sup>
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57" v-model="local.address.apartment"
                :error-messages="$validationMsgs($v.local.address.apartment)"
                @input="$v.local.address.apartment.$touch()"></v-text-field>

              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.additional_info") }}
              </p>
              <v-text-field outlined class="rounded-lg" flat height="57"
                :error-messages="$validationMsgs($v.local.address.description)"
                @input="$v.local.address.description.$touch()" v-model="local.address.description"></v-text-field>
              <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
                {{ $t("profile.addresses.phone") }}
              </p>
              <div class="d-flex align-start">
                <div class="country-container" style="max-height: 56px; line-height: 66px">
                  <img width="20" height="20" src="https://img.icons8.com/color/48/null/kuwait.png" />
                </div>
                <div style="width: 100%">
                  <v-text-field dir="ltr" outlined class="rounded-lg" flat height="50" v-model="local.address.phone"
                    :error-messages="$validationMsgs($v.local.address.phone)" @input="$v.local.address.phone.$touch()"
                    label="" :placeholder="phone_placeholder"></v-text-field>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div v-else>
        <v-card outlined rounded="lg" class="d-flex align-center" height="150">
          <v-card-text>
            <v-scroll-y-transition>
              <div class="flex-grow-1">
                <p>
                  {{ local.address.city_name }}
                  {{ local.address.area_name }}
                </p>
                <p>{{ local.address.address_info }}</p>
                <p>{{ local.address.description }}</p>
              </div>
            </v-scroll-y-transition>
          </v-card-text>
        </v-card>
      </div>
      <v-card-actions class="justify-space-between px-0">
        <v-btn v-if="!$vuetify.breakpoint.mobile" nuxt to="/cart" elevation="0" text color="grey" large dark
          style="visibility: hidden">
          <v-icon :left="$i18n.locale === 'en'" :right="$i18n.locale === 'ar'" large>
            mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
          </v-icon>
          {{ $t("checkout.shipping.back") }}
        </v-btn>
        <v-btn
          :loading="loading"
          x-large
          class="rounded-lg to-payment"
          height="57"
          color="dark"
          elevation="0"
          dark
          :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }"
          @click="showTime"
        >
          {{ $t("Continue To Shopping") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import { get } from "@/apis/areas";

import { mapFields } from "vuex-map-fields";
import { getDefaultLocation } from "@/apis/addresses";
import ShippingIcon from "~/static/images/shipping.svg?inline";
import PaymentIcon from "~/static/images/payment.svg?inline";
import SecurityIcon from "~/static/images/security.svg?inline";
import OfficeIcon from "~/static/images/office.svg?inline";
import {
  required,
  email,
  numeric,
  helpers,
  requiredIf,
} from "vuelidate/lib/validators";

const phone_number = helpers.regex("serial", /^([5694]\d{7})$/g);
const building_number_validator = helpers.regex("serial", /^[1-9]\d{0,9}$/);

export default {
  layout: "checkout",
  components: {
    OrderSummary,
    ShippingIcon,
    PaymentIcon,
    SecurityIcon,
    OfficeIcon,
  },
  mounted() {
    this.getDefaultLocation();
    localStorage.removeItem("shipping_address");
    get().then(({ data }) => {
      this.areas = data;
    });
  },
  props: {
    theAddress: Array,
    center: Object,
  },
  data() {
    return {
      showAddMessage: false,
      location_type: null,
      local: {
        address: {
          // TODO: why country name ?
          // TODO: why city_name and area_name. why not id ?
          // TODO: branch_id : how should i get it ?
          country_name: "Egypt",
          address: "",
          city_id: null,
          area_id: null,
          city_name: "x", // TODO: delete after the api update
          area_name: "x", // TODO: delete after the api update
          building_num: "",
          block_no: "",
          street_name: "",
          floor: "",
          apartment: "",
          description: "",
          phone: "",
          branch_id: 3, // TODO: delete after the ap
          name: "",
          email: "",
          lat: 0,
          lng: 0,
        },
      },
      areas: [],
      city: "",
    };
  },
  computed: {
    ...mapFields("checkout", [
      "form.address_id",
      "form.user_data.address.address",
      "form.is_pickup",
      "loading",
    ]),
    phone_placeholder() {
      return this.$t("profile.addresses.phone_placeholder");
    },
  },
  methods: {
    async getDefaultLocation() {
      if (this.$auth.loggedIn) {
        const { type, data } = await getDefaultLocation();
        if (type === "area") {
          this.location_type = "area";
          this.local.address = { ...this.local.address, ...data };
        } else if (type === "address") {
          this.location_type = "address";
          this.local.address = {
            ...data,
            address_info: this.transformAddress(data),
          };
        }
      } else {
        this.location_type = "area";
        this.local.address.area_id = JSON.parse(
          localStorage.getItem("guest_area_id")
        );
        this.local.address.area_name = localStorage.getItem("guest_area_name");
        this.local.address.city_id = JSON.parse(
          localStorage.getItem("guest_city_id")
        );
        this.local.address.city_name = localStorage.getItem("guest_city_name");
      }
    },
    checkPhone({ isValid }) {
      this.phoneValid = isValid;
    },
    showTime() {
      if (this.lat == null || this.lng == null) {
        this.$toast.error('Please put your address on the map');
        return;
      }
      let valid = true;
      if (
        !this.$auth.loggedIn ||
        (this.$auth.loggedIn && this.location_type !== "address")
      ) {
        this.$v.$touch();
        valid = valid && !this.$v.$invalid;
      }
      
      if (!valid) return;
      localStorage.setItem(
        "shipping_address",
        JSON.stringify(this.local.address)
      );
      this.$emit("address-updated", this.city);
    },
    transformAddress(address) {
      const address_info = [];

      if (address.street_name) {
        address_info.push(
          this.$t("profile.addresses.street_name") + " " + address.street_name
        );
      }

      if (address.floor) {
        address_info.push(
          this.$t("profile.addresses.floor") + " " + address.floor
        );
      }

      if (address.apartment) {
        address_info.push(
          this.$t("profile.addresses.apartment_no") + " " + address.apartment
        );
      }

      if (address.block_no) {
        address_info.push(
          this.$t("profile.addresses.block_no") + " " + address.block_no
        );
      }

      if (address.building_no) {
        address_info.push(
          this.$t("profile.addresses.building_number") +
          " " +
          address.building_no
        );
      }

      return address_info.join(", ");
    },
  },
  watch: {
    theAddress(newAddress) {
      this.local.address.country_name =
        newAddress[newAddress.length - 2];
      this.local.address.street_name = newAddress.slice(0, -2).join(" ");
      this.local.address.area_name = newAddress[newAddress.length - 2];

      const theArea = this.areas.find(
        (area) =>
          area.name_en.includes(
            this.local.address.area_name.slice(0, -1).toUpperCase()
          )
      );


      if (theArea) {
        // 'theArea' now contains the object with a matching 'name_en' property.
        this.$toast.success("Area implemented.");
        this.city = theArea
        if (this.center) {
          this.lat = this.center.lat
          this.lng = this.center.lng
          console.log(this.lat, this.lng);
        } else {
          this.$toast.error('Please Put Your Address on the map')
        }
      } else {
        // No matching area found.
        this.$toast.error("Area not found.");
      }

      console.log(this.local.address);
    },
  },
  validations() {
    return {
      local: {
        address: {
          description: {
            required: helpers.withParams(
              {
                lang: this.$i18n.locale,
              },
              required
            ),
          },
          city_id: {
            // required: helpers.withParams(
            //   {
            //     lang: this.$i18n.locale,
            //   },
            //   required
            // ),
          },
          area_id: {
            // required: helpers.withParams(
            //   {
            //     lang: this.$i18n.locale,
            //   },
            //   required
            // ),
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
            building_number_validator,
          },
          block_no: {
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
          name: {
            required: helpers.withParams(
              { lang: this.$i18n.locale },
              requiredIf(function (value, parentVm) {
                return this.$auth.isLoggedIn;
              })
            ),
          },
          email: {
            required: requiredIf(!this.$auth.loggedIn),
            email,
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
          phone: {
            required: helpers.withParams(
              {
                lang: this.$i18n.locale,
              },
              required
            ),
            phone_number,
            // phoneValid: () => this.phoneValid
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.v-card__actions>.rounded-lg {
  padding: 0 auto;
  padding: 0px 5rem;
  background: $font-primary !important;
}

.v-card__actions>.to-payment {
  padding: 0rem 1rem !important;
}
</style>
