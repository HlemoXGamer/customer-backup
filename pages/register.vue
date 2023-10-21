<template>
  <v-row align="center">
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <v-img src="/images/big-logo-no-text.png"></v-img>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
      <h2 class="text-center font-primary font--size__40 mt-5">
        {{ $t("signup.signup") }}
      </h2>
      <v-card rounded="lg" :class="$vuetify.breakpoint.mobile ? '' : 'ml-15'">
        <v-card-text>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
            {{ $t("signup.username") }} <Sup> *</Sup>
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg sing-up-Fields"
            flat
            height="50"
            v-model="form.name"
            :error-messages="$validationMsgs($v.form.name)"
            @input="$v.form.name.$touch()"
          ></v-text-field>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
            {{ $t("signup.email") }} <Sup>*</Sup>
          </p>
          <v-text-field
            dir="ltr"
            outlined
            solo
            class="rounded-lg sing-up-Fields"
            flat
            height="50"
            v-model="form.email"
            type="email"
            :error-messages="$validationMsgs($v.form.email)"
            @input="$v.form.email.$touch()"
          ></v-text-field>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
            {{ $t("signup.phone") }}
          </p>

          <div class="d-flex align-start sing-up-Fields ">
            <div class="country-container">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/null/kuwait.png"
              />
            </div>
            <div style="width:100%">
              <v-text-field
                dir="ltr"
                outlined
                solo
                class="rounded-lg"
                flat
                height="50"
                v-model="form.phone"
                :error-messages="$validationMsgs($v.form.phone)"
                @input="$v.form.phone.$touch()"
                label=""
                :placeholder="phone_placeholder"
              ></v-text-field>
            </div>
          </div>
          <!-- <vue-tel-input-vuetify
            dir="ltr"
            outlined
            solo
            flat
            height="50"
            class="sing-up-Fields"
            v-model="form.phone"
            :error-messages="$validationMsgs($v.form.phone)"
            @input="$v.form.phone.$touch()"
            :onlyCountries="['kw']"
            defaultCountry="kw"
            mode="international"
            @validate="checkPhone"
            label=""
            :placeholder="phone_placeholder"
          ></vue-tel-input-vuetify> -->
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
            {{ $t("signup.password") }} <Sup>*</Sup>
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg sing-up-Fields"
            flat
            height="50"
            v-model="form.password"
            type="password"
            :error-messages="$validationMsgs($v.form.password)"
            @input="$v.form.password.$touch()"
          ></v-text-field>
          <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
            {{ $t("signup.confirmation") }} <Sup>*</Sup>
          </p>

          <v-text-field
            outlined
            solo
            class="rounded-lg sing-up-Fields"
            flat
            height="50"
            v-model="form.password_confirmation"
            :error-messages="$validationMsgs($v.form.password_confirmation)"
            @input="$v.form.password_confirmation.$touch()"
            type="password"
          ></v-text-field>
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <v-btn
                color="dark"
                elevation="0"
                class="
                  forget-passowrd
                  text-subtitle-2
                  font-weight-bold
                  mb-0
                  font-primary
                "
              >
                <small class="font-primary">{{
                  $t("signup.privacy_policy")
                }}</small>
              </v-btn>
            </div>
          </div>

          <!-- <v-file-input v-model="form.image" /> -->
        </v-card-text>

        <v-card-actions>
          <v-btn
            elevation="0"
            class="rounded-lg text-center"
            x-large
            color="primary"
            @click="register"
            :loading="loading"
            >{{ $t("signup.signup") }}</v-btn
          >
        </v-card-actions>
        <div class="text-center">
          <small class="text-gray">{{ $t("signup.haveanaccount") }}</small>

          <v-btn
            color="dark"
            elevation="0"
            nuxt
            :to="localePath('/login')"
            class="
              forget-passowrd
              text-subtitle-1
              font-weight-bold
              mb-0
              font-primary
              mt-1
            "
          >
            {{ $t("signup.signin") }}
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { register } from "@/apis/auth";
import { required, sameAs, email, helpers } from "vuelidate/lib/validators";

const phone_number = helpers.regex('serial', /^([5694]\d{7})$/g)


export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        // image: ""
      },
      phoneValid: false,
      loading: false,
    };
  },
  methods: {
    register() {
      this.$v.$touch();

      const form_data = new FormData();

      for (const key in this.form) {
        if (key === 'phone') {
          if (this.form.phone.length === 8) {
            form_data.append('phone', '965' + this.form.phone)
          }
        }else {
          form_data.append(key, this.form[key]);
        }
      }

      if (this.$v.$invalid) return;
      this.loading = true;
      register(form_data)
        .then((data) => {
          // this.$auth.setUserToken(data.data.token, data.data.token).then(() => {
          // this.$store.dispatch("cart/get");
          this.$toast.success("Registered");
          this.$router.replace(this.localePath("/login"));
          this.loading = false;
          // });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    checkPhone({ isValid }) {
      this.phoneValid = isValid;
    },
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        phone: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
          phone_number,
          // phoneValid: () => this.phoneValid,
        },
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
  computed: {
    phone_placeholder() {
      return this.$t("profile.addresses.phone_placeholder");
    },
  },
};
</script>

<style lang="scss">
.font-primary,
.font-primary .v-btn__content {
  color: $font-primary;
}

.font--size__40 {
  font-size: 2.5rem !important;
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

.v-text-field__details {
  margin-bottom: 2px !important;
}

.sing-up-Fields {
  width: 450px !important;
}

.sing-up-Fields.vue-tel-input-vuetify {
  display: flex;
  flex-direction: row;
}

.vue-tel-input-vuetify .country-code {
  width: 50px;
}

@media only screen and (max-width: 600px) {
  .sing-up-Fields.vue-tel-input-vuetify {
    width: auto !important;
  }
  .forget-passowrd {
    width: inherit;
  }
  .forget-passowrd small {
    font-size: 8px;
  }
}
</style>
