import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieDetailView from '../views/MovieDetailView.vue';
import MovieAnalysisView from '../views/MovieAnalysisView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetailView,
    props: route => ({
      id: route.params.id,
      name: route.params.name,
      introduction: route.params.introduction
    })
  },
  {
    path: '/movie/:id/analysis',
    name: 'MovieAnalysis',
    component: MovieAnalysisView,
    props: route => ({
      id: route.params.id,
    })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

