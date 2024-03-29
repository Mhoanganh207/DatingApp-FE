import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "./components/Home.vue";
import SignUpVue from "./components/SignUp.vue";
import AvatarVue from "./components/Avatar.vue";
import MainVue from "./components/Main.vue";
import UserVue from "./components/User.vue";
import ProfileVue from "./components/Profile.vue";
import axios from "axios";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomeVue },
        { path: '/account/signup', component: SignUpVue },
        { path: '/account/avatar/:id/:gender', component: AvatarVue },
        { path: '/main', component: MainVue },
        { path: '/account/message', component: UserVue },
        { path: '/account/message/:id/:accountId', component: UserVue },
        { path: '/main/?search=:search', component: MainVue},
        {path :'/account/profile',component : ProfileVue}
    ]
});

router.beforeEach(async (to, from, next) => {
    const protectedRoutes = ['/main', '/account/message', '/account/message/:id/:accountId'];
    
    if (protectedRoutes.includes(to.path) && !window.localStorage.getItem('token')) {
        next('/');
    } else {
        next();
    }
});

axios.interceptors.response.use()




export default router;
