import { default as React, useState,useEffect} from 'react';
import { Alert, Modal, Text, TouchableOpacity, View,StyleSheet,Picker} from 'react-native';
import axios from 'axios';
import { API_URL } from '../../../actions/types';
const Pets = (props) => {
    const [pets,setPets]=useState([]);
    const [filterInput,setFilterInput]=useState('');
    const getPets =async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Pet/list-pet`);
            if(response.data.success)
            {
                setPets(response.data.pets)
            }
        } catch (error) {
            Alert('Lỗi server')
        }
    }
    useEffect(() => {
        getPets();  
    },[])
    return (
        <Modal animationType="fade" transparent={true} visible={props.visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.box}>
                        {pets.length>0?(
                            <Picker
                            style={{ 
                                flex:1,
                                width:'100%',
                                color:'black',
                                justifyContent:'center'
                                }}
                            onValueChange={(value)=>props.onChange("paw",{_id:value.split(' ')[0],name:value.split(' ')[1]})}
                            >
                                <Picker.Item label="Chọn thú cưng" value="" />
                                {pets.map((pet,index)=>(
                                    <Picker.Item key={index} label={pet.namePet} value={`${pet._id+" "+pet.namePet}`} />
                                ))}
                            </Picker>
                        ):(
                            <View
                            style={{ 
                                flex:1,
                                width:'100%',
                                color:'black',
                                justifyContent:'center',
                                alignItems:'center'
                                }}
                            >
                                <Text style={{fontFamily:'Times New Roman',fontSize:19,fontWeight:'bold',fontStyle:'italic'}}>Bạn chưa có thú cưng</Text>
                            </View>
                        )}
                        <TouchableOpacity  style={styles.closeButton} onPress={()=>props.onClose("paw")}>
                            <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.4)',
        alignItems:'center',
        justifyContent:'center'
     },
     box:{
        width:300,
        height:200,
        backgroundColor:'white',
        borderRadius:12,
        
     },
     closeButton:{
        padding:12,
        alignItems:'center',
     },
     textClose:{
        padding:5,
        fontSize:20,
        color:'black',
        fontWeight:'bold'
     },
})
export default Pets
