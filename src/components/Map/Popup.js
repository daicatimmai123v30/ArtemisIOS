import React from 'react';
import {View, StyleSheet,Modal,TouchableOpacity,Text} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const Popup = (props) => {
    return (
        <Modal 
            transparent={true}
            animationType="none"
            visible={props.visible}
            
            >
            <View
                style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <View 
                style={{
                    backgroundColor:'white',
                    width:'90%',
                    height:200,
                    borderRadius:10,
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    alignItems:'center'
                    // paddingVertical:10,
                    // borderTopLeftRadius:15,
                    // borderTopRightRadius:15,
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 5,
                    // },
                    // shadowOpacity: 0.36,
                    // shadowRadius: 6.68,

                    // elevation: 11,

                }}> 
                    <View>
                            <Text style={{
                                color:'black',
                                fontSize:21
                            }}>Tên Thiết bị</Text>
                    </View>
                     <TextInput
                        style={styles.InputStyle}
                        placeholder="Tên thiết bị"
                        maxLength={10}
                        keyboardType="default"
                        // value={phoneNumber}
                        onChangeText={props.onChange}
                        secureTextEntry={false}
                    />
                    <TouchableOpacity onPress={props.onAddDevice}>
                        <View style={styles.modalBtn}>
                            <Text style={styles.textBtn}>Thêm thiết bị</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBtn:{
        padding:12,
        alignItems:'center',
        height:50,
        width:200,
        backgroundColor:'#0084ff',
        borderRadius:15,
        justifyContent:'center'
     },
     textBtn:{
        fontSize:20,
        color:'white',
     },
     InputStyle: {
        borderColor:'black',
        borderWidth:1,
        borderRadius:6,
        width:'80%',
        height:50,
        paddingHorizontal:10
     }
})

export default Popup;
