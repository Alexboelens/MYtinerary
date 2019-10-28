import { FETCH_MYTINERARY_BY_CITY, FETCH_ALL_MYTINERARIES } from '../actions/types'


const initialState = {
    mytineraries:[],
    mytinerariesAreLoaded: false
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_MYTINERARY_BY_CITY:
            return {
                ...state,
                mytineraries: action.payload,
                mytinerariesAreLoaded: action.mytinerariesAreLoaded
            }
         case FETCH_ALL_MYTINERARIES:
             return {
                ...state,
                 mytineraries: action.payload,
                 mytinerariesAreLoaded: action.mytinerariesAreLoaded
                }
        
        default:
            return state;
    }
}