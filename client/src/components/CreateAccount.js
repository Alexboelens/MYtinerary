import React from 'react'
import Footer from './Footer'
import { registerUser } from './redux/actions/userActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Terms from './Terms'


class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'data:image/jpeg;base64,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',
            userName: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            country: '',
            agreeTerms: false,
            modal: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePrompt = this.handlePrompt.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleDisabled = this.handleDisabled.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    handleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }
    handleDisabled = () => {
        const { userName, email, password, firstName, lastName, country, agreeTerms } = this.state;
        return userName.length > 4 && email.length > 6 && password.length > 4 && firstName.length > 2 && lastName.length > 4 && country.length > 1 && agreeTerms === true
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckbox() {
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
        http.open('HEAD', image_url, false);
        http.send();
        return http.status !== 404;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            image: this.state.image,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            agreeTerms: this.state.agreeTerms
        }
        this.props.registerUser(user)
    }
    render() {
        const isEnabled = this.handleDisabled();
        return (
            <main>
                <div className='ca-img-wrap'>
                    <div style={{ backgroundImage: `url(${this.state.image})` }} className="ca-img">
                    </div>
                </div>
                <div className="div-center">
                    <button onClick={this.handlePrompt} className="ca-add-btn">Add Photo</button>
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
                        required />
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
                <div className="country-wrap">
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
                </div>


                <div className="ca-checkbox-wrap">
                    <input type="checkbox"
                        className='ca-checkbox'
                        onChange={this.handleCheckbox}
                        id='ca-checkbox'
                    />
                    <label htmlFor="ca-checkbox">I agree to MYtinerary's <span onClick={this.handleModal} className='ca-terms-text'>Terms & Conditions</span></label>
                </div>

                <div className="div-center"><button disabled={!isEnabled} onClick={this.handleSubmit} className={!isEnabled ? 'register-btn' : 'register-btn-active'}>Register</button></div>

                {this.props.response === 'email already exists' && <div className='ca-response'>Email adress already exists</div>}
                {this.props.response === 'username already exists' && <div className='ca-response-username'>Username adress already exists</div>}
                {this.props.response === 'user added' && <Redirect to='/user/login' />}

                {/* Terms & conditions Modal */}
                {this.state.modal && <> <div onClick={this.handleModal} className="backdrop"></div>
                    <div className="terms-modal">
                        <div className='terms-header'>Terms & Conditions</div>
                        <div className="terms-content">
                            <Terms />
                        </div>
                    </div>
                </>}

                <Footer />
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    response: state.user.response
})

export default connect(mapStateToProps, { registerUser })(CreateAccount)