import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "./components/Home.vue";
import SignUpVue from "./components/SignUp.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes :[
        {path :'/', component : HomeVue},
        {path :'/account/signup', component : SignUpVue}
    ]
});

export default router;