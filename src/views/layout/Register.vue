<template>
  <div class="login">
    <!-- 表单 -->
    <a-form-model
      class="login-form"
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="registerForm.username" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="registerForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="registerForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="registerForm.code" />
        <a-button type="primary" @click="getCode(registerForm.email)">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item has-feedback label="角色" prop="role">
        <a-radio-group v-model="registerForm.role">
          <a-radio value="1">
            customer
          </a-radio>
          <a-radio value="2">
            admin
          </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('registerForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('registerForm')">
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
      registerForm: {
        username: "",
        email: "",
        password: "",
        code: "",
        role: ""
      },
      //   检验规则
      rules: {
        email: [{ validator: checkEmail, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    // 获取验证码
    getCode(email) {
      api.getCode(this.registerForm.email).then(res => {
        console.log(res);
      });
    },
    //   表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .login(this.loginForm)
            .then(res => {
              console.log(res);
              //   登录成功后跳转到home页面
              this.$router.push({
                name: "Login"
              });
            })
            .catch(error => {
              this.$message.error(error);
            });
          return true;
        }
        console.log("error submit!!");
        return false;
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