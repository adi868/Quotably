import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { useFonts, ShipporiMincho_400Regular, ShipporiMincho_700Bold} from '@expo-google-fonts/shippori-mincho';


function AddQuoteScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const [fontsLoaded] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_700Bold
  });

  const handleAddQuote = () => {
    navigation.navigate('Home', { newQuote: { quote, author } });
  };
  return (
    <View style={styles.container}>
      <Pressable title='Go back' style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/images/back.png')} style={styles.image} />
      </Pressable>
      <Text>Add Quote</Text>
      <TextInput style={styles.input} placeholder='Type or paste your quote here...' value={quote} onChangeText={setQuote} />
      <TextInput style={styles.input} placeholder='Author (optional)' value={author} onChangeText={setAuthor} />
      <Pressable onPress={handleAddQuote}>
        <Text>save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    fontFamily: 'ShipporiMincho_400Regular'
  },
});

export default AddQuoteScreen;
