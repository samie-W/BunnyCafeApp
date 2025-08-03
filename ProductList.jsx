 import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function List({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products.json'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productsArray = [];

        if (data && typeof data === 'object') {
          for (const key in data) {
            const product = data[key];
            if (product && product.category === category) {
              productsArray.push({
                id: key,
                name: product.name || 'Unnamed',
                price: product.price || '0',
                description: product.description || 'No description',
                category: product.category || '',
              });
            }
          }
        }

        setProducts(productsArray);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [category]);

  // Delete Function
  const deleteProduct = async (productId) => {
    try {
      await fetch(
        `https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products/${productId}.json`,
        { method: 'DELETE' }
      );
      setProducts((prev) => prev.filter((item) => item.id !== productId));
      Alert.alert('Deleted', 'Product has been deleted.');
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete product.');
    }
  };

  // Open Modal with Current Product Data
  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedDescription(product.description);
    setModalVisible(true);
  };

  // Submit Updated Data
  const handleUpdateSubmit = async () => {
    try {
      await fetch(
        `https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products/${currentProduct.id}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: editedName,
            price: editedPrice,
            description: editedDescription,
          }),
        }
      );

      setProducts((prev) =>
        prev.map((item) =>
          item.id === currentProduct.id
            ? {
                ...item,
                name: editedName,
                price: editedPrice,
                description: editedDescription,
              }
            : item
        )
      );

      setModalVisible(false);
      Alert.alert('Updated', 'Product updated successfully.');
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update product.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      
      <View style={styles.details}>
        <Text style={styles.name}>
          <Text style={{ fontWeight: 'bold' }}>Name: </Text>
          {item.name}
        </Text>
        <Text style={styles.price}>
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>
          Rs {item.price}
        </Text>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Description: </Text>
          {item.description}
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Update" color="lightpink" onPress={() => openUpdateModal(item)} />
          <View style={{ width: 10 }} />
          <Button title="Delete" color="lightpink" onPress={() => deleteProduct(item.id)} />
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>
          Failed to load products: {error.message}
        </Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.centered}>
        <Text>No products available in {category} category.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* 🔶 Update Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Product</Text>

            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={editedPrice}
              onChangeText={setEditedPrice}
              placeholder="Price"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={editedDescription}
              onChangeText={setEditedDescription}
              placeholder="Description"
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleUpdateSubmit} style={styles.updateBtn}>
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function ProductList() {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="Latte" children={() => <List category="Latte" />} />
      <BottomTab.Screen name="Mocha" children={() => <List category="Mocha" />} />
      <BottomTab.Screen name="Espresso" children={() => <List category="Espresso" />} />
      <BottomTab.Screen name="Cappuccino" children={() => <List category="Cappuccino" />} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'brown',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
