import React,{useState,useEffect} from 'react'
import { ImageBackground, StyleSheet, View,TouchableWithoutFeedback,Text,Image} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute,useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Rating} from 'react-native-ratings';
import axios from 'axios';
import { API_URL } from '../../actions/types';
const ProfileVeteran = () => {
    const [doctor,setDoctor]=useState(null);
    const route=useRoute();
    const navigation=useNavigation();
    const loadDoctor = async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Doctor/${route.params}`);
            if(response.data.success)
                setDoctor(response.data.doctor)
        } catch (error) {
            console.log('error')
        }
    }
    useEffect(()=>{
        loadDoctor();
    },[])
    return (
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <View style={[styles.container]}>
                    <View style={styles.header}>
                        <TouchableWithoutFeedback  onPress={()=>navigation.navigate('Veteran')} >
                            <FontAwesome5 name={'arrow-left'}  style={styles.headerBack}  size={30}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.headerTitle}>
                            <Text style={{fontSize:25}}>Bác sĩ</Text>
                        </View>
                        
                    </View>
                    
                    
                    <ScrollView 
                        style={{flex:1,width:'100%',borderRadius:15}}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems:'center'
                        }}
                    >
        
                        <View style={styles.body}>
                            <Image style={styles.userAvatar} source={{uri:doctor?.image}}/>
                            <View style={styles.record}>
                                <Text style={styles.field}>Họ và tên: </Text>
                                <Text style={styles.value}>{doctor?.lastName+" "+doctor?.firstName}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Năm sinh: </Text>
                                <Text style={styles.value}>{doctor?.dateOfBirth?.split('T')[0]}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Số điện thoại: </Text>
                                <Text style={styles.value}>{doctor?.phoneNumber}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Giới tính: </Text>
                                <Text style={styles.value}>{doctor?.gender}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Thành phố: </Text>
                                <Text style={styles.value}>{doctor?.city}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Quận/Huyện: </Text>
                                <Text style={styles.value}>{doctor?.district}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Xã/Phường: </Text>
                                <Text style={styles.value}>{doctor?.ward}</Text>
                            </View>
                            <View style={styles.record}>
                                <Text style={styles.field}>Địa chỉ: </Text>
                                <Text style={styles.value}>{doctor?.street}</Text>
                            </View>
                            <View style={styles.ratingDoctor}>
                                <View style={styles.viewComment}>
                                    <TextInput 
                                        style={{width:'95%',height:70,backgroundColor:'white',borderRadius:15}}
                                    />
                                    <View style={styles.commentsBottom}>
                                        <Rating
                                            type='custom'
                                        // showRating
                                        // onFinishRating={this.ratingCompleted}
                                            style={{backgroundColor:'red'}}
                                            startingValue={0}
                                            tintColor="#E7C7C0"
                                        />
                                        <TouchableWithoutFeedback
                                        >
                                            <View style={{backgroundColor:'#6D5D5D',padding:10,borderRadius:10}}>
                                                <Text style={{color:'white'}}>Rate and Comment</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                                <View style={styles.listComments}>
                                    {doctor?.review?.map((value,index)=>(
                                        <View key={index} style={styles.rowData}>
                                            <View style={{flexDirection:'row',flex:0.9,alignItems:'center'}}>
                                                <Text style={styles.username} ellipsizeMode="tail" numberOfLines={1}>{value.idOwner.firstName}: </Text>
                                                <Text style={{fontFamily:'Times New Roman',fontSize:18}}>{value.comments}</Text>
                                            </View>
                                            <Text style={styles.rating}>{value.rating}/5</Text>
                                        </View>
                                    ))} 
                                </View>
                            </View>
                        </View>
                    </ScrollView>  
                    
                </View>
        </ImageBackground>
    )
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
        width:400,
        marginVertical:10,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:15,
        paddingVertical:20
    },
    userAvatar:{
        width:150,
        height:150,
        borderRadius:100,
        borderWidth:1,
        borderColor:'#707070'
    },
    record:{
        width:'80%',
        flexDirection:'row',
        borderBottomColor:'#707070',
        borderBottomWidth:1,
        paddingVertical:10,
        marginVertical:10,
    },
    field:{
        fontFamily:'Times New Roman',
        fontSize:21,
        fontWeight:'bold',
        color:'#6D5D5D'
    },
    value:{
        fontFamily:'Times New Roman',
        fontSize:21,
        color:'#6D5D5D'
    },
    ratingDoctor:{
        width:'100%',
        alignItems:'center'
    },
    viewComment:{
        backgroundColor:'#E7C7C0',
        flexDirection:'column',
        width:'90%',
        borderRadius:15,
        alignItems:'center',
        paddingVertical:10
    },
    commentsBottom:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10
    },
    listComments:{
        width:'90%',
        height:200,
        marginVertical:10,
    },
    rowData:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    username:{
        width:100,
        fontFamily:'Times New Roman',
        fontSize:21,
        fontWeight:'bold'
    },
    rating:{
        fontFamily:'Times New Roman',
        fontSize:21,
        fontWeight:'bold',
        fontStyle:'italic',
        color:'#A7A7A7'
    }
})
export default ProfileVeteran
