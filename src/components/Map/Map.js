import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView,{Marker, Callout} from "react-native-maps";
// import * as Location from 'expo-location';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useRoute, useNavigation} from '@react-navigation/native'
import axios from "axios";
import { API_URL } from "../../actions/types";
const Map = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  let interval;
  const [data,setData] = useState({
    longitude:'',
    latitude:'',
    name:'',
  })
  const getDevice = async()=>{
    try {
      const response = await axios.get(`${API_URL}/api/location/${route.params}`);
      if(response.data.device!=null){
        setData(response.data.device);
        var currentTime = new Date(response.data.device.modifiedDate).getTime();
        if(new Date().getTime() - currentTime > 10000){
          alert("Thiết bị đã bị tắt hoặc lỗi")
          clearInterval(interval);
          setData({
            longitude:'',
            latitude:'',
            name:'',
          })
        }
          
        
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
      interval=setInterval(()=>{
        getDevice();
    },1000);
    return ()=>{
        clearInterval(interval)
    }
  },[])
  return (
    <View style={styles.container}>
      <View>
        <Text>asdasdas</Text>
      </View>
      <MapView 
      style={styles.map} 
      region={{
        latitude:data.latitude,
        longitude:data.longitude,
        // latitudeDelta: 0.0522,
        // longitudeDelta: 0.0121,
      }}
      >
        <Callout style={styles.viewButton}>
          <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>{
            navigation.navigate('SettingDevice');
            clearInterval(interval)
          }}>
            <FontAwesome5 name={'arrow-left'} color="black"  size={35} />
          </TouchableOpacity>
        </Callout>
       {data.latitude?(
        <Marker
          coordinate={{
            latitude:data.latitude,
            longitude:data.longitude,
          }}
          title={data.name}
        >
        </Marker>
       ):null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  viewButton:{
    width:70,
    height:60,
    backgroundColor:'rgba(255,255,255,0.4)',
    borderRadius:10,
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    padding:10
  }
});

export default Map;











