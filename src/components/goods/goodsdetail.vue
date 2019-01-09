<template>
    <div class="goodsdetail-container">
        <!-- 轮播部分 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner lunbodiv">
                    <swipe :lunbo="lunbo"></swipe>
                </div>
            </div>
        </div>

        <!-- 购买部分 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner addcart">
                    <div class="title">
                        {{good.title}}
                    </div>
                    <div class="price">
                        <span class="mark">市场价：<span>￥{{good.market_price}}</span></span>
                        <span class="sell">本店价：<span>￥{{good.sell_price}}</span></span>
                    </div>
                    <div class="stock">
                        <span class="titnum">购买数量：</span>
                        <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="good.stock_quantity">
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input class="mui-input-numbox" type="number" :value="value"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                    <div class="btns">
                        <mt-button type="primary" size="small" @click.native="gotopay" class="buy">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click.native="gotocart">加载更多</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品参数部分 -->
        <div class="mui-card infopart">
            <div class="mui-card-header title">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="info">  
                        <div>商品货号：{{good.goods_no}}</div>
                        <div>库存情况:{{good.stock_quantity}}件</div>
                        <div>上架时间：{{good.stock_quantity}}</div>
                    </div>
                    <div class="moreinfo">
                         <mt-button class="intro" type="primary" size="large" plain @click.native="getGoodsDesc">图文介绍</mt-button>
                        <mt-button type="danger" size="large" plain @click.native="loadmore">商品评论</mt-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import swipe from "../common/swipe.vue";
    import mui from "../../lib/mui/js/mui.js";
    //console.log(mui)
    export default {
        data(){
            return {
                id:this.$route.params.id,
                good:{},
                lunbo:[],
                value:1
            }
        },
        methods:{
            getInfo(){
                this.$http.get('api/getgoodsinfo/'+this.id).then(function(res){
                    if (res.body.status==0) {
                        this.good = res.body.message[0];
                    }
                })
            },
            getImg(){
                this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                    if (res.body.status==0) {
                        if (res.body.message.length==0) {
                            res.body.message[0] = {img:"http://test.w0824.com/nk1-thumb.jpg",src:"http://test.w0824.com/nk1-thumb.jpg",url:"http://test.w0824.com/nk1-thumb.jpg"}
                        }
                        else{
                            res.body.message.forEach(ele=>{
                                ele.img = ele.src;
                                ele.url = ele.src;
                            })
                        }
                        this.lunbo = res.body.message;

                    }
                })
            },
            getGoodsDesc(){
                this.$router.push('/home/goodsdesc/'+this.id);
            }
        },
        components:{
            swipe
        },
        created:function(){
            this.getInfo();
            this.getImg()
        },
        mounted:function(){
            mui('.mui-numbox').numbox();
        }
    }
</script>

<style scoped lang="scss">
    .goodsdetail-container{
        .lunbodiv{
            height: 230px;
        }
        .addcart{
            .title{
                font-size: 14px;
                font-weight: 800;
                margin: 0 0 20px 0;
                line-height: 16px;
            }
            .price{
                font-size: 12px;
                color: #666;
                .mark{
                    margin: 0 10px;
                    span{
                        text-decoration: line-through;
                    }
                }
                .sell{
                    span{
                        font-size: 14px;
                        color: #f00;
                        font-weight: 700;
                    }
                }
               
            }
            .stock{
                font-size: 12px;
                color: #666;
                width: 100%;
                margin-bottom: 20px;
                .titnum{
                   margin: 10px 5px 0 10px;
                   position: relative;
                   top: 5px;
                }
                .mui-numbox{
                    margin-top: 5px;
                    width:35%;          
                }
            }
            .btns{
                padding: 0 10px;
                .buy{
                    margin-right: 5px;
                }
            }
        }
        .infopart{
            .title{
                font-size: 14px;
                font-weight: 800;
            }
            .info{
                font-size: 12px;
                color: #666;
                margin-bottom: 30px;
               div{
                   margin-bottom: 5px;
               }
            }
            .moreinfo{
               .intro{
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>