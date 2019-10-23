import React from 'react'
import Logo from '../images/Logo.png'
import ArrowIcon from '../images/circled-right-2.png'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'


const Home = () => {
    return(
        <div className='homepage-container'>
          <div className="logo-wrap">
            <img className="logo" src={Logo} alt="Logo"/>
          </div>

          <div className="home-text">
            <p>Find your perfect trip, designed by insiders who know and love their cities.</p>
          </div>

          <div className="arrow-link-wrap">
            <Link to='/cities'>
                <img className="arrow-icon" src={ArrowIcon} alt="Arrow"/>
            </Link>
          </div>

          <p className="home-text-2" >Popular Activities</p>
       
        <Carousel />
        </div>
       
    )
}

export default Home