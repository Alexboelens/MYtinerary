import { LOGIN_USER, GET_LOGGED_USER_DATA } from '../actions/types'


const initialState = {
    response:'',
    userData:''
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
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