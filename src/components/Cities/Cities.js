import React ,{useState}from 'react';
import {View, StyleSheet,Modal,Text,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { TextInput,FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cities } from '../../Modal/Cities';
const City = (props) => {
    const [dataCities,setCities] = useState(Cities);
    const onChangeCity =(name,code)=>{
        props.onChangeCity(name,code)
        props.onHideShowModalCities();
    }
    return (
        <Modal animationType="fade" transparent={false} visible={props.visibleCities}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.modalContainer}>
                       <View style={styles.filterInputContainer}>
                            <TextInput
                                    autoFocus={false}
                        
                                    placeholder={'Tìm kiếm'}
                                    focusable={true}
                                    style={styles.filterInput}                            
                                />
                       </View>
                        <FlatList
                            style={{flex:1}}
                            data ={dataCities}
                            extraData={dataCities}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={
                                ({item})=>
                            (
                                <TouchableWithoutFeedback onPress={()=>onChangeCity(item.name,item.code)}>
                                    <View style ={styles.countryModal}>
                                        <View style={styles.modalItemContainer}>
                                            <Text style={styles.modalItemName}>{item.name}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                            }
                        />
                    </View>
                    <TouchableOpacity  style={styles.closeButton} onPress={()=>props.onHideShowModalCities()}>
                            <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                
            </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        paddingTop:15,
        paddingLeft:25,
        paddingRight:25,
        backgroundColor:'white',
        flex:1

     },
    filterInput:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        color:'#424242'
    },
    countryModal:{
        flex:1,
        borderColor:'black',
        borderTopWidth:1,
        padding:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalItemContainer:{
       flex:1,
       paddingLeft:5,
       flexDirection:'row',
       
    },
    modalItemName:{
        flex:1,
        fontSize:15
    },
    modalItemDialCode:{
       fontSize:15
    },
    filterInputContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    closeButton:{
       padding:12,
       alignItems:'center'
    },
    textClose:{
       padding:5,
       fontSize:20,
       color:'black',
       fontWeight:'bold'
    },
})

export default City;
