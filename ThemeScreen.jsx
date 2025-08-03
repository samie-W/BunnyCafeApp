import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeScreen = ({ navigation }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const themes = [
    { key: 'light', name: 'Light Mode', icon: 'white-balance-sunny' },
    { key: 'dark', name: 'Dark Mode', icon: 'weather-night' },
  ];

  const handleThemeSelect = (key) => {
    setSelectedTheme(key);
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Theme</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Choose a Theme</Text>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.key}
            style={[
              styles.themeOption,
              selectedTheme === theme.key && styles.selectedTheme,
            ]}
            onPress={() => handleThemeSelect(theme.key)}
          >
            <Icon name={theme.icon} size={22} color="#5b3a29" />
            <Text style={styles.themeText}>{theme.name}</Text>
            {selectedTheme === theme.key && (
              <Icon name="check-circle" size={20} color="#5b3a29" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

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
    fontSize: 20,
    color: '#5b3a29',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedTheme: {
    borderWidth: 1.5,
    borderColor: '#5b3a29',
  },
  themeText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default ThemeScreen;
