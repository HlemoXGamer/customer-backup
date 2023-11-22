<template>
    <v-col cols="12" :class="{ 'mt-n10': type !== 'asap', 'mt-n5': type == 'asap' }">
        <v-row v-if="isPreOrder || isSameDay" class="align-center justify-center mb-5 mt-0 pt-0">
            <scroll-picker-group class="d-flex justify-center align-center font-weight-bold" style="color: #65382c; font-size: 23px;" v-if="!$vuetify.breakpoint.xs">
                <scroll-picker :options="days" v-model="currentDay" />
                <scroll-picker :options="hours" v-model="currentHour" />
                <scroll-picker :options="minutes" v-model="currentMinute" />
            </scroll-picker-group>
            <scroll-picker-group class="d-flex justify-center align-center font-weight-bold mobile-picker" style="color: #65382c; font-size: calc(1em);" v-if="$vuetify.breakpoint.xs">
                <scroll-picker class="first-layer" :options="days" v-model="currentDay" />
                <scroll-picker class="middle-layer" :options="hours" v-model="currentHour" />
                <scroll-picker class="last-layer" :options="minutes" v-model="currentMinute" />
            </scroll-picker-group>
        </v-row>
        <v-row v-if="isAsap" class="align-center justify-center text-h6">
            <p class="font-primary font-weight-bold py-5" style="font-size: 18px;">
                {{ $t("checkout.time.delivery")}}
            </p>
        </v-row>
        <v-card>
            <v-card-actions class="d-flex px-0" :class="{ 'flex-column justify-center align-start': $vuetify.breakpoint.xs, 'justify-space-between': !$vuetify.breakpoint.xs }">
                <v-btn @click="back()" elevation="0" text color="grey" large dark style="background: transparent !important"
                    :class="$vuetify.breakpoint.xs ? 'mt-4' : ''">
                    <v-icon :left="$i18n.locale === 'en'" :right="$i18n.locale === 'ar'" large>
                        mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
                    </v-icon>
                    {{ $t("checkout.time.return") }}
                </v-btn>
                <v-btn x-large class="rounded-lg to-payment" :class="{ 'mt-3 py-4': $vuetify.breakpoint.xs}" height="57" color="#65382c" elevation="0" dark
                    :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }" @click="showSummary" :block="$vuetify.breakpoint.xs">
                    {{ $t("checkout.time.continue") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import { mapState } from "vuex";
import { timeChecker } from "~/helpers/timeChecker";
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
            if ((this.isPreOrder) && newHour === '8 pm') {
                // Update the minutes array from 0 to 30 only
                this.minutes = this.generateMinutes(0, 30);
            } else {
                // Otherwise, provide the full range of minutes
                this.minutes = this.generateMinutes(0, 59);
            }
            // Reset currentMinute when currentHour changes
            this.currentMinute = "";
            if (this.isSameDay) {
                const isPm = newHour.includes('pm')
                if (isPm) {
                    if (new Date().getHours() + (new Date().getMinutes() > 15 ? 1 : 0) == (parseInt(newHour) + 12)) {
                        this.minutes = timeChecker('asap', new Date).minutes;
                    }
                } else {
                    if (new Date().getHours() + (new Date().getMinutes() > 15 ? 1 : 0) == (parseInt(newHour))) {
                        this.minutes = timeChecker('asap', new Date).minutes;
                    }
                }
                if (newHour === '8 pm') {
                    this.minutes = this.generateMinutes(0, 30);
                }
            }
        }
    },
    methods: {
        back(){
            this.$store.commit("checkout/SHOW_SHIPPING")
        },
        showSummary() {
            if(this.type == "pre-order" || this.type == "same-day"){
                if ((!this.currentDay || !this.currentHour)) return this.$toast.error(this.$t("checkout.delivery_time_required"))
                this.$store.commit("checkout/SET_DELIVERY_DATE", this.transformDate(this.currentDay + " " + this.currentHour + " " + (this.currentMinute || '00')));
            }
            this.$store.commit("checkout/SHOW_SUMMARY");
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
        ...mapState("checkout", ["type"]),
        isPreOrder() {
            return this.type == 'pre-order';
        },
        isSameDay() {
            return this.type == 'same-day';
        },
        isAsap() {
            return this.type == 'asap';
        }
    },
}
</script>

<style lang="scss" scoped>
:deep(.vue-scroll-picker-layer) .top{
    height: calc(53% - 1em);
}

:deep(.vue-scroll-picker-layer) .bottom{
    height: calc(53% - 1em);
}

:deep(.last-layer) {
    width: 80px;
    .vue-scroll-picker-layer {
        width: 80px;
    }
    .vue-scroll-picker-list {
        width: 80px;
    }
}

:deep(.first-layer){
    width: 170px;
    .vue-scroll-picker-layer {
        width: 170px;
    }
    .vue-scroll-picker-list {
        width: 170px;
    }
}

:deep(.middle-layer){
    width: 80px;
    .vue-scroll-picker-layer {
        width: 80px;
    }
    .vue-scroll-picker-list {
        width: 80px;
    }
}
</style>
