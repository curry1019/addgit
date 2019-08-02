<template>
    <div class="login_box">
        <div class="login_logo"></div>
        <div class="reset_box">
            <h3>重置密码</h3>
            <router-link to="login"><i></i></router-link>
            <el-form ref="AccountFrom" :model="account" :rules="rules" class="inp_box">
                <el-form-item prop="username">
                    <el-input type="text" class="_inp" v-model="account.username" auto-complete="off" placeholder="手机号">
                        <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="text" class="_inp" style="width:64%;margin-right:6px;" v-model="account.pwd" auto-complete="off" placeholder="验证码">
                        <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                    </el-input>
                    <el-button type="primary" plain>发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input type="password" class="_inp" v-model="account.username" auto-complete="off" placeholder="新密码" show-password>
                        <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" class="_inp" v-model="account.pwd" auto-complete="off" placeholder="确认新密码" show-password>
                        <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                    </el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                    <span class="reset_password">忘记密码？</span>
                </el-form-item> -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" class="_btn" style="width:100%;" @click.native.prevent="handleLogin">完成</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <span class="_c">还没有账号？<span class="_b">立即注册</span></span>
                </el-form-item> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import Base from '@/base/base.vue'
import {login} from '@/axios/service/resetPwd'
export default Base.extend({
    data() {
        return {
            account: {
                newPwd: "123",
                oldPwd: "1234"
            },
            rules: {
                username: [
                { required: true, message: "请输入账号", trigger: "blur" }
                //{ validator: validaePass }
                ],
                pwd: [
                { required: true, message: "请输入密码", trigger: "blur" }
                //{ validator: validaePass2 }
                ]
            },
            checked: true
        }
    },
    methods: {
        handleLogin() {
            if(!this.checked) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            } else {
                localStorage.setItem('username',this.account.username);
                localStorage.setItem('password',this.account.pwd);
            }
        },
        login: function() {
           login(this.account)
            .then((res)=>{
                // this.$store.dispatch('changeLoginState');
                this.$message({
                    message: res.data,
                    type: 'success'
                });
                // this.$router.push('/shop/order');
            }).catch((err)=>{
                this.$message.error(err);
            });
        }
    },
    mounted() {
        // let _u = localStorage.getItem('username');
        // let _p = localStorage.getItem('password');
        // if(_u != '' && _u != 'undefined' && _p != '' && _p != 'undefined') {
        //     this.account.username = _u;
        //     this.account.pwd = _p;
        // }
        this.login();
    },
})
</script>
<style lang="less" scoped>
    .login_box {
        width: 100vw;
        height: 100vh;
        min-width: 1200px;
        background: url('~@/assets/images/resetPwd/reset_bg.png')no-repeat;
        background-size: 100% 100%;
        min-height: 675px;
        position: relative;
    }
    .login_logo {
        width: 444px;
        height: 65px;
        position: absolute;
        left: 29px;
        top: 31px;
        background: url('~@/assets/images/login/logo.png') no-repeat;
        background-size: 100% 100%;
    }
    .reset_box {
        width: 500px;
        height: 666px;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 8px;
        background-color: #fff;
        transform: translate(-50%,-50%);
        h3 {
            color: #333333;
            font-size: 28px;
            position: absolute;
            left: 40px;
            top: 60px;
        }
        i {
            position: absolute;
            right: 28px;
            top: 55px;
            width: 40px;
            height: 40px;
            background: url('~@/assets/images/resetPwd/btn_close.png') no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
    .inp_box {
        width: 68%;
        // height: 20.83333vw;
        position: absolute;
        left: 16.4%;
        top: 30.02%;
        ._btn {
            margin-top: 5%;
            width: 100%;
            background-color: #4D69F6;
            border-color: #4D69F6;
        }
        .reset_password {
            float: right;
            color:#909399;
            font-size: 14px;
            cursor: pointer;
        }
        ._c {
            color: #909399;
            font-size: 14px;
        }
        ._b {
            color: #3D63D8;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>

