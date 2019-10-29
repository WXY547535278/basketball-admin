<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="赛区名字">
        <el-input v-model="formInline.name"
                  placeholder="赛区名字 "></el-input>
      </el-form-item>
      <el-form-item label="赛区开关">
        <el-select v-model="formInline.derail"
                   placeholder="赛区开关 "
                   @change="onSubmit">
          <el-option label="开"
                     value="1"></el-option>
          <el-option label="关"
                     value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增赛区</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading">
      <!-- 评价列表 -->
      <el-table-column prop="name"
                       label="赛区名称"
                       width="auto"></el-table-column>
      <el-table-column prop="derail"
                       label="是否开启"
                       width="auto"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="auto">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="showOrderList(scope.row.orderId)"
                     type="text"
                     size="small">查看评价订单</el-button> -->
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="putCmpArea(scope.row.id,scope.row.name,scope.row.derail)">修改赛区</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id,1)">删除赛区</el-dropdown-item>
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

    <!-- 修改赛区  -->
    <el-dialog title="修改评价"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="赛区名称">
          <el-input v-model="putForm.name" style="width:auto"></el-input>
        </el-form-item>
        <el-form-item label="赛区开关">
          <el-select v-model="putForm.derail"
                     placeholder="赛区开关"
                     >
            <el-option label="开"
                       value="1"></el-option>
            <el-option label="关"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增赛区  -->
    <el-dialog title="修改评价"
               :visible.sync="showView1"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="赛区名称">
          <el-input v-model="postForm.name" style="width:auto"></el-input>
        </el-form-item>
        <el-form-item label="赛区开关">
          <el-select v-model="postForm.derail"
                     placeholder="赛区开关"
                     >
            <el-option label="开"
                       value="1"></el-option>
            <el-option label="关"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getCompetitionAreaList, putCompetitionArea, delCompetitionArea, postCompetitionArea } from '@/api/competitionArea'
import { parseTime } from '@/utils/index'

export default {
  name: 'CompetitionArealist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      showView1: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        name: null,
        derail: null
      },
      putForm: {
        id: null,
        name: null,
        derail: null
      },
      postForm: {
        name: null,
        derail: null
      },
      loading: false
    }
  },
  mounted () {
    this.getCompetitionArea()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getCompetitionArea()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getCompetitionArea()
    },
    // 显示新增赛区
    showPost () {
      this.postForm.name = null
      this.postForm.derail = null
      this.showView1 = true
    },
    // 新增赛区
    postThis () {
      postCompetitionArea(this.postForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView1 = false
        this.getCompetitionArea()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 显示修改赛区
    putCmpArea (id, name, derail) {
      this.putForm.id = id
      this.putForm.name = name
      this.putForm.derail = derail
      this.showView = true
    },
    // 修改赛区
    putThis () {
      putCompetitionArea(this.putForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView = false
        this.getCompetitionArea()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 搜索
    onSubmit () {
      this.getCompetitionArea()
    },
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCompetitionArea(id).then(res => {
          if (res.code == '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getCompetitionArea()
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
    // 获取赛区列表
    getCompetitionArea () {
      this.loading = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        derail: this.formInline.derail,
        name: this.formInline.name
      }
      getCompetitionAreaList(query).then(res => {
        console.log('获取到的赛区列表', res.data)
        this.loading = false
        this.tableData = res.data.map(item => {
          if (item.derail == 0) {
            item.derail = '关'
          } else if (item.derail == 1) {
            item.derail = '开'
          }
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
