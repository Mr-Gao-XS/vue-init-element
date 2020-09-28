<template>
  <div class="home layout-flex">
    <!-- 面包屑 -->
    <gzBreadcrumb />

    <!-- 搜索框 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input
          v-model="formInline.user"
          size="small"
          placeholder="审批人"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          v-model="formInline.region"
          size="small"
          placeholder="活动区域"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表单 -->
    <div class="layout-table">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <gzPagination />
  </div>
</template>

<script>
import gzBreadcrumb from '@/components/gz-breadcrumb'
import gzPagination from '@/components/gz-pagination'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: { gzBreadcrumb, gzPagination },
  mixins: [],
  provide() {
    return {}
  },
  data() {
    return {
      tabs: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  computed: {
    ...mapState(['name']),
  },
  watch: {},
  methods: {
    // 使用api
    async getTabs() {
      try {
        this.tabs = await this.$get('/tabs')
        console.log(this.tabs, '获取数据成功了')
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getTabs()
  },
  mounted() {},
  destroyed() {},
}
</script>

<style lang="scss" scoped>
.home {
  .name {
    // @include flex-center;
    height: 100px;
    margin: 0 auto;
  }
}

// 用户片段 scss.json 请添加  直接r即可提示
//   "rem": {
//     "prefix": "r",
//     "body": ["rem($1)"],
//     "description": "rem"
//   }
</style>
