import axios from 'axios'

export default axios.create({
    // baseURL: "https://api.themoviedb.org/3"
    baseURL: 'http://localhost:5000/api'
})