import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInRight ,FadeInLeft} from 'react-native-reanimated';
import Loader from './Loader.jsx';
import { useNavigation } from 'expo-router';
const Recipe = ({ category, recipe }) => {
  const [loading, setLoading] = useState(true);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);

    
    setTimeout(() => {
      setFilteredRecipe(recipe || []); 
      setLoading(false);
    }, 500); 
  }, [category, recipe]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: hp(3.5), paddingLeft: wp(3), color: 'orange' }}>Recipes</Text>
      <Animated.View style={{ flex: 1 }}>
        {loading || filteredRecipe.length === 0 ? (
          <Loader size="large" color="orange"/>
        ) : (
          <Animated.View entering={FadeInRight.duration(500).springify()}>
            <MasonryList
              data={filteredRecipe}
              keyExtractor={(item) => item.idMeal || Math.random().toString()} 
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }) => <Recipecard item={item} index={i} navigation={navigation}/>}
              onEndReachedThreshold={0.1}
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const Recipecard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <View>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 8 : 4,
          paddingRight: isEven ? 4 : 8,
          marginVertical: hp(2),
        }}
        onPress={() => navigation.navigate('Details',{...item})}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: hp(7) }}
        />
        <Text style={{ fontSize: hp(2), color: 'black', textAlign: 'center' }}>
          {item.strMeal.length > 15 ? item.strMeal.substring(0, 15) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({});
