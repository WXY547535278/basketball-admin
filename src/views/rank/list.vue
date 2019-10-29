<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">

    <el-table :data="tableData">
      <!-- 等级列表 -->
      <el-table-column prop="id"
                       label="等级"
                       width="250"></el-table-column>
      <el-table-column prop="needCount"
                       label="升级该等级所需的团队人数"
                       width="200"></el-table-column>
      <el-table-column prop="needAmount"
                       label="店铺商品最高单价"
                       width="200"></el-table-column>
      <el-table-column prop="top"
                       label="升到该等级需要往上级派的单"
                       width="auto"></el-table-column>
      <el-table-column prop="btm"
                       label="升到该等级需要往下级派的单"
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
              <el-dropdown-item @click.native.prevent="putRank(scope.row.id)">修改</el-dropdown-item>
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

    <!-- 修改评价状态  -->
    <el-dialog title="修改"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="升级该等级所需的团队人数:">
          <el-input v-model="putForm.needCount"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="店铺商品最高单价:">
          <el-input v-model="putForm.needAmount"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="升到该等级需要往上级派的单:">
          <el-input v-model="putForm.top"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="升到该等级需要往下级派的单:">
          <el-input v-model="putForm.btm"
                    style="width: auto;"
                    type="text" />
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
import { getRankList, putRank } from "@/api/rank"
import { parseTime } from "@/utils/index"

export default {
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      putForm: {
        id: null,
        needCount: null,
        needAmount: null,
        top: null,
        btm: null
      }
    }
  },
  mounted () {
    this.getRankLists()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getRankLists()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getRankLists()
    },
    // 修改产品状态
    putRank (id) {
      var thisBean = {}
      for (var i = 0; i < this.tableData.length; i++) {
        if (id === this.tableData[i].id) {
          thisBean = this.tableData[i]
          break
        }
      }
      this.showView = true
      this.putForm.id = thisBean.id
      this.putForm.needCount = thisBean.needCount
      this.putForm.needAmount = thisBean.needAmount
      this.putForm.top = thisBean.top
      this.putForm.btm = thisBean.btm
    },
    // 修改审核状态
    putThis () {
      putRank(this.putForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView = false
        this.getRankLists()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 获取评价列表
    getRankLists () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize
      }
      getRankList(query).then(res => {
        console.log('获取到的等级列表', res.data)
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
