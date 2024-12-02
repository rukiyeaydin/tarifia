<script>
import { useRoute } from 'vue-router';
import SingleCategory from '../components/SingleCategory.vue';

export default {
    components: {
        SingleCategory
    },
    setup() {
        const route = useRoute();
        const categoryName = route.params.categoryName.slice(0,-1);         
        return {
            categoryName
        };
    }
};
</script>

<template>
    <div class="p-4">
        <div class="flex flex-col items-center justify-center bg-slate-100 p-4">
            <h1 class="custom-h1 mb-5">{{ categoryName }} Recipes</h1>
            <p class="text-center italic">Explore our collection of {{ categoryName }} recipes!</p>
        </div>

        <SingleCategory />
    </div>
</template>
