<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="1100">
      <v-card color="white" class="px-3 py-3 rounded-lg dialog-card" style="position: relative;">
          <v-btn icon large color="#65382c" style="position: absolute; top: 10px; right: 10px;" @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <p class="font-primary text-h4 py-3 text-center font-weight-bold mb-3 mt-5">Pick a Location</p>
        <div style="padding-bottom: 10px;">
          <v-text-field v-model="searchTerm" @input="searchLocation()" hide-details clearable flat solo
            :placeholder="$t('common.areas.search_placeholder')" color="#65382c" style="border-radius: 12px;"
            background-color="#ededed" dense prepend-inner-icon="mdi-map-marker" height="50" />
        </div>
        <GmapMap ref="mapRef" :center="center" :zoom="18" map-type-id="terrain" style="width: 100%; height: 400px"
          @click="replaceMarker">
          <GmapMarker :position="center" :clickable="true" :draggable="true" />
        </GmapMap>
        <v-row no-gutters class="py-4 align-center justify-center" v-if="isAddress">
          <v-btn color="#65382c" dark elevation="0" @click="$emit('updateLatLng', address, center)" style="width: fit-content;">Update The Address</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    isAddress: {
      type: Boolean,
      default: false
    },
    address: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      center: { lat: 29.33919817328526, lng: 47.671376497490094 },
      theAddress: null,
      searchTerm: '',
    };
  },
  mounted() {
    // Get the user's current location when the component is mounted
    this.getCurrentLocation();
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude || 0,
            lng: position.coords.longitude || 0,
          };
        }, (error) => {
          console.error('Error getting current location:', error);
        });
      } else {
        console.error('Geolocation is not supported in this browser.');
      }
    },

    replaceMarker(event) {
      this.center = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.geocodeLatLng({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    },

    geocodeLatLng(latLng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const formattedAddress = results[0].formatted_address;
          this.theAddress = formattedAddress;
          this.$emit('set-address', this.theAddress.split(' '), this.center)
        } else {
          console.error('Geocoding failed due to:', status);
        }
      });
    },

    searchLocation() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.searchTerm }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const newCenter = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          this.center = newCenter;
          this.replaceMarker({ latLng: newCenter });
        } else {
          console.error('Search was not successful for the following reason:', status);
        }
      });
    }

  },
};
</script>