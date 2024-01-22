<template>
    <Header />
   <div class="fixed top-0 w-screen h-screen flex items-center" style="background-image: url('src/assets/images/background.webp'); background-size: cover;">
    <div class="mx-auto my-auto fixed-container">
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-white text-center text-shadow-xl">Welcome to <span class="text-pink-400">L</span><span class="text-pink-300">ove</span><span class="text-pink-400">L</span><span class="text-pink-300">ink</span></h1>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-rose-400 text-center">Turning Connections into Love Stories.</h2>
        <div class="flex justify-center mt-5">
            <button @click="LogIn()" id="joinNow" class="bg-pink-500 duration-300 hover:bg-pink-600 rounded-3xl px-8 py-2.5 text-xl text-white font-bold items-end shadow-md">Join now</button>
    </div>
    </div>
   </div>  
</template>

<script>
import Header from './Header.vue';

export default{
    methods: {
        LogIn() {
            document.getElementById("logIn")?.classList.remove("hide");
            document.getElementById("logIn")?.classList.add("show");
            document.getElementById("logInBd").style.display = "block";
        }
    },
    components: { Header }
}
</script>