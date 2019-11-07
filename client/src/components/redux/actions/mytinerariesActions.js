import { FETCH_MYTINERARY_BY_CITY, FETCH_ALL_MYTINERARIES } from './types'
import axios from 'axios'



export const fetchAllMytineraries = () => dispatch => {
     axios.get('http://localhost:8080/mytineraries/all')
    .then(res => dispatch({
        type: FETCH_ALL_MYTINERARIES,
        payload: res.data,
        mytinerariesAreLoaded: true
    }))
}


export const fetchMytinerariesByCity = (city) => dispatch => {
    console.log(city)
     axios.get('http://localhost:8080/mytineraries/' +city)
    .then( res => {dispatch({
        type: FETCH_MYTINERARY_BY_CITY,
        payload: res.data,
        mytinerariesAreLoaded: true
    })
    console.log(res.data)
})
}