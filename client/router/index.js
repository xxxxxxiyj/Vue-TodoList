import Vue from 'vue'
import Router from 'vue-router'
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/app',
      component: Todo
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
