<template>
    <div>
        <div v-if="imageUrl">
            <img :src="imageUrl" alt="Word Cloud" class="img-fluid">
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { apiMovieTakeWordcloud } from '@/api/api';

const imageUrl = ref(null);

const props = defineProps({
    movieId: {
        type: Number,
        required: true
    }
});

const generateWordCloud = async () => {
    try {
        const response = await apiMovieTakeWordcloud(props.movieId);
        imageUrl.value = `${import.meta.env.VITE_APP_BASE_API}/${response.data.image_url}`;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    generateWordCloud();
});
</script>
