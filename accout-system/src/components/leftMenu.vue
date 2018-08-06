<template>
<!-- menu -->
  <el-menu 
  class="el-menu-leftmenu" 
  router 
  :collapse="isCollapse"
  active-text-color="#00c1de"
  >
    <h1 class="text-center"> {{ sysName }} </h1>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">医院列表</span>
      </template>
      <el-menu-item index='/hospitals/0'>
        <i class="el-icon-location"></i>
        <span slot="title">所有下属医院</span>
      </el-menu-item>
      <el-menu-item :index="/hospitals/+hospital.id" v-for="(hospital,index) in hospitals" :key="hospital.id">
        <i class="el-icon-location"></i>
        <span slot="title">{{hospitals[index].name}}</span>
      </el-menu-item>
      
    </el-submenu>
    <el-menu-item index="/serviceInfo">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">服务器信息</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/aliyunAccounts">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">域名备案信息</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/attentions">
      <template slot="title">
        <i class="el-icon-warning"></i>
        <span slot="title">注意事项</span>
      </template>
    </el-menu-item>
  </el-menu>
  </template>
  <script>

import { getHospitals } from '@/api/api'
export default {
  name: "leftMenu",
  data() {
    return {
      sysName: "后台管理",
      isCollapse: false,
      hospitals: []
    };
  },
  beforeMount(){
    var _this = this;
    this.$http({
      method:'get',
      url:getHospitals
    })
    .then(res => {
      _this.hospitals = res.data
    })
  },
  mounted(){
    
  },
  methods: {
  }
};
</script>


<style scoped>
.el-menu-leftmenu:not(.el-menu--collapse) {
  width: 229px;
  height: 100%;
  overflow: hidden auto;
  float: left;
}
.text-center{
    text-align: center;
}

</style>
