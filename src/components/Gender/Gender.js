import React from 'react';
import {View, StyleSheet,Picker,Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Gender = (props) => {
    return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={props.visibleGender}
    >
        <SafeAreaView
        style={{
        backgroundColor:'white',
        bottom:0,
        width:'100%',
        height:170,
        position:'absolute',
        justifyContent:'space-between',
        alignItems:'center',
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
        }}

        >
        <Picker
        selectedValue={props.gender}
        style={{ 
            height:'100%', 
            width:'100%',
            color:'black',
            }}
        onValueChange={props.onChangeGender}
        >
            <Picker.Item label="Nữ" value="Nữ" />
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Giới tính thứ 3" value="Giới tính thứ 3" />
        </Picker>
        </SafeAreaView>
    </Modal>
    );
}

const styles = StyleSheet.create({})

export default Gender;
