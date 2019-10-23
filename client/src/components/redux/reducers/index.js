import { combineReducers } from 'redux'
import citiesReducer from '../reducers/citiesReducer'
import mytinerariesReducer from './mytinerariesReducer'
import loginReducer from './loginReducer'




export default combineReducers({
    cities: citiesReducer,
    mytineraries: mytinerariesReducer,
    login: loginReducer
})