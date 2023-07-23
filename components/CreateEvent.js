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
import SetLocation from "./SetLocation";
import SelectBox from "react-native-multi-selectbox";
const CreateEvent = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState({});
  const [locationVisible, setLocationVisible] = useState(false);

  const insertData = () => {
    var typeOfEvent = selectedType.item;
    var latitude = pin.latitude;
    var longitude = pin.longitude;
    var sending =
      '{"latitude": ' + latitude + ', "longitude": ' + longitude + "}";
    fetch("http://172.20.10.5:6969/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        location: sending,
        type: typeOfEvent,
      }),
    }).then((resp) => resp.json());
  };
  const receiveLocation = (location) => {
    pin = location;
    console.log(pin);
    setLocationVisible(false);
  };

  function onChange() {
    return (val) => setSelectedType(val);
  }

  const K_OPTIONS = [
    {
      item: "Gaming",
      id: "GAMING",
    },
    {
      item: "Party",
      id: "PARTY",
    },
    {
      item: "Crypto",
      id: "CRYPTO",
    },
    {
      item: "Sports",
      id: "SPORTS",
    },
    {
      item: "Anime",
      id: "ANIME",
    },
  ];

  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.rightCorner}>
        <Button title="Back" onPress={props.changeVisible} color="red" />
      </View>
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          label="Title"
          value={title}
          placeholder="Title"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          label="Description"
          value={description}
          placeholder="Description"
          onChangeText={(text) => {
            setDescription(text);
          }}
        />

        <SelectBox
          label="Select single"
          options={K_OPTIONS}
          value={selectedType}
          onChange={onChange()}
          hideInputFilter={false}
        />

        <Button title="Set Location" onPress={() => setLocationVisible(true)} />
        <SetLocation
          visible={locationVisible}
          changevisible={() => setLocationVisible(false)}
          getLocation={receiveLocation}
        />
        <Button
          title="Submit Event"
          color="green"
          onPress={() => insertData()}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  rightCorner: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 50,
    marginRight: 35,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "center",
    marginBottom: 5,
  },
});
export default CreateEvent;
