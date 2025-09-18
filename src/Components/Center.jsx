import React from 'react'
import { Outlet } from 'react-router-dom'

const Center = ({fullCenterDisplay,
setFullCenterDisplay}) => {
  return (
    <div className={`blcok ${fullCenterDisplay ? "col-span-6 lg:col-span-7" : "col-span-7 lg:col-span-9"}`}>
        <Outlet/>
    </div>
  )
}

export default Center