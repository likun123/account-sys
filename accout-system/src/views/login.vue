<template>
    <div class="login-wrap">
        <div class="login">
            <h1>账号管理系统</h1>
            <el-form :model="loginForm" status-icon label-width="60px" :rules="loginRules" ref="loginForm">
                <el-form-item label="账号" prop="name">
                    <el-input name="name" v-model="loginForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input @keyup.enter.native="login('loginForm')" name="password" type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
            </el-form>
        </div> 
    </div> 
</template>
<script>
import { login } from "@/api/api";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      loginRules: {
        name: [
          {
            required: true,
            message: "请输入账户名称",
            trigger: "blur"
          },
          {
            mix: 1,
            max: 20,
            message: "长度在x到20个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入账户密码",
            trigger: "blur"
          },
          {
            mix: 1,
            max: 20,
            message: "长度在x到20个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          this.$http
            .post(login, {
              name: _this.loginForm.name,
              password: _this.loginForm.password
            })
            .then(res => {
              if (res.data.code === "0000") {
                //login success
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.data))
                //设置当前时间戳
                localStorage.setItem('loginTime',Date.parse(new Date()));
                _this.$store.commit('TOKENCHECK');
                _this.$store.commit('USERINFO');
                _this.$router.push({ name: "hospitalsAllContent"});
              } else {
                //login error
                alert("登录失败,请检查账号密码是否正确!");
              }
            })
            .catch(res => {
              return res
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
}
.login {
  width: 400px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
}
.mb15 {
  margin-bottom: 15px;
}
.mb30 {
  margin-bottom: 30px;
}
</style>
