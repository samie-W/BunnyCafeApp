import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationSettings = ({ navigation }) => {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Order Updates</Text>
        <Switch
          value={orderUpdates}
          onValueChange={setOrderUpdates}
          thumbColor={orderUpdates ? '#5b3a29' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#d6b397' }}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Promotional Offers</Text>
        <Switch
          value={promoOffers}
          onValueChange={setPromoOffers}
          thumbColor={promoOffers ? '#5b3a29' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#d6b397' }}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>App Updates</Text>
        <Switch
          value={appUpdates}
          onValueChange={setAppUpdates}
          thumbColor={appUpdates ? '#5b3a29' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#d6b397' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationSettings;
