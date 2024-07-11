import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput } from "react-native";
import globalStyles from '../src/styles'; // Import global styles

function IntroScreen({ navigation }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>Store all your favorite quotes in one place</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Do you want to add your name?</Text>
        <TextInput style={styles.input}
          placeholder="your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
       <TouchableOpacity title="Go to Home" style={styles.button} onPress={() => navigation.navigate("Home", { userName: name })}>
      <Image
        source={require('../assets/arrow_forward.png')}
        style={styles.image}
      />
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFEF7",
    alignItems: "center",
    justifyContent: 'center',
  },
  heading:{
    fontSize: 37,
    paddingBottom: 20,
  },
  subHeading:{
    fontSize: 18
  },
  introContainer: {
    flex: 1,
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
  },
  image: {
    width: 24,
    height: 24,
  },
  name: {
    // fontFamily: 'ShipporiMincho-Regular',
    paddingBottom: 20,
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    color: "#969696",
    height: 70,
    fontSize: 18,
    padding: 10,
    paddingLeft: 25,
    backgroundColor: '#fff'
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  }
});

export default IntroScreen;
