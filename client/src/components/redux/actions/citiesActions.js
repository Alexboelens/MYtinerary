import { FETCH_ALL_CITIES, FETCH_ONE_CITY } from './types'
import axios from 'axios'



export const  fetchAllCities = () => dispatch => {
        axios.get('http://localhost:8080/cities/all')
        .then(res => dispatch({
            type: FETCH_ALL_CITIES,
            payload: res.data,
            citiesAreLoaded: true
        })
        );
    }

export const fetchOneCity = (city) => dispatch => {
    axios.get('http://localhost:8080/cities/'+city)
    .then(res => dispatch({
        type: FETCH_ONE_CITY,
        payload: res.data,
        cityIsLoaded:true
    }))
}
