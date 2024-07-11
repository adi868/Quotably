import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image, FlatList } from "react-native";
import QuoteItem from "../components/QuoteItem";
import globalStyles from "../src/styles"; // Import global styles

function HomeScreen({ route, navigation }) {
  const userName = route.params?.userName ?? "";
  const [quotes, setQuotes] = useState([]);

  //listens for new quotes passed via navigation parameters and updates state accordingly
  useEffect(() => {
    if (route.params?.newQuote) {
      setQuotes((prevQuotes) => [...prevQuotes, route.params.newQuote]);
    }
  }, [route.params?.newQuote]);

  return (
    <View style={styles.container}>
      {/* conditional check if username added */}
      <Text style={styles.heading}>Hello{userName ? `, ${userName}` : ""}</Text>
      <Text>{route.params?.newQuote ? "" : `Add your first quote here`}</Text>
      {/* render quotes dynamically */}
      <FlatList data={quotes} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <QuoteItem quote={item.quote} author={item.author} />} />
      <View style={styles.buttonContainer}>
        <Pressable title='Remove quote' style={styles.button}>
          <Image source={require("../assets/remove.png")} style={styles.image} />
        </Pressable>
        <Pressable title='Add a quote' style={styles.button} onPress={() => navigation.navigate("AddQuote")}>
          <Image source={require("../assets/add.png")} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEF8",
  },
  heading: {
    fontSize: 30,
    paddingBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
