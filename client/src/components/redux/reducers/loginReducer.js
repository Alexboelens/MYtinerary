import { LOGIN_USER, GET_LOGGED_USER_DATA, GOOGLE_LOGIN } from '../actions/types'


const initialState = {
    response:'',
    userData:'',
    userDataIsLoaded: false
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
                userData: action.payload,
                userDataIsLoaded: action.userDataIsLoaded
            }
        case GOOGLE_LOGIN:
            return{
                ...state,
                userData: action.payload,
                userDataIsLoaded: action.userDataIsLoaded

            }
        
        default:
            return state;
    }
}