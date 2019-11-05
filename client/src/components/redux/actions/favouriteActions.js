import { ADD_FAVOURITE } from './types'
import axios from 'axios'

export const addFavourite = (favourite) => dispatch => {
    axios.put('http://localhost:8080/favorites/add', favourite)
    .then(res => dispatch({
        type:ADD_FAVOURITE,
        response: res.data
    }))
}