<template>
  <div :class="$vuetify.breakpoint.mobile ? 'categories_mobile' : ''">
    <VueSlickCarousel v-bind="settings">
      <div
        v-for="category in categories"
        :key="category.id"
        :class="`category-slider-wrapper ${
          selected_category.includes(category.id) ? 'category-slider-wrapper--active' : ''
        }`"
        @click="
          category.name_en === 'Photo Print Cake'
            ? openPrintCake(category.id)
            : update(category)
        "
      >
        <div class="category-slider">
          <v-img
            class="category-slider-image"
            width="60"
            height="60"
            :src="category.image"
          />
          <span class="category-slider-text">{{
            i18n_me(category.name_ar, category.name_en)
          }}</span>
        </div>
      </div>
    </VueSlickCarousel>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="printCakePopUpOpened"
      width="auto"
      :retain-focus="false"
    >
      <div class="print-popup-body">
        <div class="close-or-back" @click="handleCloseBack">
          <v-icon v-if="activePopup === 1">mdi-keyboard-backspace</v-icon>
          <v-icon v-if="activePopup === 0">mdi-window-close</v-icon>
        </div>
        <div class="popup-content" v-if="activePopup === 0">
          <div class="strip-one">
            <span class="title"> {{ $t("products.how_it_looks") }}</span>
          </div>
          <div class="strip-two">
            <v-row>
              <v-col class="d-flex">
                <div
                  class="cat-shape-container"
                  :class="{ active: selectedType === 19 }"
                  @click.stop.prevent="selectedType = 19"
                >
                  <div class="cat-shape">
                    <img contain src="/images/rect.jpg" class="" />
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex">
                <div
                  class="cat-shape-container"
                  :class="{ active: selectedType === 20 }"
                  @click.stop.prevent="selectedType = 20"
                >
                  <div class="cat-shape second">
                    <img contain src="/images/rnd.jpg" class="" />
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex">
                <div
                  class="cat-shape-container"
                  :class="{ active: selectedType === 21 }"
                  @click.stop.prevent="selectedType = 21"
                >
                  <div class="cat-shape last">
                    <img
                      contain
                      src="/images/tuxpi.com.1689444014-removebg-preview.png"
                      class=""
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="strip-three">
            <v-btn
              @click="getCategory"
              :style="{
                backgroundColor: '#65382c',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                width: '120px',
                height: '40px',
              }"
              :loading="loading"
            >
              {{ $t("products.next") }}</v-btn
            >
          </div>
        </div>
        <div class="popup-content" v-if="activePopup === 1">
          <div
            class="strip-one d-flex"
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'justify-center flex-column align-center'
                : 'justify-center align-center'
            "
          >
            <span
              class="title"
              :class="$vuetify.breakpoint.smAndDown ? 'mt-4' : 'mx-7'"
            >
              {{ $t("products.how_it_looks") }}</span
            >
            <div
              class="cake_type"
              :class="$vuetify.breakpoint.smAndDown ? 'mt-10' : 'mx-5'"
            >
              <v-combobox
                :label="$t('products.cake_type')"
                outlined
                :items="Object.keys(selectedCategoryCriteria)"
                @change="resetFields"
                v-model="form.cake_type"
              ></v-combobox>
            </div>
          </div>
          <div class="strip-two px-4">
            <span class="title px-3"> {{ $t("products.choose_size") }}</span>
            <v-col
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'sizes'
                )
              "
            >
              <v-row
                v-for="(item, index) in selectedCategoryCriteria[form.cake_type]
                  .sizes"
                :key="index"
              >
                <v-row
                  class="d-flex justify-space-between px-5 py-3 mt-3 cake_row align-center"
                >
                  <div>
                    <v-radio-group v-model="form.cake_size">
                      <v-radio
                        color="#65382c"
                        :value="index"
                        :label="index"
                        class="cake_size"
                        v-if="
                          Object.keys(
                            selectedCategoryCriteria[form.cake_type].sizes
                          ).length && index !== 'undefined'
                        "
                      ></v-radio>
                      <v-radio
                        color="#65382c"
                        :value="form.cake_type"
                        :label="form.cake_type"
                        class="cake_size"
                        v-else
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <img
                    contain
                    :src="
                      '/images/' +
                      form.cake_shape.split(' ').join('_').toLowerCase() +
                      '.jpg'
                    "
                    class="cake_image"
                    width="80px"
                  />
                </v-row>
              </v-row>
            </v-col>

            <v-col
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'colors'
                )
              "
            >
              <v-row
                v-for="(item, index) in selectedCategoryCriteria"
                :key="index"
              >
                <v-row
                  class="d-flex justify-space-between px-5 py-3 mt-3 cake_row align-center"
                >
                  <div>
                    <v-radio-group v-model="form.cake_size">
                      <v-radio
                        color="#65382c"
                        :value="form.cake_type"
                        :label="form.cake_type"
                        class="cake_size"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <img
                    contain
                    :src="
                      '/images/' +
                      form.cake_shape.split(' ').join('_').toLowerCase() +
                      '.jpg'
                    "
                    class="cake_image"
                    width="80px"
                  />
                </v-row>
              </v-row>
            </v-col>
          </div>
          <div class="strip-three">
            <!-- Colors -->
            <v-card
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'sizes'
                )
              "
            >
              <v-card-title
                v-if="
                  form.cake_size.length &&
                  Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                    .length !== 0 &&
                  Object.keys(
                    selectedCategoryCriteria[form.cake_type].sizes
                  )[0] !== 'undefined'
                "
              >
                <span class="title px-3">
                  {{ $t("products.choose_color") }}</span
                >
              </v-card-title>
              <v-col>
                <v-row
                  class="my-5"
                  v-if="
                    form.cake_size.length &&
                    Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                      .length !== 0 &&
                    Object.keys(
                      selectedCategoryCriteria[form.cake_type].sizes
                    )[0] !== 'undefined'
                  "
                >
                  <v-row class="d-flex justify-space-around align-center">
                    <div
                      v-for="color in selectedCategoryCriteria[form.cake_type]
                        .sizes[form.cake_size].colors"
                      :key="color"
                      class="cake_color"
                      :class="form.cake_color === color ? 'active' : ''"
                      @click="pickColor(color)"
                      :style="{
                        backgroundColor:
                          color.toLowerCase().replaceAll(/\s/g, '') ==
                          'offwhite'
                            ? '#f9f1f1'
                            : color,
                      }"
                    ></div>
                  </v-row>
                </v-row>
              </v-col>
            </v-card>

            <!-- Flavors -->
            <v-card
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'sizes'
                )  && selectedCategoryCriteria[form.cake_type]
                        .sizes[form.cake_size]?.flavor?.length > 0
              "
            >
              <v-card-title
                v-if="
                  form.cake_size.length &&
                  Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                    .length !== 0 &&
                  Object.keys(
                    selectedCategoryCriteria[form.cake_type].sizes
                  )[0] !== 'undefined' 
                "
              >
                <span class="title px-3">
                  {{ $t("Pick a Flavor") }}</span
                >
              </v-card-title>
              <v-col>
                <v-row
                  class="my-5"
                  v-if="
                    form.cake_size.length &&
                    Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                      .length !== 0 &&
                    Object.keys(
                      selectedCategoryCriteria[form.cake_type].sizes
                    )[0] !== 'undefined'
                  "
                >
                  <v-row class="d-flex justify-space-around align-center">
                    <div
                      v-for="color in selectedCategoryCriteria[form.cake_type]
                        .sizes[form.cake_size].flavor"
                      :key="color"
                      class="cake_color"
                      :class="form.cake_color === color ? 'active' : ''"
                      @click="pickColor(color)"
                      :style="{
                        backgroundColor:
                          color.toLowerCase().replaceAll(/\s/g, '') ==
                          'offwhite'
                            ? '#f9f1f1'
                            : color,
                      }"
                    ></div>
                  </v-row>
                </v-row>
              </v-col>
            </v-card>
            <!-- Extras -->
            <v-card
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'sizes'
                )
              "
            >
              <v-card-title
                v-if="
                  form.cake_size.length &&
                  Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                    .length !== 0 &&
                  Object.keys(
                    selectedCategoryCriteria[form.cake_type].sizes
                  )[0] !== 'undefined' && selectedCategoryCriteria[form.cake_type]
                        .sizes[form.cake_size]?.extra?.length > 0
                "
              >
                <span class="title px-3">
                  {{ $t("Pick a Extra") }}</span
                >
              </v-card-title>
              <v-col>
                <v-row
                  class="my-5"
                  v-if="
                    form.cake_size.length &&
                    Object.keys(selectedCategoryCriteria[form.cake_type].sizes)
                      .length !== 0 &&
                    Object.keys(
                      selectedCategoryCriteria[form.cake_type].sizes
                    )[0] !== 'undefined'
                  "
                >
                  <v-row class="d-flex justify-space-around align-center">
                    <div
                      v-for="color in selectedCategoryCriteria[form.cake_type]
                        .sizes[form.cake_size].extra"
                      :key="color"
                      class="cake_color"
                      :class="form.cake_color === color ? 'active' : ''"
                      @click="pickColor(color)"
                      :style="{
                        backgroundColor:
                          color.toLowerCase().replaceAll(/\s/g, '') ==
                          'offwhite'
                            ? '#f9f1f1'
                            : color,
                      }"
                    ></div>
                  </v-row>
                </v-row>
                <v-btn
                  class="mt-7"
                  @click="saveCake"
                  :style="{
                    backgroundColor: '#65382c',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '120px',
                    height: '40px',
                  }"
                  :disabled="
                    (!form.cake_color.length &&
                      Object.keys(
                        selectedCategoryCriteria[form.cake_type].sizes
                      ).length !== 0 &&
                      Object.keys(
                        selectedCategoryCriteria[form.cake_type].sizes
                      )[0] !== 'undefined') ||
                    !form.cake_size.length
                  "
                >
                  {{ $t("products.save") }}</v-btn
                >
              </v-col>
            </v-card>

            <v-card
              v-if="
                Object.keys(selectedCategoryCriteria[form.cake_type]).includes(
                  'colors'
                )
              "
            >
              <v-card-title v-if="form.cake_size.length">
                <span class="title px-3">
                  {{ $t("products.choose_color") }}</span
                >
              </v-card-title>
              <v-col>
                <v-row class="my-5" v-if="form.cake_size.length">
                  <v-row class="d-flex justify-space-around align-center">
                    <div
                      v-for="color in selectedCategoryCriteria[form.cake_type]
                        .colors"
                      :key="color"
                      class="cake_color"
                      :class="form.cake_color === color ? 'active' : ''"
                      @click="pickColor(color)"
                      :style="{
                        backgroundColor:
                          color.toLowerCase().replaceAll(/\s/g, '') ==
                          'offwhite'
                            ? '#f9f1f1'
                            : color,
                      }"
                    ></div>
                  </v-row>
                </v-row>
                <v-btn
                  class="mt-7"
                  @click="saveCake"
                  v-if="
                    Object.keys(
                      selectedCategoryCriteria[form.cake_type]
                    ).includes('sizes')
                  "
                  :style="{
                    backgroundColor: '#65382c',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '120px',
                    height: '40px',
                  }"
                  :disabled="
                    (!form.cake_color.length &&
                      Object.keys(
                        selectedCategoryCriteria[form.cake_type].sizes
                      ).length !== 0 &&
                      Object.keys(
                        selectedCategoryCriteria[form.cake_type].sizes
                      )[0] !== 'undefined') ||
                    !form.cake_size.length
                  "
                >
                  {{ $t("products.save") }}</v-btn
                >

                <v-btn
                  class="mt-7"
                  @click="saveCake"
                  v-if="
                    Object.keys(
                      selectedCategoryCriteria[form.cake_type]
                    ).includes('colors')
                  "
                  :style="{
                    backgroundColor: '#65382c',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '120px',
                    height: '40px',
                  }"
                  :disabled="!form.cake_color.length"
                >
                  {{ $t("products.save") }}</v-btn
                >
              </v-col>
            </v-card>
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      max-width="750"
      v-if="Object.keys(product).length && !$vuetify.breakpoint.mobile"
    >
      <v-card
        elevation="0"
        outlined
        rounded="md"
        :class="`d-flex flex-column overflow-hidden px-5 py-7 product-dialog
                   ${$vuetify.breakpoint.mobile ? 'mobile-dialog' : ''}
                  `"
      >
        <div class="d-flex meta">
          <img
            height="72"
            width="70"
            :src="product.images[0] ? product.images[0].url : ''"
            alt=""
          />
          <div
            :class="`flex-grow-1 ${$i18n.locale === 'en' ? 'pl-5' : 'pr-5'}`"
          >
            <div
              elevation="0"
              :class="`
                        ${
                          $vuetify.breakpoint.mobile
                            ? 'text-subtitle-2'
                            : 'text-subtitle-1'
                        }
                           text-decoration-none
                          font-weight-bold font-primary
                          bg-transparent
                          px-0
                        `"
            >
              {{ i18n_me(product.name_ar, product.name_en) }}
            </div>

            <div>
              <small class="desc">{{
                i18n_me(product.description_ar, product.description_en)
              }}</small>
            </div>

            <div class="mt-5">
              <span
                v-for="(category, index) in product.categories"
                :key="category.id"
                class="text-body-1 font-primary font-weight-bold"
              >
                {{ i18n_me(category.name_ar, category.name_en) }}
                <span v-if="index !== product.categories.length - 1">, </span>
              </span>
            </div>
          </div>
          <div>
            <div class="actions-wrapper">
              <div>
                <div
                  :class="`row flex-nowrap justify-${i18n_me(
                    'start',
                    'end'
                  )} align-center
