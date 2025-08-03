import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const wellComeImages = require("../assets/images/long.jpg");

export default function Wellcome({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.box1}>
        <Image source={wellComeImages} style={styles.wellcomeimg} />
        <View style={styles.overlay} />

        <View style={styles.overlayContent}>
          <Text style={styles.heading}>WELCOME</Text>
          <Text style={styles.paragraph}>
            Start your day with a sip of happiness and a {"\n"}sprinkle of warmth.
          </Text>
        </View>
      </View>

      <View style={styles.skewFix} />

      <View style={styles.box2}>
        <View style={styles.contentWrapper}>
          {/* ✅ Sign In Button */}
          <TouchableOpacity
            style={styles.signinBox}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.signtext}>Sign in</Text>
          </TouchableOpacity>

          {/* ✅ Sign Up Button */}
          <TouchableOpacity
            style={styles.signupBox}
            onPress={() => navigation.navigate('Signin')}
          >
            <Text style={styles.signtext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  box1: {
    width: "100%",
    height: 500,
  },
  overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // adjust darkness here
},
    overlayContent: {
    position: 'absolute',
    top: '30%',
    width: '100%',
    alignItems: 'left',
    paddingHorizontal: 20,
    },

    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textTransform: 'uppercase',
        

    },

    paragraph: {
        fontSize: 14,
        color: 'white',
        textAlign: 'left',
        lineHeight: 20,
        
    },

  wellcomeimg: {
    width: "100%",
    height: "100%",
  },

  box2: {
    width: "100%",
    height: 400,
    backgroundColor: "#1C0A00",
    marginTop: -100,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },

  contentWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: -50,
  },

  signinBox: {
    backgroundColor: "white",
    width: "80%",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  signupBox: {
    backgroundColor: "#d7bda6",
    width: "80%",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  signtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black"

  }
});
