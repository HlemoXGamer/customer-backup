<template>
<div class="contact-us-page">
    <h1>{{$t('contact_us.title')}}</h1>
    <p>{{$t('contact_us.help')}}</p>
    <v-card class="d-flex py-4 px-3 cart-contact-us justify-space-between" elevation="2">
        <div class="">
            <p class="font-primary font-weight-bold">{{$t('contact_us.phone')}} :<a class="text-decoration-none" href="tel:1822226"> 1822226</a></p>
            <p  class="font-primary font-weight-bold"> {{$t('contact_us.whatsapp')}} :<a class="text-decoration-none" target="_blank" :href="`https://wa.me/1822226`"> 1822226</a></p>
            <p  class="font-primary font-weight-bold pb-0 mb-0">{{$t('contact_us.instagram')}} : 
                <a href="https://instagram.com/sable.kw" target="_blank">@sable.kw</a>
            </p>
        </div>
        <div class="image">
            <img src="/images/noun_live chat_.png" />
        </div>
    </v-card>
    </div>
</template>
<style lang="scss" scoped>
.contact-us-page {
    .font-primary {
        font-size:1.25rem;
    }
    .image {
        img {
            filter: hue-rotate(106deg) grayscale(0.6);
        }
    }
}
.cart-contact-us {
        background: #6c352924;
}
// .text-decoration-none {
//     text-decoration: none;
// }
</style>