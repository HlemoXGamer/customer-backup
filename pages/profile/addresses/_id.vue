<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 2">
      <ProfileNav></ProfileNav>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 10">
      <v-card outlined rounded="lg" class="pa-4">
        <AddressesCreateUpdateForm />
      </v-card>
    </v-col>
  </v-row>
</template>
