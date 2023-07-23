import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const SetLocation = (props) => {
  const [pin, setPin] = useState({ latitude: 37, longitude: -122 });
  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={{ marginTop: 50, flex: 1 }}>
        <GooglePlacesAutocomplete
          styles={styles.searchBar}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyBFD1QP1MDNS89mJ_oKTD19RN0qCYJtQj8",
            language: "en",
          }}
        />
        <MapView style={styles.map} provider="google">
          <Marker
            coordinate={pin}
            draggable={true}
            onDragStart={(e) => {
              console.log("Drag Start", e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            <Callout>
              <Text>The Event will be here</Text>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.buttons}>
          <Button title="Back" color="red" onPress={props.changevisible} />
          <Button
            title="Save Location"
            color="blue"
            onPress={() => props.getLocation(pin)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  map: {
    width: 600,
    height: 600,
  },
  searchBar: {
    position: "absolute",
    zIndex: 1,
    flex: 0,
    width: "100%",
  },
  buttons: {
    marginBottom: 30,
  },
});

export default SetLocation;
