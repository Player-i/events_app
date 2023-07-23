import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useState, useEffect } from "react";
import ShowEventsWithoutCreate from "./components/ShowEventsWithoutCreate";

export default function App() {
  const [visibilityOfEvents, setVisibility] = useState(false);

  function changeVisibility() {
    setVisibility(false);
  }

  return (
    <View style={styles.container}>
      <ShowEventsWithoutCreate
        visible={visibilityOfEvents}
        changeVisibility={changeVisibility}
      />
      <View>
        <Button
          style={{ fontSize: 20 }}
          title="Finder New App"
          color="#111"
          onPress={() => setVisibility(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
