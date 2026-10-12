import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import nursingRoutes from './nursing/presentation/nursing-routes.js';

const pageNotFound = () =>
    import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    { path: '/nursing', children: nursingRoutes },
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach((to, from) => {
    console.log(`Navigating from ${String(from.name)} to ${String(to.name)}`);

    const baseTitle = 'HIGN';
    document.title = `${baseTitle} - ${to.meta.title || 'Home'}`;

    return true;
});

export default router;
