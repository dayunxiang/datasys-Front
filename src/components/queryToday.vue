<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">当日用户查询</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- BORDERED TABLE -->
            <table class="table table-bordered">
              <thead>
              <tr>
                <th>账号</th>
                <th>英文<br>昵称</th>
                <th>中文<br>昵称</th>
                <th>班级</th>
                <th>学校</th>
                <th>创建<br>日期</th>
                <th>登陆<br>记录</th>
                <th>在线<br>时长</th>
                <th>小游戏时长</th>
                <th>视频<br>时长</th>
                <th>农场<br>时长</th>
                <th>作业<br>时间</th>
                <th>自由对话总数</th>
                <th>班级id</th>
                <th>作业完成总数</th>
                <th>作业正确率</th>
              </tr>
              </thead>
              <tbody v-for="item in queryData">
              <td>{{item.account}}</td>
              <td>{{item.Ename}}</td>
              <td>{{item.Cname}}</td>
              </tbody>
            </table>
          </div>
        </div>
        <!-- END BORDERED TABLE -->
      </div>
      <!-- OVERVIEW -->
    </div>
    <!-- END MAIN CONTENT -->
  </div>
  <!-- END MAIN -->
</template>
<script>
  export default ({
    name: 'vqueryToday',
    data() {
      return {
        queryData: []
      }
    },
    methods: {},
    created: function () {
      let vm = this;
      this.$axios.get("../static/data.json").then(function (response) {
        vm.queryData = response.data
      })
    }
  })
</script>
