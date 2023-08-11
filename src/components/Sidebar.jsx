import React from 'react'
import { useNavigate } from 'react-router-dom'

const links = [
    {
        path : '/',
        module: "HOME"
    },
    {
        path : '/top-rated',
        module: "TOP RATED"
    },
    {
        path : '/trending',
        module: "TRENDING"
    },
    {
        path : '/series',
        module: "TV SERIES"
    },
]

const Sidebar = ({toggle}) => {
  let path = window.location.pathname
  const navigate = useNavigate()
  return (
  <div>
    
    <div className='hidden sticky top-8 justify-center items-center space-x-6 w-full h-full max-lg:flex max-lg:flex-row '>
    {
       links.map(link => {
           return(
               <p onClick={() => {navigate(link.path)}} key={link.path} className={`${path==link.path? 'text-[#77CAEE] font-light border-[#77CAEE]': 'text-white font-light border-transparent hover:text-gray-300'} border-b transition-all duration-150 cursor-pointer text-base tracking-[0.1em] ${toggle ? "block" : "hidden"}`}>{link.module}</p>
           )
       })
    }
    
    </div>
  </div>
  )
}

export default Sidebar