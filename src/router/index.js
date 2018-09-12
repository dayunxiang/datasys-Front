import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vdashboard from '@/components/dashboard'
import vserverData from '@/components/serverData'
import vqueryToday from '@/components/queryToday'
import vquerySingle from '@/components/queryUser/querySingle'
import vqueryAll from '@/components/queryUser/queryAll'
import vtestPage from '@/components/testPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vdashboard',
      component: vdashboard
     },
    {
      path: '/serverData',
      name: 'vserverData',
      component: vserverData
    },
    {
      path: '/queryToday',
      name: 'vqueryToday',
      component: vqueryToday
    },
    {
      path: '/querySingle',
      name: 'vquerySingle',
      component: vquerySingle
    },
    {
      path: '/queryAll',
      name: 'vqueryAll',
      component: vqueryAll
    },
    {
      path: '/testPage',
      name: 'vtestPage',
      component: vtestPage
    }
  ]
})
