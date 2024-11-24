import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native-web';
import { auth } from "../firebase/config";
import { TextInput } from "react-native-web";

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      messageErr: " "
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }

  handleLogin = () => {
    const { email, password } = this.state;

    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response)
        this.setState({ loggedIn: true, messageErr: "" });
        this.props.navigation.navigate("HomeMenu");
      })
      .catch(error => {
        //this.setState({ error: 'Credenciales inválidas.' })
        if (!email.includes("@")) {
          this.setState({ messageErr: "Email mal escrito" });
        } else if (password.length < 6) {
          this.setState({ messageErr: "La contraseña debe tener minimo 6 caracteres" });
        } else {
          this.setState({ messageErr: "Email o contraseña incorrectos" })
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })} />

        <TouchableOpacity style={styles.loginButton} onPress={() => this.handleLogin()}>
          <Text style={styles.loginButtonText}> Enter Login </Text>
        </TouchableOpacity>

        {this.state.messageErr && <Text>{this.state.messageErr}</Text>}

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.registerText}>Ir a Register</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  loginButton: {
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#grey',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    color: '#000',
    marginTop: 10,
  }
});