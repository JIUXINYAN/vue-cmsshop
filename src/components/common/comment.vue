<template>
    <div class="comment">
        <h3 class="title">发表评论</h3>
        <textarea cols="30" rows="10" placeholder="请输入要BB的内容（最多吐槽120字）" v-model="content"></textarea>
        <mt-button type="primary" size="large"  @click.native="postComment">发表评论</mt-button>
        <div class="list">
            <div class="list-item" v-for="(item,index) in comments" :key="index">
                <div class="info">第{{index+1}}楼用户：{{item.user_name}} 发表时间：{{item.add_time|dateFormat}}</div>
                <div class="content">
                    {{item.content}}
                </div>
            </div>
        </div>
        
        <mt-button id="more" type="danger" size="large" plain @click.native="loadmore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                content:"",
                pageindex:1,
                comments:[],
            }
        },
        methods:{
            //获取当前文章的评论数据
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(function(res) {
                    if (res.body.status == 0) {
                        if(res.body.message.length==0){
                            Toast('到底啦');
                        }
                        this.comments = this.comments.concat(res.body.message);
                    }
                })
            },
            //发表评论的方法
            postComment(){
                if(this.content.trim()==''){
                    Toast('内容不能为空');
                    return;
                }
                this.$http.post('api/postcomment/'+this.id,{content:this.content}).then(function(res){
                    if(res.body.status==0){
                        Toast('评论成功');
                        this.content = '';
                        this.refresh();
                    }
                    else{
                        Toast('服务器繁忙请稍后再试');
                    }
                })
            },
            //刷新评论页面
            refresh(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex=1').then(function(res) {
                    if (res.body.status == 0) {
                        this.comments = res.body.message;
                    }
                })
            },
            //点击加载更多
            loadmore(){
                //页码加一
                this.pageindex ++;
                this.getComments();
            }
        },
        created:function(){
            this.getComments();
        },
        props:['id'],
    }
</script>

<style lang="scss" scoped>
    .comment{
        .title{
            color: #000;
            line-height: 16px;
            text-align: left;
        }
        .list{
            margin: 10px 0;
            .list-item{
                margin: 5px 0;
                .info{
                    background-color: #d2d2d2;
                    font-size: 13px;
                }
                .content{
                    font-size: 14px;
                }
            }
        }
    }
</style>