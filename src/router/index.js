import Vue from 'vue'
import Router from 'vue-router'

import tabs from '@/components/tabs/tabs'
import homePage from '@/components/home/homePage'

import betPage from '@/components/bet/bet/betPage'
import payPage from '@/components/bet/pay/payPage'
import payStatusPage from '@/components/bet/pay/payStatusPage'

import jczqBetPage from '@/components/bet/jczq/jczqBetPage'
import jclqBetPage from '@/components/bet/jclq/jclqBetPage'
import sfcRxjBetPage from '@/components/bet/sfcRxj/sfcRxjBetPage'

import matchPage from '@/components/match/matchCenter/matchPage'

import footBallMatchPage from '@/components/match/matchCenter/footBall/footBallMatchPage'
import fbDetailHomePage from '@/components/match/matchCenter/footBall/matchDetail/fbDetailHomePage'

import basketBallMatchPage from '@/components/match/matchCenter/basketBall/basketBallMatchPage'

import newsDetailPage from '@/components/news/newsDetailPage'

import webViewPage from '@/components/webView/webViewPage'

import loginPage from '@/components/login/loginPage'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tabs',
      component: tabs,
      redirect: '/tabs'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: tabs,
      redirect: '/homePage',
      meta: {
        saveScroll: true
      },
      children: [
        // 首页
        {
          path: '/homePage',
          name: 'homePage',
          component: homePage,
          meta: {
            saveScroll: true
          },
        },
        // 比分数据
        {
          path: '/matchPage',
          name: 'matchPage',
          component: matchPage,
          redirect: '/matchPage/matchCenter/footBallMatchPage',
          children: [
            {
              path: '/matchPage/matchCenter/footBallMatchPage',
              name: 'footBallMatchPage',
              component: footBallMatchPage
            },
            {
              path: '/matchPage/matchCenter/basketBallMatchPage',
              name: 'basketBallMatchPage',
              component: basketBallMatchPage
            }
          ]
        }
      ]
    },
    // 确认投注
    {
      path: '/betPage',
      name: 'betPage',
      component: betPage
    },
    // 确认支付
    {
      path: '/payPage',
      name: 'payPage',
      component: payPage
    },
    // 支付完成状态
    {
      path: '/payStatusPage',
      name: 'payStatusPage',
      component: payStatusPage
    },
    // 竞彩足球投注
    {
      path: '/jczqBetPage',
      name: 'jczqBetPage',
      component: jczqBetPage,
      meta:{
        saveScroll: true
      }
    },
    // 竞彩篮球投注
    {
      path: '/jclqBetPage',
      name: 'jclqBetPage',
      component: jclqBetPage,
      meta:{
        saveScroll: true
      }
    },
    // 胜负彩 任选九 投注
    {
      path: '/sfcRxjBetPage',
      name: 'sfcRxjBetPage',
      component: sfcRxjBetPage,
      meta:{
        saveScroll: true
      }
    },
    // 资讯
    {
      path: '/newsDetailPage',
      name: 'newsDetailPage',
      component: newsDetailPage,
    },
    // webview
    {
      path: '/webViewPage',
      name: 'webViewPage',
      component: webViewPage,
    },
    // 登录
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    // 足球赛事详情
    {
      path: '/fbDetailHomePage',
      name: 'fbDetailHomePage',
      component: fbDetailHomePage
    }
  ]
})
