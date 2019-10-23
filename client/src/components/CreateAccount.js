import React from 'react'


class CreateAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image:'',
            userName:'',
            email:'',
            password:'',
            firstName:'',
            lastName: '',
            country:'',
            agreeterms:false
        }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)

    }

handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault();
    const user = {
        image: this.state.image,
        userName:this.state.userName,
        email:this.state.email,
        password:this.state.password,
        firstName:this.state.firstName,
        lastName: this.state.image,
        country:this.state.image,
        agreeterms:this.state.image
    }
//   post function here
}
    render(){
        return(
            <form>
                <input type="text"/>
            </form>
        )
    }
}

export default CreateAccount