import { LOGIN_USER } from '../actions/types'


const initialState = {
    login:false,
    response:''
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                login: action.login,
                response:action.response
            }
        
        default:
            return state;
    }
}