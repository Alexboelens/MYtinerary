import { LOGIN_USER, GET_LOGGED_USER_DATA } from './types'
import axios from 'axios'

export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:8080/user/login', user)
   .then( res => {
       dispatch({
           type: LOGIN_USER,
           response:res.data
       })
       localStorage.setItem('token', res.data.token)
   }
   )
}

export const getLoggedUserData = () => dispatch => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:8080/user/profile', {
        headers: {
          'token': token
        }
      })
     .then(res => {
         dispatch({
             type:GET_LOGGED_USER_DATA,
             payload: res.data
         })
    console.log(res.data)
     })
      
    }

