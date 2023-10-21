<template>
  <v-row>
     <v-col cols="12" v-if="!hideCity">
      <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.city") }}<Sup>*</Sup>
      </p>
      <v-select
        :disabled="disabled"
        return-object
        :items="cities"
        :loading="loading.city"
        :item-value="itemValue"
        item-text="name"
        height="57"
        outlined
        flat
        class="rounded-lg"
        :value="city"
        @input="(e) => $emit('citySelected', e)"
        :error-messages="cityErrorMessages"
      ></v-select>
    </v-col>
    <v-col cols="12">
        <p class="text-subtitle-1 font-weight-bold mb-2 font-primary">
        {{ $t("profile.addresses.area") }}<Sup>*</Sup>
      </p>
      <v-select
        return-object
        :disabled="!city || disabled"
        :loading="loading.area"
        :items="areas"
        :item-value="itemValue"
        item-text="name"
        height="57"
        outlined
        flat
        class="rounded-lg"
        :value="area"
        @input="(e) => $emit('areaSelected', e)"
        :error-messages="areaErrorMessages"
      ></v-select>
    </v-col>
   
  </v-row>
</template>

<script>
import { get as getAreas } from "@/apis/areas";
import { get as getCities } from "@/apis/cities";
export default {
  props: {
    itemValue: {
      type: String,
      default : 'id'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideCity: {
      type: Boolean,
      default:false,
    },
    area: {
      type: [Number,String],
    },
    city: {
      type: [Number, String],
    },
    cityErrorMessages: {
      type: Array,
      default: () => [],
    },
    areaErrorMessages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      areas: [],
      cities: [],
      loading: {
        city: false, 
        area: false
      }
    };
  },
  watch: {
    city: {
      handler: function (id) {
        // alert(id)
        if (id) {
          this.loadAreas(id);
        }
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    async loadCities() {
      this.loading.city = true
      this.cities = (await getCities()).data;
      this.loading.city = false
    },
    async loadAreas(id) {
      this.loading.area = true
      this.areas = [];
      this.areas = (await getAreas({id: id})).data;
      this.loading.area = false
    },
  },
  created() {
    this.loadCities();
  },
};
</script>