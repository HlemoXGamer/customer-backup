<template>
  <v-chip-group
    mandatory
    :value="value"
    @change="(index) => $emit('input', sizes[index].id)"
    active-class="yellow darken-2 font-weight-bold"
  >
    <v-chip label outlined v-for="(size, index) in sizes" :key="index">
      {{ size.name }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      return this.sizes.findIndex((c) => c.id == this.$attrs.value);
    },
  },
};
</script>