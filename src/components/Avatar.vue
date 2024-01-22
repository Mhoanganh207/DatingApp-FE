<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const avatar = ref('');
const id = ref('');
const router = useRoute();

onMounted(() => {
    id.value = router.params.id;
    if (router.params.gender === 'true') {
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

function uploadAvatar() {

    const formData = new FormData();
    formData.append('file', document.getElementById("files").files[0]);
    axios.post('http://localhost:5075/api/account/' + id.value +'/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });

}

</script>

<template>
    <div class="flex h-screen justify-center items-center">

        <div class="flex flex-col pt-11 pb-11 pl-14 pr-14 shadow-lg rounded-md items-center space-y-5">
            <h1 class="text-2xl font-bold">Upload your avatar</h1>

            <div>
                <img id="avatar" class="w-80 h-80 object-cover" :src="getImage()" alt="avatar">
            </div>
            <div class="flex space-x-3">
                <input @change="handleImage" type="file" id="files" class="hidden" />
                <label
                    class="cursor-pointer p-3 w-36 bg-pink-400 text-white font-bold rounded-xl text-center hover:bg-pink-500 duration-150"
                    for="files">Change avatar</label>
                <button @click="uploadAvatar"
                    class="bg-pink-400 hover:bg-pink-500 duration-150 p-2 text-white font-bold rounded-xl ">Save</button>
            </div>

    </div>
</div></template>