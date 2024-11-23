import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { auth, db } from "../firebase/config";

export class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      busqueda: ""
    }
  }

  componentDidMount() {
    db.collection("users")
      .onSnapshot(docs => {
        let users = [];


        docs.forEach(doc => {
          users.push({ id: doc.id, data: doc.data() })
        });
        console.log("Sanpshot");
        this.setState({
          users:users
        })

      })
  }

  handleSearch() {
    return this.state.users.filter((usuario) => { return usuario.data.username.toLowerCase().includes(this.state.busqueda.toLowerCase()) })
  }

  render() {
    const resultadosBusqueda = this.handleSearch()
    return (
      <View>
        <Text>Buscador de usuarios</Text>
        <TextInput 
          placeholder='Buscador' 
          keyboardType='default' 
          value={this.state.busqueda} 
          onChangeText={(texto) => this.setState({ busqueda: texto })}
        />
        {resultadosBusqueda.length === 0 ? (<Text>No hay resultados</Text>) : (<FlatList data={resultadosBusqueda} keyExtractor={item => item.id.toString()} renderItem={({ item }) =><Text> {item.data.username}</Text> }/> )}
      </View>
    )
  }
}

export default Search
