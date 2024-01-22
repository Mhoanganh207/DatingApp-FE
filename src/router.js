import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "./components/Home.vue";
import SignUpVue from "./components/SignUp.vue";
import AvatarVue from "./components/Avatar.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes :[
        {path :'/', component : HomeVue},
        {path :'/account/signup', component : SignUpVue},
        {path :'/account/avatar/:id/:gender', component : AvatarVue}
    ]
});

export default router;