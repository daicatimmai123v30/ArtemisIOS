import React from "react";
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

//Component User Chat

import UserList from './UserList';
import Message from './Message/Message';


export const UserStack = createSharedElementStackNavigator();
export default function  UserNavigator (){
  return(
    <UserStack.Navigator initialRouteName="UserList">
        {/* <UserStack.Screen
              name="UserChat"
              component={UserChat}
              options={
                {headerShown:false}
              }
        /> */}
        <UserStack.Screen
          name="UserList"
          component={UserList}
          options={
            {headerShown:false}
          }
        />
        <UserStack.Screen
          name="Message"
          component={Message}
          options={
            {headerShown:false}
          }
        />
        
    </UserStack.Navigator>
)
}