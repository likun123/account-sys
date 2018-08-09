<template>
  <div class="home">
    <left-menu></left-menu>
    <div class="mainContent" :class="menuStatus ? 'menuClose':''">
      <div class="main-info-header">
        账户名称：{{user.name}}
        <span class="loginOut" @click="loginOut">退出</span>
      </div>
      <div class="main-body"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import leftMenu from "@/components/leftMenu.vue";
export default {
  name: "home",
  data() {
    return {
      user:{}
    };
  },
  beforeMount(){
    const user = JSON.parse(localStorage.getItem('user'))
    this.user = user  
  },
  methods: {
    loginOut(){
      this.$store.commit('LOGINOUT');
      this.$router.push('/login')
    }
  },
  computed:{
    menuStatus(){
      return this.$store.state.app.menuStatus
    }
  },
  components:{
    leftMenu
  }
};
</script>


<style scoped>
.home{
  height: 100%;
}
.text-center {
  text-align: center;
}
.mainContent{
    width: calc(100% - 230px);
    float: left;
    overflow: hidden auto;
    height: 100%;
}
.menuClose.mainContent{
  width: calc(100% - 65px);
}
.main-info-header{
  text-align: right;
  height: 20px;
  padding:10px 20px;
}
.main-body{
  height:calc(100% - 44px);
}
.loginOut{
  cursor: pointer;
  color:#0086ff;
  margin-left: 20px;
}
</style>
