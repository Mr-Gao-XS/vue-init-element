<template>
  <div class="page-404">
    <div class="page-404-container">
      <div class="page-404-content">
        <h1>404</h1>
        <p>抱歉，你访问的页面不存在</p>
        <el-button type="primary" @click.native="toIndex">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    toIndex() {
      this.$router.push('/index')
    },
  },
}
</script>

<style lang="scss" scoped>
.page-404 {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f7f9;
  h1 {
    margin-bottom: 24px;
    color: #515a6e;
    font-weight: 600;
    font-size: 72px;
    line-height: 72px;
  }
  p {
    margin-bottom: 16px;
    color: #808695;
    font-size: 20px;
    line-height: 28px;
  }
  .page-404-container {
    margin-top: 100px;
    height: 500px;
    img {
      width: 400px;
    }
    .page-404-content {
      margin-left: 140px;
    }
  }
}
</style>
