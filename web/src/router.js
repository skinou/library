import Vue from 'vue'
import Router from 'vue-router'

import chuzu from './components/bookinfo/chuzu'
import zaiku from './components/bookinfo/zaiku'

import all from './components/bookitems/all'
import kexue from './components/bookitems/kexue'
import wenxue from './components/bookitems/wenxue'
import xiaoshuo from './components/bookitems/xiaoshuo'
import ziyan from './components/bookitems/ziyan'

import reader from './components/reader/reader'

import imgUpload from './components/imgUpload'
import textContent from './components/textContent'
import multiImg from './components/multiImg'
import carouselImg from './components/carouselImg'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chuzu',
      component: chuzu
    },
    {
      path: '/zaiku',
      component: zaiku
    },
    {
      path: '/all',
      component: all
    },
    {
      path: '/kexue',
      component: kexue
    },
    {
      path: '/wenxue',
      component: wenxue
    },
    {
      path: '/xiaoshuo',
      component: xiaoshuo
    },
    {
      path: '/ziyan',
      component: ziyan
    },
    {
      path: '/reader',
      component: reader
    },
    {
      path: '/imgUpload',
      component: imgUpload
    },
    {
      path: '/textContent',
      component: textContent
    },
    {
      path: '/multiImg',
      component: multiImg
    },
    {
      path: '/carouselImg',
      component: carouselImg
    }
  ]
})
