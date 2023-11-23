<template>
    <div>
        <v-card class="guest" v-if="!$auth.loggedIn" :color="checkout_loading ? '' : 'grey lighten-4'" rounded="lg" :loading="checkout_loading"
            :disabled="checkout_loading">
            <v-card-title class="text-h6 font-weight-bold grey--text text--darken-1 mb-0 py-5 px-5 font-weight-bold">
                Customer Details
            </v-card-title>
            <v-card-text class="pa-8">
                <v-row>
                    <v-col cols="6">
                        <p><strong>Name:</strong> {{ user?.name }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Email:</strong> {{ user?.email }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Phone:</strong> {{ user?.phone }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Address:</strong> {{ user?.city_name + ", " + user?.area_name + ", " + user?.address }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <!-- <v-card-text>
                <v-card-title class="pb-6">Product Details</v-card-title>
                <v-row>
                    <v-col v-for="product in products" :key="product.id" cols="4">
                        <v-card>
                            <v-img v-if="product.images.length > 0" :src="product.images[0].file" alt="Product Image"
                                height="200"></v-img>
                            <v-card-title class="pa-4">{{ product.product.name_en }}</v-card-title>
                            <v-card-text class="pb-4">
                                Price: {{ product.price }} KWD
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text> -->
        </v-card>

        <v-card class="authed-user grey lighten-4" rounded="lg" v-if="$auth.loggedIn">
            <v-card-title class="text-h6 font-weight-bold grey--text text--darken-1 mb-0 py-5 px-5 font-weight-bold">
                Customer Details
            </v-card-title>
            <v-card-text class="pa-8 pt-4">
                <v-row>
                    <v-col cols="6">
                        <p><strong>Name:</strong> {{ authedUser?.name }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Email:</strong> {{ authedUser?.email }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Phone:</strong> {{ user?.phone }}</p>
                    </v-col>
                    <v-col cols="6">
                        <p><strong>Address:</strong> {{ user?.city_name + ", " + user?.area_name + ", " +  (user?.address ?? user?.address_info) }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="grey lighten-4 mt-4" rounded="lg" v-if="products.length">
            <v-card-title class="text-h6 font-weight-bold grey--text text--darken-1 mb-0 py-5 px-5 font-weight-bold">
                Product Details
            </v-card-title>
            <v-card-text class="pa-8 pt-4">
                <v-row class="align-center">
                    <v-col v-for="product in products" :key="product.id" :cols="$vuetify.breakpoint.smAndDown ? 12 : $vuetify.breakpoint.mobile ? 6 : 4">
                        <v-card>
                            <v-carousel hide-delimiters v-if="product.images.length > 0" height="200" cover>
                              <v-carousel-item
                                cover
                                v-for="(image, index) in product.images"
                                :key="index"
                                :src="image.file"
                              ></v-carousel-item>
                            </v-carousel>
                            <!-- <v-img v-if="product.images.length > 0" :src="product.images[0].file" alt="Product Image"
                                height="200"></v-img> -->
                            <v-card-title class="pa-4">{{ product.product.name_en }}</v-card-title>
                            <v-card-text class="pb-4">
                                <v-row no-gutters class="align-center justify-space-between">
                                    <p class="ma-0 pa-0">
                                        Price: {{ hasExtraFlavor(product.product_id) ? Number(product.price) +  Number(getProductPrice(product.product_id)) : product.price }} KWD
                                    </p>
                                    <div class="d-flex align-center">
                                        <v-btn v-if="hasExtraFlavor(product.product_id)" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product.product_id, 'extras_flavors')">
                                          <v-icon color="#65382c">mdi-candy-outline</v-icon>
                                        </v-btn>
                                        <v-btn v-if="product.product.has_note == 1" icon color="#65382c" small class="d-block black--text mx-1" @click="openDialog(product, 'note')">
                                          <v-icon color="#65382c">mdi-draw-pen</v-icon>
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <productNoteDialog
          :value="dialog.note_dialog"
          @close="dialog.note_dialog = false"
          :notes="dialog.notes"
          :product-id="dialog.product_id"
          :count="dialog.count"
          :self="true"
          :view="true"
          />
        <v-card :color="checkout_loading ? '' : 'grey lighten-4'" rounded="lg" :loading="checkout_loading"
            :disabled="checkout_loading" class="mt-4">
            <v-card-title class="text-h6 font-weight-bold grey--text text--darken-1 mb-0 py-5 px-5 font-weight-bold">
                {{ $t("checkout.summary.title") }}
            </v-card-title>
            <v-card-text class="pa-8">
                <template v-if="items && items.length > 0">
                    <div v-for="item in items" :key="item.id" class="dropcart__product">
                        <div class="dropcart__product-info">
                            <div class="dropcart__product-name row">
                                <span class="col-8 font-primary">
                                    {{ i18n_me(item.product.name_ar, item.product.name_en) }} x
                                    {{ item.quantity }}
                                </span>
                                <span class="col-4 dropcart__product-price">
                                    {{ hasExtraFlavor(item.product_id) ? Number(item.price) +  Number(getProductPrice(item.product_id)) : product.price }} KWD</span>
                            </div>
                        </div>
                    </div>

                    <div :class="`dropcart__totals text-${$i18n.locale === 'ar' ? 'right' : 'left'
                        } font-primary`">
                        <table>
                            <tbody>
                                <template>
                                    <tr>
                                        <th>{{ $t("checkout.sub_total") }}</th>
                                        <td>KWD {{ total }}</td>
                                    </tr>
                                    <tr v-if="newSubTotal">
                                        <th>{{ $t("checkout.new_sub_total") }}</th>
                                        <td>KWD {{ newSubTotal }}</td>
                                    </tr>
                                    <tr v-if="discount">
                                        <th>{{ $t("checkout.discount") }}</th>
                                        <td class="font-weight-bold green--text text--lighten-1">
                                            {{ discount }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{ $t("checkout.delivery_cost") }}</th>
                                        <td>KWD {{ delivery_cost }}</td>
                                    </tr>
                                </template>
                                <tr>
                                    <th colspan="2" style="background-color: #99999930; height: 1px"></th>
                                </tr>

                                <tr class="mt-5">
                                    <th>{{ $t("checkout.total") }}</th>
                                    <td v-if="!newSubTotal">KWD {{ total + delivery_fee }}</td>
                                    <td v-else>KWD {{ newSubTotal + delivery_fee }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-center font-weight-bold pt-5">
                                        {{ $t("checkout.estimated_message") }}

                                        <span style="display: block">{{
                                            // calculateEstimatedTime(
                                            //     est_time,
                                            //     $t("checkout.day"),
                                            //     $t("checkout.hour"),
                                            //     $t("checkout.minute")
                                            // )
                                            type == "asap" ? $t("checkout.time.delivery") : form.delivery_date
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-actions class="d-flex px-0 mt-4" :class="{ 'flex-column justify-center align-start': $vuetify.breakpoint.xs, 'justify-space-between': !$vuetify.breakpoint.xs }">
                <v-btn @click="back" elevation="0" text color="grey" large dark style="background: transparent !important"
                    :class="$vuetify.breakpoint.xs ? 'mt-4' : ''">
                    <v-icon :left="$i18n.locale === 'en'" :right="$i18n.locale === 'ar'" large>
                        mdi-chevron-{{ $i18n.locale === "en" ? "left" : "right" }}
                    </v-icon>
                    {{ $t("checkout.summary.return") }}
                </v-btn>
                <v-btn x-large class="rounded-lg to-payment" :class="{ 'mt-3 py-4': $vuetify.breakpoint.xs}" height="57" color="#65382c" elevation="0" dark
                    :style="{ flex: $vuetify.breakpoint.mobile ? 1 : 0.7 }" @click="showPayment" :block="$vuetify.breakpoint.xs">
                    {{ $t("checkout.summary.continue") }}
                </v-btn>
            </v-card-actions>
        </v-card>
        <commonFlavorsExtras :dialog="dialog.extras_flavors_dialog" :items="dialog.extras_flavors" @close="dialog.extras_flavors_dialog = false" />
    </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import { show as getBranch } from "@/apis/branches";
export default {
    computed: {
        ...mapState("cart", [
            "items",
            "extra_flavors",
            "total",
            "delivery_cost",
            "delivery_fee",
            "est_time",
        ]),
        ...mapState("checkout", ["type", "form", "step", "checkout", "checkout_loading"]),
        ...mapGetters("checkout", ["shipping", "sub_total"]),
        ...mapFields("checkout", ["form.is_pickup", "form.delivery_date"]),
    },
    data() {
        return {
            is_picked: false,
            disabled: false,
            same_day: false,
            label: false,
            checkbox_req: false,
            branch_start: "",
            branch: "",
            same_date_branch: {},
            loading: false,
            products: [],
            discount: "",
            discount_type: "",
            discount_rate: "",
            newSubTotal: "",
            totalWithExtrasFlavors: this.total,
            user: JSON.parse(localStorage.getItem('shipping_address')),
            authedUser: JSON.parse(localStorage.getItem('user')),
            // quantity: 1,
            // totals: [],
            // total: 0,
            // items: [
            //   {
            //     name: "French Croissants",
            //     id: 0,
            //     quantity: 1,
            //     desc: "ngus, beef, cheese, onion, Tomato jam, piks",
            //     categories: "Cake",
            //     price: 250,
            //     mediaUrl:
            //       "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
            //   },
            //   {
            //     name: "English Croissants",
            //     id: 1,
            //     desc: "ngus, beef, cheese, onion, Tomato jam, piks",
            //     categories: "Cake",
            //     price: 100,
            //     quantity: 1,
            //     mediaUrl:
            //       "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
            //   },
            // ],
            dialog: {
              image_dialog: false,
              images: [],
              note_dialog: false,
              notes: [],
              extras_flavors_dialog: false,
              extras_flavors: [],
              product_id: "",
              count: 0,
            },
        };
    },
    mounted() {
        // this.calculateTotals();
        this.setPicked();
        this.products = this.items;
        this.allExtrasFlavors = this.extra_flavors;
        this.get_branch();
    },
    methods: {
        ...mapActions("cart", ["setItemNotes"]),
        getProductPrice(product_id){
            const sum = this.extra_flavors.filter(item => item.product_id == product_id).map(item => item.price * item.quantity).reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            this.totalWithExtrasFlavors = Number(this.total) + Number(sum).toFixed(2);
            return Number(sum).toFixed(2);
        },
        hasExtraFlavor(product_id){
          return this.extra_flavors.map(item => item.product_id).includes(product_id);
        },
        openDialog(product, type) {
          if (type === "image") {
            this.openImageDialog(product);
          } else if(type === "note") {
            this.openNoteDialog(product);
          } else if(type === "extras_flavors"){
            this.openExtrasFlavorsDialog(product);
          }
        },
        openImageDialog(product) {
          this.dialog.images = product.images;
          this.dialog.product_id = product.product_id;
          this.dialog.count = 1;
          const theThis = this;
          setTimeout(function () {
            theThis.dialog.image_dialog = true;
          }, 200);
        },
        openNoteDialog(product) {
          this.dialog.notes = product.notes;
          this.dialog.product_id = product.product_id;
          this.dialog.count = product.quantity;
        
          const theThis = this;
          setTimeout(function () {
            theThis.dialog.note_dialog = true;
          }, 200);
          this.setItemNotes({
            itemNotes: product.notes,
            productId: product.product_id,
          });
        },
        openExtrasFlavorsDialog(product) {
          this.dialog.extras_flavors = this.allExtrasFlavors.filter(item => item.product_id == product);
          this.dialog.extras_flavors_dialog = true;
        },
        back() {
            this.$store.commit("checkout/SHOW_TIME");
        },
        showPayment() {
            this.$store.dispatch("checkout/checkout", JSON.parse(localStorage.getItem("shipping_address")));
        },
        get_branch() {
            getBranch(localStorage.getItem("guest_branch")).then(({ data }) => {
                this.branch = data;
            });

            getBranch(2).then(({ data }) => {
                this.same_date_branch = data;
            });
        },
        calculateEstimatedTime(totalmins, d, h, m) {
            if (Math.sign(totalmins) != -1) {
                var mins = totalmins % 60;
                var hours = Math.floor(totalmins / 60);
                var days = Math.floor(hours / 24);
                var hourss = hours % 24;
                return (
                    days + " " + d + " - " + hourss + " " + h + " - " + mins + " " + m
                );
            } else {
                var absTotal = Math.abs(totalmins);
                var mins = absTotal % 60;
                var hours = Math.floor(absTotal / 60);
                var days = Math.floor(hours / 24);
                var hourss = hours % 24;
                return (
                    ":" +
                    days +
                    " " +
                    d +
                    " - " +
                    hourss +
                    " " +
                    h +
                    " - " +
                    mins +
                    " " +
                    m
                );
            }
        },
        i18n_me(ar, en) {
            if (this.$i18n.locale === "en") {
                return en;
            }
            return ar;
        },
        setPicked() {
            let branch_id = 0;
            let area = " ";
            if (this.$auth.loggedIn) {
                if (localStorage.getItem("default_area")) {
                    area = JSON.parse(localStorage.getItem("default_area"));
                    branch_id = area["branches"][0]["id"];
                } else {
                    branch_id = JSON.parse(localStorage.getItem("default_address"))[
                        "branch_id"
                    ];
                }
            } else {
                branch_id = localStorage.getItem("guest_branch");
            }

            getBranch(branch_id)
                .then(({ data }) => {
                    this.branch = data;
                    const timer = new Date();
                    const start = this.branch.start.split(":")[0];
                    const end = this.branch.end.split(":")[0];
                    this.branch_start = start;
                    if (
                        ((timer.getHours() >= parseInt(end) && parseInt(end) > 12) ||
                            timer.getHours() < parseInt(start)) &&
                        timer.getHours() % 24 >= parseInt(end)
                    ) {
                        this.is_picked = true;
                        this.disabled = true;
                        this.label = true;
                        this.$store.commit("checkout/SET_IS_PICKUP", true);
                    } else {
                        this.is_picked = false;
                        this.disabled = false;
                        this.label = false;
                        this.$store.commit("checkout/SET_IS_PICKUP", false);
                    }

                    if (timer.getHours() >= 0 && parseInt(start) > timer.getHours()) {
                        this.is_picked = false;
                        this.same_day = true;
                        this.checkbox_req = true;
                        this.$store.commit("checkout/SET_IS_PICKUP", true);
                    }
                })
                .catch((err) => {
                    if (err === "You Are Trying To Access A Forbidden Request") {
                        this.$router.push(this.localePath("/profile/orders"));
                    }
                    if (err === "Unauthenticated.") {
                        this.$router.push({
                            path: this.localePath("/login"),
                            query: { order_id: this.id },
                        });
                    }
                });
        },
        reverseCheckbox(chckbox) {
            if (this.same_day === true || this.is_picked === true) {
                this.$store.commit("checkout/SET_IS_PICKUP", true);
            } else {
                this.$store.commit("checkout/SET_IS_PICKUP", false);
                this.$store.commit("checkout/SET_DELIVERY_DATE", null);
            }
            const timer = new Date();
            if (
                this.checkbox_req === true &&
                timer.getHours() >= 0 &&
                parseInt(this.branch_start) > timer.getHours()
            ) {
                this[chckbox] = true;
            } else {
                this.checkbox_req = false;
            }
        },
    },
};
</script>
<style scoped>
.dropcart__totals {
    padding: 16px 6px 0;
}

.dropcart__product-info .font-primary {
    font-size: 1rem !important;
}

.dropcart__totals.font-primary {
    font-size: 1rem !important;
}

.dropcart__totals th {
    padding-right: 16px;
    text-align: left;
}

[dir="rtl"] .dropcart__totals th {
    padding-left: 16px;
    padding-right: unset;
    text-align: right;
}

.dropcart__totals td {
    text-align: right;
}

[dir="rtl"] .dropcart__totals td {
    text-align: left;
}

.dropcart__totals table {
    width: 100%;
}
</style>
  