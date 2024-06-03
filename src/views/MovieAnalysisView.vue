<template>
    <div>
        <h1 class="mb-4 text-center">Movie Analysis</h1>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Sentiment Analysis</h2>
                        <div class="mb-3">
                            <p class="card-text">Average Polarity: {{ averagePolarity.toFixed(2) }}</p>
                            <p class="card-text">Average Subjectivity: {{ averageSubjectivity.toFixed(2) }}</p>
                        </div>
                        <p class="card-text mt-3" v-if="averagePolarity > 0"
                            :class="{ 'text-success': averagePolarity > 0, 'text-danger': averagePolarity < 0 }">
                            Overall Sentiment: Mostly Positive
                        </p>
                        <p class="card-text mt-3" v-else-if="averagePolarity < 0"
                            :class="{ 'text-success': averagePolarity > 0, 'text-danger': averagePolarity < 0 }">
                            Overall Sentiment: Mostly Negative
                        </p>
                        <p class="card-text mt-3" v-else>Overall Sentiment: Neutral</p>
                        <p class="card-text mt-3" v-if="averageSubjectivity > 0.5">Overall Subjectivity: Mostly
                            Subjective</p>
                        <p class="card-text mt-3" v-else-if="averageSubjectivity <= 0.5">Overall Subjectivity: Mostly
                            Objective</p>
                        <img :src="polarityChartUrl" alt="Polarity Chart" class="img-fluid mt-3">
                        <img :src="subjectivityChartUrl" alt="Subjectivity Chart" class="img-fluid mt-3">

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Word Cloud</h2>
                        <WorldClould :movieId="Number(movieId)" :imageUrl="wordCloudImageUrl"></WorldClould>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import WorldClould from '@/components/WorldClould.vue';
import { apiMovieTakeSentiment } from '@/api/api';

const route = useRoute();
const movieId = ref(route.params.id);
const averagePolarity = ref(0);
const averageSubjectivity = ref(0);
const subjectivityChartUrl = ref('');
const polarityChartUrl = ref('');
const wordCloudImageUrl = ref('');

const fetchData = async () => {
    try {
        const response = await apiMovieTakeSentiment(movieId.value);
        averagePolarity.value = response.data.average_polarity;
        averageSubjectivity.value = response.data.average_subjectivity;
        subjectivityChartUrl.value = `${import.meta.env.VITE_APP_BASE_API}/${response.data.subjectivity_chart_url}`;
        polarityChartUrl.value = `${import.meta.env.VITE_APP_BASE_API}/${response.data.polarity_charts_url}`;
        wordCloudImageUrl.value = `${import.meta.env.VITE_APP_BASE_API}/${response.data.word_cloud_image_url}`;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.card-text {
    font-size: 1.1rem;
}

.text-success {
    color: #28a745 !important;
}

.text-danger {
    color: #dc3545 !important;
}
</style>