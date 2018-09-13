<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <!-- OVERVIEW -->
        <div class="panel panel-headline">
          <div class="panel-heading">
            <h3 class="panel-title">Weekly Overview</h3>
            <p class="panel-subtitle">Period: Oct 14, 2016 - Oct 21, 2016</p>
          </div>
          <div class="panel-body">
            <!--时间筛选器-->
            <div class="row">
              <div class="col-md-9"></div>
              <div class="col-md-3" style="margin-top: -30px;padding-bottom: 10px">
                <div class="input-group">
                  <button type="button" class="form-control" id="daterange-btn">
                    <i class="fa fa-calendar"></i>
                    <span>时间</span>
                    <i class="fa fa-caret-down"></i>
                  </button>
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-primary" @click="submitForm">筛选</button>
                  </span>
                </div>

              </div>
            </div>
            <!--Dashboard展示面板-->
            <div class="row">
              <div class="col-md-3">
                <div class="metric">
                  <span class="icon"><i class="fa fa-eye"></i></span>
                  <p>
                    <span class="number">1,252</span>
                    <span class="title">即时在线</span>
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="metric">
                  <span class="icon"><i class="fa fa-bar-chart"></i></span>
                  <p>
                    <span class="number">3127</span>
                    <span class="title">最高在线</span>
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="metric">
                  <span class="icon"><i class="fa fa-bar-chart"></i></span>
                  <p>
                    <span class="number">123</span>
                    <span class="title">当日注册</span>
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="metric">
                  <span class="icon"><i class="fa fa-bar-chart"></i></span>
                  <p>
                    <span class="number">203</span>
                    <span class="title">总注册</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-9">
                <div id="headline-chart" class="ct-chart"></div>
              </div>
              <div class="col-md-3">
                <div class="weekly-summary text-right">
                  <span class="number">2,315</span> <span class="percentage"><i class="fa fa-caret-up text-success"></i> 12%</span>
                  <span class="info-label">Total Sales</span>
                </div>
                <div class="weekly-summary text-right">
                  <span class="number">$5,758</span> <span class="percentage"><i
                  class="fa fa-caret-up text-success"></i> 23%</span>
                  <span class="info-label">Monthly Income</span>
                </div>
                <div class="weekly-summary text-right">
                  <span class="number">$65,938</span> <span class="percentage"><i
                  class="fa fa-caret-down text-danger"></i> 8%</span>
                  <span class="info-label">Total Income</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END MAIN CONTENT -->
  </div>
  <!-- END MAIN -->
</template>
<script>
  export default ({
    name: 'vdashboard',
    methods: {
      initChart: function () {
        //初始化信息
        var data, options;

        // headline charts
        data = {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            [23, 29, 24, 40, 25, 24, 35],
            [14, 25, 18, 34, 29, 38, 44],
          ]
        };

        options = {
          height: 300,
          showArea: true,
          showLine: false,
          showPoint: false,
          fullWidth: true,
          axisX: {
            showGrid: false
          },
          lineSmooth: false,
        };

        new Chartist.Line('#headline-chart', data, options);
      },
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

        $('#daterange-btn span').html(moment().subtract(1, 'hours').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD'));
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
              '今日': [moment(), moment()],
              '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              '最近7日': [moment().subtract(6, 'days'), moment()],
              '最近30日': [moment().subtract(29, 'days'), moment()],
              '本月': [moment().startOf('month'), moment().endOf('month')],
              '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
          },
          function (start, end) {
            this.start = start;
            this.end = end;

            $('#daterange-btn span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));

            //moment对象转换成时间戳发给vue
            vm.startTime = this.start.format('YYYYMMDD');
            vm.endTime = this.end.format('YYYYMMDD');
          }
        );

      },
      submitForm: function () {
        let vm = this

        if (!vm.startTime && !vm.endTime) {
          alert("请选择有效起止时间！")
        }else{
          console.log(vm.startTime, vm.endTime)

          // //axios
          // this.$axios.get("http://r.welingo.cn:55580/data/user?date_begin="+vm.startTime+"&date_end="+vm.endTime).then(function (response) {
          //   console.log("数据获取完毕")
          //   vm.data = response.data
          // })
        }
      }
    },
    mounted: function () {
      this.initChart()
      this.initDate()
    },
    created: function () {

    }
  })
</script>
