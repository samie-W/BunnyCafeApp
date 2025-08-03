import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { FontAwesome } from '@expo/vector-icons';
import Payment from './Payment';

export default function TypeDetail({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [showPopup, setShowPopup] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const totalWithDelivery = product.price * quantity + 200;

  const mapSizeBack = (shortSize) => {
    if (shortSize === 'S') return 'Small';
    if (shortSize === 'M') return 'Medium';
    if (shortSize === 'L') return 'Large';
    return shortSize;
  };

  const handleAddToCart = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login Required', 'Please login first to add items to cart.');
      return;
    }

    const db = getDatabase();
    const cartRef = ref(db, `userCarts/${user.uid}`);

    const newCartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      size: mapSizeBack(selectedSize),
      quantity: quantity,
      image: product.image ?? 'https://example.com/placeholder.png',
    };

    push(cartRef, newCartItem)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        Alert.alert('Error', 'Something went wrong while adding to cart.');
      });
  };

  const handleBuyNow = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login Required', 'Please login first to place an order.');
      return;
    }

    const db = getDatabase();
    const orderRef = ref(db, `orderHistory/${user.uid}`);

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const newOrder = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      size: selectedSize,
      quantity: quantity,
      image: product.image ?? 'https://example.com/placeholder.png',
      date,
      time,
    };

    push(orderRef, newOrder)
      .then(() => {
        setShowPayment(true);
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        Alert.alert('Error', 'Failed to place order.');
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: product.image ?? 'https://example.com/placeholder.png' }}
          style={styles.image}
        />

        <Text style={styles.name}>
          <Text style={{ fontWeight: 'bold' }}>Name:</Text> {product.name}
        </Text>
        <Text style={styles.price}>
          <Text style={{ fontWeight: 'bold' }}>Price:</Text> {product.price}
        </Text>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Description:</Text> {product.description}
        </Text>

        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.sizeButtonSelected,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={
                  selectedSize === size ? styles.sizeTextSelected : styles.sizeText
                }
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>

      {showPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <FontAwesome name="shopping-cart" size={40} color="brown" />
            <Text style={styles.popupTitle}>Awesome</Text>
            <Text style={styles.popupMessage}>
              Your selection has been added to your cart
            </Text>
          </View>
        </View>
      )}

      <Payment
        isVisible={showPayment}
        onClose={() => setShowPayment(false)}
        navigation={{ navigate: (screen, params) => navigation.navigate(screen, params) }}
        totalPrice={totalWithDelivery}
        selectedItems={[
          {
            name: product.name,
            price: product.price,
            quantity: quantity,
            size: selectedSize,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  name: { fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  price: { fontSize: 20, color: 'black', marginBottom: 10 },
  description: { fontSize: 16, color: 'black', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'brown', marginBottom: 10 },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  sizeButtonSelected: { backgroundColor: 'brown' },
  sizeText: { fontSize: 16, color: 'black' },
  sizeTextSelected: { fontSize: 16, color: 'white' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qtyButton: {
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  qtyButtonText: { fontSize: 18, color: 'white' },
  quantityText: { fontSize: 18, fontWeight: 'bold' },
  addToCartButton: {
    backgroundColor: 'brown',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addToCartText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buyNowText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  popupBox: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  popupMessage: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
});
