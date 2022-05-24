import { CLEAR_AUTH, LOG_LOADING, SET_AUTH, USER_LOADED } from "../actions/types";

const initialState ={
    isAuthentication:false,
    user:null
};
const authReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_AUTH:{
            state={
                isAuthentication:(action.payload.isAuthentication)?action.payload.isAuthentication:state.isAuthentication,
                user:(action.payload?.user)?action.payload?.user:state.user
            }
            return state;
        }
        case CLEAR_AUTH:{
            state={
                isAuthentication:false,
                user:null
            }
            return state;
        }
        case LOG_LOADING:{
            return state={
                isAuthentication:false,
                use:null
            }
        }
        case USER_LOADED:{
            return state={
                ...state,use:action.payload
            }
        }
        default:
        return state
    }
}
export default authReducer;