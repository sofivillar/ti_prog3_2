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
          users.push({
            id: doc.id,
            data: doc.data()
          })
        });

        this.setState({
          users: users
        })

      })
  }

  handleSearch() {
    return this.state.users.filter((usuario) => {
      return usuario.data.username.toLowerCase().includes(this.state.busqueda.toLowerCase())
    })
  }

  render() {
    const resultadosBusqueda = this.handleSearch()   

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscador de usuarios</Text>
        <TextInput style={styles.field}
          placeholder='Search'
          keyboardType='default'
          value={this.state.busqueda}
          onChangeText={(texto) => this.setState({ busqueda: texto })}
        />
       
            <FlatList style={styles.flatList} data={resultadosBusqueda} keyExtractor={item => item.id.toString()} renderItem={({ item }) =>
              <View style={styles.resultadoItem}>
                <Text style={styles.resultadoUser}>{item.data.username}</Text>
                <Text>{item.data.email}</Text>
              </View> 
              }/>
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
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  field: {
    height: 40,
    width: '30%',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'lightpink',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
  },
  resultadoText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  resultadoItem: {
    fontSize: 16,
    padding: 10,
    margin:20,
    width: '80%',
    alignItems: 'center', 
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  resultadoUser: {
    fontWeight: 'bold',
    fontSize: 16
  }
});