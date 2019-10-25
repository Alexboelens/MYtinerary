import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUserData } from './redux/actions/loginActions'


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
          toggleMenu: false
        }
        this.handleMenu = this.handleMenu.bind(this)
      }
    
    handleMenu = () => {
         this.setState({
          toggleMenu: !this.state.toggleMenu
         })
          this.props.getLoggedUserData()
          console.log(this.props.userData)  
          console.log(this.props.userLoggedIn) 
      }

    handleLogout = () => {
        this.setState({
         toggleMenu: !this.state.toggleMenu
        })
        localStorage.removeItem('token') 
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
                          <div className="sidemenu-avatar">
                            <img src="" alt="avatar"/>
                          </div>
                          <div className="avatar-name">
                            <p>{this.props.userData.name}</p>
                          </div>
                      </div>


                      <div className="sidemenu-link-wrap">
                       
                        <div className="divider"></div>
  {this.props.userData.auth === false && <p>nope</p>}
  {this.props.userData.name && <p>yes</p>}

                        <Link to='/' onClick={this.handleMenu}>Home</Link>
                        <Link to='/cities' onClick={this.handleMenu}>Cities</Link>
                        <Link to='/' onClick={this.handleMenu}>Favourites</Link>
                        <Link to='/user/login' onClick={this.handleMenu}>Login</Link>
                        <Link to='/user/register' onClick={this.handleMenu}>Create Account</Link>
                        <button onClick={this.handleLogout}>Logout</button>
                        <Link to='/cities/mytineraries' onClick={this.handleMenu}>Mytineraries</Link>
                      </div>
                       
                    </div>
                    </> }  
            </header>
        )
    }
  
}

const mapStateToProps = (state)=> ({
  userData: state.login.userData
})

export default connect(mapStateToProps, { getLoggedUserData })(Navbar)