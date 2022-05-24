import React from 'react';
import {View, StyleSheet,Text,Modal,TouchableOpacity,SafeAreaView,FlatList,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Breeds} from '../../Modal/BreedPet'
const Breed = (props) => {
    const filteredBreed = Breeds.filter((Breed)=>(Breed.parent_code===props.code?true:false))
    return (
        <SafeAreaView style={{flex:1}}>
            <Modal 
            animationType="fade"
            visible={props.visibleBreed}
            transparent={false}
            >
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
                            showsVerticalScrollIndicator={false}

                            style={{width:'100%',paddingHorizontal:10}}
                            data ={filteredBreed}
                            extraData={filteredBreed}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={
                                ({item})=>
                            (
                                <TouchableOpacity onPress={()=>props.onChangeSpecies(item)} >
                                    <View style ={styles.item}>
                                        <Image style={{width:50,height:50,borderRadius:50}} source={{uri:item.image}}/>
                                       <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                            }
                        />
                    </View>
                    <TouchableOpacity  style={styles.closeButton} onPress={()=>props.onHideShowBreed()}>
                            <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                    </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        paddingVertical:10,
        flex:1,
     },
    filterInput:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        color:'#424242',
        paddingHorizontal:10
    },
    filterInputContainer:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
        height:70,
        width:'100%',
        marginVertical:10,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:10,
        backgroundColor:'white',
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius:5,
        elevation: 5,
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

export default Breed;
