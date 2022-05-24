import React from 'react'
import { View,Text,StyleSheet,Modal,TouchableWithoutFeedback } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const MessageBox = (props) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            style={{width:'100%',height:'100%'}}
            visible={props.visible}
        >
            <View style={styles.containerMessageBox}>
                <View style={styles.messageBox}>
                    <FontAwesome5 style={{fontSize:80,color:props.isSuccess?'#519e8a':'red'}} name={props.isSuccess?"check-circle":"times-circle"} />
                    <Text style={{fontSize:19,fontFamily:'Times New Roman',textAlign:'center'}}>{props.text} </Text>
                    <TouchableWithoutFeedback onPress={()=>props.onPress()}>
                        <View style={{height:50,width:100,backgroundColor:'#D3F0D3',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                            <Text>Xác nhận</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    containerMessageBox:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.4)',
        alignItems:'center',
        justifyContent:'center'
    },
    messageBox:{
        width:250,
        height:200,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'space-around'
    }
})

export default MessageBox
