<template>
    <el-table
      :data="servicesInfo"
      style="width: 100%" 
      highlight-current-row
      stripe
      border
      >
      <el-table-column
        prop="num"
        label="序号"
        width="50px"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="env"
        label="环境"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="account"
        label="服务器登录账号"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="password"
        label="服务器登录密码"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="port"
        label="端口"
        width="100px"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="sql_add"
        label="数据库地址"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="sql_pwd"
        label="数据库密码"
        width="auto"
        align="center"
        >
      </el-table-column>
    </el-table>
</template>
<script>
import { getServices } from "@/api/api";
export default {
  name: "servicesInfo",
  data() {
    return {
      servicesInfo: []
    };
  },
  beforeMount() {
    this.getServicesData();
  },
  methods: {
    getServicesData() {
      var _this = this;
      this.$http({
        method: "get",
        url: getServices
      }).then(res => {
        var result = res.data;
        //处理结果 添加编号
        result.forEach((ele,index) => {
          ele.num = index+1;
        });
        _this.servicesInfo = result;
      });
    }
  }
};
</script>


<style scoped>

</style>
