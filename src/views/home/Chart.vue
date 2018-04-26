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
        <el-select v-model="filter.type" placeholder="" @change="typeChange">
          <el-option v-for="item in type.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>

  </el-col>
  <el-col :span="24" >

    <div style="width: 100%; min-height: 400px" id="chartPanel">

    </div>
  </el-col>

  <el-col :span="23" style="text-align:right; margin-top:30px;">
    <el-button type="primary" @click="enterHistory()">历史记录</el-button>
    <el-button  @click="returnHome">返 回</el-button>
  </el-col>
</el-row>
</template>

<script src="./chart.js"></script>
<style scoped lang="scss">
@import '~scss_vars';
.container {
  padding: 0 30px;
}


</style>
