<script setup>
import Header from './Header.vue';
import Message from './Message.vue';
import MessageBox from './MessageBox.vue';
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
onMounted(() => {
    if (window.localStorage.getItem('token') === null) {
        router.push({
            path: `/`,
        });
    }
});

</script>



<template>
    <Header signedIn='1'/>
    <div class="w-screen flex justify-center pl-4 pr-4 sm:pl-14 sm:pr-14 md:pl-28 md:pr-28 pt-7 h-[85vh] space-x-4">
    <Message/>
    </div>
    
</template>