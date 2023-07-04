import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.png'
import Search from '../common-components/Search'
import useApi from '../hooks/useApi'
import useDebounce from '../hooks/useDebounce'
import Navbar from './Navbar'
import './Header.css'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const [searchKey, setSearchKey] = useState("")
  let debounced = useDebounce(searchKey,500)
  const {searchMovie,getMovieDetails} = useApi()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if(debounced?.length){
      searchMovie(debounced).then(res => setResults(res.data?.results))
    }
    else setResults([])
  }, [debounced])
  const handleClickOutside = () => {
    setResults([])
  }
  const ref = useOutsideClick(handleClickOutside);
  return (
    <div className='w-full flex justify-between bg-headerBg h-[65px]'>
    <div className="flex items-center justify-center">
        <img src={Logo} className="ml-8 w-[120px] h-[50px]" alt="logo" />
    </div>
    <div className="ml-10">
    <Navbar/>
    </div>
    <div className="relative">
    <div className='flex items-center justify-center h-full mr-12'>
      <Search placeholder={'Search movies...'} value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
    </div>
    {results?.length ? 
    <div ref={ref} className="absolute z-[1000] flex min-w-[330px] max-w-[330px] bg-white flex-col max-h-[300px] results overflow-y-auto">
      {results?.map(result => {
        return <p key={result?.id} className='hover:bg-blue-600 hover:text-white items-center cursor-pointer px-3 capitalize py-0.5 transition-all duration-75 group flex justify-between' onClick={() => {navigate(`/movies/`+result?.id);setResults([]);setSearchKey("")}}>
         <span>{result?.title}</span>
         <p className='hidden group-hover:block text-sm opacity-60'>{result?.release_date?.split('-')[0]}</p> 
          </p>
      })}
    </div> :<></>}
    </div>
    </div>
  )
}

export default Header