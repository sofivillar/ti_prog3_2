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
      loggedIn: false
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeMenu")
        this.setState({ loggedIn: false })
      }
    })
  }

  handleLogin = () => {
    const { email, password } = this.state;
    
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

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
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
    backgroundColor: '#f08080',
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    color: '#000',
    marginTop: 10,
  }
});