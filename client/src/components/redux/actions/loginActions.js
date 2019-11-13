import { LOGIN_USER, GET_LOGGED_USER_DATA, GOOGLE_LOGIN } from './types'
import axios from 'axios'

export const logOut = (dispatch) => {
    return {
        type: LOGIN_USER,
        response: {
            token: null,
            auth: false
        }
    }
} 

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
             payload: res.data,
             userDataIsLoaded: true
         })
    console.log(res.data)
     })
    }

export const googleLogin = (code) => {
        return (dispatch) => {
            fetch("http://localhost:8080/google/auth/redirect"+code,{
                method: "GET",
                mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type:GOOGLE_LOGIN,
                    payload:json.data,
                    userDataIsLoaded:true
                })
            .catch(err => console.log(err))
            })
        }
    }

