import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/register.vue'
import Login from '../views/Login.vue'
import Nav from '../components/Nav.vue'
import Surveys from '../views/surveys.vue'
import store from '../store'
import AuthLayout from '../components/AuthLayout.vue'

const routes = [
    
    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
        ]
    },
    {
        path: '/',
        redirect: '/dashboard',
        meta: {requiresAuth: true},
        component: Nav,
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Surveys', component: Surveys }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }
    else if(store.state.user.token && (to.meta.isGuest)){
        next({name: 'Dashboard'})
    }else{
        next()
    }
})

export default router