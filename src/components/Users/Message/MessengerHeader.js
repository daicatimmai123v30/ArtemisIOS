import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CLEAR_ACTIVE_MSGS } from '../../../actions/types';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const MessengerHeader = (props) => {
    const {navigate}=useNavigation();
    const distpatch = useDispatch();
    const clearActiveMsgs =()=>{
        distpatch({type :CLEAR_ACTIVE_MSGS});
        navigate('UserList');
    }
    return (
        <View style={{
            paddingHorizontal:10,
            paddingVertical:5,
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#E7C7C0',
            borderBottomColor:'gray',
            borderBottomWidth:1,
            height:80
        }}>
            <TouchableWithoutFeedback onPress = {()=>{clearActiveMsgs();props.onClearInterval()}}>
                <FontAwesome5 name={'arrow-left'} style={styles.headerBack} solid size={30}/>
            </TouchableWithoutFeedback>
            <View style={{marginLeft:40}}>
                    <Image source={{uri:props.image}} style={{width:60,height:60,borderRadius:50}}/>
                    <View style={{
                    width:13,
                    height:13,
                    backgroundColor:'#0099ff',
                    bottom:0,
                    right:5,
                    borderRadius:50,
                    position:'absolute',
                    borderWidth:2,
                    borderColor:'white'
                    }}>
                    </View>
            </View>
            <View style={{flexDirection:'column',marginLeft:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>{props.firstName}</Text>
                    <Text style={{fontSize:16}}>Online cách đây 5 phút</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBack:{
        width:50,
        height:'100%',
        textAlign:'center',
        paddingVertical:20,
        position:'absolute'
    },
})

export default MessengerHeader;
