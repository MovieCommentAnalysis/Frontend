<template>
  <div class="container mt-5">
    <h1>Movies</h1>
    <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addMovieModal">
      Add Movie
    </button>
    <ul class="list-group mt-3">
      <li v-for="movie in movies" :key="movie.id" class="list-group-item">
        <router-link
          :to="{ name: 'MovieDetail', params: { id: movie.id }, query: { name: movie.name, introduction: movie.introduction } }">
          {{ movie.name }}
        </router-link>
      </li>
    </ul>

    <!-- Add Movie Modal -->
    <div class="modal fade" id="addMovieModal" tabindex="-1" aria-labelledby="addMovieModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addMovieModalLabel">Add Movie</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addMovie">
              <div class="mb-3">
                <label for="movie-name" class="form-label">Name</label>
                <input type="text" class="form-control" id="movie-name" v-model="newMovieName">
              </div>
              <div class="mb-3">
                <label for="movie-introduction" class="form-label">Introduction</label>
                <textarea class="form-control" id="movie-introduction" v-model="newMovieIntroduction"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiMovieGetAll, apiMovieCreate } from '@/api/api';

const movies = ref([]);
const newMovieName = ref('');
const newMovieIntroduction = ref('');

onMounted(async () => {
  try {
    const response = await apiMovieGetAll();
    movies.value = response.data.movies.map(movie => ({ id: movie[0], name: movie[1], introduction: movie[2] }));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

const addMovie = async () => {
  try {
    const response = await apiMovieCreate({ name: newMovieName.value, introduction: newMovieIntroduction.value });
    movies.value.push({ id: response.data.id, name: newMovieName.value, introduction: newMovieIntroduction.value });
    newMovieName.value = '';
    newMovieIntroduction.value = '';
    $('#addMovieModal').modal('hide');
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};
</script>
