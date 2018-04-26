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
            points: '',
            //选择框选中的point,画表格赋值需要
            tempPoint: '',
            xAxis: [],
            maxLine: [],
            minLine: [],
            realLine: [],
            myChart: '',
            charOption: {
                title: {
                    text: ''
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: [],
                },
                yAxis: {},
                series: [],
                dataZoom: [
                    {   // 这个dataZoom组件，默认控制x轴。
                        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                        start: 0,      // 左边在 10% 的位置。
                        end: 60         // 右边在 60% 的位置。
                    },
                    {   // 这个dataZoom组件，也控制x轴。
                        type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                        start: 0,      // 左边在 10% 的位置。
                        end: 60         // 右边在 60% 的位置。
                    }
                ],
            },
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
      datePicker(date){
        let vm = this;
        vm.filter.startTime = date[0];
        vm.filter.endTime = date[1];
        vm.getChartData();
      },
      getChartData(){
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
              if (result) {
                for (var i = 0; i < result.length; i++) {
                  vm.xAxis.push(result[i].dateTime);
                  vm.maxLine.push(result[i].max);
                  vm.minLine.push(result[i].min);
                  vm.realLine.push(result[i].val);

                }
              }
              vm.drawChart();
          });

      },
      drawChart(){
        let vm = this;
        vm.myChart = echart.init(document.getElementById('chartPanel'));
        vm.charOption.title.text = vm.$route.params.id + '-' + vm.tempPoint.bname;
        vm.charOption.legend.data = ['最高阈值','最低阈值', vm.tempPoint.bname,];
        vm.charOption.xAxis.data = vm.xAxis;
        vm.charOption.series = [{
            name: '最高阈值',
            type: 'line',
            data: vm.maxLine,
            lineStyle: {
              normal: {
                  width: 3,
              }
            },
          },{
            name: '最低阈值',
            type: 'line',
            data: vm.minLine,
            lineStyle: {
              normal: {
                  width: 3,
              }
            },
          },{
            name: vm.tempPoint.bname,
            type: 'line',
            data: vm.realLine,
            lineStyle: {
              normal: {
                  width: 3,
              }
            },
          },];
        vm.myChart.setOption(vm.charOption);


      },
      
      returnHome(){
          window.history.go(-1);
      },
      enterHistory(){
        let vm = this;
        vm.$router.push({path:'/history/' + vm.$route.params.id, query: {maddress : vm.filter.maddress}})
      },
      typeChange(val){

        let vm = this;
        vm.filter.maddress = vm.filter.type;
        vm.getChartData();
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


          let tempOption = {
            value: vm.points[i].maddress,
            label: vm.points[i].bname,
          };
          vm.type.options.push(tempOption);
      }

      vm.tempPoint = vm.points[vm.$route.query.index]
      vm.filter.maddress = vm.points[vm.$route.query.index].maddress;
      vm.filter.type = vm.points[vm.$route.query.index].bname

    },
    mounted() {
        var vm = this;
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        let tempContext = JSON.parse(sessionStorage.getItem("CONTEXT"))

        vm.getChartData();

    },




}
