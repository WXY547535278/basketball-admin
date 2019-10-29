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
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 地址列表 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="userId"
                       label="用户id"
                       width="200"></el-table-column>
      <el-table-column prop="province"
                       label="省"
                       width="200"></el-table-column>
      <el-table-column prop="city"
                       label="市"
                       width="200"></el-table-column>
      <el-table-column prop="area"
                       label="区"
                       width="200"></el-table-column>
      <el-table-column prop="detail"
                       label="详细地址"
                       :show-overflow-tooltip="true"
                       width="200"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showList(scope.row.id)"
                     type="text"
                     size="small">查看详情</el-button>
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
    <el-dialog title="地址"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="showMessage"
               label-width="80px">
        <el-form-item label="省">
          <el-input v-model="showMessage.province"
                    style="width:auto"></el-input>
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="showMessage.city"
                    style="width:auto"></el-input>
        </el-form-item>
        <el-form-item label="区">
          <el-input v-model="showMessage.area"
                    style="width:auto"></el-input>
        </el-form-item>
        <el-form-item label="地址详情">
          <el-input type="text"
                    v-model="showMessage.detail"
                    style="width:400px"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAddressList, getAddressById } from "@/api/address"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      payclass: [],
      showView: false,
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        userId: null
      },
      showMessage: {
        province: null,
        city: null,
        area: null,
        detail: null
      }
    }
  },
  mounted () {
    this.getAddressList()
  },

  created () {
  },

  methods: {
    showList (id) {
      this.showView = true
      getAddressById(id).then(res => {
        console.log('获取到的地址列表', this.tableData)
        this.showMessage.province = res.data.province
        this.showMessage.city = res.data.city
        this.showMessage.area = res.data.area
        this.showMessage.detail = res.data.detail
      })
      console.log('获取到的短信id', id)
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getAddressList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getAddressList()
    },
    // 搜索
    onSubmit () {
      this.getAddressList()
    },
    // 获取地址列表
    getAddressList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        userId: this.formInline.userId
      }
      getAddressList(query).then(res => {
        console.log('获取地址列表', res.data)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    }
    // 格式化时间
    // parseTime (time) {
    //   return parseTime(time)
    // }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
