<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增友情链接</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="text.name"
                       :show-overflow-tooltip="true"
                       label="链接名"
                       width="auto"></el-table-column>
      <el-table-column prop="text.address"
                       :show-overflow-tooltip="true"
                       label="链接地址"
                       width="auto"></el-table-column>
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
    <!--  新增区  -->
    <el-dialog title="列表"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="链接名称:">
          <el-input v-model="link.name"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input v-model="link.address"
                    type="textarea"
                    style="width: 500px;" />
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
        <el-form-item label="链接名">
          <el-input v-model="link.name"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="link.address"
                    type="textarea"
                    style="width: 500px;" />
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

export default {
  data () {
    return {
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
        type: 6
      },
      putForm: {
        id: null,
        text: null,
        type: 6
      },
      link: {
        name: null,
        address: null
      }
    }
  },

  mounted () {
    this.getOtherList()
  },

  methods: {
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
        type: 6
      }
      getOtherLists(query).then(res => {
        console.log('获取到友情链接', res)
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
    // 删除友情链接
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
    //新增相关
    showPost () {
      this.postForm.type = 6
      this.postForm.text = this.link
      this.postView = true
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
      // 获取text中的json字段
      this.link.name = thisBean.text.name
      this.link.address = thisBean.text.address
      this.putForm.type = 6
    },
    putThis (data) {
      data.text = this.link
      console.log(data)
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
