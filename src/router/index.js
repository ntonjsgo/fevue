import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Home from '../components/Home.vue'
import Post from '../components/Post.Vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
