import React from 'react'
import { imageHost } from '../config/imagePath'
import Rating from './Rating'
import '../common-css/card.css'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
const Card = ({movie}) => {
  const navigate = useNavigate()
  return (
    <div className="relative">
    <Button className={'absolute top-[43%] right-[45%] bg-buttonBg h-[38px] w-[123px] flex justify-center items-center transition-all duration-150 hover:scale-[1.1] text-white rounded-md hover:bg-sky-700'} text={'Learn more'}/>
    <div onClick={() => {navigate('/movies/'+movie?.id)}} className='h-[313px] mb-8 cursor-pointer w-[255px] flex-col p-2 flex items-center justify-center bg-[#AEAEAE] relative group transition-all duration-200 hover:scale-[1.1] hover:opacity-40'>
        <img className='h-full w-full object-cover'
        src={imageHost+movie?.poster_path} alt="movie-poster" />
    <div className="absolute  mx-2 w-[94%] bg-blend-overlay mix-blend-normal flex items-center justify-center text-white bg-[#383838] h-[40%] bottom-2">
        <div className="flex flex-col justify-start items-start w-full px-4 py-2">
            <p className=' font-normal text-sm text-[#A6D2D0] mt-4 title'>{movie?.title || movie?.name}</p>
            <p className='text-xs mt-2 font-extralight tracking-wider text'>{movie?.overview?.length>85 ? movie?.overview.substring(0,85)+'......':movie?.overview}</p>
            <div className="flex mt-3">
            <Rating rating={movie?.vote_average} size={'small'}/>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Card