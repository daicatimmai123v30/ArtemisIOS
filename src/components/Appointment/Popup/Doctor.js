import { default as React, useState,useEffect} from 'react';
import { Alert, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View,StyleSheet,Image,ImageBackground } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_URL } from '../../../actions/types';
const Doctor = (props) => {
    const [doctors,setDoctors]=useState([]);
    const [filterInput,setFilterInput]=useState('');
    const getDoctors =async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            if(response.data.success)
            {
                const newDoctors=response.data.doctors.map(doctor=>{
                    var rating = 0;
                    for(var review of doctor.review){
                        rating+=review.rating;
                    }
                    return{
                        _id:doctor._id,
                        lastName:doctor.lastName,
                        firstName:doctor.firstName,
                        rating:doctor.review.length>0?parseFloat(rating/doctor.review.length).toFixed(1):0,
                        image:doctor.image
                    }
                })
                setDoctors(newDoctors)
            }
        } catch (error) {
            Alert('Lỗi server')
        }
    }
    useEffect(() => {
        getDoctors();  
    },[])
    return (
        <Modal animationType="fade" transparent={false} visible={props.visible}>
            <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../../public/image/background.jpg')}>
                <View style={styles.modalContainer}>
                    <View style={styles.filterInputContainer}>
                        <TextInput
                                // autoFocus={true}
                                onChangeText={()=>{}}
                                placeholder={'Tìm kiếm'}
                                focusable={true}
                                style={styles.filterInput}                            
                            />
                    </View>
                    <FlatList
                        style={{flex:1}}
                        data ={doctors}
                        extraData={doctors}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={
                            ({item})=>
                        (
                            <TouchableWithoutFeedback onPress={()=>props.onChange("user-md",{_id:item._id,name:item.lastName+" "+item.firstName})}>
                                <View style ={styles.doctorModal}>
                                    <View style={styles.modalItemContainer}>
                                        <Image style={styles.avatar} source={{uri:item.image}}/>
                                        <View style={{flex:1,paddingLeft:10}}>
                                            <Text numberOfLines={1} style={styles.modalItemName}>{item.lastName+" " + item.firstName}</Text>
                                            <Text style={styles.modalItemRate}>Đánh giá: {item.rating}/5</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                        }
                    />
                </View>
                <TouchableOpacity  style={styles.closeButton} onPress={()=>props.onClose("user-md")}>
                        <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer:{
        paddingTop:15,
        paddingLeft:25,
        paddingRight:25,
        flex:1

     },
     filterInput:{
         paddingVertical:10,
         paddingHorizontal:10,
         backgroundColor:'white',
         color:'#424242',
         marginBottom:30,
         fontSize:20,
         height:40,
         borderRadius:20
     },
     doctorModal:{
         flex:1,
         borderColor:'black',
         padding:12,
         flexDirection:'row',
         borderBottomColor:'#707070',
         borderBottomWidth:2
         
     },
     modalItemContainer:{
        flex:1,
        paddingLeft:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
     },
     modalItemName:{
         flex:1,
         fontSize:25,
         fontFamily:'Times New Roman',
         fontWeight:'bold'
     },
     modalItemRate:{
        flex:1,
        fontSize:20,
        fontFamily:'Times New Roman',
        fontStyle:'italic'
    },
     avatar:{
         width:70,
         height:70,
         borderRadius:15
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
})
export default Doctor
