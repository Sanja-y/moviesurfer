import React from 'react'

const Details = ({date, runtime}) => {
  console.log({date});
  let time = Number(runtime);
  let hours = Math.floor(time/60);
  let minutes = Math.floor(time%60);
  return (
    <div className='flex flex-col space-y-3 h-full justify-start items-start'>
    <div className="flex opacity-60 space-x-2">
        <p className=''>Release Date</p>
        <p>-</p>
        <p>{date}</p>
    </div>
    <div className="flex opacity-60 space-x-2">
        <p className=''>Run time</p>
        <p>-</p>
        <p>{hours}h {minutes}m</p>
    </div>
    </div>
  )
}

export default Details