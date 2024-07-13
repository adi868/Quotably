import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useFonts, ShipporiMincho_400Regular, ShipporiMincho_700Bold} from '@expo-google-fonts/shippori-mincho';

const QuoteItem = ({ quote, author, onSelect, isSelected, isSelectionMode  }) => {
  const [fontsLoaded] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_700Bold
  });
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
    paddingBottom: 5,
    width: '100%',
  },
  selected: {
    backgroundColor: '#ddd',
  },
  selectionMode: {
    borderColor: 'blue', // Indicate selection mode
  },
  quoteText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'ShipporiMincho_400Regular',
    color: "#342817",

  },
  authorText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'ShipporiMincho_400Regular',
    color: "#000",
  },
});

export default QuoteItem;
