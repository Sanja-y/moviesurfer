import React, { useState } from 'react'
import { imageHost } from '../config/imagePath'
import ShowMoreText from "react-show-more-text"
import { set } from 'date-fns'

const Review = ({data}) => {
    console.log(data)
    const [read, setRead] = useState(false);
   
    let profileUrl = !data?.author_details?.avatar_path?.includes('http')? imageHost+data?.author_details?.avatar_path : data?.author_details?.avatar_path[0]=='/'?data?.author_details?.avatar_path.substring(1,data?.author_details?.avatar_path?.length):data?.author_details?.avatar_path
  return (
    <div className='grid justify-start flex-1 min-h-[140px] mb-3'>
        <div className="flex space-x-3 justify-start items-center max-md:justify-center max-md:flex-col">
            <img src={profileUrl} className='w-[80px] h-[80px] rounded-full' alt='author-avatar'/>
            <p className=' opacity-60'>{data?.author}</p>
            <p className=' opacity-60 !ml-1'>{'(@'+data?.author_details?.username+')'}</p>
        </div>
        <div className="py-5 px-6 indent-20 max-md:indent-0">
  
            <p className='content'>{data?.content?.length<250 ? data?.content+" " : read ? data?.content: data?.content.substring(0,250)+"..."}
            <button className='italic hover:opacity-60' onClick={()=>setRead(!read)}>{data?.content.length>250 ? read ? " Read Less": " Read More" : " "}</button></p>
            
        </div>
    </div>
  )
}



export default Review