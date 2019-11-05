import { ADD_FAVOURITE } from '../actions/types'


const initialState = {
    response:''
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_FAVOURITE:
            return {
                ...state,
                response:action.response
            }
        default:
            return state;
    }
}