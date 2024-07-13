import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

Splash.preventAutoHideAsync();

function SplashScreen({ navigation }) {
  const circlePosition = useRef(new Animated.Value(0)).current;
  const circlePositionAlt = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'Lobster': require('../assets/fonts/LobsterTwo-Regular.ttf'),
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const checkUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        setTimeout(() => {
          if (userName) {
            // navigation.navigate('Home', { userName });
            navigation.navigate('Intro');
          } else {
            navigation.navigate('Intro');
          }
        }, 2100);
      } catch (error) {
        console.error('There was an error loading user', error);
        setTimeout(() => {
          navigation.navigate('Intro');
        }, 2100);
      }
    };

    checkUserName();
  }, [navigation]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(circlePosition, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(circlePositionAlt, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [circlePosition, circlePositionAlt]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#fff', '#F4E27F']} style={styles.container}>
      <Animated.View style={[styles.circle_alt, { transform: [{ translateX: circlePositionAlt }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ translateX: circlePosition }] }]} />
      <View style={styles.text}>
        <Text style={styles.name}>Quotely</Text>
        <Text style={styles.slogan}>inspire, reflect, repeat</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    marginBottom: 40,
  },
  name: {
    fontSize: 50,
    marginBottom: 20,
    fontFamily: 'Lobster',
  },
  slogan: {
    fontSize: 14,
    fontFamily: 'Shippori'
  },
  circle: {
    width: 650,
    height: 620,
    borderRadius: 1000,
    backgroundColor: '#f1fbf3',
    position: 'absolute',
    top: '-20%',
    left: '30%',
  },
  circle_alt: {
    width: 630,
    height: 720,
    borderRadius: 1000,
    backgroundColor: '#fffef1',
    position: 'absolute',
    top: '-15%',
    left: '-10%',
  },
});

export default SplashScreen;
