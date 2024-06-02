<template>
    <div>
        <h1>{{ movieName }}</h1>
        <p>{{ movieIntroduction }}</p>
        <h2>Comments</h2>
        <ul>
            <li v-for="comment in comments" :key="comment[0]">
                <strong>{{ comment[1] }}</strong>: {{ comment[2] }}
            </li>
        </ul>
        <button @click="showAddCommentModal">Add Comment</button>
        <AddCommentModal :modalVisible="modalVisible" />
        <WorldClould :movieId="Number(movieId)"></WorldClould>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiMovieTakeComment } from '@/api/api';
import WorldClould from '@/components/WorldClould.vue'
import AddCommentModal from '@/components/AddCommentModal.vue'


const route = useRoute();

const movieId = ref(0);
const movieName = ref('');
const movieIntroduction = ref('');
const comments = ref([]);

onMounted(async () => {
    movieName.value = route.query.name;
    movieIntroduction.value = route.query.introduction;
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

const modalVisible = ref(false);

const showAddCommentModal = () => {
    modalVisible.value = true;
};

onMounted(async () => {
    await fetchMovieData();
});
</script>