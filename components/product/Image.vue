<template>
  <v-card rounded="lg" height="150" max-height="150" style="overflow:hidden;">
    <v-img :src="image" height="150" />
    <v-btn
      rounded
      class="mx-2"
      fab
      dark
      small
      depressed
      color="error"
      style="position: absolute; z-index: 1; top: 5px; left: 0"
      @click="deleteImage"
    >
      <v-icon small>mdi mdi-delete</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
import { toBase64 } from "@/utils/files";
export default {
  data: () => ({ image: "" }),
  props: {
    file: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: Number,
    },
  },
  methods: {
    deleteImage() {
      this.$emit("delete-image", this.file);
    },
  },
  async created() {
    if (this.file.file instanceof File) {
      this.image = await toBase64(this.file.file);
    } else {
      this.image = this.file.file;
    }
  },
};
</script>
