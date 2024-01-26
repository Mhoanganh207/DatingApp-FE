<script setup>
import Header from './Header.vue';
import Message from './Message.vue';
import MessageBox from './MessageBox.vue';
</script>

<template>
    <Header signedIn='1' url="user"/>
    <div class="w-screen flex justify-center pl-32 pr-32 pt-7 h-[85vh] space-x-4">
    <Message/>
    <MessageBox/>
    </div>
    
</template>