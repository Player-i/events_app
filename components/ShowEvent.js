import { View, Text, Modal, StyleSheet, Button } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
const ShowEvent = (props) => {
  const latitude = JSON.parse(props.data.location).latitude;
  const longitude = JSON.parse(props.data.location).longitude;
  const eventLocation = { latitude: latitude, longitude: longitude };

  return (
    <Modal visible={props.visible}>
      <View style={styles.eventInfo}>
        <Text>{props.data.title}</Text>
        <MapView style={styles.map} provider="google">
          <Marker coordinate={eventLocation}></Marker>
        </MapView>
        <Button title="Back" color="red" onPress={props.changeVisible} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  eventInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: 400,
    height: 400,
  },
});

export default ShowEvent;
