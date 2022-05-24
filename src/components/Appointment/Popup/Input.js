import React,{useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, View,TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Input = (props) => {
    const [focus,setFocus]=useState(false);
    const onFocus =()=>{
        setFocus(true)
    }
    const onBlur=()=>{
        setFocus(false)
    }
    return (
        <TouchableWithoutFeedback  onPress={()=>props?.onClick(props.name)}>
            <View style={[styles.viewTextInput,{borderBottomColor:focus?'#ff0000':'gray'}]}>
                <View style={{flex:0.1}}>
                    <FontAwesome5 name={props.name} size={25}/>
                </View>
                <TextInput 
                style={styles.TextInput} 
                onFocus={()=>onFocus()} 
                onBlur={()=>onBlur()}  
                placeholder={props.placeholder}
                value={props.value}
                editable={false}
                onChangeText={()=>{}}
                />
            </View>
        </TouchableWithoutFeedback>
        
    )
}
const styles = StyleSheet.create({
    viewTextInput:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:3,
        width:300,
        backgroundColor:'white',

        paddingRight:10,
    },
    TextInput:{
        flex:0.9,
        height:50,
        fontSize:19,
        paddingHorizontal:10
    }
})
export default Input
