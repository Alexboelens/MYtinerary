import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../images/homeIcon.png'

const Footer = () => {
    return(
        <div className="footer">
            {/* <Link to='/'> */}
               <a href='/'>
                <img className="home-icon" src={HomeIcon} alt="Home Icon"/>
                </a>
            {/* </Link> */}
           
           
        </div>
    )
}

export default Footer