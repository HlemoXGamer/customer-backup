<template>
  <v-dialog :value="value" :fullscreen="$vuetify.breakpoint.mobile" :scrim="false"
    :width="!$vuetify.breakpoint.mobile ? 800 : ''" transition="dialog-bottom-transition" @click:outside="$emit('close')">
    <v-card :class="!$vuetify.breakpoint.mobile ? 'px-5 py-5' : ''" :style="$vuetify.breakpoint.mobile ? 'padding-bottom: 60px !important;' : ''">
      <v-toolbar elevation="0">
        <v-btn elevation="3" @click="$emit('close')" class="no-width">
          <v-icon small>{{
            i18n_me(`mdi-arrow-right`, `mdi-arrow-left`)
          }}</v-icon>
        </v-btn>
        <span class="px-5">
          {{ $t("products.upload_image") }}
        </span>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="4" md="3">
            <v-card :disabled="form.images.length === count * 10" @click="selectImage" elevation="0" outlined rounded="lg"
              height="150">
              <v-card-text class="d-flex align-center justify-center" style="height: 100%">
                <v-icon>mdi-plus</v-icon>

                <input @change="addFile" type="file" ref="imageSelector" name="file" class="d-none"
                  accept="image/png, image/gif, image/jpeg" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4" md="3" v-for="file in form.images" :key="file.id">
            <productImage :file="file" @delete-image="deleteImage" />
          </v-col>
        </v-row>
        <v-card-actions v-if="self" class="mt-5">
          <v-btn @click="addToCart" :loading="loading" block elevation="1" rounded color="#65382c" class="white--text">{{
            $t("common.update") }}</v-btn>
        </v-card-actions>
      </v-card-text>
      <v-card-actions v-if="$vuetify.breakpoint.mobile" class="card_actions">
        <v-btn class="font-weight-bold" @click="addToCart" :disabled="form.images.length < count ? true : false">
          Add to Cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    images: {
      type: Array,
      default: [],
    },
    productId: {
      type: String,
      default: "",
    },
    self: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    loading: false,
    form: {
      images: [],
      deleted_images: [],
    },
  }),
  watch: {
    "$props.images": {
      handler() {
        this.form.images = this.images;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },
    selectImage() {
      this.$refs.imageSelector.value = null;
      this.$refs.imageSelector.click();
    },
    addFile(e) {
      if (this.self) {
        this.form.images.push({
          file: e.target.files[0],
          id: uuidv4(),
          type: "new",
        });
      }

      this.$emit("add-image", e.target.files[0]);
    },
    deleteImage(file) {
      if (this.self) {
        this.form.images = this.form.images.filter((img) => img.id !== file.id);
        if (file.type !== "new") {
          this.form.deleted_images.push(file.id);
        }
      }
      this.$emit("delete-image", file);
    },
    reset() {
      this.form = {
        images: [],
        deleted_images: [],
      };
    },
    async addToCart() {
      try {
        this.loading = true;
        await this.$store.dispatch("cart/add", {
          product_id: this.productId,
          images: this.form.images.map((image) => image.file),
          deleted_images: this.form.deleted_images,
          quantity: this.count,
          special_request: "",
        });
        this.$toast.success("Item Added to Your Cart successfully");
        this.$emit("updated");
        this.$emit("close");
        this.reset();
      } catch (err) {
        this.$toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>



<style scoped>
.card_actions{
  position: absolute;
  bottom: 10px;
  right: 0;
}

</style>