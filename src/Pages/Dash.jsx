import React from 'react'
import Navber from '../Components/Navber'
import Banner from '../Components/Banner'
import Topmix from '../Components/Topmix'
import RecentListen from '../Components/RecentListen'

const Dash = () => {
  return (
    <div>
        <Navber/>
        <Banner/>
        <Topmix/>
        <RecentListen/>
    </div>
  )
}

export default Dash