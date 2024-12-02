<script>
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { collection, addDoc, Timestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';

export default {
  setup() {
    const editor = ref(null); // Quill Editor reference
    const content = ref(''); // Quill content
    const selectedCategory = ref('Appetizer'); // Selected category
    const title = ref(''); // Recipe Title
    const categories = ref(['Appetizer', 'Dessert', 'Drink', 'Main', 'Salad', 'Snack']); // Categories
    const username = ref(''); // Username
    const userEmail = ref('');

    // Quill Editor setup
    onMounted(() => {
      const quill = new Quill(editor.value, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      });

      // Get content from Quill editor
      quill.on('text-change', () => {
        content.value = quill.root.innerHTML;
      });

      // Set editor size
      quill.root.style.height = '300px';
      quill.root.style.minHeight = '400px';
      quill.root.style.overflowY = 'auto';
      quill.root.style.paddingBlock = '10px';

      // Get current user's details (username, email)
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        getDoc(userDocRef).then((userDoc) => {
          if (userDoc.exists()) {
            username.value = userDoc.data().username || 'Anonymous'; // Set username
            userEmail.value = currentUser.email; // Set email
          } else {
            console.log("No user document found!");
          }
        });
      }
    });

    const saveRecipe = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log("User not logged in");
          return;
        }

        console.log(currentUser);

        const docRef = await addDoc(collection(db, 'recipes'), {
          title: title.value,
          content: content.value,
          category: selectedCategory.value,
          createdTime: Timestamp.now(),
          userId: currentUser.uid,
          username: username.value,
          userEmail: userEmail.value,
        });

        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const currentRecipes = userData.recipes || []; 

          await updateDoc(userRef, {
            recipes: [...currentRecipes, docRef.id], 
          });
          console.log("Recipe added successfully!");
        } else {
          console.log("User document not found!");
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    // Update Recipe
    const updateRecipe = async (recipeId) => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log("User not logged in");
          return;
        }

        // Get the current recipe document
        const recipeRef = doc(db, 'recipes', recipeId);
        const recipeSnapshot = await getDoc(recipeRef);

        if (recipeSnapshot.exists()) {
          // Updated data
          const updatedData = {
            title: title.value,
            content: content.value,
            category: selectedCategory.value,
            updatedTime: Timestamp.now(),  // New field to track last update time
          };

          // Update the recipe document with new data
          await updateDoc(recipeRef, updatedData);
          console.log("Recipe updated successfully!");
        } else {
          console.log("Recipe not found!");
        }
      } catch (e) {
        console.error("Error updating recipe: ", e);
      }
    };

    return {
      editor,
      content,
      selectedCategory,
      title,
      categories,
      saveRecipe,
      updateRecipe,  // Expose the updateRecipe function to the template
      username,
    };
  },
};
</script>

<template>
  <div class="mt-10 flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold mb-7">Create Your Recipe</h1>

    <div class="w-11/12">
      <!-- Add Image -->
      <label for="category" class="block text-sm font-medium mb-1">Add an image</label>
      <div class="file-input mb-5">
        <input
          type="file"
          name="file-input"
          id="file-input"
          class="file-input__input"
        />
        <label class="file-input__label" for="file-input">
          <span>Upload file</span>
        </label>
      </div>

      <!-- Choose category -->
      <div class="mb-4 w-32">
        <label for="category" class="block text-sm font-medium">Choose a Category</label>
        <select
          id="category"
          v-model="selectedCategory"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="mb-5">
        <label for="title" class="block text-sm font-medium">Recipe Title:</label>
        <input
          type="text"
          v-model="title"
          placeholder="Title"
          class="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none"
        />
      </div>
    </div>

    <!-- Quill Editor -->
    <div class="w-11/12">
      <div ref="editor"></div>
    </div>

    <!-- Save Recipe Button -->
    <button @click="saveRecipe" class="my-5 bg-profilebottom hover:bg-secondary duration-150 px-5 py-1 rounded-lg">
      Share
    </button>

    <!-- <div class="my-10">
      <h3>Output:</h3>
      <div v-html="content"></div>
    </div> -->

    <!-- Update Recipe Button (Optional, you can pass the recipeId to update) -->
    <!-- <button @click="updateRecipe('recipeIdHere')" class="mt-5 bg-profilebottom hover:bg-secondary duration-150 px-5 py-1 rounded-lg">
      Update Recipe
    </button> -->
  </div>
</template>

<style scoped>
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 8px 12px;
  background-color: #CB9DF0;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
</style>
