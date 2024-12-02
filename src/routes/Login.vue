<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'; 
import loginpageui from '../assets/authui/loginpageui.png';
import { db } from '../firebase/firebase'; 
export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',        
            username: '',    
            loginpageui: loginpageui,
        };
    },
    methods: {
        async login() {
            const auth = getAuth();
            try {
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    this.username = userDoc.data().username || 'Anonymous';
                    console.log("Logged in as: ", this.username);
                    
                    this.$router.push('/');
                } else {
                    console.log("No such document!");
                    this.error = "User data not found!";
                }
            } catch (error) {
                this.error = "Login failed: " + error.message;
            }
        },
    },
};
</script>

<template>
    <div class="flex w-full h-screen items-center justify-center text-center bg-loginbg">
        <div class="flex w-full rounded-xl items-center justify-center mx-0 sm:mx-2">
            <!-- Bind the imported image using Vue's v-bind directive -->
            <img :src="loginpageui" alt="loginpageui" class="h-80 w-80 rounded-l-xl hidden sm:block" />
            <div class="flex flex-col h-80 w-11/12 xxs:w-96 p-4 items-center justify-center bg-white rounded-xl sm:rounded-l-none">
                <h1 class="text-3xl font-bold text-gray-600">Sign In</h1>
                <input v-model="email" type="email" placeholder="Email" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2 outline-none" />
                <input v-model="password" type="password" placeholder="Password" class="w-full h-10 border border-gray-300 rounded-full px-4 py-2 mt-2" />
                <div class="w-full flex items-end justify-end my-3">
                    <p class="text-gray-500 text-sm font-semibold">Forgot Password?</p>
                </div>
                <button @click="login" class="w-full h-10 bg-loginprimary text-white rounded-full mt-2 outline-none mb-3">Sign In</button>
                <router-link to="/signup" class="w-full flex items-center justify-center">
                    <p class="text-sm">New here? <span class="text-loginprimary">Create an account!</span></p>
                </router-link>
                <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
            </div>
        </div>
    </div>
</template>
