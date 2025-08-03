import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const ChangePassword = ({ navigation }) => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePassword = async () => {
    if (!current || !newPass || !confirmPass) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (newPass !== confirmPass) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user?.email) {
        const credential = EmailAuthProvider.credential(user.email, current);

        // Step 1: Re-authenticate
        await reauthenticateWithCredential(user, credential);

        // Step 2: Update password
        await updatePassword(user, newPass);

        Alert.alert('Success', 'Your password has been updated!');
        setCurrent('');
        setNewPass('');
        setConfirmPass('');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No user is currently logged in.');
      }
    } catch (error) {
      console.error('Password update error:', error);
      Alert.alert('Error', error.message || 'Failed to update password.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Secure your account</Text>

        <TextInput
          placeholder="Current Password"
          secureTextEntry
          style={styles.input}
          value={current}
          onChangeText={setCurrent}
        />
        <TextInput
          placeholder="New Password"
          secureTextEntry
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
        />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          style={styles.input}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefcf9',
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: '#5b3a29',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5b3a29',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  button: {
    backgroundColor: '#5b3a29',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChangePassword;
