import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from 'expo-router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { Ionicons } from '@expo/vector-icons'; // Import an icon library

const Login = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle state

  const handlesubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate.push('Home');
      } catch (e) {
        alert('Wrong credentials');
        console.log('Error found:', e.message);
      }
    } else {
      alert('Enter email and password');
    }
  };

  const handlereset = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent to your email');
      } catch (e) {
        alert('User not found');
        console.log('Error found:', e.message);
      }
    } else {
      alert('Enter your email address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/food_welcome.png')} style={styles.mainimage} />
      <View style={styles.formcontainer}>
        <Text style={styles.headerText}>
          Login |{' '}
          <TouchableOpacity onPress={() => navigate.push('Signup')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </Text>

        <TextInput
          style={styles.inputf}
          placeholder="Enter Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'} // Change icon dynamically
              size={24}
              color={isPasswordVisible ? 'grey' : 'white'}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submit} onPress={handlesubmit}>
          <Text style={styles.submitText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword} onPress={handlereset}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  formcontainer: {
    paddingTop: hp(4),
    position: 'absolute',
    bottom: hp(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: hp(4),
    marginTop: hp(2),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
  },
  mainimage: {
    height: hp(40),
    width: hp(40),
    position: 'absolute',
    top: hp(0),
  },
  inputf: {
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
    position:'relative',
    right:-20,
    flex: 1,
    textAlign: 'center',
    padding: hp(1),
  },
  eyeIcon: {
    marginLeft: 10,
  },
  submit: {
    backgroundColor: '#FF6B4A',
    width: '80%',
    height: hp(5),
    borderRadius: hp(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
  },
  forgotPassword: {
    position: 'relative',
    right: -100,
    top: -20,
  },
  headerText: {
    fontSize: hp(4),
    color: 'orange',
  },
  signupText: {
    fontSize: hp(4),
    position: 'relative',
    top: 9,
  },
});
