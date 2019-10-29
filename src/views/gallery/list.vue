<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="类型名">
        <el-input v-model="formInline.textLike"
                  placeholder="类型名"></el-input>
      </el-form-item>
      <el-form-item label="类型id">
        <el-input v-model="formInline.typeId"
                  placeholder="类型id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
      <!-- <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增图库</el-button>
      </el-form-item> -->
    </el-form>
    <el-table :data="tableData">
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="typeId"
                       label="类型id"
                       width="250"></el-table-column>
      <el-table-column prop="sort"
                       label="排序序号"></el-table-column>
      <el-table-column prop="text.name"
                       label="昵称"
                       width="100"></el-table-column>
      <el-table-column prop="text.phone"
                       label="电话"
                       width="150"></el-table-column>
      <el-table-column prop="text.wx"
                       label="微信"
                       width="150"></el-table-column>
      <el-table-column prop="text.industry"
                       label="行业"
                       width="200"></el-table-column>
      <el-table-column prop="text.bz"
                       label="备注"
                       width="200"></el-table-column>
      <el-table-column prop="param"
                       label="跳转url"
                       width="200"></el-table-column>
      <el-table-column label="图片"
                       width="250">
        <template slot-scope="scope"><img style="width: 100px; height: 100px"
               :src="scope.row.img"
               fit="fill" />
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
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
    <!--  修改区  -->
    <el-dialog title="列表"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="id:">
          <el-input v-model="putForm.id"
                    style="width: auto;"
                    type="text"
                    :disabled="true" />
        </el-form-item>
        <el-form-item label="类型id:">
          <el-input v-model="putForm.typeId"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="排序序号:">
          <el-input v-model="putForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="putForm.param"
                    style="width: auto;" />
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input v-model="putForm.text"
                    type="textarea"
                    style="width: auto;" />
        </el-form-item> -->
        <el-form-item label="昵称">
          <el-input v-model="text.name"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="text.phone"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="text.wx"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="行业">
          <el-input v-model="text.industry"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="text.bz"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="putForm.img"
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

    <!--  新增区  -->
    <!-- <el-dialog title="列表"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="类型id:">
          <el-input v-model="postForm.typeId"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="排序序号:">
          <el-input v-model="postForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-input v-model="postForm.param"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="text.name"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="text.phone"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="text.wx"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="行业">
          <el-input v-model="text.industry"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="text.bz"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="postForm.img"
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

    </el-dialog> -->

  </div>
</template>

<script>
import { getGalleryList, deleteGallery, putGallery, postGallery } from '@/api/gallery'
import { parseTime } from '@/utils/index'
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  name: 'complaintlist',
  data () {
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
      // 搜索内容
      formInline: {
        textLike: null,
        typeId: null
      },
      fileList: [],
      putView: false,
      postForm: {
        img: null,
        text: null,
        sort: null,
        param: null,
        typeId: null
      },
      putForm: {
        id: null,
        img: null,
        text: null,
        sort: null,
        param: null,
        typeId: null
      },
      text: {
        wx: null,
        phone: null,
        name: null,
        bz: null,
        industry: null
      }
    }
  },

  mounted () {
    this.getGalleryList()
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getGalleryList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getGalleryList()
    },
    // 搜索
    onSubmit () {
      this.getGalleryList()
    },

    getGalleryList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        textLike: this.formInline.textLike,
        typeId: this.formInline.typeId
      }
      getGalleryList(query).then(res => {
        console.log('获取到的图库', res)
        this.tableData = res.data.map(item => {
          item.text = JSON.parse(item.text)
          return item
        })
        // console.log(this.tableData)
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },

    // 删除图库
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGallery(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getGalleryList()
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
    //新增相关
    showPost () {
      this.postView = true
      this.postForm.sort = null
      this.postForm.img = null
      this.postForm.text = null
      this.postForm.typeId = null
      this.postForm.param = null
    },
    postThis (data) {
      data.text = this.text
      postGallery(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getGalleryList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })

    },
    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm.img = file.response.data
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
      this.putForm.img = thisBean.img
      this.putForm.sort = thisBean.sort
      this.putForm.param = thisBean.param
      this.putForm.text = thisBean.text
      // 获取text中的json字段
      this.text.name = thisBean.text.name
      this.text.wx = thisBean.text.wx
      this.text.phone = thisBean.text.phone
      this.text.bz = thisBean.text.bz
      this.text.industry = thisBean.text.industry
      this.putForm.typeId = thisBean.typeId
    },
    putThis (data) {
      data.text = this.text
      console.log(data)
      putGallery(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getGalleryList()
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
</style>
