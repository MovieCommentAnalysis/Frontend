<template>
    <div>
        <h1>文字雲生成</h1>
        <h2>movieId:{{ movieId }}</h2>
        <button @click="generateWordCloud">按我生成</button>
        <div v-if="imageUrl">
            <h2>文字雲生成圖片</h2>
            <img :src="imageUrl" alt="Word Cloud">
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { apiMovieTakeWordcloud } from '@/api/api';

const imageUrl = ref(null);

const props = defineProps({
    movieId: {
        type: Number,
        required: true
    }
});

const generateWordCloud = async () => {
    console.log('movieId:', props.movieId);
    try {
        const response = await apiMovieTakeWordcloud(props.movieId);
        imageUrl.value = `${import.meta.env.VITE_APP_BASE_API}/${response.data.image_url}`;
    } catch (error) {
        console.error(error);
    }
};
</script>
