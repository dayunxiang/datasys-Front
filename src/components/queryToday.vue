<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">昨日用户查询</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- BORDERED TABLE -->
            <!--<table class="table table-bordered">-->
              <!--<thead>-->
              <!--<tr>-->
                <!--<th>账号</th>-->
                <!--<th>英文<br>昵称</th>-->
                <!--<th>中文<br>昵称</th>-->
                <!--<th>班级</th>-->
                <!--<th>学校</th>-->
                <!--<th>创建日期</th>-->
                <!--<th>登陆记录</th>-->
                <!--<th>在线<br>时长</th>-->
                <!--<th>小游戏时长</th>-->
                <!--<th>视频<br>时长</th>-->
                <!--<th>农场<br>时长</th>-->
                <!--<th>作业<br>时间</th>-->
                <!--<th>自由对话总数</th>-->
                <!--<th>班级id</th>-->
                <!--<th>作业完成总数</th>-->
                <!--<th>作业正确率</th>-->
              <!--</tr>-->
              <!--</thead>-->
              <!--<tbody v-for="(item) in queryData">-->
              <!--<tr style="text-align: center">-->
                <!--<td>{{item.account}}</td>-->
                <!--<td>{{item.name}}</td>-->
                <!--<td style="word-break:keep-all">{{item.cname}}</td>-->
                <!--<td style="font-size:80%">{{item.class_name}}</td>-->
                <!--<td style="font-size:80%">{{item.school}}</td>-->
                <!--<td>{{item.create_date}}</td>-->
                <!--<td style="font-size:80%">{{item.loginTimeList}}</td>-->
                <!--<td>{{item.onlineTime}}</td>-->
                <!--<td>{{item.smallgameTime}}</td>-->
                <!--<td>{{item.videoTime}}</td>-->
                <!--<td>{{item.farmTime}}</td>-->
                <!--<td>{{item.homeworkTime}}</td>-->
                <!--<td>{{item.freechatTotal}}</td>-->
                <!--<td>{{item.class_id}}</td>-->
                <!--<td>{{item.homeworkTotal}}</td>-->
                <!--<td>{{item.homeworkAccuracy}}</td>-->
              <!--</tr>-->
              <!--</tbody>-->
            <!--</table>-->
            <v-table :data="data" :columns="columns"></v-table>
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
  import vTable from '@/components/common/vTable'
  export default ({
    name: 'vqueryToday',
    data() {
      return {
        columns:[
          {
            title:'账号',
            key:'account'
          },{
            title:'英文昵称',
            key:'name'
          },{
            title:'中文昵称',
            key:'cname',
              cellStyle:{
                wordBreak:'keep-all',
                minWidth:'7rem'
              }
          },{
            title:'班级',
            key:'class_name',
            cellStyle:{
              fontSize:'80%',
            }
          },{
            title:'学校',
            key:'school',
            cellStyle:{
              fontSize:'80%',
            }
          },{
            title:'创建日期',
            key:'create_date'
          },{
            title:'登录记录',
            key:'loginTimeList',
            cellStyle:{
              fontSize:'80%',
            }
          },{
            title:'在线时长',
            key:'onlineTime',
            sortable:true
          },{
            title:'小游戏时长',
            key:'smallgameTime',
            sortable:true
          },{
            title:'视频时长',
            key:'videoTime',
            sortable:true
          },{
            title:'农场时长',
            key:'farmTime',
            sortable:true
          },{
            title:'作业时间',
            key:'homeworkTime',
            sortable:true
          },{
            title:'自由对话总数',
            key:'freechatTotal',
            sortable:true
          },{
            title:'班级id',
            key:'class_id',
            sortable:true
          },{
            title:'作业完成总数',
            key:'homeworkTotal',
            sortable:true
          },{
            title:'作业正确率',
            key:'homeworkAccuracy',
            sortable:true
          }
        ],
        data:[]
      }
    },
    methods: {
      getTodayDate:function () {
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var strDate=date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var today=year+month+strDate
        return today
      }
    },
    created: function () {
      let vm = this;

      //获取当日日期
      let date=this.getTodayDate()-1
      console.log("昨日日期："+date)
      console.log("从服务器获取数据中...")
      //axios
      this.$axios.get("http://r.welingo.cn:55580/data/user?date_begin="+date+"&date_end="+date).then(function (response) {
        console.log("数据获取完毕")
        vm.data = response.data
      })
    },
    components: {
      vTable
    }
  })
</script>
