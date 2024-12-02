<script>
import { ref, onMounted } from "vue";
import chicken from "../assets/images/international.jpg";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default {
  setup() {
    const chickenImage = ref(chicken);
    const recipes = ref([]); 

    onMounted(() => {
      const recipesCollection = collection(db, "recipes");
      const orderedQuery = query(recipesCollection, orderBy("createdTime", "desc"));
      
      onSnapshot(
        orderedQuery,
        (snapshot) => {
          recipes.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("Real-time recipes updated (ordered):", recipes.value);
          
        },
        (error) => {
          console.error("Error listening to real-time updates:", error);
        }
      );
    });

    return {
      chickenImage,
      recipes,
    };
  },
};
</script>

<template>
  <div class="my-20 p-4">
    <div class="flex flex-col items-start justify-start">
      <h2 class="custom-h2">See last published recipes</h2>
      <div class="scrollable-area p-4 flex gap-5 sm:gap-8 w-full overflow-x-auto">
        <router-link
          v-for="recipe in recipes"
          :key="recipe.id"
          :to="`/recipe/${recipe.id}`"
          class="recipe flex flex-col"
        >
          <img :src="chickenImage" :alt="recipe.title || 'Recipe Image'" class="w-60 h-60" />
          <div>
            <h2 class="font-semibold w-60">{{ recipe.title || 'Recipe Title' }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.scrollable-area::-webkit-scrollbar {
  height: 7px; /* Kaydırma çubuğu yüksekliği */
}
.scrollable-area::-webkit-scrollbar-thumb {
  background: #FDDBBB; /* Çubuğun rengi */
  border-radius: 4px; /* Köşeleri yuvarlak yap */
}
.scrollable-area::-webkit-scrollbar-thumb:hover {
  background: #F0C1E1; /* Hover durumunda rengi değiştir */
}
.scrollable-area::-webkit-scrollbar-track {
  background: #edf2f7; /* Kaydırma çubuğu izi */
}
</style>
