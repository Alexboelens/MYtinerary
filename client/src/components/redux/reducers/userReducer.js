import { REGISTER_USER, POST_COMMENT } from '../actions/types'


const initialState = {
    response:[],
}

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                response: action.payload
            }
        case POST_COMMENT:
            return{
                ...state
            }
        
        default:
            return state;
    }
}