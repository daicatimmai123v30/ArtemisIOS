import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet ,TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../Home/Home';
import Veteran from '../Veteran/index';
import Appointment from '../Appointment/Appointment';
import Pet from '../Pet/index'
import Setting from '../Setting';
import Map from '../Map/index';

const Tab= createBottomTabNavigator();

const Tabnavigator = ({navigation}) => {
    
    const onPressTabHome =()=>{
        navigation.navigate('Home')
    }
    const onPressTabVeteran =()=>{
        navigation.navigate('indexVeteran')
    }
    const onPressTabSetting =()=>{
        navigation.navigate('indexSetting')
    }
    const onPressTabAppointment =()=>{
        navigation.navigate('Appointment')
    }

    const onPressTabMap =()=>{
        navigation.navigate('Location');
    }

    const onPressTabPet =()=>{
        navigation.navigate('indexPet')
    }
    return (
    <Tab.Navigator initialRouteName="Home" >
        <Tab.Screen 
        name="Home"
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabHome}><FontAwesome5 name={'home'} color={focused?'#78A570':'gray'}  size={35} /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        />
        <Tab.Screen 
        name="Appointment"
        component={Appointment}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabAppointment}><FontAwesome5 name={'calendar-check'} color={focused?'#78A570':'gray'}  size={35}  /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        
        />
        <Tab.Screen 
        name="Location"
        component={Map}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabMap}><FontAwesome5 name={'map'} color={focused?'#78A570':'gray'}  size={35}  /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        />
        <Tab.Screen 
        name="indexPet"
        component={Pet}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabPet}><FontAwesome5 name={'paw'} color={focused?'#78A570':'gray'}  size={35} /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        />    
        
        <Tab.Screen 
        name="indexVeteran"
        component={Veteran}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabVeteran}><FontAwesome5 name={'user-md'} color={focused?'#78A570':'gray'}  size={35} /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        />
        
        <Tab.Screen 
        name="indexSetting"
        component={Setting}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(<TouchableOpacity onPress={onPressTabSetting}><FontAwesome5 name={'user-circle'} color={focused?'#78A570':'gray'}  size={35} /></TouchableOpacity>),
            tabBarShowLabel:false,
            }}
        />
    </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Tabnavigator;
