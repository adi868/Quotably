import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as Splash from 'expo-splash-screen';

Splash.preventAutoHideAsync();
const QuoteItem = ({ quote, author, onSelect, isSelected, isSelectionMode }) => {
  const [fontsLoaded] = useFonts({
    'Shippori': require('../assets/fonts/ShipporiMincho-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <Pressable onPress={onSelect} style={[styles.quoteContainer, isSelectionMode && styles.selectionMode]} disabled={!isSelectionMode}>
        <Text style={[styles.quoteText, isSelected && styles.selectedText]}>"{quote}"</Text>
        {author && <Text style={[styles.authorText, isSelected && styles.selectedAuthor]}>― {author}</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#878383',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: '#f4f3ee',
  },
  selectedText: {},
  selectedAuthor: {},
  quoteText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Shippori',
    color: '#342817',
  },
  authorText: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 17,
    fontFamily: 'Shippori',
    color: '#000',
  },
});

export default QuoteItem;
