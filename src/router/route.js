import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../routes/Home.vue';
import Category from '../routes/Category.vue';
import Profile from '../routes/Profile.vue';
import Recipe from '../routes/Recipe.vue';
import Login from '../routes/Login.vue';
import Signup from '../routes/Signup.vue';
import Settings from '../routes/Settings.vue';
import CreateRecipe from '../routes/CreateRecipe.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/recipe/:id',
        name: 'Recipe',
        component: Recipe,
        meta: {
            Title: 'Tarifia - Recipes',
            requiresAuth: true,
        }
    },
    {
        path: '/category/:categoryName',
        name: 'Category',
        component: Category,
        meta: {
            Title: 'Tarifia - Category',
            requiresAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            Title: 'Tarifia - Profile',
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            Title: 'Tarifia - Login',
            requiresAuth: false,
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            Title: 'Tarifia - Signup',
            requiresAuth: false,
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            Title: 'Tarifia - Settings',
            requiresAuth: true,
        }
    },
    {
        path: '/create',
        name: 'CreateRecipe',
        component: CreateRecipe,
        meta: {
            Title: 'Tarifia - Create Recipe',
            requiresAuth: true,
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

let authReady = false;
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    authReady = true;
});

router.beforeEach((to, from, next) => {
    if (!authReady) {
        return next();
    }

    const user = auth.currentUser;

    if (to.meta.requiresAuth && !user) {
        next('/login');
    } else if (to.meta.requiresAuth === false && user) {
        next('/');
    } else {
        next();
    }

    if (to.meta && to.meta.Title) {
        document.title = to.meta.Title;
    } else {
        document.title = 'Tarifia - Share Your Recipe';
    }
});

export default router;
