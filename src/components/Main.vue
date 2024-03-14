<script setup>
import { ref, onMounted, watch } from 'vue';
import Header from './Header.vue';
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
import UserService from "../services/user.service"
import ChatService from "../services/chat.service"
import { useRoute } from 'vue-router';
const userList = ref([]);
const route = useRoute();
let page = 1;

watch(() => route.query, fetchData, { immediate: true })


async function fetchData() {
    if (route.query.search) {
        userList.value = await UserService.searchUser(route.query.search);
        console.log(userList.value);
        await updateUserData();
    }
    else {
        if(page > 1) page--;
        await getUserList();
        console.log(userList.value);
        await updateUserData();
    }
}

async function getUserList() {
            userList.value = await UserService.getUser(page);
            page++;
}
async function updateUserData() {
    userList.value.forEach(async (user) => {
        const blob = await getUserAvatar(user.id);
        const imageUrl = URL.createObjectURL(blob);
        user.avatarurl = imageUrl;
    });
}
async function getUserAvatar(id) {
    let result = await UserService.getAvatarById(id);
    return result;

}
function addToFavorite(id) {
    document.getElementById('carousel').removeChild(document.getElementById(id));
    UserService.addUserToFavList(id);
}
function showBox(id) {
    if (document.getElementById('textbox' + id).style.display === 'none') {
        document.getElementById('textbox' + id).style.display = 'flex';
    }
    else {
        document.getElementById('textbox' + id).style.display = 'none';
    }
}
function sentMessage(id) {
    let message = document.getElementById('textbox' + id).children[0].value;
    document.getElementById('carousel').removeChild(document.getElementById(id));
    ChatService.sendMessage(message,id)
}

</script>

<template>
    <Header signedIn='1' />
    <div class="flex items-center justify-center bg-transparent z-10 absolute">
        <div class="user-carousel">
            <div id="carousel"
                class="inline-flex overflow-x-scroll h-[90vh] no-scrollbar w-screen pb-4 pl-16 pt-16 space-x-4">
                <div v-for="user of userList" :id="user.id"
                    class="z-0 carousel-item  card w-[380px] h-[500px] bg-white shadow-2xl rounded-2xl p-2 flex items-center flex-col space-y-4">
                    <div v-if="user.avatarurl"
                        :style="{ backgroundImage: `url('${user.avatarurl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
                        alt=""
                        class="h-[400px] w-[340px] rounded-lg shadow-md flex flex-col-reverse items-end p-7 user-image">
                        <div :id="'textbox' + user.id"
                            class="h-[100px] rounded-md shadow-lg p-2 bg-white z-30 space-x-2" style="display: none;">
                            <textarea
                                class="w-4/5 focus:border-pink-400 border-spacing-1 border-gray-200 rounded-md border-2 focus:outline-none focus:ring-pink-300">
                            </textarea>
                            <button @click="sentMessage(user.id)"
                                class="w-1/5 h-[30px] bg-pink-400 hover:bg-pink-500 duration-200 rounded-md text-white font-bold">Send</button>
                        </div>
                        <div class="w-full">
                            <div class="text-lg font-bold text-white"> {{ user.firstname + ' ' + user.surname }} </div>
                            <div class="font-semibold text-pink-200"> {{ user.age }} </div>
                            <div class="font-medium text-pink-100"> {{ user.introduction }}</div>
                        </div>
                    </div>
                    <AnimatedPlaceholder v-if="!user.avatarurl" height="400px" width="320px" borderRadius="1rem" />
                    <div class="flex space-x-4">
                        <button @click="addToFavorite(user.id, $event)"
                            class="bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-[#f796a6] duration-300 w-14 h-14">
                            <svg width="50" height="50" viewBox="0 0 24 24"
                                class="fill-[#f796a6] hover:fill-white duration-300">
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 5.881C12.981 4.729 14.484 4 16.05 4C18.822 4 21 6.178 21 8.95C21 12.3492 17.945 15.1195 13.3164 19.3167L13.305 19.327L12 20.515L10.695 19.336L10.6595 19.3037C6.04437 15.1098 3 12.3433 3 8.95C3 6.178 5.178 4 7.95 4C9.516 4 11.019 4.729 12 5.881Z" />
                            </svg>
                        </button>
                        <button @click="showBox(user.id)"
                            class="bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-green-300 duration-300 w-14 h-14">
                            <svg class="fill-green-300 hover:fill-white duration-300" version="1.1" id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40"
                                height="40" viewBox="0 0 233.058 233.058" xml:space="preserve">
                                <g>
                                    <path d="M116.538,4.05C52.284,4.05,0,45.321,0,96.043c0,28.631,16.729,55.208,45.889,72.911c4.525,2.737,7.635,7.283,8.572,12.478
		                         c2.876,16.045-0.991,32.948-6.758,47.576c19.239-9.134,39.064-23.161,54.8-36.63c3.879-3.314,9.055-4.701,14.087-4.354h0.023
		                        c64.191,0,116.445-41.259,116.445-91.987C233.058,45.321,180.792,4.05,116.538,4.05z" />
                                </g>
                            </svg>
                        </button>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>