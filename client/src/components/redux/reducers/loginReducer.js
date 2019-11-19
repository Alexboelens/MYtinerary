import { LOGIN_USER, GET_LOGGED_USER_DATA, GOOGLE_LOGIN, LOGOUT } from '../actions/types'


const initialState = {
    response:'',
    userData:'',
    userDataIsLoaded: false,
    googleUserData:'',
    googleUserDataIsLoaded: false,
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
                userDataIsLoaded: action.googleUserDataIsLoaded
            }
        case LOGOUT:
            return{
                ...state,
                userData:'',
                response: action.response
            }
        
        default:
            return state;
    }
}