<template>
  <v-chip-group
    :value="value"
    @change="(index) => $emit('input', conditions[index].id)"
    mandatory
    active-class="yellow darken-2 font-weight-bold"
  >
    <v-chip
      label
      outlined
      v-for="(condition, index) in conditions"
      :key="index"
    >
      {{ condition.name }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    conditions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      return this.conditions.findIndex((c) => c.id == this.$attrs.value);
    },
  },
};
</script>