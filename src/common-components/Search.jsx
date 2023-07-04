import React from 'react'
import SearchIcon from '../assets/SearchIcon.png'
const Search = ({value,onChange,placeholder}) => {
  return (
    <div className='border-b flex items-center group justify-center border-[#E9E9E9] h-[40px] w-[330px] relative transition-all duration-150 hover:border-[#77CAEE] focus-within:!border-sky-400'>
    <input placeholder={placeholder} type="text" value={value} onChange={onChange} className='h-full w-[85%] focus:outline-none px-4 bg-transparent text-white' />
    <div className="w-[15%] flex items-center justify-center">
    {/* <img src={SearchIcon} className='h-[25px] w-[25px]' alt="" /> */}
    <i className="fa fa-search text-3xl text-white group-hover:text-[#77CAEE] group-focus-within:!text-sky-400 transition-all duration-150 " aria-hidden="true"></i>
    </div>
    </div>
  )
}

export default Search