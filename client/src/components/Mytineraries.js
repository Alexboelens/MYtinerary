import React from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { fetchOneCity } from './redux/actions/citiesActions'
import { fetchMytinerariesByCity  } from './redux/actions/mytinerariesActions'
import { Link } from 'react-router-dom'

class Mytineraries extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleOpen:'',
        }
    }


handleClickOpen = (id) => {
    this.setState({
        toggleOpen: id
    })
    
    // this.addSomeDelay()
}

handleClickClose = () => {
    this.setState({
        toggleOpen: null
    })
}

 componentDidMount(){
    let city = this.props.match.params.city;
    this.props.fetchOneCity(city)
    this.props.fetchMytinerariesByCity(city) 
}
    render(){
        console.log(this.props.mytineraries)

        return( <>
       
            <div className='citypage-main'>
            {this.props.cityIsLoaded && <p className="mytin-city-name">{this.props.city.city}</p>}

            {this.props.mytinerariesAreLoaded && this.props.mytineraries.map(mytin => {
                return ( 
                     <div key={mytin._id} className="container">
                        <div className='mytinerary-container'>
                              <div className="mytin-wrap1">
                                   <div style={{backgroundImage: `url(${mytin.userPhoto})`}} className="mytin-avatar"></div>
                                   <span className='mytin-username'>{mytin.userName}</span>
                              </div>
                      
                            <div className='mytin-wrap2'>
                                <div className="mytin-wrap3">
                                    <div className="mytin-name">
                                        {mytin.title}
                                    </div>
                                    <div className="mytin-fav-btn">
                                        {/* add fav btn */}+
                                    </div>
                                </div>
                                <div className="mytin-wrap4"></div>
                                <div className="mytin-wrap5"></div>
                            </div>
                             
                           
                          
                    </div>

                    {this.state.toggleOpen === mytin._id ? <>
                    <div className="mytinerary-container2">
                            <div className="slider-wrap">
                                {mytin.activities.map((activity, index) => {
                                    return(
                                        <div style={{backgroundImage: `url(${activity.photo})`}} key={index}className="slider-div">
                                            <span>{activity.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                    </div>

                        <div onClick={() => this.handleClickClose()} className="mytin-open">Close</div>
                        
                        </> 
                        : <div onClick={() => this.handleClickOpen(mytin._id)} className="mytin-open">View All</div>}
                   </div>
                    )})}

            <div className="link"><Link to='/cities'>Choose another city</Link></div>
            </div>
        
          
            <Footer />
      </>  )
    }
}

const mapStateToProps = (state) => ({
    city: state.cities.city,
    cityIsLoaded: state.cities.cityIsLoaded,
    mytineraries: state.mytineraries.mytineraries,
    mytinerariesAreLoaded: state.mytineraries.mytinerariesAreLoaded
})

export default connect (mapStateToProps, { fetchOneCity, fetchMytinerariesByCity }) (Mytineraries)