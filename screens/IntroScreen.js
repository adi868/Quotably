import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

function IntroScreen({ navigation }) {
  const [name, setName] = useState('');

  const [fontsLoaded] = useFonts({
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
    'Shippori-SemiBold': require('../assets/fonts/ShipporiMincho-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Welcome</Text>
          </View>
          <Text style={styles.subHeading}>Store all your favorite quotes in one place</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.imageCenter} source={require('../assets/images/plant.png')} />
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
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
  },
  outer: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  heading: {
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: 'Shippori',
    width: '100%',
    textAlign: 'left',
  },
  headingContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: '100%',
    marginBottom: 30,
    marginLeft: 5,
  },
  imageContainer: {},
  imageCenter: {
    opacity: 0,
    height: 200,
    width: 250,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Shippori',
    textAlign: 'center',
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  nameContainer: {},
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  image: {
    width: 24,
    height: 24,
  },
  name: {
    fontFamily: 'Shippori',
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
    fontFamily: 'Shippori',
    minWidth: 310,
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
