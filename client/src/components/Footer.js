import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../images/homeIcon.png'
import { connect } from 'react-redux'
import { fetchAllMytineraries } from './redux/actions/mytinerariesActions'

class Footer extends React.Component{
    resetItrineraries() {
        this.props.fetchAllMytineraries();
    }
    render(){
    return(
        <div className="footer">
            <Link to='/' onClick={() => this.resetItrineraries()}>
               
                <img className="home-icon" src={HomeIcon} alt="Home Icon"/>
    
            </Link>
           
           
        </div>
    )
    }
}

const mapStateToProps = (state)=> ({
   
  })
  

// export default Footer
export default connect(mapStateToProps,{ fetchAllMytineraries })(Footer)