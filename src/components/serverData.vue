<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">分服数据</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- CHOOSEBOARD -->
            <div class="row">
              <div class="col-md-2">
                <select class="form-control" v-model="selectedArea">
                  <option disabled value="">全国</option>
                </select>
              </div>
              <div class="col-md-2">
                <select class="form-control" v-model="selectedServer">
                  <option disabled value="">全服</option>
                </select>
              </div>
              <div class="col-md-7">
                <div class="input-group">
                  <button type="button" class="form-control" id="daterange-btn">
                    <i class="fa fa-calendar"></i>
                    <span>时间</span>
                    <i class="fa fa-caret-down"></i>
                  </button>
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="submitForm">筛选</button>
            </div>
            <br>
            <!-- END CHOOSEBOARD -->
            <!-- BORDERED TABLE -->
            <table class="table table-bordered">
              <thead>
              <tr>
                <th>日期</th>
                <th>日活跃DAU</th>
                <th>DOU</th>
                <th>PCU</th>
                <th>ACU</th>
                <th>当日新增注册</th>
                <th>当日新增设备激活</th>
                <th>当日注册总人数</th>
                <th>当日角色总人数</th>
                <th>当日登陆用户数</th>
                <th>当日进入用户数</th>
                <th>总注册用户</th>
                <th>次留</th>
                <th>三留</th>
                <th>七留</th>
                <th>14留</th>
                <th>30留</th>
                <th>首日<br>时长</th>
                <th style="width: 20px" class="text-center">7日内有记录2天</th>
                <th style="width: 20px" class="text-center">7日内有记录3天</th>
                <th style="width: 20px" class="text-center">7日内有记录4天</th>
                <th style="width: 20px" class="text-center">7日内有记录5天</th>
                <th style="width: 20px" class="text-center">7日内有记录6天</th>
              </tr>
              </thead>
              <tbody v-for="(item,key) in showData">
              <tr style="text-align: center">
                <td>{{key}}</td>
                <td>{{item.DAU}}</td>
                <td>{{item.DOU}}</td>
                <td>{{item.PCU}}</td>
                <td>{{item.ACU}}</td>
                <td>{{item.addedCount}}</td>
                <td>{{item.addedCount}}</td>
                <td>{{item.addedCount}}</td>
                <td>{{item.loginCount}}</td>
                <td>{{item.loginCount}}</td>
                <td>{{item.loginCount}}</td>
                <td>{{item.allCount}}</td>
                <td>{{item.remain2}}</td>
                <td>{{item.remain3}}</td>
                <td>{{item.remain7}}</td>
                <td>{{item.remain14}}</td>
                <td>{{item.remain30}}</td>
                <td>{{item.meanOnlineTime}}</td>
                <td>{{item.occur_2of7}}</td>
                <td>{{item.occur_3of7}}</td>
                <td>{{item.occur_4of7}}</td>
                <td>{{item.occur_5of7}}</td>
                <td>{{item.occur_6of7}}</td>
              </tr>
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
    name: 'vserverData',
    data() {
      return {
        selectedArea: '',
        selectedServer: '',
        startTime: '',
        endTime: '',

        //ajax数据
        queryData: {},
        showData: {}
      }
    },
    methods: {
      initDate: function () {
        let vm = this
        var locale = {
          "format": 'YYYY-MM-DD',
          "separator": " -222 ",
          "applyLabel": "确定",
          "cancelLabel": "取消",
          "fromLabel": "起始时间",
          "toLabel": "结束时间'",
          "customRangeLabel": "自定义",
          "weekLabel": "W",
          "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
          "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          "firstDay": 1
        };
        //初始化显示当前时间
        $('#daterange-btn span').html('  --请选择查询起止时间--  ');
        //日期控件初始化
        $('#daterange-btn').daterangepicker(
          {
            "singleDatePicker": false,
            "timePicker": false,
            "timePicker24Hour": false,
            "linkedCalendars": false,
            "autoUpdateInput": false,
            'locale': locale,
            ranges: {
              //'今日': [moment(), moment()],
              '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              '最近7日': [moment().subtract(6, 'days'), moment()],
              '最近30日': [moment().subtract(29, 'days'), moment()],
              '本月': [moment().startOf('month'), moment().endOf('month')],
              '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment(),
            endDate: moment()
          },
          function (start, end) {
            this.start = start;
            this.end = end;

            $('#daterange-btn span').html(this.start.format('YYYY-MM-DD') + ' - ' + this.end.format('YYYY-MM-DD'));

            //moment对象转换成时间戳发给vue
            vm.startTime = this.start.format('YYYYMMDD');
            vm.endTime = this.end.format('YYYYMMDD');
          }
        );

      },
      submitForm: function () {
        let vm = this;
        // if (!vm.selectedArea) {
        //   alert("请选择地区！")
        // } else if (!vm.selectedServer) {
        //   alert("请选择服务器！")
        // } else

        if (!vm.startTime && !vm.endTime) {
          alert("可查询昨天以前的数据")
        } else {
          console.log(vm.startTime, vm.endTime,vm.selectedArea, vm.selectedServer)

          //根据起止时间筛选数据
          vm.showData = {};
          for (let i = vm.startTime; i <= vm.endTime; i++) {
            let item = vm.queryData
            if (item[i]) {
              vm.showData[i] = item[i]
            }
          }
          console.log(vm.showData)
        }
      }
    },
    mounted: function () {
      this.initDate()
    },
    created: function () {
      let vm = this;
      console.log("从服务器获取数据中...")
      this.$axios.get("http://r.welingo.cn:55580/data/server").then(function (response) {
        console.log("数据获取完毕")
        vm.queryData = response.data;
        vm.showData = vm.queryData
      }).catch(function (error) {
        console.log(error);
      })
    }
  })
</script>
