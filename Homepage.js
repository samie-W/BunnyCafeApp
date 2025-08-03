import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const coverimg = require('../assets/images/beans1.jpg');

// function List({ category, searchQuery }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch('https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products.json');
//         if (!response.ok) throw new Error('Network error');

//         const data = await response.json();
//         const productsArray = [];

//         for (const key in data) {
//           const product = data[key];
//           if (product && product.category === category) {
//             productsArray.push({
//               id: key,
//               name: product.name || 'Unnamed',
//               price: product.price || '0',
//               description: product.description || 'No description',
//               category: product.category || '',
//             });
//           }
//         }

//         setProducts(productsArray);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, [category]);

//   const filtered = products.filter(p =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
//   if (error) return <Text>Error loading: {error.message}</Text>;
//   if (!filtered.length) return <Text style={{ marginTop: 20 }}>No products found.</Text>;

//   return (
//     <FlatList
//       data={filtered}
//       keyExtractor={item => item.id}
//       renderItem={({ item }) => (
//         <View style={{ padding: 10, marginBottom: 10, borderWidth: 1 }}>
//           <Text>Name: {item.name}</Text>
//           <Text>Price: Rs {item.price}</Text>
//           <Text>Description: {item.description}</Text>
//         </View>
//       )}
//     />
//   );
// }
function List({ category, searchQuery, onItemPress }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products.json');
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        const productsArray = [];

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

        setProducts(productsArray);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) return <Text>Error loading: {error.message}</Text>;
  if (!filtered.length) return <Text style={{ marginTop: 20 }}>No products found.</Text>;

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onItemPress && onItemPress(item)}
          style={{ padding: 10, marginBottom: 10, borderWidth: 1 }}
        >
          <Text>Name: {item.name}</Text>
          <Text>Price: Rs {item.price}</Text>
          <Text>Description: {item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}


export default function Homepage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <ImageBackground source={coverimg} style={{ width: '100%', height: 150, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', margin: 10, borderRadius: 20 }}>
          <TextInput
            style={{ flex: 1, paddingHorizontal: 10 }}
            placeholder="Search coffee..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="search" size={20} color="#888" style={{ padding: 10 }} />
        </View>
      </ImageBackground>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Select Category:</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {['Latte', 'Mocha', 'Cappuccino', 'Espresso'].map(cat => (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Text style={{ padding: 8, borderWidth: 1 }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Products in {selectedCategory}:</Text>
          {/* <List category={selectedCategory} searchQuery={searchQuery} /> */}
          <List
  category={selectedCategory}
  searchQuery={searchQuery}
  onItemPress={item => navigation.navigate('Details', { product: item })}
/>

          
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('NewProduct')}
        style={{ marginTop: 20, padding: 10, backgroundColor: '#ddd', alignSelf: 'center' }}
      >
        <Text>➕ Add New Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
