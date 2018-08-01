<template>
  <div id="wrapper">
    <vheader></vheader>
    <vsidebar></vsidebar>
    <!--<vdashboard></vdashboard>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import vheader from './components/header.vue'
  import vsidebar from './components/sidebar.vue'
  import vdashboard from './components/dashboard.vue'
  export default {
    name: 'wrapper',
    components: {
      vheader,
      vsidebar,
      vdashboard
    }
  }
</script>
