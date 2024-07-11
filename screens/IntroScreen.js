import React, {useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';

function IntroScreen({navigation}) {
const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome</Text>
      <Text>Store all your favorite quotes in one place</Text>
      <Text>Do you want to add your name?</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }} placeholder="your name" value={name} onChangeText={text => setName(text)}/>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', {userName: name})}
      />
    </View>
  );
}

export default IntroScreen;