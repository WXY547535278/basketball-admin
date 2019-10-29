<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <!-- <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="发送的手机号">
        <el-input v-model="formInline.phone"
                  placeholder="手机号 "></el-input>
      </el-form-item>
      <el-form-item label="发送状态  ">
        <el-select v-model="formInline.status"
                   placeholder="发送状态 "
                   @change="onSubmit">
          <el-option label="失败  "
                     value="0"></el-option>
          <el-option label="成功"
                     value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">给所有用户发送短信</el-button>
      </el-form-item>
    </el-form> -->

    <el-table :data="tableData">
      <!-- 短信信息 -->
      <!-- <el-table-column prop="code"
                       label="验证码"
                       width="auto"></el-table-column> -->
      <el-table-column prop="phone"
                       label="电话"
                       width="auto"></el-table-column>
      <el-table-column prop="status"
                       label="发送状态"
                       width="auto"></el-table-column>
      <el-table-column prop="param"
                       label="短信内容"
                       width="auto"></el-table-column>
      <el-table-column label="发送时间"
                       width="auto">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="auto">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showList(scope.row.id)">查看详情</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id,1)">删除</el-dropdown-item>
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

    <!--  查看区域  -->
    <el-dialog title="短信内容"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="showMessage"
               label-width="80px">
        <el-form-item label="电话">
          <el-input v-model="showMessage.phone"
                    style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="短信内容">
          <el-input type="textarea"
                    v-model="showMessage.param"
                    style="width:400px"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 发送短信 -->
    <el-dialog title="发送短信"
               :visible.sync="showView1"
               width="50%"
               >
      <el-form ref="form"
               label-width="80px">
        <el-form-item label="短信内容" v-loading="loading">
          <el-input type="textarea"
                    v-model="text"
                    style="width:400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="sendMsg(text)">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getMessageList, getMessageById, delMessage, SendMessage } from "@/api/message";
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      payclass: [],
      currentPage4: 1,
      showView: false,
      showView1: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        status: null,
        userId: null,
        userPhone: null,
        id: null
      },
      showMessage: {
        phone: null,
        param: null
      },
      text: null, // 短信内容
      loading: false
    }
  },
  mounted () {
    this.getMessageList()
  },

  created () {
  },

  methods: {
    // 发送短信
    sendMsg() {
      this.loading = true
      SendMessage(this.text).then(res => {
        if (res.code == '200') {
          this.$message({
            type: 'success',
            message: '发送成功!'
          })
          this.loading = false
          this.showView1 = false
        }
      })
    },
    showPost () {
      this.showView1 = true
    },
    showList (id) {
      this.showView = true
      getMessageById(id).then(res => {
        console.log('获取到的短信列表', this.tableData)
        this.showMessage.phone = res.data.phone
        this.showMessage.param = res.data.param
      })
      console.log('获取到的短信id', id)
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getMessageList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getMessageList()
    },
    // 搜索
    onSubmit () {
      this.getMessageList()
    },
    // 获取用户列表
    getMessageList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        // status: this.formInline.status,
        phone: this.formInline.phone
      }
      getMessageList(query).then(res => {
        console.log('获取到的短信列表', res)
        this.tableData = res.data.map(item => {
          if (item.status == 0) {
            item.status = '失败'
          } else {
            item.status = '成功'
          }
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 删除短信
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMessage(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getMessageList()
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
