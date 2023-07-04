import React from 'react'

const Rating = ({size,rating}) => {
  const total = [1,2,3,4,5]
  if(rating>5) rating = rating/2
  return (
    total?.map(rate => {
      if(rating){
        return(
            <i key={rate} className={`fa px-1.5 ${rating >= rate ? 'fa-star': rating >= rate - 0.5? 'fa-star-half-o': 'fa-star-o'} text-sky-300 ${size=='small'?' text-base':'text-3xl'}`}></i>
        )
      }
    })
  )
}

export default Rating