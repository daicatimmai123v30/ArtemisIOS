import React, { useState } from 'react';
import {View, StyleSheet,Keyboard,Text,TouchableHighlight,Modal} from 'react-native';
import axios from 'axios';
import Calendar from './Calendar';
import Input from './Input';
import Clock from './Clock';
import Doctor from './Doctor';
import Pets from './Pets';
import MessageBox from '../../MessageBox/MessageBox'
import ActiveSpinner from '../../ActiveSpinner';
import { API_URL } from '../../../actions/types';
const Popup = (props) => {
    const [visible,setVisible]= useState({
        calendar:false,
        doctor:false,
        clock:false,
        pet:false,
        messageBox:{
            isSuccess:false,
            text:'',
            visible:false,
        },
        activeSpinner:false,
    })
    const [state,setState]= useState({
        calendar:'',
        doctor:{
            _id:'',
            name:'',
        },
        clock:'',
        pet:{
            _id:'',
            name:'',
        },
    })
    const onChangeVisible =(name)=>{
        
        if(name==="clock")
            setVisible({...visible,clock:!visible.clock})
        else if(name==="calendar-day")
        {
            setVisible({...visible,calendar:!visible.calendar})
        }
        else if(name==="user-md"){
            setVisible({...visible,doctor:!visible.doctor})
        }
        else if(name==="paw")
            setVisible({...visible,pet:!visible.pet})
    }
    const onChangeState=(name,value)=>{
        if(name==="clock")
        {
            setState({...state,clock:value})
            setVisible({...visible,clock:!visible.clock})
        }
        else if(name==="calendar-day")
        {
            setState({...state,calendar:value?value:state.calendar})
            setVisible({...visible,calendar:false})
        }
        else if(name==="user-md"){
            setState({...state,doctor:value?value:state.doctor})
            setVisible({...visible,doctor:false})
        }
        else if(name==="paw"){
            if(value._id){
                setState({...state,pet:value})
                setVisible({...visible,pet:false})
            }
        }
        
    }
    
    const requestAppointment=async()=>{
        // setVisible({
        //     ...visible,activeSpinner:true
        // })
        try {
            const response = await axios.post(`${API_URL}/api/Appointment/request`,{
                idDoctor:state.doctor._id,
                idPet:state.pet._id,  
                startDate:state.calendar.replaceAll('-','/')+" "+state.clock
            });
            // setVisible({
            //     ...visible,
            //     messageBox:{
            //         ...visible.messageBox,
            //         visible:true
            //     }
            // })
            if(response.data.success)
            {
                setVisible({
                    ...visible,messageBox:{
                        isSuccess:true,
                        text:response.data.messages,
                        visible:true
                    }
                })
            }
            else
            {
                setVisible({
                    ...visible,messageBox:{
                        isSuccess:false,
                        text:response.data.messages,
                        visible:true
                    }
                })
            }
        } catch (error) {
            setVisible({
                ...visible,messageBox:{
                    isSuccess:false,
                    text:'Lỗi ',
                    visible:true
                }
            })
        }
        // setVisible({
        //     ...visible,activeSpinner:false
        // })
    }
    return (
        <Modal 
            animationType="none"
            transparent={true}
            visible={props.visible}
        >
            <View
            style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width:'100%',
            height:'100%',
            justifyContent:'center'
            }}>
                <View
                style={{
                backgroundColor:'white',
                width:'100%',
                height:400,
                justifyContent:'space-between',
                paddingVertical:10,
                borderRadius:15,
                }}>
                    <TouchableHighlight onPress={()=>Keyboard.dismiss()} underlayColor="white" style={{flex:1}}>
                        <View style={styles.containerPopup}>
                            <Calendar visible={visible.calendar} onChange={onChangeState} value={state.calendar}/>
                            <Clock  visible={visible.clock} onChange={onChangeState} value={state.clock} />
                            <Doctor visible={visible.doctor} onChange={onChangeState} onClose={onChangeVisible} value={state.doctor}/>
                            <Pets visible={visible.pet} onChange={onChangeState} onClose={onChangeVisible}/> 
                            <ActiveSpinner visible={visible.activeSpinner}/>
                            <MessageBox visible={visible.messageBox.visible} isSuccess={visible.messageBox.isSuccess} text={visible.messageBox.text} onPress={()=>{
                                setVisible({...visible,messageBox:{...visible.messageBox,visible:false}})
                            }}/>


                            <Text style={styles.titlePopup}>Đặt Lịch Hẹn</Text>
                            <Input name="calendar-day" placeholder="Ngày" onClick={onChangeVisible} value={state.calendar} />
                            <Input name="clock" placeholder="Thời gian" onClick={onChangeVisible} value={state.clock}/>
                            <Input name="user-md" placeholder="Bác sĩ" onClick={onChangeVisible} value={state.doctor.name}/>
                            <Input name="paw" placeholder="Thú cưng" onClick={onChangeVisible} value={state.pet.name}/>
                            <View style={styles.bottomView}>
                                <TouchableHighlight underlayColor="white" onPress={()=>requestAppointment()}>
                                    <Text style={{fontWeight:'500',fontSize:21,color:'#e5165b'}}>
                                        XÁC NHẬN
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>props.onChange()}  underlayColor="white">
                                    <Text style={{fontWeight:'500',fontSize:21}}>HỦY BỎ</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    bottomView:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        height:40,
        alignItems:'center'
    },
    titlePopup:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:30
    },
    containerPopup:{
        height:'100%',
        width:'100%',
        alignItems:'center'
    }
})

export default Popup;
