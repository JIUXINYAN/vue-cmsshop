<template>
    <div class="photodetail-container">
        <h2 class="title">{{imgInfo.title}}</h2>
        <div class="subtitle">
            <span>发表时间：{{imgInfo.add_time|dateFormat}}</span>
            <span class="click">点击：{{imgInfo.click}}</span>
        </div>
        <hr>
        <!-- 图片区域 -->
        <!-- <div class="imgs">
            <img v-for="item in imgs" :key="item.src" :src="item.src" alt="">
        </div> -->
         <vue-preview :slides="imgs" @close="handleClose"></vue-preview>

        <div class="content" v-html="imgInfo.content"></div>
        <!-- 评论区域 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../common/comment.vue';

    export default {
        data(){
            return {
                id:this.$route.params.id,
                imgInfo:{},
                imgs:[]
            }
        },
        methods:{
            //获取图片信息
            getImgInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    if (res.body.status==0) {
                        this.imgInfo = res.body.message[0];
                    }
                })
            },
            //关闭图片
            handleClose () {
                console.log('close event')
            },
            //获取图片
            getImgs(){
                this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                    if (res.body.status==0) {
                        res.body.message.forEach(ele=>{
                            ele.msrc=ele.src;
                            ele.w = 600;
                            ele.h = 400;
                        });
                        this.imgs = res.body.message;
                    }
                })
            }
        },
        components:{
            comment
        },
        created:function(){
            this.getImgInfo();
            this.getImgs();
        }
    }
</script>

<style scoped lang="scss">
    .photodetail-container{
        padding: 0 10px;
        .title{
            color: #26a2ff;
            font-size: 16px;
            text-align: center;
            margin: 10px;
            font-weight: 900;
            line-height: 20px;
        }
        .subtitle{
            color: #aaa;
            font-size: 12px;
            .click{
                float: right
            }
        }
        .imgs{
            margin-top: 20px;
            img{
                width: 100%;
                margin-bottom: 10px;
            }
        }
        .content{
            font-size: 14px;
            margin: 10px 0 20px 0;
        }
    }
</style>