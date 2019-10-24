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
            activity:'',
            modal:false
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

handleOpenModal = (activity) => {
    this.setState({
        activity: activity,
        modal:true
    })
    console.log(this.state.activity)
}

handleCloseModal = () => {
    this.setState({
        modal:false
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
            {/* activity modal */}
             {this.state.modal && <><div className="activity-modal">
                 <div style={{backgroundImage: `url(${this.state.activity.photo})`}} className="modal-background"></div>
                 <span className="modal-activity-name">{this.state.activity.name}</span>
                 <div className='modal-table'>
                 <table>
                     <tbody>
                         <tr>
                             <td className='modal-td'>Adress</td>
                             <td>{this.state.activity.address}</td>
                         </tr>
                         <tr>
                             <td className='modal-td'>Hours</td>
                             <td>{this.state.activity.duration}</td>
                         </tr>
                         <tr>
                             <td className='modal-td'>Cost</td>
                             <td>{this.state.activity.cost}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div className="modal-comments">{this.state.activity.comments}</div>
                </div>
                 
             </div>
             <div onClick={() => this.handleCloseModal()} className="backdrop"></div></>}


            {/* main content */}
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
                                <div className="mytin-wrap4">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th className='td'>Likes </th>
                                                <th className='td'>Hours</th>
                                                <th className='td'>Price</th>
                                            </tr>
                                            <tr>
                                                <td className='td'>{mytin.likes}</td>
                                                <td className='td'>{mytin.duration}</td>
                                                <td className='td'>{mytin.price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                             
                           
                          
                    </div>
                    <div className="mytin-wrap5">
                                      {mytin.hashtags.map((hashtag, index) => {
                                         return(
                                               <div key={index} className='hashtag'>#{hashtag}</div>
                                             )
                                            })}
                    </div>

                    {this.state.toggleOpen === mytin._id ? <>
                    <div className="mytinerary-container2">
                            <div className="slider-wrap">
                                {mytin.activities.map((activity, index) => {
                                    return(
                                        <div onClick={() => this.handleOpenModal(activity)} style={{backgroundImage: `url(${activity.photo})`}} key={index}className="slider-div">
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