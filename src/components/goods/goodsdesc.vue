<template>
    <div class="goodsdesc-container">
        <div class="title">{{desc.title}}</div>
        <hr>
        <div class="content" v-html="desc.content"></div>
    </div>
</template>

<script>
    export default {
        data:function() {
            return {
                id:this.$route.params.id,
                desc:[]
            }
        },
        methods:{
            getdesc(){
                this.$http.get('api/getgoodsdesc/'+this.id).then(function(res){
                    if (res.body.status==0) {
                        this.desc = res.body.message[0]
                    }
                })
            }
        },
        created:function() {
            this.getdesc();     
        }, 
    }
</script>

<style lang="scss" scoped>
    .goodsdesc-container{
        padding: 10px;
        .title{
            color: #00f;
            font-weight: 800;
            font-size: 15px;
            text-align: center;
            margin: 5px;
            line-height: 15px;
        }
        /deep/ img{
            width: 100%;
        }
    }
</style>