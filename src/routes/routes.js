import Home from "../pages/Home/Home";
import MovieDetails from "../pages/Movie-details/MovieDetails";
import ShowDetails from "../pages/Show-details/ShowDetails";
import TopRated from "../pages/Top-rated/TopRated";
import Trending from "../pages/Trending/Trending";
import TvSeries from "../pages/Tv-series/TvSeries";

export const routes = [
    {
        path : '/',
        component: Home,
        module: "homepage"
    },
    {
        path : '/top-rated',
        component: TopRated,
        module: "toprated"
    },
    {
        path : '/trending',
        component: Trending,
        module: "trending"
    },
    {
        path : '/series',
        component: TvSeries,
        module: "tvseries"
    },
    {
        path : '/movies/:id',
        component: MovieDetails,
        module: "moviedetails"
    },
    {
        path : "/tv/:id",
        component: ShowDetails,
        module: "showdetails"
    },

]