<template>
    <div style="height:100%;">
      <el-table
      :data="hospitals"
      style="width: 100%" 
      height="100%"
      highlight-current-row
      stripe
      border
      @cell-click="toLoginUrl"
      >
      <el-table-column
        prop="num"
        label="序号"
        width="50px"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="backstageurl"
        label="后台登录地址"
        width="350px"
        align="center"
        :formatter=linkBackstageurl
        >
      </el-table-column>
      <el-table-column
        prop="account"
        label="后台登录账号"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="password"
        label="后台登录密码"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100px"
        align="center"
        :formatter=formatter
        >
      </el-table-column>
      <el-table-column 
      label="操作"
      width="auto"
      align="center"
      >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog title="数据操作" :visible.sync="isShowEditVisible">
      <el-form label-width="80px" :model="temp" ref="dataForm">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="后台地址" prop="backstageurl">
          <el-input v-model="temp.backstageurl"></el-input>
        </el-form-item>
        <el-form-item label="后台账号" prop="account">
          <el-input v-model="temp.account"></el-input>
        </el-form-item>
        <el-form-item label="后台密码" prop="password">
          <el-input v-model="temp.password"></el-input>
        </el-form-item>
        <el-form-item label="网站类型" prop="type">
          <el-input v-model="temp.type"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData" class="title1">确定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import {
  getSubHospitals,
  getAllSubHospitals,
  updateHospitals,
  delHospitals
} from "@/api/api";
export default {
  name: "cxcdContent",
  data() {
    return {
      hospitals: [],
      openUrl: "",
      isShowEditVisible: false,
      temp: {}
    };
  },
  beforeMount() {
    this.getSubHospitalsData();
  },
  mounted() {},
  methods: {
    toLoginUrl(row, event, column) {
      var isUrl = column.innerText.indexOf("//") > -1;
      if (isUrl) {
        window.open("//" + row.url + "/" + row.backstageurl);
      }
    },
    formatter(row) {
      return row.type == 0 ? "PC" : row.type == 1 ? "mobile" : "未知";
    },
    linkBackstageurl(row) {
      return "//" + row.url + "/" + row.backstageurl;
    },
    getSubHospitalsData() {
      var _this = this;
      var requestRoute = this.$route.path.substr(11, 12);
      var requestUrl = "";
      if (requestRoute == null || requestRoute == "") {
        requestUrl = getAllSubHospitals;
      } else {
        requestUrl = getSubHospitals + requestRoute;
      }
      this.$http({
        method: "get",
        url: requestUrl
      }).then(res => {
        var result = res.data;
        //处理结果 添加编号
        result.forEach((ele, index) => {
          ele.num = index + 1;
        });
        _this.hospitals = result;
      });
    },
    handleEdit(index, row) {
      this.isShowEditVisible = true;
      this.temp = Object.assign({}, row);
    },
    handleDel(index, row) {
      this.temp = Object.assign({}, row);
      const tempData = Object.assign({}, this.temp);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(tempData)
          console.log(tempData.id)
          this.$http
            .delete(delHospitals+tempData.id, { id: tempData.id })
            .then(res => {
              console.log(res);
              if (res.data.code == "0000") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!"
          });
        });
    },
    updateData() {
      const tempData = Object.assign({}, this.temp);
      this.isShowEditVisible = false;
      this.$http
        .put(updateHospitals+tempData.id, {
          id: tempData.id,
          name: tempData.name,
          backstageurl: tempData.backstageurl,
          account: tempData.account,
          password: tempData.password,
          type: tempData.type
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.temp = {};
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "warning ",
            message: res.data.msg
          });
        });
    }
  },
  watch: {
    $route: "getSubHospitalsData",
    temp: "getSubHospitalsData"
  }
};
</script>


<style scoped>
</style>
