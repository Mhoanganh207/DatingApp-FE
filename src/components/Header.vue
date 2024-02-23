<template>
    <header class="min-w-full h-16  bg-transparent flex items-center pl-10 pr-10 justify-between relative z-50">
        <a class="items-start cursor-pointer" @click="router.push('/main')">
            <img src="../assets/images/logo.png" alt="logo" class="h-18 w-44 sm:w-60">
        </a>

        <button v-if="props.signedIn !== '1'" @click="showLogin"
            class="login-btn duration-300  rounded-3xl px-6 py-1.5 text-lg text-white font-bold items-end shadow-md">Log
            In</button>
        <img @mouseover="showFunc" @mouseout="hideFunc" id="avatar" v-if="props.signedIn === '1'"
            class="rounded-full cursor-pointer object-cover w-12 h-12 relative" :src=avatarurl>
        <div @mouseover="showFunc" @mouseout="hideFunc" v-if="props.signedIn === '1'"
            class="w-[110px] h-[80px] justify-center  absolute bg-transparent rounded-lg top-[50px] right-[24px] mt-4 z-50">
           </div>
        <div @mouseover="showFunc" @mouseout="hideFunc" v-show="isFuncVisible" id="func" v-if="props.signedIn === '1'"
            class="w-[110px] h-[80px] flex-col justify-center  absolute bg-white rounded-lg top-[55px] right-[24px] mt-4 z-50"
            style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;">
            <button @click="router.push('/account/message')"
                class="w-full text-center h-1/2 font-bold rounded-t-lg hover:bg-pink-300 hover:text-white duration-200">You</button>
            <!-- <div class="w-full h-[1px] bg-slate-400"></div> -->
            <button @click="signOut"
                class="w-full bg-red-500 h-1/2 text-white font-bold rounded-b-lg hover:bg-black hover:text-white duration-200">Sign
                Out</button>
        </div>

    </header>
    <div id="logIn" class="max-w-md p-8 mx-auto shadow-lg rounded-2xl mt-5 mb-5 z-20 relative bg-white">
        <span>
            <button @click="hideLogin" class="float-right p-1 rounded-md hover:bg-slate-100">
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-pink-400">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </span>
        <form class="space-y-6" action="#">
            <div style="margin-top: 0;">
                <label for="email" class="block mb-2 text-md font-medium text-black">Email</label>
                <input v-model="email" type="email" name="email" id="email" placeholder="name@company.com"
                    class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                    required>

            </div>
            <div>
                <label for="password" class="block mb-2 text-md font-medium text-">Your password</label>
                <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                    class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                    required>
                <p v-if="unauthenticated" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                        class="font-medium">Oops!</span> Your username or password is incorrect!</p>
            </div>
            <div class="flex justify-between">
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input
                            class="w-4 h-4 rounded bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 focus:ring-pink-300 text-pink-400 dark:bg-gray-600 dark:border-gray-500"
                            type="checkbox">
                    </div>
                    <label for="remember" class="ml-2 text-md font-medium text-gray-900">Remember me</label>
                </div>
                <a href="#" class="text-md text-pink-700 hover:underline dark:text-pink-500">Lost Password?</a>
            </div>
            <button @click.prevent="login"
                class="w-full text-white bg-pink-500 duration-300 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-md px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Login
                to your account</button>
            <div class="text-md font-medium text-gray-500 ">
                Not registered? <a @click="router.push('/account/signup')"
                    class="text-pink-700 hover:underline cursor-pointer">Create account</a>
            </div>
        </form>
        <div class="flex mt-2">
            <button type="submit"
                class="flex rounded-3xl items-center w-1/2 duration-150 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-md px-4 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <img src="../assets/images/google.png" width="17" height="17" class="mr-1">
                Login with Google</button>
            <div style="width: 5px;"></div>
            <button type="submit"
                class="flex items-center w-1/2 duration-150 text-white bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-md px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <img src="../assets/images/github.png" width="17" height="17" class="mr-1">
                Login with Github</button>
        </div>
    </div>
    <div id="logInBd" style="background: rgb(0,0,0, 0.4); display: none;" class="h-full w-full fixed top-0 z-10"></div>
</template>

<style scoped></style>

<script setup>

import  AuthService  from '../services/auth.service';
import UserService from '../services/user.service'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const unauthenticated = ref(false);
const email = ref('');
const password = ref('');
const avatarurl = ref('');
const isFuncVisible = ref(false);
const router = useRouter();
const props = defineProps({
    signedIn: String,
    url: String
})

onMounted(async () => {
    if (props.signedIn === '1') {
        document.getElementById('logIn').style.display = 'none';
        if (window.localStorage.getItem('avatar') === null) {
            avatarurl.value = await UserService.getAvatar();
        }
        else {
            avatarurl.value = window.localStorage.getItem('avatar');
        }
    }
});





function signOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('avatar');
    router.push({
        path: `/`,
    });
}
function showLogin() {
    document.getElementById("logIn")?.classList.remove("hide");
    document.getElementById("logIn")?.classList.add("show");
    document.getElementById("logInBd").style.display = "block";
}

function hideLogin() {
    document.getElementById("logIn")?.classList.add("hide");
    document.getElementById("logInBd").style.display = "none";
}
async function login() {
    const data = {
        username: email.value,
        password: password.value
    };
    let isAuthenticated = await AuthService.signIn(data);
    if(isAuthenticated){
        router.push("/main");
    }
    else{
        unauthenticated.value = true;
    }
}
function showFunc() {
    isFuncVisible.value = true;
}
function hideFunc() {

    isFuncVisible.value = false;

}
</script>


../services/user.service