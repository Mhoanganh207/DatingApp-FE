<script setup>
import { onMounted, ref } from "vue";
import UserService from "@/services/user.service";
import Header from "./Header.vue";

const user = ref(null);
const firstName = ref('');
const surName = ref('');
const address = ref('');
const introduction = ref('');
const load = ref(false);
const changeAvatar = ref(0);


onMounted( async ()=>{
    user.value = await UserService.getInfor();
    firstName.value = user.value.firstname;
    surName.value = user.value.surname;
    address.value = user.value.address;
    introduction.value = user.value.introduction;
})

function getAvatar() {
    return window.localStorage.getItem('avatar');
}

function handleImage(e) {
    document.getElementById("avatar1").setAttribute("src", URL.createObjectURL(e.target.files[0]));
}



function uploadAvatar() {
    const files = document.getElementById("files").files;
    if (files.length === 0) {
        fileEmpty.value = true;
        return;
    }
    const formData = new FormData();
    formData.append('file', files[0]);
    load.value = true;
    UserService.putAvatar(formData).then(response => {
        load.value = false;
        window.localStorage.setItem('avatar', response);
        changeAvatar.value = 1;
    }).catch(error => {
        console.log(error);
        load.value = false;
    });

}

async function updateInfor() {
    let infor = {
        firstname: firstName.value,
        surname: surName.value,
        address: address.value,
        introduction: introduction.value}
    UserService.updateUserInfor(infor).then((res) => {
        console.log(res);
    })
}

</script>


<template>

   <Header signedIn='1' :changeAvatar=changeAvatar />
   <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
    
    <div class="w-full min-h-screen py-1">
        <div class="w-full p-2 md:p-4">
            <div class="w-full px-6 pb-8 mt-8 sm:rounded-lg">

                <div class="flex flex-col md:flex-row mt-4 w-full space-x-1">
                    <div class="flex flex-row md:flex-col space-y-5 space-x-4  w-full md:w-1/4">

                        <img id="avatar1" class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-pink-300 dark:ring-pink-500"
                            :src="getAvatar()"
                            alt="Bordered avatar">

                        <div class="flex flex-col space-y-5">
                            <input @change="handleImage" type="file" accept="image/*" id="files" class="hidden" />
                            <label for="files"
                                class="py-3.5 px-7 w-[130px] text-center text-base font-medium text-pink-100 focus:outline-none bg-pink-400 rounded-lg border border-pink-200 hover:bg-pink-600 focus:z-10 focus:ring-4 focus:ring-pink-200 ">
                                Change
                            </label>
                            <button @click="uploadAvatar" type="button"
                                class="py-3.5 px-7 w-[130px] text-base font-medium text-pink-900 focus:outline-none bg-white rounded-lg border border-pink-200 hover:bg-pink-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-pink-200 ">
                                <div v-if="!load">Save</div>
                        <span style="color: pink;" v-else class="loader"></span>
                            </button>
                        </div>
                    </div>

                    <div class="items-center mt-8 sm:mt-14 text-[#cd8ef5] w-full md:w-2/3">

                        <div
                            class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div class="w-full">
                                <label for="first_name"
                                    class="block mb-2 text-sm font-medium text-pink-900 dark:text-white">Your
                                    first name</label>
                                <input v-model="firstName" type="text" id="first_name"
                                    class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                                    placeholder="Your first name" >
                            </div>

                            <div class="w-full">
                                <label for="last_name"
                                    class="block mb-2 text-sm font-medium text-pink-900 dark:text-white">Your
                                    surname</label>
                                <input v-model="surName"  type="text" id="last_name"
                                    class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                                    placeholder="Your surname"  >
                            </div>

                        </div>


                        <div class="mb-2 sm:mb-6">
                            <label for="address"
                                class="block mb-2 text-sm font-medium text-pink-900 dark:text-white">Your address</label>
                            <input v-model="address" type="text" id="address"
                                class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                                placeholder="your address" >
                        </div>

                        <div class="mb-6">
                            <label for="message"
                                class="block mb-2 text-sm font-medium text-pink-900 dark:text-white">Introduction</label>
                            <textarea v-model="introduction" id="message" rows="4"
                                class="block p-2.5 w-full text-sm text-pink-900 bg-pink-50 rounded-lg border border-pink-300 focus:ring-pink-500 focus:border-pink-500 "
                                placeholder="Write your introduction here..."></textarea>
                        </div>

                        <div class="flex justify-end">
                            <button @click="updateInfor"
                                class="text-white bg-pink-700  hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
*{
    font-weight: bold;
}
</style>
