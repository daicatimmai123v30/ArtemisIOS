import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View,ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { LOG_LOADING } from '../../actions/types';
import { SafeAreaView } from 'react-native-safe-area-context';
const Setting = () => {
    const {user} = useSelector(state =>state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const logOut =async()=>{
        dispatch({type:LOG_LOADING})
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        navigation.navigate('Login');
        
    }

    const viewProfileOwner =()=>{
        navigation.navigate('Profileowner');
    }

    useEffect(() => {
    },[]);

    return (
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    style={styles.bodyContainer}
                    contentContainerStyle={{
                        alignItems:'center'
                    }}
                    >
                        <View style={styles.containerProfile}>
                            <View style={styles.viewProfile}>
                                <Image source={{uri:user?.image}} style={{width:130,height:130,borderRadius:100}}/>
                                <View style={styles.viewLabel}>
                                    <Text style={styles.fistNameLabel}>{user?.firstName}</Text>
                                    <Text style={styles.phoneNumberLabel}>{user?.phoneNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.viewBottomProfile}>
                                <TouchableWithoutFeedback onPress={viewProfileOwner}>
                                    <View style={styles.profileBtn}>
                                        <Text style={{fontSize:16}}>Xem hồ sơ</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableOpacity>
                                    <View style={styles.petProfileBtn}>
                                        <Text style={{fontSize:16,color:'white'}}>Xem thú cưng</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.items} >
                                <Text style={styles.itemLabel}>
                                    Hồ sơ thú cưng
                                </Text>
                                <View style={styles.icon}>
                                    <FontAwesome5 name={'paw'} color='gray'  size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.items} >
                                <Text style={styles.itemLabel}>
                                    Lịch hẹn
                                </Text>
                                <View style={styles.icon}>
                                    <FontAwesome5 name={'calendar-check'} color='gray'  size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.items} >
                                <Text style={styles.itemLabel}>
                                    Phòng khám
                                </Text>
                                <View style={styles.icon}>
                                    <FontAwesome5 name={'home'} color='gray'  size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.items} >
                                <Text style={styles.itemLabel}>
                                    Cài đặt
                                </Text>
                                <View style={styles.icon}>
                                        <FontAwesome5 name={'cog'} color='gray'  size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>logOut()}>
                            <View style={styles.items} >
                                <Text style={styles.itemLabel}>
                                    Đăng Xuất 
                                </Text>
                                <View style={styles.icon}>
                                    <FontAwesome5 name={'sign-out-alt'} color='gray'  size={30} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
            </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerProfile:{
        height:250,
        backgroundColor:'white',
        width:350,
        borderRadius:20,
        marginTop:20,
        flexDirection:'column',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    viewProfile:{
        height:'70%',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        
    },
    fistNameLabel:{
        fontSize:40,
        fontWeight:'bold',
        color:'black',
    },
    phoneNumberLabel:{
        fontSize:20,
        color:'#9d9ab9',
    },
    viewLabel:{
        flex:1,
        alignItems:'center'
    },
    viewBottomProfile:{
        flex:1,
        width:'80%',
        borderTopWidth:1,
        borderColor:'gray',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    profileBtn:{
        backgroundColor:'#dedfe2',
        width:120,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12
    },
    petProfileBtn:{
        backgroundColor:'#0084ff',
        width:120,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12
    },
    bodyContainer:{
        flex:1,
        width:'100%',
        marginVertical:15,
        flexDirection:'column',
        
    },
    items:{
        width:350,
        height:60,
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:10,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    itemLabel:{
        fontSize:16,
        fontWeight:'bold'
    },
    icon:{
        width:40,
        height:40,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Setting;
