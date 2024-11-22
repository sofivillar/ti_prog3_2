import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      email: ''
    }
  }
  componentDidMount() {
    {if (auth.currentUser === null) 
      this.props.navigation.navigate("HomeMenu")
     }
    /* auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeMenu')
// SI HAY ALGIEN LOGUEADO, que pueda crear posteo 
      }
    }
    ) */
  }
  render() {
    return (
      <View>
        <Text>Create New Post</Text>
        <TextInput
          keyboardType='default'
          placeholder='Describe what you are thinking...'
          onChange={text => this.setState({ description: text })}
          value={this.state.description} />
        <TouchableOpacity onPress={() => this.handleSubmit()}></TouchableOpacity>
      </View>
    )
  }
}

export default NewPost
