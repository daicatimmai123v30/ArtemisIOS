
import React from 'react';
import {StyleSheet, Text, View,StatusBar } from 'react-native';
import Main from './main';
import { Provider } from 'react-redux';
import store from './src/store';
export default function App() {
  return (
    <Provider store={store}>
     <StatusBar hidden={true}/>
      <Main/>
    </Provider>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

