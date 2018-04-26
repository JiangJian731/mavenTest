import menus from '../menus';
import request from "superagent";;
import exception from "@/common/js/exception";
import util from "@/common/js/util";
import echart from 'echarts';
import {
  POINT_CHART_API
} from "@/api/url-constants";

import {
  SCHEDULE_DETAIL,
  POPULARIZE_ADVISERTISING
} from "@/api/url-constants-front";


export default {
    data() {
        return {

            token:"",
            filter: {
                size: 10,
                date: '',
                timeInterval: 1,
                startTime: "",
                endTime: "",
                type:"",
                maddress: "",
            },
            pageSize: [10, 20, 30, 50],
            totalPage: 0,
            type:{
                value: "",
                options:[]
            },
            //通过session传过来的检测点
            points: '',
            //从上个页面进入时，对应的point
            tempPoint: '',
            //查询后得到检测点的详细信息
            pointDetails: [],
            showList: [],
            pickerOptions: {
              disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '最近1小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 );
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '最近6小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 6);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近12小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 12);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近24小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            }]
          },


        }
    },
    methods: {
      //改变页码
      handleCurrentPageChange(val){
        var vm = this;
        vm.filter.page = val;
        vm.showList = vm.pointDetails.slice((val - 1) * vm.filter.size , val * vm.filter.size);
      },

      //改变每页显示的条数
      pageSizeChange(pagesize){
        var vm = this;
        vm.filter.size = pagesize;
        vm.showList = vm.pointDetails.slice(0, vm.filter.size);
      },
      //日期选中后触发，将日期的值赋值给filter
      datePicker(date){
        let vm = this;
        vm.filter.startTime = date[0];
        vm.filter.endTime = date[1];
        vm.getData();
      },
      //获取历史记录
      getData(){
        let vm = this;
        let tempParam = {
          startTime: vm.filter.startTime,
          endTime: vm.filter.endTime,
          deviceNumber: vm.$route.params.id,
          maddress: vm.filter.maddress,
        }
        request.get(POINT_CHART_API)
          .set('Authorization', vm.token)
          .set('Accept', 'application/json')
          .query(tempParam)
          .end(function(err, res){
              if(err !== null){
                  exception.handle(vm, err);
                  return false;
              }

              let result = res.body.results;
              vm.pointDetails = result;
              vm.showList = vm.pointDetails.slice(0, vm.filter.size);

              vm.totalPage = vm.pointDetails.length;
          });

      },

      returnHome(){
          window.history.go(-1);
      },
      typeChange(val){
        let vm = this;


        vm.filter.maddress = vm.filter.type;

        vm.getData();
      },

    },
    beforeMount(){
      let vm = this;
      let now = new Date();
      let beforeNow = new Date();
      beforeNow = beforeNow.setTime(now.getTime() - 3600 * 1000);
      beforeNow = new Date(beforeNow);
      let endT = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate() + " " + (now.getHours() - 1) + ":" + now.getMinutes() + ":" + now.getMinutes();
      let startT = beforeNow.getFullYear() + "-" + (beforeNow.getMonth()+1) + "-" + beforeNow.getDate() + " " + (beforeNow.getHours() - 1) + ":" + beforeNow.getMinutes() + ":" + beforeNow.getMinutes();
      vm.filter.startTime = startT;
      vm.filter.endTime = endT;
      vm.filter.date = [startT, endT];
      vm.points = JSON.parse(sessionStorage.getItem("points"))


      for (var i = 0; i < vm.points.length; i++) {
        if (vm.$route.query.maddress == vm.points[i].maddress) {
          vm.tempPoint = vm.points[i]
        }
          let tempOption = {
            value: vm.points[i].maddress,
            label: vm.points[i].bname,
          };
          vm.type.options.push(tempOption);
      }
    
      vm.filter.maddress = vm.tempPoint.maddress;
      vm.filter.type = vm.tempPoint.bname

    },
    mounted() {
        var vm = this;
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        let tempContext = JSON.parse(sessionStorage.getItem("CONTEXT"))

        vm.getData();

    },




}
