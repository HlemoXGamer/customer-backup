<template>
  <v-row>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-img
        src="/images/big-logo-no-text.png"
      ></v-img>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <h2 class="text-center font-primary font--size__40 mb-5 mt-5">
        {{ $t("forget_password.forgot_password") }}
      </h2>
      <p class="mb-15 forgetPassword">
        {{ $t("forget_password.help") }}
      </p>
      <v-card rounded="lg">
        <v-card-text>
          <p
            :class="
              $vuetify.breakpoint.mobile
                ? 'text-subtitle-1  font-weight-bold mb-2 font-primary'
                : 'text-subtitle-1 ml-15 mt-15 font-weight-bold mb-2 font-primary'
            "
          >
            {{ $t("forget_password.email") }}<Sup>*</Sup>
          </p>
          <v-text-field
            dir="ltr"
            outlined
            solo
            :class="
              $vuetify.breakpoint.mobile
                ? 'rounded-lg sing-up-Fields'
                : 'rounded-lg ml-15 sing-up-Fields'
            "
            flat
            height="50"
            width="486"
            v-model="form.email"
            type="email"
            :error-messages="$validationMsgs($v.form.email)"
            @input="$v.form.email.$touch()"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            elevation="0"
            class="rounded-lg text-center"
            x-large
            color="primary"
            @click="login"
            :loading="loading"
            >{{ $t("forget_password.send") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email, helpers } from "vuelidate/lib/validators";
import { forgetPassword } from "~/apis/auth";

export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      form: {
        email: "",
      },

      loading: false,
    };
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      forgetPassword(this.form).then(() => {
        this.$router.push({
          path: this.localePath("/resetPassword"),
          query: { email: this.form.email },
        });
      });
      //
      this.loading = false;

      // this.$auth.setUserToken("Asdasd2342x", "Asdasd2342x");
      // this.$auth.setUser({
      //     id: 12,
      //     name: "asd",
      //     email: "wads"
      // });
      // this.$toast.success("Logged In");
      // return;
      // this.$auth
      //     .loginWith("laravelJWT", {
      //         data: this.form,
      //     })
      //     .then((data) => {
      //         this.$auth
      //             .setUserToken(data.data.token, data.data.token)
      //             .then(() => {
      //                 this.$store.dispatch("cart/get");
      //                 this.$toast.success("Logged In");
      //                 this.$router.replace("/");
      //             });
      //     })
      //     .catch(() => {
      //         this.$toast.error("Wrong Email Or Password");
      //     })
      //     .finally(() => {
      //         this.loading = false;
      //     });
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
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.font-primary,
.font-primary .v-btn__content {
  color: $font-primary;
}

.font--size__40 {
  font-size: 2.5rem;
}

.v-input__slot {
  min-height: 50px !important;
}

.text-decoration-underline {
  flex: 0 1 auto;
}

.forget-passowrd {
  margin-top: 2rem;
  background: transparent !important;
  font-family: "exo 2";
}

.v-card__actions > .v-btn.v-btn {
  padding: 0 auto;
  padding: 0px 5rem;
  background: $font-primary !important;
}

.v-card__actions {
  text-align: center;
  display: block;
}

.text-gray {
  color: #65382c !important;
  font-size: 12px !important;
}

.sing-up-Fields {
  width: 450px !important;
}
.forgetPassowrd {
  font-size: 13px;
  text-align: center;
  color: #65382c;
}
</style>
