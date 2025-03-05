import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigator from '../navigation/Navigator';
const index = () => {
  return (
    <>
    <StatusBar backgroundColor='orange' barStyle='dark-content'/>
    <Navigator/>
    </>
  )
}

export default index