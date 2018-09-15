<template>
  <!-- LEFT SIDEBAR -->
  <div id="sidebar-nav" class="sidebar">
    <div class="sidebar-scroll">
      <nav>
        <ul class="nav">
          <li><router-link to="/" class="" @click.native='shrinkCollapse'><i class="lnr lnr-home"></i> <span>实时监控</span></router-link></li>
          <li><router-link to="/serverData" class="" @click.native='shrinkCollapse'><i class="lnr lnr-chart-bars"></i> <span>分服数据</span></router-link></li>
          <li><router-link to="/queryToday" class="" @click.native='shrinkCollapse'><i class="lnr lnr-chart-bars"></i> <span>昨日用户查询</span></router-link></li>
          <li><router-link to="/querySingle" class="" @click.native='shrinkCollapse'><i class="lnr lnr-chart-bars"></i> <span>单用户查询</span></router-link></li>
          <li>
            <a href="#subPages" data-toggle="collapse" class="collapsed" id="prePages" aria-expanded="false"><i
              class="lnr lnr-menu"></i> <span>多用户查询</span> <i
              class="icon-submenu lnr lnr-chevron-left"></i></a>
            <div id="subPages" class="collapse ">
              <ul class="nav">
                <li><router-link to="/queryAction" class=""><i class="lnr lnr-tag"></i> <span>日行为查询</span></router-link></li>
                <li><router-link to="/queryHomework" class=""><i class="lnr lnr-spell-check"></i> <span>日作业查询</span></router-link></li>
                <li><router-link to="/queryExp" class=""><i class="lnr lnr-diamond"></i> <span>金钱、经验查询</span></router-link></li>
              </ul>
            </div>
          </li>
          <li><router-link to="/testPage" class="" @click.native='shrinkCollapse'><i class="lnr lnr-chart-bars"></i> <span>测试页</span></router-link></li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- END LEFT SIDEBAR -->
</template>
<script>
  export default({
    name: 'vsidebar',
    methods:{
      shrinkCollapse() {
         $("#prePages").removeClass("active").addClass("collapsed")
         $("#subPages").removeClass("in")
      }
    }
  })
</script>
