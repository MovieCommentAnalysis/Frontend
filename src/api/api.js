import axios from 'axios'

// API Header設定
const config = { headers: { 'Content-Type': 'application/json' } }

const Request = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_API}`
})

// movie api
//獲取所有電影
export const apiMovieGetAll = () => Request.get(`/movies`)
//新增電影資訊
export const apiMovieCreate = (data) => Request.post(`/movie`, data)
//獲取指定電影的留言
export const apiMovieTakeComment = (movieId) => Request.get(`/movie/comments/${movieId}`)
//新增指定電影留言
export const apiMovieCreateComment = (data) => Request.post(`/comment`, data)
//獲取指定電影文字雲
export const apiMovieTakeWordcloud = (movieId) => Request.get(`/movie/wordcloud/${movieId}`)
//獲取指定電影情緒分析
export const apiMovieTakeSentiment = (movieId) => Request.get(`/movie/sentiment/${movieId}`)
