import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = ({ navigation }) => {
  const SettingItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon name={icon} size={24} color="#5b3a29" />
      <Text style={styles.itemText}>{label}</Text>
      <Icon name="chevron-right" size={24} color="#ccc" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <Icon name="cog-outline" size={24} color="#fff" />
      </View>

   
      <View style={styles.card}>
        <SettingItem icon="bell-outline" label="Notifications"onPress={() => navigation.navigate('NotificationSettings')}/>
        <SettingItem icon="palette-outline" label="Theme" onPress={() => navigation.navigate('ThemeScreen')} />
        <SettingItem icon="shield-lock-outline" label="Privacy & Security" onPress={() => navigation.navigate('PrivacySecurityScreen')} />
        <SettingItem icon="help-circle-outline" label="Help & Support" onPress={() => navigation.navigate('HelpSupport')} />
        <SettingItem icon="information-outline" label="About App" onPress={() =>navigation.navigate('AboutApp')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
  },
  header: {
    backgroundColor: '#5b3a29',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#444',
  },
});

export default Settings;
