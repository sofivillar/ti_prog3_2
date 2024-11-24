import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { auth, db } from "../firebase/config";
import { StyleSheet } from 'react-native';
import Post from '../components/Post';

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

  handleDeletePost = () => {
    const { posts } = this.state

    db.collection("posts").doc(posts.id).delete()
      .then(() => {
        console.log("Se elimino la publicacion");
         this.props.delete(posts.id)
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
          .where("email", "==", auth.currentUser.email)
          .onSnapshot(docs => {
            let posts = [];

            docs.forEach(doc => {
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
    console.log(this.state.posteos);
    
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.username}>{this.state.username}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
          <Text style={styles.posts}>Posteos: {this.state.posteos.length}</Text>

          <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <FlatList style={styles.flatList} data={this.state.posteos} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
          <Post
            posts={item}/>
        )}
        />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  email: {
    fontSize: 15,
    color: '#222',
    marginBottom: 3
  },
  posts:{
    fontSize: 14,
    color: '#222',
    marginBottom: 3
  },
  button: {
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
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

  flatList:{ 
    flex: 1, 
    width: '100%'
  }
});