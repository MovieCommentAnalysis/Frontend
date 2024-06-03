<template>
    <div class="modal" :class="{ 'show': modalVisible }">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">添加電影</h5>
                    <button type="button" class="btn-close" @click="hideModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addMovie">
                        <div class="mb-3">
                            <label for="movieName">電影名稱</label>
                            <input type="text" class="form-control" id="movieName" v-model="newMovieName" required>
                        </div>
                        <div class="mb-3">
                            <label for="movieDescription">電影描述</label>
                            <textarea class="form-control" id="movieDescription" v-model="newMovieDescription"
                                required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">送出</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const modalVisible = ref(false);
const newMovieName = ref('');
const newMovieDescription = ref('');

const showAddMovieModal = () => {
    modalVisible.value = true;
};

const hideModal = () => {
    modalVisible.value = false;
};

const addMovie = () => {
    console.log('Adding movie:', newMovieName.value, newMovieDescription.value);
    newMovieName.value = '';
    newMovieDescription.value = '';
    hideModal();
};
</script>