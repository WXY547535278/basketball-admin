<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增图库类型</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->

      <el-table-column prop="name"
                       label="类型名"></el-table-column>

      <el-table-column prop="sort"
                       label="排序序号"></el-table-column>

      <el-table-column fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="showPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
          <el-button @click.native.prevent="addThis(scope.row.id)"
                     type="text"
                     size="small">添加图库</el-button> -->
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showPut(scope.row.id)">修改</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id)">删除</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="addThis(scope.row.id)">添加图库</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="showImg(scope.row.id)">查看图库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <!-- <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div> -->

    <!--  新增图库类型区  -->
    <el-dialog title="新增图库类型"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">

        <el-form-item label="排序序号:">
          <el-input v-model="postForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="类型名:">
          <el-input v-model="postForm.name"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis(postForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
    <!--  为对应的图库类型添加图片  -->
    <el-dialog title="新增图库"
               :visible.sync="addImage"
               width="80%">
      <el-form ref="form"
               :model="postForm1"
               label-width="120px">
        <el-form-item label="排序序号:">
          <el-input v-model="postForm1.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-input v-model="postForm1.param"
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
                 :src="postForm1.img"
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
                     @click="postThis1(postForm1)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
    <!--  修改区  -->
    <el-dialog title="修改图库类型"
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

        <el-form-item label="排序序号:">
          <el-input v-model="putForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="类型名">
          <el-input v-model="putForm.name"
                    style="width: auto;" />
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis(putForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!--  查看图库区  -->
    <el-dialog title="查看图库"
               :visible.sync="showImage"
               width="80%"
               v-loading="loading"
               :modal="false"
               >
      <!-- 搜索条件区域 -->

      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline"
               >
        <el-form-item label="类型名">
          <el-input v-model="formInline.textLike"
                    placeholder="类型名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="success"
                   @click="reverse()">一键换序</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData1">
        <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
        <!-- <el-table-column prop="typeId"
                       label="类型id"
                       width="250"></el-table-column> -->
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
                <el-dropdown-item @click.native.prevent="showPut1(scope.row.id)">修改</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="deleteThis1(scope.row.id)">删除</el-dropdown-item>
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
      <!--  图库修改区  -->
      <el-dialog title="修改图库"
                 :visible.sync="putView1"
                 width="80%"
                 :modal-append-to-body='false'>
        <el-form ref="form"
                 :model="putForm1"
                 label-width="120px">
          <!-- <el-form-item label="id:">
            <el-input v-model="putForm1.id"
                      style="width: auto;"
                      type="text"
                      :disabled="true" />
          </el-form-item>
          <el-form-item label="类型id:">
            <el-input v-model="putForm1.typeId"
                      style="width: auto;"
                      type="text" />
          </el-form-item> -->
          <el-form-item label="排序序号:">
            <el-input v-model="putForm1.sort"
                      style="width: auto;"
                      type="nummber" />
          </el-form-item>
          <el-form-item label="跳转地址">
            <el-input v-model="putForm1.param"
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
                   :src="putForm1.img"
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
                       @click="putThis1(putForm1)">保存</el-button>
          </el-form-item>

        </el-form>

      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>
import { getGalleryTypeList, deleteGalleryType, putGalleryType, postGalleryType } from '@/api/galleryType'
import { getGalleryList, deleteGallery, putGallery, postGallery, reverseOrder } from '@/api/gallery'
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'

export default {
  // name: 'complaintlist',
  data () {
    return {
      upload_url: getUploadUrl(), // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      tableData1: [],
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,
      postView: false,
      addImage: false,
      showImage: false,
      putView: false,
      postForm1: { // 新增图库
        img: null,
        text: null,
        sort: null,
        param: null,
        typeId: null
      },
      postForm: {
        sort: null,
        name: null
      },
      fileList: [],
      fileList1: [],
      putForm: { // 图库类型的修改
        id: null,
        name: null,
        sort: null
      },
      putView1: false, // 图库的显示
      // 搜索内容
      formInline: {
        textLike: null,
        typeId: null
      },
      putForm1: { // 图库的修改
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
      },
      loading: false
    }
  },

  mounted () {
    this.getGalleryTypeList()
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
    // 倒叙
    reverse() {
      reverseOrder(this.formInline.typeId).then(res => {
        if (res.code === '200') {
          this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getGalleryList()
        }
      })
    },
    // 查看图库区
    showImg(type_id) {
      this.pageindex = 0
      this.showImage = true
      this.formInline.typeId = type_id
      this.getGalleryList()
    },
    // 搜索
    onSubmit() {
      this.pageindex = 0
      this.getGalleryList()
    },
    getGalleryList() {
      this.loading = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        textLike: this.formInline.textLike,
        typeId: this.formInline.typeId
      }
      getGalleryList(query).then(res => {
        this.loading = false
        console.log('获取到的图库', res)
        this.tableData1 = res.data.map(item => {
          item.text = JSON.parse(item.text)
          return item
        })
        // console.log(this.tableData)
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 删除图库
    deleteThis1(id) {
      this.pageindex = 0
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
    // 修改图库
    showPut1(id) {
      var thisBean = {}
      for (var i = 0; i < this.tableData1.length; i++) {
        if (id === this.tableData1[i].id) {
          thisBean = this.tableData1[i]
          break
        }
      }
      this.putView1 = true
      this.putForm1.id = thisBean.id
      this.putForm1.typeId = thisBean.typeId
      this.putForm1.img = thisBean.img
      this.putForm1.sort = thisBean.sort
      this.putForm1.param = thisBean.param
      this.putForm1.text = thisBean.text
      // 获取text中的json字段
      this.text.name = thisBean.text.name
      this.text.wx = thisBean.text.wx
      this.text.phone = thisBean.text.phone
      this.text.bz = thisBean.text.bz
      this.text.industry = thisBean.text.industry
      this.putForm.typeId = thisBean.typeId
    },
    putThis1(data) {
      data.text = this.text
      console.log(data)
      putGallery(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView1 = false
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
        this.fileList1 = []
        this.putForm1.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },
    // 为对应图库类型添加图片
    addThis (typeId) {
      console.log('对应的类型id', typeId)
      this.addImage = true
      this.postForm1.sort = null
      this.postForm1.img = null
      this.postForm1.text = null
      this.postForm1.typeId = typeId
      this.postForm1.param = null
      this.text.wx = null
      this.text.phone = null
      this.text.name = null
      this.text.bz = null
      this.text.industry = null
    },
    postThis1 (data) {
      data.text = this.text
      postGallery(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.addImage = false
        this.getGalleryTypeList()
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
        this.postForm1.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },

    getGalleryTypeList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize
      }
      getGalleryTypeList(query).then(res => {
        // console.log(res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },

    // 删除图库类型
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGalleryType(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getGalleryTypeList()
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
    },
    postThis (data) {
      postGalleryType(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getGalleryTypeList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
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
      this.putForm.sort = thisBean.sort
      this.putForm.name = thisBean.name
    },
    putThis (data) {

      putGalleryType(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getGalleryTypeList()
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
</style>
