import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, USER_LOADED } from '../../actions/types';
import Calendar from '../Calendar/Calendar';
import Gender from '../Gender/Gender';
import Popup from '../Popup/Popup';

const Profileowner = () => {
    const navigation = useNavigation();
    const [user,setUser] = useState (useSelector(state =>state.auth.user));
    const [visibleCalendar,setVisibleCalendar] = useState(false);
    const [visibleRender,setVisibleRender]= useState(false)
    const [visibleCities,setVisibleCities] =useState(false);
    const [imageUrl,setImageUrl] = useState(null);
    const [visibleGender,setVisibleGender] =useState(false)
    const dispatch = useDispatch();
    const onHideShowModalCities =()=>{
        setVisibleCities(!visibleCities);
    }
    const onPressBack =()=>{
        navigation.navigate('Setting');
    }
    const onChangeBirthday =(event)=>{
        setUser({
           ...user,dateOfBirth:event.dateString
       });
       onHideShowCalendar();
    }
    const onChangeGender=(value)=>{
        setUser({
            ...user,gender:value
        });
        setVisibleGender(!visibleGender)
    }
    const onChangeStreet =(value) =>{
        setUser({
            ...user,street:value
        })
    }
    const onHideShowCalendar=()=>{
            setVisibleCalendar(!visibleCalendar);
    }
    const onHideShowRender =()=>{
        setVisibleRender(!visibleRender);
    }


    const onSubmitUpdate =async ()=>{
        const formData = new FormData();
        formData.append('profile',{
            name: user._id+'.jpg',
            uri: imageUrl,
            type:'image/jpg' 
        })
        try {
            const response = await axios.post(`${API_URL}/api/Owner/upload_image_profile`,formData,{
                Accept:'application/json',
                'Content-Type':'multipart/form-data'
            });
            if(response.data.success)
                dispatch({type:USER_LOADED,payload:response.data.owner})
            
        } catch (error) {
            console.log(error.toString());
        }
        
    }
    
    const PickerImage= async() =>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status!=='granted')
            alert('Truy cập bị từ chối')

        
    }
    const CameraImage = async() =>{
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if(status!=='granted')
            alert('truy cập camera bị từ chối')
    } 

    const openPicker = async()=>{
        PickerImage();
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1,
            })
            if(!result.cancelled)
                setImageUrl(result.uri)
                onHideShowRender()
            
        } catch (error) {
        }
    }
    const openCamera = async()=>{
        CameraImage();
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[16, 9],
            quality:1,
            base64:true
        })
        if(!result.cancelled)
            setImageUrl(result.uri)
            onHideShowRender();
    }
    useEffect(() => {
    }, []);

    
    return (
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <SafeAreaView style={{flex:1}}>
                <View style={[styles.container]}>
                <Calendar onHideShowCalendar={onHideShowCalendar} visibleCalendar={visibleCalendar}  dateOfBirth={user.dateOfBirth} onChangeBirthday={onChangeBirthday}/>
                <Gender visibleGender ={visibleGender} user={user.gender} onChangeGender={onChangeGender}/>
                <View style={styles.header}>
                    <TouchableWithoutFeedback   onPress={()=>onPressBack()} >
                        <FontAwesome5 name={'arrow-left'}  style={styles.headerBack} size={30}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize:25}}>Chỉnh Sửa</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    
                    <ScrollView 
                    style={{flex:1,width:'100%'}}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    >
                    <View style={styles.profile}>
                        <Image source={{uri:user.image}} style={{width:120,height:120,borderRadius:10}}/>
                        <TouchableWithoutFeedback onPress={()=>onHideShowRender()}>
                            <View style={styles.pickerImage}>
                                <FontAwesome5 name={'camera'} size={20}/>
                            </View> 
                        </TouchableWithoutFeedback>
                        
                        <Text style={{fontSize:24,fontWeight:'bold',marginVertical:10,fontFamily:'Times New Roman',color:'#6D5D5D'}}>{user.firstName}</Text>
                    </View>
                    <View style={styles.item}>
                            <FontAwesome5 name={'user'}   size={25}/>
                            <TextInput
                                value={user.lastName}
                                style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}
                            />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome5 name={'user'}   size={25}/>
                            <TextInput
                                value={user.firstName}
                                style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}
                            />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome5 name={'calendar-alt'}   size={25}/>
                            <TouchableWithoutFeedback onPress={onHideShowCalendar}>
                                <Text style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}} >{user.dateOfBirth}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    <TouchableWithoutFeedback onPress={()=>setVisibleGender(!visibleGender)}>
                        <View style={styles.item}>
                                <FontAwesome5 name={'venus-mars'}   size={25}/>
                                <Text style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}>{user.gender}</Text>
                            </View>
                    </TouchableWithoutFeedback>
                        <View style={styles.item}>
                        <FontAwesome5 name={'phone'} size={25}/>
                            <TextInput
                                value={user.phoneNumber}
                                style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}
                            />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome5 name={'map-marked-alt'} size={25}/>
                            <TextInput
                                value={user.street}
                                style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}
                                onChangeText={onChangeStreet}
                            />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome5 name={'city'} size={25}/>
                            <TouchableWithoutFeedback onPress={onHideShowRender}>
                                <Text
                                    style={{fontSize:21,paddingHorizontal:10,flex:1,fontFamily:'Times New Roman',color:'#6D5D5D'}}>
                                    {user.city+', '+user.district+', '+user.ward}
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>onSubmitUpdate()}>
                        <View style={styles.submitBtn}>
                            <Text style={{color:'#1E3A28',fontSize:25,fontWeight:'bold',fontFamily:'Times New Roman'}}>Thay Đổi</Text>
                        </View> 
                    </TouchableOpacity>
                </View>     
                <Popup onHideShowRender={onHideShowRender} openCamera={openCamera} openPicker={openPicker} visibleRender={visibleRender}/>
            </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
    },
    header:{
        height:50,
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        position:'relative',
    },
    headerTitle:{
        flex:1,
        alignItems:'center'
    },
    headerBack:{
        width:50,
        height:'100%',
        textAlign:'center',
        paddingVertical:10,
        position:'absolute'
    },
    body:{
        flex:100,
        width:'95%',
        marginVertical:10,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        padding:10,
        borderRadius:15
    },

    profile:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        position:'relative'
    },
    pickerImage:{
        width:120,
        height:40,
        backgroundColor:'black',
        backgroundColor:'gray',
        opacity:0.6,
        position:'absolute',
        bottom:46,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    item:{
        width:'90%',
        borderBottomWidth:1,
        borderBottomColor:'#dedfe2',
        alignItems:'center',
        paddingVertical:5,
        flexDirection:'row',
        marginBottom:10,
    },

    footer:{
        flex:15,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    submitBtn:{
        height:60,
        width:150,
        backgroundColor:'#D3F0D3',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },

})

export default Profileowner;
