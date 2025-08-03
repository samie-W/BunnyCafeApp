import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPassword = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const apiKey = "AIzaSyCjNYOs3dlPA_8GTQu_s-vA8b4_ftIh-pQ";

  const sendResetEmail = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Email Sent", "Please check your email for the reset code.");
        setStep(2);
      } else {
        Alert.alert("Error", data.error.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oobCode: oobCode }),
        }
      );

      const data = await response.json();
      if (response.ok && data.email) {
        Alert.alert("Code Verified", "Now enter a new password.");
        setStep(3);
      } else {
        Alert.alert("Error", data.error.message || "Invalid code.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const confirmResetPassword = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oobCode: oobCode,
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Your password has been reset.");
        navigation.navigate("Homepage"); // Changed to Homepage to match Login flow
      } else {
        Alert.alert("Error", data.error.message || "Password reset failed.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>

      {step === 1 && (
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter registered email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter Code from Email"
            value={oobCode}
            onChangeText={setOobCode}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>
      )}

      {step === 3 && (
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={
          step === 1
            ? sendResetEmail
            : step === 2
            ? verifyCode
            : confirmResetPassword
        }
      >
        <Text style={styles.loginText}>
          {step === 1
            ? "Send Reset Email"
            : step === 2
            ? "Verify Code"
            : "Reset Password"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.forgotText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#3d211a",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    height: 50,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  loginBtn: {
    backgroundColor: "#3d211a",
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  forgotText: {
    color: "#777",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
