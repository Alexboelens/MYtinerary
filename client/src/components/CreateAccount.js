import React from 'react'
import Footer from './Footer'
import { registerUser } from './redux/actions/userActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Terms from './Terms'


class CreateAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnctZnpwc_Z8y81rqdl3gDCajnLQbtsKYc-9wFYOkp1-mBcXn8&s',
            userName:'',
            email:'',
            password:'',
            firstName:'',
            lastName: '',
            country:'',
            agreeTerms:false,
            modal: false
        }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handlePrompt = this.handlePrompt.bind(this)
       this.handleCheckbox = this.handleCheckbox.bind(this)
       this.handleDisabled = this.handleDisabled.bind(this)
       this.handleModal = this.handleModal.bind(this)
    }

handleModal(){
    this.setState({
        modal: !this.state.modal
    })
}
handleDisabled = () => {
    const { userName, email, password, firstName, lastName, country, agreeTerms } = this.state;
        return userName.length > 4 && email.length > 6 && password.length > 4 && firstName.length > 4 && lastName.length > 4 && country.length > 1 && agreeTerms === true
    }


handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
}

handleCheckbox(){
    this.setState({
        agreeTerms: !this.state.agreeTerms
    })
}

handlePrompt = async () => {
    const url = prompt("enter URL address example: http://example.jpg");

    if (url != null) {
        let imageExist = await this.imageExists(url);
        console.log(imageExist)
        if (imageExist)
        this.setState({
            image: url
        })
    }
}

imageExists = (image_url) => {
    var http = new XMLHttpRequest();
    http.open('HEAD',image_url, false);
    http.send();
    return http.status !== 404;
}

handleSubmit = (e) => {
    e.preventDefault();
    const user = {
        image: this.state.image,
        userName:this.state.userName,
        email:this.state.email,
        password:this.state.password,
        firstName:this.state.firstName,
        lastName: this.state.lastName,
        country:this.state.country,
        agreeTerms:this.state.agreeTerms
    }
    this.props.registerUser(user)
}
    render(){
        const isEnabled = this.handleDisabled();
        return(
            <main>
                <div className='ca-img-wrap'>
                    <div style={{backgroundImage: `url(${this.state.image})`}} className="ca-img">
                    </div>
                </div>
                <div className="div-center">
                     <button onClick={this.handlePrompt}className="ca-add-btn">Add Photo</button>
                </div>

            <div className="div-center">
                <label htmlFor="userName" className='ca-label'>Username</label>
               <input type="text"
                id='userName'
                name='userName'
                value={this.state.userName}
                onChange={this.handleChange}
                className='ca-input-field'
                title='must be 4 characters long'
                required/>
            </div>

            <div className="div-center">
               <label htmlFor="password" className='ca-label'>Password</label>
               <input type="password"
                id='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                className='ca-input-field'
               />
            </div>

            <div className="div-center">
               <label htmlFor="email" className='ca-label'>Email</label>
               <input type="email"
                id='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                className='ca-input-field'
               />
            </div>

            <div className="div-center">
               <label htmlFor="firstName" className='ca-label'>First Name</label>
               <input type="text"
                id='firstName'
                name='firstName'
                value={this.state.firstName}
                onChange={this.handleChange}
                className='ca-input-field'
               />
            </div>

            <div className="div-center">
               <label htmlFor="lastName" className='ca-label'>Last Name</label>
               <input type="text"
                id='lastName'
                name='lastName'
                value={this.state.lastName}
                onChange={this.handleChange}
                className='ca-input-field'
               />
            </div>

                <label className='ca-select-label' htmlFor="select">Country</label>
                      <select name="country" 
                            value={this.state.country} 
                            onChange={this.handleChange}
                            id='select'
                            className='ca-select'>
                                <option value='' disabled>Choose One</option>
                                <option value="England">England</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                                <option value="Holland">Holland</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Spain">Spain</option>
                                <option value="United States">United Stated</option>
                          </select>

                    <div className="ca-checkbox-wrap">
                        <input type="checkbox"
                        className='ca-checkbox'
                        onChange={this.handleCheckbox}
                        id='ca-checkbox'
                        />
                        <label htmlFor="ca-checkbox">I agree to MYtinerary's <span onClick={this.handleModal} className='ca-terms-text'>Terms & Conditions</span></label>
                    </div>

                    <div className="div-center"><button disabled={!isEnabled} onClick={this.handleSubmit} className={!isEnabled ? 'register-btn' : 'register-btn-active'}>Register</button></div>

                    {this.props.response === 'email already exists' && <div className='ca-response'>Email adress already exists</div> }
                    {this.props.response === 'username already exists' && <div className='ca-response-username'>Username adress already exists</div> }
                    {this.props.response === 'user added' && <Redirect to='/user/login'/> }

                    {/* Terms & conditions Modal */}
                    {this.state.modal && <> <div onClick={this.handleModal} className="backdrop"></div>
                    <div className="terms-modal">
                        <div className='terms-header'>Terms & Conditions</div> 
                        <div className="terms-content">
                            <Terms />
                        </div>   
                    </div> 
                       </> }

                    <Footer />
                </main>
        )
    }
}

const mapStateToProps = (state) => ({
    response: state.user.response
})

export default connect(mapStateToProps, { registerUser }) (CreateAccount)