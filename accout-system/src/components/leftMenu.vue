<template>
<!-- menu -->
  <el-menu 
  class="el-menu-leftmenu" 
  router 
  :collapse="isCollapse"
  :collapse-transition="false"
  active-text-color="#00c1de"
  >
    <h2 class="text-center"> {{ sysName }}</h2>
    <div class="menuToggle" @click="changeMenuStatus">
      <div v-if="isCollapse">|||</div>
      <div v-else>三</div>
    </div>
    <nav-menu :navMenus="navMenus"></nav-menu>
 
  </el-menu>
  </template>
  <script>
import { getMenus } from "@/api/api";
import navMenu from "@/components/navMenu";
export default {
  name: "leftMenu",
  data() {
    return {
      sysName: "后台管理",
      hospitals: [],
      navMenus: []
    };
  },
  beforeMount() {
    var _this = this;
    //获取当前时间戳
    var nowTime = Date.parse(new Date());
    //获取浏览器时间戳
    var browserTime = localStorage.getItem("loginTime");
    if (browserTime) {
      var outTime = nowTime - browserTime;
    }
    //过期时间
    var loginOutTime = 60 * 60 * 1000 * 24 ;
    //过期重新请求
    if (outTime >= loginOutTime) {
      _this.$store.commit("LOGINOUT");
      _this.$router.push({ name: "login"});
    } else {
      //如果有localStorage就读取权限
      if (localStorage.getItem("user")) {
        //用户权限
        let loginAuthority = JSON.parse(localStorage.getItem("user")).type;
        /*判断权限  0 超级管理员 1 慈溪 2 绍兴 3 城东 4 上虞 5 宏恩
      */
        var _this = this;
        if (loginAuthority == "0") {
          //如果为超级管理员 则请求全部子医院菜单
          this.$http({
            method: "get",
            url: getMenus + loginAuthority
          }).then(res => {
            _this.navMenus = res.data;
          });
        } else {
          //否则请求对应id权限菜单
          this.$http({
            method: "get",
            url: getMenus + loginAuthority
          }).then(res => {
            _this.navMenus = res.data;
            // console.log(_this.navMenus);
          });
        }
      }
    }
  },
  mounted() {},
  methods: {
    changeMenuStatus() {
      this.$store.commit("changeMenuStatus");
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.menuStatus;
    }
  },
  components: {
    navMenu
  }
};
</script>


<style scoped>
.el-menu-leftmenu {
  float: left;
}
.el-menu-leftmenu:not(.el-menu--collapse) {
  width: 229px;
  height: 100%;
  overflow: hidden auto;
  float: left;
}
.text-center {
  text-align: center;
}
.menuToggle {
  cursor: pointer;
  text-align: center;
}
</style>
