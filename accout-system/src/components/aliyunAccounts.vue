<template>
    <el-table
      :data="records"
      style="width: 100%" 
      height="100%"
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
        prop="aliyun_account"
        label="阿里云账号"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="aliyun_password"
        label="阿里云密码"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="aliyun_record_password"
        label="阿里云备案密码"
        width="100"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="email_account"
        label="邮箱账号"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="email_password"
        label="邮箱密码"
        width="auto"
        align="center"
        >
        </el-table-column>
        <el-table-column
        prop="gongan_account"
        label="公安备案账号"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="gongan_password"
        label="公安备案密码"
        width="auto"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否正常使用"
        width="50"
        align="center"
        :formatter="toZhCode"
        >
      </el-table-column>
    </el-table>
</template>
<script>
import { getRecords } from '@/api/api';
export default {
  name: "aliyunAccounts",
  data() {
    return {
      records: []
    };
  },
  beforeMount(){
    this.getRecordsData();
  },
  methods: {
    getRecordsData(){
      var _this = this;
      this.$http({
        method:'get',
        url:getRecords
      })
      .then(res => {
        var result = res.data;
        //处理结果 添加编号
        result.forEach((ele,index) => {
          ele.num = index+1;
        });
        _this.records = result;
      })
    },
    toZhCode(row){
      return row.status == 0 ? '是' : row.status == 1 ? '否' : '未知'
    }
  }
};
</script>


<style scoped>

</style>
