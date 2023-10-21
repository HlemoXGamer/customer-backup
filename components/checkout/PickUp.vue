<template>
  <div class="my-5">
    <v-menu transition="scale-transition" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <p class="text-subtitle-1 font-weight-bold mb-2">PickUp Date</p>

        <v-text-field
          label="Choose Date"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          solo
          flat
          class="rounded-lg"
          height="57"
          v-model="pickup_time"
          :error-messages="$validationMsgs($v.pickup_time)"
          @input="$v.pickup_time.$touch()"
        ></v-text-field>
      </template>
      <v-date-picker no-title scrollable v-model="pickup_time"> </v-date-picker>
    </v-menu>

    <v-badge
      color="success"
      overlap
      content="FREE"
      class="fill-width"
      offset-x="50"
    >
      <v-card rounded="lg" color="rgba(255, 102, 102, 0.1)">
        <v-card-text>
          <v-row>
            <v-col cols="1" class="d-flex align-center">
              <v-btn
                color="primary"
                elevation="0"
                class="rounded-lg pa-0"
                height="42"
                width="42"
              >
                <v-icon size="21">mdi-map-marker</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10">
              <div class="ml-4">
                <p class="font-weight-bold text-subtitle-1 black--text">
                  Pickup Location
                </p>
                <p class="text-subtitle-2 grey--text mb-0">
                  12 Hassan Ma'moon, Al Manteqah as Sadesah, Nasr City
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-badge>

    <v-card elevation="0" rounded="lg" class="fill-width mt-4" height="300">
      <iframe
        class="fill-width fill-height"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50059.12775918716!2d72.78534673554945!3d21.16564923510817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1533793756956"
        allowfullscreen
      ></iframe>
    </v-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { required, helpers } from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapFields("checkout", ["form.pickup_time"]),
  },
  validations () {
    return ({
      pickup_time: {
        required: helpers.withParams(
          {
            lang: this.$i18n.locale,
          },
          required
        ),
      },
    })
  },
};
</script>
