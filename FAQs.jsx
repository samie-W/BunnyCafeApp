import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FAQs = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password from the Settings page > Privacy & Security > "Change Password".',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can send us a message through Help & Support > Send Message.',
    },
    {
      question: 'Where can I view my order history?',
      answer: 'Go to Profile > Order History to view all past orders.',
    },
    {
      question: 'How to update my profile details?',
      answer: 'Go to your Profile and tap on "Edit Profile" to make changes.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {faqs.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.questionBox} onPress={() => toggleExpand(index)}>
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#5b3a29"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.answerText}>{faq.answer}</Text>
            )}
          </View>
        ))}
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
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  questionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  answerText: {
    backgroundColor: '#fff6ed',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    color: '#5b3a29',
  },
});

export default FAQs;
