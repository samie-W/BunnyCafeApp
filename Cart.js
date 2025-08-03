import React, { useEffect, useState } from 'react';
import Payment from './Payment';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const DELIVERY_CHARGES = 200;

export default function Cart({ navigation }) {
  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);


  const sizeMap = {
    Small: 'S',
    Medium: 'M',
    Large: 'L',
    S: 'S',
    M: 'M',
    L: 'L',
  };

  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const cartRef = ref(db, `userCarts/${user.uid}`);

    const unsubscribe = onValue(cartRef, snapshot => {
      const data = snapshot.val() || {};
      const loaded = Object.entries(data).map(([key, val]) => ({
        ...val,
        firebaseId: key,
        selected: false,
        size: sizeMap[val.size] || 'M',
        image: require('../assets/images/latte.jpg'), // fallback image
      }));
      setItems(loaded);
    });

    return () => unsubscribe();
  }, []);
  const selectedItems = items.filter(i => i.selected);
  const totalPrice =
    selectedItems.reduce((s, it) => s + it.price * it.quantity, 0) +
    (selectedItems.length ? DELIVERY_CHARGES : 0);

  const toggleSelection = id => {
    const updated = items.map(it =>
      it.firebaseId === id ? { ...it, selected: !it.selected } : it
    );
    setItems(updated);
    setIsAllSelected(updated.every(it => it.selected));
  };

  const handleToggleAll = () => {
    const v = !isAllSelected;
    setIsAllSelected(v);
    setItems(prev => prev.map(it => ({ ...it, selected: v })));
  };

  const deleteSelected = () => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;
    selectedItems.forEach(item => {
      remove(ref(db, `userCarts/${user.uid}/${item.firebaseId}`));
    });
  };

  const handleQuantityChange = (id, d) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    const updated = items.map(it => {
      if (it.firebaseId === id) {
        const newQty = Math.max(1, it.quantity + d);
        set(ref(db, `userCarts/${user.uid}/${id}/quantity`), newQty);
        return { ...it, quantity: newQty };
      }
      return it;
    });
    setItems(updated);
  };

  const handleSizeChange = (id, size) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;
    set(ref(db, `userCarts/${user.uid}/${id}/size`), size);
    setItems(prev => prev.map(it => (it.firebaseId === id ? { ...it, size } : it)));
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.itemCount}>{items.length} Item(s)</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search product"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {items.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>Your cart is empty.</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ flexGrow: 1 }}>
            {items.map(item => (
              <View
                key={item.firebaseId}
                style={[styles.card, item.selected && styles.cardSelected]}
              >
                <TouchableOpacity onPress={() => toggleSelection(item.firebaseId)} style={styles.radioCircle}>
                  {item.selected && <View style={styles.radioDot} />}
                </TouchableOpacity>

                <Image source={item.image} resizeMode="cover" style={styles.image} />

                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>Rs: {item.price}</Text>

                  <View style={styles.sizeRow}>
                    {['S', 'M', 'L'].map(size => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.sizeOption,
                          item.size === size && styles.sizeSelected,
                        ]}
                        onPress={() => handleSizeChange(item.firebaseId, size)}
                      >
                        <Text
                          style={[
                            styles.sizeText,
                            item.size === size && { color: '#FFF' },
                          ]}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.qtyControl}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.firebaseId, -1)}>
                    <Text style={styles.qtyBtn}>–</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.firebaseId, 1)}>
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.bottomRow}>
              <View style={styles.checkboxRow}>
                <TouchableOpacity style={styles.checkboxBox} onPress={handleToggleAll}>
                  {isAllSelected && <View style={styles.checkboxTick} />}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>All</Text>
              </View>

              {selectedItems.length > 0 && (
                <TouchableOpacity onPress={deleteSelected}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          {selectedItems.length > 0 && (
            <View style={styles.checkoutRow}>
              <View>
                <Text style={styles.totalPrice}>
                  Total: Rs {totalPrice - DELIVERY_CHARGES}
                </Text>
                <Text style={styles.deliveryCharges}>
                  Delivery: Rs {DELIVERY_CHARGES}
                </Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} onPress={() => setIsPaymentVisible(true)}>

                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>

              <Payment
  isVisible={isPaymentVisible}
  onClose={() => setIsPaymentVisible(false)}
  navigation={navigation}
  totalPrice={totalPrice} // already passed?
  selectedItems={selectedItems} // pass this correctly
/>


            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  itemCount: { fontSize: 14, color: '#555' },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },

  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: { borderColor: '#999' },

  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#555' },

  image: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 13, color: 'brown', marginTop: 4 },

  sizeRow: { flexDirection: 'row', marginTop: 6 },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  sizeSelected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  sizeText: { color: '#000', fontSize: 12 },

  qtyControl: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  qtyBtn: { fontSize: 18, color: '#000', marginHorizontal: 6 },
  qtyNum: { fontSize: 15, color: '#000' },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkboxTick: { width: 10, height: 10, backgroundColor: '#333' },
  checkboxText: { fontSize: 14, color: '#333' },

  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  deliveryCharges: { fontSize: 12, color: '#777' },
  checkoutBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  checkoutText: { color: '#FFF', fontSize: 15 },
});
