<template>
    <div style="height:100%;">
  <div class="search-con">
    <el-form :inline="true" :model="searchStr" class="demo-form-inline">
  <el-form-item label="名称">
    <el-input v-model="searchStr.name.search" placeholder="请输入搜索医院名称"></el-input>
  </el-form-item>
  <el-form-item label="网站类型">
    <el-select v-model="searchStr.type.search" >
      <el-option label="--请选择--" value=""></el-option>
      <el-option label="pc" value="0"></el-option>
      <el-option label="mobile" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="searchFunc">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </el-form-item>
</el-form>
  </div>
      <el-table
      :data="hospitals"
      style="width: 100%" 
      height="calc(100% - 151px)"
      highlight-current-row
      stripe
      border
      @selection-change="handleSelectionChange"
      @cell-click="toLoginUrl"
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="num"
        label="序号"
        width="50"
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
        width="350"
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
        width="100"
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
    <el-pagination 
      class="pagenation"
      background
      layout="prev, pager, next"
      @current-change="searchFunc"
      :current-page="currentpage"
      :total="countall">
    </el-pagination>
    <el-dialog title="添加子网站" :visible.sync="isShowAddVisible">
      <el-form label-width="80px" :model="temp" ref="dataForm1">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="父级医院" prop="pid">
          <el-select v-model="temp.pid" >
            <el-option label="--请选择--" value=""></el-option>
            <el-option label="慈溪城东医院" value="1"></el-option>
            <el-option label="绍兴城东医院" value="2"></el-option>
            <el-option label="杭州城东医院" value="3"></el-option>
            <el-option label="上虞第三医院" value="4"></el-option>
            <el-option label="宏恩集团" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站链接" prop="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="后台地址" prop="backstageurl">
          <el-input placeholder="(dede修改后目录名称)" v-model="temp.backstageurl"></el-input>
        </el-form-item>
        <el-form-item label="后台账号" prop="account">
          <el-input v-model="temp.account"></el-input>
        </el-form-item>
        <el-form-item label="后台密码" prop="password">
          <el-input v-model="temp.password"></el-input>
        </el-form-item>
        <el-form-item label="网站类型" prop="type">
          <el-select v-model="temp.type" >
            <el-option label="--请选择--" value=""></el-option>
            <el-option label="pc" value="0"></el-option>
            <el-option label="mobile" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddVisible = false">取消</el-button>
        <el-button type="primary" @click="addHospital" class="title1">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="数据操作" :visible.sync="isShowEditVisible">
      <el-form label-width="80px" :model="temp" ref="dataForm">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="后台域名" prop="name">
          <el-input v-model="temp.url"></el-input>
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
  delHospitals,
  addHospitals,
  search
} from "@/api/api";
import util from "@/utils/util";
export default {
  name: "cxcdContent",
  data() {
    return {
      hospitals: [],
      openUrl: "",
      isShowEditVisible: false,
      isShowAddVisible: false,
      temp: {},
      searchStr: {
        name: {
          search: "",
          type: "name"
        },
        type: {
          search: "",
          type: "type"
        }
      },
      countall:0,
      multipleSelection:[],
      currentpage:1
    };
  },
  beforeMount() {
    if(localStorage.getItem("user")){
      this.searchFunc();
    }
    
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
      var id = this.$route.params.id || JSON.parse(localStorage.getItem("user")).type;
      var requestUrl = "";
      //requestRoute 0 所有子医院 x 各分院下的子医院
      if (id == undefined || id == "" || id == null) {
        requestUrl = getAllSubHospitals;
      } else {
        requestUrl = getSubHospitals + id;
      }
      this.$http({
        method: "get",
        url: requestUrl
      }).then(res => {
        var result = res.data.data;
        util.orderNum(result);
        _this.hospitals = result;
        _this.countall = res.data.count;
      });
    },
    handleEdit(index, row) {
      this.isShowEditVisible = true;
      this.temp = Object.assign({}, row);
    },
    handleAdd(index, row) {
      this.isShowAddVisible = true;
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
          this.$http
            .delete(delHospitals + tempData.id, { id: tempData.id })
            .then(res => {
              if (res.data.code == "0000") {
                this.temp = {};
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
        .put(updateHospitals + tempData.id, {
          id: tempData.id,
          url: tempData.url,
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
    },
    searchFunc(val) {
      val = typeof val === "number" ? val : 1;
      this.currentpage = val;
      var _this = this;
      //获取医院类表类型
      var id = this.$route.params.id || JSON.parse(localStorage.getItem("user")).type;
      var requestUrl = search;
      let types = [],
      searchStrs = [];
      types.push(_this.searchStr.name.type, _this.searchStr.type.type);
      searchStrs.push(_this.searchStr.name.search, _this.searchStr.type.search);

      this.$http
        .post(requestUrl, {
          id: id,
          types: types,
          searchStrs: searchStrs,
          pagenum:val
        })
        .then(res => {
          var result = res.data.data;
          //处理结果 添加编号
          util.orderNum(result);
          _this.hospitals = result;
          _this.countall = res.data.count;
        });
    },
    addHospital() {
      const tempData = Object.assign({}, this.temp);
      this.isShowAddVisible = false;
      this.$http
        .post(addHospitals, {
          id: tempData.id,
          name: tempData.name,
          backstageurl: tempData.backstageurl,
          account: tempData.account,
          password: tempData.password,
          type: tempData.type,
          pid: tempData.pid,
          url: tempData.url
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.temp = {};
          } else {
            this.$message({
              type: "warning",
              message: res.data.errors[0].message
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "warning ",
            message: res.data.errors[0].message
          });
        });
    },
    handleSelectionChange(val){
      this.multipleSelection=val
      // console.log(this.multipleSelection)
    }
  },
  watch: {
    $route: "searchFunc",
    temp: "searchFunc"
  }
};
</script>


<style scoped>
.search-con {
  border-top: 1px solid #ddd;
  padding: 20px 20px 0 20px;
  height: 63px;
  max-height: 63px;
}
.pagenation{
  max-height: 81px;
  padding:20px;
  text-align: center
}
</style>
