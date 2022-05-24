import React from 'react';
import {View, StyleSheet, ScrollView, Image,Text, BackHandler} from 'react-native';

const topSearchImage =[
    {src:'http://192.168.1.17:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.17:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.17:4444/images/doctor/613d8f9f4a92716788592160.png',notification:false},
    {src:'http://192.168.1.17:4444/images/doctor/613d8f9f4a92716788592160.png',notification:false},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:false},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},
    {src:'http://192.168.1.12:4444/images/doctor/613d8f9f4a92716788592160.png',notification:true},

]
const Topstatus = () => {
    return (
        <View style={styles.topSearch}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'#0084ff',marginBottom:10}}>Trạng Thái</Text>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
        
            >
                {topSearchImage.map((value,index)=>(
                    value.notification?(
                        <View 
                    key={index}
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginRight:10,
                    }}
                    >
                        <View>
                            <Image 
                            style={{borderRadius:50,width:70,height:70}}
                            source={{uri:value.src}}/>
                        </View>
                    </View>
                    ):null

                ))}
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    topSearch:{
        padding:20,
        fontFamily:'Rubik-Bold',
        color:'primary',
        backgroundColor:'white'
    }
})

export default Topstatus;
