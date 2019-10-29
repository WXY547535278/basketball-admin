<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="id">
        <el-input v-model="formInline.id"
                  placeholder="id"></el-input>
      </el-form-item>
      <el-form-item label="用户id">
        <el-input v-model="formInline.userId"
                  placeholder="用户id"></el-input>
      </el-form-item>
      <el-form-item label="下级用户id">
        <el-input v-model="formInline.leekId"
                  placeholder="下级用户id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 帮助注册信息 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="userId"
                       label="用户id"
                       width="200"></el-table-column>
      <el-table-column prop="leekId"
                       label="下级用户id"
                       width="150"></el-table-column>
      <el-table-column prop="leekName"
                       label="下级名字"
                       width="150"></el-table-column>
      <el-table-column prop="leekPhone"
                       label="下级手机号"
                       width="150"></el-table-column>
      <el-table-column prop="leekWechat"
                       label="下级微信"
                       width="150"></el-table-column>
      <el-table-column label="注册时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
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
import { getdragDownList } from "@/api/dragDown"
import { parseTime } from "@/utils/index"

export default {
  data () {
    return {
      tableData: [],
      payclass: [],
      currentPage4: 1,
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        userId: null,
        id: null,
        leekId: null
      }
    }
  },
  mounted () {
    this.getdragDownList()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getdragDownList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getdragDownList()
    },
    // 搜索
    onSubmit () {
      this.getdragDownList()
    },
    // 获取用户列表
    getdragDownList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        userId: this.formInline.userId,
        id: this.formInline.id,
        leekId: this.formInline.leekId
      }
      getdragDownList(query).then(res => {
        console.log('获取到的帮助注册列表', res)
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
