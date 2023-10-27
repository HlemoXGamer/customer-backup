<template>
  <div>
    <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
      <v-col cols="12">
        <h3 class="ml-5 font-primary font-weight-bold">
          {{ $t("profile.profile.edit_profile") }}
        </h3>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
        <!-- <ProfileNav></ProfileNav> -->
        <div class="d-block align-center justify-space-between">
          <form class="updateImg mt-5">
            <label>
              <img :src="image" />
              <input type="file" @change="previewThumbnail" />
            </label>
          </form>
        </div>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 9">
        <v-card rounded="lg" class="pa-4">
          <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
              <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
                {{ $t("profile.profile.username") }}<Sup>*</Sup>
              </p>
              <v-text-field outlined solo v-model="form.name" name="name" :error-messages="$validationMsgs($v.form.name)"
                @input="$v.form.name.$touch()" label="Full Name" required></v-text-field>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
              <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
                {{ $t("profile.profile.email") }} <Sup>*</Sup>
              </p>
              <v-text-field outlined solo v-model="form.email" label="E-mail"
                :error-messages="$validationMsgs($v.form.email)" @input="$v.form.email.$touch()" name="email"
                required></v-text-field>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
              <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
                {{ $t("profile.profile.phone") }} <Sup>*</Sup>
              </p>
              <div class="d-flex align-start">
                <div class="country-container" style="max-height: 56px; line-height: 66px">
                  <img width="20" height="20" src="https://img.icons8.com/color/48/null/kuwait.png" />
                </div>
                <div style="width: 100%">
                  <v-text-field dir="ltr" outlined class="rounded-lg" flat height="50" v-model="form.phone"
                    :error-messages="$validationMsgs($v.form.phone)" @input="$v.form.phone.$touch()" label=""
                    :placeholder="phone_placeholder"></v-text-field>
                </div>
              </div>
              <!-- <vue-tel-input-vuetify
                outlined
                solo
                v-model="form.phone"
                :error-messages="$validationMsgs($v.form.phone)"
                @input="$v.form.phone.$touch()"
                :onlyCountries="['kw']"
                defaultCountry="kw"
                mode="national"
                :disabledFetchingCountry="true"
                name="phone"
                label=""
                @validate="checkPhone"
                :placeholder="phone_placeholder"
              ></vue-tel-input-vuetify> -->
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="d-flex align-center justify-center">
              <nuxt-link :to="localePath('/profile/change-password')" class="font-primary-Password text-center d-block">{{
                $t("profile.profile.change_password") }}</nuxt-link>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn elevation="0" x-large color="primary" @click="update" :loading="loading">{{ $t("profile.profile.save")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  minLength,
  helpers,
} from "vuelidate/lib/validators";
import { update } from "@/apis/profile";
import { get as getProfile } from "@/apis/profile";

const phone_number = helpers.regex("serial", /^([5694]\d{7})$/g);

export default {
  data(vm) {
    return {
      loading: false,
      phoneValid: false,
      imageData: "",
      form: {
        image: "",
        name: "",
        email: "",
        phone: "",
      },
    };
  },

  methods: {
    async getProfile() {
      const {
        data: { user },
      } = await getProfile();
      if (user.phone.length === 11) {
        user.phone = user.phone.slice(3);
      }
      this.form = user;
    },
    previewThumbnail(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.form.image = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async update() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      const data = {};
      const form_data = new FormData();
      const keys = ["name", "email", "phone", "image"];


      for (const key in this.form) {
        if (keys.includes(key)) {
          if (key === 'phone' && this.form.phone.length === 8) {
            form_data.append('phone', "965" + this.form.phone)
          } else {
            form_data.append(key, this.form[key]);
          }
          data[key] = this.form[key];
        }
      }

      this.loading = true;
      update(form_data)
        .then(() => {
          this.loading = false;
          this.$toast.success("Updated");
        })
        .catch((err) => {
          this.loading = false;
        });
      // await this.$auth.fetchUser();
      // this.loading = false;
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
        phone: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
          phone_number,
        },
      },
    };
  },
  computed: {
    phone_placeholder() {
      return this.$t("profile.addresses.phone_placeholder");
    },
    image() {
      if (this.imageData.length > 0) {
        return this.imageData
      } else if (!this.form.image) {
        return '/images/upload.png'
      }
      return this.form.image
    }
  },
  created() {
    this.getProfile();
  },
};
</script>

<style lang="scss" scoped>
.updateImg input {
  display: none;
}

.updateImg label,
.updateImg img {
  cursor: pointer;
  width: 213px;
  height: 212px;
  border-radius: 50%;
}

.font-primary {
  font-size: 2rem;
  color: $font-primary !important;
}

.font-primary-Password {
  color: $font-primary !important;
}

.v-application .v-text-field--solo .v-label,
.v-application .v-text-field--outlined .v-label {
  top: calc(50% - 9px) !important;
}

.vue-tel-input-vuetify {
  .vti__flag {
    position: static !important;
    margin: auto !important;
    display: block;
    transform: scale(1.2);
    width: 20px;

    &+input {
      display: none;
    }
  }
}

// .profile-dialog {
//   top:0;
//   position:fixed;
//   left:0;
//   height:90vh;
//   background: #fff;
// }
</style>
