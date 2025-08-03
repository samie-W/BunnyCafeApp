import React, { useState } from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TermsAndConditions = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreement = () => {
    if (agreed) {
      Alert.alert('Thank you!', 'You have accepted the Terms & Conditions.');
      navigation.goBack();
    } else {
      Alert.alert('Agreement Required', 'Please accept the terms to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 24 }} />
      </View>

    
      <ScrollView style={styles.content}>
        <Text style={styles.textBlock}>
        Welcome to Caffien
        By using our mobile application, you agree to be bound by our terms and conditions, privacy policies, and any future updates we may publish. If you do not accept these terms, please refrain from using our services.
        The CoffeeBrew app allows users to explore our menu, place orders, customize drinks, collect loyalty points, and manage their profiles. We may update or remove features at any time without notice.
        When creating an account, you are responsible for keeping your login information secure and for all activities under your account. Please notify us immediately if you suspect any unauthorized access.
        All orders placed through the app must be paid in full using the available payment methods. Prices and item availability are subject to change at any time. We are not responsible for delays, technical errors, or service interruptions during the ordering process.
        Loyalty points and rewards are provided as a convenience and may be modified or discontinued at any time. Points have no monetary value and cannot be redeemed for cash.
        All text, logos, designs, and content in this app are the property of CoffeeBrew or its licensors. You may not copy, reuse, or distribute any content without permission.
        Users are expected to behave respectfully when using the app. Misuse of the platform or violation of these terms may result in suspension or termination of your account.
        We welcome feedback and suggestions to help us improve. Any ideas submitted through the app may be used by CoffeeBrew without compensation.
        Caffien is not liable for any indirect or unforeseen damages related to the use or inability to use our services.
        We reserve the right to update these terms as needed. Continued use of the app after changes implies acceptance of the new terms.
        For any support or questions regarding these terms, you can contact us through the Help & Support section within the app.
        </Text>
      </ScrollView>

      
      <View style={styles.agreeBox}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreed(!agreed)}
        >
          <Icon
            name={agreed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#5b3a29"
          />
          <Text style={styles.checkboxLabel}>I agree to the Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.agreeButton} onPress={handleAgreement}>
          <Text style={styles.agreeButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  textBlock: {
    fontSize: 15,
    color: '#333',
    marginBottom: 16,
    lineHeight: 22,
  },
  agreeBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fffaf5',
    padding: 20,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 15,
    marginLeft: 10,
    color: '#444',
  },
  agreeButton: {
    backgroundColor: '#5b3a29',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  agreeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TermsAndConditions;
