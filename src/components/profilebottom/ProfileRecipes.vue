<script>
import { auth } from '../../firebase/firebase';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import chicken from '../../assets/images/international.jpg';  

export default {
  data() {
    return {
      recipes: [], 
      recipeIds: [],
      chicken: chicken
    };
  },
  created() {
    this.fetchUserRecipes(); 
  },
  methods: {
    async fetchUserRecipes() {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const userRef = doc(db, 'users', currentUser.uid); 
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const recipeIds = userSnapshot.data().recipes || [];

        // console.log("Recipe IDs:", recipeIds);
        
        const recipePromises = recipeIds.map(async (recipeId) => {
          const recipeRef = doc(db, 'recipes', recipeId); 
          const recipeSnapshot = await getDoc(recipeRef);
          
          if (recipeSnapshot.exists()) {
            // Recipe'ye ID'yi ekle
            return { id: recipeSnapshot.id, ...recipeSnapshot.data() };                 
          } else {
            console.log(`No recipe found with ID: ${recipeId}`);
            return null;
          }
        });
        
        const recipesData = await Promise.all(recipePromises)
        // console.log("User Recipe IDs:", userSnapshot.data().recipes);
        this.recipes = recipesData.filter(recipe => recipe !== null);
        
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }
},

    formatDate(timestamp) {
      const date = timestamp.toDate(); 
      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear(); 
      return `${day}/${month}/${year}`; 
    }
  }
};
</script>

<template>
  <div class="flex flex-col w-11/12 md:w-1/2 p-4">
    <div v-for="(recipe, index) in recipes" :key="index">
      <router-link :to="`/recipe/${recipe.id}`" class="single-recipe flex p-2 my-2 rounded-md border border-secondary shadow-md">
        <img :src="chicken" alt="recipe-image" class="w-24 h-24 mr-2"> 
        <div class="flex flex-col justify-between">
          <h2 class="font-bold">{{ recipe.title }}</h2>
          <label class="text-sm">by <span class="font-medium">{{ recipe.username || 'unknown' }}</span></label>
          
          <p class="text-sm font-mono">{{ formatDate(recipe.createdTime) }}</p> 
        </div>
      </router-link>
    </div>
  </div>
</template>
