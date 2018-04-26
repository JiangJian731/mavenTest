<template>
<el-row :gutter="20" class="container">


  <el-col :span="24" class="content-block">
    <el-row :gutter="20">

      <el-col :span="6">
        <div class="detail-block">
          <div class="detail-block-title">全部数量</div>
          <div class="detail-block-value color-totle"><i class="fa fa-laptop fa-lg value-icon" />{{counter.total}}</div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="detail-block">
          <div class="detail-block-title">离线数量</div>
          <div class="detail-block-value color-offline"><i class="fa fa-laptop fa-lg value-icon" />{{counter.offline}}</div>
        </div>
      </el-col>

      <el-col :span="6" >
        <div class="detail-block">
          <div class="detail-block-title">正常数量</div>
          <div class="detail-block-value color-normal"><i class="fa fa-laptop fa-lg value-icon" />{{counter.normal}}</div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="detail-block">
          <div class="detail-block-title">报警数量</div>
          <div class="detail-block-value color-warning"><i class="fa fa-laptop fa-lg value-icon" />{{counter.alert}}</div>
        </div>
      </el-col>




    </el-row>

  </el-col>

  <el-col :span="24" class="content-block" style="margin-top: 10px;">
    <el-row :gutter="15">


      <div class="block-title">
        设备信息
      </div>


      <el-col :span="24" >
        <el-col :span="6"  style="padding-top: 10px;">
          <el-input v-model="filter.vehicleNo" placeholder="车牌号" ></el-input>
        </el-col>




        <el-col :span="2" style="padding-top: 10px;">
          <el-button type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
        </el-col>
        <el-col :span="24" style=" margin-top:20px">
        <el-table
           :data="vehicleList"
           style="width: 100%;">
           <el-table-column prop="companyName" label="公司名称" width="200">
             <template slot-scope="scope">
                <div class="table-text-block">
                  {{scope.row.companyName}}
                </div>
             </template>

           </el-table-column>
           <el-table-column prop="vehicleNo" label="车牌号" width="200">
             <template slot-scope="scope">
                <div class="table-text-block">
                  {{scope.row.vehicleNo}}
                </div>
             </template>
           </el-table-column>
           <el-table-column label="设备">
              <template slot-scope="scope">
                <el-col :span="6" v-for="point,index in scope.row.points">
                  <div class="device-panel"
                  :class="{'color-offline' : point.status === '离线', 'color-normal' : point.status === '正常', 'color-warning' : point.status === '告警'}">
                  <div  @click="enterChart(scope.row ,index)">

                    <div class="device-name">{{point.bname}}</div>
                    <div class="device-value">{{point.data}}</div>
                  </div>

                    <div class="device-scope"  @click="editScope(point, scope.row.deviceNumber)">
                      <i class="fa fa-pencil fa-lg" />
                      范围: {{point.min}} ~ {{point.max}} {{point.aname === '温度' ? '℃' : '%' }}
                    </div>
                    <div class="device-battery">
                      <i class="fa fa-lg fa-rotate-270"
                      :class="{'fa-battery-1': point.dl/25 == 1, 'fa-battery-2': point.dl/25 == 2, 'fa-battery-3': point.dl/25 == 3, 'fa-battery-4': point.dl/25 == 4 }" />
                    </div>

                  </div>
                </el-col>
              </template>
           </el-table-column>
        </el-table>
        </el-col>
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


      <el-dialog
        title="设置范围"
        :visible.sync="dialog.visible"
        width="30%">
        <el-col :span="24" style="margin-bottom: 50px">
          <el-col :span="10">
              <el-input v-model="dialog.min" placeholder="起始值">
                <template slot="prepend">起始值</template>
              </el-input>
          </el-col>
          <el-col :span="4" style="padding-top: 5px;padding-left: 0px; font-size: 20px; text-align: center">
              -
          </el-col>
          <el-col :span="10">
              <el-input v-model="dialog.max" placeholder="最大值">
              <template slot="prepend">最大值</template>
            </el-input>
          </el-col>
        </el-col>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitScope">修 改</el-button>
        </span>
      </el-dialog>




    </el-row>
  </el-col>
</el-row>
</template>

<script src="./home.js"></script>
<style scoped lang="scss">
@import '~scss_vars';
.color-totle{
  color: #434D40;
}
.color-offline{
  color: #999999;
}
.color-normal{
  color: #4089D3;
}
.color-warning{
  color: #F07136;
}

.bg-offline{
  background-color: #999999;
}
.bg-offline:hover{
  background-color: #666666;
}
.bg-normal{
  background-color: #4089D3;
}
.bg-normal:hover{
  background-color: #156AC1;
}
.bg-warning{
  background-color: #CE6F1C;
}
.bg-warning:hover{
  background-color: #BF4617;
}
.container {
    padding: 0 30px;
}

.content-block {

    .block-title {
        font-size: 26px;
        color: #666;
        padding-left: 10px;
        padding-bottom: 10px;
        border-bottom: 1.5px dashed #ccc;
        margin-bottom: 20px;
    }

    .detail-block {
        box-sizing: border-box;
        height: 120px;
        border-radius: 5px;
        font-size: 28px;
        line-height: 30px;
        background-color: #f9f9f9;
        border: 1px solid #e9e9e9;
        padding: 20px 10px;
        text-align: center;
        color: #666;
        .detail-block-title {
            font-size: 22px;
        }
        .detail-block-value {
            margin-top: 20px;
          .value-icon{
            margin-right: 20px;
          }
        }

    }
}

.table-text-block{
  height: 160px;
  text-align: center;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  line-height: 120px;
  padding: 20px;
  font-size:18px;
}

.device-panel{
  cursor: pointer;
  text-align: center;
  height: 160px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  font-size:16px;
  padding: 10px;
  .device-id, .device-name, .device-type{
    margin-bottom: 10px
  }

  .device-value{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    font-size: 40px;
    margin-bottom: 20px;
    min-height: 60px;
  }

  .device-scope{
    float: left;
    text-align: left;
    width: 80%;
    display: inline-block;
    font-size: 16px;
  }

  .device-battery{
    float: right;
    text-align: right;
    width: 20%;
    padding-left: 5px;
  }
}


</style>
