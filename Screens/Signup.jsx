import { auth, db } from '@/config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wpr } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const Signup = () => {
  const navigate = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSubmit = async () => {
    if (name && email && password) {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;

        // Store user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: name,
          email: email,
        });

        navigate.push('Home');
      } catch (e) {
        alert('User already exists or error occurred');
        console.log('Error:', e.message);
      }
    } else {
      alert('Enter all credentials');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/food_welcome.png')} style={styles.mainImage} />
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>
          <TouchableOpacity onPress={() => navigate.push('Login')}>
            <Text style={styles.linkText}>Log in</Text>
          </TouchableOpacity> | Sign up
        </Text>

        <TextInput style={styles.input} placeholder="Enter Name" placeholderTextColor="white" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Enter Email" placeholderTextColor="white" value={email} onChangeText={setEmail} />
        
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Enter Password" 
            placeholderTextColor="white" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={secureText} 
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color={secureText?"grey":"white"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  formContainer: {
    paddingVertical: hp(4),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    gap: hp(4),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
  },
  mainImage: {
    height: hp(40),
    width: hp(40),
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: hp(4),
    color: 'orange',
  },
  linkText: {
    fontSize: hp(4),
    position: 'relative',
    top: 9,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFD8A8',
    borderRadius: hp(5),
    textAlign: 'center',
    padding: hp(1),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#FFD8A8',
    borderRadius: hp(5),
    paddingHorizontal: hp(2),
  },
  passwordInput: {
    flex: 1,
    position:'relative',
    right:-20,
    textAlign: 'center',
    padding: hp(1),
    color: 'white',
  },
  submit: {
    backgroundColor: '#FF6B4A',
    width: '80%',
    height: hp(5),
    borderRadius: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
  },
});
