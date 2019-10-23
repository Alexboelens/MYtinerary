import { LOGIN_USER } from './types'
import axios from 'axios'

export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:8080/user/login', user)
   .then( res => {
       dispatch({
           type: LOGIN_USER,
           login:true,
           response:res.data
          
       })
       localStorage.setItem('token', res.data.token)
   }
   )
}

