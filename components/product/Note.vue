<template>
  <v-text-field :value="note.note" outlined clearable v-on:input="updateNote($event)"></v-text-field>
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
