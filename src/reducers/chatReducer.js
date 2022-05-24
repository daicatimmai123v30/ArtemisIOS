import { ACTIVE_ROOM, ACTIVE_USER, ADD_MESSAGE, ALL_USERS, CLEAR_ACTIVE_MSGS, INJECT_MESSAGE, LOAD_MESSAGE } from "../actions/types";

const initialState={
    activeUser:null,
    activeRoom:null,
    users:[],
    messages:[],
    activeRoomMessages:[]
}
export default (state=initialState,{type,payload})=>{
    
    switch(type){
        case ACTIVE_USER:
            return {...state,activeUser:payload}
        case ALL_USERS:
            return {...state,users:payload}
        case LOAD_MESSAGE:
            
            return {
                ...state,
                messages:payload
            }
        case ACTIVE_ROOM:
            return {
                ...state,
                activeRoom:payload
            }
        case ADD_MESSAGE:
            
            return{
                ...state,
                messages:[...state.messages,payload],
                activeRoomMessages: [...state.activeRoomMessages,payload]
            }
        case INJECT_MESSAGE :
            
            return{
                ...state,
                messages:[...state.messages,payload],
                activeRoomMessages: [...state.activeRoomMessages,payload]
            }
        case CLEAR_ACTIVE_MSGS:
            return{
                ...state,
                messages:[],
                activeRoomMessages:[]
            }
        
        default: return state;
    }
}