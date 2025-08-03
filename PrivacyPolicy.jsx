import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Your Privacy Matters</Text>
        <Text style={styles.paragraph}>
          We are committed to protecting your personal information and your right to privacy.
          If you have any questions or concerns about our policy or our practices with regard
          to your personal information, please contact us.
        </Text>

        <Text style={styles.subHeading}>What Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect personal information that you voluntarily provide to us when registering
          on the app, expressing an interest in obtaining information about us or our products
          and services, when participating in activities on the app, or otherwise contacting us.
        </Text>

        <Text style={styles.subHeading}>How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect or receive to facilitate account creation and logon
          process, post testimonials, request feedback, manage user accounts, and protect our
          services.
        </Text>

        <Text style={styles.subHeading}>Data Protection</Text>
        <Text style={styles.paragraph}>
          We implement appropriate technical and organizational security measures to protect
          the security of any personal information we process.
        </Text>

        <Text style={styles.subHeading}>Your Rights</Text>
        <Text style={styles.paragraph}>
          You may review, change, or terminate your account at any time. You can request to
          access, update, or delete your personal information.
        </Text>

        <Text style={styles.paragraph}>
          By using our app, you agree to this privacy policy. We reserve the right to make
          changes to this policy at any time.
        </Text>
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
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5b3a29',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5b3a29',
    marginTop: 20,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});

export default PrivacyPolicy;
