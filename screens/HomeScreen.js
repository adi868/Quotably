import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image, FlatList, SafeAreaView } from 'react-native';
import QuoteItem from '../components/QuoteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function HomeScreen({ route, navigation }) {
  const [quotes, setQuotes] = useState([]);
  const [userName, setUserName] = useState('');
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const [fontsLoaded] = useFonts({
    'Shippori-Bold': require('../assets/fonts/ShipporiMincho-SemiBold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const storedQuotes = await AsyncStorage.getItem('quotes');
        if (storedQuotes) {
          setQuotes(JSON.parse(storedQuotes));
        }
      } catch (error) {
        console.error('Failed to load quotes from storage', error);
      }
    };
    const loadUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.log('Failed to load username from storage', error);
      }
    };
    loadQuotes();
    loadUserName();
  }, []);

  useEffect(() => {
    if (route.params?.newQuote) {
      const updatedQuotes = [...quotes, route.params.newQuote];
      setQuotes(updatedQuotes);
      AsyncStorage.setItem('quotes', JSON.stringify(updatedQuotes))
        .then(() => {
          console.log('Quotes saved', updatedQuotes);
        })
        .catch((error) => {
          console.error('Failed to save quotes', error);
        });
    }
  }, [route.params?.newQuote]);

  useEffect(() => {
    if (route.params?.userName) {
      const newUserName = route.params.userName;
      setUserName(newUserName);
      AsyncStorage.setItem('userName', newUserName).catch((error) => {
        console.error('Failed to save username to storage', error);
      });
    }
  }, [route.params?.userName]);

  const handleRemoveUserName = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      setUserName('');
      navigation.navigate('Intro');
      console.log('Username successfully removed');
    } catch (error) {
      console.log('Failed to remove username from storage', error);
    }
  };

  const handleSelectQuote = (index) => {
    setSelectedQuotes((prevSelected) => (prevSelected.includes(index) ? prevSelected.filter((i) => i !== index) : [...prevSelected, index]));
  };

  const handleRemoveSelectedQuotes = async () => {
    const updatedQuotes = quotes.filter((_, index) => !selectedQuotes.includes(index));
    setQuotes(updatedQuotes);
    setSelectedQuotes([]);
    setIsSelectionMode(false);
    try {
      await AsyncStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    } catch (error) {
      console.error('Failed to save updated quotes to storage', error);
    }
  };

  const handleCancelSelection = () => {
    setSelectedQuotes([]);
    setIsSelectionMode(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.heading}>Hello{userName ? `, ${userName}` : ''}</Text>
        </View>
        <Text>{quotes.length === 0 ? `Add your first quote here` : ''}</Text>
        <FlatList showsVerticalScrollIndicator={false}
          data={quotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <QuoteItem quote={item.quote} author={item.author} onSelect={() => isSelectionMode && handleSelectQuote(index)} isSelected={selectedQuotes.includes(index)} isSelectionMode={isSelectionMode} />}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.removeContainer}>
            <Pressable onPress={isSelectionMode ? handleCancelSelection : () => setIsSelectionMode(true)}>
              <Image source={isSelectionMode ? require('../assets/images/cancel.png') : require('../assets/images/remove.png')} />
            </Pressable>
            {isSelectionMode && selectedQuotes.length > 0 && (
              <Pressable style={styles.check} onPress={handleRemoveSelectedQuotes}>
                <Image source={require('../assets/images/check.png')} />
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => navigation.navigate('AddQuote')}>
            <Image source={require('../assets/images/add.png')} style={styles.image} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFEF8',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 27,
    paddingBottom: 20,
    fontFamily: 'Shippori-Bold',
    textAlign: 'left',
    color: '#2F2F2F',
  },
  greetingContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingLeft: 15,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  removeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  check: {
    marginLeft: 28,
  },
  outer: {
    flex: 1,
    backgroundColor: '#FFFEF8',
  },
});

export default HomeScreen;
