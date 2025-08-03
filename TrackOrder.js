import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, onValue, update } from 'firebase/database'; // ✅ added update here
import { getAuth } from 'firebase/auth';

export default function TrackOrder() {
  const db = getDatabase();
  const user = getAuth().currentUser;
  const { orderId } = useRoute().params;

  const [orderData, setOrderData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    if (!user || !orderId) return;

    const orderRef = ref(db, `orders/${user.uid}/${orderId}`);

    onValue(orderRef, snapshot => {
      if (snapshot.exists()) {
        setOrderData(snapshot.val());
      } else {
        console.log('Order not found');
      }
    });
  }, []);

  if (!orderData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/GoogleMap.jpg')}
      style={styles.map}
      resizeMode="cover"
    >
      {/* Estimated Time */}
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>3–4 min</Text>
        <Text style={styles.subText}>Estimated Time</Text>
      </View>

      {/* Rider Info */}
      <View style={styles.riderBox}>
        <Image source={require('../assets/images/rider.jpg')} style={styles.avatar} />
        <View>
          <Text style={styles.riderName}>Nazeer arain</Text>
          <Text style={styles.riderId}>ID 2445556</Text>
        </View>
        <TouchableOpacity style={styles.iconBox}>
          <Image source={require('../assets/images/chatSearch.jpg')} style={styles.iconSmall} />
        </TouchableOpacity>
      </View>

      {/* Delivery Info */}
      <View style={styles.infoBox}>
        <View style={styles.locationItem}>
          <Image source={require('../assets/images/mapicon.jpg')} style={styles.icon} />
          <View style={styles.locationText}>
            {!isEditing ? (
              <>
                <Text style={styles.locLabel}>{orderData?.address}</Text>
                <Text style={styles.locAddress}>{orderData?.city}</Text>
              </>
            ) : (
              <>
                <TextInput
                  value={newAddress}
                  onChangeText={setNewAddress}
                  placeholder="Enter new address"
                  style={styles.input}
                />
                <TextInput
                  value={newCity}
                  onChangeText={setNewCity}
                  placeholder="Enter new city"
                  style={styles.input}
                />
              </>
            )}
          </View>

          {!isEditing ? (
            <TouchableOpacity
              onPress={() => {
                setNewAddress(orderData?.address || '');
                setNewCity(orderData?.city || '');
                setIsEditing(true);
              }}
            >
              <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                const orderRef = ref(db, `orders/${user.uid}/${orderId}`);
                update(orderRef, {
                  address: newAddress,
                  city: newCity,
                }).then(() => {
                  setIsEditing(false);
                }).catch(err => {
                  console.error("Update failed: ", err);
                });
              }}
            >
              <Text style={styles.change}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.locationItem}>
          <Image source={require('../assets/images/shopStore.png')} style={styles.icon} />
          <View style={styles.locationText}>
            <Text style={styles.locLabel}>Bunny cafe</Text>
            <Text style={styles.locAddress}>Sent at 08:23 AM</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  timeBox: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  riderBox: {
    position: 'absolute',
    top: 300,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  riderName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  riderId: {
    fontSize: 12,
    color: '#555',
  },
  iconBox: {
    marginLeft: 'auto',
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  infoBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
  },
  locationText: {
    flex: 1,
  },
  locLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  locAddress: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  change: {
    color: '#6D4C41',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    marginBottom: 8,
    fontSize: 13,
    color: '#333',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  dottedLine: {
    position: 'absolute',
    left: 32,
    top: 58,
    height: 60,
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#aaa',
  },
});
