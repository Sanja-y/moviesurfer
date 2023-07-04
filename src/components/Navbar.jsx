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

const Navbar = () => {
  let path = window.location.pathname
  const navigate = useNavigate()
  return (
    <div className='flex justify-around items-center space-x-6 w-full h-full'>
     {
        links.map(link => {
            return(
                <p onClick={() => {navigate(link.path)}} key={link.path} className={`${path==link.path? 'text-[#77CAEE] font-light border-[#77CAEE]': 'text-white font-light border-transparent hover:text-gray-300'} border-b transition-all duration-150 cursor-pointer text-base tracking-[0.1em]`}>{link.module}</p>
            )
        })
     }
    </div>
  )
}

export default Navbar