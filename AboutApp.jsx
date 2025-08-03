import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutApp = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About App</Text>
        <View style={{ width: 24 }} /> 
      </View>
      <View style={styles.content}>
        <Text style={styles.appName}>Caffien</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <Text style={styles.description}>
          Welcome to Caffien, your personalized coffee companion app! From ordering your favorite drinks to tracking your ride and keeping your coffee history at your fingertips, CoffeeMate brings a premium and smooth experience to your daily coffee routine.
        </Text>

        <Text style={styles.sectionTitle}>Features:</Text>
        <View style={styles.listItem}>
          <Icon name="check-circle-outline" size={20} color="#5b3a29" />
          <Text style={styles.listText}>Give you flavourful coffee</Text>
        </View>
        <View style={styles.listItem}>
          <Icon name="check-circle-outline" size={20} color="#5b3a29" />
          <Text style={styles.listText}>Track Favorite Drinks and Orders</Text>
        </View>
        <View style={styles.listItem}>
          <Icon name="check-circle-outline" size={20} color="#5b3a29" />
          <Text style={styles.listText}>User-Friendly Profile Management</Text>
        </View>

        <Text style={styles.sectionTitle}>Developed by:</Text>
        <Text style={styles.footerText}>Caffine Team</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcf9',
    padding: 20
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
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5b3a29',
    textAlign: 'center',
    marginBottom: 6,
  },
  version: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5b3a29',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AboutApp;
