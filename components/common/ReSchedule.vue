<template>
    <v-row justify="center">
        <v-dialog v-model="$props.dialog" persistent max-width="500" class="rounded-lg">
            <v-card class="px-2 pb-2">
                <v-card-title class="text-h6 pt-5 pb-0 font-primary">
                    {{ $t("common.need_reschedule") }}
                </v-card-title>
                <v-card-text>
                    <scroll-picker-group class="flex font-weight-bold" style="color: #65382c;">
                        <scroll-picker :options="[]" />
                        <scroll-picker :options="[]" />
                        <scroll-picker :options="[]" />
                        <scroll-picker :options="[]" />
                    </scroll-picker-group>
                </v-card-text>
                <v-card-actions class="d-flex align-center justify-end">
                    <v-btn color="#65382c" class="white--text" elevation="0" @click="closeDialog">
                        {{ $t("common.confirm") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            enableTime: false
        }
    },
    methods: {
        closeDialog(){
            this.$emit("close");
        }
    }
}
</script>