<script setup>
import { ref, onBeforeMount } from 'vue';
import { apiMovieGetAll } from '@/api/api';

const movies = ref([]);

onBeforeMount(async () => {
  try {
    const response = await apiMovieGetAll();
    movies.value = response.data.movies.map(movie => ({
      id: movie[0],
      name: movie[1],
      introduction: movie[2]
    }));
    console.log('Movies:', movies.value);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});
</script>

<template>
  <div>
    <h1>Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.name }} - {{ movie.introduction }}
      </li>
    </ul>
  </div>
</template>
