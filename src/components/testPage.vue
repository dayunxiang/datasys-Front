<template>
  <!-- MAIN -->
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">表格</h3>
        <div class="panel panel-headline">
          <div class="panel-body">
            <!-- CHOOSEBOARD -->
            <div class="row">
              <div class="col-md-7">
                <div class="input-group">
                  <v-date-picker @transferDate="getDate"></v-date-picker>
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="submitForm">筛选</button>
            </div>
            <br>
            <!-- BORDERED TABLE -->
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
  import vDatePicker from '@/components/common/vDatePicker'
  export default ({
    name: 'testPage',
    data:function(){
      return{
        columns:[
          {
            title:'姓名',
            key:'name'
          },{
            title:'年龄',
            key:'age',
            sortable:true
          },{
            title:'出生日期',
            key:'birthday',
            sortable:true
          },{
            title:'地址',
            key:'address'
          }
        ],
        data:[
          {
            name:'司徒正美',
            age:26,
            birthday:'1991-12-11',
            address:'北京市朝阳区芍药居'
          },{
            name:'阮一峰',
            age:27,
            birthday:'1098-21-12',
            address:'大连市朝阳区芍药居'
          }
        ],
        startTime:'',
        endTime:''
      }
    },
    methods: {
      submitForm: function () {
        let vm=this
        console.log(vm.startTime,vm.endTime)
      },
      getDate:function (msg) {
        let vm=this
        vm.startTime=msg.startTime
        vm.endTime=msg.endTime
      }
    },
    mounted: function () {
    },
    components: {
      vTable,
      vDatePicker
    }
  })
</script>
