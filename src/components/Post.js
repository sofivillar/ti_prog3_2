import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts,
            likes: this.props.posts.data.likes.length,
            miLike: this.props.posts.data.likes.includes(auth.currentUser.email)
        }
    }

    handleLike() {
        db.collection("posts").doc(this.props.posts.id)
            .update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) })
            .then(() => this.setState({
                likes: this.state.likes + 1,
                miLike: true
            }))
    }

    handleDislike() {
        db.collection("posts").doc(this.props.posts.id)
            .update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
            .then(() => this.setState({
                likes: this.state.likes - 1,
                miLike: false
            }))
    }

    render() {
        const { posts } = this.state;
        const createdAt = new Date(posts.data.createdAt).toLocaleDateString();

        return (
            <View style={styles.container}>
                <Text style={styles.description}>{this.props.posts.data.description}</Text>
                <Text style={styles.info}>Usuario: {posts.data.owner} </Text>
                <Text style={styles.info}>Likes: {this.state.likes} </Text>
                <Text style={styles.info}>Creado el: {createdAt} </Text>

                {this.state.miLike == true ? <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleDislike()}><Text>Dislike</Text>
                </TouchableOpacity> : <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleLike()}><Text>Like</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: '100%',
        margin: 1,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    button: {
        backgroundColor: "lightpink",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Post
