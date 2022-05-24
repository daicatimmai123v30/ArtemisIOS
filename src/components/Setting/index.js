import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';
import Profileowner from '../ProfileOwner/ProfileOwner';
import Setting from './Setting'

const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <Stack.Navigator initialRouteName='Setting'>
            <Stack.Screen
                name="Profileowner"
                component={Profileowner}
                options={{ headerShown:false }}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{ headerShown:false }}
              />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Index;
