import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_firstName');
        const storedEmail = await AsyncStorage.getItem('user_email');

        if (storedName) setFirstName(storedName);
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchUserData);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            navigation.navigate('Wellcome');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Account</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{firstName || 'Guest User'}</Text>
        <Text style={styles.email}>{email || 'guest@example.com'}</Text>

        <View style={styles.pointsBox}>
          <Icon name="coffee" size={28} color="#fff" />
          <View>
            <Text style={styles.pointsLabel}>Make today amazing.</Text>
            <Text style={styles.qoutetext}>But first, coffee.</Text>
          </View>
        </View>
      </View>

      <View style={styles.menu}>
        <MenuItem
          icon="account-edit"
          text="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <MenuItem
          icon="history"
          text="Order History"
          onPress={() => navigation.navigate('OrderHistory')}
        />
        <MenuItem
          icon="heart-outline"
          text="Favorite Drinks"
          onPress={() => navigation.navigate('FavoriteDrinks')}
        />
        <MenuItem
          icon="cog-outline"
          text="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          icon="logout"
          text="Logout"
          isLast
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, text, isLast, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
  >
    <Icon name={icon} size={22} color="#5b3a29" />
    <Text style={styles.menuText}>{text}</Text>
    <Icon
      name="chevron-right"
      size={22}
      color="#ccc"
      style={{ marginLeft: 'auto' }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
  },
  header: {
    backgroundColor: '#5b3a29',
    height: 140,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -5,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
    marginTop: -70,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  pointsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c38852',
    padding: 14,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pointsLabel: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  qoutetext: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'center',
  },
  menu: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#444',
  },
});

export default UserProfile;
