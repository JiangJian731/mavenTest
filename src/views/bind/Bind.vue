<template>
<el-row :gutter="10" class="container">
  <el-col :span="24" style="margin-bottom:20px;">

    <el-col :span="6"  style="padding-top: 10px;">
      <el-input v-model="filter.vehicleNo" placeholder="车牌号" ></el-input>
    </el-col>



    <el-col :span="2" style="padding-top: 10px;">
      <el-button type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
    </el-col>

  </el-col>
  <el-col :span="24" >
    <el-table :data="vehicleList"
      style="width: 100%">
      <el-table-column prop="vehicleNo" label="车牌号" >
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" >
      </el-table-column>
      <el-table-column prop="companyName" label="所属公司">
      </el-table-column>
      <el-table-column prop="bindTime" label="绑定时间">
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button plain @click="bindDevice(scope.row)">绑定设备</el-button>
        </template>
      </el-table-column>


    </el-table>



  </el-col>

  <el-col :span="24" class="toolbar">
    <span>每页显示：</span>
    <el-select v-model="filter.size" placeholder="请选择" style="width:100px;" @change="pageSizeChange">
      <el-option
        v-for="item in pageSize"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="filter.page"
     :page-size="filter.size" :total="totalPage" style="float:right;">
    </el-pagination>
  </el-col>


</el-row>
</template>

<script src="./bind.js"></script>
<style scoped lang="scss">
@import '~scss_vars';
.container {
  padding: 0 30px;
}


</style>
