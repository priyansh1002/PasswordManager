import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full pb-0'>
            <div className="logo font-bold text-white text-2xl ">
                <span className='text-blue-700'>&lt;</span>
                Lock
                <span className='text-blue-700'>Box/&gt;</span>
            </div>
            <div className='flex justify-center items-center p-0 m-0'>
                Created with <img className='w-10 m-2' src="icons/heart.png" alt="" /> by Priyansh Singh Chaudhary
            </div>
        </div>
    )
}

export default Footer
