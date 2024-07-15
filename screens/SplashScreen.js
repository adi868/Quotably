import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

Splash.preventAutoHideAsync();

function SplashScreen({ navigation }) {
  const circlePosition = useRef(new Animated.Value(0)).current;
  const circlePositionAlt = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'Lobster': require('../assets/fonts/LobsterTwo-Regular.ttf'),
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
    'Shippori-Semi-Bold': require('../assets/fonts/ShipporiMincho-SemiBold.ttf'),
    'Shippori-Bold': require('../assets/fonts/ShipporiMincho-Bold.ttf'),
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
            navigation.navigate('Home', { userName });
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
        toValue: -50,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(circlePositionAlt, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [circlePosition, circlePositionAlt]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#fff', '#FDF8C9', '#F4E27F']} style={styles.container}>
      <Animated.View style={[styles.animateContainer, { transform: [{ translateX: circlePosition }] }]}>
        <LinearGradient colors={['#fff', '#fff', '#fff', '#FFFCDF']} style={styles.circle_alt} />
      </Animated.View>
      <Animated.View style={[styles.animateContainerAlt, { transform: [{ translateX: circlePositionAlt }] }]}>
        <LinearGradient colors={['#f1fbf3', '#f1fbf3']} style={styles.circle} />
      </Animated.View>
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
    fontSize: 56,
    marginBottom: 20,
    fontFamily: 'Lobster',
    color: '#262626',
    marginLeft: 8,
  },
  slogan: {
    fontSize: 17,
    fontFamily: 'Shippori',
    color: '#636363',
    marginLeft: 3,
    marginRight: -3,
  },
  circle: {
    width: 650,
    height: 620,
    borderRadius: 1000,
  },
  animateContainerAlt: {
    position: 'absolute',
    top: '-20%',
    left: '30%',
  },
  animateContainer: {
    position: 'absolute',
    top: '-15%',
    left: '-10%',
  },
  circle_alt: {
    width: 630,
    height: 720,
    borderRadius: 1000,
  },
});

export default SplashScreen;
