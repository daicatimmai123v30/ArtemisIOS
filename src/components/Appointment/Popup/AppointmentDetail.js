import React,{useState,useEffect} from 'react'
import { View,Text,TouchableWithoutFeedback,Modal,StyleSheet} from 'react-native'
import axios from 'axios'
import { API_URL } from '../../../actions/types'
const AppointmentDetail = (props) => {
    
    const [state,setState]=useState({
        startDate:'',
        endDate:'',
        doctor:'',
        pet:'',
        location:'',
        content:'',
        status:''
    });
    
    const loadAppointment = async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Appointment/${props._id}`);
            if(response.data.success)
            {
                setState({
                    ...state,
                    startDate:response.data?.appointment?.startDate,
                    endDate:response.data?.appointment?.endDate,
                    content:response.data?.appointment?.content,
                    location:response.data?.appointment?.Location,
                    pet:response?.data?.appointment?.idPet?.namePet,
                    doctor:response.data?.appointment?.idDoctor?response.data.appointment?.idDoctor?.lastName+" "+response.data.appointment.idDoctor?.firstName:'Đang duyệt',
                    status:response.data?.appointment?.status
                })
            }
        } catch (error) {
            alert(error.toString())
        }
    }

    useEffect(()=>{
        loadAppointment();
    },[])
    return (
        <Modal
            transparent={true}
            animationType='none'
            visible={props.visible}
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            {state?.startDate?.split(' ')[0]+", "+state.startDate.split(' ')[1]+" - "+state.endDate.split(' ')[1]}
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.field}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>Trạng thái: </Text>
                            <Text style={styles.label}>{state.status==="REQUESTING"?"Đang duyệt":state.status==="CANCELED"?"Đã hủy":state.status==="WAITING"?"Đã duyệt":"Đã khám"}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>Thú cưng: </Text>
                            <Text style={styles.label}>{state.pet}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>Bác sĩ: </Text>
                            <Text style={styles.label}>{state.doctor}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>Phòng khám: </Text>
                            <Text style={styles.label}>{state.location}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>Nội dung: </Text>
                            <Text style={styles.label}>{state.content}</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableWithoutFeedback >
                            <View style={styles.btnCancel}>
                                <Text style={[styles.titleBtn,{color:'white'}]}>Hủy Lịch</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>props.onClose()}>
                            <View style={styles.btnClose}>
                                <Text style={[styles.titleBtn,{color:'#1E3A28'}]}>Đóng</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AppointmentDetail
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.4)',
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        backgroundColor:'white',
        width:'90%',
        height:400,
        borderRadius:15,
        overflow:'hidden',
        alignItems:'center'

    },
    header:{
        width:'100%',
        height:60,
        backgroundColor:'#78A570',
        justifyContent:'center',
        paddingLeft:20
    },
    headerTitle:{
        color:'#1E3A28',
        fontFamily:'Times New Roman',
        fontSize:30,
        fontWeight:'bold'
    },
    body:{
        flex:1,
        width:'100%',
    },
    footer:{
        width:'70%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingBottom:10
    },
    btnCancel:{
        borderRadius:10,
        backgroundColor:'red',
        width:100,
        borderColor:'#1E3A28',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnClose:{
        width:100,
        backgroundColor:'#D3F0D3',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#1E3A28',
        justifyContent:'center',
        alignItems:'center'
    },
    titleBtn:{
        fontFamily:'Times New Roman',
        fontWeight:'bold',
        fontSize:20
    },
    field:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:5
    },
    label:{
        fontFamily:'Times New Roman',
        fontSize:24,
        color:'#1E3A28'
    }
    
})
