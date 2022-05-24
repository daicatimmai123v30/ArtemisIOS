import React,{useState,useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Modal
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import {API_URL} from '../../actions/types'
import axios from 'axios';
import Popup from "./Popup";
const SettingDevice = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [devices,setDevices] = useState([]);
    const [scanned, setScanned] = useState(false);
    const  navigation= useNavigation();
    const [data,setData] = useState({
      IMEI:'',
      name:'',
      visible:false
    })


    const handleBarCodeScanned = ({ type, data }) => {
        setData({
          ...data,
          IMEI:data.split(';')[2].split(':')[1],
          visible:true
        })
        setScanned(false);
    };

    const getDevice = async() =>{
      try {
        
        const response = await axios.get(`${API_URL}/api/location`);
        if(response.data.success){
          setDevices(response.data.devices)
        }else{
        }
      } catch (error) {
        alert(error.toString())
      }
    }
    const onChange = (value)=>{
      setData({...data,name:value})
    }

    const onAddDevice = async()=>{
      try {
        const response = await axios.post(`${API_URL}/api/location/create`,{
          IMEI:data.IMEI,
          name:data.name
        })
        if(response.data.success){
          setDevices([...devices,response.data.device]);
          alert(response.data.messages)
        }else{
          alert(response.data.messages)
        }
        setData({
          IMEI:'',
          name:'',
          visible:false,
        })
      } catch (error) {
        alert(error.toString())
      }
    }

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();

        getDevice();
      }, []);

  return (
    scanned ? (<View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned &&
        ( <TouchableWithoutFeedback  style={{ width: 40, height: 40,backgroundColor:'red' }} onPress={() => setScanned(false)} >
            <Text>Thoát</Text>
        </TouchableWithoutFeedback>)}
      </View>
    ) : (<ImageBackground
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
      source={require("../../public/image/background.jpg")}
    >
      <Popup visible ={data.visible} onChange ={onChange} onAddDevice={onAddDevice} ></Popup>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.Logo}
            source={require("../../public/icon/Logo2x.png")}
          />
          <View style={styles.viewSearch}>
            <TouchableWithoutFeedback>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../public/icon/Search.png")}
              />
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
          <TouchableWithoutFeedback onPress={() => onPressMessenger()}>
            <Image
              style={styles.Logo}
              source={require("../../public/icon/mess.png")}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.body}>
          <ScrollView
            style={{ width: 350, flex: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.bodyBox}>
              <View style={styles.bodyBoxHeader}>
                <Text style={styles.bodyBoxHeaderTitle}>Thiết bị</Text>
              </View>
              <View style={styles.bodyBoxItem}>
                {devices.map((device, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.navigate("GoogleMap", device._id)}
                  >
                    <View style={styles.dataItem}>
                      <View style={{ height: 100, marginLeft: 10 }}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={styles.dataItemLabel}
                        >
                          {device.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize:24,
                            marginTop:10,
                          }}
                        >
                          IMEI: {device.IMEI}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
                <TouchableWithoutFeedback onPress={()=>setScanned(true)} >
                  <View style={styles.dataItem}>
                    <FontAwesome5
                      name="plus-circle"
                      style={{ color: "gray", marginHorizontal: 15 }}
                      size={100}
                    />
                    <Text
                      ellipsizeMode="clip"
                      numberOfLines={1}
                      style={[styles.dataItemLabel, { fontSize: 25 }]}
                    >
                      Thêm thiết bị
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>)
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
    headerTitle:{
        fontSize:20
    },
    body:{
        flex:1,
        height:'100%',
        flexDirection:'column',
        alignItems:'center',
        marginTop:20,
    },
    bodyBox:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:15,
        minHeight:400
    },
    bodyBoxHeader:{
        width:'100%',
        height:60,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'#78A570',
        paddingHorizontal:20,
        justifyContent:'center'
    },
    bodyBoxHeaderTitle:{
        color:'#1E3A28',
        fontFamily:'Times New Roman',
        fontSize:30,
        fontWeight:'bold',
    },
    bodyBoxItem:{
        flex:1,
        width:'100%',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        alignItems:'center'
    },
    dataItem:{
        width:'90%',
        height:150,
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:2,
        flexDirection:'row',
        alignItems:'center',
    },
    dataItemLabel:{
        color:'#6D5D5D',
        fontWeight:'bold',
        fontFamily:'Times New Roman',
        fontSize:30,
        width:180
    
    },
    profilePet:{
        width:'90%',
        height:200,
        backgroundColor:'white',
        borderRadius:15,
        marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    item:{
        width:340,
        height:80,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginVertical:10,
        
    },
    iconAdd:{
        color:'#dedfe2',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#dedfe2',
        width:65,
        height:65,
        textAlign:'center',
        paddingVertical:15
    }
})
export default SettingDevice;
