<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const query = ref('');
const router = useRouter();
const searchHidden = ref(true);

function showSearch() {
    if(searchHidden.value){
        searchHidden.value = false;
        document.getElementById('search-div').classList.remove('hidden');
        document.getElementById('logo').classList.add('hidden');
    }
    else{
        searchHidden.value = true;
        document.getElementById('search-div').classList.add('hidden');
        document.getElementById('logo').classList.remove('hidden');
    }
   
}

function searchUser() {
    console.log(query.value);
    router.push('/main/?search='+ query.value);
}


</script>

<template>

    <div id="search-div" class="hidden flex-grow h-12 items-center pl-3 rounded-3xl shadow-xl ml-5 mr-3">
        <input @keyup.enter="searchUser" v-model="query" type="text" class="h-[44px] w-[95%] border-0 outline-none focus:ring-0 font-bold">
    </div>
    <button  @click="showSearch"  class="ml-auto float-left search-btn rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-pink-400 duration-200 mr-3">
            <svg v-if="searchHidden" class="fill-pink-500" height="28px" width="28px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 296.999 296.999" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M156.215,53.603c-13.704-13.704-31.924-21.251-51.302-21.251c-19.38,0-37.6,7.548-51.302,21.251
				c-3.855,3.855-3.855,10.105,0,13.96c3.856,3.854,10.104,3.854,13.96,0c9.974-9.975,23.236-15.469,37.342-15.469
				c14.106,0,27.368,5.494,37.342,15.469c20.59,20.59,20.59,54.094,0,74.685c-3.855,3.855-3.855,10.105,0,13.96
				c1.928,1.927,4.454,2.891,6.98,2.891s5.052-0.964,6.98-2.891C184.503,127.92,184.503,81.891,156.215,53.603z"/>
			<path d="M289.054,250.651l-93.288-93.288c23.145-40.108,17.591-92.372-16.674-126.637C159.278,10.912,132.933,0,104.913,0
				c-28.022,0-54.365,10.912-74.18,30.727C10.918,50.542,0.007,76.884,0.007,104.906c0,28.021,10.912,54.365,30.727,74.179
				c20.452,20.451,47.315,30.676,74.179,30.676c18.145,0,36.287-4.672,52.456-14.003l93.289,93.287
				c5.127,5.129,11.946,7.954,19.197,7.954c7.253,0,14.071-2.824,19.198-7.953C299.639,278.461,299.639,261.238,289.054,250.651z
				 M104.913,190.029c-21.806-0.003-43.619-8.303-60.219-24.904c-16.086-16.085-24.945-37.471-24.945-60.219
				s8.859-44.134,24.945-60.219c16.085-16.086,37.471-24.945,60.219-24.945c22.748,0,44.133,8.859,60.219,24.945
				c33.205,33.205,33.205,87.233,0,120.438C148.528,181.729,126.724,190.031,104.913,190.029z M275.094,275.088
				c-1.4,1.399-3.259,2.17-5.238,2.17c-1.978,0-3.838-0.771-5.237-2.171l-90.952-90.951c1.852-1.61,3.664-3.289,5.426-5.051
				c1.761-1.761,3.441-3.573,5.05-5.425l90.951,90.951C277.982,267.5,277.982,272.199,275.094,275.088z"/>
		</g>
	</g>
</g>
</svg>
<svg v-else class="fill-pink-500" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 492 492" xml:space="preserve">
<g>
	<g>
		<path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
			c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
			c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
			L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
			c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
			c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
			c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
	</g>
</g>
</svg>
    </button>
   

    

</template>