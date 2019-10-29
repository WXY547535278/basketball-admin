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
      <el-form-item label="上级id">
        <el-input v-model="formInline.userId"
                  placeholder="上级id"></el-input>
      </el-form-item>
      <el-form-item label="下级id">
        <el-input v-model="formInline.leekId"
                  placeholder="下级id"></el-input>
      </el-form-item>
      <el-form-item label="下级在组织中等级">
        <el-input v-model="formInline.rank"
                  placeholder="下级在组织中等级"></el-input>
      </el-form-item>
      <el-form-item label="下级电话">
        <el-input v-model="formInline.leekPhone"
                  placeholder="下级电话"></el-input>
      </el-form-item>
      <el-form-item label="下级状态">
        <el-select v-model="formInline.leekStatus"
                   placeholder="下级状态 "
                   @change="onSubmit">
          <el-option label="正常使用过"
                     value="1"></el-option>
          <el-option label="暂时停用"
                     value="2"></el-option>
          <el-option label="永久停用"
                     value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 组织架构信息 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="userId"
                       label="上级id"
                       width="200"></el-table-column>
      <el-table-column prop="leekId"
                       label="下级id"
                       width="150"></el-table-column>
      <el-table-column prop="leekName"
                       label="下级名字"
                       width="150"></el-table-column>
      <el-table-column label="下级头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.leekImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="leekPhone"
                       label="下级手机号"
                       width="150"></el-table-column>
      <el-table-column prop="leekWechat"
                       label="下级微信"
                       width="150"></el-table-column>
      <el-table-column prop="leekStatus"
                       label="下级状态"
                       width="150"></el-table-column>
      <el-table-column prop="rank"
                       label="下级在组织中等级"
                       width="150"></el-table-column>             
      <el-table-column label="加入组织时间"
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

  </div>
</template>

<script>
import { getTreeList } from "@/api/tree";
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
        leekId: null,
        rank: null,
        leekPhone: null,
        leekStatus: null
      }
    }
  },
  mounted () {
    this.getTreeList()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getTreeList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getTreeList()
    },
    // 搜索
    onSubmit () {
      this.getTreeList()
    },
    // 获取用户列表
    getTreeList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        userId: this.formInline.userId,
        id: this.formInline.id,
        leekId: this.formInline.leekId,
        leekPhone: this.formInline.leekPhone,
        rank: this.formInline.rank,
        leekStatus: this.formInline.leekStatus
      }
      getTreeList(query).then(res => {
        console.log('获取到的组织架构列表', res)
        this.tableData = res.data.map(item => {
          if (item.leekStatus == 1) {
            item.leekStatus = '正常使用过'
          } else if (item.leekStatus == 2) {
            item.leekStatus = '暂时停用'
          } else {
            item.leekStatus = '永久停用'
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
