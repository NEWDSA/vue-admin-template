import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import { getAction } from '@/api/manger'
import '@/icons' // icon
import '@/permission' // permission control

var dictData = {}
var dictItem = {}
var dictCodeMap = new Map();

//获取数据字典
async function getDictInfo() {

  let params = {
    url: "DictList"
  }
  await getAction(params).then((res) => {
    const itemInfo = async function () {
      if (res.success && res.data != null) {
        var dictList = res.data //字典表
        params = {
          url: "dict_item"
        }
        await getAction(params).then((res2) => {
          window.localStorage.removeItem("dictData")
          if (res2.success && res2.data != null) {
            var dictItemList = res2.data
            for (let dkey in dictList) {
              if (!dictCodeMap.get(dictList[dkey].code)) { // employee //表编码
                var arr = []
                arr.push(dictList[dkey].col_code) // name //字段编码
                dictCodeMap.set(dictList[dkey].code, arr)
              } else {

                var arr = dictCodeMap.get(dictList[dkey].code)
                arr.push(dictList[dkey].col_code)
                dictCodeMap.set(dictList[dkey].code, arr)
              }
              //设置二级编码
              var dictItemArr = []
              for (let dikey in dictItemList) {
                if (parseInt(dictList[dkey].id) === parseInt(dictItemList[dikey].dict_id)) {
                  //设置二级编码下的子字典内�
                  dictItemArr.push(dictItemList[dikey])
                }
              }
              dictItem[dictList[dkey].code + "_" + dictList[dkey].col_code] = dictItemArr
            }

            //map�??象才能转json字�?�
            let dictObj = {}
            for (let [k, v] of dictCodeMap) {
              dictObj[k] = v;
            }
            dictData.dict = dictObj
            dictData.dictItem = dictItem
            window.localStorage.setItem("dictData", JSON.stringify(dictData))
          }

        })
      }
    }
    itemInfo()
  })
}

getDictInfo()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
