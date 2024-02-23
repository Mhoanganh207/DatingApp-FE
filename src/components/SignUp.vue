<script setup>
import axios from 'axios';
import Account from '../models/account.js';
import { ref, onMounted } from 'vue';
import router from '@/router';
import  AuthService  from '../services/auth.service.js';

const firstname = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const gender = ref('');
const birthdate = ref('');

onMounted(() => {
    if (window.localStorage.getItem('token') !== null) {
        router.push({
            path: `/main`,
        });
    }
});

async function signUp() {
    const account = new Account(email.value, password.value, firstname.value, surname.value, gender.value, new Date(birthdate.value).toJSON(), '');
    let response = await AuthService.signUp(account)
    if (response){
        router.push({
            path: `/account/avatar/${response.data.id}/${gender.value}`,
        });
    }
}


</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900 font-bold">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-80" src="../assets/images/logo.png" alt="logo">
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-5 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create account
                    </h1>
                    <form class="space-y-3 md:space-y-6" action="#">
                        <div class="flex space-x-2">
                            <input v-model="firstname" type="text" name="name"
                                class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-1/2 p-2.5 "
                                placeholder="First name" required>
                            <input v-model="surname" type="text" name="name"
                                class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-1/2 p-2.5 "
                                placeholder="Surname" required>
                        </div>
                        <div>
                            <input v-model="email" type="email" name="email" id="email"
                                class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                                placeholder="Email" required>
                        </div>
                        <div>
                            <input v-model="password" type="password" name="password" id="password" placeholder="Password"
                                class="logIn-input bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                                required>
                        </div>
                        <div class="flex space-x-2">
                            <div class="w-1/2">
                                <label>Gender</label>
                                <div class="flex mt-2 space-x-6">
                                    <div class="flex items-center">
                                        <input v-model="gender" id="default-radio-1" type="radio" :value="true"
                                            name="default-radio"
                                            class="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-300">
                                        <label for="default-radio-1"
                                            class="ms-1 text-sm font-semibold text-gray-900 dark:text-gray-300">Male</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input v-model="gender" id="default-radio-2" type="radio" :value="false"
                                            name="default-radio"
                                            class="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-300">
                                        <label for="default-radio-2"
                                            class="ms-1 text-sm font-semibold text-gray-900 dark:text-gray-300">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2">
                                <label>Birthdate</label>
                                <div class="relative max-w-sm">
                                    <input v-model="birthdate" type="date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-300 block w-full p-2.5"
                                        placeholder="Select date">
                                </div>

                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300 text-pink-300"
                                    required>
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class=" text-gray-500 dark:text-gray-300">I accept the <a
                                        class="text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and
                                        Conditions</a></label>
                            </div>
                        </div>
                        <button @click.prevent="signUp" type="submit"
                            class="w-full text-white bg-pink-400 font-bold hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-lg text-md px-5 py-2.5 text-center">Create
                            an account</button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>