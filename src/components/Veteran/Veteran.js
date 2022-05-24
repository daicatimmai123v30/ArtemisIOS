import React,{useState,useEffect}from 'react';
import {View, StyleSheet,Text,Image ,ScrollView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import {API_URL} from '../../actions/types'
import { useNavigation } from '@react-navigation/native';
const Veteran = () => {

    const [doctors,setDoctors] =useState([])
    const navigation = useNavigation();
    const loadDoctors=async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            if(response.data.success)
                setDoctors(response.data.doctors)
        } catch (error) {
            Alert('Lỗi server')
        }
    }

    useEffect(()=>{
        loadDoctors();
    },[])
    return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode='cover' source={require('../../public/image/background.jpg')}>
            <View style={styles.container}>
                <View style={styles.header}>
                        <Image style={styles.Logo} source ={require('../../public/icon/Logo2x.png')}/>
                        <View style={styles.viewSearch}>
                            <TouchableWithoutFeedback>
                                <Image style={{width:40,height:40}} source={require('../../public/icon/Search.png')}/>
                            </TouchableWithoutFeedback>
                            <TextInput
                                    style={styles.InputStyle}
                                    placeholder="Tìm kiếm..."
                                    maxLength={10}
                                    keyboardType="numeric"
                                    // value={phoneNumber}
                                    // onChangeText={onChangePhone}
                                    secureTextEntry={false}
                                    />
                        </View>
                        <TouchableWithoutFeedback   onPress={()=>onPressMessenger()} >
                            <Image style={styles.Logo} source ={require('../../public/icon/mess.png')}/>
                        </TouchableWithoutFeedback>
                </View>
                <View style={styles.body}>
                            {/* <View style={styles.profilePet}>
                                <Image source={require('../../public/image/petBackground.jpg')}  style={{width:'100%', height:'100%',borderRadius:15}}/>
                            </View>
                            <TouchableOpacity 
                                onPress ={()=>onPressAddPet()}
                                activeOpacity={0.5}
                                >
                                    <View style={styles.item}>
                                        <FontAwesome5 name={'plus'} style={styles.iconAdd}  size={30}/>
                                    </View>
                            </TouchableOpacity> */}
                            <ScrollView
                            style={{width:350,flex:1}}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={true}
                            >
                                <View style={styles.bodyBox}>
                                    <View style={styles.bodyBoxHeader}>
                                        <Text style={styles.bodyBoxHeaderTitle}>Bác sĩ thú y</Text>
                                    </View>
                                    <View style={styles.bodyBoxItem}>
                                    {doctors.map((doctor,index)=>(
                                        <TouchableWithoutFeedback key={index} onPress={()=>navigation.navigate('ProfileVeteran',doctor._id)}>
                                            <View  style={styles.dataItem}>
                                                <Image source={{uri:doctor.image}} style={{width:140,height:140,borderRadius:15}}/>
                                                <View style={{height:140,marginLeft:10}}>
                                                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.dataItemLabel}>{doctor?.lastName+" "+doctor.firstName}</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,width:135}}>
                                                        <Image style={{width:60,height:60,borderRadius:15}} source={require('../../public/icon/appointment.png')}/>
                                                        <Image style={{width:60,height:60,borderRadius:15}} source={require('../../public/icon/edit.png')}/>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))}
                                    </View>
                                </View>
                            </ScrollView>
                        
                </View>
                
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:10,
        paddingTop:10,
    },
    Logo:{
        width:50,
        height:50
    },
    header:{
        height:50,
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        position:'relative',
        justifyContent:'space-between',
    },
    viewSearch:{
        backgroundColor:'white',
        width:250,
        alignItems:'center',
        flexDirection:'row',
        height:'100%',
        borderRadius:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal:10
    },
    headerTitle:{
        fontSize:20
    },
    body:{
        flex:1,
        height:'100%',
        flexDirection:'column',
        alignItems:'center',
        marginTop:20,
    },
    bodyBox:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:15,
        minHeight:400
    },
    bodyBoxHeader:{
        width:'100%',
        height:60,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'#78A570',
        paddingHorizontal:20,
        justifyContent:'center'
    },
    bodyBoxHeaderTitle:{
        color:'#1E3A28',
        fontFamily:'Times New Roman',
        fontSize:30,
        fontWeight:'bold',
    },
    bodyBoxItem:{
        flex:1,
        width:'100%',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        alignItems:'center'
    },
    dataItem:{
        width:'90%',
        height:170,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:2,
        flexDirection:'row',
        alignItems:'center',
    },
    dataItemLabel:{
        color:'#6D5D5D',
        fontWeight:'bold',
        fontFamily:'Times New Roman',
        fontSize:30,
        width:180
    
    },
    profilePet:{
        width:'90%',
        height:200,
        backgroundColor:'white',
        borderRadius:15,
        marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    item:{
        width:340,
        height:80,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginVertical:10,
        
    },
    iconAdd:{
        color:'#dedfe2',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#dedfe2',
        width:65,
        height:65,
        textAlign:'center',
        paddingVertical:15
    }
})

export default Veteran;
