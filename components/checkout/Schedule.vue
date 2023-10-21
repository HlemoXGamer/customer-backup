<template>
  <div class="my-5">
    <p v-if="!same_day" class="font-weight-bold mb-2">delivery Date</p>
    <v-menu
      v-if="!same_day"
      :disabled="same_day"
      transition="scale-transition"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
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
          v-model="delivery_date"
          :error-messages="$validationMsgs($v.delivery_date)"
          @input="$v.delivery_date.$touch()"
        ></v-text-field>
      </template>
      <v-date-picker
        :allowed-dates="isAllowedDate"
        no-title
        scrollable
        v-model="delivery_date"
      >
      </v-date-picker>
    </v-menu>
    <v-divider v-if="!same_day" class="mb-3" />
    <p class="font-weight-bold mb-2">delivery time</p>
    <v-menu
      transition="scale-transition"
      v-model="delivery_time_model"
      ref="menu"
      min-width="auto"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <vue-timepicker
          :disabled="textDisable"
          clearable
          :label="$t('choose_time')"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          dense
          solo
          flat
          class="rounded-lg"
          placeholder="Enter Your Time"
          v-model="delivery_time"
          input-width="100%"
          format="hh:mm A"
          drop-direction="up"
          required="true"
          :hour-range="allowed_hours"
          hour-label="Hour"
          minute-label="Minute"
          apm-label="AM/PM"
        >
        </vue-timepicker>
      </template>
    </v-menu>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";
import { required, helpers, minValue } from "vuelidate/lib/validators";
import { show as getBranch } from "@/apis/branches";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
// import { h } from "vuelidate/lib/vval";

