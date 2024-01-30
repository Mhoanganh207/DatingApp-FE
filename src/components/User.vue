<script setup>
import Header from './Header.vue';
import Message from './Message.vue';


</script>



<template>
    <Header signedIn='1'/>
    <div class="w-screen flex justify-center pl-4 pr-4 sm:pl-14 sm:pr-14 md:pl-28 md:pr-28 pt-7 h-[85vh] space-x-4">
    <Message/>
    </div>
    
</template>