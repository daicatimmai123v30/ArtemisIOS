import React ,{useEffect}from 'react';
import {View, StyleSheet,TouchableWithoutFeedback,Text, Image} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../actions/AuthenticationAction';
import UserHeader from './UserHeader'
// import TopStatus from './TopSearch/TopStatus';
import Users from './Users';
import {socket} from '../../actions/chatAction'
import { ACTIVE_USER, ALL_USERS, CLEAR_AUTH } from '../../actions/types';
import { SafeAreaView } from 'react-native';

const UserList = () => {
    const dispatch = useDispatch();
    const auth= useSelector(state =>state.auth);
    const {navigate}=useNavigation();
    const ChatUserList =async()=>{
       
    
        const uniqueChat =  await JSON.parse(await AsyncStorage.getItem('@unique_Chat'));
        const uniqueRoomChat = await JSON.parse(await AsyncStorage.getItem('@unique_RoomChat'));
        
        if(!uniqueChat)
            await AsyncStorage.setItem('@unique_Chat',JSON.stringify([]));
    
        if(!uniqueRoomChat)
            await AsyncStorage.setItem('@unique_RoomChat',JSON.stringify([]))
        // Set active User
        dispatch({type:ACTIVE_USER,payload:auth.user});
        
        
    
        // Emit get Users
        socket.emit('getDoctors',{_id:auth.user._id});
    
        // Get All doctors
        socket.on('getAllDoctors',(doctors)=>{
            const allDoctor = doctors.map((doctor)=>({
                _id:doctor._id,
                firstName:doctor.firstName,
                time:'1:00',
                image:doctor.image,
                msg:'last Msg'
            }));
            dispatch({type:ALL_USERS,payload:allDoctor});
           
        });
    };
    useEffect(() => {
        
        ChatUserList();
    },[])
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{
            flex:1,
            position:'relative'}}
            >
           
            <UserHeader/>
            {/* <TopStatus/> */}
            <Users/>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default UserList;