`"
                >
                  <v-btn
                    :disabled="count <= 1"
                    icon
                    class="font-primary"
                    @click="changeCount(-1)"
                  >
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
        <div
          style="color: red; text-align: center"
          v-if="
            product.has_image &&
            (images.length < count || images.length > count * 10)
          "
        >
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
        <div
          :class="`row mt-4 ${
            product.has_image != 1 || product.has_note != 1
              ? 'justify-center align-center'
              : 'justify-space-between'
          }`"
        >
          <v-btn
            v-if="product.has_note == 1"
            @click="note_dialog = true"
            :loading="addToCartLoading"
            :disabled="addToCartLoading"
            class="col-5 text--white white--text"
            color="black"
            elevation="0"
            rounded
          >
            {{ $t("products.add_note") }}
          </v-btn>

          <v-btn
            v-if="product.has_image == 1"
            @click="image_dialog = true"
            :loading="addToCartLoading"
            :disabled="addToCartLoading"
            class="ml-5 col-5 text--white white--text"
            color="black"
            elevation="0"
            rounded
          >
            {{ $t("products.upload_image") }}
          </v-btn>
          <v-btn
            :disabled="
              (product.has_image &&
                (images.length < count || images.length > count * 10)) ||
              addToCartLoading
            "
            @click="addToCartDialog(product, { count, special_request })"
            :loading="addToCartLoading"
            :class="
              product.has_note == 1 && product.has_image == 1
                ? 'mt-3 col-5 Newprimary'
                : 'ml-8 col-5 Newprimary'
            "
            elevation="0"
            rounded
            :block="product.has_note == 1 && product.has_image == 1"
          >
            {{ $t("products.product.add_to_cart") }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <MobileProductDialog
      v-if="Object.keys(product).length && $vuetify.breakpoint.mobile"
      :product="product"
      v-model="dialog"
      @update="(value) => (this.dialog = value)"
    />

    <productImageDialog
      v-if="!$vuetify.breakpoint.mobile"
      :value="image_dialog"
      @close="image_dialog = false"
      @add-image="(value) => addImage(value)"
      @delete-image="(file) => deleteImage(file)"
      :images="images"
      :count="count"
      :productId="id"
    />

    <productNoteDialog
      v-if="!$vuetify.breakpoint.mobile"
      :value="note_dialog"
      @close="note_dialog = false"
      :notes="notes"
      :count="count"
      @add-note="(value) => addNote(value)"
      @update-notes="(note) => updateNote(note)"
    />
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel-rtl";
import "vue-slick-carousel-rtl/dist/vue-slick-carousel-theme.css";
// optional style for arrows & dots
import "vue-slick-carousel-rtl/dist/vue-slick-carousel-rtl.css";
import { get } from "~/apis/products";
import { add as addToWishList } from "@/apis/wishlist";
import { v4 as uuidv4 } from "uuid";
import { categoryView } from "~/apis/categories";
export default {
  props: {
    categories: {
      type: Array,
      default: [],
    },
    selected_category: {
      type: Array,
      default: [],
    },
  },
  data: (vm) => ({
    settings: {
      rtl: vm.$i18n.locale === "ar",
      arrows: !vm.$vuetify.breakpoint.mobile,
      dots: false,
      focusOnSelect: true,
      infinite: false,
      speed: 500,
      slidesToShow: vm.$vuetify.breakpoint.mobile ? 3 : 6,
      slidesToScroll: 2,
      touchThreshold: 5,
    },
    form: {
      cake_type: "",
      cake_shape: "",
      cake_size: "",
      cake_color: "",
      extra: [],
      flavor: [],
    },
    loading: false,
    printCakePopUpOpened: false,
    activePopup: 0,
    selectedType: 12,
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
  }),
  components: {
    VueSlickCarousel,
  },
  methods: {
    categoryViewed(id){
      // try{
      //   categoryView(id);
      // }catch(err){
      //   console.error(err);
      // }
    },
    getCategory() {
      this.loading = true;
      get(
        {
          category: this.selectedType,
          branch_id: !this.$auth.loggedIn
            ? localStorage.getItem("guest_branch")
            : "",
        },
        !this.$auth.loggedIn
      )
        .then((res) => {
          this.selectedCategoryItems = res.data;
          if (!res.data.length) {
            this.$toast.error(this.$t("products.not_found"));
            this.loading = false;
            return;
          }
          let multiArr = res.data.map((item) => {
            return item.name_en
              .trim()
              .split("-")
              .map((w) => {
                return w;
              });
          });
          let newArr = {};
          multiArr.forEach((element) => {
            if (element.length > 2) {
              this.form.cake_shape = element[1];
              if (!Object.keys(newArr).includes(element[0])) {
                newArr[element[0]] = { sizes: {} };
              }
              if (!Object.keys(newArr[element[0]].sizes).includes(element[2])) {
                newArr[element[0]].sizes[element[2]] = { colors: [] };
              }
              if (
                !newArr[element[0]].sizes[element[2]].colors.includes(
                  element[3]
                )
              ) {
                newArr[element[0]].sizes[element[2]].colors.push(element[3]);
              }
            } else {
              this.form.cake_shape = element[0];
              if (!Object.keys(newArr).includes(element[0])) {
                newArr[element[0]] = { colors: [] };
              }
              if (!newArr[element[0]].colors.includes(element[1])) {
                newArr[element[0]].colors.push(element[1]);
              }
            }
          });

          this.resetFields();
          this.loading = false;
          this.selectedCategoryCriteria = newArr;
          this.activePopup = 1;
          this.form.cake_type = Object.keys(this.selectedCategoryCriteria)[0];
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleCloseBack() {
      if (this.activePopup == 0) {
        this.printCakePopUpOpened = false;
      } else {
        this.activePopup = 0;
        this.form.cake_shape = "";
        this.resetFields();
      }
    },
    openPrintCake(id) {
      this.printCakePopUpOpened = true;
      this.activePopup = 0;

      this.categoryViewed(id);
    },
    update(category) {
      if (this.selected_category.includes(category.id)) {
        this.$emit("input", []);
      } else {
        this.$emit("input", [category.id]);
      }
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    pickColor(color) {
      this.form.cake_color = color;
    },
    resetFields() {
      this.form.cake_size = "";
      this.form.cake_color = "";
    },
    saveCake() {
      let cakeName = "";
      let cakeIndex = "";
      let cakeObj = {};
      if (
        this.form.cake_type !== this.form.cake_size &&
        this.form.cake_size !== this.form.cake_shape
      ) {
        cakeName = Object.values(this.form).join("-");
        cakeIndex = Object.values(this.selectedCategoryItems).findIndex(
          (item) => item.name_en.trim() == cakeName
        );
        cakeObj = Object.values(this.selectedCategoryItems)[cakeIndex];
      } else {
        cakeName = this.form.cake_shape + "-" + this.form.cake_color;
        cakeIndex = Object.values(this.selectedCategoryItems).findIndex(
          (item) => item.name_en.trim() == cakeName
        );
        cakeObj = Object.values(this.selectedCategoryItems)[cakeIndex];
      }

      this.product = cakeObj;
      this.id = this.product.id;
      this.dialog = true;
      this.printCakePopUpOpened = false;
    },
    addImage(file) {
      this.images = [...this.images, { file, id: uuidv4(), type: "new" }];
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
        notes: this.notes.map((note) => note),
        special_request: data.special_request || "",
      });

      this.addToCartLoading = false;
    },
    addToWishList() {
      addToWishList(this.product.id);
      this.$toast.success("Added To WishList");
    },
  },
};
</script>
<style lang="scss">
.categories_mobile .slick-slider {
  overflow: hidden !important;
}

.category-slider-wrapper {
  height: 100%;
}

.category-slider-wrapper--active .category-slider {
  background-color: #65382c;
  color: #fff;
}

.print-popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.category-slider {
  box-sizing: border-box;
  padding: 0.5em 0;
  width: 100%;
  display: inline-flex !important;
  height: 92px !important;
  border-radius: 12px;
  align-items: center;
  text-align: center;
  flex-direction: column !important;
  cursor: pointer;
}

.category-slider-image {
  border-radius: 20px;
  background: #65382c;
}

.category-slider-text {
  position: relative;
  font-size: 0.75rem;
  padding: 0px 5px;
  margin-top: 0.5em;
  font-weight: bold;
}

.slick-prev:before,
.slick-next:before {
  color: #65382c !important;
}

.print-popup-body {
  padding: 40px 20px 20px;
  width: 900px !important;
  max-width: 100%;
  border-radius: 15px !important;
  background-color: white;
  position: relative;

  .the-title {
    text-align: center;
    display: block;
  }

  .close-or-back {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 20px;
    cursor: pointer;

    i {
      font-size: 40px !important;
    }
  }

  .popup-content {
    .strip-one {
      text-align: center;
      margin-bottom: 60px;

      .title {
        color: #65382c;
        font-size: 40px !important;
        font-weight: bold;
      }

      .cake_type {
        width: 200px !important;
        max-width: 200px !important;

        .v-text-field__details {
          display: none;
        }

        .v-input__slot {
          margin-bottom: 0;
        }
      }
    }

    .strip-two {
      .cat-shape-container {
        cursor: pointer;
        width: 183px;
        height: 183px;
        overflow: hidden;
        margin: auto;
        padding: 5px;
        border-radius: 15px;
        border: 2px solid transparent;
        transition: 0.3s;

        &:nth-child(1) {
          img {
            border-radius: 15px;
          }
        }

        &.active,
        &:hover {
          border-color: #65382c;
          background-color: #cf96754d;
        }
      }

      .title {
        color: #65382c;
        font-size: 30px !important;
        font-weight: bold;
      }

      .cake_row {
        border-bottom: 1px solid lightgray;
      }

      .cake_image {
        border-radius: 15px;
      }

      .cake_size label {
        font-weight: bold;
        color: #65382c;
        font-size: 18px;
      }

      .cat-shape {
        width: 170px;
        height: 170px;
        overflow: hidden;
        margin: auto;

        &.second {
          border-radius: 100%;
        }

        img {
          width: 100%;
        }
      }
    }

    .strip-three {
      text-align: center;
      margin-top: 40px;

      .title {
        color: #65382c;
        font-size: 30px !important;
        font-weight: bold;
      }

      .cake_color {
        width: 75px;
        height: 75px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 15px;
        border: 4px solid transparent;
        transition: 0.3s;
        border-color: lightgray;

        &.active,
        &:hover {
          border-color: #65382c;
          background-color: #cf96754d;
        }
      }
    }
  }
}
</style>
