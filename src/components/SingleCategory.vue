<script>
import chicken from '../assets/images/international.jpg'; 
import { useRoute } from 'vue-router';
import { ref, onMounted } from "vue";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default {
  setup() {
    const categoryRecipes = ref([]); // Tarifleri tutacak reaktif değişken
    const route = useRoute();

    // Kategori adı, baş harf büyük olacak şekilde düzenleniyor
    const categoryName = route.params.categoryName.slice(0, -1); // 's' sonunu çıkartmak için
    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

    onMounted(() => {
      const recipesCollection = collection(db, "recipes"); // Tarifler koleksiyonunu al
      const orderedQuery = query(recipesCollection, orderBy("createdTime", "desc")); // Tarihe göre sıralama

      onSnapshot(
        orderedQuery,
        (snapshot) => {
          // Kategoriyi filtreleyip, ID ile birlikte tarif verilerini alıyoruz
          categoryRecipes.value = snapshot.docs
            .map((doc) => ({
              id: doc.id, // Firestore'dan gelen her dokümanın ID'sini ekliyoruz
              ...doc.data(),
            }))
            .filter(recipe => recipe.category === formattedCategoryName); // Kategoriyi filtrele

          console.log("Filtered recipes:", categoryRecipes.value);
        },
        (error) => {
          console.error("Error listening to real-time updates:", error);
        }
      );
    });

    return {
      chicken, 
      categoryRecipes, // Tarifleri döndürüyoruz
    };
  },
};
</script>

<template>
  <div class="p-4">
    <div class="category-recipes mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10 lg:mx-36">
      <!-- Tarifleri dinamik olarak oluştur -->
      <router-link v-for="recipe in categoryRecipes" :key="recipe.id" :to="`/recipe/${recipe.id}`">
        <div class="category-recipe shadow-md p-2 flex flex-col items-center">
          <img :src="recipe.image || chicken" :alt="recipe.title" class="w-full max-w-xs">
          <h2 class="mt-2 font-bold text-center">{{ recipe.title }}</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>