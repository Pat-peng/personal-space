<template>
    <el-dialog id='askQuestion' :before-close="AskDialogClose" :visible.sync="AskDialogVisible">
        <h2>写下你的问题</h2>
        <div class="title1">
            <span>
                描述精确的问题更易得到解答
            </span>
        </div>
        <el-form ref='questionForm' :rules="questionRules" :model="ruleForm">
            <el-form-item prop="question">
                <el-input type="textarea" :rows="2" placeholder="请输入问题" v-model="ruleForm.question">
                </el-input>
            </el-form-item>
            <el-dropdown @command="selectTopic" trigger='click'>
                <el-input placeholder="添加话题" @input="topicsFilter" icon="search" v-model="topic">
                </el-input>
                <el-dropdown-menu class='askquestion' slot="dropdown">
                    <el-dropdown-item
                        v-for="(topic,index) in filterTopics"
                        :key="index"
                        :command="topic.name"
                    >
                        {{topic.name}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div>
                <div class="remark_toolbar">问题描述（可选）：</div>
                <div class="DraftEditor-root">
                    <el-input type="textarea" placeholder='问题背景、条件等详细信息' :rows="4" v-model="remark">
                    </el-input>
                </div>
            </div>
            <div class="anonymous">
                <el-checkbox v-model="anonymous">匿名提问</el-checkbox>
            </div>
            <el-button @click='createQuestion' type="primary">提交问题</el-button>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name:"",
        data(){
            var questionRule=(rule, value, callback) => {
                var reg=/[\?？]+/;
                if (!reg.test(value)) {
                    callback(new Error('你还没有给问题添加问号'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    question:""
                },
                topic: "",
                topics:[{
                    name: "前端开发"
                },{
                    name: "vue.js"
                },{
                    name: "node.js"
                }],
                filterTopics:[{
                    name:"前端开发"
                },{
                    name:"vue.js"
                },{
                    name:"node.js"
                }],
                remark:"",
                anonymous:false,
                questionRules: {
                    question: {
                        validator: questionRule,
                        trigger: 'blur'
                    }
                }
            }
        },
        props:{
            AskDialogVisible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        methods: {
            //提问窗口的关闭
            AskDialogClose() {
                this.$emit('closeAskModel')
            },
            //添加一条话题记录
            addTopic(question) {
                this.$emit('addTopic',question)
            },
            //清空提问窗口
            clearAskDialog() {
                this.ruleForm.question='';
                this.topic='';
                this.remark='';
                this.anonymous=false;
            },
            //选中话题
            selectTopic(command) {
                this.topic=command;
            },
            //话题过滤
            topicsFilter() {
                var value=this.topic.trim();
                if (value==='') {
                    this.filterTopics=this.topics;
                }
                else {
                    var topics=this.topics;
                    var newTopics=[];
                    for(let topic of topics){
                        if (topic.name.indexOf(value)!=-1) {
                            newTopics.push(topic);
                        }
                    }
                    this.filterTopics=newTopics;
                }
            },
            //创建问题
            createQuestion() {
                let $vm = this;
                var item = {
                    title: $vm.ruleForm.question,
                    topics: $vm.topic,
                    content: $vm.remark,
                    isAnonymous: $vm.anonymous,
                    userId: $vm.userInfo.emailPhone
                };
                let reqUrl = location.origin.replace(location.port, '3000');
                $vm.$axios({
                    url: reqUrl + '/questions/insert',
                    method: 'post',
                    params: item,
                    withCredentials: true
                }).then(function (res) {
                    // 处理成功的结果
                    if (res.data.success) {
                        alert("问题提交成功！");
                        $vm.AskDialogClose();
                        $vm.addTopic(res.data.question);
                        return;
                    }
                    else {
                        alert(res.data.error);
                    }
                }, function (res) {
                    // 处理失败的结果
                    alert(res.data);
                });
            }
        }
    }
</script>
<style lang='less' scoped>
    .el-dialog{
        text-align: center;
        .title1{
            span{
                color: #8590a6;
            }
        }
        .el-dialog__body {
            padding: 10px 20px 30px;
        }
        .el-dropdown {
            margin-top: 0 !important;
        }
        .remark_toolbar{
            text-align: left;
        }
        .anonymous{
            text-align: left;
            margin-bottom: 20px;
        }
        .el-dropdown{
            width: 100%;
        }
        .el-form > div{
            margin-top: 20px;
            .el-form-item__error{
                right: 0;
                left: auto;
            }
        }
    }
    .el-dropdown-menu.askquestion{
       width: calc(50% - 50px);
   }
</style>