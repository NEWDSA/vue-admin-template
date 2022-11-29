import { postAction, getAction, getActionAsync } from '@/api/manger'
import Vue from 'vue'
export const EagleFramework = {
  data() {
    // 数据源
    return {
      dataSource: []
    }
  },
  created() {
    this._loadData()
  },
  methods: {
    // 加载数据
    _loadData(arg, url) {
      if (!this.url || !this.url.auto) {

        // this.$message.error("请设置url.属性!")
        if (!url) {
          return
        }
      }
      // 字典字段替换
      this.dictReplaceColumn();
      // 判断是get 还是post
      if (this.url.auto.get || this.url.auto.get.length > 1) {
        this.url.auto.get.forEach((item) => {
          Object.keys(item).map((it) => {
            if (it.includes("List")) {
              let params = {
                url: '' + item[it],
                method: 'get',
                params: {

                }
              }
              getAction(params).then((res) => {
                this.dataSource = res.data
              })
            }
          })
        })
      }
    },
    // 字典字段替换
    dictReplaceColumn() {
      if (!this.tableConfig) {
        return
      }
      if (!this.data) {
        return;
      }
      var dictData = JSON.parse(window.localStorage.getItem("dictData"));
      if (!dictData) {
        console.info("数据字典初始化失败");
        return;
      }
      var name = this.name;
      for (let tableName in this.tableConfig) {
        console.log(tableName, '...tableName...')
        var dictSecCodeData = dictData.dict[tableName];
        console.log(dictSecCodeData, '...dictSecCodeData...')
        if (!dictSecCodeData) {
          continue;
        }
        for (let key in dictSecCodeData) {
          console.log(key, '...key...')
          let fullKey = tableName + "_" + dictSecCodeData[key];
          console.log(fullKey, '..fullkey..')
          let columnDict = dictData.dictItem[fullKey];
          console.log(columnDict, '...columnDict...')
          this.data[dictSecCodeData[key]] = columnDict;
          console.log(this.data[dictSecCodeData[key]], '...this.data...')
        }
        let columns = this.tableConfig[name].columns;
        for (let cKey in columns) {
          if (columns[cKey].dataIndex === "action") {
            continue;
          }
          let fullKey = 'employee_name'
          let columnDict = dictData.dictItem[fullKey];
          console.log(columnDict, '...columnDict...')
          // if (!columnDict || !Array.isArray(columnDict)) {
          //   continue;
          // }
          for (var dictKey in columnDict) {
            console.log(columnDict[dictKey], '...columnDict...2');
          }
          columns[cKey].render = function (text) {
            console.log(text,'...text..')
            for (var dictKey in columnDict) {
              if (
                dd + "" === columnDict[dictKey].value + ""
              ) {
                console.log(columnDict[dictKey].text, 'itemText')
                return columnDict[dictKey].text;
              }
            }

            // for (var dictKey in columnDict) {
            //   if (
            //     text + "" === columnDict[dictKey].itemValue + ""
            //   ) {
            //     return columnDict[dictKey].itemText;
            //   }
            // }
          };
        }
      }

    },
    $_handleAdd() {
      this.$alert('点击了新增按钮')
    },
    $_handleRemove() {
      const ids = rows.map(({ id }) => id)
      this.$alert(`要删除的行id为${ids.join(',')}`)
    }
  }
}
