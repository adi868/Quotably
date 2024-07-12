import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, TextInput } from 'react-native';
import { useFonts, ShipporiMincho_400Regular, ShipporiMincho_700Bold } from '@expo-google-fonts/shippori-mincho';

function IntroScreen({ navigation }) {
  const [name, setName] = useState('');

  const [fontsLoaded] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_700Bold,
  });

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>Store all your favorite quotes in one place</Text>
        <Image source={require('../assets/images/plant.png')} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Do you want to add your name?</Text>
        <TextInput style={styles.input} placeholder='your name' value={name} onChangeText={setName} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable title='Go to Home' style={styles.button} onPress={() => navigation.navigate('Home', { userName: name })}>
          <Image source={require('../assets/images/arrow_forward.png')} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 37,
    paddingBottom: 10,
    marginTop: 15,
    fontFamily: 'ShipporiMincho_400Regular',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 30,
    width: '100%',
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 30,
    fontFamily: 'ShipporiMincho_400Regular',
    textAlign: 'center',
  },
  introContainer: {
    alignItems: 'center',
    maxWidth: 320,
    marginBottom: 30,
  },
  nameContainer: {
    maxWidth: 350,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 350,
  },
  image: {
    width: 24,
    height: 24,
  },
  name: {
    fontFamily: 'ShipporiMincho_400Regular',
    paddingBottom: 25,
    fontSize: 18,
    paddingLeft: 10,
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    color: '#969696',
    height: 70,
    fontSize: 18,
    padding: 10,
    paddingLeft: 25,
    backgroundColor: '#fff',
    fontFamily: 'ShipporiMincho_400Regular',
    minWidth: 330,
    marginLeft: -12,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f2ed',
    padding: 30,
    borderRadius: 100,
    marginTop: 20,
  },
});

export default IntroScreen;
