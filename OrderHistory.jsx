import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const OrderHistory = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const orderRef = ref(db, `orderHistory/${user.uid}`);

      onValue(orderRef, (snapshot) => {
        const data = snapshot.val();
        const orderList = [];

        if (data) {
          Object.entries(data).forEach(([key, value]) => {
            orderList.push({
              id: key,
              item: value.name,
              date: value.date,
              time: value.time,
              price: value.price,
              image: value.image ?? 'https://example.com/placeholder.png',
            });
          });
        }

        setOrders(orderList.reverse());
        setLoading(false);
      });
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.item}</Text>
        <Text style={styles.orderInfo}>
          {item.date} | {item.time}
        </Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="brown" />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderInfo: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5b3a29',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default OrderHistory;
