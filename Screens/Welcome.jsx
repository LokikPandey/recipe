import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router'
const Welcome = () => {
  const navigation = useNavigation();
  const r1pad = useSharedValue(0);
  const r2pad = useSharedValue(0);
  useEffect(() => {
    r1pad.value = 0;
    r2pad.value = 0;
    setTimeout(() =>r1pad.value = withSpring(r1pad.value + hp(5)),100);
    setTimeout(() =>r2pad.value = withSpring(r2pad.value + hp(6)),200);
    setTimeout(() =>navigation.navigate('Login'),2500);
  },[])
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'orange'}}>
    <Animated.View style={{backgroundColor:'rgba(255, 255, 255, 0.2)',borderRadius:9999,padding:r2pad}}>
      <Animated.View style={{backgroundColor:'rgba(255, 255, 255, 0.5)',borderRadius:9999,padding:r1pad}}>
      <Image source={require('../assets/food_welcome.png')} style={{height:200,width:200,position:'relative',top:10,left:-10}}></Image>
      </Animated.View>
    </Animated.View>
    <View style={{display:'flex',flexDirection:'column',alignItems:'center',gap:hp(1),marginTop:hp(2)}}>
      <Text style={{color:'white',fontSize:hp(7),marginBottom:10}}>Foody</Text>
      <Text style={{color:'white',fontSize:hp(2),marginBottom:10}}>Food is always right</Text>
    </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({})