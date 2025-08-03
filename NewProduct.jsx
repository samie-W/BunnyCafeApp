 import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
    Picker,
  } from 'react-native';
  
  export default function NewProduct({ navigation }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Latte'); // default
    // const [image, setImage] = useState('');

  
   
   
    async function submitHandler() {
        if (!name || !price || !description || !category) {
          Alert.alert('Validation Error', 'All fields are required!');
          return;
        }
      
        try {
          const response = await fetch(
            `https://my-new-app-e91bc-default-rtdb.firebaseio.com/Products.json`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                price,
                description,
                category,
                // image,
              }),
            }
          );
      
          if (response.ok) {
            Alert.alert('Success', 'Product created!');
            navigation.navigate('ProductList');
          } else {
            Alert.alert('Error', 'Failed to create product.');
          }
        } catch (error) {
          Alert.alert('Error', 'Something went wrong.');
        }
      }
      
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add Product</Text>
  
        <TextInput
          placeholder="Enter Product Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter Price"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
{/* 
            <TextInput
            placeholder="Enter Image URL"
            style={styles.input}
            value={image}
            onChangeText={setImage}
            /> */}


  
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Latte" value="Latte" />
            <Picker.Item label="Mocha" value="Mocha" />
            <Picker.Item label="Cappuccino" value="Cappuccino" />
            <Picker.Item label="Espresso" value="Espresso" />
          </Picker>
        </View>
  
        <View style={styles.buttonContainer}>
          <Button title="Create Product" onPress={submitHandler} color="#8b4513" />
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff8f2',
      flexGrow: 1,
      padding: 20,
      justifyContent: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 12,
      height: 40,
      backgroundColor: 'white',
    },
    pickerContainer: {
      marginBottom: 12,
    },
    pickerLabel: {
      marginBottom: 5,
      fontSize: 16,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    buttonContainer: {
      marginTop: 10,
    },
  });
  