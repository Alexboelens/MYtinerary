import React from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { getLoggedUserData } from './redux/actions/loginActions'
import { postComment } from './redux/actions/userActions'
import { addFavourite } from './redux/actions/favouriteActions'
import { Link } from 'react-router-dom'
import { fetchAllMytineraries } from './redux/actions/mytinerariesActions'
import Loader from './Loader'

class Favourites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleOpen:'',
            activity:'',
            modal:false,
            comment:'',
            favModal: false,
            login:false,
            deleteModal: false,
            mytin: ''
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

addSomeDelay() {
        let that = this
        setTimeout(function() {
            that.scrollToBottom()
        },200)
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
        favModal: false,
        deleteModal:false
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
    let that = this;
    setTimeout(function() {
        that.props.fetchAllMytineraries();
        that.addSomeDelay();
    },200)
}

handleAddFavourite = async (mytinId) => {
    const favourite = {
        mytinId: mytinId,
        userId: this.props.userData._id
    }
    await this.props.addFavourite(favourite)
   
    setTimeout(() => {
        this.props.getLoggedUserData(); 
        console.log(this.props.response)
    }, 200)

    this.setState({
        favModal: true
    })
}

deleteModal = (mytin) =>{
    this.setState({
        deleteModal: !this.state.deleteModal,
        mytin: mytin
    })
    console.log(this.state.mytin)
}

deleteFavourite = async () => {
    const favourite = {
        mytinId: this.state.mytin,
        userId: this.props.userData._id
    }
    await this.props.addFavourite(favourite)
   
    setTimeout(() => {
        this.props.getLoggedUserData(); 
        console.log(this.props.response)
    }, 200)

    this.setState({
        deleteModal: false
    })
}


favModal(){
    let favContent = <> <p className='fav-login-text'>Login to add favourites</p> 
                        <Link to='/user/login' className='fav-modal-link'>Login</Link>
                        <Link to='/user/register' className='fav-modal-link'>Create Account</Link></>
    if(this.state.login && this.props.response === 'removed'){
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
    this.props.fetchAllMytineraries()
}


    render(){
        if (this.props.userData)
        return( 
        <main>
            {this.props.userData && this.props.userData.favourites.map(fav => {
                return(
                    this.props.mytineraries.map(mytin => {
                    if(mytin._id === fav){
                        return(
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
                                         <i onClick={() => this.deleteModal(mytin._id)} className="material-icons heart">favorite</i>
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
                            
                        )
                    }
                })
                )
               
            })}
            <Footer/>

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

             {/* DELETE FAVOURITE MODAL */}

             {this.state.deleteModal && <>
                <div className="backdrop" onClick={() => this.handleCloseModal()}></div>
                <div className="deleteFav-modal">
                    <p>Are you sure you want to delete this MYtinerary from your favourites?</p>
                    <div className="button-wrap">
                        <button className='delete-fav-btn' onClick={() => this.handleCloseModal()}>Cancel</button>
                        <button className='delete-fav-btn' onClick={() => this.deleteFavourite()}>Delete</button>
                    </div>
                   
                </div> </>}
                {this.props.userData.favourites.length === 0 && <div className="no-favourites">
                <h1>No favourites added</h1> 
                    <Link to='/cities' className='cities-link'>Go to cities</Link> 
                </div>
                    }

        </main>
        )
    
    else 
      return (
          <Loader />
      )
    }
}

const mapStateToProps = (state) => ({
    mytineraries: state.mytineraries.mytineraries,
    mytinerariesAreLoaded: state.mytineraries.mytinerariesAreLoaded,
    userData: state.login.userData,
    userDataIsLoaded: state.login.userDataIsLoaded,
    response: state.favourite.response
})

export default connect (mapStateToProps, { fetchAllMytineraries, getLoggedUserData, postComment, addFavourite }) (Favourites)