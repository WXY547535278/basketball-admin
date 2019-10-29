<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增公告</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="text.title"
                       label="标题"
                       width="auto"></el-table-column>
      <!-- <el-table-column prop="text.content"
                       :show-overflow-tooltip="true"
                       label="内容"
                       width="800"
                       ></el-table-column> -->
      <el-table-column fixed="right"
                       label="操作"
                       width="auto">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="showPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button> -->
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showPut(scope.row.id)">修改</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!--  新增区  -->
    <el-dialog title="公告"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="text.title"
                    style="width: auto;"
                    type="text"
                    />
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="text.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        >
          </quill-editor>
          <el-upload class="avatar-uploader"
                     ref="upload"
                     :action="upload_url"
                     :on-success="uploadSuccess"
                     :headers="upload_head">
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
        <el-form-item label="标题:">
          <el-input v-model="text.title"
                    style="width: auto;"
                    type="text"/>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="text.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        >
          </quill-editor>
          <el-upload class="avatar-uploader"
                     ref="upload"
                     :action="upload_url"
                     :on-success="uploadSuccess"
                     :headers="upload_head">
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
import { getOtherLists, delOther, putOther, postOther } from "@/api/other"
import { parseTime } from "@/utils/index"
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  data () {
    let container = [
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      // [{ 'size': ['small', false, 'large', 'huge'] }], // 文字大小
      ['image'], // 图片
      [{ 'color': [] }, { 'background': [] }], // 字体颜色
      // [{ 'indent': '-1'}, { 'indent': '+1' }]
      [{ 'header': 1 }, { 'header': 2 }] 
    ]
    return {
      // upload_url: getRequestUrl() + "upload/picUpload", 
      upload_url: getUploadUrl(), // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      postView: false,
      status: null,
      fileList: [],
      putView: false,
      postForm: {
        text: null,
        type: 1
      },
      putForm: {
        id: null,
        text: null,
        type: 1
      },
      text: {
        title: null,
        content: null
      },
      // 富文本框
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: container,
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },

  mounted () {
    this.getOtherList()
  },

  methods: {
    // 富文本框图片上传显示
    uploadSuccess (response, file, fileList) {
      // 清除加载动画条
      this.$refs.upload.clearFiles()
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (file.response.code == 200) {
        console.log('返回的图片地址', file.response.data)
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', file.response.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getOtherList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getOtherList()
    },
    // 搜索
    onSubmit () {
      this.getOtherList()
    },

    getOtherList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: 1
      }
      getOtherLists(query).then(res => {
        console.log('获取到公告', res)
        this.tableData = res.data.map(item => {
          item.text = JSON.parse(item.text)
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },

    // 删除公告
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOther(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getOtherList()
          } else {
            this.$message({
              type: 'warning',
              message: '操作失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增相关
    showPost () {
      this.postView = true
      this.postForm.text = this.text
      this.postForm.type = 1
    },
    postThis (data) {
      postOther(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getOtherList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    // 处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },
    // 修改相关
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
      this.text.title = thisBean.text.title
      this.text.content = thisBean.text.content
      this.putForm.type = 1
    },
    putThis (data) {
      data.text = this.text
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
        this.putForm.img = file.response.data
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
.blockpage {
  padding-top: 2%;
}
</style>
