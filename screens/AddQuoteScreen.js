import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

Splash.preventAutoHideAsync();

function AddQuoteScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const [fontsLoaded] = useFonts({
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
    'Shippori-Bold': require('../assets/fonts/ShipporiMincho-SemiBold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded]);

  const handleAddQuote = () => {
    navigation.navigate('Home', { newQuote: { quote, author } });
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable title='Go back' style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/images/back.png')} style={styles.image} />
        </Pressable>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Add Quote</Text>
        </View>
        <View style={styles.fields}>
          <TextInput multiline rows={4} style={[styles.input, styles.inputQuote]} placeholder='Type or paste your quote here...' value={quote} onChangeText={setQuote} />
          <TextInput style={[styles.input, styles.inputAuthor]} placeholder='Author (optional)' value={author} onChangeText={setAuthor} />
        </View>
        <Pressable style={styles.save} onPress={handleAddQuote}>
          <Text style={styles.saveText}>save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDEE',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    fontFamily: 'Shippori',
    backgroundColor: '#fff',
    color: '#595959',
    borderRadius: 20,
    borderColor: '#E6E6E6',
    fontSize: 16,
    paddingLeft: 25,
    paddingVertical: 25,
  },
  inputQuote: {
    minHeight: 270,
    verticalAlign: 'top',
  },
  inputAuthor: {
    color: '#969696',
  },
  fields: {},
  heading: {
    fontFamily: 'Shippori-Bold',
    fontSize: 22,
    marginBottom: 15,
  },
  buttonContainer: {},
  headingContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: '100%',
    marginBottom: 35,
  },
  save: {
    backgroundColor: '#2d6548',
    borderRadius: 20,
    marginTop: 25,
    width: 100,
    marginLeft: 'auto',
  },
  saveText: {
    fontFamily: 'Shippori',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});

export default AddQuoteScreen;
