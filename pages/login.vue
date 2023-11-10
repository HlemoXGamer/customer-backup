<template>
  <v-row align="center">
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-img src="/images/big-logo-no-text.png"></v-img>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.mobile ? 12 : 6"
      :class="{
        'sing-up-Fields': true,
        'pl-15': !$vuetify.breakpoint.mobile && $i18n.locale === 'en',
        'pr-15': !$vuetify.breakpoint.mobile && $i18n.locale === 'ar',
      }"
    >
      <h2 class="text-center font-primary font--size__40 mt-5">
        {{ $t("signin.signin") }}
      </h2>
      <v-card rounded="lg">
        <v-card-text>
          <p
            :class="{
              'text-subtitle-1 font-weight-bold mb-2 font-primary': true,
            }"
          >
            {{ $t("signin.email") }}<Sup>*</Sup>
          </p>
          <v-text-field
            dir="ltr"
            outlined
            solo
            :class="$vuetify.breakpoint.mobile ? 'rounded-lg' : 'rounded-lg'"
            flat
            height="50"
            width="486"
            v-model="form.email"
            type="email"
            :error-messages="$validationMsgs($v.form.email)"
            @input="$v.form.email.$touch()"
          ></v-text-field>
          <p
            :class="
              $vuetify.breakpoint.mobile
                ? 'text-subtitle-1 font-weight-bold mb-2 font-primary  '
                : 'text-subtitle-1 font-weight-bold mb-2 font-primary '
            "
          >
            {{ $t("signin.password") }}<Sup>*</Sup>
          </p>

          <v-text-field
            outlined
            solo
            :class="$vuetify.breakpoint.mobile ? 'rounded-lg' : 'rounded-lg'"
            flat
            height="50"
            width="486"
            v-model="form.password"
            type="password"
            :error-messages="$validationMsgs($v.form.password)"
            @input="$v.form.password.$touch()"
          ></v-text-field>
          <div
            :class="{
              row: true,
              'align-baseline justify-space-between':
                !$vuetify.breakpoint.mobile,
              'flex-column': $vuetify.breakpoint.mobile,
            }"
          >
            <v-checkbox
              :class="{
                'col-md-5 col-sm-12': true,
                'mb-0': $vuetify.breakpoint.mobile,
                'remember-me': true,
              }"
            >
              <template v-slot:label>
                <div>
                  <p
                    :class="{
                      'mb-0': true,
                      'font-primary': !$vuetify.breakpoint.mobile,
                    }"
                  >
                    {{ $t("signin.remember_me") }}
                  </p>
                </div>
              </template>
            </v-checkbox>
            <v-btn
              color="dark"
              nuxt
              :to="localePath('/forget-password')"
              elevation="0"
              :class="{
                'bg-transparent font-weight-bold': true,
              }"
            >
              <p
                :class="{
                  'mb-0': true,
                  'font-primary': true,
                  'font-primary': !$vuetify.breakpoint.mobile,
                  'forget-passowrd-link': $vuetify.breakpoint.mobile,
                }"
              >
                {{ $t("signin.forgot_password") }}
              </p>
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            elevation="0"
            class="rounded-lg text-center"
            x-large
            color="primary"
            @click="login"
            :loading="loading"
            >{{ $t("signin.signin") }}</v-btn
          >
        </v-card-actions>
        <div class="text-center">
          <small class="text-gray">{{ $t("signin.donthaveaccount") }}</small>

          <v-btn
            color="dark"
            elevation="0"
            nuxt
            :to="localePath('/register')"
            class="forget-passowrd text-subtitle-1 font-weight-bold mb-0 font-primary mt-1"
          >
            {{ $t("signin.signup") }}
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { email, required, helpers } from "vuelidate/lib/validators";

// import { login } from "~/apis/auth";

export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      messagesOverride: {
        required: "You must fill the {attribute} field to continue",
        email: "The email must be a genuine email address.",
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      // login(this.form).then(e => {
      // })
      // return
      // this.$auth.setUserToken("Asdasd2342x", "Asdasd2342x");
      // this.$auth.setUser({
      //     id: 12,
      //     name: "asd",
      //     email: "wads"
      // });
      // this.$toast.success("Logged In");
      // return;
      this.$auth
        .loginWith("laravelJWT", {
          data: this.form,
        })
        .then(({data}) => {
          if (data.type !== 'customer') {
              throw new Error('You are not a customer')
          }
          this.$auth.setUserToken(data.token, data.token).then(() => {
            window.localStorage.setItem('user', JSON.stringify(data))
            this.$store.dispatch("cart/get");
            this.$store.dispatch('notification/getNotifications')
            this.$toast.success("Logged In");
            const order_id = this.$route.query.order_id
            if(order_id) {
              this.$router.replace(this.localePath(`/profile/orders/${order_id}`))
            }else {
              this.$router.replace(this.localePath("/pick-service"));
            }
          });
        })
        .catch((error) => {
          // alert(JSON.stringify(error, null, 4));
          this.$toast.error(error.message || "Wrong Email Or Password");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  compouted: {
    lang() {
      return this.$i18n.locale;
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
  created() {
    this.$store.dispatch('notification/deleteNotification')
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

.forget-passowrd-link {
  color: #65382c;
}

.forget-passowrd {
  // text-align: center;
  // margin-top: 2rem;
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
</style>
<style>
.remember-me .v-input__slot {
  align-items: baseline !important;
}

.remember-me .v-input--selection-controls__input {
  top: 4px !important;
}
</style>
