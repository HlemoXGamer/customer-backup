<template>
  <v-row>
    <!-- <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 7"> -->
      <!-- <v-card elevation="0" outlined rounded="lg"> -->
        <!-- <v-card-text class="text-center py-10">
          <p class="font-weight-bold text-h6 black--text">
            {{ $t("checkout.no_account") }}
          </p> -->
          <!-- <p class="text-subtitle-1 grey-text text--lighten-1 my-5">
            {{$t('checkout.no_account_help')}}
          </p>

          <v-btn
            outlined
            x-large
            block
            class="rounded-lg"
            height="57"
            elevation="0"
            nuxt
            :to="localePath('/checkout/finalize')"
          >
            <span class="font-weight-bold primary--text"
              >{{$t('checkout.checkout_guest')}}</span
            >
          </v-btn> -->

          <!-- <p class="text-h5 my-10 font-weight-bold grey--text">
            {{$t('checkout.or')}}
          </p> -->
          <!-- 
          <v-divider></v-divider> -->

          <!-- <p class="text-subtitle-1 grey-text text--lighten-1 my-5">
            {{ $t("checkout.login_help") }}
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg bold-placeholder"
            flat
            :placeholder="$t('checkout.email')"
            height="57"
            type="email"
            :error-messages="$validationMsgs($v.form.email)"
            @input="$v.form.email.$touch()"
            v-model="form.email"
          ></v-text-field>
          <v-text-field
            outlined
            solo
            class="rounded-lg bold-placeholder"
            flat
            :placeholder="$t('checkout.password')"
            height="57"
            type="password"
            :error-messages="$validationMsgs($v.form.password)"
            @input="$v.form.password.$touch()"
            v-model="form.password"
          ></v-text-field>
          <v-btn
            x-large
            block
            class="rounded-lg"
            height="57"
            color="dark"
            elevation="0"
            dark
            @click="login"
            :loading="loading"
          >
            {{ $t("checkout.continue") }}
          </v-btn> -->

          <!-- <p class="text-h6 my-10 font-weight-bold grey--text text--darken-1">
            {{$t('checkout.social_login')}}
          </p>

          <div>
            <v-btn
              color="blue"
              dark
              large
              class="rounded-lg"
              elevation="0"
              height="56"
              width="56"
            >
              <v-icon> mdi-facebook </v-icon>
            </v-btn>
            <v-btn
              color="grey darken-4"
              dark
              large
              class="rounded-lg ml-5"
              elevation="0"
              height="56"
              width="56"
            >
              <v-icon> mdi-google </v-icon>
            </v-btn>
          </div> -->
        <!-- </v-card-text> -->
      <!-- </v-card> -->
    <!-- </v-col> -->
    <!-- <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 5">
      <OrderSummary></OrderSummary>
    </v-col> -->
  </v-row>
</template>

<script>
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import { required, email, helpers } from "vuelidate/lib/validators";

export default {
  layout: "checkout",
  components: {
    OrderSummary,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      loading: false,
    };
  },
  methods: {
    login() {
      this.$v.$touch();

      if (this.$v.$invalid) return;
      this.loading = true;
      this.$auth
        .loginWith("laravelJWT", {
          data: this.form,
        })
        .then((data) => {
          this.$auth.setUserToken(data.data.token, data.data.token).then(() => {
            this.$store.dispatch("cart/get");
            this.$toast.success("Logged In");
            this.$router.replace(this.localePath("/"));
          });
        })
        .catch(() => {
          this.$toast.error("Wrong Email Or Password");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
          email: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            email
          ),
        },
        password: {
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
  mounted() {
    this.$router.replace(this.localePath("/checkout/finalize"));
  },
};
</script>
<style lang="scss" scoped>
.theme--dark.v-btn.v-btn--has-bg {
  padding: 0 auto;
  padding: 0px 5rem;
  background: $font-primary !important;
}
</style>
