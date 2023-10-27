<template>
  <v-row class="products-page">
    <v-col cols="12">
      <Banner></Banner>
    </v-col>

    <v-col cols="12">
      <MobileCategories :categories="categories" :selected_category="$store.state.category.selected_category" @input="handleCategoryChange" />
    </v-col>
    <v-col cols="12" class="mt-1">
      <v-text-field :value="searchItem" @input="debounceSearch" hide-details clearable flat solo :placeholder="$t('products.search_placeholder')" color="#65382c" style="border-radius: 12px;" background-color="#ededed" dense prepend-inner-icon="mdi-magnify" height="50" />
    </v-col>
    <v-col cols="12" class="mt-3">
      <v-row no-gutters class="justify-center flex-wrap">
        <commonProduct v-for="(product, index) in products" :key="index" :product="product" @updateShow="updateDialogShow" @updateData="updateDialogData" />
        <v-progress-circular
          :size="50"
          color="#65382c"
          v-if="loading"
          indeterminate
        ></v-progress-circular>
        <p v-if="!products.length && !loading" class="font-primary">
          {{ $t("products.not_found") }}
        </p>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { get } from "~/apis/products";
import { categoryView, get as getCategoriesApi } from "~/apis/categories";
import debounce from "debounce";
import { mapFields } from "vuex-map-fields";
import Banner from "@/components/home/Banner";
import { cateogryView } from "~/apis/categories";
export default {
  refTimer: undefined,
  components: { Banner },
  data() {
    return {
      mobileProductDialog: false,
      mobileProductDialogData: {},
      page: 1,
      pagination_total_items: 0,
      apply: false,
      categories: [],
      products: [],
      searchItem: null,
      loading: false,
      filter: {
        categories: [],
        price_from: 0,
        price_to: 10000,
        price: [0, 10000],
      },
    };
  },
  computed: {
    ...mapFields("search", ["text"]),
    category_filter() {
      return this.filter.categories.join(",");
    },
  },
  watch: {
    text: function (e) {
      this.debounceSearch(e);
    },
    page: function () {
      this.getProducts(this.filter);
    },
    filter: {
      handler() {
        this.getProducts(this.filter);
      },
      deep: true,
    },
  },
  methods: {
    categoryViewed(id) {
      try {
        categoryView(id);
      } catch (err) {
        console.error(err);
      }
    },
    updateDialogShow(boolean) {
      this.mobileProductDialog = boolean;
    },
    updateDialogData(data) {
      this.mobileProductDialogData = data;
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    debounceSearch: debounce(function (e) {
      this.searchItem = e;
      this.getProducts(this.apply ? this.filter : {});
    }, 500),
    search() {
      this.$router.push({
        path: this.localePath("/products"),
        query: {
          search: this.searchItem,
        },
      });
      this.$root.$emit("product:search", this.searchItem);
    },
    getProducts() {
      this.products = [];
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
          category: this.$store.state.category.selected_category[0]
        },
        this.guest
      ).then((data) => {
        this.products = data.data;
        if (data.meta) {
          this.pagination_total_items = data.meta.last_page;
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    getCategories() {
      getCategoriesApi({}, this.guest).then(({ data }) => {
        this.categories = data;
      });
    },
    applyFilter() {
      this.apply = true;
      this.getProducts(this.filter);
    },
    resetFilter() {
      this.apply = false;
      this.filter = {
        categories: [],
        price_from: 0,
        price_to: 10000,
        price: [0, 10000],
      };
      this.searchItem = "";
      this.getProducts();
    },
    getBranchFromStorage() {
      const area = window.localStorage.getItem("default_area");
      if (area) {
        const parsedArea = JSON.parse(area);
        if (parsedArea.branches && parsedArea.branches.length > 0) {
          return parsedArea.branches[0].id;
        }
      }
    },
    handleCategoryChange(id){
      localStorage.setItem("selected_category", id);
      this.$store.dispatch("category/setCategory", id[0]);
      this.getProducts();
    }
  },
  mounted() {
    this.guest = !this.$auth.loggedIn;
    this.branch_id = this.guest ? this.getBranchFromStorage() : null;
    this.getCategories();
    let currentCategory = localStorage.getItem("selected_category");
    if(currentCategory !== null){
      this.$store.dispatch("category/setCategory", Number(currentCategory));
    }
    this.getProducts();
  },
};
</script>

<style lang="scss">
.products {
  background: #f4f7ff !important;
}

.font-primary {
  color: $font-primary !important;
}

.products .v-messages {
  display: none !important;
}

.v-application .Newprimary {
  background-color: #65382c !important;
  border-color: #65382c !important;
}

.Newprimary .v-btn__content {
  color: white;
}

.products .v-label {
  font-size: 20px;
  color: #2a4aba;
}

.v-application .primary--text {
  color: #65382c !important;
  caret-color: #65382c !important;
}

.v-text-field--outlined>.v-input__control>.v-input__slot {
  align-items: stretch;
}

.v-text-field--outlined .v-label {
  top: 0.5rem !important;
}

.searchHear .v-input__slot {
  background: #f4f7ff !important;
}

.products {
  .v-card__actions>.v-btn.v-btn {
    padding: 0rem 1rem !important;
  }

  .Newprimary.action-filter .v-btn__content {
    padding: 0rem 1rem !important;
  }
}

.products-page {
  .font-primary {
    font-size: 1.25rem;
  }
}

.a-product-card{
  transition: .3s;
  border: 2px solid transparent;
  &:hover{
    transform: scale(1.001) translateY(-5px);
    border-color: #65382c9b !important;
  }
}
</style>
