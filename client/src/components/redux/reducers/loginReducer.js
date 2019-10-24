import { LOGIN_USER, GET_LOGGED_USER_DATA } from '../actions/types'


const initialState = {
    login:false,
    response:'',
    userData:''
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                login: action.login,
                response:action.response
            }
        case GET_LOGGED_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        
        default:
            return state;
    }
}