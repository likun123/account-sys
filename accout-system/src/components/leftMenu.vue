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
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">医院列表</span>
      </template>
      <el-menu-item index='/hospitals'>
        <i class="el-icon-location"></i>
        <span slot="title">所有下属医院</span>
      </el-menu-item>
      <el-menu-item :index="/hospitals/+hospital.id" v-for="(hospital,index) in hospitals" :key="hospital.id">
        <i class="el-icon-location"></i>
        <span slot="title">{{hospitals[index].name}}</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">服务器信息</span>
      </template>
      <el-menu-item index="/serviceInfo">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">服务器信息</span>
      </template>
    </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">域名备案信息</span>
      </template>
      <el-menu-item index="/aliyunAccounts">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">域名备案信息</span>
      </template>
    </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-warning"></i>
        <span slot="title">域名备案信息</span>
      </template>
      <el-menu-item index="/attentions">
      <template slot="title">
        <i class="el-icon-warning"></i>
        <span slot="title">注意事项</span>
      </template>
    </el-menu-item>
    </el-submenu>
  </el-menu>
  </template>
  <script>
import { getHospitals } from "@/api/api";
export default {
  name: "leftMenu",
  data() {
    return {
      sysName: "后台管理",
      hospitals: []
    };
  },
  beforeMount() {
    var _this = this;
    this.$http({
      method: "get",
      url: getHospitals
    }).then(res => {
      _this.hospitals = res.data;
    });
  },
  mounted() {},
  methods: {
    changeMenuStatus(){
      this.$store.commit('changeMenuStatus');
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.app.menuStatus
    }
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
.menuToggle{
  cursor: pointer;
  text-align: center
}
</style>
