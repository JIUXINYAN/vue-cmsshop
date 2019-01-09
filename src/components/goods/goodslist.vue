<template>
    <div class="goodslist-container">
        <router-link tag="div" :to="'/home/goodsdetail/'+item.id" class="item" v-for="item in goods" :key="item.id">
            <img v-lazy="item.img_url" alt="">
            <div class="title">{{item.title}}</div>
            <div class="info">
                <div class="price">
                    <span class="sell">￥{{item.sell_price}}</span>
                    <span class="mark">￥{{item.market_price}}</span>
                </div>
                <div class="stock">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link>
        <mt-button id="more" type="danger" size="large" plain @click.native="loadmore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        data(){
            return{
                pageindex:1,
                goods:[]
            }
        },
        methods:{
            getgoods(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status==0){
                        if(res.body.message.length==0&&this.pageindex!=1){
                            Toast('到底啦');
                        }
                        this.goods = this.goods.concat(res.body.message);
                    }
                })
            },
            loadmore(){
                this.pageindex ++;
                this.getgoods();
            }
        },
        created:function(){
            this.getgoods();
        }
    }
</script>

<style scoped lang="scss">
    .goodslist-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 8px;
        .item{
            border: 1px solid #ddd;
            margin-bottom: 5px;
            width: 48%;
            box-shadow: 0px 0px 10px #ccc;
            padding: 4px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title{
                font-size: 14px;
                font-weight: 800;
                // line-height: 14px;
                // margin: 10px 0 10px 5px;
            }
            .info{
                background-color: rgba(109,103,103,0.1);
                padding: 3px 5px;
                margin: 0;
               .price{
                   .sell{
                       font-size: 14px;
                       font-weight: 800;
                       color: #f00
                   }
                   .mark{
                       font-size: 12px;
                       color: #aaa;
                       text-decoration:line-through;
                       margin-left: 8px;
                   }
               }
                .stock{
                    font-size: 12px;
                    color: #aaa;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 0 10px;
                }
            }
        }
        img{
            width: 100%;
            //height: 60%;
        }
        #more{
            margin: 20px 0 10px 0;
        }
    }
</style>