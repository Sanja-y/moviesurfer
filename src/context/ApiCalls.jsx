import React from "react";
import axios from '../api/axios'
import { apiKey } from "../config/apiKey";
export const ApiContext = React.createContext()

export const ApiProvider = ({ children }) => {
    const getPopular = (pageNumber) => {
        return axios.get(`/get-popular?page=${pageNumber}`)
    }

    const searchMovie = (query) => {
        return axios.get(`/search-movies?keyword=${query}&page=1`)
    }

    const getMovieDetails = (id) => {
        return axios.get(`/movie/` + id)
    }

    const getMovieVideos = (id) => {
        return axios.get(`
        /movie/${id}/videos?api_key=${apiKey}&language=en-US`)

    }

    const getPlatforms = (id) => {
        return axios.get(`/movie/${id}/watch/providers`)

    }

    const getReviews = (id) => {
        return axios.get(`/reviews/` + id)
    }
    const getTrailer = (id) => {
        return axios.get(`/trailer/` + id)
    }
    const getReleaseDates = (id) => {
        return axios.get(`/movie/${id}/release_dates`)
    }
    const getSimilar = (id) => {
        return axios.get(`movie/${id}/similar`)
    }
    const getTopRated = (pageNumber) => {
        return axios.get(`/movie/top_rated?page=${pageNumber}`)
    }
    const getPopularShows = () =>{
        return axios.get(`/tv/popular?language=en-US&page=1`)
    }
    const searchShows = (query) => {
        return axios.get(`/tv-movies?keyword=${query}&page=1`)
    }

    const getShowDetails = (id) => {
        return axios.get(`/tv/` + id)
    }
    return (
        <ApiContext.Provider value={{
            getPopular,
            searchMovie,
            getMovieDetails,
            getMovieVideos,
            getPlatforms,
            getReviews,
            getTrailer,
            getReleaseDates,
            getSimilar,
            getTopRated,
            getPopularShows,
            searchShows,
            getShowDetails,
        }   
        }>
            {children}
        </ApiContext.Provider>
    )
}