<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">

      <el-form-item label="订单id">
        <el-input v-model="formInline.orderId"
                  placeholder="订单id"></el-input>
      </el-form-item>

      <el-form-item label="审核人名字">
        <el-input v-model="formInline.masterName"
                  placeholder="审核人名字"></el-input>
      </el-form-item>
      <el-form-item label="审核人电话">
        <el-input v-model="formInline.masterPhone"
                  placeholder="审核人电话"></el-input>
      </el-form-item>
      <el-form-item label="申请人名字">
        <el-input v-model="formInline.leekName"
                  placeholder="申请人名字"></el-input>
      </el-form-item>
      <el-form-item label="申请人电话">
        <el-input v-model="formInline.leekPhone"
                  placeholder="申请人电话"></el-input>
      </el-form-item>

      <el-form-item label="审核状态 ">
        <el-select v-model="formInline.status"
                   placeholder="审核状态"
                   @change="onSubmit">
          <el-option label="审核中  "
                     value="1"></el-option>
          <el-option label="通过 "
                     value="2"></el-option>
          <el-option label="拒绝"
                     value="3"></el-option>
          <el-option label="已经过期"
                     value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核类型 ">
        <el-select v-model="formInline.type"
                   placeholder="审核类型 "
                   @change="onSubmit">
          <el-option label="普通人审核   "
                     value="1"></el-option>
          <el-option label="平台人员在审核 "
                     value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 其他-->
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="leekName"
                       label="申请升级人姓名"
                       width="150"></el-table-column>
      <el-table-column prop="leekPhone"
                       label="申请升级人电话"
                       width="150"></el-table-column>
      <el-table-column prop="orderId"
                       label="订单id"
                       width="200"></el-table-column>
      <el-table-column label="申请升级人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.leekImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="rank"
                       label="申请人当前等级"
                       width="250"></el-table-column>
      <el-table-column prop="aldebaran"
                       label="升级后的等级"
                       width="200"></el-table-column>
      <!-- 需要升级人 -->
      <!-- <el-table-column prop="leekId"
                       label="需要升级人id"
                       width="150"></el-table-column> -->
      <!-- 审核人 -->
      <!-- <el-table-column prop="masterId"
                       label="审核人id"
                       width="150"></el-table-column> -->
      <el-table-column prop="masterName"
                       label="审核人姓名"
                       width="150"></el-table-column>
      <el-table-column prop="masterPhone"
                       label="审核人电话"
                       width="150"></el-table-column>
      <el-table-column prop="masterWechat"
                       label="审核人微信"
                       width="150"></el-table-column>
      <el-table-column label="审核人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.masterImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="status"
                       label="审核状态 "
                       width="150"></el-table-column>
      <el-table-column prop="type"
                       label="审核类型 "
                       width="150"></el-table-column>
      <el-table-column label="申请审核时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <!-- <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="putList(scope.row.id)"
                     type="text"
                     size="small">审核</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column> -->
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

    <!-- 修改状态  -->
    <!-- <el-dialog title="操作"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="投诉状态 ">
          <el-select v-model="putForm.status"
                     placeholder="投诉状态">
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
    </el-dialog> -->

  </div>
</template>

<script>
import { getApplyList, putComplaint, deleteComplaint } from "@/api/apply";
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      putForm: {
        id: null,
        status: null
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        status: null,
        type: null,
        masterName: null,
        masterPhone: null,
        leekName: null,
        leekPhone: null,
        orderId: null
      }
    }
  },
  mounted () {
    this.getApplyList()
  },

  created () {
  },

  methods: {
    // putList (id) {
    //   console.log('投诉id', id)
    //   this.putForm.id = id
    //   this.showView = true
    // },
    // 修改审核状态
    // putThis () {
    //   putComplaint(this.putForm.id, this.putForm.status).then(res => {
    //     this.$message({
    //       type: 'success',
    //       message: '修改成功!'
    //     })
    //     this.showView = false
    //     this.getComplaintList()
    //   }).catch(() => {
    //     this.$message({
    //       type: 'warning',
    //       message: '修改失败'
    //     })
    //   })
    // },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getApplyList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getApplyList()
    },
    // 搜索
    onSubmit () {
      this.getApplyList()
    },
    // 获取用户列表
    getApplyList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        status: this.formInline.status,
        masterName: this.formInline.masterName,
        masterPhone: this.formInline.masterPhone,
        leekName: this.formInline.leekName,
        leekPhone: this.formInline.leekPhone,
        type: this.formInline.type,
        orderId: this.formInline.orderId
      }
      getApplyList(query).then(res => {
        console.log('获取到的投诉列表', res)
        this.tableData = res.data.map(item => {
          if (item.status == 1) {
            item.status = '审核中'
          } else if (item.status == 2) {
            item.status = '通过'
          } else if (item.status == 3) {
            item.status = '拒绝'
          } else {
            item.status = '已经过期'
          }
          if (item.type == 1) {
            item.type = '普通人审核'
          } else {
            item.type = '平台人员在审核'
          }
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 删除投诉
    // deleteThis (id) {
    //   deleteComplaint(id).then(res => {
    //     if (res.code === '200') {
    //       this.$message({
    //         type: 'success',
    //         message: '操作成功!'
    //       })
    //       this.getComplaintList()
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: '操作失败'
    //       })
    //     }
    //   })
    // },
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
