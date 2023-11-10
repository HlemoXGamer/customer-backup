<template>
  <div>
    <v-row class="mb-5">
      <v-col
        cols="12"
        :class="`text-center ${
          $vuetify.breakpoint.mobile ? 'text-h4' : 'text-h3'
        }`"
      >
        {{ $t("location.set_address") }}
      </v-col>
    </v-row>
    <v-form>
      <v-container
        :class="`${$vuetify.breakpoint.mobile ? 'mobile-location' : ''}`"
      >
        <v-row :justify="`space-between`">
          <v-col
            :cols="$vuetify.breakpoint.mobile || !$auth.loggedIn ? '12' : '6'"
            :class="`location-tab px-5 py-5 ${
              !$auth.loggedIn ? 'guest-tab' : ''
            }`"
          >
            <div>
              <v-radio
                class="tab-checkbox"
                :off-icon="activeTab === 'area' ? '$radioOn' : '$radioOff'"
                @click="setActive('area')"
              />
            </div>
            <v-container>
              <v-row :class="`${activeTab !== 'area' ? 'disabled-row' : ''}`">
                <v-col cols="12" class="text-h4 tab-title">{{
                  $t("location.select_your_area")
                }}</v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :placeholder="$t('location.select_your_area')"
                    v-model="area"
                    return-object
                    :items="areas"
                    :item-text="$i18n.locale === 'ar' ? 'name_ar' : 'name_en'"
                    item-value="id"
                    outlined
                    ref="area_select"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.mobile ? '12' : '6'"
            v-if="$auth.loggedIn"
            class="location-tab px-5 py-5"
          >
            <div>
              <v-radio
                class="tab-checkbox"
                :off-icon="activeTab === 'address' ? '$radioOn' : '$radioOff'"
                @click="setActive('address')"
              />
            </div>
            <v-container>
              <v-row
                :class="`${activeTab !== 'address' ? 'disabled-row' : ''}`"
              >
                <v-col cols="12" class="text-h4 tab-title">
                  {{ $t("location.saved_addresses") }}</v-col
                >
                <v-item-group v-model="item">
                  <v-col
                    v-for="address in addresses"
                    :key="address.id"
                    cols="12"
                  >
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        outlined
                        rounded="lg"
                        class="d-flex align-center"
                        min-height="150"
                        :color="active ? '#65382c' : ''"
                        @click="toggle"
                      >
                        <v-card-text>
                          <v-scroll-y-transition>
                            <div
                              :class="`flex-grow-1 ${
                                active ? 'white--text' : 'black--text'
                              }`"
                            >
                              <p>{{ address.address }}</p>
                              <p>
                                {{ address.country_name }}
                                {{ address.city_name }}
                                {{ address.area_name }}
                              </p>
                              <p>{{ address.address_info }}</p>
                              <p>{{ address.description }}</p>
                            </div>
                          </v-scroll-y-transition>
                        </v-card-text>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-item-group>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12">
            <v-btn
              @click="submitLocation"
              block
              color="#65382c"
              class="white--text"
              :loading="loading"
              :disabled="disabled"
            >
              {{ $t("location.see_menu") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { get as getAreas } from "@/apis/areas";
import { get as getAddresses, setDefault } from "@/apis/addresses";

export default {
  data() {
    return {
      item: 0,
      area: null,
      address: null,
      areas: [],
      addresses: [],
      loading: false,
      activeTab: "area",
    };
  },
  watch: {
    area: {
      handler() {
        if (this.$refs.area_select) {
          this.$refs.area_select.blur();
        }
      },
      deep: true,
    },
  },
  computed: {
    disabled() {
      if (this.activeTab === "area" && !this.area) {
        return true;
      }
      if (this.activeTab === "address" && !this.addresses[this.item]) {
        return true;
      }
      return false;
    },
  },
  methods: {
    setActive(value) {
      this.activeTab = value;
    },
    async setDefaultAddress(address) {
      this.loading = true;
      localStorage.setItem("default_location", "address");
      localStorage.setItem("default_address", JSON.stringify(address));
      await setDefault({ address_id: address.id });
      this.$router.replace(this.localePath("/products"));
      this.$store.dispatch("cart/get");
      this.loading = false;
    },
    async setDefaultBranch(area) {
      this.loading = true;
      const { branches } = area;
      localStorage.setItem("default_location", "area");
      localStorage.setItem("default_area", JSON.stringify(area));
      if (branches.length > 0) {
        if (this.$auth.loggedIn) {
          const { id } = branches[0];
          await setDefault({ branch_id: id, area_id: area.id });
        } else {
          localStorage.setItem(
            "guest_branch",
            JSON.parse(localStorage.getItem("default_area"))["branches"][0][
              "id"
            ]
          );
          localStorage.setItem(
            "guest_area_id",
            JSON.parse(localStorage.getItem("default_area"))["id"]
          );
          localStorage.setItem(
            "guest_city_id",
            JSON.parse(localStorage.getItem("default_area"))["branches"][0][
              "city_id"
            ]
          );
          localStorage.setItem(
            "guest_area_name",
            JSON.parse(localStorage.getItem("default_area"))["name"]
          );
          localStorage.setItem("guest_city_name", "Kuwait");
          //await setDefault({ branch_id: id, area_id: area.id });
        }
        this.$router.replace(this.localePath("/products"));
      } else {
        this.$toast.error(this.$t("location.no_branches"));
      }
      this.$store.dispatch("cart/get", { branch: branches[0] });
      this.loading = false;
    },
    submitLocation() {
      // buttons does not work with area.
      if (this.activeTab === "area") {
        this.setDefaultBranch(this.area);
      } else {
        this.setDefaultAddress(this.addresses[this.item]);
      }
    },
    async getAddresses() {
      const { data } = await getAddresses();
      this.addresses = data.map(this.transformAddress);
    },
    async getAreas() {
      const { data } = await getAreas();
      this.areas = data;
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
          this.$t("profile.addresses.building_number") + " " + address.block_no
        );
      }

      return { ...address, address_info: address_info.join(", ") };
    },
    updateModelValue(data) {
    },
  },
  mounted() {
    localStorage.removeItem("default_location");
    localStorage.removeItem("default_address");
    localStorage.removeItem("default_area");
    this.getAddresses();
    this.getAreas();
  },
};
</script>

<style>
.location-tab {
  position: relative;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-left: -10px;
  margin-right: -10px;
  margin-top: 10px;
}

.mobile-location .location-tab {
  margin-left: unset !important;
  margin-right: unset !important;
}

.location-tab:not(.guest-tab) .disabled-row {
  opacity: 0.2;
  pointer-events: none;
}

.location-tab:not(.guest-tab) .tab-title {
  padding-left: 40px !important;
}

[dir="rtl"] .location-tab:not(.guest-tab) .tab-title {
  padding-right: 40px !important;
  padding-left: 0px !important;
}

.location-tab:not(.guest-tab) .tab-checkbox {
  position: absolute;
  top: 40px;
}

.location-tab.guest-tab .tab-checkbox {
  display: none;
}

.location-tab .tab-title {
  color: #65382c;
}
</style>
