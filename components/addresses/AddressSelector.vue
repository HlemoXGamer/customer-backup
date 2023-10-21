<template>
  <div class="mb-10">
    <p class="text-h6 font-weight-bold mt-8">Select Your Address</p>
    <v-item-group
      @change="(e) => $emit('input', addresses[e])"
      mandatory
    >
      <v-row>
        <v-col v-for="address in addresses" :key="address.id" cols="12" md="4">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              rounded="lg"
              class="d-flex align-center"
              height="150"
              dark
              :color="active ? 'primary' : ''"
              @click="toggle"
            >
              <v-card-text>
                <v-scroll-y-transition>
                  <div class="flex-grow-1">
                    <p>{{ address.address }}</p>
                    <p>{{ address.country_name }} {{ address.city_name }}</p>
                    <p>{{ address.apartment }}</p>
                  </div>
                </v-scroll-y-transition>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 10" >
          <AddressesCreateUpdateForm
          :no-address="addresses.length === 0"
           checkout
           :address.sync="address"
          />
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>


<script>
import { get } from "@/apis/addresses";

export default {
  props: {
    address: {
      type: Object
    }
  },
  data() {
    return {
      addresses: [],
    };
  },
  created() {
    get().then((data) => {
      this.addresses = data.data;
      if (this.addresses.length === 0) {
        this.$emit('input', this.$props.address)
      }
    });
  },
};
</script>