<script>
import signupui from '../assets/authui/signupui.png';
import { auth, createUserWithEmailAndPassword } from '../firebase/firebase';
import { db } from '../firebase/firebase'; // Firestore importu
import { doc, setDoc } from 'firebase/firestore'; // Firestore'da belge eklemek için gerekli metodlar

export default {
  data() {
    return {
      signupui: signupui,
      fullName: '',
      username: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async signup() {
      try {
        // Firebase ile kullanıcı kaydetme
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          following: [],
          followers: [], 
          recipes: [], 
          recipesLiked: [] 
        });

        this.$router.push('/login');
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<template>
  <div class="flex w-full h-screen items-center justify-center text-center bg-loginbg">
    <div class="flex w-full rounded-xl items-center justify-center mx-0 sm:mx-2">
      <img :src="signupui" alt="signupui" class="h-[450px] w-80 rounded-l-xl hidden sm:block">
      <div class="flex flex-col h-[450px] w-11/12 xxs:w-96 p-4 items-center justify-center bg-white rounded-xl sm:rounded-l-none">
        <h1 class="text-3xl font-bold text-gray-600">Sign Up</h1>
        
        <input v-model="fullName" type="text" placeholder="Full Name" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2 outline-none">
        
        <input v-model="username" type="text" placeholder="Username" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2 outline-none">
        
        <input v-model="email" type="email" placeholder="Email" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2 outline-none">
        
        <input v-model="password" type="password" placeholder="Password" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2">

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        
        <div class="w-full flex items-end justify-end my-3">
          <p class="text-gray-500 text-sm font-semibold">Forgot Password?</p>
        </div>
        
        <button @click="signup" class="w-full h-10 bg-loginprimary text-white rounded-full mt-2 outline-none mb-3">Sign Up</button>

        <router-link to="/login" class="w-full flex items-center justify-center">
          <p class="text-sm">Already have an account? <span class="text-loginprimary">Login</span></p>
        </router-link>
      </div>
    </div>
  </div>
</template>
