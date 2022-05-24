import AsyncStorage from '@react-native-async-storage/async-storage'
import IO from 'socket.io-client';
import { ACTIVE_USER, API_URL } from './types';
import { useDispatch,useSelector } from 'react-redux';


// Socket config
export const socket =IO('https://socket-artemis.herokuapp.com/',{
    forceNew:true,
})
socket.on('connect',()=>console.log("Connected"))


export const loadMessage =() =>async (dispatch)=>{

};

export const uniqueUserChat =(auth,myRoute)=>{
    const uniqueUserChatFunc =async()=>{
        const {user:{_id:senderId}}=auth;
        const uniqueChatData ={
            senderId,
            recieverId:myRoute._id,
            recieverName:myRoute.lastName
        }
        const uniqueChat = JSON.parse(await AsyncStorage.getItem('@unique_Chat'));
        if(uniqueChat.length>0)
        {
            const User=uniqueChat.filter(({recieverId})=>recieverId===myRoute._id?true:false);
            if(User.length>0)
            {
                onUniqueChat({senderId:uniqueChatData.senderId,recieverId:uniqueChatData.recieverId});
            }   
            else
            {
                uniqueChat.push(uniqueChatData);
                await AsyncStorage.setItem('@unique_Chat',JSON.stringify(uniqueChat));
            }
        }
        else{
            uniqueChat.push(uniqueChatData);
            await AsyncStorage.setItem('@unique_Chat',JSON.stringify(uniqueChat));
        }
    }
    uniqueUserChatFunc();
} ;

export const onUniqueChat =({senderId,recieverId})=>{
    const onUniqueChatFunc =async({senderId,recieverId})=>{
        const uniqueRoomChat = await JSON.parse(await AsyncStorage.getItem('@unique_RoomChat'));
        socket.emit('startUniqueChat',{senderId,recieverId});
        socket.on('openChat',async({recieverId,senderId,roomId})=>{
            const mobileRoom = {
                senderId,
                recieverId,
                roomId
            }
            const mobileRoomExists = uniqueRoomChat.filter(({roomId,mRoomId})=>mRoomId===roomId);

            if(mobileRoomExists.length>0){
                socket.emit('joinTwoUsers',{roomId},({roomId})=>{

                })
            }else{
                uniqueRoomChat.push(mobileRoom);
                await AsyncStorage.setItem('@unique_Chat',JSON.stringify(uniqueRoomChat));
            }
        })
    }
    onUniqueChatFunc({senderId,recieverId});
}
export const sendMsg =()=>async (dispatch)=>{};
export const handleDispatchMsg =()=>async (dispatch)=>{};
export const loadRoomMsgs =()=>async (dispatch)=>{};
export const clearActiveMsgs =()=>async (dispatch)=>{};