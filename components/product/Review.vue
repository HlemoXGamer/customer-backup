<template>
  <v-card class="mt-13">
    <v-card-title>Reviews </v-card-title>
    <v-list three-line>
      <template v-for="(review, index) in reviews">
        <!-- <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        -->

        <v-list-item :key="index">
          <v-list-item-avatar>
            <!-- <v-img :src="item.avatar"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="d-flex">
              <p class="mr-5">{{ review.user.name }}</p>
              <v-rating
                color="yellow darken-3"
                length="5"
                size="17"
                readonly
                :value="review.rate"
              ></v-rating
            ></v-list-item-title>
            <v-list-item-subtitle>
              {{ review.body }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div v-if="$auth.loggedIn">
      <v-textarea
        placeholder="Write Your Review"
        outlined
        dense
        solo
        flat
        v-model="form.body"
        :error-messages="$validationMsgs($v.form.body)"
        @input="$v.form.body.$touch()"
      ></v-textarea>

      <v-rating
        color="yellow darken-3"
        length="5"
        size="28"
        v-model="form.rate"
        :error-messages="$validationMsgs($v.form.rate)"
        @input="$v.form.rate.$touch()"
      ></v-rating>
      <v-btn
        color="primary"
        class="rounded-lg mt-5"
        elevation="0"
        @click="submit"
        :loading="loading"
        >Review</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import { store } from "@/apis/review";
import { required, helpers } from "vuelidate/lib/validators";

export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      reviews: [...this.product.reviews],
      form: {
        body: "",
        rate: null,
      },
    };
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;
      store(this.product.id, this.form)
        .then(() => {
          this.$toast.success("Review Submitted");

          this.reviews.push({
            ...this.form,
            user: this.$auth.user,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  validations() {
    return {
      form: {
        body: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        rate: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
      },
    };
  },
};
</script>
