import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrivacySecurityScreen = ({ navigation }) => {
  const handlePress = (title) => {
    Alert.alert(title, "Searched history is cleared.");
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 24 }} />
      </View>

     
      <View style={styles.content}>
        <Text style={styles.title}>Manage Data & Privacy</Text>

        <OptionItem
          icon="shield-lock-outline"
          text="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        
        <OptionItem
          icon="delete-outline"
          text="Clear Search History"
          onPress={() => handlePress("Clear Search History")}
        />
        <OptionItem
          icon="file-document-outline"
          text="Privacy Policy"
          onPress={() => navigation.navigate('PrivacyPolicy')}
          isLast
        />
      </View>
    </ScrollView>
  );
};

const OptionItem = ({ icon, text, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.optionItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
  >
    <Icon name={icon} size={22} color="#5b3a29" />
    <Text style={styles.optionText}>{text}</Text>
    <Icon name="chevron-right" size={22} color="#ccc" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
    padding:20
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
    color: '#5b3a29',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#444',
  },
});

export default PrivacySecurityScreen;
