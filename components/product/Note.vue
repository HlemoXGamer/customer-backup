<template>
  <v-text-field :readonly="view" :value="note.note" outlined clearable v-on:input="updateNote($event)" hide-details></v-text-field>
</template>
<script>
import { toBase64 } from "@/utils/files";
export default {
  props: {
    note: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: Number,
    },
    view: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateNote(event) {
      this.$emit("update-note", { ...this.note, note: event });
    },
  },
  async created() {
    this.text = this.note.note;
  },
};
</script>
