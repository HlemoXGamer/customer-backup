<template>
  <v-item-group
    class="mb-3"
    :value="value"
    @change="(index) => $emit('input', colors[index].id)"
    mandatory
  >
    <v-item
      v-for="color in colors"
      :key="color.name"
      v-slot="{ active, toggle }"
    >
      <v-chip
        active-class="elevation-3"
        class="rounded-circle mr-4"
        small
        :input-value="active"
        @click="toggle"
        :color="color.name.toLowerCase()"
      >
      </v-chip>
    </v-item>
  </v-item-group>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      return this.colors.findIndex((c) => c.id == this.$attrs.value);
    },
  },
};
</script>