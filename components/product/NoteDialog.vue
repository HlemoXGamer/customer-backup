<template>
  <v-dialog :value="value" :fullscreen="$vuetify.breakpoint.mobile" :scrim="false"
    :width="!$vuetify.breakpoint.mobile ? 800 : ''" transition="dialog-bottom-transition" @click:outside="$emit('close')">
    <v-card :class="!$vuetify.breakpoint.mobile ? 'px-5 py-5' : ''">
      <v-toolbar elevation="0" style="" class="">
        <v-btn elevation="3" @click="$emit('close')" class="no-width">
          <v-icon small>{{
            i18n_me(`mdi-arrow-right`, `mdi-arrow-left`)
          }}</v-icon>
        </v-btn>
        <span class="px-5">
          {{ $t("products.add_note") }}
        </span>
      </v-toolbar>
      <v-card-text>
        <v-row v-if="!self" cols="12" sm="6" v-for="index in count" :key="index">
          <v-col>
            <span>Item No ({{ index }})</span>
            <v-text-field v-model="notes[index - 1]" outlined clearable @input="updateProduct(index - 1)"
              :value="form.notes[index - 1]"></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="self" cols="12" sm="6" v-for="note in getItemNotes" :key="note.id">
          <v-col>
            <productNote :note="note" @update-note="updateNote" />
          </v-col>
        </v-row>
        <!-- <button @click="testMethod">Test me</button> -->
        <v-card-actions v-if="self" class="mt-5">
          <v-btn @click="addToCart" :loading="loading" block elevation="1" rounded color="#65382c" class="white--text">{{
            $t("common.update") }}</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    notes: {
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
      notes: [],
      update_notes: [],
    },
  }),
  watch: {
    "$props.notes": {
      handler() {
        this.form.notes = this.notes;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("cart", ["getItems", "getItemNotes"]),
  },
  methods: {
    // testMethod() {
    //   console.log("the cart is ", this.getItems, "Product id", this.productId);
    //   const any = this.getItems.findIndex((item) => {
    //     return item.product_id === this.productId;
    //   });
    // },
    ...mapActions("cart", ["setItemNotes"]),

    close() {
      this.$emit("close");
    },
    i18n_me(ar, en) {
      if (this.$i18n.locale === "en") {
        return en;
      }
      return ar;
    },

    addFile(e) {
      if (this.self) {
        this.form.notes.push({
          file: e.target.files[0],
          id: uuidv4(),
          type: "new",
        });
      }

      this.$emit("add-note", e.target.files[0]);
    },
    updateNote(note) {
      const newNotes = this.getItemNotes;
      const index = this.getItemNotes.findIndex((n) => {
        return n.id === note.id;
      });
      newNotes[index] = note;
      this.setItemNotes({ itemNotes: newNotes, productId: this.productId });
      // console.log(index);
      // if (!this.form.update_notes.includes(note.id)) {
      //   this.form.update_notes.push(note.id);
      // }
    },
    reset() {
      this.form = {
        notes: [],
        update_notes: [],
      };
    },
    async addToCart() {
      try {
        console.log(this.form.notes);
        console.log(this.form.update_notes);
        this.loading = true;
        await this.$store.dispatch("cart/add", {
          product_id: this.productId,
          notes: this.form.notes.map((note) => note.note),
          update_notes: this.getItemNotes.map((note) => note.id),
          quantity: 0,
          special_request: "",
        });
        this.$toast.success("Item Added to Your Cart successfully");
        this.$emit("close");
        this.reset();
      } catch (err) {
        this.$toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    updateProduct(index) {
      if (!this.form.notes[index]) {
        this.form.notes[index] = "";
      }
      this.$emit("add-note", this.form.notes[index]);
      console.log(this.form.notes);
    },
  },
};
</script>
