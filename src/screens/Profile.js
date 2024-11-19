import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { auth, db } from "../firebase/config";

export class Profile extends Component {

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

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          
        </TouchableOpacity>
      </View>
    )
  }
}

export default Profile
