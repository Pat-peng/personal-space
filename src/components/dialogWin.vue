<template>
  <el-dialog id='dialogWin' title="查看对话" top="10%" :before-close="dialogWinClose" :visible.sync="dialogWinVisible" @open='loadComments'>
    <div class="commentItems">
      <div v-for="(comment,commentIndex) in comments">
        <div class="AuthorInfo">
          <img :src="comment.userImage" style="width24px;height:24px;">
          <span class="name">{{comment.userName}}
            <span v-show='comment.RootID'>回复</span>
            {{comment.PName}}
          </span>
          <span class="CommentTime">{{comment.createAt}}</span>
        </div>
        <p>{{comment.content}}</p>
        <div class="buttons">
          <el-button type="info2" icon="star-on" @click="likeComment(commentIndex,comment._id)" :class="{selected:comment.likeSelected}">{{comment.like?comment.like:"赞"}}</el-button>
           <el-button type="info2" class="hoverBtn" icon="star-off" @click="dislikeComment(commentIndex,comment._id)" :class="[{selected:comment.unlikeSelected}]">{{comment.unlikeSelected?"取消踩":"踩"}}</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default{
    name:"",
    data(){
      return{
        comments:[]
      }
    },
    props:{
      dialogWinVisible: {
        type: Boolean
      },
      RootID:{
        type:String
      }
    },
    // mounted(){//渲染时加载评论
    //   this.loadComments()
    // },
    methods:{
      //对话窗口的关闭
      dialogWinClose:function(){
        this.$emit('closeDialogWin')
      },
      //加载会话内容
      loadComments:function(){
        this.$http.get('/server/comments/replay?r='+this.RootID).then(
          function (res) {
              // 处理成功的结果
              if (res.data.success) {
                this.comments=res.data.comments;
                return;
              }
              else{
                alert("展开评论失败，"+res.data.error);
              }
            },function (res) {
            // 处理失败的结果
            alert(res.data);
          });
      },
      //踩
      dislikeComment:function(commentIndex,id){
        if(this.comments[commentIndex].unlikeSelected){
          this.comments[commentIndex].unlikeSelected=false;
        }else{
          if (this.comments[commentIndex].likeSelected) {
            this.likeComment(commentIndex,id,'route');
          }
          this.comments[commentIndex].unlikeSelected=true;
        }
      },
      //赞
      likeComment:function(commentIndex,id,route){
        let selected=this.comments[commentIndex].likeSelected;
        var _like;
        if (selected) {
          _like=this.comments[commentIndex].like-1;
        }else{
          _like=this.comments[commentIndex].like+1;
        }
        var item={
          _id:id,
          like:_like
        }
        this.$http.post('server/comments/updateLike',item).then(
          function (res) {
              // 处理成功的结果
              if (res.data.success) {
                this.comments[commentIndex].like=_like;
                this.comments[commentIndex].likeSelected=!selected;
                if (route===undefined) {
                  this.comments[commentIndex].unlikeSelected=false;
                }
                return;
              }
              else{
                alert(res.data.error);
              }
            },function (res) {
          // 处理失败的结果
          alert(res.data);
        })
      }
    }
  }
</script>
<style lang='less'>
  #dialogWin{
    text-align: left;
    .el-dialog__body{
      height: 500px;
      overflow-y: scroll;
    }
    .commentItems>div{
      border-top: 1px solid #eee;
      padding:10px;
      .AuthorInfo{
        margin: 10px 0px;
        img{
          cursor: pointer;
        }
        .name{
          font-weight: 600;
          line-height: 2;
          vertical-align: text-bottom;
          cursor: pointer;
        }
        .sign{
          line-height: 2;
          vertical-align: text-bottom;
          font-size: 14px;
        }
      }
      .hoverBtn{
        display: none;
      }
      div:hover{
        .hoverBtn{
          display: inline-block;
        }
      }
      .CommentTime {
        vertical-align: super;
        float: right;
        color: #8590a6;
      }
      .el-button--info2{
        color: #8590a6;
        background-color: transparent;
        border: none;
        border-radius: 0;
        padding: 8px 10px;
      }
      .buttons{
        .selected{
          color:#2d84cc;
        }
      }
    }
  }
</style>