import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUserData, logOut, googleLogin, logOut2 } from './redux/actions/loginActions'
import { fetchAllMytineraries, fetchMytinerariesByCity } from './redux/actions/mytinerariesActions'
import axios from 'axios'



class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      loggedIn: false
    }
    this.handleMenu = this.handleMenu.bind(this)
  }


  googleLogout() {
    axios.get('http://localhost:8080/google/logout').then(res => {
      console.log('logged out')
    })
  }
  handleMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
    this.props.getLoggedUserData()
  }

  handleLogout = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
      loggedIn: false
    })
    this.props.logOut2();
    localStorage.removeItem('token')
    this.props.getLoggedUserData()

    let city = window.location.pathname.split('/')[2]
    this.props.fetchMytinerariesByCity(city)
    this.props.history.push('/')

  }


  componentDidMount() {
    const code = window.location.search;
    this.props.getLoggedUserData();
    if (code)
      this.props.googleLogin(code);
    console.log(this.props.googleUserData)


    const token = localStorage.getItem('token')
    if (token) {
      this.setState({
        loggedIn: true
      })
    }

  }

  render() {
    { this.props.googleUserDataIsLoaded && console.log(this.props.userData) }
    return (
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
              {console.log(this.props.userData.image)}
              <div style={this.props.userData.image ? { backgroundImage: `url(${this.props.userData.image})` } : { backgroundImage: `url('data:image/jpeg;base64,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')` }} className="sidemenu-avatar"></div>
              <div className="avatar-name">
                <p>{this.props.userData.userName}</p>
              </div>
            </div>


            <div className="sidemenu-link-wrap">


              {this.props.userData &&
                <>
                  <span className='navlink' onClick={this.handleLogout}>Logout</span>
                  <Link to='/user/favourites' className='navlink' onClick={this.handleMenu}>Favourites</Link>
                </>
              }

              {!this.props.userData &&
                <Link to='/user/login' className='navlink' onClick={this.handleMenu}>Login</Link>
              }
              <Link to='/user/register' className='navlink' onClick={this.handleMenu}>Create Account</Link>
              <Link to='/cities' className='navlink' onClick={this.handleMenu}>Cities</Link>
            </div>

          </div>
        </>}
      </header>
    )
  }

}

const mapStateToProps = (state) => ({
  userData: state.login.userData,
  response: state.login.response,
  googleUserData: state.login.googleUserData,
  googleUserDataIsLoaded: state.login.googleUserDataIsLoaded
})

export default withRouter(connect(mapStateToProps, { getLoggedUserData, logOut, fetchAllMytineraries, fetchMytinerariesByCity, googleLogin, logOut2 })(Navbar))