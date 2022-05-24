import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView,ImageBackground,Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback , View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, setAuth } from '../../actions/AuthenticationAction';
import { API_URL, TOKEN_OWNER } from '../../actions/types';
import { Countries } from '../../Modal/CountriesModal';
import { setToken } from '../../Utils/setToken';


export default function Login  ({navigation}){
    let phoneInput= useRef(null);
    let passwordInput= useRef(null);
    const defaultCountry ="+84";
    const defaulMaskCountry="999 999 99 99";

    const [phoneNumber,setphoneNumber] = useState("");
    const [password,setPassword] = useState("");  

    const [focusPhone,setForcusPhone] = useState(true);
    const [focusPassword,setForcusPassword] = useState(true);

    const [modalVisible,setModalVisible] = useState(false);
    const [dataCountries,setDataCountries] = useState(Countries);
    const [codeCountry,setCodeCountry] = useState(defaultCountry);
    const [maskCountry,setMaskCountry] = useState(defaulMaskCountry);
    const [confirm,setConfirm] =useState(null);
    const [error,setError] =useState("");

    const dispatch = useDispatch();
    const authentication= useSelector(state =>state.auth);

    const onShowHideModel =()=>{
        setModalVisible(!modalVisible);
    }
    const checkToken =async () =>{
        const token = await AsyncStorage.getItem(TOKEN_OWNER);
            if(token){
                try {
                    setToken(token);
                    const response = await axios.post(`${API_URL}/api/Authentication`);
                    if(response.data.success)
                    {
                        dispatch(setAuth({isAuthentication:true,user:response.data.owner}));
                        navigation.navigate('Tabnavigator');
                        return;
                    }
                    else
                    {
                        dispatch(clearAuth());
                        setToken(null);
                        return;
                    }
                } catch (error) {
                    dispatch(clearAuth());
                    setToken(null);
                }
                
            }
            else
                setToken(null);
    }
    useEffect(()=>
    {
        checkToken();
    }
    ,[])

    const onChangePhone = (phone)=>{
        setphoneNumber(phone);
    }
    const onChangePassword=(password)=>{
        setPassword(password);
    }

    const onChangePhoneFocus= ()=>{
        setForcusPhone(true);
    }

    const onChangePhoneBlur=()=>{
        setForcusPhone(false);
    }
    const onChangePasswordFocus= ()=>{
        setForcusPassword(true);
    }

    const onChangePasswordBlur=()=>{
        setForcusPassword(false);
    }

    const onPressLogin  = async ()=>{
        try {
            const response = await axios.post(`${API_URL}/api/Authentication/Login`,{
                phoneNumber:phoneNumber.charAt(0)==='0'?codeCountry+phoneNumber.slice(1,phoneNumber.length):codeCountry+phoneNumber,
                password
            })
            if(response.data.success)
            {
                await AsyncStorage.setItem(TOKEN_OWNER,response.data.token);
                setToken(await AsyncStorage.getItem(TOKEN_OWNER))
                dispatch(setAuth({isAuthentication:true,user:response.data.owner}));
                navigation.navigate('Tabnavigator');
            }
            else
                setError(response.data.message);
            
        } catch (error) {
            console.log(error)
            setError('Lỗi mạng');
        }
            
    }
    const onPressForget  = async ()=>{
        navigation.navigate('');
            
    }
    const onPressRegister  = async ()=>{
        navigation.navigate('Register');    
            
    }
    const filterInput =(value)=>{
        if(value){
            const countryData= dataCountries.filter((obj)=>((obj.en.indexOf(value)>-1)?true:false));
            setDataCountries(countryData);
        }
        else
        setDataCountries(Countries);
    }
    const onCountryChange =(item)=>{
        setDataCountries(Countries);
        setCodeCountry(item.dialCode);
        setMaskCountry(item.mask);
        onShowHideModel();

    }
    let renderModal=()=>{
        return(
            <Modal animationType="fade" transparent={false} visible={modalVisible}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.modalContainer}>
                       <View style={styles.filterInputContainer}>
                            <TextInput
                                    autoFocus={true}
                                    onChangeText={filterInput}
                                    placeholder={'Tìm kiếm'}
                                    focusable={true}
                                    style={styles.filterInput}                            
                                />
                       </View>
                        <FlatList
                            style={{flex:1}}
                            data ={dataCountries}
                            extraData={dataCountries}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={
                                ({item})=>
                            (
                                <TouchableWithoutFeedback onPress={()=>onCountryChange(item)}>
                                    <View style ={styles.countryModal}>
                                        <View style={styles.modalItemContainer}>
                                            <Text style={styles.modalItemName}>{item.en}</Text>
                                            <Text style={styles.modalItemDialCode}>{item.dialCode}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                            }
                        />
                    </View>
                    <TouchableOpacity onPress={onShowHideModel} style={styles.closeButton}>
                            <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                
            </Modal>
        )
    }
    return (
        <View style={styles.container}>
        <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../public/image/backgroundDecor.png')}>
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                keyboardVerticalOffset={0}
                style={styles.containerAvoiddingView}
                >
                <View style={styles.containerInput}>
                    <View style={styles.Logo}>
                    <Image
                        style={{width:150,height:150}}
                        source={require("../../public/icon/Logo2x.png")}
                        />
                    </View>
                    <View >
                        <View style={styles.inputNumberPhone} >
                            <TouchableOpacity onPress={onShowHideModel}>
                                <View style={styles.openDialogView}>
                                    <Text>
                                        {codeCountry+" |"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {renderModal()}
                            <TextInput
                            ref={(input)=>{phoneInput=input}}
                            style={styles.InputStyle}
                            placeholder={maskCountry}
                            maxLength={10}
                            keyboardType="numeric"
                            value={phoneNumber}
                            onChangeText={onChangePhone}
                            secureTextEntry={false}
                            onFocus={onChangePhoneFocus}
                            onBlur={onChangePhoneBlur}
                            />
                        </View>
                    </View>
                    {renderModal()}
                    <View>
                        <View style={styles.inputPassword} >
                            <TextInput   
                            ref={(input)=>{passwordInput=input}}
                            style={styles.InputStyle}
                            keyboardType="default"
                            value={password}
                            placeholder={"Mật Khẩu"}
                            onChangeText={onChangePassword}
                            secureTextEntry={true}
                            onFocus={onChangePasswordFocus}
                            onBlur={onChangePasswordBlur}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.viewBottom}>
                    <Text style={styles.textError}>{error}</Text>
                            <TouchableOpacity onPress={onPressForget}>
                                <View style={styles.btnForget}>
                                    <Text style={{color:'#979489',fontSize:20,fontFamily: "Times New Roman",fontStyle:'italic',textDecorationLine:'underline'}}>{'Quên Mật Khẩu ?'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressLogin}>
                                <View style={styles.btnLogin}>
                                    <Text style={{fontSize:21,fontFamily: "Times New Roman"}}>{'Đăng Nhập'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressRegister}>
                                <View style={styles.btnRegister}>
                                    <Text style={{color:'white',fontSize:20,fontFamily: "Times New Roman",fontStyle:'italic',textDecorationLine:'underline'}}>{'Chưa có tài khoản ?'}</Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                
                
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1
    },
    Logo:{
        width:180,
        height:180,
        backgroundColor:'white',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    backgroundImage:{
        justifyContent:'center',
        flex:1
    },
    containerAvoiddingView:{
        flex:1,
        alignItems:'center',
        padding:50,
    },
    containerInput:{
        paddingHorizontal:10,
        flex:1,
        width:'100%',
        alignItems:'center'
    },
    inputNumberPhone:{
        backgroundColor:'white',
        borderRadius:100,
        paddingHorizontal:12,
        flexDirection:'row',
        alignItems:'center',
        width:300,
        marginBottom:20,
        height:60,
        shadowOffset: {
            width: 4,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    openDialogView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    InputStyle: {
        marginLeft:5,
        flex:1,
        height:50,
        fontFamily: "Times New Roman",
        fontSize:20,
        
     },
    inputPassword:{
        backgroundColor:'white',
        borderRadius:100,
        paddingHorizontal:12,
        alignItems:'center',
        flexDirection:'row',
        width:300,
        height:60,
        shadowOffset: {
            width: 4,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },

    viewBottom:{
        flex:0.8,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around',
    },

    textError:{
        color:'red',
        fontSize:18,
    },
    btnLogin:{
        backgroundColor:'white',
        borderRadius:100,
        width:150,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.7,
    },

    btnRegister:{
        alignItems:'center'
    },
    btnForget:{
        alignItems:'center',
    },
    
    modalContainer:{
        paddingTop:15,
        paddingLeft:25,
        paddingRight:25,
        backgroundColor:'white',
        flex:1

     },
     filterInput:{
         flex:1,
         paddingTop:10,
         paddingBottom:10,
         backgroundColor:'#fff',
         color:'#424242'
     },
     countryModal:{
         flex:1,
         borderColor:'black',
         borderTopWidth:1,
         padding:12,
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between'
     },
     modalItemContainer:{
        flex:1,
        paddingLeft:5,
        flexDirection:'row',
        
     },
     modalItemName:{
         flex:1,
         fontSize:15
     },
     modalItemDialCode:{
        fontSize:15
     },
     filterInputContainer:{
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
         alignItems:'center',
     },
     closeButton:{
        padding:12,
        alignItems:'center'
     },
     textClose:{
        padding:5,
        fontSize:20,
        color:'black',
        fontWeight:'bold'
     },

     
});


