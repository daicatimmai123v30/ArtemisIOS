import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Image,ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import {Spinner} from 'native-base'
import { FlatList } from 'react-native-gesture-handler';
const  Users=  ({navigation})=>  {
    const dispatch = useDispatch();
    const [loadUsers, setLoadUsers] = useState(false);
    const users= useSelector(state=>state.chat.users);
    const {navigate} = useNavigation();
    useEffect(()=>{
       
        setTimeout(()=>{
            setLoadUsers(true);
        },3000);
    },[]);

    return (
        <View style={{marginLeft:10,marginTop:10, flex:1,justifyContent:'center'}}>
            {loadUsers ?
            (<View style={{flex:1}}>
               {users.length>0?(
            
                <FlatList
                    style={{flex:1}}
                        showsVerticalScrollIndicator={false}
                        data={users}
                        extraData={users}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={
                            ({item})=>
                        (
                            <TouchableWithoutFeedback 
                            onPress={()=>navigate('Message',{
                                _id:item._id,
                                firstName:item.firstName,
                                image:item.image,
                                msg:item.msg
                                })}
                            >
                                <View style={{height:100,flexDirection:'row',alignItems:'center',borderBottomWidth:1}}>
                                    <View>
                                        <Image 
                                        style={{height:70,width:70,borderRadius:50}}
                                        source={{uri:item.image}}/>
                                    </View>
                                    <View style={{height:'100%',width:'100%',flexDirection:'column',justifyContent:'center',paddingHorizontal:5}}>
                                        <View style={{height:35,width:'100%',justifyContent:'center'}}>
                                            <Text style={{fontSize:22,fontWeight:'bold'}}>{item.firstName}</Text>
                                        </View>
                                        <View style={{height:35,width:'100%',justifyContent:'center'}}>
                                            <Text>{item.msg}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                        }
                    />
                
                  
                   
               ):(
                   <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                       <Text>
                            No Contracts Yet
                       </Text>
                   </View>
               )} 
            </View>):(<ActivityIndicator size="large" color="#0000ff" />)}
        </View>
    );
}

const styles = StyleSheet.create({})

export default Users;
