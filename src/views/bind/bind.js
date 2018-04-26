import menus from '../menus';
import request from "superagent";;
import exception from "@/common/js/exception";
import util from "@/common/js/util";
import echart from 'echarts';
import {
  BIND_VEHICLE_LIST_API,
  BIND_DEVICE_API,
} from "@/api/url-constants";



export default {
    data() {
        return {

            token:"",
            filter: {
                page: 1,
                size: 10,
                vehicleNo: "",
            },
            pageSize: [10, 20, 30, 50],
            totalPage: 0,
            vehicleList: [],



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
          companyId: sessionStorage.getItem("companyId"),

        }

        request.get(BIND_VEHICLE_LIST_API)
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

          });
      },
      //绑定设备
      bindDevice(vehicle){
        let vm = this;
        vm.$prompt('请输入绑定设备号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          let tempParam = {
            vehicleId: parseInt(vehicle.id),
            deviceNumber: value
          }
          request.post(BIND_DEVICE_API)
            .set('Authorization', vm.token)
            .set('Accept', 'application/json')
            .send(tempParam)
            .type('form')
            .end(function(err, res){
                if(err !== null){
                    exception.handle(vm, err);
                    return false;
                }

                let result = res.body;
                if (result) {
                  vm.$message({
                    type: 'success',
                    message: '绑定成功'
                  });
                  vm.getList();
                }else {
                   vm.$message.error('绑定失败');
                }

            });


        });
      }

    },

    mounted() {
        var vm = this;


        vm.getList();

    },




}
