import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Pet from './Pet';
import AddPet from './AddPet';
import ProfilePet from './ProfilePet'
const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <Stack.Navigator initialRouteName='Pet'>
            <Stack.Screen
                name="Pet"
                component={Pet}
                options={{ headerShown:false }}
              />
              <Stack.Screen
                name="AddPet"
                component={AddPet}
                options={{ headerShown:false }}
              />
               <Stack.Screen
                name="ProfilePet"
                component={ProfilePet}
                options={{ headerShown:false }}
              />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Index;
