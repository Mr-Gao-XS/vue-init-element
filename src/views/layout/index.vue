<template>
  <div id="layout">
    <el-container class="layout-container">
      <el-header>
        <headerNav />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sideMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerNav from './components/header-nav'
import sideMenu from './components/side-menu'

export default {
  name: 'layout',
  components: { headerNav, sideMenu },
}
</script>

<style lang="scss">
#layout {
  height: 100%;
  .layout-container {
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: #444c54;
    color: #333;
    padding: 0;
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
  }

  .el-main {
    background-color: #fff;
    color: #333;
  }
  .layout-flex {
    height: 100%;
    display: flex;
    flex-direction: column;
    .layout-table {
      flex: 1;
    }
  }
  .el-form {
    text-align: right;
  }
}
</style>
