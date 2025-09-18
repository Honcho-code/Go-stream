import React from 'react'
import {motion} from 'framer-motion'
import { Play, Save } from 'lucide-react'

const Banner = () => {
  return (
    <motion.div
    initial={{opacity: 0, y: 50}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className='mx-4 my-5 md:my-10 relative h-50 md:h-70 bg-zinc-800 bg-contain overflow-hidden rounded-2xl'
    >
        <div className='absolute h-full w-full bg-black/50 top-0 overflow-hidden'>
        </div>
        <img src="/Banner.jpg" alt="" className='h-full w-500 object-cover overflow-hidden' />
        <div className='absolute bottom-6 left-4'>
            <h1 className='text-3xl font-bold md:font-extrabold'>$ome $exy $ongs 4 U </h1>
            <p className='text-lg font-thin'>Album - Drake & PartyNextDoor</p>
            <div className='flex gap-4 mt-3'>
                <button className='btn'>
                    <Play/>
                    <p>Stream Album</p>
                </button>
                <button className='btn'>
                    <Save/>
                    <p>Save Album</p>
                </button>
            </div>
        </div>
    </motion.div>
  )
}

export default Banner