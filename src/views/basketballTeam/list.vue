<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">

      <!-- <el-form-item label="id">
        <el-input v-model="formInline.id"
                  placeholder="id"></el-input>
      </el-form-item> -->

      <el-form-item label="球队名称">
        <el-input v-model="formInline.name"
                  placeholder="球队名称"></el-input>
      </el-form-item>
      <el-form-item label="球队联系电话">
        <el-input v-model="formInline.phone"
                  placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="申请状态">
        <el-select v-model="formInline.status"
                   placeholder="申请状态"
                   @change="onSubmit">
          <el-option label="申请中"
                     value="1"></el-option>
          <el-option label="通过"
                     value="2"></el-option>
          <el-option label="拒绝"
                     value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading">
      <!-- 球队信息 -->
      <el-table-column prop="name"
                       label="球队名"
                       width="auto"></el-table-column>
      <el-table-column prop="phone"
                       label="球队联系电话"
                       width="auto"></el-table-column>
      <el-table-column prop="number"
                       label="成员数量"
                       width="auto"></el-table-column>
      <el-table-column label="球队logo"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.logo"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="status"
                       label="申请状态"
                       width="auto"></el-table-column>
      <el-table-column prop="introduction"
                       label="球队简介"
                       width="auto"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="auto">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showTeamDetail(scope.row.id)">查看球员</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="putTeamStatus(scope.row.id)">审核</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id)">解散球队</el-dropdown-item>
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

    <!-- 查看球队成员  -->
    <el-dialog title="球队成员"
               :visible.sync="showView"
               width="80%">
      <el-table :data="teamDetail">
        <el-table-column prop="name"
                         label="名字"
                         width="300"></el-table-column>
        <el-table-column label="头像"
                         width="150">
          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="scope.row.img"
                 fit="fill" /></template>
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机号"
                         width="300"></el-table-column>
        <el-table-column prop="position"
                         label="位置"
                         width="300"></el-table-column>
        <el-table-column prop="type"
                         label="球队职位"
                         width="300"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改球队申请状态  -->
    <el-dialog title="修改状态"
               :visible.sync="showView1"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="申请状态 ">
          <el-select v-model="putForm.status"
                     placeholder="申请状态">
            <el-option label="通过 "
                       value="2"></el-option>
            <el-option label="拒绝"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTeamList, getPlayer, deleteTeam, putTeam } from "@/api/basketballTeam";
import { parseTime } from "@/utils/index"

export default {
  name: 'BasketballTeamlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      showView1: false,
      teamDetail: null,
      putForm: {
        id: null,
        status: null
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        phone: null,
        status: null,
        name: null
      },
      loading: false
    }
  },
  mounted () {
    this.getTeamList()
  },

  created () {
  },

  methods: {
    // 修改球队状态
    putTeamStatus (id) {
      this.putForm.id = id
      this.showView1 = true
    },
    // 修改审核状态
    putThis () {
      putTeam(this.putForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView1 = false
        this.getTeamList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 查看球队详情
    showTeamDetail (teamId) {
      this.showView = true
      console.log('获取到的球队id', teamId)
      getPlayer(teamId).then(res => {
        console.log('队员详情', res)
        this.teamDetail = res.data.map(item => {
          if (item.type == 1) {
            item.type = '领队'
          } else if (item.type == 2) {
            item.type = '队员'
          } else {
            item.type = '教练'
          }
          return item
        })
        // this.teamDetail = res.data
      })
    },
    // 删除球队
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTeam(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getTeamList()
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
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getTeamList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getTeamList()
    },
    // 搜索
    onSubmit () {
      this.getTeamList()
    },
    // 获取球队列表
    getTeamList () {
      this.loading = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        status: this.formInline.status,
        phone: this.formInline.phone,
        name: this.formInline.name
      }
      getTeamList(query).then(res => {
        this.loading = false
        console.log('获取球队列表', res)
        this.tableData = res.data.map(item => {
          if (item.status == 1) {
            item.status = '申请中'
          } else if (item.status == 2) {
            item.status = '通过'
          } else {
            item.status = '拒绝'
          }
          return item
        })
        this.tableData = res.data
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
