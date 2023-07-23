import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CreateEvent from "./CreateEvent";
import ShowEvent from "./ShowEvent";
import Register from "./Register";
import * as Location from "expo-location";
const ShowEvents = (props) => {
  const [allEvents, setAllEvents] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeEvent, setSeeEvent] = useState(false);
  const [register, setRegister] = useState(false);
  const [animeData, setAnimeData] = useState([]);
  const [gamingData, setGamingData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [info, setInfo] = useState({
    date: "2022-04-06T22:37:55.771748",
    description: "",
    id: 0,
    location: '{"latitude": 0.0, "longitude": 0.0}',
    title: "Example",
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitud] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserLatitude(location.coords.latitude);
      setUserLongitud(location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const loadData = () => {
    fetch("http://172.20.10.5:6969/get", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((article) => {
        article = article.sort(function (a, b) {
          aLatitudBefore = JSON.parse(a.location).latitude;
          aLongitudBefore = JSON.parse(a.location).longitude;
          bLatitudBefore = JSON.parse(b.location).latitude;
          bLongitudBefore = JSON.parse(b.location).longitude;
          if (aLatitudBefore < 0) {
            aLatitudBefore = aLatitudBefore * -1;
          }
          if (bLatitudBefore < 0) {
            bLatitudBefore = bLatitudBefore * -1;
          }
          if (aLongitudBefore < 0) {
            aLongitudBefore = aLongitudBefore * -1;
          }
          if (bLongitudBefore < 0) {
            bLongitudBefore = bLongitudBefore * -1;
          }
          usLatitude = userLatitude;
          usLongitude = userLongitude;
          console.log(usLongitude);
          if (usLatitude < 0) {
            usLatitude = usLatitude * -1;
          }
          if (usLongitude < 0) {
            usLongitude = usLongitude * -1;
          }
          aLatitude = aLatitudBefore - usLatitude;
          aLongitud = aLongitudBefore - usLongitude;
          bLatitude = bLatitudBefore - usLatitude;
          bLongitud = bLongitudBefore - usLongitude;
          aLongitudPerTwo = aLongitud * aLongitud;
          aLatitudPerTwo = aLatitude * aLatitude;
          bLongitudPerTwo = bLongitud * bLongitud;
          bLatitudPerTwo = bLatitude * bLatitude;
          aDistance = Math.sqrt(aLongitudPerTwo + aLatitudPerTwo);
          bDistance = Math.sqrt(bLongitudPerTwo + bLatitudPerTwo);
          return aDistance - bDistance;
        });

        setData(article);
        setAllEvents(article);
        setLoading(false);
        setAnimeData(
          article.filter((array) => {
            if (array.type == "Anime") {
              return array;
            }
          })
        );
        setCryptoData(
          article.filter((array) => {
            if (array.type == "Crypto") {
              return array;
            }
          })
        );
        setGamingData(
          article.filter((array) => {
            if (array.type == "Gaming") {
              return array;
            }
          })
        );
        setSportsData(
          article.filter((array) => {
            if (array.type == "Sports") {
              return array;
            }
          })
        );
        setPartyData(
          article.filter((array) => {
            if (array.type == "Party") {
              return array;
            }
          })
        );
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Modal visible={props.visible} animationType="fade">
      <ShowEvent
        visible={seeEvent}
        data={info}
        changeVisible={() => setSeeEvent(false)}
      />
      <Register visible={register} changeVisible={() => setRegister(false)} />

      <View style={styles.buttons}>
        <View style={styles.topRight}>
          <Button title="Back" color="red" onPress={props.changeVisibility} />
        </View>
        <View style={styles.topLeft}></View>
      </View>
      <Button title="Home" onPress={() => setData(allEvents)} />

      <View style={styles.events}>
        <ScrollView horizontal={true}>
          <Button title="Anime" onPress={() => setData(animeData)} />
          <Button title="Gaming" onPress={() => setData(gamingData)} />
          <Button title="Sports" onPress={() => setData(sportsData)} />
          <Button title="Crypto" onPress={() => setData(cryptoData)} />
          <Button title="Party" onPress={() => setData(partyData)} />
        </ScrollView>
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

        <Button
          title="Create Account"
          color="blue"
          onPress={() => setRegister(true)}
        />
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

export default ShowEvents;
