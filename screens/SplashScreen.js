import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";

function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        setTimeout(() => {
          if (userName) {
            navigation.navigate('Home', { userName });
            console.log('Directing to home screen');
          } else {
            navigation.navigate('Intro');
            console.log('Directing to intro screen');
          }
        }, 2000);
      } catch (error) {
        console.error('There was an error loading user', error);
        setTimeout(() => {
          navigation.navigate('Intro');
        }, 2000);
      }
    };

    checkUserName();
  }, [navigation]);

  return (
    <LinearGradient colors={['#fff', '#F4E27F']} style={styles.container}>
      <Text style = {styles.name}>Quotely</Text>
      <Text style = {styles.slogan}>inspire, reflect, repeat</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 62,
  },
  slogan: {
    fontSize: 18
  }
});

export default SplashScreen;
