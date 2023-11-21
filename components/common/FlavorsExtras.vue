<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" @click:outside="$emit('close')" class="rounded-lg">
            <v-card class="px-2 pb-2 rounded-lg">
                <v-card-title class="pt-5 pb-0">
                    <p class="my-0 mx-0 text-left font-weight-bold font-primary text-h6">{{ $t("common.extras_flavors") }}</p>
                </v-card-title>
                <v-card-text>
                    <v-card class="a-product-card d-flex align-center justify-space-betweenm my-1 py-2 px-0" width="100%"
                      style="border-radius: 10px;" color="#fff" v-for="(product, index) in items" :key="index">
                      <v-card-text class="py-0 px-0 d-flex flex-row justify-space-between" style="height: 40px">
                        <v-row no-gutters class="align-center justify-space-between h-100" style="height: 100%;">
                          <v-col class="px-0 my-0 mx-0 py-0 d-flex flex-column justify-space-between h-100" style="height: 100%;">
                            <p class="mb-0 font-weight-bold text-left w-100" :class="{ 'text-right': $i18n.locale == 'ar' }"
                              style="color:#65382c; font-size: 16px;">
                              {{ product.name }}
                            </p>
                            <p class="mb-0 text-left" :class="{ 'text-right': $i18n.locale == 'ar' }" style="color:#65382c; font-size: 15px;">
                              {{ Number(product.price).toFixed(2) }} {{ $t("products.KWD") }}
                            </p>
                          </v-col>
                          <div class="d-flex align-center justify-center">
                            <p class="mx-2 mb-0 font-weight-bold text-left w-100" :class="{ 'text-right': $i18n.locale == 'ar' }" style="color:#65382c; font-size: 17px;">
                                x {{ product.quantity }}
                            </p>
                            <!-- <v-btn :loading="loading" small icon class="rounded-sm px-0 py-0 mx-0 my-0"
                              @click="removeItem(product.extra_flavor_id)">
                              <v-icon small class="mx-0 my-0 rounded" style="color: #65382c;">mdi-delete</v-icon>
                            </v-btn> -->
                          </div>
                        </v-row>
                      </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default{
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            items: []
        }
    },
    methods: {
        async removeItem(product_id){
            this.$emit("remove", product_id);
        }
    }
}
</script>