import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Veteran from './Veteran'
import ProfileVeteran from './ProfileVeteran';
const Stack = createNativeStackNavigator();

const Index = () => {
    return (
        <Stack.Navigator initialRouteName='Veteran'>
            <Stack.Screen
                name="Veteran"
                component={Veteran}
                options={{ headerShown:false }}
              />
              
               <Stack.Screen
                name="ProfileVeteran"
                component={ProfileVeteran}
                options={{ headerShown:false }}
              />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Index;