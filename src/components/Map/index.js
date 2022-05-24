import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import SettingDevice from './SettingDevice';
import Map from './Map';
const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <Stack.Navigator initialRouteName='SettingDevice'>
            <Stack.Screen
                name="SettingDevice"
                component={SettingDevice}
                options={{ headerShown:false }}
              />
               <Stack.Screen
                name="GoogleMap"
                component={Map}
                options={{ headerShown:false }}
              />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Index;
