<template>
  <v-row :class="$vuetify.breakpoint.mobile ? '' : 'mt-10'">
    <v-col cols="12">
      <h3 class="ml-5 font-primary font-weight-bold">
        {{ $t("profile.change_password.change_password") }}
      </h3>
    </v-col>
    <v-col cols="12 ">
      <v-card rounded="lg" class="pa-4">
        <v-row>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
            <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
              {{ $t("profile.change_password.old_password") }}<Sup>*</Sup>
            </p>
            <v-text-field
              outlined
              solo
              class="rounded-lg sing-up-Fields"
              flat
              height="30"
              v-model="form.old_password"
              type="password"
              :error-messages="$validationMsgs($v.form.old_password)"
              @input="$v.form.old_password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
            <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
              {{ $t("profile.change_password.new_password") }}<Sup>*</Sup>
            </p>
            <v-text-field
              outlined
              solo
              class="rounded-lg sing-up-Fields"
              flat
              height="30"
              v-model="form.new_password"
              type="password"
              :error-messages="$validationMsgs($v.form.new_password)"
              @input="$v.form.new_password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
            <p class="text-subtitle-1 font-weight-bold mb-1 font-primary">
              {{ $t("profile.change_password.password_confirmation")
              }}<Sup>*</Sup>
            </p>
            <v-text-field
              outlined
              solo
              class="rounded-lg sing-up-Fields"
              flat
              height="30"
              v-model="form.new_password_confirmation"
              :error-messages="$validationMsgs($v.form.new_password_confirmation)"
              @input="$v.form.new_password_confirmation.$touch()"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
            <v-btn
              elevation="0"
              x-large
              color="Newprimary"
              class="text-center d-block buttonBlock"
              :loading="loading"
              @click="update"
            >
              {{ $t("profile.change_password.save") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, sameAs , helpers } from "vuelidate/lib/validators";
import { changePassword } from "~/apis/profile";

export default {
  data() {
    return {
      loading: false,
      form: {
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
    };
  },
  validations() {
    return {
      form: {
        old_password: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        new_password: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
        },
        new_password_confirmation: {
          required: helpers.withParams(
            {
              lang: this.$i18n.locale,
            },
            required
          ),
          sameAs: sameAs("new_password"),
        },
      },
    };
  },
  methods: {
    update() {
      this.loading = true;
      changePassword(this.form).then(() => {
        this.loading = false;
        this.$toast.success("Updated");
      }).catch(err => {
        this.loading = false;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.font-primary {
  font-size: 2rem;
  color: $font-primary !important;
}

.v-application .Newprimary {
  background-color: #65382c !important;
  border-color: #65382c !important;
}

.buttonBlock {
  margin: 2rem auto;
}

.Newprimary .v-btn__content {
  padding: 0px 5rem;
}

.Newprimary .v-btn__content {
  color: white;
}
</style>
