<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="用户id">
        <el-input v-model="formInline.userId"
                  placeholder="用户id"></el-input>
      </el-form-item>
      <el-form-item label="下级id">
        <el-input v-model="formInline.leekId"
                  placeholder="下级id"></el-input>
      </el-form-item>
      <el-form-item label="下级状态  ">
        <el-select v-model="formInline.leekStatus"
                   placeholder="下级状态 "
                   @change="onSubmit">
          <el-option label="正常使用过  "
                     value="1"></el-option>
          <el-option label="暂时停用"
                     value="2"></el-option>
          <el-option label="永久停用"
                     value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下级等级">
        <el-input v-model="formInline.leekRank"
                  placeholder="下级等级"></el-input>
      </el-form-item>
      <el-form-item label="下级类型  ">
        <el-select v-model="formInline.type"
                   placeholder="下级类型 "
                   @change="onSubmit">
          <el-option label="直推  "
                     value="1"></el-option>
          <el-option label="下级发展的"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级的等级">
        <el-input v-model="formInline.masterRank"
                  placeholder="上级的等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 用户团队 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="userId"
                       label="用户id"
                       width="200"></el-table-column>
      <el-table-column prop="leekId"
                       label="下级id"
                       width="150"></el-table-column>
      <el-table-column label="下级头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.leekImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="leekName"
                       label="下级姓名"
                       width="150"></el-table-column>
      <el-table-column prop="leekPhone"
                       label="下级电话"
                       width="150"></el-table-column>
      <el-table-column prop="leekRank"
                       label="下级等级"
                       width="150"></el-table-column>
      <el-table-column prop="leekStatus"
                       label="下级状态"
                       width="150"></el-table-column>
      <el-table-column label="下级创建时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.leekTime) }}</template>
      </el-table-column>
      <el-table-column prop="leekWechat"
                       label="下级微信号码"
                       width="150"></el-table-column>
      <el-table-column prop="type"
                       label="下级类型"
                       width="150"></el-table-column>
      <el-table-column prop="masterRank"
                       label="上级的等级"
                       width="150"></el-table-column>
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

    <!--  查看区域  -->
    <!-- <el-dialog title="用户购买课程列表"
               :visible.sync="showView"
               width="80%">
      <el-table :data="payclass">
        <el-table-column prop="id"
                         label="课程id"
                         width="300"></el-table-column>
        <el-table-column prop="name"
                         label="课程名称"
                         width="300"></el-table-column>
        <el-table-column prop="price"
                         label="课程价格"
                         width="300"></el-table-column>
      </el-table>
    </el-dialog> -->

  </div>
</template>

<script>
import { getUserTeam, delUserTeam } from "@/api/team"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        userId: null,
        leekId: null,
        leekRank: null,
        type: null,
        masterRank: null,
        leekStatus: null
      }
    }
  },
  mounted () {
    this.getUserTeam()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getUserTeam()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getUserTeam()
    },
    // 搜索
    onSubmit () {
      this.getUserTeam()
    },
    // 获取下级用户列表
    getUserTeam () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        userId: this.formInline.userId,
        leekId: this.formInline.leekId,
        leekRank: this.formInline.leekRank,
        masterRank: this.formInline.masterRank,
        type: this.formInline.type,
        leekStatus: this.formInline.leekStatus
      }
      getUserTeam(query).then(res => {
        console.log('获取到的团队列表', res)
        this.tableData = res.data.map(item => {
          if (item.leekStatus == 1) {
            item.leekStatus = '正常使用过'
          } else if (item.leekStatus == 2) {
            item.leekStatus = '暂时停用'
          } else {
            item.leekStatus = '永久停用'
          }
          if (item.type == 1) {
            item.type = '直推'
          } else {
            item.type = '下级发展的'
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
    // toPut (id) {
    //   console.log(id)
    //   this.$router.push({ path: 'userClass/put/' + id })
    // }

  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
