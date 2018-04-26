import menus from '../menus';
import request from "superagent";;
import exception from "@/common/js/exception";
import util from "@/common/js/util"
import {
  VEHICLE_LIST_API,
  VEHICLE_SCOPE_CHANGE_API,
  DEVICE_COUNT_API
} from "@/api/url-constants";

import {

} from "@/api/url-constants-front";

export default {
    data() {
        return {
            companyId: "",
            token:"",
            filter: {
                page: 1,
                size: 5,
                vehicleNo: "",
            },
            pageSize: [5, 10, 15, 20],
            totalPage: 0,
            counter: '',
            //车辆列表
            vehicleList:[],
            //范围修改面板
            dialog: {
              visible: false,
              deviceNumber: '',
              maddress: '',
              min: '',
              max: ''
            },


        }
    },
    methods: {
        //改变页码
        handleCurrentPageChange(val){
          var vm = this;
          vm.filter.page = val;

          vm.getList();
        },

        //改变每页显示的条数
        pageSizeChange(pagesize){
          var vm = this;
          vm.filter.size = pagesize;
          vm.getList();
        },


        //获取设备列表信息
        getList(val){

          var vm = this;
          //判断是否是点击搜索按钮，如果是就将页码设置为1
          if (val != null && val != "") {
            vm.filter.page = 1
          }

          let tempParam = {
            page: vm.filter.page - 1,
            size: vm.filter.size,
            vehicleNo: vm.filter.vehicleNo,
            companyId: vm.companyId,

          }

          request.get(VEHICLE_LIST_API)
            .set('Authorization', vm.token)
            .set('Accept', 'application/json')
            .query(tempParam)
            .end(function(err, res){
                if(err !== null){
                    exception.handle(vm, err);
                    return false;
                }

                let result = res.body;
                vm.vehicleList = result.results;
                vm.counter = result.counter;

            });
        },
        //打开修改范围的面板
        editScope(point, deviceNumber){
          let vm = this;
          vm.dialog.visible = true;
          vm.dialog.deviceNumber = deviceNumber;
          vm.dialog.maddress = point.maddress;
          vm.dialog.min = point.min;
          vm.dialog.max = point.max;
        },

        //提交修改信息
        submitScope(){
          let vm = this;
          let tempParam = {
            deviceNumber: vm.dialog.deviceNumber,
            maddress: vm.dialog.maddress,
            min: vm.dialog.min,
            max: vm.dialog.max,
          }
          request.put(VEHICLE_SCOPE_CHANGE_API)
            .set('Authorization', vm.token)
            .set('Accept', 'application/json')
            .send(tempParam)
            .end(function(err, res){
                if(err !== null){
                    exception.handle(vm, err);
                    return false;
                }

                let result = res.body;
                if (result) {
                  vm.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                }else {
                  vm.$message.error('修改失败');
                }

            });

            vm.dialog.visible = false;
            vm.getList();
        },
        enterChart(vehicle, index){
          let vm = this;

          sessionStorage.setItem("points", JSON.stringify(vehicle.points));
          vm.$router.push({path:'/chart/' + vehicle.deviceNumber, query: {index : index}})
        },


        exportSheet(){
          var vm = this;
          let tempParam = {
            page: vm.filter.page - 1,
            size: vm.filter.size,
            deviceId: vm.filter.deviceId,
            deviceName: vm.filter.deviceName,
            sensor: vm.filter.sensor,
          }
          request.post(EXPORT_AD_PUTTING_API)
            .set('Authorization', vm.token)
            .responseType('blob')
            .send(tempParam)
            .end(function(err, res){
                if(err !== null){
                    exception.handle(vm, err);
                    return false;
                }
                let result = res;

                var disposition = res.headers['content-disposition'];
                disposition = decodeURI(disposition);
                var filename = util.getFileNameFromContentDisposition(disposition, 'attachment');
                var blob = new Blob([res.body],{type:res.headers['content-type']});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            });
        }

    },
    mounted() {
        var vm = this;
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        let companyId = sessionStorage.getItem('companyId');
        if (companyId && companyId !== 'undefined'){
          vm.companyId = companyId;
        }else {
          vm.companyId = 0;
        }

        vm.getList();





    }
}
