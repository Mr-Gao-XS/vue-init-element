<template>
  <div id="layout-header">
    <div class="header-left">
      <div>高先生的猫</div>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="user-name">Echo</span>
          <el-avatar size="small" :src="circleUrl"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="out">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-header',
  components: {},
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  methods: {
    out() {
      console.log(2)
      localStorage.token = ''
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
#layout-header {
  display: flex;
  justify-content: space-between;
  .header-left {
    height: 60px;
    width: 200px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  .header-right {
    display: flex;
    align-items: center;
    padding-right: 20px;
    cursor: pointer;
    .user-name {
      font-size: 14px;
      color: #fff;
      margin-right: 10px;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
