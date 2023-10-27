<template>
    <v-row class="categories-page">
      <v-col cols="12">
        <Banner></Banner>
      </v-col>
      <v-col cols="12" class="mt-1">
        <v-row no-gutters class="justify-space-between align-center py-1">
          <v-btn block text elevation="0" class="px-0">
              <v-row no-gutters class="justify-start align-center">
              <v-icon :class="i18n_me('ml-1', 'mr-1')" color="#65382c">mdi-map-marker</v-icon>
              {{ $t("common.area") }}
            </v-row>
            <v-spacer />
            <v-row no-gutters class="justify-end align-center">
              <strong style="color:#65382c">{{ default_location == "area" ? address.name ?? "---" : address.area_name ?? "---" }}</strong>
              <v-icon :class="i18n_me('mr-1', 'ml-1')" color="#65382c">mdi-chevron-{{i18n_me('left', 'right')}}</v-icon>
            </v-row>
          </v-btn>
        </v-row>
        <v-divider color="#65382c" class="rounded-lg" />
        <v-row no-gutters class="justify-space-between align-center py-1">
          <v-btn block text elevation="0" class="px-0">
            <v-row no-gutters class="justify-start align-center">
              <v-icon :class="i18n_me('ml-1', 'mr-1')" color="#65382c">mdi-clock-time-four</v-icon>
              {{ $t("common.delivery_time") }}
            </v-row>
            <v-row no-gutters class="justify-end align-center">
              <strong style="color: #65382c;">30 mins</strong>
              <v-icon :class="i18n_me('mr-1', 'ml-1')" color="#65382c">mdi-chevron-{{i18n_me('left', 'right')}}</v-icon>
            </v-row>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" class="mt-1">
        <v-text-field :value="searchItem" @input="debounceSearch" hide-details clearable flat solo :placeholder="$t('categories.search_placeholder')" color="#65382c" style="border-radius: 12px;" background-color="#ededed" dense prepend-inner-icon="mdi-magnify" height="50" />
      </v-col>
      <v-col cols="12" class="mt-3">
        <v-row no-gutters class="justify-center flex-wrap">
          <commonCategory v-for="(category, index) in categories" :key="index" :category="category" />
            <v-progress-circular
              :size="50"
              color="#65382c"
              v-if="loading"
              indeterminate
            ></v-progress-circular>
          <p v-if="!categories.length && !loading" class="font-primary">
            {{ $t("categories.not_found") }}
          </p>
        </v-row>
      </v-col>
      <v-pagination class="mt-5 w-100 mx-auto" v-if="categories.length > 0" v-model="page" :total-visible="$vuetify.breakpoint.xs ? 5 : 10"
        :length="pagination_total_items" color="#65382c" />
    </v-row>
  </template>
  
  <script>
  import { get } from "@/apis/categories"
  import Banner from "@/components/home/Banner";
  import debounce from "debounce";
  export default {
    components: { Banner },
    data() {
      return {
        categories: [],
        searchItem: "",
        page: 1,
        default_location: localStorage.getItem("default_location"),
        address: {},
        loading: false
      };
    },
    watch: {
      text: function (e) {
        this.debounceSearch(e);
      },
      page: function () {
        this.getCategories({ page: this.page });
      },
    },
    methods: {
      i18n_me(ar, en) {
        if (this.$i18n.locale === "en") {
          return en;
        }
        return ar;
      },
      debounceSearch: debounce(function (e) {
        this.searchItem = e;
        this.getCategories();
      }, 500),
      getCategories() {
        this.loading = true;
        window.scrollTo({
          top: 520,
          behavior: 'smooth'
        });
        get(
          {
            name: this.searchItem,
            page: this.page,
            branch_id: this.branch_id,
          },
          this.guest
        ).then((data) => {
          this.categories = data.data;
          if (data.meta) {
            this.pagination_total_items = data.meta.last_page;
          }
        }).finally(() => {
          this.loading = false;
        });
      },
    },
    created() {
      this.guest = !this.$auth.loggedIn;
      this.getCategories();
    },
    mounted(){
      this.address = JSON.parse(localStorage.getItem(`default_${this.default_location}`));
    }
  };
  </script>
  
  <style lang="scss" scoped>

  </style>
  