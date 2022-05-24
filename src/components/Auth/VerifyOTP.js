import React,{useState,useEffect,useRef,useContext} from 'react';
import {View,Text,Button,StyleSheet,KeyboardAvoidingView, Platform,Keyboard,ImageBackground} from 'react-native';
import {TextInput,TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL } from '../../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function VerifyOTP({route,navigation}) {
    let textInput = useRef(null);
    let clockCall=null;
    const lengthInput=6;
    const defaultCountDown=60;
    const [internalVal,setInternalVal] = useState("")
    const [countDown,setCountDown] = useState(defaultCountDown);
    const [enableResent,setEnableResend] = useState(false);
    const [focusInput,setForcusInput] = useState(true);
    const [errorOTP,setErrorOTP]=useState('');
    let confirm = route.params?.confirm;
    const onChangeText =async(value)=>{
        setInternalVal(value);
    }
    useEffect( ()=>{
        // const confirmation = navigation.getParam('confirmation');
        // console.log(confirmation);
        clockCall = setInterval(()=>{
            decreamentClock();
        },1000);
        return()=>{
            clearInterval(clockCall)
        }
    });

    const decreamentClock =()=>{
        if(countDown===0)
        {
            setEnableResend(true);
            setCountDown(0);
            clearInterval(clockCall);
        }
        else
        setCountDown(countDown-1);
    }

    const onChangResend =()=>{
        setForcusInput(true)

        if(enableResent)
        {
            setCountDown(defaultCountDown);
            setEnableResend(false);
            clearInterval(clockCall);
            clockCall = setInterval(()=>{
                decreamentClock();
            },1000);
        }
    }
    const onConfirm = async ()=>{
        let data;
        try {
            data = await confirm?.confirm(internalVal);
            navigation.navigate('Information',{data,password:route.params?.password})
        } catch (error) {
            setErrorOTP('Mã PIN không đúng. Xin mời thử lại.')
        }
    }
    const onChangeFocus= ()=>{
        setForcusInput(true);
    }

    const onChangeBlur=()=>{
        setForcusInput(false);
    
    }
    return (
     <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../../public/image/background.jpg')}>
        <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior='height'
        style={styles.containerAvoiddingView}
        >
        <Text style={styles.textTitle}>
           Hệ thống đã gửi mã PIN đến số điện thoại đăng ký của bạn. Mời nhập vào để tiếp tục.
        </Text>
        <View style={{alignItems:'center'}}>
            <TextInput
                ref={(input)=>textInput=input}
                onChangeText={onChangeText}
                style={{width:0,height:0}}
                value={internalVal}
                maxLength={lengthInput}
                returnKeyType="done"
                keyboardType="numeric"
                onBlur={onChangeBlur}
                onFocus={onChangeFocus}
                autoFocus={focusInput}
            />
            <View style={styles.containerInput}>
            {
                Array(lengthInput).fill().map((value,index)=>(
                    <TouchableWithoutFeedback onPress={()=>{textInput.focus()
                            }}  key={index}>
                        <View 
                        style={[
                            styles.cellView,
                            {
                                borderBottomColor:index===internalVal.length ?'#FB6C6A':'#234DB7'
                            }
                        ]}
                        >
                            <Text 
                            style={styles.cellText}>
                                {internalVal&& internalVal.length>0?internalVal[index]: ""}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                ))

            }
                
            </View>
        </View>
            <View style={styles.bottomView}>
                    <TouchableOpacity onPress={onConfirm}>
                        <View style={styles.btnBack}>
                            <Text style={styles.textBack}>Đây không phải số của tôi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onChangResend}>
                        <View style={styles.btnResend}>
                            <Text style={[
                                styles.textResend
                            ]}>Gửi lại trong {countDown} giây...</Text>
                        </View>
                    </TouchableOpacity>
                    <View><Text style={styles.textError}>{errorOTP}</Text></View>
                    <TouchableOpacity onPress={onConfirm}>
                        <View style={styles.btnConfirm}>
                            <Text style={styles.textConfirm}>Tiếp tục</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
    textError:{
        color:'red',
        fontSize:19,
        marginTop:20,
        fontFamily:'Times New Roman',
        fontWeight:'bold'
    },

    containerAvoiddingView :{
        flex:1,
        alignItems:"center",
        padding:10
    },
    textTitle:{
        marginBottom:50,
        marginTop:50,
        fontSize:15,
        textAlign:'center',
        width:250,
        fontFamily:'Times New Roman',
        fontSize:20,
        color:'#1E3A28'
    },
    containerInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    },
    cellView:{
        paddingVertical:11,
        width:40,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1.5
    },
    cellText:{
        textAlign:'center',
        fontSize:15,
    },
    bottomView:{
        paddingTop:50,
        flexDirection:'column',
        alignItems:'center',
        flex:1,
        marginBottom:50,
        width:'100%'
    },
    btnConfirm:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        backgroundColor:'white',
        width:150,
        height:60,
        opacity:0.7,
        marginTop:40
    },
    textConfirm:{
        fontSize:30,
        color:'#234DB7',
        alignItems:'center',
        fontFamily:'Times New Roman',
        color:'#1E3A28',
    },
    btnResend:{
        alignItems:'center',
        justifyContent:'center',
    },
    textResend:{
        fontSize:19,
        alignItems:'center',
        fontFamily:'Times New Roman',
        color:'#1E3A28',
        fontStyle:'italic',
        textDecorationLine:'underline'
    },
    btnBack:{
        alignItems:'center',
        justifyContent:'center'
    },
    textBack:{
        fontSize:19,
        color:'#234DB7',
        alignItems:'center',
        fontFamily:'Times New Roman',
        color:'#1E3A28',
        fontStyle:'italic',
        textDecorationLine:'underline'
    },
});