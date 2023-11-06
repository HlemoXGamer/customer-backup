<template>
    <v-col cols="12">
        <v-row v-if="isPreOrder || isSameDay" class="align-center justify-center mb-5 mt-0 pt-0">
            <scroll-picker-group class="flex font-weight-bold" style="color: #65382c;">
                <scroll-picker :options="days" v-model="currentDay" />
                <scroll-picker :options="hours" v-model="currentHour" />
                <scroll-picker :options="minutes" v-model="currentMinute" />
            </scroll-picker-group>
        </v-row>
        <v-row v-if="isAsap" class="align-center justify-center text-h6">
            <p class="font-primary font-weight-bold py-5" style="font-size: 18px;">
                Delivery will arrive after 40 min from Pay time
            </p>
        </v-row>
        <v-card>
            <v-card-actions class="justify-space-between px-0">
                <v-btn @click="back" elevation="0" text color="grey" large dark style="background: transparent !important"
                    :class="$vuetify.breakpoint.xs ? 'mt-4' : ''">
                    <v-icon :left="$i18n.locale === 'en'" :right="$i18n.locale === 'ar'" large>
                        mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
                    </v-icon>
                    {{ $t("checkout.time.return") }}
                </v-btn>
                <v-btn x-large class="rounded-lg to-payment" height="57" color="#65382c" elevation="0" dark
                    :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }" @click="showPayment">
                    {{ $t("checkout.time.continue") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            currentDay: "",
            currentHour: "",
            currentMinute: "",
            // Initialize minutes with a full range as default
            minutes: this.generateMinutes(0, 59),
        }
    },
    watch: {
        // Watcher for the currentHour data property
        currentHour(newHour) {
            // Check if the currentHour is 8:00 PM and we are in preOrder
            console.log(newHour);
            if (this.isPreOrder && newHour === '8 pm') {
                // Update the minutes array from 0 to 30 only
                this.minutes = this.generateMinutes(0, 30);
            } else {
                // Otherwise, provide the full range of minutes
                this.minutes = this.generateMinutes(0, 59);
            }
            // Reset currentMinute when currentHour changes
            this.currentMinute = "";
        }
    },
    methods: {
        showPayment() {
            if ((!this.currentDay || !this.currentHour || this.currentMinute)) return this.$toast.error(this.$t("checkout.delivery_time_required"))
            if (this.isPreOrder || this.isSameDay) this.$store.commit("checkout/SET_DELIVERY_DATE", this.transformDate(this.currentDay + " " + this.currentHour + " " + (this.currentMinute ?? 0)));
            this.$store.dispatch("checkout/checkout", JSON.parse(localStorage.getItem("shipping_address")));
            this.$store.commit("checkout/SHOW_SUMMARY");
        },
        back() {
            this.$store.commit("checkout/SHOW_SHIPPING");
        },
        transformDate(dateTime) {
            const parts = dateTime.split(' ');

            const months = {
                "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
                "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
            };

            const day = parseInt(parts[2], 10);
            const month = months[parts[1]];
            const hour = parseInt(parts[3], 10);
            const minute = parseInt(parts[5], 10);
            const ampm = parts[4];

            const date = new Date();
            date.setFullYear(date.getFullYear(), month, day);
            date.setHours(hour, minute, 0, 0);

            const year = date.getFullYear();
            const monthss = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
            const days = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');


            return `${year}-${monthss}-${days} ${hours}:${minutes}:${seconds} ${ampm}`;
        },
        // Method to generate minutes array
        generateMinutes(start, end) {
            let minutesArray = [];
            for (let i = start; i <= end; i++) {
                minutesArray.push(i < 10 ? `0${i}` : i.toString());
            }
            return minutesArray;
        },
    },
    computed: {
        ...mapState("timer", ["days", "hours", "minutes", "ampm", "payment"]),
        isPreOrder() {
            return this.$store.state.checkout.type == 'pre-order';
        },
        isSameDay() {
            return this.$store.state.checkout.type == 'same-day';
        },
        isAsap() {
            return this.$store.state.checkout.type == 'asap';
        }
    }
}
</script>  
  