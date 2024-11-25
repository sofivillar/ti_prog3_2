import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { auth, db } from "../firebase/config";
import { StyleSheet } from 'react-native';
import Post from '../components/Post';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser ? auth.currentUser.email : "",
      username: "",
      posteos: []
    };
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        console.log("Cerraste sesion");
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDeletePost = (postId) => {
    const { posts } = this.state

    db.collection("posts").doc(postId).delete()
      .then(() => {
        console.log("Se elimino la publicacion");
        this.props.delete(postId)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate("Login");
      } else {
        db.collection("users")
          .where("email", "==", auth.currentUser.email)
          .onSnapshot(docs => {
            let users = [];

            docs.forEach(doc => {
              users.push(doc.data())
            });

            if (users.length > 0) {
              this.setState({ username: users[0].username });
            }
          });

        db.collection("posts")
          .where("owner", "==", auth.currentUser.email)
          .onSnapshot(docs => {
            let posts = [];

            docs.forEach(doc => {
              console.log("Documento recuperado:", doc.data());
              posts.push({
                id: doc.id,
                data: doc.data()
              });
            });
            this.setState({ posteos: posts });
          });

      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {auth.currentUser ? (
          <View style={styles.container}>
            <View style={styles.userInfo}>
              <Text style={styles.title}>Mi perfil</Text>
              <Text style={styles.username}>{this.state.username}</Text>
              <Text style={styles.email}>{this.state.email}</Text>
              <Text style={styles.posts}>Posteos: {this.state.posteos.length}</Text>

              <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>

            {this.state.posteos.length === 0 ? (
              <View>
                <Text>No hay publicaciones</Text>
              </View>
            ) : (
              <FlatList style={styles.flatList}
                data={this.state.posteos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Post
                      posts={item}
                    />
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => this.handleDeletePost(item.id)}>
                      <FontAwesomeIcon icon={faTrashCan} size={16} color="black" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>Logueate para ver tu perfil!</Text>
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Ir a Login</Text>
            </TouchableOpacity>
          </View>)}
      </View>
    )
  }
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 5,
  },
  email: {
    fontSize: 15,
    color: '#222',
    marginVertical: 5
  },
  posts: {
    fontSize: 14,
    color: '#222',
    marginVertical: 5
  },
  button: {
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
    marginTop: 10
  },

  buttonText: {
    color: '#grey',
    fontSize: 16,
    textAlign: 'center',
  },

  flatList: {
    flex: 1,
    width: '100%'
  },

  buttonDelete: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    width: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});