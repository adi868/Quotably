import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, ShipporiMincho_400Regular, ShipporiMincho_700Bold} from '@expo-google-fonts/shippori-mincho';

const QuoteItem = ({ quote, author }) => {
  const [fontsLoaded] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_700Bold
  });
  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>"{quote}"</Text>
      {author && <Text style={styles.authorText}>― {author}</Text>}
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
