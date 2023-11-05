<template>
  <GmapMap ref="mapRef" :center="center" :zoom="7" map-type-id="terrain" style="width: '100%'; height: 600px" @click="replaceMarker">
    <GmapMarker :position="center" :clickable="true" :draggable="true" />
  </GmapMap>
</template>

<script>
export default {
  data() {
    return {
      center: null, // Initialize to null
      theAddress: null,
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
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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
          console.log(results);
          const formattedAddress = results[0].formatted_address;
          this.theAddress = formattedAddress;
          console.log('Formatted Address:', this.theAddress);
          this.$emit('set-address', this.theAddress.split(' '))
        } else {
          console.error('Geocoding failed due to:', status);
        }
      });
    },

  },
};
</script>
