import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full py-6 md:py-8 px-4 md:px-10 m-0 bg-zinc-50/5 ring-inset ring-1 ring-zinc-50/10'>
        <div className='flex flex-col gap-3 md:flex-row justify-between items-center'>
            <h1 className='headline-2'>MovieBing</h1>
            <div className='flex gap-5'>
                <Link to={"/"} className="cursor-pointer">Home</Link>
                <Link to={"/about"} className="cursor-pointer">About</Link>
                <Link to={"/login"} className="cursor-pointer">Get started</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer