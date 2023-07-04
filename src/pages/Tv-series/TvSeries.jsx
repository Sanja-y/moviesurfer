import React,{useState, useEffect} from 'react'
import  useApi from '../../hooks/useApi'
import { imageHost } from '../../config/imagePath'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../common-components/Card'

const TvSeries = () => {
  const {getPopularShows,} = useApi();
  const [popularShows, setPopularShows] = useState([]);
  useEffect(()=>{
    getPopularShows().then(res=>{
      setPopularShows(res.data?.results);
    })
  },[])
  return (
    <div className='flex flex-col min-h-screen pt-[90px] w-full'>
      <h1 className='text-white text-4xl pb-4 text-center underline-offset-1'>Popular TV Shows</h1>
        <div className="cards px-20 grid grid-cols-2 xl:grid-cols-4 mt-4 w-full max-md:flex max-md:flex-col max-md:items-center">
            {
              popularShows?.filter(show=>(show.overview?.length)).filter(show=>!show.origin_country.includes("IN")).map(show => {
                return(
                  <Card key={show?.id} movie={show}/>
                )
              })
            }
            {console.log({popularShows})}
          </div>
    </div>
   
  )
}

export default TvSeries