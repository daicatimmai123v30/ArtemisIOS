import React from 'react';
import {View, StyleSheet,Modal,TouchableOpacity,Text} from 'react-native';
import { SafeAreaView } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
const Popup = (props) => {
    return (
        <Modal 
            transparent={true}
            animationType="none"
            visible={props.visibleRender}
            
            >
            <View
                style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
            >
                <View 
                style={{
                    backgroundColor:'white',
                    bottom:0,
                    width:'100%',
                    height:200,
                    position:'absolute',
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingVertical:10,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,

                    elevation: 11,

                }}>
                    <TouchableOpacity   onPress={()=>props.openCamera()}>
                        <View style={styles.modalBtn}>
                            <Text style={styles.textBtn}>Chụp ảnh</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity   onPress={()=>props.openPicker()}>
                            <View style={styles.modalBtn}>
                                <Text style={styles.textBtn}>Chọn ảnh</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity   onPress={()=>props.onHideShowRender()}>
                            <View style={styles.modalBtn}>
                                <Text style={styles.textBtn}>Hủy bỏ</Text>
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
})

export default Popup;
