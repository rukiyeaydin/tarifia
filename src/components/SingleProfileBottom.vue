<script>
import ProfileRecipes from '../components/profilebottom/ProfileRecipes.vue';

export default{
    components:{
        ProfileRecipes
    },
    data(){
        return{
            activeTab: "Recipes"
        }
    },
    methods:{
        setActiveTab(tab){
            this.activeTab = tab;
        }
    }
}

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center">
        <div class="profile-tabs bg-profilebottom w-full flex items-center justify-center">
            <ul class="flex gap-5">
                <li class="cursor-pointer p-3" 
                :class="activeTab === 'Recipes' ? 'border-b-4 border-secondary' : ''"
                @click="setActiveTab('Recipes')"
                >Recipes</li>
            </ul>
        </div>

        <!-- Dinamik İçerik Alanı -->
        <div class="w-full flex flex-col items-center p-5">
            <ProfileRecipes v-if="activeTab === 'Recipes'" />
        </div>

    </div>
</template>