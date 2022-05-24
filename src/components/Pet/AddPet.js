import React,{useState} from 'react';
import {View, StyleSheet,Text,TouchableWithoutFeedback,Image, KeyboardAvoidingView,Platform,ImageBackground,TouchableOpacity, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Pet from '../Data/Pet';
import Breed from '../Data/Breed';
import { ScrollView,TextInput } from 'react-native-gesture-handler';
import Popup from '../Popup/Popup';
import Gender from './Gender';
import ActiveSpinner from '../ActiveSpinner';
import * as ImagePicker from 'expo-image-picker';
import {API_URL} from '../../actions/types';
import axios from 'axios';
import MessageBox from '../MessageBox/MessageBox';
const Addpet = () => {
    const navigation = useNavigation();
    const [visiblePet,setVisiblePet] = useState(false)
    const [petData,setPetData] = useState ({
        breed:{
            name:'',
            image:'',
            code:0,
        },
        species:{
            name:'',
            image:'',
        },
        namePet:'',
        gender:'',
        age:0,
        weight:0,
        avatar:'',
    });
    const [newPet, setNewPet]=useState(null)
    const [visibleMessage,setVisibleMessage]=useState({
        visible:false,
        text:'',
        isSuccess:false
    })
    const [visibleBreed,setVisibleBreed] = useState(false);
    const [imageUrl,setImageUrl] =useState(Array(4).fill())
    const [visibleRender,setVisibleRender]= useState(false);
    const [visibleGender,setVisibeGender] = useState(false);
    const [visibleActive,setVisibleActive]=useState(false);
    const [indexImage,setIndexImage]=useState(-1);
    const onHideShowRender =(index)=>{
        setVisibleRender(!visibleRender);
        if(index>=0)
            setIndexImage(index);
    }
    const onChangeGender =(value)=>{
        setPetData({...petData,gender:value})
        setVisibeGender(false)
    }
    const onChangeWeight=(value)=>{
        setPetData({...petData,weight:value})
    }
    const onChangeAge =(value)=>{
        setPetData({...petData,age:value})
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
            {
                if(indexImage>-1)
                {
                    imageUrl[indexImage]={uri:result.uri};
                    setIndexImage(-1);
                }
            }

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
            if(indexImage>-1)
            {
                imageUrl[indexImage]={uri:result.uri};
                setIndexImage(-1);
            }
        onHideShowRender();
    }

    const onChangeName =(text)=>{
        setPetData({...petData,namePet:text})
    }
    const onChangeSpecies =(breed) =>{
        setPetData({...petData,species:{name:breed.name,image:breed.image},avatar:breed.image})
        onHideShowBreed();      
    }

    const onHideShowBreed =()=>{
        setVisibleBreed(!visibleBreed);
    }

    const onChangePet = (pet)=>{
        setPetData({...petData,breed:pet,species:{}});
        onHideShowPet();
    }
    const onHideShowPet = () =>{
        setVisiblePet(!visiblePet);
    }
    const onPressBack = () =>{
        navigation.navigate('Pet')
    }
    const onPressAdd=async()=>{
        setVisibleActive(true)
        setTimeout(()=>{
            const loadDing=async()=>{
                try {
            
                    const formData = new FormData();
                    formData.append('breed',petData.breed.name);
                    formData.append('species',petData.species.name);
                    formData.append('namePet',petData.namePet);
                    formData.append('age',petData.age);
                    formData.append('weight',petData.weight);
                    formData.append('avatar',petData.avatar);
                    formData.append('gender',petData.gender);
                    for(var i=0;i<imageUrl.length;i++){
                        if(imageUrl[i])
                            formData.append('images',{
                                name: i+'.jpg',
                                uri: imageUrl[i].uri,
                                type:'image/jpg' 
                            })
                    }
                    const response= await axios.post(`${API_URL}/api/Pet`,formData);
                    if(response.data.success)
                    {
                        setVisibleActive(false);
                        setVisibleMessage({...visibleMessage,visible:true,text:response.data.messages,isSuccess:true});
                        setNewPet(response.data.pet)
                    }
                    else
                    {
                        setVisibleActive(false);
                        setVisibleMessage({...visibleMessage,visible:true,text:response.data.messages,isSuccess:false})
                    }
                } catch (error) {
                    Alert('Lỗi mạng');
                    setVisibleActive(false)
                }
            }
            loadDing();
        },2000)
    }
    
    return (
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <KeyboardAvoidingView
            style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            enabled
            >
            
                <View style={[styles.container]}>
                    <Popup onHideShowRender={onHideShowRender} openCamera={openCamera} openPicker={openPicker} visibleRender={visibleRender}/>
                    <MessageBox visible={visibleMessage.visible} text={visibleMessage.text} isSuccess={visibleMessage.isSuccess} 
                        onPress={()=>{
                            setVisibleMessage({...visibleMessage,visible:false})
                            navigation.navigate('Pet',newPet)
                        }}

                    />
                    <View style={styles.header}>
                        <TouchableWithoutFeedback  onPress={()=>onPressBack()} >
                            <FontAwesome5 name={'arrow-left'}  style={styles.headerBack}  size={30}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.headerTitle}>
                            <Text style={{fontSize:25}}>Thêm Thú Cưng</Text>
                        </View>
                        
                    </View>
                    
                    
                    <ScrollView 
                        style={{flex:1,width:'100%',alignItems:'center',marginTop:10}}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Pet onHideShowPet={onHideShowPet} visiblePet={visiblePet} onChangePet={onChangePet}/>
                        <Breed onHideShowBreed={onHideShowBreed} visibleBreed={visibleBreed} onChangeSpecies={onChangeSpecies} code ={petData.breed.code} />
                        <Gender visible={visibleGender} onChange={onChangeGender} value={petData.gender}/>
                        <ActiveSpinner visible={visibleActive}/>
                        {/* <ActiveSpinner visible={visibleActive}/> */}
                        <View style={styles.body}>
                            <View style={styles.profilePet}>
                                <View style={styles.avatarPet}>
                                    {petData?.species?.image?
                                        (<Image style={styles.imageAvatar} source={{uri:petData?.species?.image}}/>):
                                        (<FontAwesome5 name={'plus'} style={[styles.iconAdd,{width:'100%',height:'100%',paddingVertical:35}]}  size={40}/>)
                                    }
                                </View>
                                <View style={styles.titlePet}>
                                    <TouchableWithoutFeedback onPress={()=>onHideShowPet()}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                            <Text style={{fontSize:22,fontWeight:'bold'}}>{petData?.breed?.name ? petData?.breed?.name:'Loại Vật Nuôi'}</Text>
                                            <FontAwesome5 name={'angle-down'}   size={15}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    <TouchableWithoutFeedback onPress={()=>onHideShowBreed()}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                            <Text style={{fontSize:20}}>{petData?.species?.name?petData?.species?.name:'Giống Vật Nuôi'}</Text>
                                            <FontAwesome5 name={'angle-down'}   size={15}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.imagesPet}>
                                {imageUrl.map((value,index) => (
                                    <TouchableOpacity key={index} onPress={()=>onHideShowRender(index)}>
                                        <View >
                                            {
                                            (!value)?(<FontAwesome5 name={'image'} style={styles.iconAdd}  size={30}/>)
                                            :
                                            (<Image source={{uri:value?.uri}} style={{width:70,height:70,borderRadius:15}}/>)
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
                                        onChangeText={onChangeName}
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
                                    <TextInput
                                        style={{fontSize:17,paddingHorizontal:10,flex:1}}
                                        placeholder='Cân Nặng'
                                        onChangeText={onChangeWeight}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.item}>
                                    <FontAwesome5 name={'calendar-alt'} size={25}/>
                                        <TextInput
                                            style={{fontSize:17,paddingHorizontal:10,flex:1}}
                                            placeholder='Tuổi'
                                            onChangeText={onChangeAge}
                                            keyboardType="numeric"
                                        />
                                </View>
                                <TouchableWithoutFeedback onPress={()=>onPressAdd()}>
                                    <View style={styles.createBtn}>
                                        <Text style={{fontSize:21,fontFamily:"Times New Roman",fontWeight:'bold'}}>Thêm Thú Cưng</Text>
                                    </View>
                                </TouchableWithoutFeedback>
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

export default Addpet;
