<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus" :key="navMenu.entity[0].id">
      <el-menu-item v-if="navMenu.childs==null&&navMenu.entity[0]"
                    :key="navMenu.entity[0].id" :data="navMenu" :index="navMenu.entity[0].name" :route="navMenu.entity[0].value"
                    >
        <i :class="navMenu.entity[0].icon"></i>
        <span slot="title">{{navMenu.entity[0].alias}}</span>
      </el-menu-item>
 
      <el-submenu v-if="navMenu.childs&&navMenu.entity[0]"
                  :key="navMenu.entity[0].id" :data="navMenu" :index="navMenu.entity[0].name">
        <template slot="title">
          <i :class="navMenu.entity[0].icon"></i>
          <span> {{navMenu.entity[0].alias}}</span>
        </template>
        <el-menu-item :index="sublistmenu.entity.value" v-for="sublistmenu in navMenu.childs" :key="sublistmenu.id">
        <i class="el-icon-location"></i>
        <span slot="title">{{sublistmenu.entity.alias}}</span>
      </el-menu-item>
      </el-submenu>
    </label>
 
  </div>
</template>
 
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>
 
<style scoped>
 
</style>
