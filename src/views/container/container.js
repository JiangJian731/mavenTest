import menus from '../menus'
import "font-awesome/css/font-awesome.min.css";
export default {
    data() {
        return {
            sysName:'温度检测系统',
            subSysName:" ",
            collapsed:false,
            sysUserName: '',
            sysUserAvatar: '',
            menus:menus,
            viewTitle:"首页",
            defaultActive: 0,
            defaultSubActive:""
        }
    },
    methods: {

        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user');
                _this.$router.push('/login');
            }).catch(() => {

            });
        },

    },
    beforeMount(){
      let vm = this;
      sessionStorage.setItem("companyId", vm.$route.query.companyId);
    },
    mounted() {
      var vm = this;
        console.log(vm.$route.query.companyId);

        if (vm.$route.query.companyId == 0) {
          vm.menus = menus.admin;
        }else {
          vm.menus = menus.normalUser;
        }
        var narBarCol = document.getElementById("narBar-col");
        var navBar = document.getElementById("navBar");
        navBar.style.height = narBarCol.clientHeight + "px";

    },

}
