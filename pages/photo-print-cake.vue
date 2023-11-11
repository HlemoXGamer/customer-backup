<template>
    <v-row no-gutters>
        <v-col cols="12" class="mb-3 mt-7 pt-5" style="position: relative;">
            <v-btn @click="$router.back()" color="#65382c" text style="position: absolute;" class="ml-n4 mt-n14" elevation="0"><v-icon>mdi-chevron-left</v-icon>{{ $t("checkout.shipping.back") }}</v-btn>
            <v-btn @click="step('back')" large color="#65382c" icon style="position: absolute;" :class="{ 'ml-10': !$vuetify.breakpoint.xs }"
                v-if="activeStep > 0"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
            <p class="text-center text-h4 font-primary font-weight-bold" :class="{ 'pt-11': $vuetify.breakpoint.xs && activeStep > 0 }">{{ activeStep == 2 ? titles[activeStep + 1] :
                titles[activeStep] }}</p>
        </v-col>
        <v-col cols="12">
            <v-row no-gutters class="d-flex align-center justify-center" v-if="loading && items.length == 0">
                <v-progress-circular :size="50" color="#65382c" indeterminate></v-progress-circular>
            </v-row>
            <v-tabs-items v-model="activeStep">
                <v-tab-item key="0">
                    <v-row no-gutters v-for="(parent, index) in Object.keys(categoryCriteria)" :key="index">
                        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : $vuetify.breakpoint.mobile ? 6 : 4"
                            v-for="(child, childIndex) in Object.keys(categoryCriteria[parent])" :key="childIndex"
                            class="d-flex align-center justify-center my-3">
                            <v-card class="d-flex justify-space-between rounded-lg col-11 py-0 px-0"
                                @click="pickType(parent, child)" height="110px" color="#ecbaa8" style="overflow: hidden;">
                                <div style="width: 150px; height: 100%;">
                                    <v-img :lazy-src="Object.values(categoryCriteria[parent])[childIndex].image"
                                        :src="Object.values(categoryCriteria[parent])[childIndex].image" cover width="100%"
                                        height="100%" />
                                </div>
                                <v-card-text class="py-0 px-2 d-flex flex-column align-center justify-center py-3"
                                    style="width: 100%">
                                    <p class="font-primary text-center mb-0 font-weight-bold text-uppercase"
                                        style="width: 100%; font-size: 18px;">
                                        {{ parent }}
                                    </p>
                                    <p v-if="child !== parent"
                                        class="mt-3 font-primary text-center mb-0 font-weight-bold text-uppercase"
                                        style="width: 100%; font-size: 18px;">
                                        {{ child !== parent ? child : '' }}
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item key="1">
                    <v-row v-if="parent !== '' && type !== ''" no-gutters>
                        <div v-if="Object.keys(categoryCriteria[parent][type]).includes('sizes')" style="width: 100%">
                            <v-row no-gutters v-for="(size, index) in Object.keys(categoryCriteria[parent][type]['sizes'])"
                                :key="index">
                                <v-col cols="12" class="d-flex align-center justify-center my-2">
                                    <v-card
                                        class="d-flex justify-space-between align-center col-11 py-0 px-0 rounded-lg ps-4"
                                        @click="pickSize(size)" height="80px"
                                        style="overflow: hidden; border: 2px solid #ecbaa8;">
                                        <v-card-text class="py-0 px-0 py-3" style="width: fit-content">
                                            <p class="font-primary text-center mb-0 font-weight-bold text-uppercase"
                                                style="width: 100%; font-size: 20px;">
                                                {{ size }} &nbsp; | &nbsp; {{
                                                    categoryCriteria[parent][type]['sizes'][size]['price']
                                                }} KWD
                                            </p>
                                        </v-card-text>
                                        <div style="width: 150px; height: 100%;">
                                            <v-img :lazy-src="categoryCriteria[parent][type]['image']"
                                                :src="categoryCriteria[parent][type]['image']" cover width="100%"
                                                height="100%" />
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <v-row no-gutters v-if="!Object.keys(categoryCriteria[parent][type]).includes('sizes')">
                            <v-col cols="12" class="d-flex align-center justify-space-between my-3">
                                <v-card class="d-flex justify-space-between align-center col-12 py-0 px-0 rounded-lg ps-4"
                                    @click="pickSize(type)" height="80px"
                                    style="overflow: hidden; border: 2px solid #ecbaa8;">
                                    <v-card-text class="py-0 px-0 py-3" style="width: fit-content">
                                        <p class="font-primary text-center mb-0 font-weight-bold text-uppercase"
                                            style="width: 100%; font-size: 20px;">
                                            {{ type }} &nbsp; | &nbsp; {{ categoryCriteria[parent][type]['price'] }} KWD
                                        </p>
                                    </v-card-text>
                                    <div style="width: 150px; height: 100%;">
                                        <v-img :lazy-src="categoryCriteria[parent][type]['image']"
                                            :src="categoryCriteria[parent][type]['image']" cover width="100%"
                                            height="100%" />
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-tab-item>
                <v-tab-item key="2">
                    <div v-if="parent !== '' && size !== '' && (type !== 'heart cake' && type !== '')">
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4">
                            <p class="text-center text-h5 font-primary font-weight-bold mb-5 mt-5">{{ titles[activeStep] }}
                            </p>
                            <v-btn large color="#65382c" icon v-if="color !== ''"
                                @click="color = ''"><v-icon>mdi-reload</v-icon></v-btn>
                        </v-row>
                        <div v-if="Object.keys(categoryCriteria[parent][type]['sizes'][size]).includes('colors')">
                            <v-row no-gutters>
                                <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : $vuetify.breakpoint.mobile ? 6 : 4" class="d-flex align-center justify-center my-2"
                                    v-for="(itemColor, index) in Object.values(categoryCriteria[parent][type]['sizes'][size]['colors'])"
                                    :key="index">
                                    <v-card
                                        :color="String(itemColor).toLowerCase().trim() !== 'off white' ? String(itemColor).toLowerCase().trim() !== 'white' ? itemColor : '#fbf7f5' : ''"
                                        class="col-11 rounded-lg d-flex align-center justify-center"
                                        :class="{ 'active-color': itemColor == color }" @click="pickColor(itemColor)"
                                        height="80px" style="border: 1px solid #ecbaa8">
                                        <p class="text-h6 text-uppercase text-center mb-0 font-weighb-bold"
                                            :class="{ 'white--text': String(itemColor).toLowerCase().trim() !== 'off white' && String(itemColor).toLowerCase().trim() !== 'white' }">
                                            <v-icon
                                                :color="String(itemColor).toLowerCase().trim() !== 'off white' && String(itemColor).toLowerCase().trim() !== 'white' ? '#fff' : '#000'">mdi-eyedropper-variant</v-icon>
                                            {{ itemColor }}
                                        </p>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4"
                            v-if="Object.keys(matchedItem).includes('flavor') && color !== ''">
                            <p class="text-left text-h5 font-primary font-weight-bold mb-5 mt-5" v-if="matchedItem.flavor.length > 0">Flavors</p>
                            <v-btn large color="#65382c" icon v-if="flavor !== '' && matchedItem.flavor.length > 0"
                                @click="flavor = ''"><v-icon>mdi-reload</v-icon></v-btn>
                        </v-row>
                        <v-row no-gutters v-if="Object.keys(matchedItem).includes('flavor') && color !== ''">
                            <v-col cols="12" class="px-5">
                                <v-radio-group v-if="matchedItem.flavor.length > 0" v-model="flavor" row class="d-flex align-center justify-center my-2" color="#65382c">
                                    <v-radio v-for="(flavor, index) in matchedItem?.flavor" :key="index" :label="flavor.name"
                                        :value="flavor.id" color="#65382c"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4"
                            v-if="Object.keys(matchedItem).includes('extra') && color !== ''">
                            <p class="text-left text-h5 font-primary font-weight-bold mb-5 mt-5" v-if="matchedItem.extra.length > 0">Extras</p>
                        </v-row>
                        <v-row no-gutters v-if="Object.keys(matchedItem).includes('extra') && color !== ''">
                            <v-col cols="6" style="border-right: 1px solid #65382c;" class="px-5" v-if="matchedItem.extra.length > 0">
                                <p class="text-h6 font-primary font-weight-bold text-center">Left Half</p>
                                <v-radio-group v-model="extra_left" class="d-flex align-center justify-center my-2"
                                    color="#65382c" hide-details>
                                    <v-radio v-for="(extra, index) in matchedItem?.extra" :key="index" :label="extra.name"
                                        :value="extra.id" color="#65382c"></v-radio>
                                    <v-radio value="" label="None"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="6" style="border-left: 1px solid #65382c;" class="px-5" v-if="matchedItem.extra.length > 0">
                                <p class="text-h6 font-primary font-weight-bold text-center">Right Half</p>
                                <v-radio-group v-model="extra_right" class="d-flex align-center justify-center my-2"
                                    color="#65382c" hide-details>
                                    <v-radio v-for="(extra, index) in matchedItem?.extra" :key="index" :label="extra.name"
                                        :value="extra.id" color="#65382c"></v-radio>
                                    <v-radio value="" label="None" color="#65382c"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row v-if="color !== '' && size !== '' && type !== '' && parent !== ''" no-gutters
                            class="mt-7 align-center justify-center px-5"><v-btn large color="#65382c" class="white--text"
                                @click="saveCake()"><v-icon>mdi-check</v-icon> Confrim</v-btn></v-row>
                    </div>
                    <div v-if="type == 'heart cake' && parent == 'heart cake'">
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4">
                            <p class="text-center text-h5 font-primary font-weight-bold mb-5 mt-5">{{ titles[activeStep] }}
                            </p>
                            <v-btn large color="#65382c" icon v-if="color !== ''"
                                @click="color = ''"><v-icon>mdi-reload</v-icon></v-btn>
                        </v-row>
                    <div v-if="Object.keys(categoryCriteria[parent][type]).includes('colors')">
                            <v-row no-gutters>
                                <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : $vuetify.breakpoint.mobile ? 6 : 4" class="d-flex align-center justify-center my-2"
                                    v-for="(itemColor, index) in Object.values(categoryCriteria[parent][type]['colors'])"
                                    :key="index">
                                    <v-card
                                        :color="String(itemColor).toLowerCase().trim() !== 'off white' ? String(itemColor).toLowerCase().trim() !== 'white' ? itemColor : '#fbf7f5' : ''"
                                        class="col-11 rounded-lg d-flex align-center justify-center"
                                        :class="{ 'active-color': itemColor == color }" @click="pickColor(itemColor)"
                                        height="80px" style="border: 1px solid #ecbaa8">
                                        <p class="text-h6 text-uppercase text-center mb-0 font-weighb-bold"
                                            :class="{ 'white--text': String(itemColor).toLowerCase().trim() !== 'off white' && String(itemColor).toLowerCase().trim() !== 'white' }">
                                            <v-icon
                                                :color="String(itemColor).toLowerCase().trim() !== 'off white' && String(itemColor).toLowerCase().trim() !== 'white' ? '#fff' : '#000'">mdi-eyedropper-variant</v-icon>
                                            {{ itemColor }}
                                        </p>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4"
                            v-if="matchedItem?.flavor.length">
                            <p class="text-left text-h5 font-primary font-weight-bold mb-5 mt-5">Flavors</p>
                            <v-btn large color="#65382c" icon v-if="flavor !== ''"
                                @click="flavor = ''"><v-icon>mdi-reload</v-icon></v-btn>
                        </v-row>
                        <v-row no-gutters v-if="matchedItem?.flavor.length">
                            <v-col cols="12" class="px-5">
                                <v-radio-group v-model="flavor" row class="d-flex align-center justify-center my-2" color="#65382c">
                                    <v-radio v-for="(flavor, index) in matchedItem?.flavor" :key="index" :label="flavor.name"
                                        :value="flavor.id" color="#65382c"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class=" d-flex align-center justify-space-between px-4"
                            v-if="matchedItem?.extra.length">
                            <p class="text-left text-h5 font-primary font-weight-bold mb-5 mt-5">Extras</p>
                        </v-row>
                        <v-row no-gutters v-if="matchedItem?.extra.length">
                            <v-col cols="6" style="border-right: 1px solid #65382c;" class="px-5">
                                <v-radio-group v-model="extra_left" class="d-flex align-center justify-center my-2"
                                    color="#65382c" hide-details>
                                    <v-radio v-for="(extra, index) in matchedItem?.extra" :key="index" :label="extra.name"
                                        :value="extra.id"></v-radio>
                                    <v-radio value="" label="None"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="6" style="border-left: 1px solid #65382c;" class="px-5">
                                <v-radio-group v-model="extra_right" class="d-flex align-center justify-center my-2"
                                    color="#65382c" hide-details>
                                    <v-radio v-for="(extra, index) in matchedItem?.extra" :key="index" :label="extra.name"
                                        :value="extra.id"></v-radio>
                                    <v-radio value="" label="None"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row v-if="color !== '' && type !== '' && parent !== ''" no-gutters
                            class="mt-7 align-center justify-center px-5"><v-btn large color="#65382c" class="white--text"
                                @click="saveCake()"><v-icon>mdi-check</v-icon> Confrim</v-btn></v-row>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-col>

        <v-dialog v-model="dialog" max-width="750" v-if="Object.keys(product).length && !$vuetify.breakpoint.mobile">
            <v-card elevation="0" outlined rounded="md" :class="`d-flex flex-column overflow-hidden px-5 py-7 product-dialog
                                   ${$vuetify.breakpoint.mobile ? 'mobile-dialog' : ''}
                                  `">
                <div class="d-flex meta">
                    <img height="72" width="70" :src="product.images[0] ? product.images[0].url : ''" alt="" />
                    <div :class="`flex-grow-1 ${$i18n.locale === 'en' ? 'pl-5' : 'pr-5'}`">
                        <div elevation="0" :class="`
                                                    ${$vuetify.breakpoint.mobile
                                ? 'text-subtitle-2'
                                : 'text-subtitle-1'
    }
                               text-decoration-none
                                                      font-weight-bold font-primary
                                                      bg-transparent
                                                      px-0
                                                    `">
                            {{ i18n_me(product.name_ar, product.name_en) }}
                        </div>

                        <div>
                            <small class="desc">{{
                                i18n_me(product.description_ar, product.description_en)
}}</small>
                        </div>

                        <div class="mt-5">
                            <span v-for="(category, index) in product.categories" :key="category.id"
                                class="text-body-1 font-primary font-weight-bold">
                                {{ i18n_me(category.name_ar, category.name_en) }}
                                <span v-if="index !== product.categories.length - 1">, </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="actions-wrapper">
                            <div>
                                <div :class="`row flex-nowrap justify-${i18n_me(
                                    'start',
                                    'end'
                                )} align-center
                                    `">
                                    <v-btn :disabled="count <= 1" icon class="font-primary" @click="changeCount(-1)">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    <input class="count_input font-primary" v-model="count" />
                                    <v-btn icon class="font-primary" @click="changeCount(1)">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <div class="font-weight-bold font-primary">
                                {{ product.price }} KWD
                            </div>
                        </div>
                    </div>
                </div>
                <div style="color: red; text-align: center" v-if="product.has_image &&
                    (images.length < count || images.length > count * 10)
                ">
                    <span v-if="product.has_image && images.length > count * 10">{{
                        $t("cart.please_upload_less", {
                            number: images.length - count * 10,
                        })
                    }}</span>
                    <span v-if="product.has_image && images.length < count">{{
                        $t("cart.please_upload_more", {
                            number: count - images.length,
                        })
                    }}</span>
                </div>
                <div :class="`row mt-4 ${product.has_image != 1 || product.has_note != 1
                    ? 'justify-center align-center'
                    : 'justify-space-between'
                    }`">
                    <v-btn v-if="product.has_note == 1" @click="note_dialog = true" :loading="addToCartLoading"
                        :disabled="addToCartLoading" class="col-5 text--white white--text" color="black" elevation="0"
                        rounded>
                        {{ $t("products.add_note") }}
                    </v-btn>

                    <v-btn v-if="product.has_image == 1" @click="image_dialog = true" :loading="addToCartLoading"
                        :disabled="addToCartLoading" class="ml-5 col-5 text--white white--text" color="black" elevation="0"
                        rounded>
                        {{ $t("products.upload_image") }}
                    </v-btn>
                    <v-btn :disabled="(product.has_image &&
                        (images.length < count || images.length > count * 10)) ||
                        addToCartLoading
                    " @click="addToCartDialog(product, { count, special_request })" :loading="addToCartLoading"
                        :class="product.has_note == 1 && product.has_image == 1
                            ? 'mt-3 col-5 Newprimary'
                            : 'ml-8 col-5 Newprimary'
                        " elevation="0" rounded :block="product.has_note == 1 && product.has_image == 1">
                        {{ $t("products.product.add_to_cart") }}
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>

        <MobileProductDialog v-if="Object.keys(product).length && $vuetify.breakpoint.mobile" :extra_flavor="extra_flavor"
            :product="product" v-model="dialog" @update="(value) => (this.dialog = value)" />

        <productImageDialog v-if="!$vuetify.breakpoint.mobile" :value="image_dialog" @close="image_dialog = false"
            @add-image="(value) => addImage(value)" @delete-image="(file) => deleteImage(file)" :images="images"
            :count="count" :productId="id" />

        <productNoteDialog v-if="!$vuetify.breakpoint.mobile" :value="note_dialog" @close="note_dialog = false"
            :notes="notes" :count="count" @add-note="(value) => addNote(value)"
            @update-notes="(note) => updateNote(note)" />
    </v-row>
</template>

<script>
import { get } from '~/apis/products';
export default {
    data() {
        return {
            titles: [
                this.$t("common.pick.type"),
                this.$t("common.pick.size"),
                this.$t("common.pick.color"),
                this.$t("common.pick.flavors_extra")
            ],
            items: [],
            categoryCriteria: {},
            parent: "",
            type: "",
            size: "",
            color: "",
            flavor: "",
            extra_flavor: [],
            extra_left: "",
            extra_right: "",
            activeStep: 0,
            matchedItem: { flavor: [], extra: [] },
            loading: false,
            printCakePopUpOpened: false,
            selectedCategoryItems: [],
            selectedCategoryCriteria: {},
            dialog: false,
            image_dialog: false,
            note_dialog: false,
            images: [],
            notes: [],
            deleted_images: [],
            update_notes: [],
            product: {},
            addToCartLoading: false,
            count: 1,
            special_request: "",
            showAlert: false,
            id: "",
        }
    },
    methods: {
        i18n_me(ar, en) {
            if (this.$i18n.locale === "en") {
                return en;
            }
            return ar;
        },
        async getCategory() {
            this.loading = true;

            const { data } = await get({ category: 2, branch_id: !this.$auth.loggedIn ? localStorage.getItem("guest_branch") : '' }, !this.$auth.loggedIn);

            if (!data.length) {
                this.$toast.error(this.$t("products.not_found"));
                this.loading = false;
                return;
            }

            this.items = data;

            let nameArr = data.map((item) => {
                return item.name_en
                    .trim()
                    .split("-")
                    .map((w) => {
                        return String(w).toLowerCase();
                    });
            });

            let newArr = {};
            nameArr.forEach((element) => {
                const product = data.find(product => String(product.name_en).toLowerCase() == element.join("-"))
                if (element.length > 2) {
                    if (!Object.keys(newArr).includes(element[1])) {
                        newArr[element[1]] = {};
                    }
                    if (!Object.keys(newArr[element[1]]).includes(element[0])) {
                        newArr[element[1]][element[0]] = { sizes: {} };
                    }
                    if (!Object.keys(newArr[element[1]][element[0]].sizes).includes(element[2])) {
                        newArr[element[1]][element[0]].sizes[element[2]] = { colors: [] };
                    }
                    if (!newArr[element[1]][element[0]].sizes[element[2]].colors.includes(element[3])) {
                        newArr[element[1]][element[0]].sizes[element[2]].colors.push(element[3]);
                    }
                    if (product !== undefined) {
                        newArr[element[1]][element[0]].sizes[element[2]].price = product.price;
                        newArr[element[1]][element[0]].image = product.images[0].url;
                    }
                } else {
                    if (!Object.keys(newArr).includes(element[0])) {
                        newArr[element[0]] = {};
                        newArr[element[0]][element[0]] = { colors: [], single: true };
                    }
                    if (!newArr[element[0]][element[0]].colors.includes(element[1]) && element.length > 1) {
                        newArr[element[0]][element[0]].colors.push(element[1]);
                    }
                    if (product !== undefined) {
                        newArr[element[0]][element[0]].image = product.images[0].url;
                        newArr[element[0]][element[0]].price = product.price;
                    }
                }
            });
            this.loading = false;
            this.categoryCriteria = newArr;
        },
        step(type) {
            setTimeout(() => {
                if (type == 'back') {
                    this.activeStep -= 1;
                    if (this.activeStep == 0) {
                        this.parent = "";
                        this.type = "";
                        this.size = "";
                        this.color = "";
                        this.flavor = "";
                        this.extra_flavor = [];
                        this.extra_left = "";
                        this.extra_right = "";
                    }
                } else if (type == 'next') {
                    this.activeStep += 1;
                }
            }, 100)
        },
        pickType(parent, type) {
            this.parent = parent;
            this.type = type;
            this.step('next');
        },
        pickSize(size) {
            this.size = size;
            this.step('next');
        },
        pickColor(color) {
            this.color = color;
        },
        saveCake() {
            this.extra_flavor = [];
            if (this.flavor !== "") {
                this.extra_flavor.push(this.flavor)
            }
            if (this.extra_left !== "") {
                this.extra_flavor.push(this.extra_left)
            }
            if (this.extra_right !== "") {
                this.extra_flavor.push(this.extra_right);
            }
            const product = this.items.find(item => String(item.name_en).includes(this.size) && String(item.name_en).toLowerCase().includes(this.type) && String(item.name_en).toLowerCase().includes(this.parent) && String(item.name_en).toLowerCase().includes(this.color));
            this.product = product;
            this.id = this.product.id;
            this.dialog = true;
        },
        addImage(file) {
            this.images = [...this.images, { file, id: Math.random(), type: "new" }];
        },
        addNote(notes) {
            this.notes = [...this.notes];
        },
        deleteImage(file) {
            if (file.type !== "new") {
                this.deleted_images.push(file.id);
            }
            this.images = this.images.filter((img) => img.id !== file.id);
        },
        updateNote(note) {
            if (!this.update_notes.includes(note.id)) {
                this.update_notes.push(note.id);
            }
        },
        changeCount(number) {
            this.count = this.count + number;
        },
        handleClickCartIcon(product, data = {}) {
            if (product.has_image || product.has_note) {
                this.dialog = true;
            } else {
                this.addToCart(product, data);
            }
        },
        async addToCartDialog(product, data) {
            this.addToCart(product, data).then(() => {
                this.dialog = false;
                this.image_dialog = false;
                this.note_dialog = false;
                this.images = [];
                this.notes = [];
                this.count = 1;
                this.special_request = "";
            });
        },
        async addToCart(product, data = {}) {
            this.addToCartLoading = true;
            this.$toast.success("Item Added to Your Cart successfully");
            await this.$store.dispatch("cart/add", {
                product_id: product.id,
                mediaUrl: product.images[0]?.url,
                quantity: data.count || 1,
                images: this.images.map((image) => image.file),
                // notes: this.notes.map((note) => note),
                notes: ["", ...this.notes.map((note) => note.note)],
                special_request: data.special_request || "",
                extra_flavor: this.extra_flavor
            });

            this.addToCartLoading = false;
        },
        addToWishList() {
            addToWishList(this.product.id);
            this.$toast.success("Added To WishList");
        },
    },
    watch: {
        color(newValue, oldValue) {
            this.extra_left = "";
            this.extra_right = "";
            if (newValue !== "") {
                this.matchedItem = this.items.find(item => String(item.name_en).toLowerCase().includes(this.type) && String(item.name_en).toLowerCase().includes(this.parent) && String(item.name_en).toLowerCase().includes(this.color));
            } else {
                this.matchedItem = { extra: [], flavor: [] };
            }
        }
    },
    mounted() {
        this.getCategory();
    }
}
</script>

<style lang="scss" scoped>
.active-color {
    border: 2px solid #65382c !important;
}
.mobile-dialog.product-dialog {
  position: absolute;
  top: 0;
  left: 0;
  height: 90vh;
}

.product-card {
  transform: translate(0, 0);

  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translate(10px, -10px);
  box-shadow: 0 0 20px #ff6c2952 !important;
}

.v-application .primary {
  background-color: #65382c !important;
  border-color: #65382c !important;
}

.v-application .primary--text {
  color: #65382c !important;
  caret-color: #65382c !important;
}

.product-card {
  padding: 2rem;
  background: #f4f7ff !important;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px 1rem !important;
}

.font-primary {
  color: $font-primary !important;
}

.addToCart {
  border-radius: 50%;
  background: #65382c;
  opacity: 0.5;
  border: 1px solid;
  height: 34px;
  width: 34px;
}

.addToCart i {
  color: white !important;
}

.desc {
  font-size: 14px;
  color: #909dcb;
}

.count_input {
  border: 1px solid;
  width: 25px;
  border-radius: 3px;
  text-align: center;
}

.request {
  border-radius: 12px !important;
}

.request * {
  box-shadow: unset !important;
}

.meta {
  padding-bottom: 1rem;
  border-bottom: 1px solid #65382c;
}

.actions-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.product-image {
  position: relative;
}

.out-text {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.out-text span {
  transform: rotate(-20deg);
}

.disable-cursor {
  pointer-events: none;
}
</style>