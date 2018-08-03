import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import hospitalsContent from '@/components/hospitalsContent'
import serviceInfo from '@/components/serviceInfo'
import aliyunAccounts from '@/components/aliyunAccounts'
import attentions from '@/components/attentions'
import attentions_article from '@/components/attentions_article'
import login from '@/views/login'


Vue.use(Router)
  
export default new Router({
    mode:'history',
    routes: [{
        path: '/',
        component: home,
        meta:{requiresAuth:true},
        children: [
            {
                path:'/',
                name:'home',
                component:hospitalsContent
            },
            {
            path: 'hospitals/:id',
            name: 'hospitalsContent',
            component: hospitalsContent
        },{
            path: '/serviceInfo',
            name: 'serviceInfo',
            component: serviceInfo
        }, {
            path: '/aliyunAccounts',
            name: 'aliyunAccounts',
            component: aliyunAccounts
        }, {
            path: '/attentions',
            name:'attentions',
            component: attentions
        },{
            path: '/articles/:id',
            name: 'articles',
            component: attentions_article
          }]
    },
    {
        path:'/login',
        name:'login',
        component:login
    }
]
})