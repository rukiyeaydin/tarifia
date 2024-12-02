<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import chicken from "../assets/images/international.jpg";

export default {
    data() {
        return {
            chicken: chicken,
        };
    },
  setup() {
    const route = useRoute(); 
    const recipe = ref(null);
    const loading = ref(true); 

    onMounted(async () => {
      try {
        const recipeId = route.params.id; 
        const recipeDoc = doc(db, "recipes", recipeId); 
        const docSnap = await getDoc(recipeDoc);

        if (docSnap.exists()) {
          recipe.value = docSnap.data(); 
          console.log("Tarif bulundu:", recipe.value);
          
        } else {
          console.error("Tarif bulunamadı");
        }
      } catch (error) {
        console.error("Firebase'den veri alınırken hata oluştu:", error);
      } finally {
        loading.value = false; 
      }
    });

    return {
      recipe,
      loading,
    };
  },
};
</script>

<template>
    <div class="p-4 flex flex-col items-center justify-center">
      <div v-if="loading" class="text-center">Yükleniyor...</div>
      
      <div v-else class="w-full md:w-1/2">
        <div class="flex flex-col items-center justify-center">
          <h1 class="custom-h1 mt-10">{{ recipe.title || 'Tarif Başlığı' }}</h1>
          <router-link to="/profile">
            <p class="font-semibold italic mt-5 mb-2">By: {{ recipe.username || 'Yazar' }}</p>
          </router-link>
  
          <img :src="chicken" :alt="recipe.title" class="my-10 rounded-2xl w-10/12 h-10/12 sm:h-96 sm:w-96">
  
          <!-- Dinamik içerik renderi -->
          <div v-html="recipe.content || 'Tarif açıklaması'" class="mb-20"></div>
        </div>
      </div>
    </div>
</template>