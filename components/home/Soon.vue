<template>
   <div class="soon" v-if="show">
    <div class="clickme" @click="hide"></div>
    <div class="image-wrapper">
        <img src="images/big-logo-no-text-white.png" width="50%" class="image" />
        <h1 class="soon-text">Coming Soon</h1>
    </div>
   </div>
</template>
<script>
export default {
    data: () => ({
        show: true
    }),
    methods: {
        hide () {
            this.show = false
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.clickme {
    background: #65382c;
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
}
.soon {
    top: 0;
    left: 0;
    z-index: 9999;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #65382c;
    overflow: hidden;
    overflow-y: hidden;
}
.image-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.soon-text {
    margin-top: 1.25rem;
    color: aliceblue;
    font-size: 3.75rem;
    letter-spacing: 1.25px;
    font-family: 'Roboto', sans-serif;
}
</style>