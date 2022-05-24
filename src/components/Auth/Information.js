import React ,{useContext,useState,useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,Modal,
    TouchableOpacity,
    TouchableHighlight,
    Picker,
    ScrollView,
    ImageBackground
} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Districts} from '../../Modal/DistrictsModal';
import {Wards} from '../../Modal/WardsModal';

import axios from 'axios';
import {API_URL} from '../../actions/types'
import Calendar from '../Calendar/Calendar';
import City from '../Cities/Cities';
import District from '../District/District'
import Ward from '../Ward/Ward';
import Gender from '../Gender/Gender';

export default function Information ({route,navigation}){

    const [visibleCalendar,setVisibleCalendar] = useState(false);
    const [visibleCities,setVisibleCities] =useState(false);
    const [visibleWars,setVisibleWards] =useState(false);
    const [visibleGender,setVisibleGender] = useState(false)
    const [visibleDistricts,setVisibleDistricts]=useState(false);
    const [emtyInput,setEmtyInput]=useState({
        firstName:"gray",
        lastName:"gray",
        dateOfBirth:"gray",
        gender:"gray",
        cmnd:"gray",
        street:"gray",
        city:"gray",
        district:"gray",
        ward:"gray"
    });

    const [information,setInformation]=useState({
        firstName:"",
        lastName:"",
        dateOfBirth:"",
        gender:"",
        cmnd:"",
        street:"",
        city:{name:"",code:""},
        district:{name:"",code:""},
        ward:{name:"",code:""}
    });

    useEffect(()=>{
    },[])
    const onHideShowCalendar = () =>{
        setVisibleCalendar(!visibleCalendar);
    }

    const onHideShowModalCities =()=>{
        setVisibleCities(!visibleCities);
    }

    const onHideShowModalWards=()=>{
        if(!information.district.name)
            return setEmtyInput({...emtyInput,district:'red'});
        else
            return setVisibleWards(!visibleWars);
    }

    const onHideShowModalDistricts = ()=>{
        if(!information.city.name)
            return setEmtyInput({...emtyInput,city:'red'});
        else
            return setVisibleDistricts(!visibleDistricts);
    }

    const onChangeGender =(value,index)=>{
         setInformation({
            ...information,gender:value
        });
        setEmtyInput({...emtyInput,gender:'gray'});
        setVisibleGender(!visibleGender)
    }

    const onChangeFirstName =(value)=>{
         setInformation({
            ...information,firstName:value
        });
        setEmtyInput({...emtyInput,firstName:'gray'});
        
    }
    const onChangeLastName =(value)=>{
        setInformation({
           ...information,lastName:value
       });
       setEmtyInput({...emtyInput,lastName:'gray'});
       
   }
    const onChangeBirthday =(event)=>{
         setInformation({
            ...information,dateOfBirth:event.dateString
        });
        setEmtyInput({...emtyInput,dateOfBirth:'gray'})
        onHideShowCalendar();
    }
    const onChangeCmnd =(value)=>{
         setInformation({
            ...information,cmnd:value
        });
        setEmtyInput({...emtyInput,cmnd:'gray'})
    }
    const onChangeStreet =(value)=>{
         setInformation({
            ...information,street:value
        });
        setEmtyInput({...emtyInput,street:'gray'});
        
    }
    const onChangeCity =(name,code)=>{
        setEmtyInput({...emtyInput,city:'gray'})
        setInformation({
            ...information,
            city:{name,code},
            district:{name:"",code:""},
            ward:{name:"",code:""}
        });
    }
    const onChangeDistrict =(name,code)=>{
        setEmtyInput({...emtyInput,district:'gray'});
        setInformation({
            ...information,
            district:{name,code},
            ward:{name:"",code:""}
        });
        onHideShowModalDistricts();
    }
    const onChangeWard =(name,code)=>{
         setInformation({
            ...information,ward:{name,code}
        });
        setEmtyInput({...emtyInput,ward:'gray'})
        onHideShowModalWards();
    }
    
    
    const onPressFinish =async ()=>{
        
        if(!information.firstName || !information.dateOfBirth || !information.cmnd || !information.gender || !information.street || !information.city.name || !information.district.name || !information.ward.name)
        return setEmtyInput({
            firstName:!information.firstName?'red':'gray',
            lastName:!information.lastName?'red':'gray',
            dateOfBirth:!information.dateOfBirth?'red':'gray',
            cmnd:!information.cmnd?'red':'gray',
            gender:!information.gender?'red':'gray',
            street:!information.street?'red':'gray',
            city:!information.city.name?'red':'gray',
            district:!information.district.name?'red':'gray',
            ward:!information.ward.name?'red':'gray',
        });
        
        
        try {
            const data = route.params.data;
            const password = route.params.password;
            const owner = {
                phoneNumber:data.user.phoneNumber,
                password,
                firstName:information.firstName,
                lastName:information.lastName,
                dateOfBirth:information.dateOfBirth,
                cmnd:!information.cmnd,
                gender:information.gender,
                street:information.street,
                city:information.city.name,
                district:information.district.name,
                ward:information.ward.name,
            }
            const response = await axios.post(`${API_URL}/api/Authentication/register`,owner);
            if(response.data.success)
                navigation.navigate('Login');
        } catch (error) {
            
        }
        
        
    }
    return (
        <ImageBackground style={styles.backgroundImage} source={require('../../public/image/background.jpg')}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <SafeAreaView style={{flex:1}} >
                            <ScrollView style={{flext:1}}>
                                <View style={styles.container}>
                                    <View style={styles.viewInformation}>
                                    <Calendar onHideShowCalendar={onHideShowCalendar} visibleCalendar={visibleCalendar}  dateOfBirth={information.dateOfBirth} onChangeBirthday={onChangeBirthday}/>
                                    <City visibleCities={visibleCities} onHideShowModalCities={onHideShowModalCities} onChangeCity={onChangeCity}/>
                                    <District visibleDistricts={visibleDistricts} onHideShowModalDistricts={onHideShowModalDistricts} onChangeDistrict={onChangeDistrict} code={information.city.code}/>
                                    <Ward visibleWars={visibleWars} onHideShowModalWards={onHideShowModalWards} onChangeWard={onChangeWard} code={information.district.code}/>
                                    <Gender visibleGender={visibleGender} onChangeGender={onChangeGender} gender={information.gender}/>
                                        {/* input firstName */}
                                        <View style={[styles.inputView,{flexDirection:'row',justifyContent:'space-between'}]}>
                                            
                                            <View style={{width:'50%'}}>
                                                <View style={[styles.styleInput,{borderColor:emtyInput.lastName}]}>
                                                    <TextInput
                                                    value={information.lastName}
                                                    style={styles.textInput}
                                                    placeholder={"Nhập Họ"}
                                                    keyboardType={'default'}
                                                    secureTextEntry={false}
                                                    onChangeText={onChangeLastName}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{width:'50%'}}>
                                                <View style={[styles.styleInput,{borderColor:emtyInput.firstName}]}>
                                                    <TextInput
                                                    value={information.firstName}
                                                    style={styles.textInput}
                                                    placeholder={"Nhập Tên"}
                                                    keyboardType={'default'}
                                                    secureTextEntry={false}
                                                    onChangeText={onChangeFirstName}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        {/* input birthDay */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.dateOfBirth}]}>
                                                <TouchableWithoutFeedback onPress={onHideShowCalendar}>
                                                    <View style={[styles.textInput,{justifyContent:'center'}]}>
                                                        <Text
                                                        style={{fontSize:19,fontFamily:'Times New Roman',color:!information.dateOfBirth?'gray':'black'}}
                                                        >
                                                            {(!information.dateOfBirth)?"YYYY-MM-DD":information.dateOfBirth}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        {/* input CMND */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.cmnd}]}>
                                                <TextInput
                                                value={information.cmnd} 
                                                style={styles.textInput}
                                                placeholder={"Số CMND/CCCD"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                onChangeText={onChangeCmnd}
                                                />
                                            </View>
                                        </View>
                                        {/* input gender */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.gender}]}>
                                                <TouchableWithoutFeedback onPress={()=>setVisibleGender(!visibleGender)}>
                                                    <View style={[styles.textInput,{justifyContent:'center'}]}>
                                                        <Text
                                                        style={{fontSize:19,fontFamily:'Times New Roman',color:!information.gender?'gray':'black'}}
                                                        >
                                                            {(!information.gender)?"---Chọn Giới Tính--- ":information.gender}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        {/* input address*/}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.street}]}>
                                                <TextInput
                                                value={information.street} 
                                                style={styles.textInput}
                                                placeholder={"Nhập Địa Chỉ Hiện Tại"}
                                                keyboardType={'default'}
                                                secureTextEntry={false}
                                                onChangeText={onChangeStreet}
                                                />
                                            </View>
                                        </View>
                                        {/* input city */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.city}]}>
                                                <TouchableWithoutFeedback onPress={onHideShowModalCities}>
                                                    <View style={[styles.textInput,{justifyContent:'center'}]}>
                                                        <Text
                                                        style={{fontSize:19,fontFamily:'Times New Roman',color:!information.city.name?'gray':'black'}}
                                                        >
                                                            {(!information.city.name)?"---Chọn Tỉnh/Thành Phố--- ":information.city.name}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        {/* input district */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.district}]}>
                                                <TouchableWithoutFeedback onPress={onHideShowModalDistricts}>
                                                    <View style={[styles.textInput,{justifyContent:'center'}]}>
                                                        <Text
                                                        style={{fontSize:19,fontFamily:'Times New Roman',color:!information.district.name?'gray':'black'}}
                                                        >
                                                            {(!information.district.name)?"---Chọn Quận/Huyện---":information.district.name}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        {/* input district */}
                                        <View style={styles.inputView}>
                                            <View style={[styles.styleInput,{borderColor:emtyInput.ward}]}>
                                                <TouchableWithoutFeedback onPress={onHideShowModalWards}>
                                                    <View style={[styles.textInput,{justifyContent:'center'}]}>
                                                        <Text
                                                        style={{fontSize:19,fontFamily:'Times New Roman',color:!information.ward.name?'gray':'black'}}
                                                        >
                                                            {(!information.ward.name)?"---Chọn Xã/Phường---":information.ward.name}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.viewBottom}>
                                    <TouchableOpacity onPress={onPressFinish} >
                                            <View style={styles.btnFinish}>
                                                <Text style={{fontSize:24,fontFamily:'Times New Roman'}}>{'Hoàn Tất'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>      
                        </SafeAreaView>
            </TouchableWithoutFeedback>
            
            </ScrollView>
        </ImageBackground>
    )
    
}


const styles = StyleSheet.create({
    container :{
        flex:1,
        marginHorizontal:20,
    },
    backgroundImage:{
        flex:1
    },  
    viewInformation:{
      flex:1,
      flexDirection:'column',
      paddingTop:20
    },
    textInput:{
        paddingHorizontal:10,
        height:30,
        fontSize:19,
        fontFamily:'Times New Roman',
    },
    inputView:{
        width:'100%',
        marginBottom:20
    },
    labelInput:{
        fontSize:18,
        fontWeight:'900',
        marginBottom:5,

    },
    styleInput:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:100,
        height:50,
        alignContent:'center',
        justifyContent:'center',
        shadowOffset: {
            width: 4,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        paddingLeft:10
    },
    viewBottom:{
        marginTop:10,
        width:'100%',
        alignItems:'center'
    },

    btnFinish:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:150,
        height:50,
        borderRadius:100,
        opacity:0.7
    },

})