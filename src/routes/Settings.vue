<script>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // firebase.js dosyasından import et

export default {
setup() {
    const auth = getAuth(); // Firebase Authentication
    const user = auth.currentUser; // Giriş yapan kullanıcı
    const userInfo = ref({
    fullName: '',
    username: '',
    email: ''
    });

    onMounted(async () => {
    if (user) {
        try {
        const userDocRef = doc(db, "users", user.uid); 
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            userInfo.value = docSnap.data();
        } else {
            console.error("Kullanıcı verisi bulunamadı");
        }
        } catch (error) {
        console.error("Firebase'den veri alınırken hata oluştu:", error);
        }
    }
    });

    const saveChanges = async () => {
    if (user) {
        try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
            fullName: userInfo.value.fullName,
            username: userInfo.value.username
        });
        alert("Bilgiler başarıyla güncellendi.");
        } catch (error) {
        console.error("Güncelleme sırasında hata oluştu:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
    }
    };

    return {
    userInfo,
    saveChanges
    };
}
};
</script>


<template>
    <div class="w-full flex flex-col items-center justify-center my-10">
      <h1 class="custom-h1 mb-10">Settings</h1>
      <div class="flex flex-col items-start w-11/12 sm:w-96">
        <div class="flex flex-col my-5 w-full">
          <label for="fullName" class="font-medium">Full Name</label>
          <input v-model="userInfo.fullName" type="text" class="outline-none w-full border-b py-2 border-gray-300 text-sm focus:border-gray-400">
        </div>
  
        <div class="flex flex-col my-5 w-full">
          <label for="username" class="font-medium">Username</label>
          <input v-model="userInfo.username" type="text" class="outline-none w-full border-b py-2 border-gray-300 text-sm focus:border-gray-400">
        </div>
  
        <div class="flex flex-col my-5 w-full">
          <label for="email" class="font-medium">Email</label>
          <input v-model="userInfo.email" type="text" class="outline-none w-full border-b py-2 border-gray-300 text-sm focus:border-gray-400" disabled>
        </div>
  
        <button @click="saveChanges" class="mt-5 w-full bg-profilebottom hover:bg-secondary duration-150 px-5 py-1 rounded-lg">
          Save
        </button>
      </div>
    </div>
</template>