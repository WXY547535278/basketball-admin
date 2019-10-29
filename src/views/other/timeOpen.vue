<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick"
             v-loading="loading">
      <el-tab-pane label="往下派单开关管理"
                   name="3">
        <el-switch style="display: block"
                   v-model="value"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   active-text="开"
                   inactive-text="关"
                   @change="switchOpen()">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane label="往上派单开关管理"
                   name="10">
        <el-switch style="display: block"
                   v-model="value"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   active-text="开"
                   inactive-text="关"
                   @change="switchOpen()">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane label="订单时间设置"
                   name="7">
        <el-input v-model="setText"
                  placeholder="时间设置"
                  style="width:200px"></el-input>
        <el-button type="primary"
                   icon="el-icon-edit"
                   circle
                   @click="putThis"></el-button>
      </el-tab-pane>
      <el-tab-pane label="更新升级人时间设置"
                   name="8">
        <el-input v-model="setText"
                  placeholder="时间设置"
                  style="width:200px"></el-input>
        <el-button type="primary"
                   icon="el-icon-edit"
                   circle
                   @click="putThis"></el-button>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getOtherLists, putOther } from "@/api/other"
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  data () {
    return {
      // upload_url: getRequestUrl() + "upload/picUpload", 
      upload_url: getUploadUrl(), // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      status: null,
      fileList: [],
      putForm: {
        id: null,
        text: null,
        type: 1
      },
      activeName: '3',
      value: true,
      id: null,
      type: 3,
      setText: null,
      loading: false
    }
  },

  mounted () {
    this.getOtherList()
  },

  methods: {
    // 控制订单开关
    switchOpen () {
      if (!this.value) {
        var data = {
          id: this.id,
          text: '0',
          type: this.type
        }
        putOther(data).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '关闭成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '操作失败'
            })
          }
        })
      } else {
        var data1 = {
          id: this.id,
          text: '1',
          type: this.type
        }
        putOther(data1).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '打开成功!'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '操作失败'
            })
          }
        })
      }
    },
    handleClick (tab, event) {
      this.type = tab.name
      console.log('type', tab.name)
      this.getOtherList()
    },
    getOtherList () {
      this.loading = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: this.type
      }
      getOtherLists(query).then(res => {
        console.log('获取到素材', res)
        if (res.data[0].text === '1') {
          this.value = true
        } else {
          this.value = false
        }
        this.setText = res.data[0].text
        this.id = res.data[0].id
        this.loading = false
        console.log('获取到id', this.id)
      })
    },
    putThis () {
      var data = {
        id: this.id,
        text: this.setText,
        type: this.type
      }
      putOther(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.blockpage {
  padding-top: 2%;
}
.blockpage {
  padding-top: 2%;
}
</style>
