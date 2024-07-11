import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ route, navigation }) {
const {userName} = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* conditional check if username added */}
      <Text>Hello{userName ? `, ${userName}`: ""}</Text>
      <Button
        title="Add Quote"
        onPress={() => navigation.navigate('AddQuote')}
      />
    </View>
  );
}

export default HomeScreen;