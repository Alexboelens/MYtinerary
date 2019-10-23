import { FETCH_ALL_CITIES, FETCH_ONE_CITY } from '../actions/types'


const initialState = {
    cities:[],
    citiesAreLoaded: false,
    city:[],
    cityIsLoaded: false
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_ALL_CITIES:
            return {
                ...state,
                cities: action.payload,
                citiesAreLoaded: action.citiesAreLoaded
            }
            case FETCH_ONE_CITY:
                return {
                    ...state,
                    city: action.payload,
                    cityIsLoaded: action.cityIsLoaded
                }
        default:
            return state;
    }
}