<template>
  <button type="button" class="form-control" id="daterange-btn">
    <i class="fa fa-calendar"></i>
    <span>时间</span>
    <i class="fa fa-caret-down"></i>
  </button>
</template>
<script>
export default ({
  name:'vDatePicker',
  data() {
    return {
      startTime:'',
      endTime:''
    }},
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

          $('#daterange-btn span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));

          //moment对象转换成时间戳发给vue
          vm.startTime = this.start.format('YYYYMMDD');
          vm.endTime = this.end.format('YYYYMMDD');

          //通过事件把子组件的数据传递给父组件
          vm.$emit('transferDate',{startTime:vm.startTime,endTime:vm.endTime})
        }
      );

    }
  },
  mounted: function () {
    this.initDate()
  }
})
</script>
