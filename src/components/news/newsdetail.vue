<template>
    <div class="detail-container">
        <!-- 大标题 -->
        <h3 class="title">{{newInfo.title}}</h3>

        <!-- 子标题 -->
        <div class="subtitle">
            <span>发布时间：{{newInfo.add_time|dateFormat}}</span>
            <span class="click">点击：{{newInfo.click}}</span>
        </div>

        <hr>

        <!-- 内容 -->
        <div class="content" v-html="newInfo.content"></div>

        <!-- 评论 -->
    <comment :id="id"></comment>
    </div>
</template>

<script>
// 引入评论子组件
    import comment from '../common/comment.vue';

    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                id:this.$route.params.id,
                newInfo:{},
                
            }
        },
        methods:{
            getNewsInfo(){
                //发送ajax请求，获取新闻资讯的详情
                this.$http.get('api/getnew/'+this.id).then(function(res) {
                    if (res.body.status==0) {
                        this.newInfo = res.body.message[0];
                    }
                })
            },
        },
        components:{
            comment
        },
        created:function() {
            this.getNewsInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .detail-container{
        font-family: '黑体';
        padding: 0 10px;
        .title{
            color: #26a2ff;
            font-size: 16px;
            text-align: center;
            padding: 10px 0;
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
        // .comment{
        //     .title{
        //         color: #000;
        //         line-height: 16px;
        //         text-align: left;
        //     }
        //     .list{
        //         margin: 10px 0;
        //         .list-item{
        //             margin: 5px 0;
        //             .info{
        //                 background-color: #d2d2d2;
        //                 font-size: 13px;
        //             }
        //             .content{
        //                 font-size: 14px;
        //             }
        //         }
        //     }
        // }
    }
</style>