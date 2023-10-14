import React from 'react'
import './GunShop.css'
import { Link } from 'react-router-dom'
import './OverallStyleSheet.css'

function ServiceOptions() {
  return (
    <div className='ServOpt'>
        <div className='services'>
            <h3><Link to="/Services">Modifications and Styling</Link></h3>
        </div>
        <div className='gun-option'>
            <h3><Link to="/GunList">Firearms for Sale</Link></h3>
        </div>
    </div>
  )
}

export default ServiceOptions