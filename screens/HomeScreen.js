import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, FlatList
} from "react-native";
import QuoteItem from '../components/QuoteItem';
import globalStyles from '../src/styles'; // Import global styles

function HomeScreen({ route, navigation }) {
const userName = route.params?.userName ?? '';
  const [quotes, setQuotes] = useState([]);

  //listens for new quotes passed via navigation parameters and updates state accordingly
  useEffect(() => {
    if (route.params?.newQuote) {
      setQuotes((prevQuotes) => [...prevQuotes, route.params.newQuote]);
    }
  }, [route.params?.newQuote]);

  return (
    <View>
      {/* conditional check if username added */}
      <Text>Hello{userName ? `, ${userName}` : ""}</Text>
      <View>
        <Text>{route.params?.newQuote ? "": `Add your first quote here`}</Text>
        {/* render quotes dynamically */}
        <FlatList
        data={quotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <QuoteItem quote={item.quote} author={item.author} />}
      />
      </View>
      <Pressable
        title="Add a quote"
        style={styles.button}
        onPress={() => navigation.navigate("AddQuote")}
      >
        <Image source={require("../assets/add.png")} style={styles.image} />
      </Pressable>
      <Pressable title="Remove quote" style={styles.button}>
        <Image source={require("../assets/remove.png")} style={styles.image} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
