<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- <el-button type="success"
               @click="showPost">新增图库</el-button> -->
    <el-table :data="tableData">
      <el-table-column label="图片"
                       width="auto">
        <template slot-scope="scope"><img style="width: 100px; height: 100px"
               :src="scope.row.text"
               fit="fill" />
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showPut(scope.row.id)">修改</el-dropdown-item>
              <!-- <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id)">删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!--  新增区  -->
    <el-dialog title="列表"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="postForm.text"
                 fit="fill" />
          </template>

          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_banner"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis(postForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
    <!--  修改区  -->
    <el-dialog title="列表"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <!-- <el-form-item label="id:">
          <el-input v-model="putForm.id"
                    style="width: auto;"
                    type="text"
                    :disabled="true" />
        </el-form-item> -->
        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="putForm.text"
                 fit="fill" />
          </template>
          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_put"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis(putForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { getOtherLists, putOther, postOther, delOther } from "@/api/other";
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
      postView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      type: 9,
      status: null,
      fileList: [],
      putView: false,
      postForm: {
        type: 9,
        text: null
      },
      putForm: {
        id: null,
        type: 9,
        text: null
      }
    }
  },

  mounted () {
    this.getOtherList()
  },

  methods: {
    getOtherList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: this.type
      }
      getOtherLists(query).then(res => {
        console.log('获取到的首页logo', res)
        this.tableData = res.data
      })
    },
    // 删除首页logo
    // deleteThis (id) {
    //   this.$confirm('是否确认删除', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     delOther(id).then(res => {
    //       if (res.code === '200') {
    //         this.$message({
    //           type: 'success',
    //           message: '操作成功!'
    //         })
    //         this.getOtherList()
    //       } else {
    //         this.$message({
    //           type: 'warning',
    //           message: '操作失败'
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },
    //新增相关
    // showPost () {
    //   this.postView = true
    //   this.postForm.type = 9
    //   this.postForm.text = null
    // },
    // postThis (data) {
    //   postOther(data).then(res => {
    //     this.$message({
    //       type: 'success',
    //       message: '新增成功!'
    //     })
    //     this.postView = false
    //     this.getOtherList()
    //   }).catch(() => {
    //     this.$message({
    //       type: 'warning',
    //       message: '新增失败'
    //     })
    //   })

    // },
    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm.text = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },
    //修改相关
    showPut (id) {
      var thisBean = {}
      for (var i = 0; i < this.tableData.length; i++) {
        if (id === this.tableData[i].id) {
          thisBean = this.tableData[i]
          break
        }
      }
      this.putView = true
      this.putForm.id = thisBean.id
      this.putForm.text = thisBean.text
    },
    putThis (data) {
      putOther(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getOtherList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    upload_success_put (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.putForm.text = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
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
</style>
