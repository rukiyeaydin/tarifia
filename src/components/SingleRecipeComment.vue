<script>
import pimage from '../assets/images/pimage.jpg'

export default{
    data(){
        return{
            pimage: pimage,
            isInputFocused: false
        }
    },
    methods:{
        toggleInputFocus(){
            this.isInputFocused = true
        },
        toggleInputOnfocus(){
            this.isInputFocused = false
        }
    }
}

</script>


<template>
    <div class="my-20 flex flex-col w-full">
        <div class="">
            <h2 class="text-xl font-bold">12 Comments</h2>
            <hr class="border-black mt-2">
            <div class="my-3 flex items-end">
                <input type="text" class="outline-none w-full border-b py-2 border-gray-300 text-sm focus:border-gray-400" placeholder="Leave a comment" @focus="toggleInputFocus">
                <div v-if="isInputFocused" class="flex gap-2">
                    <button class="bg-footerbg w-16 h-8 rounded-xl text-white text-sm" @click="toggleInputOnfocus">Cancel</button>
                    <button class="bg-profilebottom w-16 h-8 rounded-xl text-white text-sm">Add</button>
                </div>
            </div>
            <div class="comments mt-5">
                <div class="single-comment bg-slate-100 rounded-lg p-2 flex mb-3">
                    <img :src="pimage" alt="profile" class="w-12 h-12 rounded-full mr-2">
                    <div>
                        <router-link to="/profile">
                            <label class="font-medium mb-1 cursor-pointer">rukiyeaydin</label>
                        </router-link>
                        <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque necessitatibus soluta molestiae sapiente corrupti voluptate voluptatibus sequi unde corporis iusto?</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>