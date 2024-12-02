<script>
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      user: null, // Kullanıcı bilgilerini tutacak
    };
  },
  created() {
    this.fetchUserData(); 
  },
  methods: {
    async fetchUserData() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid); 
          const userSnapshot = await getDoc(userRef);
          
          if (userSnapshot.exists()) {
            this.user = userSnapshot.data(); 
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="profile-top flex flex-col items-center justify-center py-10 bg-slate-100">
      <img
        src="https://res.cloudinary.com/rukiyeaydincloud/image/upload/v1726510471/mh8zciykm4iy0ow8jzny.jpg"
        alt="profile"
        class="w-20 h-20 rounded-full"
      />
      
      <!-- Kullanıcı adı ve bilgileri -->
      <h1 class="font-bold text-lg">{{ user ? user.fullName : 'Loading...' }}</h1>
      <p class="mb-5">{{ user ? `@${user.username}` : '' }}</p>
      
      <div class="flex items-center justify-center gap-10">
        <div class="flex flex-col items-center justify-center">
          <p class="font-semibold">Recipes</p>
          <p>{{ user ? user.recipes.length : 0 }}</p>
        </div>
      </div>
      
    </div>
  </div>
</template>