<template>
  <v-row no-gutters class="py-5">
    <v-col class="py-0 px-0 mx-0 my-0">
      <p style="color: #65382c; font-size: 20px;" class="font-weight-bold mb-2">{{ $t("common.choose_service") }}</p>
      <v-row no-gutters class="justify-center align-center py-2 flex-wrap">
        <v-btn-toggle dense v-model="shipping_type" active-class="isPicked" class="rounded-lg py-0 d-flex align-center justify-center flex-wrap">
          <v-btn outlined class="py-0 my-1 me-3 px-4 rounded-lg" style="text-transform: unset;" value="asap"
            @click="isToggle('asap')" :disabled="isDeliveryNowDimmed" >
            Deliver now
          </v-btn>
          <v-btn class="ms-3 my-1 rounded-lg px-4" style="text-transform: unset; border-width: thin" outlined value="same-day"
            @click="isToggle('same-day')" :disabled="isLaterTodayDimmed" >
            Later Today
          </v-btn>
          <v-btn class="ms-3 my-1 rounded-lg px-4" style="text-transform: unset; border-width: thin" outlined value="pre-order"
            @click="isToggle('pre-order')">
            Pre Order
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-tabs color="#65382c" v-model="currentTab" style="width: 100%;" class="align-center justify-start d-flex mt-6">
        <v-tabs-slider></v-tabs-slider>
        <v-tab value="areas" style="width: 200px" class="rounded-lg">
          {{ $t("location.select_your_area") }}
        </v-tab>
        <v-tab value="addresses" style="width: 200px" :disabled="!$auth.loggedIn">
          {{ $t("location.saved_addresses") }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item key="areas">
          <v-col class="mx-0 mt-2 px-0 py-0">
            <!-- Old Address List -->
            <!-- <v-card v-for="(area, index) in filteredAreas" @click="setDefaultBranch(area)" :key="area.id" width="100%"
              height="40px" style="border-bottom: 1px solid gray"
              class="py-2 px-2 d-flex flex-row align-center justify-space-between rounded-0">
              <p style="color: #65382c;" class="mb-0">
                {{ area[`name_${$i18n.locale}`] }}
              </p>
              <v-icon>
                mdi-chevron-down
              </v-icon>
            </v-card>  -->
            <!-- <v-col cols="12" class="d-flex align-center justify-center">
              <v-progress-circular :size="50" color="#65382c" v-if="loading" indeterminate></v-progress-circular>
            </v-col> -->
            <!-- <GoogleMap @set-address="onSetAddress" :dialog="gmapDialog" @close="gmapDialog = false" /> -->
            <CheckoutShipping :theAddress="theAddress" :center="center" @address-updated="setDefaultBranch" @openGMap="gmapDialog = true"/>
          </v-col>
        </v-tab-item>
        <v-tab-item key="addresses">
          <p v-if="!addresses.length" style="font-size: 20px;" class="font-primary font-weight-bold text-center my-5">
            {{ $t("common.no_addresses") }}
          </p>
          <v-item-group v-model="currentAddress" class="mt-4">
            <!-- <GoogleMap @set-address="onSetAddress" :dialog="savedAddrMapDialog" @updateLatLng="updateLatLng" isAddress :address="currentMapAddress" @close="savedAddrMapDialog = false" /> -->
            <v-col v-for="address in addresses" :key="address?.id" cols="12">
              <v-item v-slot="{ active, toggle }">
                <v-card outlined rounded="lg" class="d-flex align-center" min-height="150"
                  :color="active ? '#65382c' : ''" @click="address.lat ? toggle() : checkLatLng(address)">
                  <v-card-text>
                    <v-scroll-y-transition>
                      <div :class="`flex-grow-1 ${active ? 'white--text' : 'black--text'
                        }`">
                        <p>{{ address?.address }}</p>
                        <p>
                          {{ address?.country_name }}
                          {{ address?.city_name }}
                          {{ address?.area_name }}
                        </p>
                        <p>{{ address?.address_info }}</p>
                        <p>{{ address?.description }}</p>
                      </div>

                    </v-scroll-y-transition>
                  </v-card-text>
                </v-card>
              </v-item>
            </v-col>
          </v-item-group>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>
<script>
// import { get } from "@/apis/areas";
import { get as getAddresses, setDefault } from "@/apis/addresses";
import { update } from '@/apis/addresses'
import { mapState } from "vuex";

export default {
  data() {
    return {
      shipping_type: this.$store.state.checkout.type,
      currentTab: "areas",
      currentDay: new Date().getDate(),
      currentHour: "",
      currentMinute: "",
      current: [],
      days: [],
      hours: [],
      minutes: [],
      searchTerm: "",
      areas: [],
      filteredAreas: [],
      addresses: [],
      currentAddress: "",
      loading: false,
      theAddress: null,
      center: { lat: 0, lng: 0 },
      savedAddrMapDialog: false,
      gmapDialog: true,
      currentMapAddress: ""
    };
  },
  methods: {
    isToggle(value) {
      // setTimeout(() => {
      //   if (this.toggle == undefined) {
      //     this.toggle = value;
      //   }
      // }, 100);
    },
    onSetAddress(theAddress, center) {
      this.theAddress = theAddress;
      this.center = center;
    },
    addDaysToDate(startDate, days) {
      this.days = [];
      for (let i = 0; i < days; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        this.days.push(newDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' }));
      }
    },
    search() {
      if (this.searchTerm !== null) {
        this.filteredAreas = this.areas.filter(area => String(area.name).toLowerCase().includes(String(this.searchTerm).toLowerCase()));
      } else {
        this.filteredAreas = this.areas;
      }
    },
    // getAreas() {
    //   this.loading = true;
    //   get().then(({ data }) => {
    //     this.areas = data;
    //     this.filteredAreas = data;
    //   }).finally(() => {
    //     this.loading = false;
    //   })
    // },
    async getAddresses() {
      const { data } = await getAddresses();
      this.addresses = data.map(this.transformAddress);
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
    async setDefaultAddress(address) {
      this.loading = true;
      localStorage.setItem("default_location", "address");
      localStorage.setItem("default_address", JSON.stringify(address));
      await setDefault({ address_id: address.id });
      this.$router.replace(this.localePath("/categories"));
      this.$store.dispatch("cart/get");
      this.loading = false;
    },
    async setDefaultBranch(area) {  
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
        this.$router.replace(this.localePath("/categories"));
      } else {
        this.$toast.error(this.$t("location.no_branches"));
      }
      this.$store.dispatch("cart/get", { branch: branches[0] });
    },
    checkLatLng(address) {
      if (address && !address.lat && !address.lng) {
        this.currentMapAddress = address;
        this.savedAddrMapDialog = true;
      } 
    },
    async updateLatLng(address, center) {
      localStorage.setItem(
        "shipping_address",
        JSON.stringify({ ...address, lat: center.lat, lng: center.lng })
      );
      await update(address.id, { ...address, lat: center.lat, lng: center.lng });
      await this.getAddresses();
      this.setDefaultAddress(address);
      this.$router.push({ path: "/products" });
      this.savedAddrMapDialog = false;
      this.$toast.success('Address Updated SuccessFully')
    }
  },
  watch: {
    shipping_type(newValue, oldValue) {
      if(newValue !== undefined){
        this.$store.commit("checkout/SET_TYPE", newValue);
        localStorage.setItem("shipping_type", newValue);
      }
    },
    type(newValue, oldValue){
      this.shipping_type = newValue
    },
    currentAddress(newValue, oldValue) {
      this.setDefaultAddress(this.addresses[newValue]);
      localStorage.setItem(
        "shipping_address",
        JSON.stringify(this.addresses[newValue])
      );
    },
  },
  computed: {
    ...mapState("checkout", ["type"]),
    isDeliveryNowDimmed() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Calculate the total minutes for 7:55 PM and 7:59 AM
      const startDimMinutes = 19 * 60 + 45; // Time to start dimming in minutes (7:55 PM)
      const endDimMinutes = 7 * 60 + 59; // Time to end dimming in minutes (7:59 AM)

      // Check if current time is between 7:55 PM and 11:59 PM or between 12:00 AM and 7:59 AM
      // TODO: Delete it Later
      return totalMinutes >= startDimMinutes || totalMinutes <= endDimMinutes;
    },
    isLaterTodayDimmed() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Calculate the total minutes for 7:45 PM and 11:59 PM
      const startDimMinutes = 19 * 60 + 45; // Time to start dimming in minutes (7:45 PM)
      const endDimMinutes = 23 * 60 + 59; // Time to end dimming in minutes (11:59 PM)

      // Check if current time is between 7:45 PM and 11:59 PM
      // TODO: Delete it Later
      return totalMinutes >= startDimMinutes && totalMinutes <= endDimMinutes;
    }
  },
  mounted() {
    localStorage.removeItem("default_location");
    localStorage.removeItem("default_address");
    localStorage.removeItem("default_area");
    // this.getAreas();\
    this.currentHour = new Date().getHours();
    if(this.$auth.loggedIn) this.getAddresses();
  }
}
</script>

<style lang="scss" scoped>
.isPicked {
  background-color: #ecbaa8;
  color: #65382c !important;
  font-weight: bold;
}
</style>