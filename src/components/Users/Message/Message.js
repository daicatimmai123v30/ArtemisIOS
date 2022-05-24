import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../actions/chatAction';
import { ACTIVE_ROOM, ADD_MESSAGE, LOAD_MESSAGE } from '../../../actions/types';

import MessengerHeader from './MessengerHeader';
const Message = () => {
    const route = useRoute();
    const [state,setState]= useState({
        textMessage:'',
        activeRoomFound:false,
        activeRoom:'',
        myMessages:[]
    });
    const[myRoute,setMyRoute] = useState(route.params);
    const auth = useSelector(state=>state.auth);
    const chat = useSelector(state=>state.chat);
    var interval;
    const dispatch = useDispatch();
    
    const [scrollView,setScollView] = useState(React.createRef());
    
    useEffect(() => {
        
        componentDidMount();
        interval = setInterval(()=>{
            loadMessages();
        },500);
        return ()=>{
            clearInterval(interval)
        }
    }, [])

    const onChangText = (text)=>{
        setState({...state,textMessage:text.trim()});
    }
    const onClearInterval =()=>{
        clearInterval(interval)
    }
    const onSend =() =>{
        if(!state.textMessage)
            return
        const{_id}=myRoute;
        sendMessage({textMessage:state.textMessage,recieverId:_id});
        setState({...state,textMessage:''})
    }
   ;
    const sendMessage =({textMessage,recieverId})=>{
        const {activeRoom,activeUser}=chat;
        const composeMessage={
            _id:uuid.v4(),
            roomId:activeRoom,
            textMessage,
            recieverId,
            senderId:activeUser._id,
            time:`${new Date()}`,
            sender:true
        }
        dispatch({type:ADD_MESSAGE,payload:composeMessage});
        socket.emit('sendToUser',{
            roomId:activeRoom,
            senderId:activeUser._id,
            recieverId,
            composeMessage
        })
    }
    const loadMessages =async()=>{
        const {user}=auth;
        
        socket.emit('loadMessages',{senderId:user._id,recieverId:myRoute._id},(data)=>{
            const myMessages = data.map((data)=>{
    
                return{
                    ...data,
                    sender:(user._id===data.senderId)
                }
            });
            if(myMessages.length>0)
                dispatch({type:LOAD_MESSAGE,payload:myMessages});
        });
        // socket.emit('recievedMessages',{myId:user._id},(data)=>{
        //     const myMessages = data.map((data)=>{
        //         return{
        //             ...data,
        //             sender:user._id.toString()===data.recieverId.toString()
        //         }
        //     });
        //     if(myMessages.length>0)
        //     dispatch({type:LOAD_MESSAGE,payload:myMessages});
        // });
    }

    const onUniqueChat = async({senderId,recieverId}) =>{
        const uniqueRoomChat = await JSON.parse(await AsyncStorage.getItem('@unique_RoomChat'));
        socket.emit('startUniqueChat',{senderId,recieverId});
        socket.on('openChat',async({recieverId,senderId,roomId})=>{
            const mobileRoom = {
                senderId,
                recieverId,
                roomId
            }
            
            const mobileRoomExists = uniqueRoomChat.filter(({roomId})=>mobileRoom.roomId===roomId);
            if(mobileRoomExists.length>0){
                socket.emit('joinTwoUsers',{roomId},({roomId})=>{
                    dispatch({type:ACTIVE_ROOM,payload:roomId})
                })
            }else{
                uniqueRoomChat.push(mobileRoom);
                await AsyncStorage.setItem('@unique_RoomChat',JSON.stringify(uniqueRoomChat));
                
                socket.emit('joinTwoUsers',{roomId},({roomId})=>{
                    dispatch({type:ACTIVE_ROOM,payload:roomId})
                })
            }
        })
    }

    const uniqueUserChat = async ()=>{
        const {user:{_id:senderId}}=auth;
        const uniqueChatData ={
            senderId,
            recieverId:myRoute._id,
            recieverName:myRoute.firstName
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

    const componentDidMount=()=>{
        new Promise((res)=>{
            uniqueUserChat();
            setTimeout(res,2000);
        }).then(()=>{
            
        });
    }


    return (
        
        <NativeBaseProvider >
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? 'padding' : null}
            style={{flex:1}}>
            <View style ={styles.container}>
                    
                    <View style={{flex:1}}>
                        <MessengerHeader {...{firstName:myRoute.firstName,image:myRoute.image}} onClearInterval={onClearInterval}/>
                        <View style={{flex:1}}>
                            <ScrollView 
                            style={{
                                paddingBottom:100
                                }}
                            ref={(ref)=>(setScollView(ref))} 
                            onContentSizeChange={()=>{
                                scrollView.scrollToEnd({animated:true});
                            }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            // contentContainerStyle={{flexGrow:1,justifyContent:'space-between'}}
                            onLayout={()=>{
                                scrollView.scrollToEnd({animated:true});
                            }}

                            >
                                {chat.messages
                                .map(({textMessage,recieverId,senderId},index)=>{
                                    const {user}=auth;
                                    return(
                                    
                                        <View key={index}
                                        style={{
                                            justifyContent:'center',
                                            flexDirection:'column',
                                            alignItems:(user._id===senderId)?'flex-end':'flex-start',
                                            }}>
                                            <Text style={{
                                                padding:10,
                                                margin:5,
                                                color:'#6D5D5D',
                                                fontSize:16,
                                                backgroundColor:(user._id===senderId)?'#E7C7C0':'#F5F3F5',
                                                overflow:'hidden',
                                                borderRadius:12
                                            }}>{textMessage}</Text>
                                        </View>
                             
                                )})}
                            </ScrollView>
                        </View>
                    </View>
                
                    <View style={styles.footer}>
                     <TextInput
                        multiline={true}
                        numberOfLines={(state.textMessage.split('\n').length>0)?(state.textMessage.split('\n').length<=4)?state.textMessage.split('\n').length:4:1}
                        defaultValue={state.textMessage}
                        placeholder='Type something'
                        onChangeText={onChangText}
                        style={[styles.sendInput]}
                        keyboardType='default'
                        />
                        <TouchableOpacity onPress={onSend}>
                           <FontAwesome5 name={'paper-plane'} color='#0084ff' solid size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </KeyboardAvoidingView>
        </NativeBaseProvider>
        
    );
}
const mapState= (state)=>(
    {chat : state.chat}
)

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white'
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:4,
        width:'100%',
        marginBottom:10
    },
    sendInput:{
        flex:1,
        paddingHorizontal:10,
        fontSize:16,
        paddingVertical:5,
        borderRadius:20,
        borderWidth:0,
        backgroundColor:'#f3f3f5',
        marginTop:10,
    }
})
export default connect(mapState)(Message);
