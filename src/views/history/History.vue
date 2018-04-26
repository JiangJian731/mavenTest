<template>
<el-row :gutter="10" class="container">
  <el-col :span="24" style="margin-bottom:20px;">

      <el-col :span="8">
        <el-date-picker
          style="width:380px"
          v-model="filter.date"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          @change="datePicker">
        </el-date-picker>
      </el-col>

      <el-col :span="6">
        <el-select v-model="filter.type" placeholder="" @change="typeChange" >
          <el-option v-for="item in type.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>

  </el-col>
  <el-col :span="24" >
    <el-table :data="showList"
      style="width: 100%">
      <el-table-column prop="deviceNumber" label="设备编号" >
      </el-table-column>
      <el-table-column prop="val" label="数据">
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设定范围">
        <template slot-scope="scope">
          <span>{{scope.row.min}} ~ {{scope.row.max}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="报警状态">
      </el-table-column>
      <el-table-column prop="dateTime" label="时间">
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

  <el-col :span="23" style="text-align:right; margin-top:30px;">
     <el-button type="primary" @click="returnHome">返 回</el-button>
  </el-col>
</el-row>
</template>

<script src="./history.js"></script>
<style scoped lang="scss">
@import '~scss_vars';
.container {
  padding: 0 30px;
}


</style>
