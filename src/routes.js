import NotFound from './views/404.vue'
import Container from './views/container/Container.vue'
import Home from './views/home/Home.vue'
import Chart from './views/home/Chart.vue'
import History from './views/history/History.vue'
import Bind from './views/bind/Bind.vue'

import {
  LOGIN,
  PAGE404,
  HOME,
  CHART,
  HISTORY,
  BIND
} from '@/api/url-constants-front'
let routes = [

    {
      path: '/',
      component: Container,
      name: '首页',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          { path: '', component: Home, name: null},
          { path: CHART, component: Chart, name: '数据报表'},
          { path: HISTORY, component: History, name: '历史记录'},


      ]
    },
    {
      path: '/',
      component: Container,
      name: '首页',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          { path: BIND, component: Bind, name: '绑定设备'},



      ]
    },


    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: PAGE404 }
    }
];

export default routes;
