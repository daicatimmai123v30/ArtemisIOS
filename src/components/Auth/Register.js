import React, {useState,useRef,useEffect}from 'react';
import {View,Text,StyleSheet,Modal, TouchableWithoutFeedback,TouchableOpacity,Keyboard,ImageBackground} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Countries} from '../../Modal/CountriesModal';
import axios from 'axios';
import { API_URL } from '../../actions/types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';

// initializeApp( {
//     apiKey: "AIzaSyBQ0qWwEeHFRAp0Reyrvy9bKGeaLYyrbis",
//     authDomain: "numberphone-65ab4.firebaseapp.com",
//     projectId: "numberphone-65ab4",
//     storageBucket: "numberphone-65ab4.appspot.com",
//     messagingSenderId: "32352174502",
//     appId: "1:32352174502:web:81a556c50c801bfc8bcf67",
//     measurementId: "G-6JV2QB5KWY"
//   })
//   const app = getApp();
//   const auth = getAuth();
  
//   // Double-check that we can run the example
//   if (!app?.options || Platform.OS === 'web') {
//     throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
//   }
export default function Register({navigation}) {
    let textInput= useRef(null);
    const defaultCountry ="+84";
    const defaulMaskCountry="999 999 99 99";
    const [phoneNumber,setphoneNumber] = useState("");
    const [focusInput,setForcusInput] = useState(true);
    const [modalVisible,setModalVisible] = useState(false);
    const [dataCountries,setDataCountries] = useState(Countries);
    const [codeCountry,setCodeCountry] = useState(defaultCountry);
    const [maskCountry,setMaskCountry] = useState(defaulMaskCountry);
    const [error,setError] =useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorPassword,setErrorPassword] =useState("");
    const recaptchaVerifier = useRef(null);
    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;
    const onShowHideModel =()=>{
        setModalVisible(!modalVisible);
    }
    
    const onChangePhone = (phone)=>{
        setphoneNumber(phone);
    }

    const onPressContinue  = async ()=>{
        // if(phoneNumber){
        //     try {
                
        //         const response = await  axios.post(`${API_URL}/api/Authentication/check`,{
        //             phoneNumber:(phoneNumber.charAt(0)==='0')?'+84'+phoneNumber.slice(0,phoneNumber.length):'+84'+phoneNumber,
        //             password:password
        //         });
                
        //         if(response.data.success){
        //             if(true){
        //                 if(!password){
        //                     setErrorPassword("Mật khẩu không được để trống");
        //                     return;
        //                 }
        //                 else if(password != confirmPassword ){
        //                     setErrorPassword("Mật khẩu nhập lại không khớp");
        //                     return;
        //                 }
        //                 else
        //                     navigation.navigate('VerifyOTP',{ confirm:confirmation,password });
        //             }
        //         }else
        //             return setError(response.data.message);
                
                
        //     } catch (error) {
        //         if(errorString==='auth/invalid-phone-number')
        //             setError('Số điện thoại không hợp lệ');
        //         else if(errorString==='auth/too-many-requests')
        //             setError('Số điện thoại yêu cầu nhiều lần');
        //         else
        //             console.log(error.message)
                
        //     }
        // }
        // else
        //     setError('Số điện thoại không được để trống')
        // try {
        //     const phoneProvider = new PhoneAuthProvider(auth);
        //     const verificationId = await phoneProvider.verifyPhoneNumber(
        //       phoneNumber,
        //       recaptchaVerifier.current
        //     );
        //     setVerificationId(verificationId);
        //     console.log(verificationId)
        //     alert(verificationId)
        //     showMessage({
        //       text: 'Verification code has been sent to your phone.',
        //     });

        // } catch (error) {
        //     alert(error.toString())
        // }    
    }

    const onChangeFocus= ()=>{
        setForcusInput(true);
    }

    const onChangeBlur=()=>{
        setForcusInput(false);
    
    }

    useEffect(()=>{
        
        // textInput.focus();
    },[])
    const filterInput =(value)=>{
        if(value){
            const countryData= dataCountries.filter((obj)=>((obj.en.indexOf(value)>-1)?true:false));
            setDataCountries(countryData);
        }
        else
        setDataCountries(Countries);
    }
    const onCountryChange =(item)=>{
        setCodeCountry(item.dialCode);
        setMaskCountry(item.mask);
        onShowHideModel();

    }
    const onChangePassword=(password)=>{
        setPassword(password)
    }
    const onChangeConfirmPassword=(confirmPassword)=>{
        setConfirmPassword(confirmPassword)
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
        <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../public/image/background.jpg')}>
            <TouchableWithoutFeedback >
                <View style={{height:'100%',justifyContent:'center',paddingHorizontal:10}}>
                <View style={[ 
                        styles.containerInput
                        ]} >
                        <TouchableOpacity onPress={onShowHideModel}>
                            <View style={styles.openDialogView}>
                                <Text style={{fontFamily: "Times New Roman",fontSize:17,}}>
                                    {codeCountry+" |"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {renderModal()}
                        <TextInput
                        ref={(input)=>{textInput=input}}
                        style={styles.inputStyle}
                        placeholder={maskCountry}
                        maxLength={10}
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        secureTextEntry={false}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        autoFocus={focusInput}
                        />
                    </View>
                    <View style={[ 
                        styles.containerInput
                        ]} >
                         <FontAwesome5 name={'lock'}  size={25} style={{color:'#00000029'}}/>
                        <TextInput
                        ref={(input)=>{textInput=input}}
                        style={styles.inputStyle}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}
                        />
                    </View>
                    <View style={[ 
                        styles.containerInput
                        ]} >
                         <FontAwesome5 name={'lock'}  size={25} style={{color:'#00000029'}}/>
                        <TextInput
                        ref={(input)=>{textInput=input}}
                        style={styles.inputStyle}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                        secureTextEntry={true}
                        />
                    </View>
                    <Text style={styles.textError}>{error}</Text>
                    <View style={styles.viewBottom}>
                        <TouchableOpacity  onPress={onPressContinue}>
                        <View style={[styles.btnContinue]}>
                            <Text style={styles.textContinue}>
                                Tiếp tục
                            </Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
     </View>
    );
 }

 const styles = StyleSheet.create({
     container:{
         flex:1
     },
     backgroundImage:{
         flex:1
     },
     containerAvoiddingView :{
         flex:1,
         alignItems:"center",
         padding:10,
         justifyContent:'center',
     },
     containerInput:{

        flexDirection:'row',
        paddingHorizontal:12,
        borderRadius:100,
        backgroundColor:'white',
        alignItems:'center',
        height:60,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginBottom:25
     },
     openDialogView:{
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'center'
     },
     inputStyle: {
        marginLeft:5,
        flex:1,
        height:50,
        fontFamily: "Times New Roman",
        fontSize:20,
     },
     viewBottom:{
        alignItems:'center',
     },
     btnContinue:{
         width:200,
         height:70,
         borderRadius:100,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'white',
         opacity:0.7
     },
     textContinue:{
        alignItems:"center",
        fontSize:30,
        fontFamily:'Times New Roman',
        color:'#1E3A28'

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
     textError:{
        fontSize:21,
        color:'red',
        marginTop:10,
        marginBottom:10,
        justifyContent:'flex-end',
        fontFamily:'Times New Roman',
     }
 })