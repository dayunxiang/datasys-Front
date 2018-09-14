<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">日行为查询</h3>
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
    name: 'vquerySingle',
    data() {
      return {
        selectedSchool: '',
        selectedClass: '',
        columns: [
          {
            title: '日期',
            key: 'Date',
            cellStyle: {
              fontSize: '90%',
            },
            sortable: true
          },
          {
            title: '账号',
            key: 'account',
            cellStyle: {
              fontSize: '90%',
            },
            sortable: true
          }, {
            title: '英文昵称',
            key: 'name',
            cellStyle: {
              fontSize: '90%',
            },
            sortable: true
          }, {
            title: '中文昵称',
            key: 'cname',
            cellStyle: {
              wordBreak: 'keep-all',
              minWidth: '7rem',
              fontSize: '90%'
            },
            sortable: true
          }, {
            title: '班级',
            key: 'class_name',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '学校',
            key: 'school',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '登录记录',
            key: 'loginTimeList',
            cellStyle: {
              fontSize: '80%',
            }
          }, {
            title: '在线时长',
            key: 'onlineTime',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '小游戏时长',
            key: 'smallgameTime',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '视频时长',
            key: 'videoTime',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '农场时长',
            key: 'farmTime',
            cellStyle: {
              fontSize: '80%',
            },
            sortable: true
          }, {
            title: '作业时间',
            key: 'homeworkTime',
            cellStyle: {
              fontSize: '80%',
            },
          }, {
            title: '自由对话总数',
            key: 'freechatTotal'
          }, {
            title: '每日动物喂养答题数',
            key: 'animalFeedQATotal'
          }, {
            title: '每日动物喂养答题正确率',
            key: 'animalFeedQAAccuracy'
          }, {
            title: '每日动物收获答题数',
            key: 'animalHarvestQATotal'
          }, {
            title: '每日动物收获答题正确率',
            key: 'animalHarvestQAAccuracy'
          }, {
            title: '每日植物种植答题数',
            key: 'sowQATotal'
          }, {
            title: '每日植物种植答题正确率',
            key: 'sowQAAccuracy'
          }, {
            title: '每日植物照料答题数',
            key: 'takeCareQATotal'
          }, {
            title: '每日植物照料答题正确率',
            key: 'takeCareQAAccuracy'
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
          alert("可查询昨天以前的数据！")
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
              console.log('数据为空')
              vm.data = []
              vm.isDataEmpty = true
            } else {
              vm.isDataEmpty = false
              vm.data = response.data.map(function (item) {
                item.animalFeedQAAccuracy = getnum(item.animalFeedQAAccuracy)
                item.animalHarvestQAAccuracy = getnum(item.animalHarvestQAAccuracy)
                item.sowQAAccuracy = getnum(item.sowQAAccuracy)
                item.takeCareQAAccuracy = getnum(item.takeCareQAAccuracy)
                return item
              })
            }
          })

          //对正确率进行处理，保留小数点后两位
          function getnum(num) {
            var num = num
            if (num % 1 !== 0) {
              num = num.toFixed(1);
            }
            return num
          }
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
