import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '../../actions/types';
const Profile = () => {
    const navigation = useNavigation();
    const [visiblePet,setVisiblePet] = useState(false);
    const route = useRoute();
    const onPressBack =()=>{
        navigation.navigate('Pet');
    }
    const [petData,setPetData] = useState ({});
    const loadPet =async ()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Pet/list-pet/${route.params}`);
            if(response.data.success)
                setPetData(response.data.pet)
        } catch (error) {
            Alert('Lỗi server')
        }
    }
    useEffect(() => {
        loadPet();
    },[]);
    return (
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <KeyboardAvoidingView
            style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            enabled
            >
            
                <View style={[styles.container]}>
                    <View style={styles.header}>
                        <TouchableWithoutFeedback  onPress={()=>onPressBack()} >
                            <FontAwesome5 name={'arrow-left'}  style={styles.headerBack}  size={30}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.headerTitle}>
                            <Text style={{fontSize:25}}>Thú Cưng</Text>
                        </View>
                        
                    </View>
                    
                    
                    <ScrollView 
                        style={{flex:1,width:'100%',alignItems:'center',marginTop:10}}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
        
                        <View style={styles.body}>
                            <View style={styles.profilePet}>
                                <View style={styles.avatarPet}>
                                    <Image style={styles.imageAvatar} source={{uri:petData?.avatar}}/>
                                </View>
                                <View style={styles.titlePet}>
                                    <TouchableWithoutFeedback >
                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                            <Text style={{fontSize:22,fontWeight:'bold'}}>{petData?.breed}</Text>
                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    <TouchableWithoutFeedback >
                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                            <Text style={{fontSize:20}}>{petData?.species}</Text>
                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.imagesPet}>
                                {petData?.imagePet?.map((value,index) => (
                                    <TouchableOpacity key={index}>
                                        <View >
                                            {
                                            (!value)?(<FontAwesome5 name={'image'} style={styles.iconAdd}  size={30}/>)
                                            :
                                            (<Image source={{uri:value?.image}} style={{width:70,height:70,borderRadius:15}}/>)
                                            }
                                        </View>
                                    </TouchableOpacity>

                                ))}
                            </View>
                            <View style={styles.informationPet}>
                                <View style={styles.item}>
                                    <FontAwesome5 name={'dog'}   size={25}/>
                                    <TextInput
                                        style={{fontSize:17,paddingHorizontal:10,flex:1}}
                                        placeholder='Tên Thú Cưng'
                                        value={petData.namePet}
                                    />
                                </View>
                                <TouchableWithoutFeedback onPress={()=>setVisibeGender(true)}>
                                    <View style={styles.item}>
                                        <FontAwesome5 name={'venus-mars'}   size={25}/>
                                        <View style={{paddingHorizontal:10,flex:1}}>
                                            <Text style={{fontSize:17,color:petData.gender?'black':'#d2d4d7'}}>{petData.gender?petData.gender:'Giống'}</Text>
                                        </View>
                                        
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.item}>
                                    <FontAwesome5 name={'weight'} size={25}/>
                                    <Text style={{paddingLeft:20,fontSize:17,color:petData.gender?'black':'#d2d4d7'}}>
                                        {petData.weight}
                                    </Text>
                                </View>
                                <View style={styles.item}>
                                    <FontAwesome5 name={'calendar-alt'} size={25}/>
                                        <Text style={{paddingLeft:20,fontSize:17,color:petData.gender?'black':'#d2d4d7'}}>
                                            {petData.age}
                                        </Text>
                                </View>
                            </View>
                                
                        </View>
                    </ScrollView>  
                    
                </View>
            </KeyboardAvoidingView> 
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
        position:'absolute',
    },
    body:{
        flex:80,
        width:'95%',
        marginVertical:10,
        flexDirection:'column',
        alignItems:'center',
    },
    profilePet:{
        width:'90%',
        height:200,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    avatarPet:{
        width:120,
        height:120,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        
    },
    informationPet:{
        width:350,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:15,
        height:300,
        paddingVertical:10
    },
    imagesPet:{
        width:350,
        height:80,
        backgroundColor:'white',
        marginVertical:10,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    titlePet:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'flex-start',
        height:65,
        paddingHorizontal:12
    },
    item:{
        width:'80%',
        borderBottomWidth:1,
        borderBottomColor:'#dedfe2',
        alignItems:'center',
        paddingVertical:5,
        flexDirection:'row',
        marginBottom:10,
    },
    iconAdd:{
        color:'#dedfe2',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#dedfe2',
        width:65,
        height:65,
        textAlign:'center',
        paddingVertical:15,
    },
    imageAvatar:{
        borderRadius:15,
        width:'100%',
        height:'100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    createBtn:{
        height:60,
        width:180,
        backgroundColor:'#D3F0D3',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    }
    
})

export default Profile;
