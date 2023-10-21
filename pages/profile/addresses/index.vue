<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <v-col
      v-if="!$vuetify.breakpoint.mobile"
      :cols="$vuetify.breakpoint.mobile ? 12 : 2"
    >
      <ProfileNav></ProfileNav>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 10">
      <v-card outlined rounded="lg" class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h3>{{ $t("profile.addresses.my_addresses") }}</h3>
          <v-btn elevation="0" nuxt to="/profile/addresses/create">
            <v-icon v-if="$vuetify.breakpoint.mobile">mdi-plus</v-icon>
            <span v-else
              >{{ $t("profile.addresses.create_new_address") }}
            </span>
          </v-btn>
        </div>

        <v-divider class="mt-4 mb-10"></v-divider>

        <v-row class="address-list--wrapper">
          <v-col cols="12" md="6" class="address-list--item" v-for="address in addresses" :key="address.id">
            <v-card outlined rounded="lg" nuxt :loading="loading.list">
              <v-card-text class="black--text">
                <p class="mt-3">{{ address.area_name }}, {{ address.city_name }}</p>
                <p>{{ address.address }}</p>
              </v-card-text>
              <v-card-actions>
                <v-row class="my-1 mx-3" align="center" justify="end">
                  <v-chip class="default-button" v-if="address.default">{{
                    $t("profile.addresses.default")
                  }}</v-chip>
                  <v-btn
                    @click="setAsDefault(address)"
                    :loading="loading.defaultAddress"
                    small
                    elevation="0"
                    v-else
                    color="primary"
                    class="default-button"
                    >{{ $t("profile.addresses.set_as_default") }}</v-btn
                  >
                  <v-btn icon @click="deleteAddress(address.id)">
                    <v-icon class="mr-2"> mdi-delete </v-icon>
                  </v-btn>
                  <!-- <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span> -->
                  <v-btn icon :to="'/profile/addresses/' + address.id">
                    <v-icon class="mr-1"> mdi-pencil </v-icon>
                  </v-btn>

                  <!-- <span class="subheading">45</span> -->
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <CommonEmptyPage
          icon="mdi-map-marker"
          :text="$t('profile.addresses.no_addresses')"
          v-if="!addresses.length && !loading"
        >
          <v-btn
            x-large
            elevation="0"
            class="mt-10"
            nuxt
            :to="localePath('/profile/addresses/create')"
            >{{ $t("profile.addresses.create_new_address") }}</v-btn
          >
        </CommonEmptyPage>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { get, remove, setDefault } from "@/apis/addresses";
export default {
  data() {
    return {
      loading: {
        list: false,
        defaultAddress: false,
      },
      addresses: [],
    };
  },
  methods: {
    async deleteAddress(id) {
      this.loading.list = true;
      try {
        await remove(id);
        await this.getAddress();
      } finally {
        this.loading.list = false;
      }
    },
    async getAddress() {
      this.loading.list = true;
      try {
        const data = await get();
        this.addresses = data.data.map(ads => ({...ads, address: this.transformAddress(ads)}));
      } finally {
        this.loading.list = false;
      }
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
        )
      }

      return address_info.join(", ") ;
    },
    async setAsDefault(address) {
      this.loading.defaultAddress = true;
      try {
        await setDefault({ address_id: address.id });
        this.getAddress();
      } finally {
        this.loading.defaultAddress = false;
      }
    },
  },
  created() {
    this.getAddress();
  },
};
</script>
<style>
.default-button {
  margin-right: auto;
}
[dir="rtl"] .default-button {
  margin-left: auto;
  margin-right: unset;
}

.address-list--wrapper {
  align-items: stretch;
}
.address-list--item .v-card {
  height: 100%;
        display: flex;
    flex-direction: column;
}

.address-list--item .v-card .v-card__actions {
  margin-top: auto;
}
</style>