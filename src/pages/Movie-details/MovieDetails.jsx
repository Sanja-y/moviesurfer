import React, { useEffect, useState } from 'react'
import HeroImg from '../../assets/maxresdefault.jpg'
import Button from '../../common-components/Button'
import Rating from '../../common-components/Rating'
import Card from '../../common-components/Card'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import { imageHost } from '../../config/imagePath'
import { useNavigate, useParams } from 'react-router-dom'
import Genre from '../../common-components/Genre'
import Details from '../../components/Details'
import Review from '../../components/Review'
const MovieDetails = () => {
  const { getMovieDetails, getReleaseDates, getReviews, getTrailer, getPlatform, getSimilar } = useApi()
  const params = useParams()
  const navigate = useNavigate()
  const [suggested, setSuggested] = useState({})
  const [popularList, setPopularList] = useState([])
  const [reviews, setReviews] = useState([])
  const [releaseDates, setReleaseDates] = useState("")
  const [trailerLink, setTrailerLink] = useState("")
  const [runTime, setRunTime] = useState("")
  const [platforms, setPlatforms] = useState([])
  const [similar, setSimilar] = useState([])
  let text = 'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa -- a powerful Teamster tied to organized crime.'
  //To display the details of requested movie
  const fetchTrailer = () => {
    getTrailer(params.id).then(res => setTrailerLink(res.data?.trailer)).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTrailer()
    if (!params.id) navigate('/')
    else {
      getMovieDetails(params.id).then(res => {
        setSuggested(res.data)
        setPopularList(res.data?.results)
        setReleaseDates(res.data?.release_date)
        setRunTime(res.data?.runtime)
      })
      getReviews(params.id).then(res => {
        setReviews(res.data?.results)
      })
      getSimilar(params.id).then(res=>{
        setSimilar(res.data)
      })
    }
  }, [params.id])

  return (
    <div className='flex flex-col min-h-screen w-full pt-[60px] !max-w-[80%] text-white'>
      <div className="mt-12 flex justify-between items-center">
        <div className="title text-white flex flex-col">
          <a className='text-white text-4xl cursor-pointer hover:text-blue-300 transition-all duration-150 hover:underline' href={suggested?.homepage} target={'_blank'}>{suggested?.title}</a>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          <div className="flex space-x-4 pt-2">
            {suggested?.genres?.map((genre, index) => {
              return <Genre key={genre?.id} index={index} genre={genre?.name} />
            })}
          </div>
        </div>
        <div className="rating text-white flex flex-col items-center justify-start">
          <p className='opacity-60'>The MDB Rating</p>
          <div className="text-white flex justify-center items-center">
            <i className={`fa px-1.5 fa-star text-yellow-500 text-4xl mr-2`}></i>
            <p className='mt-1'>{suggested?.vote_average?.toFixed(1)}</p>
            <p className='mt-1 ml-1.5'>{'(' + suggested?.vote_count + "Votes" + ')'}</p>
          </div>
        </div>
      </div>

      <div className="most-popular w-full items-center pt-4 justify-start flex flex-col relative">
        <div className="flex justify-between items-center">
          <p className='text-white font-light text-base'>{suggested?.overview}</p>
        </div>
        <div className="flex w-full justify-start items-center mt-4 text-white">
          <img className='h-[400px] w-[270px] mr-12  object-cover' src={imageHost + suggested?.poster_path} alt="" />
           
            <Details date={releaseDates} runtime={runTime} />
          
        </div>

      </div>
      <div className="reviews mt-8">
        {reviews.splice(0,5)?.map(review => {
          return <Review key={review.id} data={review} />
        })}
      </div>
      <div className="">
      <iframe width="560" height="315" src={trailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  )
}

export default MovieDetails