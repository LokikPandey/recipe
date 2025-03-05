import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Animated ,{ FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

const Category = ({catarr,active,setActive}) => {

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}  style={{marginTop:hp(2),height:hp(10)}}>
      <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ flexDirection: 'row', paddingHorizontal: wp(2),height:hp(10) }}>
        {catarr.map((cat, index) => (
            <TouchableOpacity key={index} onPress={() => setActive(index)} style={{height:hp(10)}}>
          <View key={index} style={{ alignItems: 'center', marginHorizontal: wp(2),height:hp(10) }}>
          <Image
  source={{ uri: cat.strCategoryThumb }}
  style={[
    {
      height: hp(7),
      width: wp(20),
      borderRadius: hp(25),
      backgroundColor: 'rgba(220, 219, 219, 0.5)', // Default background
    },
    active < catarr.length && catarr[active].strCategory === cat.strCategory && { backgroundColor: 'orange' }, // Conditional style
  ]}
/>
            <Text style={[{ marginTop: hp(1), fontSize: hp(1.5)}, active < catarr.length && catarr[active].strCategory === cat.strCategory && {color: 'orange' , textDecorationLine:'underline' }]}>{cat.strCategory}</Text>
          </View>
            </TouchableOpacity>
        ))}
      </Animated.View>
    </ScrollView>
  )
}

export default Category

const styles = StyleSheet.create({})
