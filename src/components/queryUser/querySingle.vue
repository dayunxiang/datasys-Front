<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">精准用户查询>单个用户多日期数据</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- CHOOSEBOARD -->
            <div class="row">
              <div class="col-md-2">
                <input type="text" class="form-control" placeholder="请输入用户ID"/>
              </div>
              <div class="col-md-9">
                <div class="input-group">
                  <button type="button" class="form-control" id="daterange-btn">
                    <i class="fa fa-calendar"></i>
                    <span>时间</span>
                    <i class="fa fa-caret-down"></i>
                  </button>
                </div>
              </div>
              <button type="button" class="btn btn-primary">筛选</button>
            </div>
            <br>
            <!-- END CHOOSEBOARD -->
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
              <tbody>
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
    name: 'vquerySingle',
    methods: {
      initDate: function () {
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
            $('#daterange-btn span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
          }
        );
      }
    },
    mounted: function () {
      this.initDate()
    }
  })
</script>
