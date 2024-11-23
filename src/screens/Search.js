import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config";

export default class Search extends Component {

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
      <View style={styles.container}>
        <Text style={styles.title}>Search for Users</Text>
        <TextInput style={styles.field}
          placeholder='Search' 
          keyboardType='default' 
          value={this.state.busqueda} 
          onChangeText={(texto) => this.setState({ busqueda: texto })}
        />
        {resultadosBusqueda.length === 0 ? (<Text style={styles.resultadoText}>No results </Text>) : (<FlatList style={styles.flatList} data={resultadosBusqueda} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Text style={styles.resultadoText}> {item.data.username}</Text> }/> )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
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
  resultadoText: {
    color: '#grey',
    fontSize: 16,
    textAlign: 'center',
  }, 
  flatList:{ 
    flex: 1, 
    width: '100%'
  }
});