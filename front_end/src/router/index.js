import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Bills from '../views/Bills.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/bills',
        name: 'Bills',
        component: Bills
    },
    {
        path: '/*',
        name: 'Error',
        component: { template: `<p> Please visit Home.</p>` }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     console.log(to.name, from.name)
//     if (to.name === 'Login' // Going to login page
//         && localStorage.getItem('jwtToken') !== null // But user already logged in.
//     ) {
//         next({ name: 'Dashboard' }) // Send him to dashboard.
//     }
//     else next()
// })
export default router;