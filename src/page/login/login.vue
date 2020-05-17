<template>
    <div class='login'>
        <div class='index-main-body'>
            <div class="index-header">
                <h1 class="logo"></h1>
                <h2 class="subtitle">与世界分享你的知识、经验和见解</h2>
            </div>
            <div class="index-tab-navs">
                <div class="navs-slider">
                    <router-link :to="'signup'" :class="{active: !signin}">注册</router-link>
                    <router-link :to="'signin'" :class="{active: signin}">登录</router-link>
                    <span class="navs-slider-bar"></span>
                </div>
            </div>
            <el-form ref="signupForm" :rules="signupRules" :model="form"  key='signupForm' v-if='!signin'>
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder='姓名'></el-input>
                </el-form-item>
                <el-form-item prop="emailPhone">
                    <el-input v-model="form.emailPhone" placeholder='手机号或邮箱'></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type='password' v-model="form.password" placeholder='密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginIn('signupForm')" style='width:100%;'>{{signinfo}}</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="signinForm" :rules="signinRules" :model="userInfo" key='signinForm' v-else>
                <el-form-item prop="emailPhone">
                    <el-input v-model="userInfo.emailPhone" placeholder='手机号或邮箱'></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type='password' v-model="userInfo.password" placeholder='密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginIn('signinForm')" style='width:100%;'>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            var validateEmailPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号或邮箱'));
                }
                else {
                    var regPhone=/1[3,4,5,8]\d{9}/;
                    var regEmail=/^[A-Za-z\d]+[A-Za-z\d-_]*@[A-Za-z\d-_]+(.[A-Za-z\d]{2,4})$/;
                    if (!(regPhone.test(value)||regEmail.test(value))) {
                        callback(new Error('手机号或邮箱格式不正确'));
                    }
                    callback();
                }
            };
            return {
                signupRules: {
                    name: [{
                        required: true,
                        message: '请填写姓名',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }],
                    emailPhone: [{
                        validator: validateEmailPhone,
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        max: 128,
                        message: '请输入 6 到 128 位的密码',
                        trigger: 'blur'
                    }],
                },
                signinRules: {
                    emailPhone: [{
                        required: true,
                        message: '请填写手机号或邮箱',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
                        trigger: 'blur'
                    }],
                },
                signin: true
            }
        },
        methods: {
            loginIn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 登录
                        if (formName==='signinForm') {
                            this.$store.dispatch('signIn', {
                                'context': this
                            });
                        }
                        // 注册
                        else {
                            this.$store.dispatch('signUp', {
                                'context':this
                            });
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
        },
        computed: {
            signinfo() {
                return this.$store.state.signinfo;
            },
            form() {
                return this.$store.state.loginForm;
            },
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        watch: {
            '$route': {
                handler(newVal) {
                    this.signin = newVal.path === '/signin' ? true : false;
                    this.$store.dispatch('changeSignInfo', this.signin ? '登录' : '注册知乎');
                },
                immediate: true
            }
        }
    }
</script>
<style type="less" scoped>
    .login {
        margin-top: 60px;
    }
    .index-main-body {
        margin: auto;
        padding: 30px 0 102px;
        width: 300px;
    }
    @media (min-width: 741px) {
        .index-main-body {
            padding: 0;
            min-height: 590px;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
    .index-header {
        text-align: center;
    }
    .index-header .logo {
        margin: 0 auto;
        width: 160px;
        height: 74px;
        background: url(../../assets/logo.png) no-repeat;
        background-size: contain;
    }
    @media (max-width: 740px) {
        .index-header .logo {
            width: 96px;
            height: 44.4px;
        }
    }
    .index-header .subtitle {
        margin: 30px 0 20px;
        font-weight: 400;
        font-size: 18px;
        line-height: 1;
    }
    .index-tab-navs {
        margin-bottom: 10px;
        font-size: 18px;
        text-align: center;
    }
    .index-tab-navs>.navs-slider{
        display: inline-block;
    }
    .index-tab-navs a {
        float: left;
        color: #555;
        width: 4em;
        line-height: 35px;
        opacity: .7;
        -ms-filter: "alpha(Opacity=70)";
        -webkit-transition: opacity .15s,color .15s;
        transition: opacity .15s,color .15s;
        text-decoration: none;
    }
    .index-tab-navs .active {
        opacity: 1;
        -ms-filter: "alpha(Opacity=100)";
        color: #0f88eb;
    }
</style>