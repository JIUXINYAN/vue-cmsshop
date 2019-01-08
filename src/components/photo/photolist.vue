<template>
    <div class="photolist-container">
        <van-tabs color="#26a2ff" v-model="active" @click="getCatImg">
            <van-tab :title="item.title" v-for="item in category" :key="item.id">
                <div class="photolist">
                    <router-link tag="li" :to="'/home/photodetail/'+item.id" class="item" v-for="item in showImgs" :key="item.id">
                        <img v-lazy="item.img_url" alt="">
                        <div class="info">
                            <div class="info-title">{{item.title}}</div>
                            <div class="info-body">{{item.zhaiyao}}</div>
                        </div>
                    </router-link>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                category:[],
                active:0,
                showImgs:[]
            }
        },
        created(){
            this.getImgCat();
            this.getCatImg(0)
        },
        methods:{
            //获取分类数据
            getImgCat(){
                this.$http.get('api/getimgcategory').then(function(res){
                    if (res.body.status==0) {
                        this.category = res.body.message;
                        this.category.unshift({id:0,title:'全部'})
                    }
                })
                return true;
            },
            //获取分类图片
            getCatImg(index, title){
                var id = this.category.length==0 ? 0:this.category[index].id;
                this.$http.get('api/getcatimages/'+id).then(function(res){
                    if (res.body.status==0) {
                        this.showImgs = res.body.message;
                    }
                });
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .photolist-container{
        .photolist{
            .item{
                list-style: none;
                width: 94%;
                margin: 20px 3% 0 3%;
                position: relative;
                box-shadow: 0px 0px 20px #aaa;

                img{
                    width: 100%;
                }
                img[lazy=loading]{
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                .info{
                    background-color: rgba(0,0,0,0.5);
                    position: absolute;
                    bottom: 5px;
                    color: #fff;
                    .info-title{
                        font-size: 14px;
                        font-weight: 800;opacity: 0.9;
                    }
                    .info-body{
                        font-weight: 800;
                        font-size: 14px;
                        font-weight:normal;
                        opacity: 0.7;
                    }
                }
            }
        }
    }
</style>