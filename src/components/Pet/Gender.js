import React from 'react'
import { View,Text,Modal,Picker } from 'react-native'
const Gender = (props) => {
    return (
        <Modal
        transparent={true}
        visible={props.visible}
        animationType="none"
        >
            <View
            style={{
                flex:1,
                backgroundColor:'rgba(0,0,0,0.4)',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <Picker
                onValueChange={(value)=>props.onChange(value)}
                selectedValue={props.value}
                style={{ 
                    height:200, 
                    width:300,
                    color:'black',
                    backgroundColor:'white',
                    borderRadius:15
                    }}
                >
                    <Picker.Item label="Đực" value="Đực" />
                    <Picker.Item label="Cái" value="Cái" />
                </Picker>
            </View>
        </Modal>
    )
}

export default Gender
