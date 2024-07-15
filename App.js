import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import IntroScreen from './screens/IntroScreen';
import HomeScreen from './screens/HomeScreen';
import AddQuote from './screens/AddQuoteScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

const fadeAnimation = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Intro' component={IntroScreen} options={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 800, 
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 800,
                },
              },
            },
        }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 300, 
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 300,
                },
              },
            },
        }}
        />
        <Stack.Screen name='AddQuote' component={AddQuote} options={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 400, 
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
            },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
