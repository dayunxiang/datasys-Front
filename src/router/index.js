import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vdashboard from '@/components/dashboard'
import vserverData from '@/components/serverData'
import vqueryToday from '@/components/queryToday'
import vquerySingle from '@/components/querySingle'
import vqueryAction from '@/components/queryUser/queryAction'
import vqueryHomework from '@/components/queryUser/queryHomework'
import vqueryExp from '@/components/queryUser/queryExp'
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
      path: '/queryAction',
      name: 'vqueryAction',
      component: vqueryAction
    },
    {
      path: '/queryHomework',
      name: 'vqueryHomework',
      component: vqueryHomework
    },
    {
      path: '/queryExp',
      name: 'vqueryExp',
      component: vqueryExp
    },
    {
      path: '/testPage',
      name: 'vtestPage',
      component: vtestPage
    }
  ]
})
