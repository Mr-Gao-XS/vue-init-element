<template>
  <div class="gz-pagination">
    <el-pagination
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'gz-pagination',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  destroyed() {},
}
</script>

<style lang="scss" scoped>
.gz-pagination {
  margin-top: 20px;
  text-align: right;
  margin-bottom: 10px;
}
</style>
