import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HelpSupport = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('SendMessage')}
        >
          <Icon name="email-outline" size={24} color="#5b3a29" />
          <Text style={styles.itemText}>Send Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('FAQs')}
        >
          <Icon name="help-circle-outline" size={24} color="#5b3a29" />
          <Text style={styles.itemText}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('TermsAndConditions')}
        >
          <Icon name="file-document-outline" size={24} color="#5b3a29" />
          <Text style={styles.itemText}>Terms & Conditions</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
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
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default HelpSupport;
