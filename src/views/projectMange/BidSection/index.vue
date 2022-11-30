
<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.name" :name="item.code"></el-tab-pane>
    </el-tabs>
    <div class="rowSS mb P-search-box">
      <el-form ref="refsearchForm" :inline="true">
        <el-form-item label="项目名称:" prop="status" label-position="left">
          <el-input v-model="searchForm.projectName" class="widthPx-220" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="标段名称:" prop="status" label-position="left">
          <el-input v-model="searchForm.bidSectionName" class="widthPx-220" placeholder="请输入标段名称" />
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="status" label-position="left">
          <!--查询按钮-->
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <zj-table ref="table" :buttons="buttons" height="auto" @page-change="$_handlePageChange"
      :current-page.sync="pageNumber" :page-size.sync="pageSize" :total="total" :data="data" :columns="columns"
      :pagination="true">
      <template #column="scope">
        <template v-if="scope.prop === 'status'">
          <el-tag v-if="scope.row.status == `-1`" type="info">已驳回</el-tag>
          <el-tag v-if="scope.row.status == `0`" type="danger">待提交</el-tag>
          <el-tag v-if="scope.row.status == `1`" type="">审批中</el-tag>
          <el-tag v-if="scope.row.status == `2`" type="warning">进行中</el-tag>
          <el-tag v-if="scope.row.status == `3`" type="success">完结</el-tag>
        </template>
      </template>
    </zj-table>
  </div>
</template>

<script>
import zjTable from '@/components/vue-element-table/src/components/zj-table'
// import AddContract from '../components/AddContract'
import { getProject } from '@/api/projectMange'
import { async } from 'q';
export default {
  name: 'VueAdminTemplateIndex',
  data() {
    return {
      isSelect:false,
      searchForm: {
      },
      dialogTitle: "",
      dialogVisible: false,
      pageNumber: 1,
      pageSize: 10,
      data: [],
      total: 0,
      activeName: '99',
      tabList: [
        {
          code: '99',
          name: '全部'
        },
        {
          code: '0',
          name: '待提交'
        },
        {
          code: '1',
          name: '审批中'
        },

        {
          code: '2',
          name: '进行中'
        },
        {
          code: '3',
          name: '完结'
        }
      ],
      columns: Object.freeze([
        {
          label: '审批进度', prop: 'status',
          useSlot: true
        },
        {
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '标段名称',
          prop: 'name'
        }, {
          label: '施工单位',
          prop: 'constructionUnitName'
        }, {
          label: '监理单位',
          prop: 'monitoringUnitName'
        }, {
          label: '设计单位',
          prop: 'designUnitName'
        }, {
          label: '总包单位',
          prop: 'overallUnitName'
        }, {
          label: '创建时间',
          prop: 'createDateTime'
        },
        {
          width:180,
          label:'操作',
          actions:[
            {
              id:'edit',
              text:'提交',
              click:this.$_handleSubmit
            },{
              id:'update',
              text:'修改',
              click:this.$_hadleChange
            }
          ]
        }
      ]),
      buttons: Object.freeze([
        {
          // id 必须有而且是在当前按钮数组里面是唯一的
          id: 'add',
          text: '新增',
          type: 'primary',
          icon: 'el-icon-circle-plus',
          click: this.$_handleAdd
        }
      ])
    };
  },
  components: {
    zjTable,
    // AddContract
  },
  created() {
    let params = {
      url: '/smartlinks-project-management-serve/bid/section/list',
      params: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        projectName: this.searchForm.projectName,
        bidSectionName: this.searchForm.bidSectionName,
        status: this.activeName == '99' ? '' : this.activeName
      }

    }
    getProject(params).then(res => {
      this.data = res.data
      this.total = Number(res.totalElements)


    })
  },
  methods: {
    // 新增内容
    $_handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = '新建标段'
    },
    $_handlePageChange(val) {
      console.log(val, '...val...')
      this.pageNumber = Number(val.currentPage);
      this.getList()
    },
    handleClick(val) {
      this.pageNumber = val;
      this.getList()
    },
    getList() {
      let params = {
        url: '/smartlinks-project-management-serve/bid/section/list',
        params: {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          projectName: this.searchForm.projectName,
          bidSectionName: this.searchForm.bidSectionName,
          status: this.activeName == '99' ? '' : this.activeName
        }

      }
      getProject(params).then(res => {
        this.data = res.data
        this.total = Number(res.totalElements)


      })
    },
    resetSearch() {
      this.pageNumber = 1;
      this.searchForm.projectName = ''
      this.searchForm.bidSectionName = ''
      this.getList();
    },
    $_handleSubmit(){

    },
    $_hadleChange(){

    }
  },
};
</script>

<style lang="scss" scoped>

</style>
