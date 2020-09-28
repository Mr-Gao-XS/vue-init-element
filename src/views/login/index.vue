<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-name">高先生的猫</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入任意用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入任意密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录
          localStorage.token = '2f7a4b1664cdd3481b7fbc4b374d9c5a7'
          this.$router.push('/')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 400px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
}
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.login-name {
  color: #409eff;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
}
.login-btn {
  width: 100%;
}
</style>
