import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image, FlatList } from 'react-native';
import QuoteItem from '../components/QuoteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, ShipporiMincho_400Regular, ShipporiMincho_700Bold} from '@expo-google-fonts/shippori-mincho';


function HomeScreen({ route, navigation }) {
  const [quotes, setQuotes] = useState([]);
  const [userName, setUserName] = useState('');

  const [fontsLoaded] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_700Bold
  });

  useEffect(() => {
    // Load async storage data when component mount
    const loadQuotes = async () => {
      try {
        const storedQuotes = await AsyncStorage.getItem('quotes');
        if (storedQuotes) {
          setQuotes(JSON.parse(storedQuotes));
          console.log('Quotes loaded from storage:', JSON.parse(storedQuotes));
        }
      } catch (error) {
        console.error('Failed to load quotes from storage', error);
      }
    };
    const loadUserName = async() => {
      try{
        const storedUserName = await AsyncStorage.getItem('userName');
        if(storedUserName){
          setUserName(storedUserName)
          console.log('Username loaded:', storedUserName)
        }
      }
      catch(error){
        console.log('Failed to load username from storage', error);
      }
    }
    loadQuotes();
    loadUserName();
  }, []);

  // Listens for new quotes passed via navigation parameters and updates state accordingly, add to async storage
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

   // Store and load user data on homescreen page
  useEffect(() => {
    if (route.params?.userName) {
      const newUserName = route.params.userName;
      setUserName(newUserName);
      AsyncStorage.setItem('userName', newUserName)
        .catch((error) => {
          console.error('Failed to save username to storage', error);
        });
    }
  }, [route.params?.userName]);

  const handleRemoveUserName = async() => {
    try{
      await AsyncStorage.removeItem('userName');
      setUserName('');
      navigation.navigate('Intro')
      console.log('Username successfully removed')
    }
    catch(error){
      console.log('Failed to remove username from storage', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello{userName ? `, ${userName}` : ''}</Text>
      <Text>{quotes ? '' : `Add your first quote here`}</Text>
      <FlatList data={quotes} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <QuoteItem quote={item.quote} author={item.author} />} />
      <View style={styles.buttonContainer}>
        <Pressable title='Remove quote' style={styles.button}>
          <Image source={require('../assets/images/remove.png')} style={styles.image} />
        </Pressable>
        <Pressable title="Remove username" onPress={handleRemoveUserName}><Text>Remove user</Text></Pressable>
        <Pressable title='Add a quote' style={styles.button} onPress={() => navigation.navigate('AddQuote')}>
          <Image source={require('../assets/images/add.png')} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFEF8',
  },
  heading: {
    fontSize: 30,
    paddingBottom: 20,
    fontFamily: 'ShipporiMincho_700Bold'
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
