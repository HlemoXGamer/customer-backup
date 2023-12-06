<template>
    <v-row justify="center">
        <v-dialog v-model="$props.dialog" persistent max-width="500" class="rounded-lg" style="background-color: #fff;">
            <v-card class="px-2 pb-2">
                <v-card-text>
                    <p class="text-h6 pt-5 pb-0 font-primary text-center">Your Are Out Of Range In Current Time Please Reschedule Your Order</p>
                </v-card-text>
                <v-card-actions class="d-flex align-center justify-space-between">
                    <v-btn :loading="loading" color="#65382c" class="white--text" elevation="0"
                        @click="closeDialog('same-day')">
                        Same Day
                    </v-btn>
                    <v-btn :loading="loading" color="#65382c" class="white--text" elevation="0"
                        @click="closeDialog('pre-order')">
                        Pre Order
                    </v-btn>
                    <v-btn :loading="loading" color="#65382c" class="white--text" elevation="0"
                        @click="closeDialog('pick-up')">
                        Pick Up
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapState } from "vuex";
import { updateDate } from "~/apis/orders";
import { refundLatePayment } from "~/apis/orders";
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentDay: "",
            currentHour: "",
            currentMinute: "",
            tab: "reschedule",
            loading: false
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
        async closeDialog(type) {
            localStorage.setItem('order_type', type)
        },
    }
}
</script>


<style scoped lang="scss">
:deep(.vue-scroll-picker-layer) .top {
    height: calc(53% - 1em);
}

:deep(.vue-scroll-picker-layer) .bottom {
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

:deep(.first-layer) {
    width: 170px;

    .vue-scroll-picker-layer {
        width: 170px;
    }

    .vue-scroll-picker-list {
        width: 170px;
    }
}

:deep(.middle-layer) {
    width: 80px;

    .vue-scroll-picker-layer {
        width: 80px;
    }

    .vue-scroll-picker-list {
        width: 80px;
    }
}
</style>