export default {
  props: {
    same_day: {
      type: Boolean,
      default: true,
    },
    branch: {
      type: Object,
      default: {},
    },
    same_date_branch: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    date_of_week: [],
    delivery_time_model: false,
    head_branch: "",
  }),
  components: { VueTimepicker },
  computed: {
    ...mapFields("checkout", [
      "form.delivery_time",
      "form.delivery_date",
      "form",
    ]),
    min() {},
    ...mapState("cart", ["branch_start", "branch_end"]),
    allowed_hours() {
      const results = [];

      if (!this.$props.same_day) {
        const branch = this.$props.same_date_branch;
        if (branch.start.includes(":") && branch.end.includes(":")) {
          const startHours = 8;
          const endHours = +branch.end.split(":")[0];
          for (let i = startHours; i <= endHours; i++) {
            results.push(i);
          }
          // console.log("timers ==> ", results);
        }
      } else {
        if (this.$auth.loggedIn) {
          if (
            this.branch_start.includes(":") &&
            this.branch_end.includes(":")
          ) {
            const startHours = 8;
            // const startHours = +this.branch_start.split(":")[0];
            const endHours = +this.branch_end.split(":")[0];
            const currentHours = new Date().getHours() + 1;
            if (startHours > currentHours) {
              for (let i = startHours; i <= endHours; i++) {
                results.push(i);
              }
              // console.log("timers ==> ", results);
            } else {
              // console.log(currentHours);
              for (let i = currentHours + 1; i <= endHours; i++) {
                results.push(i);
              }
              // console.log("timers ==> ", results);
            }
          }
        } else {
          // const branch_po = getBranch(localStorage.getItem("guest_branch"));
          const branch = this.$props.branch;
          if (branch.start.includes(":") && branch.end.includes(":")) {
            // const startHours = +branch.start.split(":")[0];
            const startHours = 8;
            const endHours = +branch.end.split(":")[0];
            const currentHours = new Date().getHours();
            if (startHours > currentHours) {
              for (let i = startHours; i <= endHours; i++) {
                results.push(i);
              }
              console.log("timers ==> ", results);
            } else {
              for (let i = currentHours + 1; i <= endHours; i++) {
                results.push(i);
              }
            }
          }
        }
      }
      return results;
    },

    textDisable() {
      if (new Date().getHours() >= 18 && this.$props.same_day) {
        return true;
      } else {
        return false;
      }
    },
  },
  validations() {
    return {
      delivery_date: {
        required: helpers.withParams(
          {
            lang: this.$i18n.locale,
          },
          required
        ),
      },
      delivery_time: {
        required,
        minValue: minValue(new Date().getHours()),
      },
    };
  },
  methods: {
    isAllowedDate(date) {
      return this.date_of_week.includes(new Date(date).toDateString());
    },
    getDaysFromNow(number, start) {
      const days = [];
      const firstDay = new Date();
      if (start) {
        firstDay.setDate(firstDay.getDate() + start);
      } else {
        firstDay.setDate(firstDay.getDate());
      }
      days.push(firstDay.toDateString());
      for (let i = start || 0 + 1; i <= number; i++) {
        const today = new Date();
        today.setDate(today.getDate() + i);
        days.push(today.toDateString());
      }
      return days;
    },
    setSameDay() {
      console.log("same_day", this.$props.same_day);
      const date = new Date();
      let A,
        hh = "";
      const mm =
        date.getMinutes().toString().length != 2
          ? "0" + date.getMinutes().toString()
          : date.getMinutes().toString();
      if (this.$props.same_day) {
        if (date.getHours() > 12) {
          A = "PM";
          hh = (date.getHours() - 12).toString();
          if (hh.length != 2) {
            hh = "0" + hh;
          }
        } else {
          A = "AM";
          hh = date.getHours();
          if (hh.length != 2) {
            if (hh == "0") {
              hh = "12";
            } else {
              hh = "0" + hh;
            }
          }
        }
        this.delivery_date =
          date.getFullYear() +
          "-" +
          ((date.getMonth() + 1).toString().length != 2
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate().toString().length != 2
            ? "0" + date.getDate()
            : date.getDate());
        this.delivery_time = {
          hh: "",
          mm: "",
          A: "",
        };
      } else {
        this.delivery_date =
          date.getFullYear() +
          "-" +
          ((date.getMonth() + 1).toString().length != 2
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          ((date.getDate() + 1).toString().length != 2
            ? "0" + (date.getDate() + 1)
            : date.getDate() + 1);

        this.delivery_time = { hh: "", mm: "", A: "" };
      }

      console.log("delivery_date", this.delivery_date);
      console.log("delivery_time", this.delivery_time);
    },
    get_branch() {
      getBranch(localStorage.getItem("guest_branch")).then(({ data }) => {
        this.branch = data;
      });

      getBranch(2).then(({ data }) => {
        this.same_date_branch = data;
      });
    },
  },
  created() {
    this.date_of_week = this.getDaysFromNow(7, 1);
    this.setSameDay();
    // this.get_branch();
  },
};
</script>

<style>
.vue__time-picker {
  width: 100%;
}
.vue__time-picker input.display-time {
  height: 42px;
  border: 2px solid #d7d7d7;
  border-radius: 8px;
  width: 100%;
}
.vue__time-picker .dropdown.drop-up,
.vue__time-picker-dropdown.drop-up {
  top: auto;
  bottom: calc(2.3em + 10px);
}

.vue__time-picker-dropdown,
.vue__time-picker .dropdown {
  width: 100%;
  top: calc(2.3em + 10px);
  bottom: auto;
}
.vue__time-picker-dropdown ul li:not([disabled]).active,
.vue__time-picker-dropdown ul li:not([disabled]).active:focus,
.vue__time-picker-dropdown ul li:not([disabled]).active:hover,
.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #353030;
  color: #fff;
}

.vue__time-picker-dropdown ul.apms,
.vue__time-picker-dropdown ul.minutes,
.vue__time-picker-dropdown ul.seconds,
.vue__time-picker .dropdown ul.apms,
.vue__time-picker .dropdown ul.minutes,
.vue__time-picker .dropdown ul.seconds {
  border-left: 1px solid #4e4949;
}
</style>