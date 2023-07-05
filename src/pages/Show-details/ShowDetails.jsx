import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { imageHost } from '../../config/imagePath'
import { useNavigate, useParams } from 'react-router-dom'
import Genre from '../../common-components/Genre'
import Details from '../../components/Details'
import Review from '../../components/Review'


const ShowDetails = () => {
    const { getShowDetails, getShowReviews} = useApi();
    const params = useParams();
    const navigate = useNavigate();
    const [showDetails, setShowDetails ] = useState([]);

    useEffect(()=>{
        if (!params.id) navigate('/')
        else{
            getShowDetails(params.id).then(res=>{
                setShowDetails(res.data)
            })
        }
        
    },[params.id])
  return (
    <div className='flex flex-col min-h-screen w-full pt-[60px] !max-w-[80%] text-white'>
      <div className="mt-12 flex justify-between items-center">
        <div className="title text-white flex flex-col">
          <a className='text-white text-4xl cursor-pointer hover:text-blue-300 transition-all duration-150 hover:underline' href={showDetails?.homepage} target={'_blank'}>{showDetails?.name}</a>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          <div className="flex space-x-4 pt-2">
            {showDetails?.genres?.map((genre, index) => {
              return <Genre key={genre?.id} index={index} genre={genre?.name} />
            })}
          </div>
        </div>
        <div className="rating text-white flex flex-col items-center justify-start">
          <p className='opacity-60'>The MDB Rating</p>
          <div className="text-white flex justify-center items-center">
            <i className={`fa px-1.5 fa-star text-yellow-500 text-4xl mr-2`}></i>
            <p className='mt-1'>{showDetails?.vote_average?.toFixed(1)}</p>
            <p className='mt-1 ml-1.5'>{'(' + showDetails?.vote_count + "Votes" + ')'}</p>
          </div>
        </div>
      </div>

      <div className="most-popular w-full items-center pt-4 justify-start flex flex-col relative">
        <div className="flex justify-between items-center">
          <p className='text-white font-light text-base'>{showDetails?.overview}</p>
        </div>
        <div className="flex w-full justify-start items-center mt-4 text-white">
          <img className='h-[400px] w-[270px] mr-12  object-cover' src={imageHost + showDetails?.poster_path} alt="" />

          
        </div>
     </div>
    </div>
  )
}

export default ShowDetails