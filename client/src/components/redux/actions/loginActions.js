import { LOGIN_USER, GET_LOGGED_USER_DATA, GOOGLE_LOGIN, LOGOUT } from './types'
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

export const logOut2 = (dispatch) => {
    return {
        type: LOGOUT,
        response: {
            token: null,
            auth: false
        }
    }
}

export const loginUser = (user) => dispatch => {
    axios.post('http://localhost:8080/user/login', user)
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                response: res.data
            })
            localStorage.setItem('token', res.data.token)
        }
        )
}

export const getLoggedUserData = () => dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.get('/user/profile', {
            headers: {
                'token': token
            }
        })
            .then(res => {
                dispatch({
                    type: GET_LOGGED_USER_DATA,
                    payload: res.data,
                    userDataIsLoaded: true
                })
            })
    }
}

export const googleLogin = (code) => {
    return (dispatch) => {
        fetch('/google/auth/redirect' + code, {
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
                    type: GOOGLE_LOGIN,
                    payload: json,
                    googleUserDataIsLoaded: true
                })
                localStorage.setItem('token', json.token)
                    .catch(err => console.log(err))
            })
    }
}

