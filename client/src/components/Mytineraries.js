import React from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { fetchOneCity } from './redux/actions/citiesActions'
import { fetchMytinerariesByCity  } from './redux/actions/mytinerariesActions'
import { getLoggedUserData } from './redux/actions/loginActions'
import { postComment } from './redux/actions/userActions'
import { addFavourite } from './redux/actions/favouriteActions'
import { Link } from 'react-router-dom'
import Loader from './Loader'

class Mytineraries extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleOpen:'',
            activity:'',
            modal:false,
            comment:'',
            favModal: false,
            login:false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleAddFavourite = this.handleAddFavourite.bind(this)
    }


handleKeyPress = (e, id) => {
        if(e.key=== 'Enter'){
           this.handlePostComment(id)
        }
    }

scrollToBottom() {
        if (this.commentsDiv)
            this.commentsDiv.scrollTop = this.commentsDiv.scrollHeight
    }

addSomeDelay(arg) {
        let that = this
        setTimeout(function() {
            that.scrollToBottom()
        },100)
    }

handleClickOpen = (id) => {
    this.setState({
        toggleOpen: id
    })
    
    this.addSomeDelay()
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
        modal:false,
        favModal: false
    })
}

handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
}

handlePostComment = async (id) => {
    const comment = {
        userName: this.props.userData.userName,
        comment: this.state.comment,
        id: id
    }
    console.log(comment)
    await this.props.postComment(comment)
    let city = this.props.match.params.city;
    let that = this;
    setTimeout(function() {
        that.props.fetchMytinerariesByCity(city) 
        that.addSomeDelay();
    },200)
}

handleAddFavourite = async (mytinId) => {
    let city = this.props.match.params.city;
    const favourite = {
        mytinId: mytinId,
        userId: this.props.userData._id
    }
    await this.props.addFavourite(favourite)
   
    setTimeout(() => {
        this.props.getLoggedUserData(); 
        this.props.fetchMytinerariesByCity(city);
        console.log(this.props.response)
    }, 200)

    this.setState({
        favModal: true
    })
}

renderFavIcon(mytin) {
    let toReturn = <i onClick={() => this.handleAddFavourite(mytin._id)} className="material-icons empty-heart">favorite_border</i>;
    if (this.state.login) {
        if (this.props.userData.favourites) {
            if (this.props.userData.favourites.includes(mytin._id)) {
                toReturn = <i onClick={() => this.handleAddFavourite(mytin._id)} className="material-icons heart">favorite</i>
            } 
        } 
    } 
    return (toReturn)
}

favModal(){
    let favContent = <> <p className='fav-login-text'>Login to add favourites</p> 
                        <Link to='/user/login' className='fav-modal-link'>Login</Link>
                        <Link to='/user/register' className='fav-modal-link'>Create Account</Link></>
    if(this.state.login && this.props.response === 'added'){
        favContent = <> <p>You have added this Itinerary to your favourites.</p>
                        <Link to='/user/favourites' className='fav-modal-link'>Go to Favourites</Link> </>
    } if(this.state.login && this.props.response === 'removed'){
        favContent = <> <p>You have removed this Itinerary from your favourites.</p>
                       <Link to='/user/favourites' className='fav-modal-link'>Go to Favourites</Link> </>

    }
                        

    return favContent;
}

 componentDidMount(){
     this.props.getLoggedUserData();
    const token = localStorage.getItem('token')
    if(token){
        this.props.getLoggedUserData(token)
        this.setState({
            login:true
        })
    }
    let city = this.props.match.params.city;
    this.props.fetchOneCity(city)
    this.props.fetchMytinerariesByCity(city) 
}


    render(){
        if (this.props.mytinerariesAreLoaded && this.props.userData)
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

             {/* FAVOURITE MODAL */}
             {this.state.favModal
             ? <> <div onClick={this.handleCloseModal} className="backdrop"></div>
                <div className="add-fav-modal">
                  {this.favModal()}    
                </div> </>
             : null }
                    
                

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
                                          {this.renderFavIcon(mytin)}
                                    </div>
                                </div>
                                <div className="mytin-wrap4">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th className='td'>Likes</th>
                                                <th className='td'>Hours</th>
                                                <th className='td'>Price</th>
                                            </tr>
                                            <tr>
                                                <td className='td'>{mytin.likes.length}</td>
                                                <td className='td'>{mytin.duration}</td>
                                                <td className='td'>{mytin.price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                               
                    </div>
                    <div className="mytin-wrap5">
                        {mytin.hashtags.map((hashtag, index) => { return( <div key={index} className='hashtag'>#{hashtag}</div>)})}
                    </div>

                {/* activity sloder */}
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

                        {/* comments */}
                            <div className="comment-wrap" ref={(el) => {this.commentsDiv = el}}>
                                {mytin.comments && mytin.comments.length !== 0 ? mytin.comments.map( (comment, index) => {
                                    return( <div className='comment-div' key={index}>
                                        <div key={index}className='comment-username'>{comment.userName}</div>
                                        <div className='comment-container'>{comment.comment}</div>
                                   </div> )
                                }): <div className='no-comments'>No comments yet</div>}
                            </div>

                            {this.state.login &&
                            <div className="input-wrap">
                                <input type="text"
                                     onKeyDown={(e) => this.handleKeyPress(e, mytin._id)}
                                     className='comment-input'
                                     onChange={this.handleChange}
                                     name='comment'
                                     value={this.state.comment} />
                                <button className='comment-btn' onClick={() => this.handlePostComment(mytin._id)} >SEND</button>
                            </div>}
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
      else 
      return (
          <Loader />
      )
    }
}

const mapStateToProps = (state) => ({
    city: state.cities.city,
    cityIsLoaded: state.cities.cityIsLoaded,
    mytineraries: state.mytineraries.mytineraries,
    mytinerariesAreLoaded: state.mytineraries.mytinerariesAreLoaded,
    userData: state.login.userData,
    userDataIsLoaded: state.login.userDataIsLoaded,
    response: state.favourite.response
})

export default connect (mapStateToProps, { fetchOneCity, fetchMytinerariesByCity, getLoggedUserData, postComment, addFavourite }) (Mytineraries)