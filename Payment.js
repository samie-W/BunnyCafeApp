import React, { useState } from 'react';
import { useRouter } from "expo-router"; 
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';


export default function Payment({ isVisible, onClose, navigation, totalPrice, selectedItems }) {

  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState('Gujranwala, Kamoke');
  const [city, setCity] = useState('Paktown, Kamoke');

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateAddressInFirebase = () => {
  const db = getDatabase();
  const user = getAuth().currentUser;
  const userRef = ref(db, `users/${user.uid}/address`);

  update(userRef, {
    address,
    city
  });
};


 const handlePay = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  if (!user) return;

  const orderRef = ref(db, `orders/${user.uid}`);
  const newOrderRef = push(orderRef); // 👈 generate order node
  const orderId = newOrderRef.key;    // 👈 get order ID

  const orderData = {
    items: selectedItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size
    })),
    total: totalPrice,
    method: selectedMethod,
    address,
    city,
    timestamp: new Date().toISOString(),
  };

  // 👇 Save to Firebase
  set(newOrderRef, orderData)
    .then(() => {
      onClose(); // Close modal
      setTimeout(() => {
        navigation.navigate('ConfirmOrder', { orderId }); // Navigate to confirm
      }, 300);
    })
    .catch(err => {
      console.error('Failed to save order:', err);
    });
};




  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.handle} />
        </TouchableOpacity>

        <Text style={styles.heading}>Select Payment Method</Text>

        {/* Payment Options */}
        <TouchableOpacity
          style={[styles.option, selectedMethod === 'debit' && styles.selected]}
          onPress={() => handleSelect('debit')}
        >
          <Image
            source={require('../assets/images/visa.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text style={styles.title}>Debit card</Text>
            <Text style={styles.subtitle}>9876 **** **** 1221</Text>
          </View>
          <View style={styles.radioOuter}>
            {selectedMethod === 'debit' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selectedMethod === 'credit' && styles.selected]}
          onPress={() => handleSelect('credit')}
        >
          <Image
            source={require('../assets/images/mastercard.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text style={styles.title}>Credit card</Text>
            <Text style={styles.subtitle}>6291 **** **** 1785</Text>
          </View>
          <View style={styles.radioOuter}>
            {selectedMethod === 'credit' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selectedMethod === 'cod' && styles.selected]}
          onPress={() => handleSelect('cod')}
        >
          <Ionicons name="wallet" size={28} color="#A0522D" style={{ marginRight: 20 }} />
          <View style={styles.info}>
            <Text style={styles.title}>Cash on Delivery</Text>
            <Text style={styles.subtitle}>Cash/Online</Text>
          </View>
          <View style={styles.radioOuter}>
            {selectedMethod === 'cod' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Delivery Address */}
        <View style={styles.addressBox}>
          <Ionicons name="location" size={20} color="#333" />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.addressTitle}>Delivery address</Text>
              <TouchableOpacity onPress={toggleEdit}>
                <Ionicons name="create-outline" size={16} color="#555" />
              </TouchableOpacity>
            </View>
            {isEditing ? (
              <>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  style={styles.addressInput}
                />
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  style={styles.addressInput}
                />
              </>
            ) : (
              <>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.city}>{city}</Text>
              </>
            )}
          </View>
        </View>

        {/* Total Price and Button */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.total}>Total price</Text>
            <Text style={styles.totalPrice}>{totalPrice}</Text>

          </View>
         <TouchableOpacity
  style={styles.payBtn}
  onPress={handlePay}
>
  <Text style={styles.payText}>Pay</Text>
</TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#E6D0BB',
  },
  icon: {
    width: 40,
    height: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#777',
    fontSize: 12,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  addressTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  address: {
    color: '#555',
    fontSize: 13,
  },
  city: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  addressInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 13,
    paddingVertical: 4,
    marginBottom: 6,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  total: {
    fontSize: 13,
    color: '#777',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  payBtn: {
    backgroundColor: '#7B3F00',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  payText: {
    color: '#FFF',
    fontSize: 15,
  },
});
