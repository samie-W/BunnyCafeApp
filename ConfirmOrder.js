import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";



export default function ConfirmOrder() {
  const navigation = useNavigation();
  const { orderId } = useRoute().params;


  return (
    <ImageBackground
      source={require('../assets/images/confirmOrder.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Thank You!</Text>
        <Text style={styles.sub}>You have placed your order successfully.</Text>
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('TrackOrder', { orderId })}
>
  <Text style={styles.btnText}>Track Order</Text>
</TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20%',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sub: {
    fontSize: 15,
    color: '#f0f0f0',
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7B3F00',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
  },
});
