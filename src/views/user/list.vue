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
      <el-form-item label="姓名">
        <el-input v-model="formInline.name"
                  placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="formInline.phone"
                  placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading">
      <!-- 用户信息 -->
      <el-table-column prop="name"
                       label="姓名"
                       width="200"></el-table-column>
      <el-table-column prop="phone"
                       label="电话"
                       width="150"></el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       width="150"></el-table-column>
      <el-table-column prop="mailbox"
                       label="邮箱"
                       width="150"></el-table-column>
      <el-table-column label="头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.img"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="document"
                       label="证件号码"
                       width="150"></el-table-column>
      <el-table-column prop="documentType"
                       label="证件类型"
                       width="150"></el-table-column>
      <el-table-column prop="rightDeviation"
                       label="名族"
                       width="150"></el-table-column>
      <el-table-column label="证件照片"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.documentImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="height"
                       label="身高"
                       width="150"></el-table-column>
      <el-table-column prop="weight"
                       label="体重"
                       width="150"></el-table-column>
      <el-table-column prop="size"
                       label="衣服尺码"
                       width="150"></el-table-column>
      <el-table-column prop="jerseyNumber"
                       label="球衣编号"
                       width="150"></el-table-column>
      <el-table-column label="创建时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="showNext(scope.row.id)"
                     type="text"
                     size="small">查看下级</el-button>
          <el-button @click.native.prevent="showAddress(scope.row.id)"
                     type="text"
                     size="small">查看用户地址</el-button>
          <el-button @click.native.prevent="showUser(scope.row.id)"
                     type="text"
                     size="small">帮忙注册的用户</el-button> -->
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showSendMsg(scope.row.id,scope.row.phone)">发送短信</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id,1)">删除用户</el-dropdown-item>
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
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!-- 发送短信 -->
    <el-dialog title="发送短信"
               :visible.sync="showView1"
               width="50%"
               >
      <el-form ref="form"
               label-width="80px">
        <el-form-item label="短信内容" v-loading="loading">
          <el-input type="textarea"
                    v-model="msgContent"
                    style="width:400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="sendMsg()">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, delUser, putUser, sendMsgToOne } from "@/api/user"
import { getAddressList, getAddressById } from "@/api/address"
import { getdragDownList } from "@/api/dragDown"
import { getUserTeam } from "@/api/team"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      payclass: [],
      currentPage: 1,
      showView: false,
      showView1: false,
      // showView2: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        phone: null,
        name: null
      },
      // 发送短信
      msgContent: null,
      user_id: null,
      phone: null,
      loading: false
    }
  },
  mounted () {
    this.getUserList()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getUserList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getUserList()
    },
    // 发送短信
    sendMsg() {
      // this.loading = true
      // var data = {
      //   param: this.msgContent,
      //   userId: this.user_id,
      //   userPhone: this.phone
      // }
      // sendMsgToOne(data).then(res => {
      //   if (res.code == '200') {
      //     this.$message({
      //       type: 'success',
      //       message: '发送成功!'
      //     })
      //     this.loading = false
      //     this.showView4 = false
      //   }
      // })
    },
    showSendMsg (user_id, phone) {
      this.user_id = user_id
      this.phone = phone
      this.showView1 = true
    },
    // 删除普通用户
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getUserList()
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
    // 搜索
    onSubmit () {
      this.getUserList()
    },
    // 获取用户列表
    getUserList () {
      this.loading = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        rank: this.formInline.rank,
        phone: this.formInline.phone,
        name: this.formInline.name
      }
      getUserList(query).then(res => {
        console.log('获取到的用户列表', res)
        this.loading = false
        this.tableData = res.data.map(item => {
          if (item.status == 1) {
            item.status = '正常使用'
          } else if (item.status == 2) {
            item.status = '暂时停用'
          } else {
            item.status = '永久停用'
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
