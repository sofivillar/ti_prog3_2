import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web';
import { auth } from "../firebase/config";
import { TextInput } from "react-native-web";

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: " ",
      password: " ",
      loggedIn: false
    }
  }

  login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response)
        this.setState({ loggedIn: true });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(error => {
        this.setState({ error: 'Credenciales inválidas.' })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LOGIN</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TouchableOpacity style={styles.boton} onPress={() => this.login()}>
          <Text> Enter Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Ir a Register</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20
  },
  field: {
    height: 20,
    padding: 15,
    border: 1,
    borderColor: "green",
    borderStyle: "solid",
    borderRadius: 6,
    margin: 10
  },
  boton: {
    backgroundColor: "#28a745",
    padding: 10,
    textAlign: "center",
    borderRadius: 4,
    borderColor: "#28a745"
  }
})