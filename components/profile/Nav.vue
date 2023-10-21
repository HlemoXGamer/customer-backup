<template>
  <v-card outlined rounded="lg" style="position: sticky; top: 100px" v-if="!$vuetify.breakpoint.mobile">
    <v-list class="py-0" dense>
      <v-list-item-group color="primary" mandatory>
        <template v-for="(item, i) in items">
          <v-list-item :key="i" nuxt exact :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon" size="20"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data(vm) {
    return {
      items: [
        { title: vm.$t('common.my_account'), icon: "mdi-account", link: vm.localePath("/profile") },
        { title: vm.$t('common.my_orders'), icon: "mdi-shopping", link: vm.localePath("/profile/orders") },
        {
          title: vm.$t('common.my_address'),
          icon: "mdi-map-marker",
          link: vm.localePath("/profile/addresses"),
        },
      ],
    };
  },
};
</script>