<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">

      <el-form-item label="下单人id">
        <el-input v-model="formInline.leekId"
                  placeholder="下单人id"></el-input>
      </el-form-item>
      <el-form-item label="下单人姓名">
        <el-input v-model="formInline.leekName"
                  placeholder="下单人姓名"></el-input>
      </el-form-item>
      <el-form-item label="下单人电话">
        <el-input v-model="formInline.leekPhone"
                  placeholder="下单人电话"></el-input>
      </el-form-item>

      <el-form-item label="下单人当前等级">
        <el-input v-model="formInline.rank"
                  placeholder="下单人当前等级"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="formInline.status"
                   placeholder="订单状态"
                   @change="onSubmit">
          <el-option label="还未审核"
                     value="1"></el-option>
          <el-option label="已经审核/待发货 "
                     value="2"></el-option>
          <el-option label="已发货/未收货"
                     value="3"></el-option>
          <el-option label="已收货/未评论"
                     value="4"></el-option>
          <el-option label="已评论"
                     value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送类型">
        <el-select v-model="formInline.deliveryType"
                   placeholder="配送类型"
                   @change="onSubmit">
          <el-option label="自提"
                     value="1"></el-option>
          <el-option label="邮寄"
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
                       label="订单id"
                       width="250"></el-table-column>
      <el-table-column prop="shopId"
                       label="店铺id"
                       width="250"></el-table-column> -->
      <!-- 下单人 -->
      <el-table-column prop="leekId"
                       label="下单人id"
                       width="150"></el-table-column>
      <el-table-column prop="leekName"
                       label="下单人姓名"
                       width="150"></el-table-column>
      <el-table-column prop="leekPhone"
                       label="下单人电话"
                       width="150"></el-table-column>
      <el-table-column prop="leekWechat"
                       label="下单人微信"
                       width="150"></el-table-column>
      <el-table-column prop="leekZfb"
                       label="下单人支付宝"
                       width="150"></el-table-column>
      <el-table-column label="下单人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.leekImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="status"
                       label="订单状态"
                       width="150"></el-table-column>
      <el-table-column prop="deliveryType"
                       label="配送类型"
                       width="150"></el-table-column>
      <el-table-column prop="rank"
                       label="下单人当前等级"
                       width="150"></el-table-column>
      <el-table-column prop="aldebaran"
                       label="下单人下单后等级"
                       width="150"></el-table-column>
      <el-table-column prop="amount"
                       label="订单总金额"
                       width="150"></el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       width="150"></el-table-column>
      <el-table-column label="下单时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.orderTime) }}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showOrderDetail(scope.row.id)"
                     type="text"
                     size="small">查看订单详情</el-button>
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

    <!-- 查看订单详情  -->
    <el-dialog title="查看详情"
               :visible.sync="showView"
               width="80%">
      <el-table :data="orderDetail">
        <!-- <el-table-column prop="id"
                         label="id"
                         width="300"></el-table-column>
        <el-table-column prop="productId"
                         label="产品id"
                         width="300"></el-table-column> -->
        <el-table-column prop="name"
                         label="产品名"
                         width="300"></el-table-column>
        <el-table-column label="图片"
                         width="150">
          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="JSON.parse(scope.row.banner)"
                 fit="fill" /></template>
        </el-table-column>
        <el-table-column prop="skuId"
                         label="规格id"
                         width="300"></el-table-column>
        <el-table-column prop="skuName"
                         label="规格名"
                         width="300"></el-table-column>
        <el-table-column prop="num"
                         label="购买数量"
                         width="300"></el-table-column>
        <el-table-column prop="price"
                         label="价格"
                         width="300"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { getOrderList, getOrderDetail } from "@/api/order"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      orderDetail: null,
      putForm: {
        id: null,
        status: null
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        leekId: null,
        shopId: null,
        leekName: null,
        leekPhone: null,
        status: null,
        rank: null,
        deliveryType: null
      }
    }
  },
  mounted () {
    this.getOrderList()
  },

  created () {
  },

  methods: {
    // 查看订单详情
    showOrderDetail (orderId) {
      this.showView = true
      console.log('获取到的订单id', orderId)
      getOrderDetail(orderId).then(res => {
        console.log('获取订单详情', res)
        this.orderDetail = res.data
      })
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getOrderList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getOrderList()
    },
    // 搜索
    onSubmit () {
      this.getOrderList()
    },
    // 获取订单列表
    getOrderList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        status: this.formInline.status,
        leekId: this.formInline.leekId,
        deliveryType: this.formInline.deliveryType,
        shopId: this.formInline.shopId,
        rank: this.formInline.rank,
        leekPhone: this.formInline.leekPhone,
        leekName: this.formInline.leekName
      }
      getOrderList(query).then(res => {
        console.log('获取订单列表', res)
        this.tableData = res.data.map(item => {
          if (item.status == 1) {
            item.status = '还未审核 '
          } else if (item.status == 2) {
            item.status = '已经审核/待发货'
          } else if (item.status == 3) {
            item.status = '已发货/未收货'
          } else if (item.status == 4){
            item.status = '已收货/未评论'
          } else {
            item.status = '已评论 '
          }
          if (item.deliveryType == 1) {
            item.deliveryType = '自提'
          } else {
            item.deliveryType = '邮寄'
          }
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 删除订单
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
