import React from 'react'
import { ActivityIndicator,View,Modal } from 'react-native'
const ActiveSpinner = (props) => {
    return (
        <Modal
        transparent={true}
        animationType="none"
        visible={props.visible}
        >
        <View
        style={{
            flex:1,
            backgroundColor:'rgba(0,0,0,0.4)',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
        </Modal>
    )
}

export default ActiveSpinner
