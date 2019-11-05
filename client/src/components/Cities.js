import React from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { fetchAllCities } from './redux/actions/citiesActions'
import { Link } from 'react-router-dom'
import { getLoggedUserData } from './redux/actions/loginActions'

class CityPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


componentDidMount = () => {
    this.props.fetchAllCities();
}
   

    render(){
        return( <>
           
                <div className="search-wrap">
                    <p className='city-input-label'>Filter our current cities</p>
                      <input type='text'
                        placeholder='Enter search here'
                        className='citypage-input'
                        name='input'
                        value= {this.state.input}
                        onChange={this.handleChange} />
                    </div>
                  
            <div className='city-content'>
               {this.props.citiesAreLoaded && this.props.cities.map(city => {
                if (city.city.toLowerCase().match(this.state.input.toLowerCase()))
                    return(
                    <div key={city._id} className='city-wrap'>
                         <div style={{backgroundImage: `url(${city.image})`}} 
                          className='city-container'>
                        <Link to={'/cities/' + city.city}> <div className='city-link'>{city.city}</div></Link>
                    </div>
                </div>
            )}
            )}
             
                <Footer />
            </div>
              
            
        </>)
    }
}

const mapStateToProps = state => ({
    cities: state.cities.cities,
    citiesAreLoaded: state.cities.citiesAreLoaded
})

export default connect(mapStateToProps, { fetchAllCities, getLoggedUserData }) (CityPage)

