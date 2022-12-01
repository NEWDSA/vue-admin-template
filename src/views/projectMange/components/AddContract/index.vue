<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <template slot="title">
        <h4>{{ dialogTitle }}</h4>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" style="width: 700px; margin: 0 auto"
        :rules="flag === 'detial' || flag === 'approval' ? [] : rules" :disabled="goDetailPage" label-width="100px"
        @submit.prevent>
        <el-form-item label="项目名称：" prop="projectName">
          <el-input v-model="ruleForm.projectName" class="poninter-input" :placeholder="goDetailPage ? '' : '请输入项目名称'"
            @click="projectVisible = true" />
        </el-form-item>
        <el-form-item label="标段名称：" prop="name">
          <el-input v-model="ruleForm.name" :placeholder="goDetailPage ? '' : '请输入标段名称'" />
        </el-form-item>
        <el-form-item label="施工单位：" prop="constructionUnitName">
          <el-input v-model="ruleForm.constructionUnitName" :placeholder="goDetailPage ? '' : '请选择施工单位'"
            class="poninter-input" readonly @click="handleSaveUnit(1)" />
        </el-form-item>
        <el-form-item label="监理单位：" prop="monitoringUnitName">
          <el-input v-model="ruleForm.monitoringUnitName" :placeholder="goDetailPage ? '' : '请选择监理单位'"
            class="poninter-input" readonly @click="handleSaveUnit(2)" />
        </el-form-item>
        <el-form-item label="设计单位：" prop="designUnitName">
          <el-input v-model="ruleForm.designUnitName" :placeholder="goDetailPage ? '' : '请选择设计单位'"
            class="poninter-input" readonly @click="handleSaveUnit(3)" />
        </el-form-item>
        <el-form-item label="总包单位：" prop="overallUnitName">
          <el-input v-model="ruleForm.overallUnitName" :placeholder="goDetailPage ? '' : '请选择总包单位'"
            class="poninter-input" readonly @click="handleSaveUnit(4)" />
        </el-form-item>
        <el-form-item label="备注：" prop="remarks">
          <el-input v-model="ruleForm.remarks" type="textarea" :placeholder="goDetailPage ? '' : '请输入备注'" />
        </el-form-item>
        <!-- <el-form-item label="添加附件：">
          <upload-file v-if="flag !== 'detial'" :file-list="ruleForm.fileList" :is-disabled="flag === 'detial'"
            @close-dialog="handleFile($event, 'fileIds')"
            @handle-remove-file="handleRemoveFile($event, 'fileIds')"></upload-file>
          <template v-else>
            <div v-for="(it, idx) in ruleForm.fileList" :key="idx" class="p-page-detail">
              <span>{{ useNameFormat(it['originalFileName']) }}:</span>
              <div>
                <el-form label-width="100px">
                  <el-form-item>
                    <el-button type="primary" @click="handleFileList(it['originalFileName'], it['id'], it)">
                      预览
                    </el-button>
                    <el-button type="primary">
                      <a :href="`${pageUrl + '/file' + it['url']}`" style="text-decoration: none">下载</a>
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </template>
        </el-form-item> -->

        <!-- <template v-if="flag !== 'detail'">
          <div>
            <span id="custom" class="Dot"></span>
            审批人
          </div>
          <el-divider />
          <el-form-item style="width: 100%" class="el-item-approval-style">
            <approval-template v-if="Object.keys(approvalData).length !== 0 || flag === 'add'"
              :approval-data="approvalData" :approval-type="2" @handle-approval="handleApproval"></approval-template>
          </el-form-item>
        </template> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateIndex',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '我'
    },
    flag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      goDetailPage:"",
      name:{
        bidSectionName:""
      },
      bidSectionName:{},
      remarks:"",
      projectName:"",
      constructionUnitName:"",
      monitoringUnitName:"",
      designUnitName:"",
      overallUnitName:"",
      rules: {
        name: [
          { required: true, message: '请输入标段名称', trigger: 'blur' },
          { min: 1, max: 32, message: '请输入1-32位的字符', trigger: 'blur' },

        ],
        remarks: [{ min: 1, max: 300, message: '请输入1-300位的字符', trigger: 'blur' }],
        projectName: [{ required: true, message: '请选择项目', trigger: 'change' }],
        constructionUnitName: [{ required: true, message: '请选择施工单位', trigger: ['change', 'blur'] }],
        monitoringUnitName: [{ required: true, message: '请选择监理单位', trigger: ['change', 'blur'] }],
        designUnitName: [{ required: true, message: '请选择设计单位', trigger: ['change', 'blur'] }],
        overallUnitName: [{ required: true, message: '请选择总包单位', trigger: ['change', 'blur'] }]
      },
      pageUrl: "",
      approvalData: {},
      ruleForm: {
        level: 0,
        companySelectArr: [],
        fileList: [], //附件
        fileIds: '',
        name: '',
        projectDetail: '',
        id: '',
        //项目
        projectId: '',
        projectName: '',
        // 施工单位
        constructionUnitId: '',
        constructionUnitName: '',
        // 监理单位
        monitoringUnitId: '',
        monitoringUnitName: '',
        // 设计单位
        designUnitId: '',
        designUnitName: '',
        // 总包单位
        overallUnitId: '',
        overallUnitName: '',
        version: '0',
        //审批
        approvalDetailDefinition: {
          ccPersonIdList: '',
          name: '',
          type: ''
        },
        approvalUsers: [],
        remarks: ''
      }
    };
  },

  mounted() {

  },

  methods: {
    handleClose(done) {
      this.$emit('submit', false)
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => { });
    },
    handleSaveUnit(val) {

    },
    handleFile(res, str) {

    },
    handleFileList(file, url, obj) {

    },
    handleRemoveFile(res, str) {

    },
    handleApproval(){

    }

  },
};
</script>

<style lang="scss" scoped>

</style>
