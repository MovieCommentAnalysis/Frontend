<template>
  <div>
    <h1>Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <router-link
          :to="{ name: 'MovieDetail', params: { id: movie.id }, query: { name: movie.name, introduction: movie.introduction } }">
          {{ movie.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiMovieGetAll } from '@/api/api';

const movies = ref([]);

onMounted(async () => {
  try {
    const response = await apiMovieGetAll();
    movies.value = response.data.movies.map(movie => ({ id: movie[0], name: movie[1], introduction: movie[2] }));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});
</script>
