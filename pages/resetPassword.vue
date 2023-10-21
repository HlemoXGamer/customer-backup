<template>
  <v-row>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-img
       src="/images/big-logo-no-text.png"
      ></v-img>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <h2 class="text-center font-primary font--size__40 mb-5 mt-5">
        {{ $t("reset_password.reset_password") }}
      </h2>
      <v-card rounded="lg">
        <v-card-text>
          <p class="text-subtitle-1 ml-15 font-weight-bold mb-2 font-primary">
            {{ $t("reset_password.pin") }}<Sup>*</Sup>
          </p>
          <v-text-field
            dir="ltr"
            outlined
            solo
            class="rounded-lg ml-15 sing-up-Fields"
            flat
            height="50"
            width="486"
            v-model="form.token"
            type="password"
            :error-messages="$validationMsgs($v.form.token)"
            @input="$v.form.token.$touch()"
          ></v-text-field>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary ml-15">
            {{ $t("reset_password.new_password") }} <Sup>*</Sup>
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg ml-15 sing-up-Fields"
            flat
            height="50"
            v-model="form.password"
            type="password"
            :error-messages="$validationMsgs($v.form.password)"
            @input="$v.form.password.$touch()"
          ></v-text-field>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary ml-15">
            {{ $t("reset_password.confirmation_new_password") }}<Sup>*</Sup>
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg ml-15 sing-up-Fields"
            flat
            height="50"
            v-model="form.password_confirmation"
            :error-messages="$validationMsgs($v.form.password_confirmation)"
            @input="$v.form.password_confirmation.$touch()"
            type="password"
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
            >{{ $t("reset_password.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, sameAs, helpers } from "vuelidate/lib/validators";
import { resetPassword } from "~/apis/auth";

export default {
  middleware: "auth",
  auth: "guest",
  data(vm) {
    return {
      form: {
        email: vm.$route.query.email,
        token: "",
        password: "",
        password_confirmation: "",
      },

      loading: false,
    };
  },
  methods: {
    login() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;

      resetPassword(this.form).then((res) => {
        this.loading = false;
        this.$router.replace(this.localePath("/login"));
      }).catch((res) => {
           // this.$toast.error(res);
            this.loading = false;
            this.dialog = false;
            // this.isDisabled = 'disabled'
        });

      this.loading = false;

      // this.$auth.setUserToken("Asdasd2342x", "Asdasd2342x");
      // this.$auth.setUser({
      //   id: 12,
      //   name: "asd",
      //   email: "wads",
      // });
      // this.$toast.success("Logged In");
      return;
      this.$auth
        .loginWith("laravelJWT", {
          data: this.form,
        })
        .then((data) => {
          this.$auth
            .setUserToken(data.data.data.token, data.data.data.token)
            .then(() => {
              this.$store.dispatch("cart/get");
              this.$toast.success("Logged In");
              this.$router.replace("/");
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
        token: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
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
        password_confirmation: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
          sameAs: sameAs("password"),
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
