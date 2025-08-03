import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const splashImage = require("../assets/images/hotCup.jpg");

export default function SplashScreen() {
  return (
    <ImageBackground
      source={splashImage}
      style={styles.background}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.text}>Caffeine</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    zIndex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
