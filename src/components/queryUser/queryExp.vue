<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">金钱、经验查询</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- CHOOSEBOARD -->
            <div class="row">
              <div class="col-md-2">
                <select class="form-control" v-model="selectedSchool" @change="chooseClassBySchool">
                  <option value="">所有学校</option>
                  <option v-for="(item,index) in querySchool" :value="item">{{item}}</option>
                </select>
              </div>
              <div class="col-md-2">
                <select class="form-control" v-model="selectedClass">
                  <option value="">所有班级</option>
                  <option v-for="(item,index) in queryClass" :value="item">{{item}}</option>
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
            <v-table :data="data" :columns="columns"></v-table>
            <div v-show="isDataEmpty">暂无查询结果</div>
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
    name: 'vqueryExp',
    data() {
      return {
        selectedSchool: '',
        selectedClass: '',
        columns: [
          {
            title: '日期',
            key: 'Date',
            sortable: true
          },
          {
            title: '账号',
            key: 'account',
            sortable: true
          }, {
            title: '英文昵称',
            key: 'name',
            sortable: true
          }, {
            title: '中文昵称',
            key: 'cname',
            cellStyle: {
              wordBreak: 'keep-all',
              minWidth: '7rem'
            },
            sortable: true
          }, {
            title: '班级',
            key: 'class_name',
            cellStyle: {
              fontSize: '80%',
              minWidth: '10rem'
            },
            sortable: true
          }, {
            title: '学校',
            key: 'school',
            cellStyle: {
              fontSize: '80%',
              minWidth: '9rem'
            },
            sortable: true
          }, {
            title: '日金钱—增加',
            key: 'gold_changed_added',
            sortable: true
          }, {
            title: '日金钱—获得',
            key: 'gold_changed_gain',
            sortable: true
          }, {
            title: '日金钱—消耗',
            key: 'gold_changed_consume',
            sortable: true
          }, {
            title: '日金钱—当前',
            key: 'gold_changed_currentCount',
            sortable: true
          }, {
            title: '日门票—增加',
            key: 'ticket_changed_added',
            sortable: true
          }, {
            title: '日门票—减少',
            key: 'ticket_changed_consume',
            sortable: true
          }, {
            title: '日经验—增加',
            key: 'exp_changed_added',
            sortable: true
          }, {
            title: '日经验—当前',
            key: 'exp',
            sortable: true
          }, {
            title: '日等级—增加',
            key: '',
            sortable: true
          }, {
            title: '日等级—当前',
            key: 'level',
            sortable: true
          }
        ],
        data: [],
        querySchool: [],
        queryClass: [],
        isDataEmpty: false
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

            $('#daterange-btn span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));

            //moment对象转换成时间戳发给vue
            vm.startTime = this.start.format('YYYYMMDD');
            vm.endTime = this.end.format('YYYYMMDD');
          }
        );

      },
      submitForm: function () {
        let vm = this
        let url = ''

        if (!vm.startTime && !vm.endTime) {
          alert("可查询昨天以前的数据")
        } else {
          console.log(vm.startTime, vm.endTime, vm.selectedSchool, vm.selectedClass)
          if (vm.selectedSchool && vm.selectedClass) {
            url = "http://r.welingo.cn:55580/data/user?date_begin=" + vm.startTime + "&date_end=" + vm.endTime + "&school=" + vm.selectedSchool + "&class=" + vm.selectedClass
          } else if (vm.selectedSchool) {
            url = "http://r.welingo.cn:55580/data/user?date_begin=" + vm.startTime + "&date_end=" + vm.endTime + "&school=" + vm.selectedSchool
          } else {
            url = "http://r.welingo.cn:55580/data/user?date_begin=" + vm.startTime + "&date_end=" + vm.endTime
          }

          //axios
          this.$axios.get(url).then(function (response) {
            console.log("数据获取完毕")
            if (JSON.stringify(response.data) === '[]') {
              //console.log('数据为空')
              vm.data = []
              vm.isDataEmpty = true
            } else {
              vm.isDataEmpty = false
              var tempData=response.data
              //console.log(tempData)
              tempData.forEach(function (item) {
                //var i=eval("("+item.exp_changed+")")  //eval()只能在非严格模式下用
                //var i=$(item.exp_changed).html()

                //@TODO 表格插件不支持二次取key.暂时用下面的方法
                 var exp_changed=JSON.parse(item.exp_changed)
                 var gold_changed=JSON.parse(item.gold_changed)
                 var ticket_changed=JSON.parse(item.ticket_changed)

                if(item.gold_changed) {
                  item.gold_changed_added = gold_changed.added || 0
                  item.gold_changed_gain = gold_changed.gain || 0
                  item.gold_changed_consume =gold_changed.consume || 0
                  item.gold_changed_currentCount =gold_changed.currentCount || 0
                }
                if(item.ticket_changed) {
                  item.ticket_changed_added =ticket_changed.added || 0
                  item.ticket_changed_consume =ticket_changed.gain || 0
                }
                if(item.exp_changed){
                  item.exp_changed_added=exp_changed.added|| 0
                 }
              })

              vm.data = tempData
              console.log(vm.data)
            }
          })
        }
      },
      chooseClassBySchool: function () {
        let vm = this
        //console.log(vm.selectedSchool)
        vm.queryClass = []
        vm.selectedClass = ''

        //根据学校获取班级
        this.$axios.get("http://r.welingo.cn:55580/data/class?school=" + vm.selectedSchool).then(function (response) {
          console.log("班级数据获取完毕")
          vm.queryClass = response.data
          //console.log(vm.queryClass )
        })

      }
    },
    mounted: function () {
      this.initDate()
    },
    created: function () {
      let vm = this;
      //$axios获取学校列表
      this.$axios.get("http://r.welingo.cn:55580/data/school").then(function (response) {
        console.log("学校数据获取完毕")
        vm.querySchool = response.data
        //console.log(vm.querySchool )
      })
    },
    components: {
      vTable
    }
  })
</script>
