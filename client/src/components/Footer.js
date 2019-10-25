import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../images/homeIcon.png'

const Footer = () => {
    return(
        <div className="footer">
            <Link to='/'>
            
                <img className="home-icon" src={HomeIcon} alt="Home Icon"/>
                
            </Link>
           
           
        </div>
    )
}

export default Footer