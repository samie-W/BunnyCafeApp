import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  Button,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const logo = require('../assets/images/spalshing.png');  // your logo path

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  


  const apiKey = 'AIzaSyCjNYOs3dlPA_8GTQu_s-vA8b4_ftIh-pQ';




const handleSignup = async () => {
  console.log('Signup started:', { name, email, password, confirmPassword });

  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    // Signup user with email & password
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await response.json();
    console.log('Signup response:', data);

    if (!response.ok) {
      alert(data.error.message || 'Failed to register');
      return;
    }

    // Update the user's displayName (name)
    const updateResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: data.idToken,
          displayName: name,
          returnSecureToken: true,
        }),
      }
    );
    const updateData = await updateResponse.json();
    console.log('Update profile response:', updateData);

    if (!updateResponse.ok) {
      alert('Failed to update profile: ' + (updateData.error.message || ''));
      return;
    }

    // ✅ Store user data in AsyncStorage
    await AsyncStorage.setItem('user_firstName', name);
    await AsyncStorage.setItem('user_email', email);

    setModalVisible(true);
  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong! ' + error.message);
  }
};




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.heading}>Create Account</Text>

        {/* Name input */}
        <View style={styles.inputBox}>
          <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email input */}
        <View style={styles.inputBox}>
          <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputBox}>
          <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password input */}
        <View style={styles.inputBox}>
          <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry={!confirmVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
            <FontAwesome
              name={confirmVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signinBtn} onPress={handleSignup}>
          <Text style={styles.signinText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Login</Text>
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ marginBottom: 20, fontSize: 18 }}>
                User Registered Successfully!
              </Text>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(false);
                  navigation.replace('Homepage');
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },

  form: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
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

  signinBtn: {
    backgroundColor: '#4B2E39',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },

  signinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  signInLink: {
    color: '#4B2E39',
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
});


