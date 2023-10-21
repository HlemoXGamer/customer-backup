<template>
  <footer class="bg-blue_light p-5">
    <div class="px-5 py-5 sm:px-6 lg:px-8">
      <div class="row">
        <div class="col-md-3 col-sm-4 col-4" :class="{ 'pl-12': !$vuetify.breakpoint.xs }">
            <v-img height="150" max-width="150" contain src="/images/big-logo.png" class="logo" @click="$router.push(goToHome)" style="cursor: pointer;"></v-img>
        </div>
        <!-- <div class="col-md-2 col-sm-12">
          <div>
            <p class="font-medium">
              {{ $t("common.important_links") }}
            </p>
            <div class="mt-4 space-y-2 text-sm text-white-500">
              <div>
                <nuxt-link :to="localePath('/contact-us')" class="link">{{ $t("common.contact_us") }}</nuxt-link>
              </div>
              <div>
                <a class="link" href="#">{{ $t("common.about_us") }}</a>
              </div>
              <div>
                <a class="link" href="#">{{ $t("common.support") }}</a>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="col-md-2 col-sm-12">
          <div>
            <p class="font-medium">
              {{ $t("common.terms_of_service") }}
            </p>
            <div class="mt-4 space-y-2 text-sm text-white-500">
              <div>
                <a class="link" href="#">{{ $t("common.privacy_policy") }}</a>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-md-2 col-sm-4 col-4">
          <p class="font-medium mb-2 font-weight-bold">
            {{ $t("common.contact_us") }}
          </p>
          <div class="d-flex flex-column mt-0 space-x-6 text-white-500">
            <a class="hover:opacity-75" style="width: fit-content;" href target="_blank">
              <v-icon color="#65382c">mdi-whatsapp</v-icon> {{ $t("common.whatsapp") }}
            </a>
            <a class="hover:opacity-75 mt-2" href target="_blank" style="width: fit-content;">
              <v-icon color="#65382c">mdi-phone</v-icon> {{ $t("common.phone") }}
            </a>
            <a class="hover:opacity-75 mt-2" href="https://instagram.com/sable.kw" target="_blank" style="width: fit-content;">
              <v-icon color="#65382c">mdi-instagram</v-icon> {{ $t("common.instagram") }}
            </a>
            <a class="hover:opacity-75 mt-2" href target="_blank" style="width: fit-content;">
              <v-icon color="#65382c">mdi-email-outline</v-icon> {{ $t("common.email") }}
            </a>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 col-4">
          <p class="font-medium mb-2 font-weight-bold">
            {{ $t("common.download") }}
          </p>
          <div class="d-flex align-center flex-wrap mt-0 footer-images">
            <img alt="" width="120" contain src="/images/google-new.png" class="logo" />
            <img alt="" width="105" contain src="/images/ios-new.png" class="logo ios" />
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #65382c;">
      <p class="text-center pa-0 ma-0 white--text py-1" style="font-size: 13px;">
        &copy; {{ $t("common.rights_reserved") }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "VmFooter",
  computed: {
    isLocation() {
      return this.$route.path.includes('location')
    },
    goToHome() {
      return this.localePath("/location");
      // const default_location = localStorage.getItem("default_location");
      // if (!default_location) {
      //   return this.localePath("/location");
      // } else {
      //   return this.localePath("/products");
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

footer {
  margin-top: auto;
  background: #ecbaa8;
  color: white;
}

footer p{
  color: #65382c;
}

.text-white-500 a {
  color: #65382c !important;
  text-decoration-line: none;
}

.footer-images img {
  object-fit: contain;
}

.footer-images .ios {
  transform: scale(1);
}
</style>
