import React from 'react'

const Button = ({text,className,onClick}) => {
  return (
    <button onClick={onClick} className={className?.length? className : 
    ` bg-buttonBg h-[38px] w-[123px] flex justify-center items-center transition-all duration-150 hover:scale-[1.1] text-white rounded-md hover:bg-sky-700`}>
        {text}
    </button>
  )
}

export default Button