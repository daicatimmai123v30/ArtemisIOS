import React from 'react'
import {View,Picker,Modal} from 'react-native';

const Clock = (props) => {
    return (
        <Modal
        animationType="none"
        transparent={true}
        visible={props.visible}
        >
            <View
            style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width:'100%',
            height:'100%',
            }}
            >
            <View style={{
                bottom:0,
                height:200, 
                width:'100%',
                position:'absolute',
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                backgroundColor:'white'
            }}>
                <Picker
                selectedValue={props.value}
                style={{ 
                    height:200, 
                    width:'100%',
                    color:'black',
                    }}
                onValueChange={(value)=>props.onChange("clock",value)}
                >
                    <Picker.Item label="8:00 AM" value="8:00 AM" />
                    <Picker.Item label="8:30 AM" value="8:30 AM" />
                    <Picker.Item label="9:00 AM" value="9:00 AM" />
                    <Picker.Item label="9:30 AM" value="9:30 AM" />
                    <Picker.Item label="10:00 AM" value="10:00 AM" />
                    <Picker.Item label="10:30 AM" value="10:30 AM" />
                    <Picker.Item label="11:00 AM" value="11:00 AM" />
                    <Picker.Item label="11:30 AM" value="11:30 AM" />
                    <Picker.Item label="12:00 AM" value="12:00 AM" />
                    <Picker.Item label="12:30 AM" value="12:30 AM" />
                    <Picker.Item label="1:00 PM" value="1:00 PM" />
                    <Picker.Item label="1:30 PM" value="1:30 PM" />
                    <Picker.Item label="2:00 PM" value="2:00 PM" />
                    <Picker.Item label="2:30 PM" value="2:30 PM" />
                    <Picker.Item label="3:00 PM" value="3:00 PM" />
                    <Picker.Item label="3:30 PM" value="3:30 PM" />
                    <Picker.Item label="4:00 PM" value="4:00 PM" />
                    <Picker.Item label="4:30 PM" value="4:30 PM" />
                    <Picker.Item label="5:00 PM" value="5:00 PM" />
                    <Picker.Item label="5:30 PM" value="5:30 PM" />
                    <Picker.Item label="6:00 PM" value="6:00 PM" />
                    <Picker.Item label="6:30 PM" value="6:30 PM" />
                    <Picker.Item label="7:00 PM" value="7:00 PM" />
                    <Picker.Item label="7:30 PM" value="7:30 PM" />
                    <Picker.Item label="8:00 PM" value="8:00 PM" />
                    <Picker.Item label="8:30 PM" value="8:30 PM" />
                    <Picker.Item label="9:00 PM" value="9:00 PM" />
                    <Picker.Item label="9:30 PM" value="9:30 AM" />
                </Picker>
            </View>
            </View>
        </Modal>
    )
}

export default Clock
