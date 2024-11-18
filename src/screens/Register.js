import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { auth, db } from '../firebase/config';
import { StyleSheet } from 'react-native';

export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      registered: false,
      messageErr: ""
    }
  }

  handleRegister(email, password) {

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return db.collection("users").doc(response.username.uid).set({ // no se por que no se guarda la coleccion
          email: this.state.email,
          username: this.state.username,
          createdAt: Date.now()
        })
      })
      .then(() => {
        this.setState({ registered: true, messageErr: "" })},
        this.props.navigation.navigate("Login"))
      .catch((error) => {
        console.log("Hubo un error en el registro", error.message);
        this.setState({ messageErr: error.message })
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput style={styles.textInput}
          keyboardType='email-address'
          placeholder='Ingrese su mail'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.textInput}
          keyboardType='default'
          placeholder='Ingrese su contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TextInput style={styles.textInput}
          keyboardType='default'
          placeholder='Ingrese su usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username} />

        <TouchableOpacity onPress={() => this.handleRegister(this.state.email, this.state.password)} style={styles.button}>
          <Text style={styles.texto}>Registrate!</Text>
        </TouchableOpacity>

        {this.state.messageErr && <Text>{this.state.messageErr}</Text>}

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.texto}>Ya tengo cuenta</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20
  },

  textInput: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10
  },

  button: {
    backgroundColor: "#ffc0f1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ffa9e2"
  },

  texto: {
    color: "#grey"
  }
})