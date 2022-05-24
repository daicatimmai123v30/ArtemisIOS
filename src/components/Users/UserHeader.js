import React from 'react';
import {View, StyleSheet,Text,TouchableWithoutFeedback,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// const  {height} =Dimensions.get('window');
const Userheader = ({back}) => {
    const {navigate} = useNavigation();
    return (
        <View style={{
            flexDirection:'row',
            padding:10,
            height:60,
            backgroundColor:'#E7C7C0',
            alignItems:'center'
            
            }}> 
            <TouchableWithoutFeedback onPress = {()=>navigate('Tabnavigator')}>
                <FontAwesome5 name={'arrow-left'} style={styles.headerBack}  size={30}/>
            </TouchableWithoutFeedback>
            <View style={{flex:1,justifyContent:'center',paddingLeft:30,height:'100%'}} >
                <Text style={{fontSize:30,fontWeight:'bold',fontFamily:'Times New Roman',color:'#6D5D5D'}}>Tin Nhắn</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBack:{
        width:50,
        textAlign:'center',
    },
})

export default Userheader;
