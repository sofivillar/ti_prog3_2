import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { auth, db } from "../firebase/config";
import { StyleSheet } from 'react-native';

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser ? auth.currentUser.email : "",
      username: "",
      posteos: []
    };
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        console.log("Cerraste sesion");
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate("Login");
      } else {
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(docs => {
          let users = [];

          docs.forEach(doc => {
            users.push(doc.data())
          });

          if (users.length > 0) {
            this.setState({ username: users[0].username });
          }
        });
      }
    });
  }

  render() {
    return (
      <View>
        <View>
          <Text>{this.state.username}</Text>
          <TouchableOpacity onPress={() => this.handleLogout()}>
            <Text>Salir</Text>
          </TouchableOpacity>
        </View>

        <Text>{this.state.email}</Text>
      </View>
    )
  }
}

export default Profile
