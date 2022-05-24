import React ,{useState,useEffect}from 'react';
import {View, StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Agenda} from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppointmentDetail from './Popup/AppointmentDetail';
import Popup from './Popup/Popup';
import axios from 'axios'
import { API_URL } from '../../actions/types';
// LocaleConfig.locales['fr'] = {
//     monthNames: ['Tháng 1 -','Tháng 2 -','Tháng 3 -','Tháng 4 -','Tháng 5 -','Tháng 6 -','Tháng 7 -','Tháng 8 -','Tháng 9 -','Tháng 10 -','Tháng 11 -','Tháng 12 -'];
//     monthNamesShort: ['Tháng 1 -','Tháng 2 -','Tháng 3 -','Tháng 4 -','Tháng 5 -','Tháng 6 -','Tháng 7 -','Tháng 8 -','Tháng 9 -','Tháng 10 -','Tháng 11 -','Tháng 12 -'];
//     dayNames: ['Hai','Ba','Tư','Năm','Sáu','Bảy','Chủ Nhật'];
//     dayNamesShort: ['Hai','Ba','Tư','Năm','Sáu','Bảy','CN'];
//     today: 'Aujourd\'hui'
//   };
//   LocaleConfig.defaultLocale = 'fr';

const Appointment = () => {
    const [visiblePopup,setVisiblePopup]=useState(false);
    const [appointmentDetail,setAppointmentDetail]=useState({
      visible:false,
      _id:''
    })
    const onChangeVisible =()=>{
      setVisiblePopup(!visiblePopup);
    }
    // Wed Nov 03 2021 7  
    const [items,setItems]= useState({});
    const loadItems=async(day)=> {
        setTimeout(async() => {
          try {
            const response = await axios.get(`${API_URL}/api/Appointment`);
            if(response.data.success){
              const newItems = {};
              response.data.appointments.forEach(element=>{
                newItems[new Date(element.startDate).toISOString().split('T')[0]]=[{
                  _id:element._id,
                  startDate:element.startDate,
                  endDate:element.endDate,
                  status:element.status,
                  namePet:element?.idPet?.namePet,
                  doctor:element.idDoctor ? element?.idDoctor?.lastName+" " + element?.idDoctor?.firstName:"Đang duyệt"
                }]
              })
              setItems(newItems);
            }
            
          } catch (error) {
            alert(error.toString())
          }
        }, 1000);
      }
      const renderItem=(item)=> {
        
        return (
          <TouchableOpacity
            style={[styles.item,{backgroundColor:item.status==="REQUESTING"?"#E7C7C0":item.status==="WAITING"||item.status==="FINISHED"?"#D3F0D3":"#BB3F3F"}]}
            onPress={()=>onPressAppointmentDetail(item._id)}
          >
            <Text style={{fontSize:25,fontFamily:'Times New Roman',fontWeight:'bold',color:'#1E3A28'}}>{new Date(item.startDate).toLocaleTimeString()+" - "+ new Date(item.endDate).toLocaleTimeString()}</Text>
            <Text style={{fontSize:21,fontFamily:'Times New Roman',color:'#1E3A28'}}>Thú cứng: {item.namePet}</Text>
            <Text style={{fontSize:21,fontFamily:'Times New Roman'}}>Bác sĩ: {item.doctor}</Text>
          </TouchableOpacity>
        );
      }
    
      const renderEmptyDate=()=> {
        return (
          <View style={styles.emptyDate}>
            <Text style={styles.emtyDateLabel}>Bạn chưa có cuộc hẹn nào!</Text>
          </View>
        );
      }
      
      const onPressAppointmentDetail =(_id)=>{
        setAppointmentDetail({
          ...appointmentDetail,
          visible:true,
          _id:_id
        })
      }
      useEffect(()=>{
          
      },[])
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <Popup visible={visiblePopup} onChange={onChangeVisible}/>
                {appointmentDetail.visible?(
                  <AppointmentDetail visible={appointmentDetail.visible} _id={appointmentDetail._id} onClose={()=>setAppointmentDetail({
                  ...appointmentDetail,
                  visible:false,
                  _id:''
                })}/>
                ):null}

                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize:25}}>Cuộc Hẹn</Text>
                    </View>
                    <TouchableWithoutFeedback   onPress={()=>onChangeVisible()} >
                        <FontAwesome5 name={'plus'}  style={styles.headerIcon} size={25}/>
                    </TouchableWithoutFeedback>
                </View>
                <Agenda
                // The list of items that have to be displayed in agenda. If you want to render item as empty date
                // the value of date key has to be an empty array []. If there exists no value for date key it is
                // considered that the date in question is not yet loaded
                items={items}
                loadItemsForMonth={loadItems}
                selected={new Date().toISOString().split('T')[0]}
                // renderKnob={() => {return (<View><Text>123213</Text></View>);}}
                showClosingKnob={true}
                renderItem={renderItem}
                renderEmptyData={renderEmptyDate}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height:130,
        justifyContent:'space-around'
      },
      emptyDate: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
      },
      emtyDateLabel:{
        fontStyle:'italic',
        fontSize:25, 
        fontFamily:'Times New Roman'
      },
    header:{
        height:40,
        width:'100%',
        backgroundColor:'white',
        alignItems:'center',
        flexDirection:'row',
        position:'relative',
        justifyContent:'center'
    },
    headerIcon:{
        position:'absolute',
        right:10,
        bottom:5,
        fontWeight:'100',
    }
})

export default Appointment;
