<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
import MessageBox from './MessageBox.vue';
import UserService from '../services/user.service';
import connection from '../services/chat.connection';

const messages = ref([]);
const router = useRouter();
const route = useRoute();
const active = ref('0');
const chatId = ref('0');
const boxactive = ref(0);


onMounted(async () => {

    if (connection.state === 'Disconnected') {
        await connection.start();
    }

    if (route.params.id !== undefined) {
        active.value = route.params.id;
        boxactive.value = route.params.id;
    }
    else {
        active.value = '0';
    }
    try {
        const response = await UserService.getChat();
        messages.value = response.data.chatList;

        messages.value.map(async (element) => {
            const accountResponse = await UserService.getUserById(element.accountId);
            element.firstname = accountResponse.data.firstname;
            element.surname = accountResponse.data.surname;
            const avatarResponse = await getUserAvatar(accountResponse.data.id);
            element.avatarurl = avatarResponse ? URL.createObjectURL(avatarResponse) : null;
            if (element.lastMessage.sentId != element.accountId) {
                element.lastmessage = "You: " + element.lastMessage.content;
            }
            else {
                element.lastmessage = element.firstname + ' ' + element.surname + ": " + element.lastMessage.content;
            }
        });

    } catch (error) {
        console.error('Error fetching messages:', error);
    }

    connection.on("NewMessage", (chatId, sendId, message) => {
        const index = messages.value.findIndex(msg => msg.accountId == sendId);
        reArrangeMessages(index, (item) => {
            item.lastMessage.sentId = sendId;
            item.lastMessage.content = message;
            item.lastmessage = item.firstname + ' ' + item.surname + ": " + message;
        })
    })
});

async function updateMessages(chatId, message) {
    const index = messages.value.findIndex(msg => msg.chatId == chatId);
    reArrangeMessages(index, (item) => {
        item.lastmessage = "You: " + message;
    });
    

}

async function getUserAvatar(id) {
    let result = await UserService.getAvatarById(id);
    return result;

}

function reArrangeMessages(index,callback) {
    const item = messages.value[index];
    for (let i = index; i > 0; i--) {
        messages.value[i] = messages.value[i - 1];
    }
    messages.value[0] = item;
    callback(item);
}


</script>
<template>
    <div class="space-y-3">
        <div v-for="msg of messages" @click="() => {
            active = msg.accountId.toString();
            chatId = msg.chatId.toString();
            router.push('/account/message/' + msg.chatId + '/' + msg.accountId);
            boxactive = msg.chatId;
        }" :class="{ 'bg-zinc-100': boxactive == msg.chatId }"
            class="w-[65px] h-[65px] lg:w-[350px] lg:h-[70px] p-2 flex shadow-lg rounded-lg items-center space-x-4 cursor-pointer">
            <AnimatedPlaceholder v-if="!msg.avatarurl" height="50px" width="65px" border-radius="50%" />
            <img v-if="msg.avatarurl" width="50px" height="50px" class="rounded-full object-cover shadow-md"
                style="height: 50px !important; width: 50px !important;" :src="msg.avatarurl">
            <div class="font-bold w-full hidden lg:block">
                <div v-if="msg.avatarurl">{{ msg.firstname + ' ' + msg.surname }}</div>
                <AnimatedPlaceholder v-if="!msg.avatarurl" height="15px" width="130px" border-radius="20px" />
                <div class="inline w-full last-message">
                    <div class="text-xs text-gray-400 ">{{
                        msg.lastmessage }}</div>
                </div>
            </div>
        </div>
    </div>
    <MessageBox :active="active" :chatId="chatId" @SendMessage="updateMessages" />
</template>