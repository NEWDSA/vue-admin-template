<template>
  <div class="app-container">
    <zj-table :buttons="buttons" height="auto" :data="dataSource" :columns="tableConfig.employee.column"
      :pagination="true" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { EagleFramework } from '@/mixins/EagleFramework'
import { objectExpression } from '@babel/types'
import zjTable from '@/components/vue-element-table/src/components/zj-table'
export default {
  mixins: [EagleFramework],
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      name: 'employee',
      data: {},
      url: {
        auto: {
          get: [{
            projectList: 'employee',
            params: {

            },
            before: 'beforeMethod',
            after: 'afterMethod'
          }]
        }
      },
      // 表格的列信息, 数组每一项代表一个字段，可以使用element 列属性的所有属性，以下仅为示例
      // tableConfig: Object.freeze([
      //   {
      //     // 表头显示的文字
      //     label: '姓名',
      //     // 对应数据里面的字段
      //     prop: 'name'
      //   },
      //   {
      //     label: '性别',
      //     prop: 'sex',
      //     // 格式化表格,与element-ui 的表格属性相同
      //     formatter(row, column, cellValue) {
      //       return cellValue === 1 ? '男' : '女'
      //     }
      //   },
      //   {
      //     label: '年龄',
      //     prop: 'age'
      //   }
      // ]),
      tableConfig: {
        employee: {
          columns: [{
            label: '姓名',
            dataIndex: 'text',
            rander: function (text) {

            }
          }, {
            label: '性别',
            dataIndex: 'sex',
            formatter(row, column, cellValue) {
              return cellValue === 1 ? '男' : '女'
            }
          }]
        }
      },
      buttons: Object.freeze([
        {
          // id 必须有而且是在当前按钮数组里面是唯一的
          id: 'add',
          text: '新增',
          type: 'primary',
          icon: 'el-icon-circle-plus',
          click: this.$_handleAdd
        },
        {
          id: 'delete',
          text: '删除',
          // rows 是表格选中的行，如果没有选中行，则禁用删除按钮, disabled可以是一个boolean值或者函数
          disabled: rows => !rows.length,
          click: this.$_handleRemove
        }
      ]),
      ddata: [{
        name: 'ddd',
        sex: 1,
        age: 18
      }],
      list: null,
      listLoading: true
    }
  },
  components: {
    zjTable
  }
}
</script>
