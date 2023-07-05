import React,{useState, useEffect} from 'react'
import  useApi from '../../hooks/useApi'
import { imageHost } from '../../config/imagePath'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../common-components/Card'
import "./Trending.css"

const Trending = () => {
  const {getPopular} = useApi();
  const [popularMovies, setPopularMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(()=>{
    getPopular(pageNumber).then(res=>{
      setPopularMovies(res.data?.results);
    },[])
  },[pageNumber])
  return (
    <div className='flex flex-col min-h-screen pt-[90px] w-full'>
     <h1 className='text-white text-4xl pb-4 text-center underline-offset-1'>Trending Movies</h1>
      <div className="cards px-20 grid grid-cols-2 xl:grid-cols-4 mt-4 w-full max-md:flex max-md:flex-col max-md:items-center">
          {
            popularMovies?.map(movie => {
              return(
                <Card key={movie?.id} movie={movie}/>
              )
            })
          }
        </div>
        <div className='text-[1.5rem] text-white text-center'>
              <button disabled={pageNumber===1} style={{display : pageNumber===1 ? "none" : "inline-block"}} className='pagination inline-block'  onClick={()=>{setPageNumber(pageNumber-1); window.scrollTo(0,0);}}>{`<`}</button>
              <p className=' px-4 inline-block'>{pageNumber}</p>
              <button className='pagination inline-block' onClick={()=>{setPageNumber(pageNumber+1); window.scrollTo(0,0);}}>{`>`}</button>
        </div>
    </div>
  )
}

export default Trending