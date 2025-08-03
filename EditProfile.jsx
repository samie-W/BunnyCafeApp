import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [countryCode, setCountryCode] = useState('PK');
  const [callingCode, setCallingCode] = useState('+92');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Load readonly data
        const savedFirstName = await AsyncStorage.getItem('user_firstName');
        const savedEmail = await AsyncStorage.getItem('user_email');

        setFirstName(savedFirstName || '');
        setEmail(savedEmail || '');

        // Load full profile if exists
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const data = JSON.parse(savedProfile);
          setLastName(data.lastName || '');
          setDob(data.dob ? new Date(data.dob) : new Date());
          setCountryCode(data.countryCode || 'PK');
          setCallingCode(data.callingCode || '+92');
          setPhone(data.phone || '');
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        firstName,
        lastName,
        email,
        dob: dob.toISOString(),
        countryCode,
        callingCode,
        phone,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      const fullName = `${firstName} ${lastName}`.trim();
      await AsyncStorage.setItem('userName', fullName);
      await AsyncStorage.setItem('userEmail', email);

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Icon name="account-edit" size={22} color="#fff" />
      </View>

      <View style={styles.form}>
        {/* First Name (Read-only) */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, styles.readOnly]}
          value={firstName}
          editable={false}
        />


        {/* Email (Read-only) */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.readOnly]}
          value={email}
          editable={false}
          keyboardType="email-address"
        />

        {/* Date of Birth (Editable) */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{dob.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onDateChange}
          />
        )}

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <CountryPicker
            withFlag
            withCallingCode
            withFilter
            countryCode={countryCode}
            onSelect={onSelectCountry}
          />
          <Text style={styles.callingCode}>{callingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter number"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
  },
  header: {
    backgroundColor: '#5b3a29',
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  readOnly: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  callingCode: {
    fontSize: 16,
    marginLeft: 6,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: '#5b3a29',
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
