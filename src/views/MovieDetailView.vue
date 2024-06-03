<template>
    <div class="container mt-5">
        <h1>{{ movieName }}</h1>
        <p>{{ movieIntroduction }}</p>
        <h2>Comments</h2>
        <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addCommentModal">
            Add Comment
        </button>
        <router-link
            :to="{ name: 'MovieAnalysis', params: { id: movieId }, query: { name: movieName, introduction: movieIntroduction } }"
            class="btn btn-primary mt-3 mx-2">
            Movie Analysis
        </router-link>
        <div class="modal fade" id="addCommentModal" tabindex="-1" aria-labelledby="addCommentModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCommentModalLabel">Add Comment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addComment">
                            <div class="mb-3">
                                <label for="comment-name" class="form-label">Name:</label>
                                <input type="text" class="form-control" id="comment-name" v-model="commentName">
                            </div>
                            <div class="mb-3">
                                <label for="comment-content" class="form-label">Content:</label>
                                <input type="text" class="form-control" id="comment-content" v-model="commentContent">
                            </div>
                            <div class="mb-3 d-flex flex-row">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="button" class="mx-2 btn btn-secondary"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-group mt-3">
            <li v-for="comment in reversedComments" :key="comment[0]" class="list-group-item">
                <strong>{{ comment[1] }}</strong>: {{ comment[2] }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { apiMovieTakeComment, apiMovieCreateComment } from '@/api/api';

const route = useRoute();

const movieId = ref(0);
const movieName = ref('');
const movieIntroduction = ref('');
const comments = ref([]);
const commentName = ref('');
const commentContent = ref('');

onMounted(async () => {
    movieName.value = route.query.name;
    movieIntroduction.value = route.query.introduction;
    fetchMovieData();
});

const fetchMovieData = async () => {
    movieId.value = route.params.id;
    try {
        const response = await apiMovieTakeComment(movieId.value);
        comments.value = response.data.comments;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};

const addComment = async () => {
    try {
        await apiMovieCreateComment({
            name: commentName.value,
            content: commentContent.value,
            movieId: movieId.value
        });
        fetchMovieData();
        commentContent.value = '';
        commentName.value = '';
        $('#addCommentModal').modal('hide');
    } catch (error) {
        console.error('Error adding comment:', error);
    }
};

const reversedComments = computed(() => comments.value.slice().reverse());
</script>