import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import ShowEventsWithCreate from "./ShowEventsWithCreate";

const Register = (props) => {
  const [showEventsWithCreate, setShowEventsWithCreate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIn, setUserIn] = useState(false);
  const auth = getAuth();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Login with " + user.email);
        setShowEventsWithCreate(true);
      })
      .catch((error) => console.log(error.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("User Out"))
      .catch((error) => alert.error.message);
    setShowEventsWithCreate(false);
  };
  return (
    <Modal visible={props.visible}>
      <ShowEventsWithCreate
        visible={showEventsWithCreate}
        logOut={handleSignOut}
      />
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Button
            style={[styles.button, styles.buttonOutline]}
            onPress={props.changeVisible}
            title="Back"
            color="red"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Button
            style={[styles.button, styles.buttonOutline]}
            onPress={handleSignup}
            title="Register"
          />

          <Button
            style={[styles.button, styles.buttonOutline]}
            onPress={handleSignOut}
            title="Sign Out"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0282F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {},
});

export default Register;
