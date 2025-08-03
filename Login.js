import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

// Enable WebBrowser session
WebBrowser.maybeCompleteAuthSession();

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCjNYOs3dlPA_8GTQu_s-vA8b4_ftIh-pQ',
  authDomain: 'my-new-app-e91bc.firebaseapp.com',
  projectId: 'my-new-app-e91bc',
  storageBucket: 'my-new-app-e91bc.appspot.com',
  messagingSenderId: '128082241478',
  appId: '1:128082241478:web:xxx', // Replace with real appId
};

// Initialize Firebase once
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default function Login({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '128082241478-s1j2q9hinkqbmu4pjb2d5jjm3m3u3osl.apps.googleusercontent.com',
    webClientId: '128082241478-s1j2q9hinkqbmu4pjb2d5jjm3m3u3osl.apps.googleusercontent.com',
    androidClientId: '128082241478-hq3kq7dv2dguro2lj8sao58sb2i8i7v0.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Success', 'Google login successful');
          navigation.replace('MainApp');
        })
        .catch((error) => {
          Alert.alert('Google Sign-in Failed', error.message);
        });
    }
  }, [response]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        // Login successful
        Alert.alert('Success', 'User login successful');
        navigation.replace('MainApp');
      })
      .catch((error) => {
        console.log(error.code);
        let message = 'Login failed. Please try again.';

        if (error.code === 'auth/user-not-found') {
          message = 'No account found. Please register first.';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Invalid email format.';
        }

        Alert.alert('Error', message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/cip4-removebg-preview.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputBox}>
        <FontAwesome name="envelope" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputBox}>
        <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <FontAwesome
            name={passwordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.socialHeading}>Or login with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => promptAsync()}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="skype" size={24} color="#00AFF0" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logo: {
    width: '100%',
    height: 250,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginBtn: {
    backgroundColor: '#3d211a',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#777',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  socialHeading: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 14,
    color: '#555',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconBtn: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
  },
});
