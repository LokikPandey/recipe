import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ChevronLeftIcon,HeartIcon,ClockIcon,UsersIcon,FireIcon,Square2StackIcon,Square3Stack3DIcon} from 'react-native-heroicons/outline';
import { useNavigation } from 'expo-router';
import Loader from '@/Components/Loader'
import YoutubeIframe from 'react-native-youtube-iframe'
import { SlideInDown } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
const Details = ({route}) => {
    const navigation = useNavigation();
    // const {strMeal }= item.params;
    const [recipe,setRecipe] = useState([]);
    const [loading,setLoading] = useState(true);
    const [fav,setFav] = useState(false);
    useEffect(() => {
       const thisinde = route.params.idMeal
       fetchrecipe(thisinde); 
    //    console.log('the new recipe is',recipe.strMeal);
    },[route.params.idMeal]);

    const fetchrecipe = async (id) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
        setLoading(false);
    }
    const ingredients=(meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i=0;i<=20;i++)
        {
            if(meal[`strIngredient${i}`]) indexes.push(i);
        }
        return indexes;
    }
  return (
    
    <ScrollView>
    <StatusBar style={"light"}/>
    <View style={{alignItems:'center'}}>
        <Image src={recipe.strMealThumb} style={{width:'97%',height:hp(50),borderRadius:20}} />
    </View>    
        <View style={{backgroundColor:'white',borderRadius:9999,height:hp(7),width:hp(7),alignItems:'center',justifyContent:'center',position:'absolute',top:hp(3),left:hp(1.5)}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <ChevronLeftIcon size={30} color={"orange"} strokeWidth={3}/>
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'white',borderRadius:9999,height:hp(7),width:hp(7),alignItems:'center',justifyContent:'center',position:'absolute',top:hp(3),right:hp(1.5)}}>
            <TouchableOpacity onPress={()=>setFav(!fav)}>
                <HeartIcon size={30} color={fav ? 'red' : 'grey'} fill={fav?'red':'grey'}/>
            </TouchableOpacity>
        </View>
        {loading ? (
            <Loader size={"large"} color={"orange"}/>
        ):
        <Animated.View entering={SlideInDown.duration(500)} style={{display:'flex',flexDirection:'column',gap:hp(1)}}>
            <View>
                <Text style={{color:'black',marginTop:hp(3),fontSize:hp(4),textAlign:'center',fontWeight:'bold'}}>{recipe.strMeal}</Text>
                <Text style={{color:'grey',fontSize:hp(2),textAlign:'center'}}>{recipe.strArea}</Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',justifyContent:'center',gap:hp(2)}}>
                <View style={{display:'flex',flexDirection:'column',gap:hp(0.5),backgroundColor:'orange',borderRadius:55,padding:hp(1.5),alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',width:hp(7),height:hp(7),borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <ClockIcon size={35} color={"black"} />
                    </View>
                    <Text style={{fontSize:hp(3),color:'rgb(61, 61, 61)',fontWeight:'bold'}}>35</Text>
                    <Text style={{fontSize:hp(1.5),color:'grey'}}>Mins</Text>
                </View>
                <View style={{display:'flex',flexDirection:'column',gap:hp(0.5),backgroundColor:'orange',borderRadius:55,padding:hp(1.5),alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',width:hp(7),height:hp(7),borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <UsersIcon size={35} color={"black"} />
                    </View>
                    <Text style={{fontSize:hp(3),color:'rgb(61, 61, 61)',fontWeight:'bold'}}>03</Text>
                    <Text style={{fontSize:hp(1.5),color:'grey'}}>Servings</Text>
                </View>
                <View style={{display:'flex',flexDirection:'column',gap:hp(0.5),backgroundColor:'orange',borderRadius:55,padding:hp(1.5),alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',width:hp(7),height:hp(7),borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <FireIcon size={35} color={"black"} />
                    </View>
                    <Text style={{fontSize:hp(3),color:'rgb(61, 61, 61)',fontWeight:'bold'}}>103</Text>
                    <Text style={{fontSize:hp(1.5),color:'grey'}}>Cal</Text>
                </View>
                <View style={{display:'flex',flexDirection:'column',gap:hp(3),backgroundColor:'orange',borderRadius:55,padding:hp(1.5),alignItems:'center',justifyContent:'sapce-between'}}>
                    <View style={{backgroundColor:'white',width:hp(7),height:hp(7),borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Square3Stack3DIcon size={35} color={"black"} />
                    </View>
                    {/* <Text style={{fontSize:hp(3),color:'rgb(61, 61, 61)',fontWeight:'bold'}}>35</Text> */}
                    <Text style={{fontSize:hp(1.5),color:'grey',fontWeight:'bold'}}>Easy</Text>
                </View>
            </View>

            <View>
                <Text style={{color:'black',marginTop:hp(3),fontSize:hp(3.5),fontWeight:'bold',paddingLeft:hp(2),paddingBottom:hp(1)}}>Ingredients</Text>
                {ingredients(recipe).map((ing,index)=>
                    (<View key={index} style={{display:'flex',flexDirection:'row',gap:hp(1),paddingLeft:hp(3)}}><View style={{backgroundColor:'orange',width:hp(1),height:hp(1),borderRadius:9999,position:'relative',top:hp(1)}}></View><Text  style={{color:'grey',fontSize:hp(2),fontWeight:'bold'}}>{recipe[`strIngredient${ing}`]}</Text><Text> {recipe[`strMeasure${ing}`]}</Text></View>))}
            </View>
            <View>
                <Text style={{color:'black',marginTop:hp(3),fontSize:hp(3.5),fontWeight:'bold',paddingLeft:hp(2)}}>Instructions</Text>
                <Text style={{color:'grey',fontSize:hp(2),paddingLeft:hp(2)}}>{recipe.strInstructions}</Text>
            </View>
            <View>
                <View style={{width:'100%',display:'flex',justifyContent:'center',padding:hp(0)}}>
                    {recipe.strYoutube && (
                        <>
                        <Text style={{color:'black',fontSize:hp(3.5),fontWeight:'bold',paddingLeft:hp(1)}}> Recipe Video</Text>
                        <View style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:hp(2)}}>
                            <YoutubeIframe videoId={recipe.strYoutube.slice(-11)} height={hp(30)} width={hp(40)}/>
                        </View>
                        </>
                    )}
                </View>
            </View>
        </Animated.View>
        }
    </ScrollView>
    
  )
}

export default Details

const styles = StyleSheet.create({})