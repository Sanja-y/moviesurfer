import React,{useState, useEffect} from 'react'
import  useApi from '../../hooks/useApi'
import { imageHost } from '../../config/imagePath'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../common-components/Card'


const TopRated = () => {
  const {getTopRated} = useApi();
  const [topMovies, setTopMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(()=>{
    getTopRated(1).then(res=>{
      setTopMovies(res.data?.results);
    })
  },[])

  return (
    <div className='flex flex-col min-h-screen pt-[90px] w-full'>
      <h1 className='text-white text-4xl pb-4 text-center underline-offset-1'>The Highest Rated Movies</h1>
        <div className="cards px-20 grid grid-cols-2 xl:grid-cols-4 mt-4 w-full max-md:flex max-md:flex-col max-md:items-center">
            {
              topMovies?.map(movie => {
                return(
                  <Card key={movie?.id} movie={movie}/>
                )
              })
            }
          </div>
          <button onClick={()=>
            {
                setPageNumber(pageNumber+1);
                getTopRated(pageNumber).then(res=>{
                  setTopMovies(prevValues=>{
                    prevValues,
                    res.data?.results
                  })
                }

                )
            }} className='bg-buttonBg h-[38px] w-[123px] flex justify-center items-center transition-all duration-150 hover:scale-[1.1] text-white rounded-md hover:bg-sky-700'>Load More</button>
    </div>
   
  )
}

export default TopRated