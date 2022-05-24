import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View ,ImageBackground,Image,ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../actions/types';
import { Logs } from 'expo'
Logs.enableExpoCliLogging()
const Home = () => {
  const navigation = useNavigation();
  const [time,setTime]= useState('00:00:00');
  const[date,setDate]=useState('dd/mm/yyyy');
  const {user} = useSelector(state=>state.auth);
  const [appointments,setAppointments]=useState([]);
  const [pets,setPets]=useState([]);
  const onPressMessenger =()=>{
    navigation.navigate('User')
  }
  const loadTime=()=>{
    
    setInterval(()=>{
        const time = new Date().toTimeString().split(' ')[0];
        const date = new Date().toDateString();
        var month ='mm';
        var year =date.split(' ')[3];
        var day =date.split(' ')[2];
        switch(date.split(' ')[1]){
            case 'Jan': month=1;
            case 'Feb': month=2;
            case 'Mar': month=3;
            case 'Apr': month=4;
            case 'May': month=5;
            case 'June': month=6;
            case 'July': month=7;
            case 'Aug': month=8;
            case 'Sep': month=9;
            case 'Oct': month=10;
            case 'Nov': month=11;
            case 'Dec': month=12;
        }
        setDate(`${day}/${month}/${year}`)
        setTime(time)
    },1000);
  }
  const loadAppointment =async()=>{
    try {
        const response = await axios.get(`${API_URL}/api/Appointment`) ;
        if(response.data.success)
        {
            const newAppointment = response?.data?.appointments.map((value=>{
                var dayOfWeeks='';
                switch(new Date(value.startDate.split(' ')[0]).getDay()){
                    case 0:dayOfWeeks='Chủ nhật';break;
                    case 1:dayOfWeeks='Thứ hai';break;
                    case 2:dayOfWeeks='Thứ ba';break;
                    case 3:dayOfWeeks='Thứ tư';break;
                    case 4:dayOfWeeks='Thứ năm';break;
                    case 5:dayOfWeeks='Thứ sáu';break;
                    case 6:dayOfWeeks='Thứ bảy';break;
                    default:dayOfWeeks="";break;
                }
                return{
                    ...value,
                    dayOfWeeks,
                }
            }));
            for(var i=0;i<newAppointment.length-1;i++)
                for(var j=i+1;j<newAppointment.length;j++)
                    if(new Date(newAppointment[i].startDate)> new Date(newAppointment[j].startDate))
                    {
                        var temp = newAppointment[i];
                        newAppointment[i]=newAppointment[j];
                        newAppointment[j]=temp;

                    }
            setAppointments(newAppointment)
        }

    } catch (error) {
        console.log(error.toString())
    }
  }
  const loadPets =async()=>{
      
    try {
        
        const response = await axios.get(`${API_URL}/api/Pet/list-pet`);
        if(response.data.success)
            setPets(response.data.pets);
    } catch (error) {
        // alert(error.toString()) 
    }  
  }

  useEffect(() => {
    loadPets();
    loadAppointment();
    loadTime();
  },[])
  return (
    <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../public/image/background.jpg')}>
            <View style={[styles.container]}>
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
                    <View style={styles.viewInformation}>
                        <View style={styles.user}>
                            <Text style={{color:'#1E3A28',fontFamily:'Times New Roman',fontSize:30,fontWeight:'bold'}}>Xin Chào,</Text>
                            <Text style={{color:'#1E3A28',fontFamily:'Times New Roman',fontSize:25,textDecorationLine:'underline'}}>{user?.firstName}</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{color:'#1E3A28',fontFamily:'Times New Roman',fontSize:22,fontStyle:'italic'}}>{`Ngày ${date}`}</Text>
                            <Text style={{color:'#1E3A28',fontFamily:'Times New Roman',fontSize:22,fontStyle:'italic'}}>{time}</Text>
                        </View>
                    </View>
                    <ScrollView
                    style={{width:400,flex:1}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    >
                        <View style={styles.bodyBox}>
                            <View style={[styles.bodyBoxHeader,{backgroundColor:'#78A570'}]}>
                                <Text style={styles.headerBoxTitle}>Tin Tức</Text>
                            </View>
                            <View style={styles.boxNews}>
                                <Text style={styles.dataNews}>
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                </Text>
                                <Text style={styles.dataNews}>
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                </Text>
                                <Text style={styles.dataNews}>
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.bodyBox,{ marginTop:-25}]}>
                            <View style={[styles.bodyBoxHeader,{backgroundColor:'#E7C7C0'}]}>
                                <Text style={styles.headerBoxTitle}>Lịch Khám</Text>
                            </View>
                           {appointments.length>0?(
                            <ScrollView horizontal style={{flex:1,width:'95%'}} contentContainerStyle={{
                                alignItems:'center'
                            }}>
                                {appointments.map((appointment,index)=>(
                                    <View key={index} style={[styles.dataAppointment,{backgroundColor:appointment.status==="REQUESTING"?"#E7C7C0":appointment.status==="WAITING"||appointment.status==="FINISHED"?"#D3F0D3":"red"}]}>
                                        <View style={styles.appointmentHeader}>
                                            <Text style={styles.appointmentDayOfWeek}>{appointment.dayOfWeeks}</Text>
                                            <Text style={styles.appointmentDate}>{new Date(appointment.startDate).toLocaleString('default',{month:'short',day:'2-digit',year:'2-digit'})}</Text>
                                        </View>
                                        <View style={styles.appointmentBottom}>
                                            <Text style={styles.appointmentPet}>Thú cưng: {appointment?.idPet?.namePet}</Text>
                                            <Text style={styles.appointmentDoctor}>Bác sĩ: {appointment?.idDoctor?.lastName+" "+appointment?.idDoctor?.firstName}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                           ):(
                            <View style={{width:'100%',height:'100%',alignItems:'center',paddingTop:100}}>
                                <Text style={{fontFamily:'Times New Roman', fontSize:25,fontWeight:'bold',fontStyle:'italic'}}>Bạn chưa có cuộc hẹn</Text>
                            </View>
                           )}

                        </View>
                        <View style={[styles.bodyBox,{ marginTop:-25}]}>
                            <View style={[styles.bodyBoxHeader,{backgroundColor:'#78A570'}]}>
                                <Text style={styles.headerBoxTitle}>Thú Cưng</Text>
                            </View>
                            {pets.length>0?(
                                <ScrollView horizontal style={{flex:1,width:'95%'}}
                                    contentContainerStyle={{
                                    alignItems:'center'
                                }}>
                                    {pets.map((pet,index)=>(
                                        <View key={index} style={styles.dataPet}>
                                            <View style={{backgroundColor:'#78A570',width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontFamily:'Times New Roman', fontSize:21}}>
                                                    {pet.namePet}
                                                </Text>
                                            </View>
                                            <Image style={{width:'100%',flex:1}} source={{uri:pet.avatar}}/>
                                        </View>
                                    ))}
                                    
                                </ScrollView>
                            ):(
                                <View style={{width:'100%',height:'100%',alignItems:'center',paddingTop:100}}>
                                    <Text style={{fontFamily:'Times New Roman', fontSize:25,fontWeight:'bold',fontStyle:'italic'}}>Bạn chưa có thú cưng</Text>
                                </View>
                            )}
                        </View>
                        <View style={[styles.bodyBox,{ marginTop:-25}]}>
                            <View style={[styles.bodyBoxHeader,{backgroundColor:'#E7C7C0'}]}>
                                <Text style={styles.headerBoxTitle}>Tiện Ích</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
  );
};

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
    headerTitle:{
        flex:1,
        alignItems:'center'
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
    body:{
        flex:1,
        width:'100%',
        marginTop:20,
        flexDirection:'column',
        alignItems:'center',
    },
    bodyBox:{
        height:300,
        width:400,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:'center'
    },
    dataNews:{
        color:'#1E3A28',
        fontFamily:'Times New Roman',
        fontSize:20,
    },
    boxNews:{
        overflow:'hidden',
        flex:1,
        padding:10,
        overflow:'hidden'
    },
    dataAppointment:{
        width:150,
        height:150,
        backgroundColor:'#E7C7C0',
        borderRadius:15,
        marginHorizontal:10,
        borderWidth:1,
        borderColor:'#707070',
        flexDirection:'column',
        overflow:'hidden'
    },
    appointmentHeader:{
        flex:0.5,
        alignItems:'center',
    },
    appointmentBottom:{
        flex:0.5,
        paddingHorizontal:5
    },
    appointmentDayOfWeek:{
        fontFamily:'Times New Roman',
        fontSize:30
    },
    appointmentDate:{
        fontFamily:'Times New Roman',
        fontSize:21,
        fontStyle:'italic'
    },
    appointmentPet:{
        fontFamily:'Times New Roman',
        fontSize:18
    },
    appointmentDoctor:{
        fontFamily:'Times New Roman',
        fontSize:18
    },
    dataPet:{
        width:150,
        height:150,
        borderRadius:15,
        marginHorizontal:10,
        borderWidth:1,
        borderColor:'#707070',
        alignItems:'center',
        overflow:'hidden'
    },
    bodyBoxHeader:{
        width:'100%',
        height:60,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:'center',
        paddingHorizontal:15
    },
    headerBoxTitle:{
        fontFamily:'Times New Roman',
        fontSize:28,
        fontWeight:'bold',
        color:'#1E3A28'
    },
    profile:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        position:'relative'
    },
    pickerImage:{
        width:120,
        height:40,
        backgroundColor:'black',
        opacity:0.3,
        position:'absolute',
        bottom:42,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    item:{
        width:'90%',
        borderBottomWidth:1,
        borderBottomColor:'#dedfe2',
        alignItems:'center',
        paddingVertical:5,
        flexDirection:'row',
        marginBottom:10,
    },
    submitBtn:{
        height:60,
        width:150,
        backgroundColor:'#0084ff',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    viewInformation:{
        width:'100%',
        height:100,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    time:{
        alignItems:'flex-end'
    }

});
export default Home;