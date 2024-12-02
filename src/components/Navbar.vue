<script>
import { getAuth, signOut } from 'firebase/auth';
import logo from '../assets/logo/tarifialogo.png';

export default {
    data() {
        return {
            isDropdownVisible: false,
            isProfileDropdownVisible: false,
            logo: logo
        };
    },
    methods: {
        showDropdown() {
            this.isDropdownVisible = true;
        },
        hideDropdown() {
            this.isDropdownVisible = false;
        },
        showProfileDropdown() {
            this.isProfileDropdownVisible = true;
        },
        hideProfileDropdown() {
            this.isProfileDropdownVisible = false;
        },
        async logout() {
            try {
                const auth = getAuth();
                await signOut(auth); // Sign the user out
                this.$router.push('/login'); // Redirect to login page
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        }
    }
};
</script>

<template>
    <div class="flex w-full items-center justify-between p-4 bg-white text-black shadow-lg">
        <router-link to="/" class="flex items-center">
            <img :src="logo" alt="logo" class="w-12 h-auto">
        </router-link>
        <ul class="flex gap-5 items-center">

            <router-link to="/create"><i class="fa-solid fa-pen cursor-pointer hover:text-footerbg duration-150"></i></router-link>

            <!-- Categories Dropdown -->
            <li @mouseover="showDropdown" @mouseleave="hideDropdown">
                Categories
                <ul v-show="isDropdownVisible" class="absolute bg-profilebottom rounded-lg text-white font-semibold">
                    <li>
                        <router-link to="/category/appetizers" class="block px-4 py-2 hover:bg-secondary rounded-lg">Appetizers</router-link>
                    </li>
                    <li>
                        <router-link to="/category/desserts" class="block px-4 py-2 hover:bg-secondary rounded-lg">Desserts</router-link>
                    </li>
                    <li>
                        <router-link to="/category/drinks" class="block px-4 py-2 hover:bg-secondary rounded-lg">Drinks</router-link>
                    </li>
                    <li>
                        <router-link to="/category/mains" class="block px-4 py-2 hover:bg-secondary rounded-lg">Mains</router-link>
                    </li>
                    <li>
                        <router-link to="/category/salads" class="block px-4 py-2 hover:bg-secondary rounded-lg">Salads</router-link>
                    </li>
                    <li>
                        <router-link to="/category/snacks" class="block px-4 py-2 hover:bg-secondary rounded-lg">Snacks</router-link>
                    </li>
                </ul>
            </li>
            <!-- Profile Dropdown -->
            <li @mouseover="showProfileDropdown" @mouseleave="hideProfileDropdown" class="relative">
                <i class="fa-solid fa-user cursor-pointer"></i>
                <ul v-show="isProfileDropdownVisible" class="absolute right-[-10px] bg-profilebottom rounded-lg text-white font-semibold">
                    <li>
                        <router-link to="/profile" class="block px-4 py-2 hover:bg-secondary rounded-lg">Profile</router-link>
                    </li>
                    <li>
                        <router-link to="/settings" class="block px-4 py-2 hover:bg-secondary rounded-lg">Settings</router-link>
                    </li>
                    <li @click="logout" class="cursor-pointer">
                        <span class="block px-4 py-2 hover:bg-secondary rounded-lg">Log Out</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
