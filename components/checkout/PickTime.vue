<template>
    <v-col cols="12">
        <v-row v-if="this.$store.state.checkout.type == 'deliver_now'" class="align-center justify-space-between" style="padding-bottom: 50px;">
            <v-btn @click="isPreOrder = false" :color="!isPreOrder ? '#65382c' : null" elevation="0" :dark="!isPreOrder">Normal</v-btn>
            <v-btn @click="isPreOrder = true" :color="isPreOrder ? '#65382c' : null" elevation="0" :dark="isPreOrder">Pre Order</v-btn>
        </v-row>
        <v-row v-if="isPreOrder" v-row no-gutters class="align-center justify-center">
            <scroll-picker-group class="flex font-weight-bold" style="color: #65382c;">
                <scroll-picker :options="days" v-model="currentDay" />
                <scroll-picker :options="hours" v-model="currentHour" />
                <scroll-picker :options="minutes" v-model="currentMinute" />
                <scroll-picker :options="['AM', 'PM']" v-model="current" />
            </scroll-picker-group>
        </v-row>
        <v-row v-if="!isPreOrder" v-row no-gutters class="align-center justify-center">
            <p>Delivery will arrive after 40 min from pay</p>
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
export default {
    data() {
        return {
            currentTab: "areas",
            currentDay: new Date().getDate(),
            currentHour: "",
            currentMinute: "",
            current: [],
            days: [],
            hours: [],
            minutes: [],
            isPreOrder: this.$store.state.checkout.type == 'deliver_now' ? false : true,
        }
    },
    methods: {
        isDateTodayWithoutYear(targetDate) {
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentDayName = currentDate.toLocaleString('default', { weekday: 'short' });

            return targetDate.includes(currentDay) && targetDate.includes(currentDayName);
        },
        updateTime() { },
        getHoursToEndOfDay(notToday) {
            let currentHour, endHour = 20, currentMinute;
            if (!notToday) {
                currentHour = new Date().getHours();
                currentMinute = new Date().getMinutes();
            } else {
                currentMinute = 1;
                currentHour = 8;
            }
            let isAM = currentHour < 12;
            let hoursArray = [];

            for (let i = currentHour; i < endHour; i++) {
                const hour = i % 12 || 12;
                const period = isAM ? 'AM' : 'PM';
                hoursArray.push(hour);
                isAM = !isAM;
            }

            if (currentHour <= endHour) {
                for (let i = currentMinute; i < 60; i++) {
                    this.minutes.push(`${String(i).length === 1 ? '0' + i : i}`);
                }
            } else {
                this.minutes = [];
            }

            return hoursArray;
        },
        showPayment() {
            this.$store.dispatch("checkout/checkout", JSON.parse(localStorage.getItem("shipping_address")));
        },
        back() {
            this.$store.commit("checkout/SHOW_SHIPPING");
        },
        addDaysToDate(startDate, days) {
            this.days = [];
            for (let i = 0; i < days; i++) {
                const newDate = new Date(startDate);
                newDate.setDate(startDate.getDate() + i);
                this.days.push(newDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' }));
            }
        },
    },
    watch: {
        currentDay(newValue, oldValue) {
            if (newValue !== null) {
                if (this.isDateTodayWithoutYear(newValue)) {
                    this.hours = this.getHoursToEndOfDay(false);
                } else {
                    this.hours = this.getHoursToEndOfDay(true);
                    this.currentHour = 8;
                }
            }
        },
    },
    mounted() {
        this.addDaysToDate(new Date(), 1);
        if (this.$store.state.checkout.type == "deliver_now") {
            this.addDaysToDate(new Date(), 1);
        } else if (this.$store.state.checkout.type == "pre_order") {
            this.addDaysToDate(new Date(), 365);
            this.days.splice(0, 1);
        }
    }
}
</script>