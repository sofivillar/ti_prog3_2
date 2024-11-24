import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      email: ''
    }
  }

  componentDidMount() {
    db.collection('users').onSnapshot(
      docs => {
        let users = []
        docs.forEach(doc =>
          users.push({
            id: doc.id
          })
        )
      }
    )
    // Ver si hay un usuario logueado
  }

  handleSubmit() {
    if (auth.currentUser) {
      db.collection('posts').add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: []
      })
        .then(() => {
          this.setState({ description: '' });
          this.props.navigation.navigate('Home')
        })
        .catch(error => { console.log("Algo fallo en el posteo", error) });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nueva publicacion</Text>

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='Publica aca!'
          onChangeText={text => this.setState({ description: text })}
          value={this.state.description} />

        <TouchableOpacity style={styles.postButton} onPress={() => this.handleSubmit()}>
          <Text style={styles.postButtonText}>Subir!</Text>
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
    width: 240,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
  },
  postButton: {
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  postButtonText: {
    color: '#grey',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default NewPost
