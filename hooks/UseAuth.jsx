import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { auth } from '../config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UseAuth = () => {
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            console.log('current user is',user)
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
            }
        })
        return unsub;
    },[])
    
  return user;
}

export default UseAuth;