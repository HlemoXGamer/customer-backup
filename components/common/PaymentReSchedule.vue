<template>
    <v-row justify="center">
        <v-dialog v-model="$props.dialog" persistent max-width="500" class="rounded-lg">
            <v-card class="px-2 pb-2">
                <v-card-title class="text-h6 pt-5 pb-0 font-primary">
                    {{ $t("common.need_reschedule") }}
                </v-card-title>
                <v-card-text>
                    <scroll-picker-group class="flex font-weight-bold" style="color: #65382c;">
                        <scroll-picker :options="days" v-model="currentDay" />
                        <scroll-picker :options="hours" v-model="currentHour" />
                        <scroll-picker :options="minutes" v-model="currentMinute" />
                    </scroll-picker-group>
                </v-card-text>
                <v-card-actions class="d-flex align-center justify-end">
                    <v-btn :loading="loading" color="#65382c" class="white--text" elevation="0" @click="closeDialog">
                        {{ $t("common.confirm") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapState } from "vuex";
import { updateDate } from "~/apis/orders";
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        order: {
            required: true
        }
    },
    data() {
        return {
            currentDay: "",
            currentHour: "",
            currentMinute: "",
        }
    },
    computed: {
        ...mapState("timer", ["days", "hours", "minutes", "ampm", "payment"])
    },
    methods: {
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
        async closeDialog() {
            try {
                await updateDate({ order_id: this.order, delivery_date: this.transformDate(this.currentDay + " " + this.currentHour + " " + this.currentMinute) })
                this.$emit("close");
            } catch (err) {
                this.$toast.error("Something went wrong");
            } finally {
                this.loading = false;
            }
        }
    },
}
</script>