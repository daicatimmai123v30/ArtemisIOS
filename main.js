import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './src/actions/chatAction';
import { INJECT_MESSAGE } from './src/actions/types';
import Information from './src/components/Auth/Information';
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';
// Component Login Register
import VerifyOTP from './src/components/Auth/VerifyOTP';
import Tabnavigator from './src/components/TabNavigator/TabNavigator';
import UserNavigator from './src/components/Users';





const Stack = createNativeStackNavigator();

export default function main() {
  const dispatch = useDispatch();
  const chat = useSelector((state)=> state.chat)
  const [intitialRouteName,setIntitialRouteName]=useState('');
  
  const getDispatchMsg =async({roomId,senderId, recieverId,composeMessage})=>{
    const {activeUser} = chat
    const message={
      _id:composeMessage._id,
      roomId,
      senderId,
      recieverId,
      sender: activeUser?._id==senderId
    };
    
    dispatch({type:INJECT_MESSAGE,payload:message})
  }
  const handleDispatchMsg=async()=>{
    socket.on('dispatchMessage',(data)=>{
      getDispatchMsg({...data})
    })
  }
  useEffect(()=>{
    // dispatch(loadUser());
    // dispatch(handleDispatchMsg())
    handleDispatchMsg();
  });
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
          
              <Stack.Screen
                name="User"
                component={UserNavigator}
                options={{ headerShown:false }}
            
              />
              
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown:false}}
            
              />

              <Stack.Screen
                name="Information"
                component={Information}
                options={{ title: 'Thông tin cá nhân', headerTitleAlign:'center' ,headerLeft:()=>(<Text></Text>)}}
            
              />

              <Stack.Screen
                name="VerifyOTP"
                component={VerifyOTP} 
                options={{ title: 'Xác Nhận OTP',headerBackTitle:'',headerTitleAlign:'center',headerShown:false }}
              />
              <Stack.Screen
                name="Tabnavigator"
                component={Tabnavigator}
                options={{ title: 'TabNavigator' ,headerBackTitle:'',headerTitleAlign:'center' ,headerShown:false}}
              />
              <Stack.Screen
                name="Register"
                component={Register} 
                options={{ title: 'Đăng ký tài khoản',headerBackTitle:'',headerTitleAlign:'center',headerShown:false  }}
              />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

