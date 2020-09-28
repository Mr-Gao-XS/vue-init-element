import fp from 'lodash/fp'

export default {
  data() {
    return {
      // 查询条件
      tableMixin_query: {
        // 当前第几页
        page: 1,
        // 每页好多条,
        row: 10,
        // 后端排序的字段
        sort_field: '',
        // 后端字段升序还是降序
        sort_dir: '',
        // 模糊查询字段
        fuzzy: ''
      },
      // 选择
      tableMixin_selection: [],
      // 表格列的配置
      tableMixin_columns: [],
      // 表格展示的数据
      tableMixin_tableData: [],
      // 表格的分页列表数据
      tableMixin_pageSizes: [10, 20, 30, 40],
      // 列表总共有好多数据
      tableMixin_total: 0,
      // 是否是初次请求数据,初次请求不用去抖搜索等
      tableMixin_isFirstGetting: true,
      // 是否正在请求表格数据
      tableMixin_isLoading: false,
      // 增删查改loading的text
      tableMixin_loadingText: {
        // 刷新中的提示
        get: '正在加载表格数据',
        // 删除中的提示
        del: '正在删除',
        // 删除前的确认提示
        delConfirmText: '确认删除吗？'
      },

      // 选中
      tableMixin_row: {}
    }
  },
  computed: {
    // 根据表单状态显示的表单标题
    tableMixin__cFormTitle() {
      let title = ''
      if (this.tableMixin__formStatus === 'add') {
        title = `新建${this.tableMixin__formTitle}`
      } else if (this.tableMixin__formStatus === 'edit') {
        title = `修改${this.tableMixin__formTitle}`
      } else if (this.tableMixin__formStatus === 'details') {
        title = `查看${this.tableMixin__formTitle}`
      } else if (this.tableMixin__formStatus === 'package') {
        title = '渠道包'
      }
      return title
    }
  },
  watch: {
    // 监听查询条件改变,改变时刷新表格数据
    tableMixin_query: {
      handler() {
        if (this.tableMixin_isFirstGetting) {
          this.tableMixin_isFirstGetting = false
          this.tableMixin_getTableData()
        } else {
          this.tableMixin_debounceGetTableData()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * 新增表格数据的接口
     * @returns {Promise}
     */
    tableMixin_api_addTableItem() {
      throw new Error('必须在组件中实现 tableMixin_api_addTableItem')
    },
    /**
     * 请求表格数据的接口方法
     * @returns {Promise}
     */
    tableMixin_api_getTableData() {
      throw new Error('必须在组件中实现 tableMixin_api_getTableData')
    },
    /**
     * 删除表格数据的接口方法
     * @returns {Promise}
     */
    tableMixin_api_delTableItem() {
      throw new Error('必须在组件中实现 tableMixin_api_getTableData')
    },
    // 去抖的请求表格数据的方法
    tableMixin_debounceGetTableData: fp.debounce(400, function () {
      this.tableMixin_getTableData()
    }),
    tableMixin_getTableData_success() {
      throw new Error('必须在组件中实现 formMixin_api_up')
    },
    // 请求表格数据的方法
    async tableMixin_getTableData() {
      // 正在请求数据就不再请求
      if (this.tableMixin_isLoading) return
      this.tableMixin_isLoading = true
      try {
        let res = await this.tableMixin_api_getTableData(this.tableMixin_query)

        // 返回结果校验
        if (!fp.isNumber(fp.get(this.tableMixin_resPath.count, res) || 0)) {
          throw new Error('tableMixin_api_getTableData返回结果中res.count必须为number类型')
        }
        if (!fp.isArray(fp.get(this.tableMixin_resPath.data, res) || [])) {
          throw new Error('tableMixin_api_getTableData返回结果的res.aaData必须为array类型')
        }
        this.tableMixin_tableData = fp.get(this.tableMixin_resPath.data, res) || []

        this.tableMixin_total = fp.get(this.tableMixin_resPath.count, res) || 0
        if (this.tableMixin_query.page > 1 && this.tableMixin_tableData.length === 0) {
          //   this.tableMixin_query.page -= 1
          let totabl_page = 0
          if (
            this.tableMixin_total / this.tableMixin_query.row >
            parseInt(this.tableMixin_total / this.tableMixin_query.row)
          ) {
            totabl_page = parseInt(this.tableMixin_total / this.tableMixin_query.row) + 1
          } else {
            totabl_page = parseInt(this.tableMixin_total / this.tableMixin_query.row)
          }
          if (totabl_page < this.tableMixin_query.page) {
            this.tableMixin_query.page = totabl_page
          }
        }
        // 请求成功需要执行的事件(一般用不着)
        this.tableMixin_getTableData_success(res)
      } catch (error) {
        // this.$utils.fetchCatch(error);
      } finally {
        this.tableMixin_isLoading = false
      }
    },
    // 删除表格数据的方法
    tableMixin_delTableItem({ id, info = '删除成功!' }) {
      const self = this

    }
  },
  // 表格切换每页条数时的回调
  handlePageSizeChange(pageSize) {
    this.tableMixin_query.row = pageSize
  },
  handlePageChange(page) {
    this.tableMixin_query.page = page
  },
  // 表格自定义排序事件
  tableMixin__sortChange({ prop, order }) {
    this.tableMixin_query.sort_field = prop
    if (order === 'ascending') {
      this.tableMixin_query.sort_dir = 'asc'
    } else if (order === 'descending') {
      this.tableMixin_query.sort_dir = 'desc'
    } else {
      this.tableMixin_query.sort_dir = ''
    }
  },
  // 新增信息,打开主表单的方法
  tableMixin_openAddForm() {
    this.tableMixin__formStatus = 'add'
    this.tableMixin_isShowForm = true
  },
  // 修改信息,打开主表单的方法
  tableMixin_openEditForm({ id, status, isAudit }) {
    this.isAccount = status
    this.isAudit = isAudit
    this.tableMixin__formStatus = 'edit'
    this.tableMixin__formId = id
    this.tableMixin_isShowForm = true
  },
  // 查看信息,打开主表单的方法
  tableMixin_openDetailsForm({ id }) {
    this.tableMixin__formStatus = 'details'
    this.tableMixin__formId = id
    this.tableMixin_isShowForm = true
  },
  tableMixin_openConfigPage({ id, title }) {
    this.tableMixin__formStatus = 'config'
    this.tableMixin__formTitle = title
    this.tableMixin__formId = id
  },
  // 修改信息,打开主表单的方法
  tableMixin_openPayForm({ id }) {
    this.tableMixin__formStatus = 'edit'
    this.tableMixin__formId = id
    this.tableMixin_isShowPayForm = true
  },

  tableMixin_openPackage(row) {
    console.log(111)
    this.tableMixin__formStatus = 'package'
    this.tableMixin_isShowForm = true
    this.tableMixin_row = row
  },
  // 主表单保存成功事件
  tableMixin_onFormSubmitSuccess() {
    this.tableMixin_isShowForm = false
    this.tableMixin_getTableData()
  },

  tableMixin_HandleFormClose() {
    this.tableMixin_isShowForm = false
    this.tableMixin_isShowPayForm = false
  },

  tableMixin_selectionChange(val) {
    if (val) {
      this.tableMixin_selection = [...val]
    }
  }
}
}
