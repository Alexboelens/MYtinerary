import { REGISTER_USER, POST_COMMENT } from './types'
import axios from 'axios'



export const registerUser = (user) => dispatch => {
     axios.post('http://localhost:8080/user/add', user)
    .then(res => {
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
        console.log(res.data)
    })
}

export const postComment = (comment) => dispatch => {
    axios.put('http://localhost:8080/comment/add', comment)
    .then(res => {
        dispatch({
            type: POST_COMMENT,
        })
        console.log(res.data)
    })
}

