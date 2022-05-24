import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Modal,TouchableOpacity,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['Tháng 1 -','Tháng 2 -','Tháng 3 -','Tháng 4 -','Tháng 5 -','Tháng 6 -','Tháng 7 -','Tháng 8 -','Tháng 9 -','Tháng 10 -','Tháng 11 -','Tháng 12 -'],
    monthNamesShort: ['Tháng 1 -','Tháng 2 -','Tháng 3 -','Tháng 4 -','Tháng 5 -','Tháng 6 -','Tháng 7 -','Tháng 8 -','Tháng 9 -','Tháng 10 -','Tháng 11 -','Tháng 12 -'],
    dayNames: ['Hai','Ba','Tư','Năm','Sáu','Bảy','Chủ Nhật'],
    dayNamesShort: ['Hai','Ba','Tư','Năm','Sáu','Bảy','CN'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';
const Calendar = (props) => {
    return (
            <Modal visible={props.visibleCalendar} transparent={false}   animationType='slide'>
                <SafeAreaView style={{flex:1,justifyContent:'space-between'}}>
                    <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={999}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={999}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={false}
                    current={!props.dateOfBirth?new Date().toISOString().slice(0,-14):props.dateOfBirth}
                    minDate={new Date(new Date().setYear(1900)).toISOString().slice(0,-14)}
                    maxDate={new Date().toISOString().slice(0,-14)}
                    onDayPress={props.onChangeBirthday}
                    // hideArrows={true}
                    // hideDayNames={true}
                    markedDates={{
                        [props.dateOfBirth]:{selected:true,marked:true,selectedColor:'blue'}
                    }}
                    />
                    <TouchableOpacity  style={styles.closeButton} onPress={()=>props.onHideShowCalendar()}>
                                <Text style={styles.textClose}>{'ĐÓNG'}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
    );
}

const styles = StyleSheet.create({
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

export default Calendar;
