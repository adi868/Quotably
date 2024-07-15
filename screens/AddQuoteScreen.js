import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, Keyboard, SafeAreaView } from 'react-native';

function AddQuoteScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddQuote = () => {
    navigation.navigate('Home', { newQuote: { quote, author } });
  };

  return (
    <Pressable style={styles.press} onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.outer}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.containerTop}>
              <Pressable title='Go back' style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/images/back.png')} style={styles.image} />
              </Pressable>
            </View>
            <View style={styles.containerBottom}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Add Quote</Text>
              </View>
              <View style={styles.fields}>
                <TextInput multiline maxLength={1000} style={[styles.input, styles.inputQuote]} placeholder='Type or paste your quote here...' value={quote} onChangeText={setQuote} />
                <TextInput style={[styles.input, styles.inputAuthor]} placeholder='Author (optional)' value={author} onChangeText={setAuthor} />
                <Pressable style={styles.save} onPress={handleAddQuote}>
                  <Text style={styles.saveText}>save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    flex: 1,
  },
  outer: {
    flex: 1,
    backgroundColor: '#FFFDEE',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 25,
    backgroundColor: '#FFFDEE',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  containerTop: {
    flex: 1,
  },
  containerBottom: {
    flex: 5,
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
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  inputQuote: {
    minHeight: 270,
    verticalAlign: 'top',
  },
  inputAuthor: {
  },
  heading: {
    fontFamily: 'Shippori-Semi-Bold',
    fontSize: 22,
    marginBottom: 15,
  },
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
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
  },
  saveText: {
    fontFamily: 'Shippori',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    paddingBottom: 13,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});

export default AddQuoteScreen;
