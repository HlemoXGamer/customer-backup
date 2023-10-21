<template>
  <div class="fill-height d-flex align-center flex-column justify-center">
    <v-icon size="80" class="mt-5" color="black">{{ $attrs.icon }}</v-icon>
    <p class="text-h5 font-weight-bold mt-5">{{ $attrs.text }}</p>
    <slot></slot>
  </div>
</template>

