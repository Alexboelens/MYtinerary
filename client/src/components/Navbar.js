import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
          toggleMenu: false
        }
        this.handleMenu = this.handleMenu.bind(this)
      }
    
    handleMenu = (boolean) => {
         this.setState({
          toggleMenu: !this.state.toggleMenu
         })
         const token = localStorage.getItem('token')
        console.log(token)
        if(token){
          axios.get('http://localhost:8080/user/me', {
            headers: {
              'token': token
            }
          })
          .then(res => {console.log(res.data)})
          .catch(err=> console.log('login first'))
         
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
                          <div className="sidemenu-avatar">
                            <img src="" alt="avatar"/>
                          </div>
                          <div className="avatar-name">
                            <p>Username</p>
                          </div>
                      </div>


                      <div className="sidemenu-link-wrap">
                       
                        <div className="divider"></div>

                        <Link to='/' onClick={this.handleMenu}>Home</Link>
                        <Link to='/cities' onClick={this.handleMenu}>Cities</Link>
                        <Link to='/' onClick={this.handleMenu}>Favourites</Link>
                        <Link to='/user/login' onClick={this.handleMenu}>Login</Link>
                        <Link to='/' onClick={this.handleMenu}>Create Account</Link>
                        <Link to='/' onClick={this.handleMenu}>Logout</Link>
                        <Link to='/cities/mytineraries' onClick={this.handleMenu}>Mytineraries</Link>
                      </div>
                       
                    </div>
                    </> }  
            </header>
        )
    }
  
}


export default Navbar