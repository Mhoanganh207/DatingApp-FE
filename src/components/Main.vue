<script setup>
import Header from './Header.vue';
</script>

<template>
    <Header signedIn='1' />

    <div class="flex items-center justify-center bg-transparent">
        <div class="user-carousel">
            <div class="inline-flex overflow-x-scroll h-[90vh] no-scrollbar w-screen pb-4 pl-16 pt-16 space-x-4">
                <div v-for="index of [1,2,4,5,6,7]" class="carousel-item  card w-[380px] h-[500px] bg-white shadow-2xl rounded-2xl p-2 flex items-center flex-col space-y-4 z-20">
                    <div style="background-image: url(https://fansport.vn/upload/product/15/88/99/ao-messi-10-barcelona-2014-2015-home-shirt-jersey-red-blue-20200509115242-970066.jpg); background-size: cover;" alt=""
                        class="w-[320px] h-[400px] rounded-lg shadow-md flex items-end p-7 user-image">
                        <div>
                            <div class="text-lg font-bold hidden"> Lionel Messi </div>
                            <div class="font-semibold hidden"> 37 </div>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button
                            class="bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-[#f796a6] duration-300 w-14 h-14">
                            <svg width="50" height="50" viewBox="0 0 24 24" class="fill-[#f796a6] hover:fill-white duration-300">
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 5.881C12.981 4.729 14.484 4 16.05 4C18.822 4 21 6.178 21 8.95C21 12.3492 17.945 15.1195 13.3164 19.3167L13.305 19.327L12 20.515L10.695 19.336L10.6595 19.3037C6.04437 15.1098 3 12.3433 3 8.95C3 6.178 5.178 4 7.95 4C9.516 4 11.019 4.729 12 5.881Z" />
                            </svg>
                        </button>
                        <button
                            class="bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-green-300 duration-300 w-14 h-14">
                            <svg class="fill-green-300 hover:fill-white duration-300" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40"
                                viewBox="0 0 233.058 233.058" xml:space="preserve">
                                <g>
                                    <path d="M116.538,4.05C52.284,4.05,0,45.321,0,96.043c0,28.631,16.729,55.208,45.889,72.911c4.525,2.737,7.635,7.283,8.572,12.478
		                         c2.876,16.045-0.991,32.948-6.758,47.576c19.239-9.134,39.064-23.161,54.8-36.63c3.879-3.314,9.055-4.701,14.087-4.354h0.023
		                        c64.191,0,116.445-41.259,116.445-91.987C233.058,45.321,180.792,4.05,116.538,4.05z" />
                                </g>
                            </svg>
                        </button>
                        <button
                            class="bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-black duration-300 w-14 h-14">
                            <svg class="fill-red-500 hover:fill-white duration-300" width="50" height="50" viewBox="0 0 32 32" version="1.1"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.961 12.209c0.244-0.244 0.244-0.641 0-0.885l-1.328-1.327c-0.244-0.244-0.641-0.244-0.885 0l-3.761 3.761-3.761-3.761c-0.244-0.244-0.641-0.244-0.885 0l-1.328 1.327c-0.244 0.244-0.244 0.641 0 0.885l3.762 3.762-3.762 3.76c-0.244 0.244-0.244 0.641 0 0.885l1.328 1.328c0.244 0.244 0.641 0.244 0.885 0l3.761-3.762 3.761 3.762c0.244 0.244 0.641 0.244 0.885 0l1.328-1.328c0.244-0.244 0.244-0.641 0-0.885l-3.762-3.76 3.762-3.762z">
                                </path>
                            </svg>

                        </button>
                    </div>
                </div>
                
            </div>  
            </div>
        </div>
</template>

<style scoped>

.user-image div {
    transition: 1s;
}

.user-image:hover div {
    display: block;
}
</style>