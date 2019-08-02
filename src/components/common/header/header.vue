<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#3D63D8"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div class="_logo_box">
                <div class="_logo"></div>
                <div class="_tips"></div>
            </div>
            <el-menu-item index="1">视频会议</el-menu-item>
            <el-menu-item index="3">会议回放</el-menu-item>
            <el-submenu index="2">
                <template slot="title">用户管理</template>
                <el-menu-item index="2-1">用户管理</el-menu-item>
                <el-menu-item index="2-2">用户审核</el-menu-item>
            </el-submenu>
            <div class="_quit_box">
                <i @click="quitLogin"></i>
            </div>
            <div class="_msg_box">
                <i :class="isMsg?'isMsg':''" @click="showMsgList"></i>
            </div>
            <el-submenu index="4" style="float:right;">
                <template slot="title"><span style="color:#fff;">管理员小浩</span></template>
                <el-menu-item index="4-1">修改密码</el-menu-item>
            </el-submenu>
            <div class="_hy">欢迎回来！</div>
            <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
        <ul class="msg_text_box" v-if="isShowMsg">
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
            <li>您有一条<span style="color:#3D63D8;">「待审核」</span>的用户消息<span style="color:#c3c3c3;font-size:12px;margin-left:6px;">今日 10:30</span></li>
        </ul>
        <el-dialog title="修改密码" width="30%" :visible.sync="dialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isMsg:true,
            isShowMsg:false,
            dialogFormVisible: false,
            form: {
                name: ''
            },
            formLabelWidth: '120px'
        };
    },
    props:{
        activeIndex:{
            type:String,
            required:true,
            default:'1'
        }  
    },
    methods: {
        showMsgList() {
            if(!this.isMsg && !this.isShowMsg) {
                return this.$message({
                    type:'warning',
                    message:'暂无未读消息~',
                    duration:2000
                })
            }
            if(!this.isMsg) {
                this.isShowMsg = false;
                return;
            };
            this.isShowMsg = true;
            this.isMsg = false;

        },
        quitLogin() {
            this.$confirm('确定要退出系统登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$router.push('login');
                }).catch(() => {
                             
                });
        },
        handleSelect(key) {
            console.log(key);
            switch (key) {
                case '1'://视频会议
                    this.$router.push('/playing')
                    break;
                case '3'://会议回放
                    this.$router.push('/playback')
                    break;
                case '2-1'://用户管理
                    this.$router.push('userManegement')
                    break;
                case '2-2'://用户审核
                    this.$router.push('userAudit')
                    break;
                case '4-1'://修改密码
                    this.dialogFormVisible = true;
                    break;
                default:
                    break;
            }

        }
    }
}
</script>
<style lang="less">
    .msg_text_box {
        width: 260px;
        max-height: 400px;
        background: #fff;
        border-radius: 5px;
        // border:1px solid;
        padding: 10px;
        color: #606266;
        font-size: 12px;
        position: absolute;
        top: 60px;
        right: 50px;
        z-index: 99999;
        li {
            line-height: 30px;
            height: 30px;
            border-bottom: 1px solid #EDEFF2;
        }
    }
    ._msg_box,._quit_box {
        width: 60px;
        height: 60px;
        float: right;
        position: relative;
        cursor: pointer;
        i {
            width: 40px;
            height: 40px;
            background: url('~@/assets/images/header/message.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            left: 0;
        }
    }
    ._msg_box {
        i.isMsg {
            &:after {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                content:"";
                position: absolute;
                background-color: #F4574B;
                right: 10px;
                top: 5px;
            }
        }
    }
    ._quit_box {
        margin-right: 26px;
        i {
            background: url('~@/assets/images/header/quit.png') no-repeat;
            background-size: 100% 100%;
        }
    }
    ._hy {
        height: 60px;
        line-height: 64px;
        position: relative;
        float: right;
        font-weight: normal;
        color: #BAC9F7;
        font-size: 14px;
    }
    ._logo_box {
        width: 373.2px;
        height: 60px;
        float: left;
        position: relative;
        margin-right: 60px;
        ._logo {
            width: 273.2px;
            height: 40px;
            background: url('~@/assets/images/login/logo.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 40px;
            top: 10px;
        }
        ._tips {
            width: 1px;
            height: 40px;
            position: absolute;
            right: 0;
            top: 10px;
            background-color: #F5F7FA;
            opacity: 0.1;
        }
    }
</style>
