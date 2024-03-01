<script setup>
import { onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import connection from '../services/chat.connection';
import ChatService from "../services/chat.service"
import UserService from "../services/user.service"

const route = useRoute();
const fetched = ref(false);
const chatId = ref('0');
const account = ref('0');
const messages = ref([]);
const message = ref('');
const user = ref(null);
const props = defineProps({
    active: String,
    chatId: String
});

const emit = defineEmits(['SendMessage']);

onMounted(async () => {
    if (connection.state === 'Disconnected') {
        await connection.start();
    }
    connection.on("ReceiveMessage", (sendId,message) => {
        receiveMessage(sendId,message);
    });

    await onInit();

    await retriveUserInfo(user);


})

watch(() => props.active, async (value) => {
    
    if (props.chatId === '0') return;
    message.value = '';
    account.value = value;
    chatId.value = props.chatId;
    messages.value = await ChatService.getChatById(props.chatId);

    connection.invoke("LeaveChat", chatId.value);
    connection.invoke("JoinChat", props.chatId);
});

async function onInit(){
    if (route.params.id !== undefined) {
        fetched.value = true;
        chatId.value = route.params.id;
        account.value = route.params.accountId;
        messages.value = await ChatService.getChatById(route.params.id);


        await connection.invoke("JoinChat", chatId.value);
    }
}

async function retriveUserInfo(user) {
      
      user.value = await UserService.getInfor();
      await connection.invoke("ActiveUser",user.value.id.toString());
}

function receiveMessage(id,msg){
    if(id == user.value.id) return;
    messages.value.push({
        sendId: id.toString(),
        content: msg
    });
    document.getElementById('messageList').scrollTo(0, document.getElementById('messageList').scrollHeight);
    
}
function sendMessage() {
    connection.invoke("SendMessage", chatId.value, user.value.id.toString(), account.value ,message.value);
    messages.value.push({
        sendId: user.value.id,
        content: message.value
    });
    emit('SendMessage', chatId.value,message.value);
    message.value = '';
    document.getElementById('messageList').scrollTo(0, document.getElementById('messageList').scrollHeight);
}

</script>
<template>
    <div class="w-full h-full shadow-lg rounded-md p-5 flex flex-col space-y-4">
        <div v-if="active !== '0'" class="w-full h-full rounded-lg shadow-lg p-4 flex flex-col-reverse overflow-auto">
            <div id="messageList" class="flex flex-col">
                <div v-for="msg of messages">
                    <div v-if="msg.sendId == parseInt(account)" class="mt-3">
                        <p class="inline-block p-2 shadow-2xl rounded-3xl bg-slate-50 text-black font-bold float-start">{{
                            msg.content }}</p>
                    </div>
                    <div v-else class="mt-3">

                        <p class="inline-block p-2 shadow-xl rounded-3xl bg-pink-400 text-white font-bold float-end">{{
                            msg.content }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="active !== '0'" class="flex space-x-3">
            <input id="message-input" v-on:keyup.enter="sendMessage" v-model="message" type="text" style="align-self: flex-end;"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                placeholder="Send message">
            <button @click="sendMessage"
                class="h-[50px] w-[54px] flex items-center active:ring-4 focus:ring-pink-300 focus:border-pink-500 outline-none justify-center rounded-full shadow-lg hover:bg-pink-400 duration-200">
                <svg class="fill-pink-400 hover:fill-white duration-200" width="40px" height="40px" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>