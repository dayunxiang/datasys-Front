<script>
  //简易表格组件
  //包含动态渲染、排序功能
  //不支持改样式
  export default ({
    name:'vTable',
    props:{
      columns:{
        type:Array,
        default:[]
      },
      data:{
        type:Array,
        default:[]
      }
    },
    data:function () {
      return{
        currentColumns:[],
        currentData:[]
      }
    },
    methods: {
      makeColumns:function () {
        this.currentColumns=this.columns.map(function (col,index) {
          col._sortType='normal';
          col._index=index;
          return col;
        })
      },
      makeData:function () {
        this.currentData=this.data.map(function (row,index) {
          row._index=index;
          return row
        })
      },
      handleSortByAsc:function (index) {
        var key=this.currentColumns[index].key;
        this.currentColumns.forEach(function (col) {
          col._sortType='normal'
        });
        this.currentColumns[index]._sortType='asc';
        this.currentData.sort(function (a,b) {
          return a[key]>b[key]?1:-1;
        })
      },
      handleSortByDesc:function (index) {
        var key=this.currentColumns[index].key;
        this.currentColumns.forEach(function (col) {
          col._sortType='normal'
        });
        this.currentColumns[index]._sortType='desc';
        this.currentData.sort(function (a,b) {
          return a[key]<b[key]?1:-1;
        })
      }
    },
    mounted(){
      this.makeColumns();
      this.makeData();
    },
    render:function (h) {
      var _this=this;
      var ths=[];

      this.currentColumns.forEach(function (col,index) {
        if(col.sortable){
          ths.push(h('th',[
            h('span',col.title),h('div',{class:'arrow'},[
            h('a',{
              class:{
                on:col._sortType === 'asc',
              },
              on:{
                click:function () {
                  _this.handleSortByAsc(index)
                }
              }
            },'↑'),
            h('a',{
              class:{
                on:col._sortType === 'desc'
              },
              on:{
                click:function () {
                  _this.handleSortByDesc(index)
                }
              }
            },'↓')])
          ]));
        }else{
          ths.push(h('th',col.title))
        }
      });
      var trs=[];
      this.currentData.forEach(function (row) {
        var tds=[];
        _this.currentColumns.forEach(function (cell) {
          tds.push(h('td',{style:cell.cellStyle},row[cell.key]));
        });
        trs.push(h('tr',tds));
      });
      return h('table',{
        class:['table','table-bordered']
      },[
        h('thead',[
          h('tr',ths)
        ]),
        h('tbody',trs)
      ])
    },
    watch:{
      data:function () {
        this.makeData();
        var sortedColumn=this.currentColumns.filter(function (col) {
          return col._sortType !== 'normal';
        });
        if(sortedColumn.length>0){
          if(sortedColumn[0]._sortType==='asc'){
            this.handleSortByAsc(sortedColumn[0]._index)
          }else{
            this.handleSortByDesc(sortedColumn[0]._index)
          }
        }
      }
    }

  })
</script>
<style>
  table th a {
    display: inline-block;
    color: #2d2e3d;
    margin: 0 2px;
    cursor: pointer;
  }
  table th a.on{
    color: #2469ff;
  }
  table th a:hover{
    color: #3399ff;
  }
  .arrow{
    display: inline-block;
    min-width: 2.5rem;
  }
  table th{
    font-size: 85%;
  }

</style>

