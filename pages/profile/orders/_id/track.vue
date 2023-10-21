<template>
  <v-row>
    <v-col cols="12">
      <!-- <v-btn color="error" @click="setNotification">setNotification</v-btn> -->
      <v-row class="align-baseline">
        <v-col :cols="!$vuetify.breakpoint.mobile ? 10 : 12">
          <v-row>
            <v-col :cols="!$vuetify.breakpoint.mobile ? 6 : 12">
              <p class="font-weight-bold text-subtitle-1 font-primary">
                {{ $t("profile.orders.orders_details.delivery_date") }}:
                {{ order.delivery_date }}
              </p>
            </v-col>
            <v-col :cols="!$vuetify.breakpoint.mobile ? 6 : 12">
              <p class="font-weight-bold text-subtitle-1 font-primary">
                {{ $t("profile.orders.orders_details.order_no") }}:
                {{ order.id }}
              </p>
            </v-col>
            <v-col :cols="!$vuetify.breakpoint.mobile ? 6 : 12">
              <p class="font-weight-bold text-subtitle-1 font-primary">
                {{ $t("profile.orders.orders_details.status") }}:
                {{ $t(`profile.orders.orders_details.${status}`) }}
                <!-- {{ order.status }} -->
              </p>
            </v-col>
            <v-col :cols="!$vuetify.breakpoint.mobile ? 6 : 12">
              <p class="font-weight-bold text-subtitle-1 font-primary">
                {{ $t("profile.orders.orders_details.order_date") }} :
                {{ order.created_at }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col :cols="!$vuetify.breakpoint.mobile ? 2 : 12">
          <div>
            <v-btn
              color="#65382c"
              dark
              block
              :class="`mt-5 ${!canCancel ? 'disabled' : ''}`"
              @click="dialog = true"
            >
              {{ $t("profile.orders.orders_details.cancel_order") }}</v-btn
            >
          </div> -->
          <!-- <v-dialog v-model="dialog" max-width="500">
            <v-card class="pa-2">
              <v-btn
                color="#65382c"
                icon
                @click="dialog = false"
                class="float-right"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-card-title
                class="text-h5 text-center font-primary d-block font-weight-bold"
              >
                <span>
                  {{ $t("profile.orders.orders_details.cancel_order") }}</span
                >
              </v-card-title>
              <v-card-text class="pa-5 font-primary font-weight-bold">
                <p>
                  {{
                    $t("profile.orders.orders_details.cancel_confirmation", {
                      number: order.id,
                    })
                  }}
                </p>
              </v-card-text>
              <v-card-actions class="d-block align-center text-center pa-3">
                <v-btn color="btn-cancel-order" rounded @click="cancelOrder">
                  {{ $t("profile.orders.orders_details.yes") }}
                </v-btn>

                <v-btn color="btn-cancel-order" rounded @click="dialog = false">
                  {{ $t("profile.orders.orders_details.no") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        <!-- </v-col> -->
      </v-row>
    </v-col>
    <v-col cols="12" class="text-left">
      <v-stepper
        v-if="$vuetify.breakpoint.mobile"
        alt-labels
        class="mt-12 mobile-stepper"
        flat
        v-model="order.status"
        vertical
      >
        <v-stepper-step
          class="mobile-step"
          step="1"
          color="#65382c"
          :complete="status === 'created'"
        >
          {{ statuses.created }}
        </v-stepper-step>

        <v-stepper-content step="1" v-if="$vuetify.breakpoint.mobile">
        </v-stepper-content>
        <v-divider v-else></v-divider>

        <v-stepper-step
          class="mobile-step"
          step="2"
          color="#65382c"
          :complete="status === 'paid'"
        >
          {{ statuses.paid }}
        </v-stepper-step>

        <v-stepper-content step="2" v-if="$vuetify.breakpoint.mobile">
        </v-stepper-content>
        <v-divider v-else></v-divider>

        <v-stepper-step
          class="mobile-step"
          step="3"
          color="#65382c"
          :complete="status === 'in_progress'"
        >
          {{ statuses.in_progress }}
        </v-stepper-step>
        <v-stepper-content step="3" v-if="$vuetify.breakpoint.mobile">
        </v-stepper-content>
        <v-divider v-else></v-divider>

        <v-stepper-step
          class="mobile-step"
          step="4"
          color="#65382c"
          :complete="status === 'ready_for_delivery'"
        >
          {{ statuses.ready_for_delivery }}
        </v-stepper-step>
        <v-stepper-content
          class="mobile-step"
          step="4"
          v-if="$vuetify.breakpoint.mobile"
        >
        </v-stepper-content>
        <v-divider v-else></v-divider>
        <v-stepper-step
          class="mobile-step"
          step="5"
          color="#65382c"
          :complete="status === 'on_the_way'"
        >
          {{ statuses.on_the_way }}
        </v-stepper-step>
        <v-stepper-content step="5" v-if="$vuetify.breakpoint.mobile">
        </v-stepper-content>
        <v-divider v-else></v-divider>
        <v-stepper-step
          class="mobile-step"
          step="6"
          color="#65382c"
          :complete="status === 'delivered'"
        >
          {{ statuses.delivered }}
        </v-stepper-step>
        <v-stepper-content step="5" v-if="$vuetify.breakpoint.mobile">
        </v-stepper-content>
      </v-stepper>
      <v-stepper v-else alt-labels class="mt-12" flat v-model="status">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="status === 'created'">
            {{ statuses.created }}
          </v-stepper-step>

          <v-stepper-content step="1" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
          <v-divider v-else></v-divider>

          <v-stepper-step step="2" :complete="status === 'paid'">
            {{ statuses.paid }}
          </v-stepper-step>

          <v-stepper-content step="2" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
          <v-divider v-else></v-divider>

          <v-stepper-step step="3" :complete="status === 'in_progress'">
            {{ statuses.in_progress }}
          </v-stepper-step>
          <v-stepper-content step="3" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
          <v-divider v-else></v-divider>

          <v-stepper-step step="4" :complete="status === 'ready_for_delivery'">
            {{ statuses.ready_for_delivery }}
          </v-stepper-step>
          <v-stepper-content step="4" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
          <v-divider v-else></v-divider>
          <v-stepper-step step="5" :complete="status === 'on_the_way'">
            {{ statuses.on_the_way }}
          </v-stepper-step>
          <v-stepper-content step="5" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
          <v-divider v-else></v-divider>
          <v-stepper-step step="6" :complete="status === 'delivered'">
            {{ statuses.delivered }}
          </v-stepper-step>
          <v-stepper-content step="5" v-if="$vuetify.breakpoint.mobile">
          </v-stepper-content>
        </v-stepper-header>
      </v-stepper>
    </v-col>
    <v-col>
      <!-- <h3>{{ $t("profile.orders.orders_details.order_location") }}</h3> -->
      <div
        class="map-container disabled" style="height: 400px"
      >
      <!-- Attributes before hiding the map, put it back to the div above, if you are going to unhide the map -->
      <!--
        :data-message="$t('profile.orders.orders_details.map_disabled')"
        :class="`map-container ${status !== 'on_the_way' ? 'disabled' : ''}`" 
      -->

        <!-- <GmapMap
          :center="position"
          :zoom="19"
          map-type-id="terrain"
          style="width: 100%; height: 400px"
        >
          <GmapMarker
            :icon="{
              url: require('../../../../static/images/fast-delivery.png'),
            }"
            :position="position"
          />
        </GmapMap> -->
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Product from "@/components/common/Product.vue";
import {
  cancelOrder,
  rateOrder,
  show as getOrder,
  trackOrder,
} from "@/apis/orders";
export default {
  components: {
    Product,
  },
  data(vm) {
    return {
      interval: null,
      position: { lat: 30.0588, lng: 31.2268 },
      id: null,
      dialog: false,
      rateDialog: false,
      form: {
        review: "",
        rate: 1,
      },
      order: {},
      realTimeStatus: null,
      statuses: {
        created: vm.$t("profile.orders.orders_details.created"),
        pending: vm.$t("profile.orders.status.pending"),
        confirmed: vm.$t("profile.orders.status.confirmed"),
        in_progress: vm.$t("profile.orders.orders_details.in_progress"),
        ready_for_delivery: vm.$t(
          "profile.orders.orders_details.ready_for_delivery"
        ),
        paid: vm.$t("profile.orders.orders_details.paid"),
        on_the_way: vm.$t("profile.orders.orders_details.on_the_way"),
        processing: vm.$t("profile.orders.status.processing"),
        picked: vm.$t("profile.orders.status.picked"),
        shipped: vm.$t("profile.orders.status.shipped"),
        delivered: vm.$t("profile.orders.status.delivered"),
      },
      // order: {
      //   address: {
      //     city: {},
      //     country: {},
      //   },
      //   products: [],
      // },
    };
  },
  computed: {
    canCancel() {
      return this.order.status === "created";
    },
    new_notification() {
      debugger;
      return this.$store.getters["notification/last_item"];
    },
    status() {
      if (this.order.status && this.realTimeStatus?.order_id == this.order.id) {
        debugger;
        return this.realTimeStatus.order_status;
      } else {
        debugger;
        return this.order.status;
      }
    },
  },
  watch: {
    new_notification: {
      handler(value) {
        debugger;
        console.log("value", value);
        this.realTimeStatus = value;
      },
      deep: true,
    },
  },
  methods: {
    setNotification() {
      this.$store.dispatch("notification/setNewStatus");
    },
    cancelOrder() {
      this.loading = true;
      cancelOrder(this.id).then(() => {
        this.loading = false;
        this.dialog = false;
      });
    },
    addReview() {
      this.loading = true;
      rateOrder(this.id, this.form).then(() => {
        this.rateDialog = false;
        this.loading = false;
      });
    },
    getOrder() {
      this.loading = true;
      getOrder(this.id).then(({ data }) => {
        if (data.est_time && new Date(data.est_time) instanceof Date) {
          data.est_time = new Date(data.est_time).toLocaleString(
            this.$i18n.locale
          );
        } else {
          if (data.est_time.includes(":")) {
            let date = new Date(data.created_at);
            date.setHours(data.est_time.split(":")[0]);
            date.setMenutes(data.est_time.split(":")[1]);
            data.est_time = date.toLocaleString(this.$i18n.locale);
          }
        }
        this.order = data;
        this.loading = false;
      });
    },
    // async showLocation() {
    //   const { lat, lng } = await trackOrder(this.id);
    //   this.position = {
    //     lat,
    //     lng,
    //   };
    // },
  },
  created() {
    this.id = this.$route.params.id;
    this.getOrder();
    // this.interval = setInterval(() => {
    //   this.showLocation();
    // }, 3000);
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  },
};
</script>

<style>
.font--size__40 {
  font-size: 2.5rem !important;
}

.v-stepper__step__step:not(.primary) {
  color: transparent !important ;
}

.btn-cancel-order {
  background-color: #65382c !important;
  border-color: #65382c !important;
  color: #fff !important;
}

.map-container.disabled {
  filter: grayscale(0);
  pointer-events: none;
  position: relative;
}

.map-container.disabled::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(../../../../static/images/Chef.png);
  background-color: white;
  height: 100%;
  width: 101%;
  background-position: center;
}
</style>
