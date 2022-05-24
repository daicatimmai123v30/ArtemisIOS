import { CLEAR_AUTH, LOGOUT_LOADING, SET_AUTH } from "./types"
export const setAuth =(payload)=>{
    return {
        type:SET_AUTH,
        payload:payload,
    }
}
export const clearAuth =()=>{
    return{
        type:CLEAR_AUTH
    }
}
export const logout =()=>{
    return{
        type:LOGOUT_LOADING
    }
}