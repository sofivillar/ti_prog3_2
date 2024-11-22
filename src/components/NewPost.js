import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description:'',
      email: ''
    }
  }
  componentDidMount() {
    const user = auth.currentUser
    // Ver si hay un usuario logueado
  }

  handleSubmit() {
    const user = auth.currentUser

    if (user) {
      db.collection('posts').add({
        owner: user.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: [] // Para después, cuando alguien likee el posteo voy a agregar su mail aca
      })
        .then(() => {
          this.setState({ description: '' });
          this.props.navigation.navigate('Home')
        })
        .catch(error =>{console.log("Something went wrong while posting", error)});
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create New Post</Text>
        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='Describe what you are thinking...'
          onChangeText={text => this.setState({ description: text })}
          value={this.state.description} />
        <TouchableOpacity style={styles.postButton} onPress={() => this.handleSubmit()}>
          <Text style={styles.postButtonText}>Post!</Text>
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
