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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }

  handleRegister(email, password) {

    if (!this.state.email || !this.state.password || !this.state.username) {
      this.setState({ messageErr: "Quedaron campos vacios" });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        db.collection("users").add({
          email: this.state.email,
          username: this.state.username,
          createdAt: Date.now()
        })
      })
      .then(() => {
        this.setState({ registered: true, messageErr: "" })
        this.props.navigation.navigate("Login")
      })
      .catch((error) => {
        console.log("Hubo un error en el registro", error.message);
        this.setState({ messageErr: error.message })
      })
  }

  render() {

    const formCompleto = this.state.email && this.state.password && this.state.username;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>REGISTER</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='Ingrese su mail'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='Ingrese su contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='Ingrese su usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username} />

        {formCompleto && (
          <TouchableOpacity onPress={() => this.handleRegister(this.state.email, this.state.password)} style={styles.button}>
            <Text style={styles.buttonText}>Registrate!</Text>
          </TouchableOpacity>
        )}

        {this.state.messageErr && <Text>{this.state.messageErr}</Text>}

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Ya tengo cuenta</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },

  field: {
    height: 40,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15
  },

  buttonText: {
    color: '#grey',
    fontSize: 16,
    textAlign: 'center',
  },

  loginText: {
    color: '#000',
    marginTop: 10,
  }
})