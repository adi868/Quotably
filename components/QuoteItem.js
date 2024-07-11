import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuoteItem = ({ quote, author }) => {
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
    padding: 10,
  },
  quoteText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    // fontFamily: 'ShipporiMincho-Regular',
  },
  authorText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    // fontFamily: 'ShipporiMincho-Regular',
  },
});

export default QuoteItem;
