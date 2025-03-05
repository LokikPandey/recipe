import { StyleSheet, Text, View ,StatusBar, TextInput} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState,useEffect } from 'react'
import { auth,db } from '@/config/Firebase'
import { doc,getDoc} from 'firebase/firestore'
import { Image } from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BellIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Category from '../Components/Category.jsx';
import axios from 'axios';
import Recipe from '../Components/Recipe.jsx';
import { ScrollView } from 'react-native-gesture-handler'
const Home = () => {
  const [user,setUser]=useState(null);
  const [active,setActive]=useState(0);
  const [category,setCategory]=useState([]);
  const [recipe,setRecipe]=useState([]);
  const [search,setSearch]=useState('');
  
  useEffect(()=>{
      const fetchuserdata=async()=>{
        try{
          const user = auth.currentUser;
          if(user){
            const userdoc = await getDoc(doc(db,'users',user.uid));
            if(userdoc.exists()){
              setUser(userdoc.data().name);
            }
            else{
              alert('no user found');
              setUser(null);
            }
          }
        }catch(e){
          console.log(e.message);
          alert(e.message);
        }
      }
      fetchuserdata();
  },[])
  useEffect(()=>{
    fetchcategorydata();
  },[])

  const fetchcategorydata=async()=>{
    try{
      cat = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategory(cat.data.categories);
      // console.log(cat.data.categories);
    }catch(e){
      console.log(e.message);
    }
  }

  useEffect(()=>{
    fetchrecipes();
  },[category,active])
  const fetchrecipes = async () => {
    try {
      if (category.length === 0) return; // Prevents undefined error
  
      console.log('The active category is ', category[active]?.strCategory);
      
      const rec = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category[active]?.strCategory}`
      );
  
      setRecipe(rec.data.meals || []); // Ensure `recipe` is always an array
      console.log('Recipes fetched:', rec.data.meals);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(()=>{
    // console.log(search)
    fetchsearch();
  },[search])

  const fetchsearch = async () => {
    try {
      const rec = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
  
      setRecipe(rec.data.meals || []); // Ensure `recipe` is always an array
      console.log('Recipes fetched:', rec.data.meals);
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <ScrollView>
    <SafeAreaView style={{height:'100%',display:'flex',gap:hp(2)}}>
      <StatusBar backgroundColor={'white'} barStyle='dark-content'></StatusBar>
      
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:hp(2),marginTop:hp(3),paddingHorizontal:hp(2)}}>
        <Image source={require('../assets/pngegg(1).png')} style={{height:hp(7),width:wp(14),marginLeft:hp(0)}}></Image>
        <BellIcon size={hp(6)} color={'black'}></BellIcon>
      </View>
      <Text style={{fontSize:hp(2.5),marginLeft:hp(2),fontWeight:'400'}}>Hi, <Text style={{color:'orange'}}>{user==null?'Null':user}</Text></Text>
      <Text style={{fontSize:hp(4),marginLeft:hp(2)}}>Make your day with Foody, try these <Text style={{color:'orange'}}>recipes</Text></Text>
      <View style={{backgroundColor:'lightgrey',width:'85%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:hp(7),marginHorizontal:hp(4),borderRadius:hp(10)}}> 
        <TextInput placeholder='Search any recipe' placeholderTextColor={'white'} style={{fontSize:hp(2),paddingLeft:hp(2),width:'80%'}} value={search} onChangeText={setSearch}></TextInput>
        {/* <CrossIcon size={hp(4)} color={'white'} style={{marginRight:hp(2)}}></CrossIcon> */}
        <MagnifyingGlassIcon size={hp(4)} color={'white'} style={{marginRight:hp(2)} }></MagnifyingGlassIcon>
      </View>
      <View> 
        {category.length > 0 && <Category catarr={category} active={active} setActive={setActive} />}
      </View>
      <Recipe category={category} recipe={recipe}/>


    </SafeAreaView>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})