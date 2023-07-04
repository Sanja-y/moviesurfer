import React from 'react'

const Genre = ({genre,index}) => {
    if(genre?.length){
        return (
        <div className={`text-white border border-gray-400 font-semibold h-7 px-2 flex justify-center items-center rounded-xl`}>
           <span className={`text-sm font-normal`}>{genre}</span> 
            </div>
      )
    }
    else return <></>
}

export default Genre