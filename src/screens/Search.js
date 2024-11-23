import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

export class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      busqueda: ""
    }
  }

  componentDidMount() {
    
  }

  handleSearch() {
    
  }

  render() {
    return (
      <View>
        <Text>Buscador de usuarios</Text>
      </View>
    )
  }
}

export default Search
