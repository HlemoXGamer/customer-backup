<template>
    <div :style="$vuetify.breakpoint.width > 414 ? 'width: 229px;' : 'width: 47%;'" class="my-1 mx-1">
        <v-card @click="categoryViewed(category.id)" class="a-category-card" :width="$vuetify.breakpoint.width > 414 ? 229 : '100%'" min-height="200"
            style="border-radius: 10px;" color="#fff">
            <v-img cover :height="$vuetify.breakpoint.width > 414 ? 200 : 150"
                :lazy-src="category.image" :src="category.image" style="cursor: pointer;" class="rounded-lg category-image" />
            <v-card-text class="py-2 px-3 d-flex flex-column justify-space-between" style="min-height: 50px">
                <p class="mb-0 mt-2 font-weight-bold text-center w-100" style="color:#65382c;">
                    {{ category[`name_${$i18n.locale}`] }}
                </p>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
export default {
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
        };
    },
    methods: {
        categoryViewed(id) {
            localStorage.setItem("selected_category", id);
            this.$router.push("/products")
        },
        i18n_me(ar, en) {
            if (this.$i18n.locale === "en") {
                return en;
            }
            return ar;
        }
    }
};
</script>
  
<style lang="scss">
.a-category-card{
  transition: .3s;
  border: 2px solid transparent;
  &:hover{
    transform: scale(1.001) translateY(-5px);
    border-color: #65382c9b !important;
    transition: .3s;

    .category-image{
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        transition: .3s;
    }
  }
}
</style>
  