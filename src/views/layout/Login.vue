<template>
  <div class="login">
    <!-- 表单 -->
    <a-form-model
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>


<script>
import api from "@/api/user";
export default {
  data() {
    //   邮箱的格式
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error("邮箱格式不正确"));
    };

    // 密码格式
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      // 登录的表单信息
      loginForm: {
        email: "",
        password: ""
      },
      //   检验规则
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    //   表单提交

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单提交
        if (valid) {
          this.$router.push({
            name: "Home"
          });
        }

        // 表单提交
        // if (valid) {
        //   api
        //     .login(this.loginForm)
        //     .then(res => {
        //       console.log(res);
        //       //   this.$store.dispatch('setUserInfo', res);
        //       //   登录成功后跳转到home页面
        //       this.$router.push({
        //         name: "Home"
        //       });
        //     })
        //     .catch(error => {
        //       this.$message.error(error);
        //     });
        //   return true;
        // }
        // console.log("error submit!!");
        // return false;
      });
    },

    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>



<style lang="less">
@import url("~@/assets/css/login.less");
</style>