import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

Splash.preventAutoHideAsync();
const QuoteItem = ({ quote, author, onSelect, isSelected, isSelectionMode  }) => {
  const [fontsLoaded] = useFonts({
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
    <Pressable onPress={onSelect} style={[
        styles.quoteContainer,
        isSelected && styles.selected,
        isSelectionMode && styles.selectionMode,
      ]}
      disabled={!isSelectionMode}>
      <Text style={styles.quoteText}>"{quote}"</Text>
      {author && <Text style={styles.authorText}>― {author}</Text>}
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#878383',
    width: '100%',
  },
  selected: {
    backgroundColor: 'pink',
  },
  selectionMode: {
    borderColor: 'black', 
  },
  quoteText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Shippori',
    color: "#342817",

  },
  authorText: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 17,
    fontFamily: 'Shippori',
    color: "#000",
  },
});

export default QuoteItem;
