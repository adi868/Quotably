import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuoteItem = ({ quote, author }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>"{quote}"</Text>
      {author && <Text style={styles.authorText}>- {author}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
    fontFamily: 'ShipporiMincho-Regular',
  },
  authorText: {
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'ShipporiMincho-Regular', 
  },
});

export default QuoteItem;