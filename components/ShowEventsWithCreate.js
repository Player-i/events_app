import { View, Text, Button, Modal, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import CreateEvent from "./CreateEvent";
import ShowEvent from "./ShowEvent";

const ShowEventsWithCreate = (props) => {
  const [data, setData] = useState([]);
  const [showCreateEvents, setShowCreateEvents] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeEvent, setSeeEvent] = useState(false);

  const [info, setInfo] = useState({
    date: "2022-04-06T22:37:55.771748",
    description: "",
    id: 0,
    location: '{"latitude": 0.0, "longitude": 0.0}',
    title: "Example",
  });

  const loadData = () => {
    fetch("http://172.20.10.5:6969/get", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((article) => {
        setData(article);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Modal visible={props.visible} animationType="fade">
      <CreateEvent
        visible={showCreateEvents}
        changeVisible={() => setShowCreateEvents(false)}
      />
      <ShowEvent
        visible={seeEvent}
        data={info}
        changeVisible={() => setSeeEvent(false)}
      />

      <View style={styles.buttons}>
        <View style={styles.topRight}>
          <Button title="Back" color="red" onPress={props.changeVisibility} />
        </View>
        <View style={styles.topLeft}>
          <Button
            title="Create"
            color="blue"
            onPress={() => setShowCreateEvents(true)}
          />
        </View>
      </View>
      <View style={styles.events}>
        <FlatList
          onRefresh={() => loadData()}
          refreshing={loading}
          data={data}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.event}>
              <Button
                title={item.title}
                style={styles.eventInfo}
                onPress={() => {
                  setSeeEvent(true);
                  setInfo(item);
                }}
              />

              <Text style={styles.eventInfo}>{item.description}</Text>
              <Text style={styles.eventInfo}>{item.location}</Text>
            </View>
          )}
        />

        <Button title="Log Out" color="blue" onPress={props.logOut} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 50,
    flexDirection: "row-reverse",
    alignContent: "space-between",
  },
  topRight: {
    flex: 1,
    marginRight: -60,
  },

  topLeft: {
    flex: 1,
    marginLeft: -60,
  },

  events: {
    marginTop: 30,
    alignItems: "center",
  },
  event: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
  },
  eventInfo: {
    fontSize: 20,
  },
});

export default ShowEventsWithCreate;
