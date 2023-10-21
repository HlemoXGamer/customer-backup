<template>
<section class="map w-full max-w-xl">
 <GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    
  />
</GmapMap>
</section>
</template>

<script>

let coord = {
    lat: null,
    lng: null
}

export default {
    // Component variables
    
}
</script>

<style lang="scss" scoped>
.map {
    width: 100%;

    &-main {
        width: 100%;
        height: 400px;
    }

    &-info {
        &__icon {
            display: inline-block;
            width: 16px;
            height: 16px;
        }

        &__title {
            font-weight: bold;
        }
    }
}
</style>
