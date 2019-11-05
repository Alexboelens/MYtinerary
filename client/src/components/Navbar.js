import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUserData, logOut } from './redux/actions/loginActions'
import { fetchAllMytineraries, fetchMytinerariesByCity } from './redux/actions/mytinerariesActions'



class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
          toggleMenu: false,
          loggedIn: false
        }
        this.handleMenu = this.handleMenu.bind(this)
      }
    
    handleMenu = () => {
         this.setState({
          toggleMenu: !this.state.toggleMenu
         })
          this.props.getLoggedUserData()
         
          // console.log(this.props.userData)  
      }

    handleLogout = () => {
        this.setState({
         toggleMenu: !this.state.toggleMenu
        })
        this.props.logOut();
        localStorage.removeItem('token') 
        this.props.getLoggedUserData()

        let city = window.location.pathname.split('/')[2]
        this.props.fetchMytinerariesByCity(city)
        this.props.history.push('/')

     }

 
    componentDidMount(){
      this.props.getLoggedUserData();
      const token = localStorage.getItem('token')
      if(token){
        this.setState({
          loggedIn: true
        })
      }
    }

    render(){
        return(
            <header>
                 <div onClick={this.handleMenu} className="btn-div">
                     <div className="btn-line"></div>
                       <div className="btn-line"></div>
                     <div className="btn-line"></div>
                 </div>
     
                <nav className="navbar">
                    <div className="nav-logo">MYtinerary</div>
                </nav>

               
                    {this.state.toggleMenu && <>
                     
                    <div onClick={this.handleMenu} className="backdrop"></div>
                    <div className="side-menu">
                      <div className="sidemenu-header">
                          <div style={this.props.userData.image ? {backgroundImage: `url(${this.props.userData.image})`} : {backgroundImage: `url('')`}} className="sidemenu-avatar"></div>
                          <div className="avatar-name">
                            <p>{this.props.userData.userName}</p>
                          </div>
                      </div>


                      <div className="sidemenu-link-wrap">
                       
                  
                    {this.props.userData.userName && <>
                      <span className='navlink' onClick={this.handleLogout}>Logout</span>
                      <Link to='/user/favourites' className='navlink'onClick={this.handleMenu}>Favourites</Link>
                      </>}

                      {this.props.userData.auth === false && 
                      <Link to='/user/login' className='navlink' onClick={this.handleMenu}>Login</Link> }
                      
                        <Link to='/user/register' className='navlink' onClick={this.handleMenu}>Create Account</Link>
                        <Link to='/cities' className='navlink' onClick={this.handleMenu}>Cities</Link>
                      </div>
                       
                    </div>
                    </> }  
            </header>
        )
    }
  
}

const mapStateToProps = (state)=> ({
  userData: state.login.userData,
  response: state.login.response
})

export default withRouter(connect(mapStateToProps, { getLoggedUserData, logOut, fetchAllMytineraries, fetchMytinerariesByCity })(Navbar))