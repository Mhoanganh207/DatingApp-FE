<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import UserService from '../services/user.service'
const introduction = ref('');
const avatar = ref('');
const id = ref('');
const route = useRoute();
const load = ref(false);
const fileEmpty = ref(false);
const interestedList = [{ "id": 1, "name": 'Sport' }, { "id": 2, "name": 'Music' }, { "id": 3, "name": 'Movie' }, { "id": 4, "name": 'Game' }, { "id": 5, "name": 'Reading' }, { "id": 6, "name": 'Travel' }, { "id": 7, "name": 'Cooking' }, { "id": 8, "name": 'Photography' }, { "id": 9, "name": 'Art' }, { "id": 10, "name": 'Fashion' }, { "id": 11, "name": 'Technology' }, { "id": 12, "name": 'Science' }, { "id": 13, "name": 'Education' }, { "id": 14, "name": 'Health' }, { "id": 15, "name": 'Business' }];
const list = [];
onMounted(() => {
    id.value = route.params.id;
    if (route.params.gender === 'true') {
        avatar.value = 'src/assets/images/male.jpeg';
    } else {
        avatar.value = 'src/assets/images/female.jpeg'
    }
    return;
});


function getImage() {
    return avatar.value;
}


function handleImage(e) {
    document.getElementById("avatar").setAttribute("src", URL.createObjectURL(e.target.files[0]));
}

function addtoList(index, event) {
    if (event.target.classList.contains("bg-pink-300")) {
        event.target.classList.remove("bg-pink-300");
        event.target.classList.remove("text-white");
        event.target.classList.add("bg-white");
        list.splice(list.indexOf(interestedList[index]), 1);
        return;
    }
    list.push(interestedList[index]);
    event.target.classList.remove("bg-white");
    event.target.classList.add("bg-pink-300");
    event.target.classList.add("text-white");
}

function getInterestedList() {
    console.log(list);
    return list;
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
    getInterestedList();
    UserService.updateInterestedList(id.value, getInterestedList(), introduction.value)
    UserService.postAvatar(id.value, formData).then(response => {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem("refreshtoken", response.data.refreshtoken);
        router.push({
            path: `/main`,
        });
    }).catch(error => {
        console.log(error);
        load.value = false;
    });

}

</script>

<template>
    <div class="flex h-screen justify-center items-center ">

        <div
            class="flex flex-col md:flex-row pt-11 pb-11 pl-14 pr-14 shadow-lg rounded-md space-x-0 md:space-x-8  md:space-y-0 space-y-5">
            <div class="flex flex-col w-80 items-center space-y-4 mt-44 md:mt-0 ">
                <h2 class="text-2xl font-bold">Chose what you are interested in</h2>
                <div class="interestedBox">
                    <button @click="addtoList(index, $event)" v-for="(infor, index) in interestedList"
                        class="text-gray-900  bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-bold rounded-lg visited:bg-pink-400 text-sm px-4 py-2 m-1"
                        href="">{{ infor.name }}</button>
                </div>
                <h2 class="text-2xl font-bold">Write something about yourself</h2>
                <textarea v-model="introduction" id="message" rows="4"
                    class="block p-2.5 w-full font-bold text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-300 focus:border-pink-400 "
                    placeholder="Write your thoughts here..."></textarea>


            </div>
            <div class="flex flex-col space-y-5 items-center w-80">
                <h1 class="text-2xl font-bold">Upload your avatar</h1>
                <div>
                    <img id="avatar" class="w-80 h-80 object-cover "
                        :class="{ 'border-spacing-1 border-2 border-red-600': fileEmpty }" :src="getImage()"
                        alt="avatar">
                </div>
                <div v-if="fileEmpty" class="font-bold text-red-600">Please upload your avatar</div>
                <div class="flex space-x-3">
                    <input @change="handleImage" type="file" accept="image/*" id="files" class="hidden" />
                    <label
                        class="h-12 cursor-pointer p-3 w-36 bg-pink-400 text-white font-bold rounded-xl text-center hover:bg-pink-500 duration-150"
                        for="files">Change avatar</label>
                    <button @click="uploadAvatar"
                        class="flex h-12 bg-pink-400 hover:bg-pink-500 duration-150 p-2 text-white font-bold rounded-xl items-center">
                        <div v-if="!load">Save</div>
                        <span v-else class="loader"></span>
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>