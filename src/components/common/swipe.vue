<template>
    <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in lunbo" :key="item.img">
            <img :src="item.img" alt="">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props:['lunbo'],
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 100%;
        text-align: center;
        img{
            //width: 100%;
            height: 100%;
        }
    }
</style>